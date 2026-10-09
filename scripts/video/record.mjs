// Records the demo video of the published site, to be projected in the background at events: a silent,
// looping tour of Inicio, El carro and Sponsors. It records the pages exactly as they are published;
// the site has no demo mode. Frames are captured one by one with the page clock under control, so the
// scroll is even and the entrance animations play as they do in the browser.
//
// From the repository root:
//   npm --prefix scripts/video ci
//   node scripts/video/record.mjs --test   short 1080p cut to check the result: ../video-demo/kinetic-demo-prueba.mp4
//   node scripts/video/record.mjs          the full loop: ../video-demo/kinetic-demo-4k.mp4 and kinetic-demo-1080p.mp4
//
// Options: --site <url> (the published site by default), --out <folder>, --chrome <path to Chrome>.
// It uses the Chrome installed on the computer. If a stretch of the tour shows a pending value, a
// placeholder or an empty photo frame, the recording stops and says where: adjust `shots` below.

import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

import ffmpegPath from "ffmpeg-static";
import { chromium } from "playwright-core";

const here = dirname(fileURLToPath(import.meta.url));
const { values: options } = parseArgs({
  options: {
    site: { type: "string", default: "https://diegomontpy.github.io/Kinetic/" },
    out: { type: "string", default: resolve(here, "../../../video-demo") },
    chrome: { type: "string" },
    test: { type: "boolean", default: false },
  },
});

const FPS = 30;
const VIEWPORT = { width: 1920, height: 1080 };
/** Seconds each shot fades into the next one, and the end of the loop into its start. */
const FADE = 1;
/** Scroll speed in CSS pixels per second, and the seconds it takes to reach it and to stop. */
const SPEED = 150;
const RAMP = 0.9;
/** Space left between a target aligned to the bottom and the bottom of the screen. */
const MARGIN = 32;
/** What the tour never shows: pending values, placeholders and empty photo or video frames. */
const PENDING = ".pending, .placeholder, [data-empty]";

/**
 * The tour: one shot per stretch of a page that can be scrolled without anything pending in view.
 * A step either holds still or scrolls to an element placed at the top, center or bottom of the screen.
 * The stops that matter are the long holds: the hero, the painted chassis and the sponsor wall.
 */
const shots = [
  {
    name: "Inicio",
    path: "",
    steps: [
      { hold: 7 },
      { to: "figure.band", align: "center", hold: 2.5 },
      { to: 'section[aria-labelledby="fsae-title"]', align: "top", hold: 3.5 },
    ],
  },
  {
    name: "El carro",
    path: "el-carro/",
    start: { to: 'section[aria-labelledby="views-title"]', align: "top" },
    steps: [
      { hold: 3.5 },
      { to: 'section[aria-labelledby="systems-title"]', align: "bottom", hold: 3.5 },
    ],
  },
  {
    name: "Sponsors, el chasis",
    path: "sponsors/",
    steps: [{ hold: 6 }, { to: ".benefits", align: "bottom", hold: 3 }],
  },
  {
    name: "Sponsors, el muro",
    path: "sponsors/",
    start: { to: ".sponsors .wall", align: "bottom" },
    steps: [{ hold: 10 }],
  },
];

/** The short cut: the end of the loop fading into its start, with the first scroll. */
const testShots = [
  { ...shots[3], steps: [{ hold: 4 }] },
  { ...shots[0], steps: [{ hold: 4 }, { to: "figure.band", align: "center", hold: 1 }] },
];

const log = (text) => process.stdout.write(`${text}\n`);

/**
 * Runs in the page before its own scripts. It holds the page clock: performance.now(),
 * requestAnimationFrame() and every CSS animation and transition follow the frame being recorded.
 */
function installClock() {
  const nativeFrame = window.requestAnimationFrame.bind(window);
  const nativeCancel = window.cancelAnimationFrame.bind(window);
  const nativeNow = performance.now.bind(performance);
  let now = null;
  let queue = [];
  let nextId = 1;
  const firstSeen = new Map();

  performance.now = () => (now === null ? nativeNow() : now);
  window.requestAnimationFrame = (callback) => {
    if (now === null) return nativeFrame(callback);
    queue.push({ id: nextId, callback });
    return nextId++;
  };
  window.cancelAnimationFrame = (id) => {
    if (now === null) return nativeCancel(id);
    queue = queue.filter((item) => item.id !== id);
  };
  const paint = () => new Promise((done) => nativeFrame(() => nativeFrame(done)));

  window.__video = {
    /** Moves the page to `ms` milliseconds into the shot, after it has reacted to the scroll. */
    async frame(ms) {
      if (now === null) now = 0;
      await paint();
      now = ms;
      const due = queue;
      queue = [];
      for (const { callback } of due) callback(now);
      for (const animation of document.getAnimations()) {
        if (!firstSeen.has(animation)) {
          firstSeen.set(animation, now);
          animation.pause();
        }
        animation.currentTime = now - firstSeen.get(animation);
      }
    },
    /**
     * Pending items inside the screen, described for the error message. Items inside a closed
     * <details> keep their boxes but are not painted, so visibility is checked first.
     */
    pendingInView(selector) {
      return [...document.querySelectorAll(selector)]
        .filter((element) => {
          if (!element.checkVisibility({ visibilityProperty: true })) return false;
          const box = element.getBoundingClientRect();
          return (
            box.width > 0 &&
            box.height > 0 &&
            box.bottom > 0 &&
            box.top < window.innerHeight &&
            box.right > 0 &&
            box.left < window.innerWidth
          );
        })
        .map((element) => element.textContent.trim().slice(0, 40) || element.className);
    },
  };
}

/** Loads every image now, lazy ones included, so none appears late in a frame. */
async function loadEverything() {
  for (const image of document.images) image.loading = "eager";
  await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
  await document.fonts.ready;
}

/** Scroll position that places `selector` at the top, center or bottom of the screen. */
function scrollTarget({ selector, align, margin }) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`No existe ${selector}`);
  const box = element.getBoundingClientRect();
  const top = box.top + window.scrollY;
  const bottom = box.bottom + window.scrollY;
  const nav = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--nav-height"),
  );
  const view = window.innerHeight;
  const y =
    align === "top"
      ? top - nav
      : align === "bottom"
        ? bottom - view + margin
        : (top + bottom) / 2 - (view + nav) / 2;
  return Math.round(Math.max(0, Math.min(y, document.documentElement.scrollHeight - view)));
}

/** Distance covered `t` seconds into a move that lasts `duration`, speeding up and slowing down evenly. */
function travelled(t, distance, duration) {
  const ramp = Math.min(RAMP, duration / 2);
  const speed = distance / (duration - ramp);
  if (t <= 0) return 0;
  if (t >= duration) return distance;
  if (t < ramp) return (speed * t * t) / (2 * ramp);
  if (t > duration - ramp) return distance - (speed * (duration - t) ** 2) / (2 * ramp);
  return speed * (t - ramp / 2);
}

/** The shot as a list of moves and holds, with the scroll position for any moment. */
async function plan(page, shot) {
  const at = (step) =>
    page.evaluate(scrollTarget, { selector: step.to, align: step.align, margin: MARGIN });
  let y = shot.start ? await at(shot.start) : 0;
  const start = y;
  const moves = [];
  let time = 0;
  for (const step of shot.steps) {
    if (step.to) {
      const target = await at(step);
      const duration = Math.abs(target - y) / SPEED + RAMP;
      moves.push({ from: y, to: target, start: time, duration });
      time += duration;
      y = target;
    }
    time += step.hold ?? 0;
  }
  const position = (t) => {
    let current = start;
    for (const move of moves) {
      if (t < move.start) break;
      current = move.from + travelled(t - move.start, move.to - move.from, move.duration);
    }
    return Math.round(current * 100) / 100;
  };
  return { frames: Math.round(time * FPS), position };
}

function ffmpeg(args) {
  const child = spawn(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: ["pipe", "inherit", "inherit"],
  });
  const done = new Promise((resolveDone, reject) =>
    child.on("close", (code) =>
      code === 0 ? resolveDone() : reject(new Error(`ffmpeg terminó con el código ${code}`)),
    ),
  );
  // `stop` ends a recording that failed halfway, so its file is released.
  return { input: child.stdin, done, stop: () => child.kill() };
}

/** BT.709 throughout, so the colors of the page reach the video unchanged. */
const COLOR = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709"];

async function recordShot(browser, shot, file, scale) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: scale,
    reducedMotion: "no-preference",
    colorScheme: "dark",
  });
  await context.addInitScript(installClock);
  const page = await context.newPage();
  await page.goto(new URL(shot.path, options.site).href, { waitUntil: "networkidle" });
  await page.evaluate(loadEverything);
  const planned = await plan(page, shot);
  // The page stays at its first instant while the previous shot fades into it, so its entrance
  // animations play once the fade is over, as they do when the page opens.
  const frames = planned.frames + FADE * FPS;

  const encoder = ffmpeg([
    ...["-f", "image2pipe", "-framerate", String(FPS), "-i", "-"],
    ...["-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p"],
    ...["-c:v", "libx264", "-preset", "veryfast", "-crf", "10", ...COLOR, file],
  ]);
  try {
    await recordFrames(page, shot, planned, frames, encoder);
  } catch (error) {
    encoder.stop();
    await encoder.done.catch(() => {});
    await context.close();
    throw error;
  }
  encoder.input.end();
  await encoder.done;
  await context.close();
  log(`\r  ${shot.name}: ${(frames / FPS).toFixed(1)} s grabados          `);
  return frames;
}

async function recordFrames(page, shot, planned, frames, encoder) {
  for (let frame = 0; frame < frames; frame++) {
    const seconds = Math.max(0, frame / FPS - FADE);
    const pending = await page.evaluate(
      async ({ y, ms, selector }) => {
        window.scrollTo({ top: y, behavior: "instant" });
        await window.__video.frame(ms);
        return window.__video.pendingInView(selector);
      },
      { y: planned.position(seconds), ms: seconds * 1000, selector: PENDING },
    );
    if (pending.length > 0) {
      throw new Error(
        `Hay algo pendiente a la vista en "${shot.name}", segundo ${seconds.toFixed(1)}: ${pending.join(", ")}. Ajustá el recorrido en record.mjs.`,
      );
    }
    if (!encoder.input.write(await page.screenshot({ type: "png" })))
      await once(encoder.input, "drain");
    if (frame % FPS === 0)
      process.stdout.write(
        `\r  ${shot.name}: ${Math.round(frame / FPS)} de ${Math.round(frames / FPS)} s   `,
      );
  }
}

/**
 * Joins the shots with a fade. For the full loop, the first second of the tour is moved to the end and
 * the last shot fades into it: when the video starts over, the picture continues without a cut.
 */
function joinShots(files, frames, loop) {
  const fade = FADE * FPS;
  const inputs = files.flatMap((file) => ["-i", file]);
  const filters = files.map((_, index) => `[${index}:v]settb=AVTB,fps=${FPS}[s${index}]`);
  const parts = files.map((_, index) => ({ label: `s${index}`, frames: frames[index] }));
  if (loop) {
    filters.push(
      `[s0]split=2[headsrc][restsrc]`,
      `[headsrc]trim=end_frame=${fade},setpts=PTS-STARTPTS[head]`,
      `[restsrc]trim=start_frame=${fade},setpts=PTS-STARTPTS[rest]`,
    );
    parts[0] = { label: "rest", frames: frames[0] - fade };
    parts.push({ label: "head", frames: fade });
  }
  let label = parts[0].label;
  let length = parts[0].frames;
  for (const [index, part] of parts.slice(1).entries()) {
    const out = `x${index}`;
    const offset = ((length - fade) / FPS).toFixed(6);
    filters.push(
      `[${label}][${part.label}]xfade=transition=fade:duration=${FADE}:offset=${offset}[${out}]`,
    );
    label = out;
    length += part.frames - fade;
  }
  return { inputs, filters, label, seconds: length / FPS };
}

const H264 = [
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "18",
  "-profile:v",
  "high",
  "-pix_fmt",
  "yuv420p",
];
const FINISH = ["-r", String(FPS), ...COLOR, "-movflags", "+faststart", "-an"];

async function main() {
  mkdirSync(options.out, { recursive: true });
  const work = mkdtempSync(join(tmpdir(), "kinetic-video-"));
  const browser = await chromium.launch({
    ...(options.chrome ? { executablePath: options.chrome } : { channel: "chrome" }),
    headless: true,
    args: ["--hide-scrollbars", "--force-color-profile=srgb"],
  });
  try {
    const tour = options.test ? testShots : shots;
    const scale = options.test ? 1 : 2;
    log(
      `Grabando ${tour.length} tramos de ${options.site} a ${VIEWPORT.width * scale}×${VIEWPORT.height * scale}`,
    );
    const files = [];
    const frames = [];
    for (const [index, shot] of tour.entries()) {
      files.push(join(work, `tramo-${index}.mp4`));
      frames.push(await recordShot(browser, shot, files.at(-1), scale));
    }

    const { inputs, filters, label, seconds } = joinShots(files, frames, !options.test);
    log(`Duración: ${seconds.toFixed(1)} s`);
    if (!options.test && (seconds < 60 || seconds > 90)) {
      throw new Error(
        `El video dura ${seconds.toFixed(1)} s y tiene que durar entre 60 y 90: ajustá las pausas.`,
      );
    }
    if (options.test) {
      const file = join(options.out, "kinetic-demo-prueba.mp4");
      const encoder = ffmpeg([
        ...inputs,
        ...["-filter_complex", filters.join(";"), "-map", `[${label}]`],
        ...H264,
        ...["-level:v", "4.2", ...FINISH, file],
      ]);
      await encoder.done;
      log(`Listo: ${file}`);
    } else {
      const uhd = join(options.out, "kinetic-demo-4k.mp4");
      const fullHd = join(options.out, "kinetic-demo-1080p.mp4");
      filters.push(
        `[${label}]split=2[uhd][fullsrc]`,
        `[fullsrc]scale=1920:1080:flags=lanczos[fullhd]`,
      );
      const encoder = ffmpeg([
        ...inputs,
        ...["-filter_complex", filters.join(";")],
        ...["-map", "[uhd]", ...H264, "-level:v", "5.1", ...FINISH, uhd],
        ...["-map", "[fullhd]", ...H264, "-level:v", "4.2", ...FINISH, fullHd],
      ]);
      await encoder.done;
      log(`Listo: ${uhd}\n       ${fullHd}`);
    }
  } finally {
    await browser.close();
    // Never let the cleanup hide the error that stopped the recording.
    try {
      rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 });
    } catch {
      log(`No se pudo borrar la carpeta temporal ${work}; se puede borrar a mano.`);
    }
  }
}

await main();

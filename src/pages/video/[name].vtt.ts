import type { APIRoute, GetStaticPaths } from "astro";

import { videos } from "../../data/media";
import { captionsName, findVideo } from "../../lib/media";

// One captions file per video on the site, written from its `captions` text in media.ts.
export const getStaticPaths = (() =>
  videos.flatMap((video) =>
    video.file && findVideo(video)
      ? [{ params: { name: captionsName(video.file.video) }, props: { text: video.captions } }]
      : [],
  )) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  // A single cue that lasts as long as any video can.
  const body = `WEBVTT\n\n00:00:00.000 --> 99:59:59.000\n${props.text}\n`;
  return new Response(body, { headers: { "Content-Type": "text/vtt; charset=utf-8" } });
};

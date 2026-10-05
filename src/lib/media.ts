import type { ImageMetadata } from "astro";

import type { PhotoSlot, VideoSlot } from "../data/media";
import { findAsset } from "./assets";
import { withBase } from "./paths";

// Served by the site itself: the build copies each video to dist/_astro/ and returns its address.
const videos = import.meta.glob<string>("/src/assets/video/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

/** The slot's photo, or undefined while `file` is null or the file is not in src/assets/fotos/. */
export function findPhoto(slot: PhotoSlot): ImageMetadata | undefined {
  return slot.file ? findAsset(`fotos/${slot.file}`) : undefined;
}

/** Name of a video's captions file: "kr01-motor.mp4" has its captions at /video/kr01-motor.vtt. */
export function captionsName(video: string): string {
  return video.replace(/\.mp4$/, "");
}

/** The slot's video, poster and captions, or undefined unless both files are in src/assets/video/. */
export function findVideo(
  slot: VideoSlot,
): { src: string; poster: ImageMetadata; captions: string } | undefined {
  if (!slot.file) return undefined;
  const src = videos[`/src/assets/video/${slot.file.video}`];
  const poster = findAsset(`video/${slot.file.poster}`);
  const captions = withBase(`/video/${captionsName(slot.file.video)}.vtt`);
  return src && poster ? { src, poster, captions } : undefined;
}

import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true },
);

/** Image for a path relative to src/assets/ ("sponsors/grupo-infrasal.jpg"), or undefined if it is missing. */
export function findAsset(path: string): ImageMetadata | undefined {
  return files[`/src/assets/${path}`]?.default;
}

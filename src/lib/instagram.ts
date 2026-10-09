import type { ImageMetadata } from "astro";

import { type InstagramPost, instagramPosts } from "../data/instagram";
import { findAsset } from "./assets";

export type ShownPost = InstagramPost & { image: ImageMetadata };

const perRow = 3;
const maxRows = 2;

/**
 * The newest posts whose photo is in src/assets/instagram/, in whole rows of three and up to six.
 * Empty with fewer than three: a grid with gaps looks worse than the profile alone.
 */
export function latestPosts(): ShownPost[] {
  const ready = instagramPosts.flatMap((post) => {
    const image = findAsset(`instagram/${post.file}`);
    if (!image) return [];
    // Links copied from Instagram carry tracking parameters after "?".
    const url = new URL(post.url);
    url.search = "";
    url.hash = "";
    return [{ ...post, url: url.href as InstagramPost["url"], image }];
  });
  const rows = Math.min(maxRows, Math.floor(ready.length / perRow));
  return ready.slice(0, rows * perRow);
}

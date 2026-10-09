/**
 * The latest posts on the team's Instagram, shown on Contacto under the profile, newest first.
 * Each one is a photo kept in the repository: the site never loads anything from Instagram.
 */
export interface InstagramPost {
  /** File name inside src/assets/instagram/, e.g. "2026-10-chasis.jpg". */
  file: string;
  /** Address of the post, as copied from Instagram. Anything after "?" is dropped. */
  url: `https://www.instagram.com/${string}`;
  /** What the photo shows, for anyone who cannot see it. */
  alt: string;
}

/**
 * Up to six are shown, in whole rows of three: three, four or five posts show the newest three.
 * With fewer than three, Contacto shows only the profile.
 */
export const instagramPosts: InstagramPost[] = [];

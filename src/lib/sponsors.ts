import { type Sponsor, sponsors, tiers } from "../data/sponsors";
import { findAsset } from "./assets";

/**
 * Sponsors whose logo is in src/assets/sponsors/, highest tier first. The rows of logos under the hero
 * and in the footer never show a placeholder: a sponsor without its file waits for the wall.
 */
export function sponsorsWithLogo(): Sponsor[] {
  return tiers.flatMap((tier) =>
    sponsors.filter(
      (sponsor) => sponsor.tier === tier.id && findAsset(`sponsors/${sponsor.logo}`) !== undefined,
    ),
  );
}

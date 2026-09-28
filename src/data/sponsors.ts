export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "provisional";

export interface Sponsor {
  name: string;
  tier: SponsorTier;
  /** File name inside src/assets/sponsors/. */
  logo: string;
  url?: string;
}

/** Wall order, top to bottom. Tiers without sponsors are not rendered. */
export const tiers: { id: SponsorTier; label: string }[] = [
  { id: "platinum", label: "Platino" },
  { id: "gold", label: "Oro" },
  { id: "silver", label: "Plata" },
  { id: "bronze", label: "Bronce" },
  { id: "provisional", label: "Nivel por definir" },
];

/**
 * Every sponsor stays "provisional" until the team defines the sponsorship levels.
 * No URL is confirmed yet, so no logo links out.
 */
export const sponsors: Sponsor[] = [
  // Pending: confirm whether the sponsor is the local Audi dealership.
  { name: "Audi", tier: "provisional", logo: "audi.png" },
  {
    name: "Autódromo Internacional El Jabalí",
    tier: "provisional",
    logo: "autodromo-el-jabali.png",
  },
  {
    name: "Automóvil Club de El Salvador",
    tier: "provisional",
    logo: "automovil-club-de-el-salvador.png",
  },
  { name: "Grupo Infrasal", tier: "provisional", logo: "grupo-infrasal.jpg" },
  { name: "Super Repuestos", tier: "provisional", logo: "super-repuestos.png" },
];

/** Pending: path of the sponsorship package PDF inside public/, e.g. "/paquete-patrocinio.pdf". */
export const sponsorshipPackage: string | null = null;

export const sponsorSection = {
  heading: "Con el apoyo de",
  lead: "Empresas e instituciones que hacen posible KR-01.",
  invite: {
    title: "Tu logo aquí",
    action: "Ser sponsor",
    href: "/contacto/",
  },
  cta: {
    heading: "Poné tu marca sobre KR-01",
    text: "Conversemos sobre cómo tu empresa puede sumarse al primer monoplaza de Formula SAE del Key Institute.",
    contact: { label: "Hablemos", href: "/contacto/" },
    packageLabel: "Descargar paquete (PDF)",
    packagePending: "El paquete de patrocinio está en preparación.",
  },
};

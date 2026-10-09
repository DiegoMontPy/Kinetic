export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "provisional";

/** "light" for dark logos, "dark" for logos that come in white. The logo file is never edited. */
export type PlateVariant = "light" | "dark";

export interface Sponsor {
  name: string;
  tier: SponsorTier;
  /** File name inside src/assets/sponsors/. */
  logo: string;
  plate: PlateVariant;
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
  // Provisional logo until the official file arrives: the black-rings version, background removed.
  { name: "Audi", tier: "provisional", logo: "audi.png", plate: "light" },
  {
    name: "Autódromo Internacional El Jabalí",
    tier: "provisional",
    logo: "autodromo-el-jabali.png",
    plate: "light",
  },
  {
    name: "Automóvil Club de El Salvador",
    tier: "provisional",
    logo: "automovil-club-de-el-salvador.png",
    plate: "light",
  },
  // Provisional logo until the official file arrives: the white version, background removed.
  {
    name: "Flexiplan",
    tier: "provisional",
    logo: "flexiplan.png",
    plate: "dark",
  },
  { name: "Grupo Infrasal", tier: "provisional", logo: "grupo-infrasal.jpg", plate: "light" },
  // Provisional logo until the official file arrives: background removed.
  {
    name: "Reus Pharma",
    tier: "provisional",
    logo: "reus-pharma.png",
    plate: "light",
  },
  { name: "Super Repuestos", tier: "provisional", logo: "super-repuestos.png", plate: "light" },
];

export type LogoSize = "sm" | "md" | "lg" | "xl";

export const logoSizeLabels: Record<LogoSize, string> = {
  sm: "Pequeño",
  md: "Mediano",
  lg: "Grande",
  xl: "Extra grande",
};

/** What each sponsorship level includes. `null` marks a value that is not defined yet. */
export interface TierOffer {
  tier: Exclude<SponsorTier, "provisional">;
  /** Pending: contribution for the level. */
  amount: string | null;
  logoOnCar: LogoSize;
  website: string;
  social: string;
  /** `null` when the level does not include it. */
  teamProfiles: string | null;
}

export type TierRow = "amount" | "logoOnCar" | "website" | "social" | "teamProfiles";

/** Highest level first, in the same order as `tiers`. The first one is highlighted. */
export const tierOffers: TierOffer[] = [
  {
    tier: "platinum",
    amount: null,
    logoOnCar: "xl",
    website: "Logo extra grande, con enlace a tu sitio",
    social: "Publicación dedicada y mención en cada hito del carro",
    teamProfiles: "Todo el equipo, con contacto directo",
  },
  {
    tier: "gold",
    amount: null,
    logoOnCar: "lg",
    website: "Logo grande, con enlace a tu sitio",
    social: "Publicación dedicada y mención en los hitos principales",
    teamProfiles: "Todo el equipo",
  },
  {
    tier: "silver",
    amount: null,
    logoOnCar: "md",
    website: "Logo mediano",
    social: "Mención en los hitos principales",
    teamProfiles: "Un grupo del equipo, a elección",
  },
  {
    tier: "bronze",
    amount: null,
    logoOnCar: "sm",
    website: "Logo pequeño",
    social: "Mención en la presentación de sponsors",
    teamProfiles: null,
  },
];

export const sponsorPage = {
  intro: {
    eyebrow: (season: number) => `Sponsors · Temporada ${season}`,
    heading: "Tu marca en el primer monoplaza del Key Institute",
    lead: "Patrocinar a Kinetic Racing es poner tu marca sobre KR-01 y trabajar de cerca con los estudiantes que lo construyen.",
    benefitsLabel: "Qué recibe tu empresa",
    benefits: [
      {
        keyword: "Marca",
        text: "Tu logo va sobre KR-01 y aparece en cada foto, prueba y presentación del carro. El tamaño crece con el nivel.",
        tags: [],
      },
      {
        keyword: "Talento",
        text: "Conocés de cerca a estudiantes de ingeniería que ya resuelven un proyecto real, con presupuesto y plazos.",
        tags: ["CAD", "Manufactura", "Gestión de proyectos"],
      },
      {
        keyword: "Temporada",
        text: "Tu marca acompaña al equipo la temporada completa: en el sitio, en redes y en cada presentación.",
        tags: [],
      },
    ] satisfies { keyword: string; text: string; tags: string[] }[],
  },
  levels: {
    heading: "Niveles de patrocinio",
    lead: "Cuatro niveles, de Bronce a Platino. Con cada uno crece tu logo sobre el carro y tu presencia junto al equipo.",
    /** Pending: remove once the team approves the levels and their benefits. */
    draft: {
      tag: "En definición",
      text: "Los niveles todavía no están confirmados. Los beneficios de esta tabla son una propuesta y pueden cambiar antes de publicarse el paquete de patrocinio.",
    } as { tag: string; text: string } | null,
    caption: "Beneficios por nivel de patrocinio",
    rowHeader: "Beneficio",
    amountPending: "Por definir",
    rows: [
      { id: "amount", label: "Aporte" },
      { id: "logoOnCar", label: "Logo en el carro" },
      { id: "website", label: "Presencia en el sitio" },
      { id: "social", label: "Menciones en redes" },
      { id: "teamProfiles", label: "Perfiles del equipo" },
    ] satisfies { id: TierRow; label: string }[],
    notIncluded: "No incluido",
    websiteNote: "El sitio muestra los logos en Inicio y en Sponsors, ordenados por nivel.",
    amountNote: "Los aportes de cada nivel se definen con el paquete de patrocinio.",
  },
};

/** Pending: path of the sponsorship package PDF inside public/, e.g. "/paquete-patrocinio.pdf". */
export const sponsorshipPackage: string | null = null;

/**
 * Sponsorships are arranged in person, in a meeting with the team. The site backs that conversation
 * instead of offering a way in: the invitation leads to the levels, and the closing band explains the
 * meeting and presents the package left after it.
 */
export const sponsorSection = {
  heading: "Con el apoyo de",
  lead: "Empresas e instituciones que hacen posible KR-01.",
  invite: {
    title: "Tu logo aquí",
    action: "Ver los niveles",
    href: "/sponsors/#niveles",
  },
  cta: {
    heading: "Cada patrocinio empieza con una conversación",
    text: "Nos reunimos con tu empresa, te presentamos KR-01 y te explicamos los beneficios de cada nivel.",
    /** Shown only once the team has an email (`email` in team.ts): the way to arrange the meeting. */
    email: "Para coordinar la reunión, escribinos a",
    package: {
      label: "Paquete de patrocinio · PDF",
      text: "Lo que le dejamos a tu empresa después de la reunión: el proyecto, los niveles y sus beneficios.",
      action: "Descargar el paquete",
      pending: "En preparación",
    },
  },
};

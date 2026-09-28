/**
 * Public origin for canonical URLs, Open Graph and the sitemap.
 * Pending: the final domain, most likely one provided by the university.
 * Override it at build time with the SITE_URL environment variable.
 */
export const defaultSiteUrl = "https://diegomontpy.github.io";

export interface Link {
  label: string;
  href: string;
}

export const site = {
  name: "Kinetic Racing",
  monogram: "KR",
  category: "Formula SAE",
  institution: "Key Institute",
  country: "El Salvador",
  motto: ["BUILD.", "TEST.", "COMPETE."],
  taglines: {
    team: "One team. One goal. Beyond limits.",
    performance: "Driven by passion. Built for performance.",
  },
  locale: "es_SV",
  themeColor: "#000000",
  instagram: {
    label: "Instagram",
    handle: "@kineticracing.key",
    url: "https://www.instagram.com/kineticracing.key/",
  },
};

export const navigation: Link[] = [
  { label: "Inicio", href: "/" },
  { label: "El carro", href: "/el-carro/" },
  { label: "Equipo", href: "/equipo/" },
  { label: "Sponsors", href: "/sponsors/" },
  { label: "Contacto", href: "/contacto/" },
];

export const joinLink: Link = { label: "Únete", href: "/unete/" };

export const ui = {
  skipToContent: "Saltar al contenido",
  menu: "Menú",
  mainNavigation: "Principal",
};

export const placeholderLabels = {
  render: "RENDER FINAL — PENDIENTE",
  vehiclePhoto: "FOTO DEL VEHÍCULO",
  teamPhoto: "FOTO DE EQUIPO",
  portrait: "FOTO INDIVIDUAL",
  sponsorLogo: "LOGO SPONSOR",
  tbd: "POR DEFINIR",
};

export interface PageMeta {
  /** Content of the <title> element. */
  title: string;
  description: string;
  heading: string;
  /** One-line status shown on pages that are not built yet. */
  status?: string;
}

export const pages = {
  home: {
    title: "Kinetic Racing — Formula SAE · Key Institute",
    description:
      "Kinetic Racing es el equipo de Formula SAE del Key Institute, El Salvador. Diseñamos y construimos KR-01, nuestro primer monoplaza.",
    heading: "Kinetic Racing",
  },
  car: {
    title: "El carro — Kinetic Racing",
    description:
      "KR-01, el primer monoplaza de Kinetic Racing: chasis tubular de acero terminado y el resto del vehículo en diseño.",
    heading: "El carro",
    status: "La ficha de KR-01 está en preparación.",
  },
  team: {
    title: "Equipo — Kinetic Racing",
    description:
      "El equipo de Formula SAE del Key Institute: estudiantes de ingeniería que diseñan y construyen KR-01.",
    heading: "Equipo",
    status: "La presentación del equipo está en preparación.",
  },
  sponsors: {
    title: "Sponsors — Kinetic Racing",
    description:
      "Patrocinar a Kinetic Racing: tu marca sobre KR-01, el primer monoplaza de Formula SAE del Key Institute.",
    heading: "Sponsors",
    status: "El programa de patrocinio está en preparación.",
  },
  join: {
    title: "Únete — Kinetic Racing",
    description: "Cómo sumarte a Kinetic Racing, el equipo de Formula SAE del Key Institute.",
    heading: "Únete al equipo",
    status: "La convocatoria está en preparación.",
  },
  contact: {
    title: "Contacto — Kinetic Racing",
    description:
      "Contacto de Kinetic Racing para patrocinios, prensa y estudiantes interesados en el equipo.",
    heading: "Contacto",
    status: "Los canales de contacto están en preparación.",
  },
} satisfies Record<string, PageMeta>;

export const home = {
  hero: {
    eyebrow: "Formula SAE · Key Institute · El Salvador",
    intro:
      "Somos el equipo de Formula SAE del Key Institute. Estudiantes de ingeniería que diseñan y construyen KR-01, nuestro primer monoplaza, en El Salvador.",
    primaryAction: { label: "Ver el carro", href: "/el-carro/" },
    secondaryAction: { label: "Ser sponsor", href: "/sponsors/" },
  },
  status: {
    heading: "Estado del proyecto",
    summary: (car: string, done: number, total: number) =>
      `${car}: ${done} de ${total} subsistemas terminados.`,
  },
  figures: {
    heading: "El equipo en cifras",
    labels: {
      members: "Miembros activos",
      subsystems: "Subsistemas",
      chassis: "Chasis terminado",
      car: "Primer monoplaza",
    },
  },
  fsae: {
    heading: "Qué es Formula SAE",
    intro:
      "Una competencia internacional de ingeniería en la que equipos universitarios diseñan, fabrican y corren un monoplaza. Jueces de la industria evalúan el carro en pista, pero también cómo se diseñó, cuánto cuesta producirlo y si el proyecto se sostiene como negocio.",
    companyNote:
      "Para una empresa es una vitrina de talento: estudiantes que ya trabajan con presupuestos, plazos y reglamentos reales.",
    phases: [
      {
        title: "Inspección técnica",
        description:
          "Antes de correr, el carro pasa una revisión de seguridad: estructura, frenos, inclinación y ruido. Sin aprobarla, no compite.",
      },
      {
        title: "Eventos estáticos",
        description:
          "El equipo defiende ante jueces de la industria el diseño del carro, su informe de costos y un plan de negocio.",
      },
      {
        title: "Eventos dinámicos",
        description:
          "Aceleración, skidpad, autocross y resistencia. En la pista se comprueba lo que el equipo diseñó.",
      },
    ],
  },
};

export const footer = {
  description: "Equipo de Formula SAE del Key Institute, El Salvador.",
  headings: {
    sections: "Secciones",
    participate: "Participar",
    follow: "Seguinos",
  },
  participateLinks: [
    { label: "Únete al equipo", href: "/unete/" },
    { label: "Ser sponsor", href: "/sponsors/" },
    { label: "Contacto", href: "/contacto/" },
  ] satisfies Link[],
  copyright: (year: number) => `© ${year} Kinetic Racing · Key Institute, El Salvador`,
};

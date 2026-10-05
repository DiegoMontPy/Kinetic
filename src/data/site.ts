import { subsystems } from "./subsystems";

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
  workshopPhoto: "FOTO DE TALLER",
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
      "Cómo llegar a Kinetic Racing: Instagram para sumarte al equipo, y una conversación directa con nosotros para patrocinarlo.",
    heading: "Contacto",
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

/** "Chasis, Diseño o Finanzas", from the active subsystems. */
const subsystemChoice = new Intl.ListFormat("es", { type: "disjunction" }).format(
  subsystems.map((subsystem) => subsystem.name),
);

/** Reasons to write through the Contacto form. Sponsorships are not one: they are arranged in person. */
export type ContactReason = "join" | "other";

interface ContactPathBase {
  /** Anchor on Contacto. Links from other pages point to `/contacto/#<id>`. */
  id: string;
  audience: string;
  title: string;
  text: string;
  link: Link;
}

/**
 * Students write on Instagram. Arriving through the anchor also picks `reason` in the form.
 * Companies do not write in: a sponsorship is talked over in a meeting with the team. The team email
 * (`email` in team.ts) appears on their path only once it exists.
 */
export type ContactPath =
  | (ContactPathBase & {
      channel: "instagram";
      reason: ContactReason;
      /** What to include in the message. */
      ask: string[];
    })
  | (ContactPathBase & { channel: "meeting" });

export const contactPage = {
  intro: {
    heading: "Hablemos",
    lead: "Para sumarte al equipo o para cualquier consulta, el canal es Instagram. Los patrocinios se conversan directamente con nosotros.",
  },
  channel: {
    label: "Canal principal",
    note: "Escribinos por mensaje directo.",
    /** Shown only once the team has an email (`email` in team.ts). */
    emailLabel: "Correo",
    placeLabel: "Dónde",
  },
  paths: {
    heading: "¿Cómo querés sumarte?",
    askLabel: "En el mensaje, contanos",
    instagramAction: "Escribir por Instagram",
    /** Shown on the sponsorship path only once the team has an email. */
    emailLabel: "Correo del equipo",
    emailAction: "Escribir al equipo",
    items: [
      {
        id: "patrocinar",
        channel: "meeting",
        audience: "Empresas",
        title: "Quiero patrocinar",
        text: "El patrocinio se conversa directamente con nosotros: nos reunimos con tu empresa, te presentamos KR-01 y te explicamos los beneficios de cada nivel.",
        link: { label: "Ver los niveles", href: "/sponsors/#niveles" },
      },
      {
        id: "unirse",
        channel: "instagram",
        reason: "join",
        audience: "Estudiantes",
        title: "Quiero entrar al equipo",
        text: "Contanos quién sos y qué te gustaría aprender; te explicamos cómo sumarte.",
        ask: [
          "Tu carrera y en qué año estás",
          `Qué subsistema te interesa: ${subsystemChoice}`,
          "Qué te gustaría aprender",
        ],
        link: { label: "Ver los subsistemas", href: "/unete/#subsistemas" },
      },
    ] satisfies ContactPath[],
  },
  /** Pending: the form is not connected to any service yet. It never sends anything. */
  form: {
    heading: "Escribinos desde acá",
    tag: "Sin conectar",
    lead: "Este formulario todavía no está conectado. Si lo enviás, te mostramos cómo hacernos llegar el mensaje por Instagram.",
    fields: {
      name: "Nombre",
      reply: "Correo o Instagram para responderte",
      reason: "Motivo",
      message: "Mensaje",
    },
    reasons: [
      { value: "join", label: "Entrar al equipo" },
      { value: "other", label: "Otra consulta" },
    ] satisfies { value: ContactReason; label: string }[],
    submit: "Enviar mensaje",
    notice: {
      title: "Este formulario todavía no envía mensajes",
      text: "Nada de lo que escribas acá nos llega. Escribinos por Instagram a",
      copyHint: "Podés copiar tu mensaje y pegarlo en el chat.",
      copy: "Copiar mi mensaje",
      copied: "Copiado. Pegalo en el chat de Instagram.",
      copyFailed: "No se pudo copiar. Seleccioná el texto del mensaje y copialo a mano.",
      open: "Abrir Instagram",
    },
  },
};

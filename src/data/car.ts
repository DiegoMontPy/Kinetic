export interface CarImage {
  /** File name inside src/assets/. */
  file: string;
  alt: string;
}

export const car = {
  name: "KR-01",
  chassisBuilt: 1,
  images: {
    render: {
      file: "kr01-chassis-render.png",
      alt: "Render del chasis tubular de acero de KR-01 en vista tres cuartos frontal",
    },
    side: {
      file: "kr01-chassis-lateral.png",
      alt: "Vista lateral del chasis tubular de acero de KR-01",
    },
    rear: {
      file: "kr01-chassis-trasera.png",
      alt: "Render del chasis tubular de acero de KR-01 en vista tres cuartos trasera",
    },
    wireframe: {
      file: "kr01-chassis-wireframe.png",
      alt: "Modelo CAD del chasis tubular de KR-01",
    },
    caption: "KR-01 · Chasis tubular de acero",
  } satisfies Record<string, CarImage | string>,
};

/** One row of the spec sheet. `null` marks a figure that does not exist yet. */
export interface Spec {
  label: string;
  value: string | null;
  unit?: string;
}

export const specs: Spec[] = [
  { label: "Categoría", value: "Formula SAE" },
  { label: "Chasis", value: "Tubular de acero soldado" },
  { label: "Peso", value: null, unit: "kg" },
  { label: "Distancia entre ejes", value: null, unit: "mm" },
  { label: "Potencia", value: null, unit: "hp" },
];

export interface CarView {
  id: string;
  /** Tab label. */
  label: string;
  caption: string;
  image: CarImage;
}

export const views: CarView[] = [
  {
    id: "front",
    label: "Frontal",
    caption: "Vista tres cuartos frontal",
    image: car.images.render,
  },
  { id: "side", label: "Lateral", caption: "Vista lateral", image: car.images.side },
  {
    id: "rear",
    label: "Trasera",
    caption: "Vista tres cuartos trasera",
    image: car.images.rear,
  },
];

/** The front view already leads the page, so the selector opens on the next one. */
export const defaultViewId = "side";

/**
 * Systems of the vehicle. They are not the team's subsystems (subsystems.ts):
 * a system exists even when no group of the team is working on it yet.
 */
export type VehicleSystemStatus = "done" | "in-progress" | "tbd";

export interface VehicleSystem {
  id: string;
  name: string;
  status: VehicleSystemStatus;
  /** What the system does, in one sentence. */
  role: string;
  /** Facts about what is already built. Empty while the system is not defined. */
  facts: { label: string; value: string }[];
  /** Decisions still open. */
  open: string[];
}

export const vehicleSystems: VehicleSystem[] = [
  {
    id: "chassis",
    name: "Chasis",
    status: "done",
    role: "La estructura que sostiene todos los sistemas del carro y rodea al piloto.",
    facts: [
      { label: "Estructura", value: "Tubular de acero" },
      { label: "Unión", value: "Soldada" },
      { label: "Construidos", value: `${car.chassisBuilt} chasis` },
      { label: "Modelo 3D", value: "Completo; de él salen los renders de esta página" },
    ],
    open: [],
  },
  {
    id: "suspension",
    name: "Suspensión",
    status: "tbd",
    role: "Une las ruedas al chasis y controla cómo se mueven sobre la pista.",
    facts: [],
    open: ["Geometría", "Amortiguadores y resortes"],
  },
  {
    id: "powertrain",
    name: "Powertrain",
    status: "tbd",
    role: "Genera la potencia y la lleva a las ruedas.",
    facts: [],
    open: ["Motor", "Transmisión", "Refrigeración"],
  },
  {
    id: "brakes",
    name: "Frenos",
    status: "tbd",
    role: "Detienen el carro en las cuatro ruedas.",
    facts: [],
    open: ["Discos y pinzas", "Circuito hidráulico"],
  },
  {
    id: "steering",
    name: "Dirección",
    status: "tbd",
    role: "Convierte el giro del volante en el giro de las ruedas delanteras.",
    facts: [],
    open: ["Mecanismo", "Columna y volante"],
  },
  {
    id: "aero",
    name: "Aerodinámica",
    status: "tbd",
    role: "Define cómo pasa el aire alrededor del carro.",
    facts: [],
    open: ["Carrocería", "Elementos aerodinámicos"],
  },
  {
    id: "electronics",
    name: "Electrónica",
    status: "tbd",
    role: "Conecta los sensores, el tablero y los controles del carro.",
    facts: [],
    open: ["Arnés", "Sensores", "Tablero"],
  },
];

export const vehicleStatusLabels: Record<VehicleSystemStatus, string> = {
  done: "Terminado",
  "in-progress": "En diseño",
  tbd: "Por definir",
};

export interface WorkshopShot {
  caption: string;
  /** Pending until the photo exists. File path inside src/assets/, e.g. "taller/soldadura.jpg". */
  photo: CarImage | null;
}

/** The first shot leads the gallery at a larger size. */
export const workshopShots: WorkshopShot[] = [
  { caption: "El chasis terminado", photo: null },
  { caption: "Soldadura de la estructura", photo: null },
  { caption: "Corte y ajuste de los tubos", photo: null },
];

export interface Generation {
  number: number;
  season: number;
  vehicle: string;
  /** Where the vehicle stands, in a few words. */
  state: string;
  image: CarImage;
}

/** Oldest first. Next season's vehicle goes at the end and becomes the current one. */
export const generations: Generation[] = [
  {
    number: 1,
    season: 2026,
    vehicle: car.name,
    state: "Chasis terminado, resto en diseño",
    image: car.images.side,
  },
];

export const currentGeneration = generations[generations.length - 1];

/** ["Generación 01", "Temporada 2026"]: the two halves of a generation's title. */
export const generationLabels = (generation: Generation) => [
  `Generación ${String(generation.number).padStart(2, "0")}`,
  `Temporada ${generation.season}`,
];

export type MilestoneStatus = "done" | "in-progress" | "pending";

/**
 * Where the current vehicle stands on its way to competition, in order. A milestone is a point of the
 * project, not a part of the car (`vehicleSystems`) nor a group of the team (subsystems.ts). No dates
 * until the team sets them.
 */
export const milestones: { text: string; status: MilestoneStatus }[] = [
  { text: "Chasis tubular de acero soldado y terminado", status: "done" },
  { text: "El resto del vehículo en diseño", status: "in-progress" },
  { text: "Sistemas fabricados y montados sobre el chasis", status: "pending" },
  { text: "Motor montado y encendido", status: "pending" },
  { text: "Primeras pruebas en pista", status: "pending" },
  { text: "Competencia de Formula SAE", status: "pending" },
];

export const milestoneStatusLabels: Record<MilestoneStatus, string> = {
  done: "Cumplido",
  "in-progress": "En curso",
  pending: "Pendiente",
};

export const carPage = {
  overview: {
    status: [
      { status: "done", text: "Chasis tubular de acero, soldado y terminado" },
      { status: "in-progress", text: "Resto del vehículo en diseño" },
    ] satisfies { status: VehicleSystemStatus; text: string }[],
    specHeading: "Ficha técnica",
    specPending: "Por definir",
  },
  views: {
    heading: "Vistas del vehículo",
    lead: "El chasis de KR-01 desde tres ángulos, renderizado a partir del modelo 3D del equipo.",
    tabsLabel: "Vista del chasis",
  },
  systems: {
    heading: "Sistemas del vehículo",
    lead: (done: number, total: number) =>
      `${done} de ${total} sistemas terminados. El resto se publica a medida que el equipo lo define.`,
    factsHeading: "Lo que está hecho",
    openHeading: "Falta definir",
  },
  workshop: {
    heading: "Fabricación",
    lead: "El chasis se cortó, se ajustó y se soldó en el taller. Las fotos del proceso se suman a esta galería a medida que el equipo las publica.",
  },
  generation: {
    text: "KR-01 es el primer monoplaza de Kinetic Racing y abre la serie. Cada temporada, el vehículo nuevo se suma a este archivo y los anteriores quedan registrados aquí.",
    archiveLabel: "Archivo de generaciones",
    current: "Actual",
  },
};

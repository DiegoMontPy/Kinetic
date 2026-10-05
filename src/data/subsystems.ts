export type SubsystemStatus = "done" | "in-progress" | "pending";

export interface Subsystem {
  id: string;
  name: string;
  status: SubsystemStatus;
  /** What the group does, in one sentence. */
  role: string;
  /** What a new member learns there. */
  learn: string[];
  /** Who it suits. Completes the sentence "Es para vos si…". */
  fit: string;
}

/** Active subsystems. Adding an entry here is enough for it to appear across the site. */
export const subsystems: Subsystem[] = [
  {
    id: "chassis",
    name: "Chasis",
    status: "done",
    role: "Diseña y fabrica la estructura tubular de acero que sostiene todo el carro y protege al piloto.",
    learn: [
      "Modelado 3D de estructuras",
      "Corte, ajuste y soldadura de tubos",
      "Las reglas de seguridad que revisa la inspección técnica",
    ],
    fit: "te gusta ver cómo una pieza pasa del modelo al taller.",
  },
  {
    id: "design",
    name: "Diseño",
    status: "in-progress",
    role: "Define en CAD los sistemas que le faltan al carro y cómo se montan sobre el chasis.",
    learn: [
      "Modelado y ensambles en CAD",
      "Cómo se elige una pieza: cargas, peso y costo",
      "El reglamento técnico de Formula SAE",
    ],
    fit: "te gusta resolver cómo encajan las piezas antes de fabricarlas.",
  },
  {
    id: "finance",
    name: "Finanzas",
    status: "in-progress",
    role: "Consigue y administra los recursos del proyecto: presupuesto, compras y la relación con los sponsors.",
    learn: [
      "Armar y controlar un presupuesto",
      "Presentar el proyecto a empresas",
      "El informe de costos que evalúan los jueces",
    ],
    fit: "te interesa cómo un proyecto de ingeniería se financia y se sostiene.",
  },
];

export const statusLabels: Record<SubsystemStatus, string> = {
  done: "Terminado",
  "in-progress": "En curso",
  pending: "Pendiente",
};

export type SubsystemStatus = "done" | "in-progress" | "pending";

export interface Subsystem {
  id: string;
  name: string;
  status: SubsystemStatus;
}

/** Active subsystems. Adding an entry here is enough for it to appear across the site. */
export const subsystems: Subsystem[] = [
  { id: "chassis", name: "Chasis", status: "done" },
  { id: "design", name: "Diseño", status: "in-progress" },
  { id: "finance", name: "Finanzas", status: "in-progress" },
];

export const statusLabels: Record<SubsystemStatus, string> = {
  done: "Terminado",
  "in-progress": "En curso",
  pending: "Pendiente",
};

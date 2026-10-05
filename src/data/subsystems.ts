/**
 * The team's working groups. A subsystem is never finished: all of them work for the whole project,
 * so none has a status. How far the project has come is in `milestones` (car.ts), and the parts of the
 * car, such as the chassis, are in `vehicleSystems` (car.ts).
 */
export interface Subsystem {
  id: string;
  name: string;
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
    id: "manufacturing",
    name: "Manufactura",
    role: "Lleva al taller lo que Diseño define: corta, ajusta, suelda y arma las piezas, y las monta sobre el carro.",
    learn: [
      "Corte y ajuste de tubos y piezas a medida",
      "Soldadura de estructuras de acero",
      "Armado de conjuntos a partir de los planos",
    ],
    fit: "te gusta trabajar con las manos y ver cómo una pieza toma forma en el taller.",
  },
  {
    id: "design",
    name: "Diseño",
    role: "Define en CAD cada pieza de KR-01 antes de que llegue al taller: su forma, su material y cómo se monta sobre el chasis.",
    learn: [
      "Modelado de piezas y ensambles en CAD",
      "Cómo se elige una pieza: cargas, peso y costo",
      "El reglamento técnico y las reglas de seguridad que revisa la inspección técnica",
    ],
    fit: "te gusta resolver cómo encajan las piezas antes de fabricarlas.",
  },
  {
    id: "finance",
    name: "Finanzas",
    role: "Consigue y administra los recursos del proyecto: presupuesto, compras y la relación con los sponsors.",
    learn: [
      "Armar y controlar un presupuesto",
      "Presentar el proyecto a empresas",
      "El informe de costos y el plan de negocio que evalúan los jueces",
    ],
    fit: "te interesa cómo un proyecto de ingeniería se financia y se sostiene.",
  },
];

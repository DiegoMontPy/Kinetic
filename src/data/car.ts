export interface CarImage {
  /** File name inside src/assets/. */
  file: string;
  alt: string;
}

export const car = {
  name: "KR-01",
  chassisBuilt: 1,
  /** Pending: final specifications are not defined yet. */
  specs: null,
  images: {
    render: {
      file: "kr01-chassis-render.png",
      alt: "Render del chasis tubular de acero de KR-01 en vista tres cuartos frontal",
    },
    wireframe: {
      file: "kr01-chassis-wireframe.png",
      alt: "Modelo CAD del chasis tubular de KR-01",
    },
    social: {
      file: "kr01-chassis-lateral.png",
      alt: "Vista lateral del chasis tubular de acero de KR-01",
    },
    caption: "KR-01 · Chasis tubular de acero",
  } satisfies Record<string, CarImage | string>,
};

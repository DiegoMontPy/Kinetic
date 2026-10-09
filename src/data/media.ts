import { placeholderLabels } from "./site";

/**
 * Every place on the site that takes a photo or a video, named after the page and the spot where it
 * appears. Adding a photo is copying the file to src/assets/fotos/ and writing its name in `file`.
 */
export interface PhotoSlot {
  /** Placeholder label while the file is missing (`placeholderLabels` in site.ts). */
  label: string;
  /** Shown with the photo. */
  caption: string;
  /** Describes the photo the slot asks for. If the real photo shows something else, describe that. */
  alt: string;
  /** File name inside src/assets/fotos/, e.g. "equipo-taller.jpg". `null` until the photo exists. */
  file: string | null;
  /**
   * Which part of the photo stays in view when its frame crops it, as CSS `object-position`
   * ("50% 40%"). Centered when omitted.
   */
  position?: string;
}

/** A video served by the site itself, never embedded from another service. */
export interface VideoSlot {
  caption: string;
  /** What the video shows, for anyone who does not play it. */
  description: string;
  /** Shown in the frame while the video is missing. */
  pending: string;
  /** What can be heard, in brackets. Becomes the captions track for the whole video. */
  captions: string;
  /**
   * File names inside src/assets/video/: the MP4 and its poster image. `null` until both exist,
   * because a video never goes up without its poster.
   */
  file: { video: string; poster: string } | null;
}

const { teamPhoto, vehiclePhoto, workshopPhoto } = placeholderLabels;

export const media: {
  home: { band: PhotoSlot; fsae: PhotoSlot; strip: PhotoSlot[] };
  car: { video: VideoSlot; workshop: PhotoSlot[] };
  join: { band: PhotoSlot; subsystems: Record<string, PhotoSlot> };
  sponsors: { team: PhotoSlot };
} = {
  home: {
    /** Full-width band between the figures and "Qué es Formula SAE". */
    band: {
      label: teamPhoto,
      caption: "El equipo trabajando en el chasis de KR-01",
      alt: "Cuatro integrantes de Kinetic Racing sostienen y alinean los tubos del chasis de KR-01, todavía sin pintar, sobre caballetes al aire libre",
      file: "equipo-chasis-al-aire-libre.jpg",
      position: "50% 40%",
    },
    /** Beside "Qué es Formula SAE". */
    fsae: {
      label: vehiclePhoto,
      caption: "El chasis de KR-01, el primer monoplaza del equipo",
      alt: "El chasis tubular de acero de KR-01, pintado de negro, sobre caballetes en el taller",
      file: "chasis-pintado-frente.jpg",
      position: "50% 65%",
    },
    /** Three photos before the sponsors, from the workshop to the track. */
    strip: [
      {
        label: teamPhoto,
        caption: "El equipo completo",
        alt: "El equipo completo de Kinetic Racing",
        file: null,
      },
      {
        label: workshopPhoto,
        caption: "El taller",
        alt: "El taller donde el equipo construye KR-01",
        file: null,
      },
      {
        label: vehiclePhoto,
        caption: "El chasis de KR-01",
        alt: "El chasis tubular de acero de KR-01",
        file: null,
      },
    ],
  },
  car: {
    /** El carro, under the overview. */
    video: {
      caption: "Primer encendido, en pruebas de montaje",
      description: "El motor de KR-01 encendido en una prueba de montaje sobre el chasis.",
      pending:
        "El motor ya se encendió en una prueba de montaje sobre el chasis. El video se suma acá cuando esté disponible.",
      captions: "[Motor encendido]",
      file: null,
    },
    /** Fabricación gallery. The first shot leads at a larger size. */
    workshop: [
      {
        label: workshopPhoto,
        caption: "El chasis terminado",
        alt: "El chasis de KR-01 terminado y pintado de negro, sobre caballetes en el taller",
        file: "chasis-pintado-tres-cuartos.jpg",
      },
      {
        label: workshopPhoto,
        caption: "Soldadura de la estructura",
        alt: "Soldadura de la estructura del chasis de KR-01",
        file: null,
      },
      {
        label: workshopPhoto,
        caption: "Ajuste de los tubos sobre la mesa",
        alt: "Tres integrantes del equipo acomodan el arco principal y los tubos del chasis de KR-01 sobre la mesa del taller, de noche",
        file: "ajuste-de-tubos-en-la-mesa.jpg",
        position: "50% 30%",
      },
    ],
  },
  join: {
    /** Full-width band after the opening statement. */
    band: {
      label: teamPhoto,
      caption: "El equipo completo",
      alt: "El equipo completo de Kinetic Racing",
      file: null,
    },
    /** One per subsystem chapter, under the subsystem's `id` (subsystems.ts). */
    subsystems: {
      manufacturing: {
        label: workshopPhoto,
        caption: "Manufactura en el taller",
        alt: "Integrantes de Manufactura soldando en el taller",
        file: null,
      },
      design: {
        label: teamPhoto,
        caption: "Diseño frente al CAD",
        alt: "Integrantes de Diseño trabajando en el modelo CAD de KR-01",
        file: null,
      },
      finance: {
        label: teamPhoto,
        caption: "Finanzas presenta el proyecto",
        alt: "Integrantes de Finanzas presentando el proyecto",
        file: null,
      },
    },
  },
  sponsors: {
    /** Beside the opening of Sponsors: what a company sponsors. */
    team: {
      label: teamPhoto,
      caption: "El chasis de KR-01, donde va tu marca",
      alt: "El chasis tubular de acero de KR-01, pintado de negro, visto desde atrás y de costado sobre caballetes en el taller",
      file: "chasis-pintado-costado.jpg",
      position: "50% 8%",
    },
  },
};

/** Every video on the site, so each one gets its captions file (src/pages/video/[name].vtt.ts). */
export const videos: VideoSlot[] = [media.car.video];

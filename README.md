# Kinetic Racing

Sitio web oficial de Kinetic Racing, el equipo de Formula SAE del Key Institute, El Salvador.
Es un sitio estático hecho con Astro y TypeScript, sin frameworks de UI ni dependencias en tiempo de ejecución.

## Requisitos

- Node 24.21.0 (fijado en `.nvmrc`; mínimo 24.16) y npm 11.

## Instalación

```bash
npm ci
```

## Comandos

- `npm run dev`: servidor de desarrollo en `http://localhost:4321`.
- `npm run build`: genera el sitio estático en `dist/`.
- `npm run preview`: sirve `dist/` en local.
- `npm run lint`: `astro check`, ESLint y verificación de formato con Prettier.
- `npm run format`: formatea el proyecto con Prettier.

## Estructura

```
src/
  assets/      imágenes procesadas por astro:assets (logos en sponsors/, fotos en fotos/, videos en video/)
  components/  componentes, uno por archivo
  data/        contenido editable
  layouts/     layout base
  lib/         rutas, imágenes y revelado al hacer scroll
  pages/       rutas del sitio
  styles/      tokens.css y global.css
public/        favicon y fuentes
scripts/       generación de renders con Blender
docs/          CONVENCIONES.md
```

## Editar el contenido

- Todo el texto y los datos están en `src/data/`: `site.ts`, `team.ts`, `subsystems.ts`, `sponsors.ts`, `car.ts` y `media.ts`.
- `null` marca un dato pendiente; el sitio muestra el placeholder o lo omite.
- Las reglas completas están en `docs/CONVENCIONES.md`.

## Agregar el vehículo de una temporada nueva

- Agregá una entrada al final de `generations` en `src/data/car.ts`: pasa a ser la generación actual.
- Actualizá en el mismo archivo `car`, `specs`, `views` y `vehicleSystems` con los datos del vehículo nuevo.
- Los vehículos anteriores siguen listados en el archivo de generaciones de El carro.

## Completar los pendientes de Contacto, Únete y Sponsors

- Correo del equipo: sigue pendiente (`email: null` en `src/data/team.ts`), así que el sitio no lo muestra en ningún lado. Al completarlo aparece en tres lugares:
  - Contacto, arriba, junto a Instagram y la ubicación.
  - Contacto, en el camino de empresas, con el botón "Escribir al equipo".
  - La banda de cierre de Inicio y Sponsors, como la forma de coordinar la reunión de patrocinio.
- Paquete de patrocinio: copiá el PDF a `public/` y completá `sponsorshipPackage` en `src/data/sponsors.ts`. Mientras tanto, la banda lo muestra "En preparación".
- Reuniones: completá `meetings` en `src/data/team.ts` (`day`, `time` y `place`, escritos como se leen en una frase).
- Formulario de Contacto: hoy no envía nada y lo dice. Para conectarlo, seguí la nota de `docs/CONVENCIONES.md`.
- Formulario propio para aplicar: cuando exista, cambiá `joinPage.meetings.apply.href` en `src/data/site.ts`.

## Agregar una foto

1. Copiá la foto a `src/assets/fotos/`, con nombre en kebab-case (`equipo-taller.jpg`). Usá el original más grande que tengas: el sitio genera los tamaños.
2. En `src/data/media.ts`, buscá el espacio de la tabla de abajo y poné el nombre en `file`: `file: "equipo-taller.jpg"`.
3. Si la foto muestra algo distinto de lo que pide el espacio, corregí `alt` y, si hace falta, `caption`.

## Agregar un video

1. Exportalo en MP4, de hasta 25 MB, con el comando de `docs/CONVENCIONES.md`.
2. Copiá el video y su portada (una imagen 16:9) a `src/assets/video/`: `kr01-motor.mp4` y `kr01-motor.jpg`.
3. En `src/data/media.ts`, en `car.video`, poné los dos nombres: `file: { video: "kr01-motor.mp4", poster: "kr01-motor.jpg" }`.

## Espacios para fotos y video

| Página   | Espacio en `media.ts`           | Forma                  | Qué va                                                                         |
| -------- | ------------------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| Inicio   | `home.band`                     | Banda a sangre         | El equipo trabajando en el taller                                              |
| Inicio   | `home.fsae`                     | Foto al lado del texto | El chasis o el carro, en "Qué es Formula SAE"                                  |
| Inicio   | `home.strip` (tres)             | Tira de tres fotos     | El equipo completo, el taller y el chasis. Aparece cuando están las tres fotos |
| El carro | `car.video`                     | Video con portada      | KR-01 con el motor montado y encendido                                         |
| El carro | `car.workshop` (tres)           | Galería de Fabricación | El chasis terminado, la soldadura y el corte                                   |
| Únete    | `join.band`                     | Banda a sangre         | El equipo completo                                                             |
| Únete    | `join.subsystems.manufacturing` | Foto al lado del texto | Manufactura soldando o cortando                                                |
| Únete    | `join.subsystems.design`        | Foto al lado del texto | Diseño frente al CAD                                                           |
| Únete    | `join.subsystems.finance`       | Foto al lado del texto | Finanzas presentando el proyecto                                               |
| Sponsors | `sponsors.team`                 | Foto al lado del texto | El equipo con KR-01                                                            |

Contacto no lleva fotos.

## Agregar un sponsor

- Copiá el logo a `src/assets/sponsors/`: SVG, o PNG con fondo transparente, con nombre en kebab-case.
- Agregá una entrada en `src/data/sponsors.ts` con `name`, `tier`, `logo`, `plate` y, si existe, `url`.
- `plate` es `"light"` para un logo oscuro y `"dark"` para uno que viene en blanco. El archivo del logo no se edita.
- Si el archivo del logo no está, el sitio muestra un placeholder en su lugar.

## Build

- `npm run build` genera `dist/`, listo para servir como archivos estáticos.
- `SITE_URL` y `BASE_PATH` definen el dominio y la ruta base (por defecto `https://diegomontpy.github.io` y `/`).
- Para publicar en un subdirectorio: `SITE_URL=https://diegomontpy.github.io BASE_PATH=/Kinetic/ npm run build`.
- Cada push a `main` publica el sitio en GitHub Pages (`https://diegomontpy.github.io/Kinetic/`).

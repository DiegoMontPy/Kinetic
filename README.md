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
  assets/      imágenes procesadas por astro:assets (logos en sponsors/)
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

- Todo el texto y los datos están en `src/data/`: `site.ts`, `team.ts`, `subsystems.ts`, `sponsors.ts` y `car.ts`.
- `null` marca un dato pendiente; el sitio muestra el placeholder o lo omite.
- Las reglas completas están en `docs/CONVENCIONES.md`.

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

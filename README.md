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
  assets/      imágenes procesadas por astro:assets (logos en sponsors/, fotos en fotos/, publicaciones en instagram/, videos en video/)
  components/  componentes, uno por archivo
  data/        contenido editable
  layouts/     layout base
  lib/         rutas, imágenes y revelado al hacer scroll
  pages/       rutas del sitio
  styles/      tokens.css y global.css
public/        favicon y fuentes
scripts/       renders con Blender y el video demo (video/, con sus propias dependencias)
docs/          CONVENCIONES.md
```

## Editar el contenido

- Todo el texto y los datos están en `src/data/`: `site.ts`, `team.ts`, `subsystems.ts`, `sponsors.ts`, `car.ts`, `media.ts` e `instagram.ts`.
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

1. Dejá el original fuera del repositorio, en `../fotos/`. Al repositorio entra una copia en `src/assets/fotos/`: lado largo de hasta 2400 px, JPG de buena calidad, sin metadatos (las fotos del celular guardan la ubicación) y con nombre en kebab-case (`equipo-taller.jpg`). El sitio genera los tamaños.
2. En `src/data/media.ts`, buscá el espacio de la tabla de abajo y poné el nombre en `file`: `file: "equipo-taller.jpg"`.
3. Si el marco recorta la foto (las bandas son apaisadas y la foto al lado del texto es 16:9), elegí qué parte queda a la vista con `position`, como en CSS: `position: "50% 30%"` sube el encuadre.
4. Escribí `caption` y `alt` según lo que se ve en la foto, aunque el espacio pida otra cosa.

Se puede recortar, enderezar y corregir la exposición, el balance de blancos y la perspectiva. Nada que cambie lo que muestra la foto; las reglas completas están en `docs/CONVENCIONES.md`.

## Agregar un video

1. Exportalo en MP4, de hasta 25 MB, con el comando de `docs/CONVENCIONES.md`.
2. Copiá el video y su portada (una imagen 16:9) a `src/assets/video/`: `kr01-motor.mp4` y `kr01-motor.jpg`.
3. En `src/data/media.ts`, en `car.video`, poné los dos nombres: `file: { video: "kr01-motor.mp4", poster: "kr01-motor.jpg" }`.

## Espacios para fotos y video

| Página   | Espacio en `media.ts`           | Forma                  | Qué va                                                                         |
| -------- | ------------------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| Inicio   | `home.band`                     | Banda a sangre         | El equipo trabajando en el chasis o en el taller                               |
| Inicio   | `home.fsae`                     | Foto al lado del texto | El chasis o el carro, en "Qué es Formula SAE"                                  |
| Inicio   | `home.strip` (tres)             | Tira de tres fotos     | El equipo completo, el taller y el chasis. Aparece cuando están las tres fotos |
| El carro | `car.video`                     | Video con portada      | El primer encendido del motor, en pruebas de montaje                           |
| El carro | `car.workshop` (tres)           | Galería de Fabricación | El chasis terminado, la soldadura y el ajuste de los tubos                     |
| Únete    | `join.band`                     | Banda a sangre         | El equipo completo                                                             |
| Únete    | `join.subsystems.manufacturing` | Foto al lado del texto | Manufactura soldando o cortando                                                |
| Únete    | `join.subsystems.design`        | Foto al lado del texto | Diseño frente al CAD                                                           |
| Únete    | `join.subsystems.finance`       | Foto al lado del texto | Finanzas presentando el proyecto                                               |
| Sponsors | `sponsors.team`                 | Foto al lado del texto | El chasis o el carro, donde va la marca del sponsor                            |

Contacto no lleva fotos, salvo las publicaciones de Instagram, que son el canal mismo (ver abajo).

## Agregar o cambiar una publicación de Instagram

Contacto muestra las últimas publicaciones de la cuenta debajo del perfil. Cada una es una foto guardada en el repositorio que lleva a la publicación en Instagram.

1. Copiá la foto de la publicación a `src/assets/instagram/`, con nombre en kebab-case (`2026-10-chasis.jpg`). Usá el original que se subió; si es un carrusel, la primera foto; si es un reel, su portada.
2. En Instagram, abrí la publicación y copiá su enlace (Compartir → Copiar enlace).
3. En `src/data/instagram.ts`, agregá la entrada al principio de `instagramPosts`, con el nombre de la foto, el enlace y lo que muestra la foto:
   `{ file: "2026-10-chasis.jpg", url: "https://www.instagram.com/p/…/", alt: "El chasis de KR-01 en el taller" },`
4. Para cambiar una publicación, editá su entrada; para sacarla, borrá la entrada y su foto.

- Se muestran las seis primeras de la lista, en filas de tres. Con tres, cuatro o cinco se ven las tres primeras; con menos de tres, solo el perfil.
- La foto se recorta al cuadrado desde el centro.
- Una entrada cuya foto no está en la carpeta no se muestra.

## Agregar un sponsor

- Copiá el logo a `src/assets/sponsors/`: SVG, o PNG con fondo transparente, con nombre en kebab-case.
- Agregá una entrada en `src/data/sponsors.ts` con `name`, `tier`, `logo`, `plate` y, si existe, `url`.
- `plate` es `"light"` para un logo oscuro y `"dark"` para uno que viene en blanco. El archivo del logo no se edita.
- Si el logo tiene fondo transparente, agregá `transparent: true`: no se funde con la placa y se ve con sus colores exactos.
- Si una empresa manda el logo con fondo o en una lámina con varias versiones, guardá lo que mandó en `../logos-recibidos/` y usá una versión de trabajo que solo quite el fondo liso. Anotala como provisional en `docs/CONVENCIONES.md` hasta que llegue el archivo oficial.
- Si el archivo del logo no está, el muro muestra un placeholder en su lugar.
- Los logos se ven siempre a color: en el muro de Inicio y Sponsors, en la fila bajo la portada de Inicio y en el pie del resto de las páginas. Las filas solo muestran los logos que tienen archivo.

## Video demo

El video que se proyecta de fondo en los eventos se graba con un script sobre el sitio publicado: un recorrido sin sonido por Inicio, El carro y Sponsors, que hace loop.

1. Instalá sus dependencias, que van aparte de las del sitio y no entran en el build ni en el CI: `npm --prefix scripts/video ci`.
2. Grabá primero un tramo corto para revisarlo: `node scripts/video/record.mjs --test` deja `../video-demo/kinetic-demo-prueba.mp4`.
3. Grabá el video completo: `node scripts/video/record.mjs` deja `../video-demo/kinetic-demo-4k.mp4` y `kinetic-demo-1080p.mp4`. Tarda entre 30 y 40 minutos.

- Usa el Google Chrome instalado en la computadora; con `--chrome <ruta>` se elige otro. Con `--site <url>` se graba otra dirección, por ejemplo la de `npm run preview`.
- El recorrido está en `shots`, al principio de `scripts/video/record.mjs`: por página, a qué parte va y cuántos segundos se queda.
- Si un tramo muestra algo pendiente (una etiqueta "Por definir", un placeholder o una banda vacía), la grabación se corta y dice dónde. Ajustá el recorrido para saltarlo.
- Tiene que durar entre 60 y 90 segundos; si no, el script avisa.

## Build

- `npm run build` genera `dist/`, listo para servir como archivos estáticos.
- `SITE_URL` y `BASE_PATH` definen el dominio y la ruta base (por defecto `https://diegomontpy.github.io` y `/`).
- Para publicar en un subdirectorio: `SITE_URL=https://diegomontpy.github.io BASE_PATH=/Kinetic/ npm run build`.
- Cada push a `main` publica el sitio en GitHub Pages (`https://diegomontpy.github.io/Kinetic/`).

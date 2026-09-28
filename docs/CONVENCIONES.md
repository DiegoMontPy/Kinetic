# Convenciones

## Idioma

- Identificadores, nombres de archivo y comentarios del código en inglés.
- Todo el texto visible del sitio en español. Las únicas excepciones son el lema y las frases de marca, marcadas con `lang="en"`.

## Contenido

- El contenido se cambia editando solo estos cinco archivos de `src/data/`: `site.ts`, `team.ts`, `subsystems.ts`, `sponsors.ts` y `car.ts`.
- Ningún componente lleva texto escrito a mano: todo sale de esos archivos.
- `null` (o una lista vacía) marca un dato pendiente. Nunca se rellena con texto inventado.
- Un subsistema nuevo se abre agregando una entrada en `subsystems.ts`. La cuadrícula de estado y las cifras se ajustan solas.

## Diseño

- Todos los colores, tamaños, espaciados, radios y tiempos salen de `src/styles/tokens.css`.
- Los puntos de corte son fijos por convención: 640px (layout) y 960px (navegación). CSS no permite usar variables dentro de las media queries.
- Un solo acento, `--color-accent`. `--color-done` se usa solo para el estado "terminado".
- El texto azul sobre `surface` o `surface-alt` usa `--color-accent-hover`, porque `--color-accent` no llega a AA sobre esos fondos.
- Lo que falta se muestra siempre con `Placeholder.astro` y una etiqueta de `placeholderLabels` (`site.ts`): 16:9 para fotos y renders, 1:1 para logos y retratos.

## Imágenes

- Van en `src/assets/` y se procesan con `astro:assets`. Se resuelven con `findAsset()` (`src/lib/assets.ts`), que devuelve `undefined` si el archivo no existe.
- El hero usa `kr01-chassis-render.png`. Si no existe, cae a `kr01-chassis-wireframe.png`, y si tampoco está, al placeholder.
- La imagen para redes sociales (1200×630) se genera del render lateral, porque el recorte 1.91:1 no corta el chasis.
- Astro copia a `dist/` el original de toda imagen de `src/assets/` que no se procese. Hoy le pasa a `kr01-chassis-trasera.png`, que ninguna página usa: se resuelve cuando El carro lo muestre.

## Logos de sponsors

- Formato preferido: SVG. Alternativa: PNG con fondo transparente.
- Nombre en kebab-case con el nombre de la empresa (`grupo-infrasal.svg`), sin márgenes vacíos alrededor del logo.
- Decisión actual: todos los logos van sobre la misma placa clara (`--color-plate`) con igual padding y proporción 1:1. `mix-blend-mode: multiply` funde los fondos blancos con la placa.
- Pendiente: cuando lleguen los logos definitivos en SVG o en versión blanca, pasar a logos transparentes sobre negro.
- Niveles: `platinum`, `gold`, `silver`, `bronze` y `provisional`. Mientras todos sean `provisional`, el muro muestra un solo grupo.

## Renders del chasis

- El modelo `.blend` no va al repositorio (`*.blend` y `*.blend1` están ignorados).
- Para regenerarlos, con Blender 5.2 o posterior:

```bash
blender -b ruta/a/Chasis.blend -P scripts/render-chassis.py
```

- Salida en `src/assets/`: `kr01-chassis-render.png` (tres cuartos frontal), `kr01-chassis-lateral.png` y `kr01-chassis-trasera.png`, en PNG RGBA de 2400×1800.
- El script crea su propia cámara (70 mm, encuadre calculado sobre la malla) y sus tres luces, y respeta los materiales del archivo.
- `FRONT_AZIMUTH_DEG` asume que la nariz del modelo apunta a −X.

## Fuentes

- Lexend y Albert Sans, descargadas de `github.com/google/fonts` (`ofl/lexend`, `ofl/albertsans`) con sus licencias OFL en `public/fonts/`.
- Recortadas a latín y a los pesos en uso con fontTools:
  `fonttools varLib.instancer <fuente> wght=600:700` (Lexend) o `wght=400:600` (Albert Sans), y luego `pyftsubset --unicodes=<rango latín> --flavor=woff2`.
- Ninguna de las dos trae cifras tabulares. Los contadores reservan su ancho final en `ch`.

## Animación

- Revelado con `data-reveal` y contadores con `data-count`. La lógica está en `src/lib/reveal.js` y se incrusta en `<head>`: sin JavaScript no se oculta nada.
- El hero tiene su propia secuencia de entrada en CSS. `prefers-reduced-motion: reduce` desactiva todo.

## Variables de entorno

- `SITE_URL`: origen público. Por defecto `https://diegomontpy.github.io`. Pendiente: dominio definitivo (probablemente de la universidad).
- `BASE_PATH`: ruta base. Por defecto `/`; en GitHub Pages es `/Kinetic/`.
- En Git Bash para Windows hay que anteponer `MSYS_NO_PATHCONV=1`: si no, `/Kinetic/` se convierte en una ruta de disco.

## Commits

- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`), descripción en español, en imperativo, una línea.
- Un commit por unidad coherente de trabajo. `npm run lint` y `npm run build` tienen que pasar antes de cada commit.

# Convenciones

## Idioma

- Identificadores, nombres de archivo y comentarios del código en inglés.
- Todo el texto visible del sitio en español. Las únicas excepciones son el lema y las frases de marca, marcadas con `lang="en"`.

## Contenido

- El contenido se cambia editando solo estos seis archivos de `src/data/`: `site.ts`, `team.ts`, `subsystems.ts`, `sponsors.ts`, `car.ts` y `media.ts`.
- Ningún componente lleva texto escrito a mano: todo sale de esos archivos.
- `null` (o una lista vacía) marca un dato pendiente. Nunca se rellena con texto inventado.
- Un pendiente que el visitante solo mira (una cifra, una foto, un nivel) se muestra con su placeholder. Un pendiente que el visitante tendría que usar, como un canal de contacto, se omite mientras falte: no se muestra en blanco.
- Los subsistemas son los grupos de trabajo del equipo: Manufactura, Diseño y Finanzas. No son partes del carro ni etapas: trabajan durante todo el proyecto, así que ninguno tiene estado ni se termina. El chasis es una parte del carro y está en `vehicleSystems` (`car.ts`).
- Un subsistema nuevo se abre agregando una entrada en `subsystems.ts`: Únete le suma un capítulo, Contacto lo nombra y la cifra de Inicio se ajusta sola. Su foto va en `media.join.subsystems`, bajo su `id`.
- Cada subsistema dice qué hace (`role`), qué se aprende (`learn`) y para quién es (`fit`, que completa la frase "Es para vos si…"). Únete los muestra uno por capítulo, y Contacto los nombra en el camino de estudiantes.
- "Estado del proyecto", en Inicio, muestra los hitos del vehículo camino a competir (`milestones` en `car.ts`), en orden. Un hito pasa a `done` cuando se cumple y queda cumplido. Ningún hito lleva fecha hasta que el equipo la fije.
- Los hitos hablan del proyecto y los sistemas del vehículo, de las partes del carro, así que tienen que coincidir: un hito cumplido sobre una parte corresponde a un sistema en `done`, y ningún hito da por fabricado un sistema que sigue en `tbd`.
- Los sistemas del vehículo (`vehicleSystems` en `car.ts`) no son los subsistemas del equipo: un sistema existe aunque ningún grupo lo tenga asignado. Sin especificaciones confirmadas, un sistema queda en `tbd` y solo lista lo que falta definir.
- Cada vehículo es una generación (`generations` en `car.ts`). El del año siguiente se agrega al final de la lista, pasa a ser el actual y El carro lo muestra sin cambios en las páginas; los anteriores quedan en el archivo.
- Los beneficios de cada nivel de patrocinio están en `tierOffers` (`sponsors.ts`). El primer nivel de la lista se resalta en azul.

## Patrocinio

- Los patrocinios se arreglan en persona: el equipo se reúne con la empresa, le presenta el proyecto y le explica los beneficios. La página Sponsors es el material que respalda esa conversación, no un canal de entrada.
- Ninguna página invita a una empresa a escribir por Instagram ni ofrece un formulario de sponsors.
- "Tu logo aquí" lleva a los niveles (`/sponsors/#niveles`). La banda de cierre (`sponsorSection.cta`) explica la reunión y presenta el paquete en PDF, que es lo que se le deja a la empresa después.
- El paquete va en `sponsorshipPackage` (`sponsors.ts`). Mientras falte, la banda lo muestra "En preparación"; cuando exista, pasa a ser una descarga.
- El correo del equipo (`email` en `team.ts`) no se muestra mientras sea `null`. Cuando exista, la banda suma la línea para coordinar la reunión.

## Contacto, Únete y 404

- Instagram es el canal para sumarse al equipo y para consultas generales. Para empresas, Contacto explica que el patrocinio se conversa directamente con el equipo, y lleva a los niveles. El correo aparece ahí cuando exista.
- Contacto tiene un camino por motivo en `contactPage.paths` (`site.ts`), cada uno con su ancla: `#patrocinar` y `#unirse`. El botón Aplicar de Únete lleva a `/contacto/#unirse`: al llegar, el camino se marca en azul y el formulario elige ese motivo.
- El formulario de Contacto no está conectado. Al enviarlo no sale nada de la página, ni siquiera en la URL (`method="dialog"`): avisa que no funciona, ofrece copiar lo escrito y abrir Instagram. Nunca simula un envío. Para conectarlo hay que darle un destino real y sacar el aviso y la etiqueta "Sin conectar" (`contactPage.form`).
- Mientras no exista un formulario propio para aplicar, `joinPage.meetings.apply` lleva a Contacto.
- Día, hora y lugar de reunión van en `meetings` (`team.ts`), escritos como se leen dentro de la frase de Únete: `day: "los sábados"`, `time: "9:00"`, `place: "el taller del Key Institute"`. Mientras sea `null`, la frase muestra los tres pendientes.
- Equipo queda provisional a propósito: una línea de estado (`pages.team.status`) hasta que haya nombres y roles en `members`.
- `404.astro` se sirve para cualquier ruta que no existe, a cualquier profundidad. Funciona desde `/Kinetic/` porque todo enlace y recurso lleva la ruta base. Lleva `noindex`, no tiene canonical y queda fuera del sitemap.

## Diseño

- Todos los colores, tamaños, espaciados, radios y tiempos salen de `src/styles/tokens.css`.
- Los puntos de corte son fijos por convención: 640px (layout) y 960px (navegación). CSS no permite usar variables dentro de las media queries.
- Un solo acento, `--color-accent`. `--color-done` se usa solo para el estado "terminado".
- El texto azul sobre `surface` o `surface-alt` usa `--color-accent-hover`, porque `--color-accent` no llega a AA sobre esos fondos.
- Lo que falta se muestra siempre con `Placeholder.astro` y una etiqueta de `placeholderLabels` (`site.ts`): 16:9 para fotos y renders, 1:1 para logos y retratos.
- Un valor pendiente dentro de un texto, una ficha o una tabla usa `PendingTag.astro`, la versión en línea del mismo borde punteado. Una cifra que no existe nunca se muestra como cero.
- Los campos de formulario se delimitan con `--color-field-line`, que llega a 3:1 contra el fondo. Las líneas de `--color-border` no alcanzan para marcar dónde se escribe.

## Imágenes

- Van en `src/assets/` y se procesan con `astro:assets`. Se resuelven con `findAsset()` (`src/lib/assets.ts`), que devuelve `undefined` si el archivo no existe.
- El hero usa `kr01-chassis-render.png`. Si no existe, cae a `kr01-chassis-wireframe.png`, y si tampoco está, al placeholder.
- La imagen para redes sociales (1200×630) se genera del render lateral, porque el recorte 1.91:1 no corta el chasis.
- Astro copia a `dist/` el original de toda imagen de `src/assets/` que no se procese. Hoy le pasa a `kr01-chassis-wireframe.png`, que solo se usa si falta el render.
- Las fotos y los videos tienen sus propias reglas, en la sección siguiente.

## Fotos y video

- Cada lugar del sitio que lleva una foto o un video es un espacio en `media.ts`, nombrado por página y ubicación (`home.band`, `join.subsystems.design`). Cada espacio tiene su pie (`caption`), su texto alternativo (`alt`) y `file`, que es `null` hasta que exista el archivo.
- No hay página de galería. Cada foto va junto al texto del que habla.
- Cuatro formas, y ninguna otra: banda a sangre (`PhotoBand.astro`), foto al lado del texto (`PhotoFigure.astro`), tira de tres fotos con pie (`PhotoStrip.astro`) y video con portada (`VideoFeature.astro`). La galería de Fabricación de El carro conserva su diseño y toma sus fotos de `media.car.workshop`.
- Las fotos van en `src/assets/fotos/` y pasan por `astro:assets`, que genera AVIF y WebP en varios anchos. Si `file` nombra un archivo que no está en la carpeta, el espacio se muestra vacío.
- Estado vacío: la foto al lado del texto lleva el placeholder etiquetado. La tira de tres no se muestra hasta que sus tres espacios tienen archivo: con una o dos fotos sigue oculta, porque una foto al lado de dos huecos se ve peor que nada, y no deja ningún hueco en la página. La banda y el video no llevan un recuadro punteado: son una hoja de plano, con la retícula, un recorte del render (el lateral en las bandas y el trasero en el video, donde va el motor) y una etiqueta en el ángulo ("FOTO DE EQUIPO · PENDIENTE").
- Todas las fotos cargan diferido, salvo la de Sponsors, que está en la primera pantalla. Inicio no suma nada a su primera pantalla: el LCP sigue siendo el render del hero.
- Los videos se sirven desde el propio sitio, en `src/assets/video/`. Ninguno se embebe de otro servicio: el sitio no hace ninguna petición externa.
- Formato del video: MP4 con H.264 y audio AAC, 16:9, hasta 1920×1080, con `faststart` para que empiece a reproducirse antes de terminar de bajar. Tope: 25 MB por archivo (GitHub avisa desde 50 MB y rechaza más de 100 MB). Si pasa del tope, recortalo o bajalo a 720p (`scale=-2:720`).

```bash
ffmpeg -i original.mov -vf scale=-2:1080 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart kr01-motor.mp4
```

- Cada video lleva su portada: una imagen 16:9 (JPG o PNG) en la misma carpeta. Sin portada no se publica, y `file` exige los dos nombres juntos.
- El video tiene controles nativos y `preload="none"`: no arranca solo ni descarga nada hasta que el visitante le da play.
- Subtítulos: el sitio genera `/video/<nombre>.vtt` con el texto de `captions`, que describe lo que se oye entre corchetes. Sirve para videos sin voz. Un video con voz necesita subtítulos con tiempos, y hay que sumarlos antes de publicarlo.

## Logos de sponsors

- Formato preferido: SVG. Alternativa: PNG con fondo transparente.
- Nombre en kebab-case con el nombre de la empresa (`grupo-infrasal.svg`), sin márgenes vacíos alrededor del logo.
- Un logo nunca se edita: no se invierte ni se recolorea. Es la marca del patrocinador.
- Dos variantes de placa, con igual tamaño, padding y proporción 1:1: clara (`--color-plate`) para logos oscuros y oscura (`--color-plate-dark`) para logos que vienen en blanco. Cada entrada de `sponsors.ts` declara la suya en `plate`.
- `mix-blend-mode` funde el fondo del logo con la placa: `multiply` en la clara (fondos blancos) y `screen` en la oscura (fondos negros).
- Lo correcto es pedirle a cada empresa su logo en la variante que haga falta. La placa oscura es el recurso mientras tanto; hoy la usa Grupo Cofiño.
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
- Las vistas de El carro son pestañas solo con JavaScript; sin él se muestran las tres apiladas. `@media (scripting: enabled)` reserva el lugar de las pestañas antes de que corra el script, así nada salta al cargar.

## Variables de entorno

- `SITE_URL`: origen público. Por defecto `https://diegomontpy.github.io`. Pendiente: dominio definitivo (probablemente de la universidad).
- `BASE_PATH`: ruta base. Por defecto `/`; en GitHub Pages es `/Kinetic/`.
- En el despliegue (`.github/workflows/deploy.yml`) ambos valores salen de `actions/configure-pages`. Si se configura un dominio propio en Pages, se ajustan solos.
- En Git Bash para Windows hay que anteponer `MSYS_NO_PATHCONV=1`: si no, `/Kinetic/` se convierte en una ruta de disco.

## Commits

- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`), descripción en español, en imperativo, una línea.
- Un commit por unidad coherente de trabajo. `npm run lint` y `npm run build` tienen que pasar antes de cada commit.

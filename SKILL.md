# Portafolio UX/UI — Ketzya Carmona

Sitio web estático del portafolio de Ketzya, UX Researcher. HTML/CSS/JS plano, sin frameworks ni build process. El diseño fuente vive en Figma: https://www.figma.com/design/pWYZgWL7bvsY7BcHHU98rr/Portafolio-Web

## Stack y estructura

- HTML estático, un archivo por página (sin SPA, sin router de JS).
- `css/styles.css` — hoja de estilos global, compartida por todas las páginas.
- `js/main.js` — interactividad: navbar flotante con blur al hacer scroll, modal/lightbox para imágenes (`case-main-image`), botón de copiar email con toast de confirmación, animaciones fade-up al hacer scroll.
- `assets/images/` — todas las imágenes del sitio (ver convención de nombres abajo).
- `assets/CV_Ketzya.pdf` — CV descargable.

Páginas existentes:
- `index.html` — home con hero, sección "sobre mí", grid de casos de estudio (cards), proceso/metodología, contacto.
- `caso-usuarios.html` — Caso 1: "Cuando las palabras no bastan: session replays como fuente de verdad" (investigación con session replays + WhatsApp en Tributi).
- `caso-sobrecarga.html` (URL limpia `/caso-sobrecarga`) — Caso 2: "Cuando 5 opciones son demasiadas" (análisis heurístico + behavioral economics en la pantalla de planes).
- Pendiente: tercer caso de estudio, "El impuesto alto que nadie explicó" (`caso-caos.html`, aún sin contenido).

**Nota de naming:** este archivo se llamó temporalmente `caso-investigar.html` durante el desarrollo; el nombre definitivo y vigente es `caso-sobrecarga.html`. Si en algún momento aparece una referencia a `caso-investigar.html` en el código o en enlaces antiguos, es un resto de esa etapa y debe corregirse a `caso-sobrecarga.html`.

## Paleta de colores (variables CSS)

- `--dark-teal`: `#1A3636` — fondo de hero oscuro, texto principal sobre crema, tarjetas de impacto.
- Crema base: `#F6F1E8` (texto/fondo claro sobre el verde oscuro).
- `--cream-card` / almond: tonos crema para texto sobre fondo oscuro y fondos de tarjetas.
- `--olive-gray`: gris-oliva para metadatos y texto secundario.
- `--muted-green`: `#507A55` — acentos, barras de progreso, color "después".
- Color "antes"/alerta: `#A75C4B`.
- Fondos de comparación antes/después: `#F5E6E1` (antes) / `#E1EBE2` (después).
- Tags/pills de skills: relleno `#E1CFB5`, borde `#BAB099`, texto `#1A3636`.

## Tipografía

- Display/serif: **Playfair Display** (títulos, hero).
- Cuerpo: sans-serif (Inter, vía `var(--font-display)` para serif y la fuente sans por defecto para cuerpo).
- En las secciones nuevas agregadas al Caso 1 (galería "Evidencia A/B" de metodología) se usó **Source Serif 4 + Inter Tight** en vez de Playfair/Inter — esto es una inconsistencia tipográfica pendiente de unificar con el resto del sitio.

## Componentes y patrones reutilizables

- **Navbar**: al hacer scroll se vuelve "pill" flotante con `backdrop-filter: blur(12px)`, fondo verde oscuro semitransparente, esquinas redondeadas. Orden de enlaces: Sobre mí → Portafolio → Contacto (sin "Servicios").
- **Botones**: `.btn--outline` (borde + texto crema, usado en casos de estudio) y el botón primario relleno del hero. Evitar `.btn--secondary` (clase rota, no usar).
- **Botón de email**: copia `ketzya.ux@gmail.com` al portapapeles y muestra un toast (`#toast`) con el texto exacto: *"El correo ketzya.ux@gmail.com está pegado en el portapapeles."* — este texto debe ser idéntico en todas las páginas que tengan el botón.
- **Modal de imágenes**: cualquier imagen con la clase `case-main-image` abre en grande sobre fondo oscuro opaco al hacer clic (cierra con X, clic afuera, o Esc).
- **Estructura de sección de caso de estudio**: `case-section` con dos columnas — `case-section__sidebar` (número + título, ej. "01 — Contexto") y `case-section__content` (texto). Patrón consistente en ambos casos ya construidos.
- **Antes/Después**: grid de 2 columnas (`ba-grid`/`ba-card`) con header de color (rosado para "antes", verde para "después").
- **Tarjetas de impacto**: fondo `#1A3636`, números grandes en serif, grid de 3 columnas (responsive a 2/1 en pantallas chicas).
- **Selección de texto**: personalizada (fondo crema, texto verde oscuro) en vez del azul default del navegador.
- **Focus states**: contorno crema personalizado en `:focus-visible` para accesibilidad por teclado.

## Convención de nombres de imágenes

Usar **kebab-case, sin espacios ni tildes**, dentro de `assets/images/`. Ejemplos ya en uso: `funnel.png`, `session-replay-1.png`, `session-replay-2.png`, `planes-antes.png`, `planes-despues.png`, `wpp-chat-1.jpg`.

Hay al menos un archivo con espacios en el nombre (`dian password incorrect.png`) que conviene renombrar a kebab-case para evitar bugs de carga en producción.

**Limitación importante:** ni Claude Code ni el chat de Claude.ai pueden tomar una imagen que Ketzya pega en la conversación y escribirla directamente al disco. Ella debe guardar manualmente el archivo en `assets/images/` (arrastrándolo desde el explorador de archivos) con el nombre que se acuerde, y luego confirmar para que el código apunte a esa ruta.

## Flujo de trabajo: local → producción

1. **Siempre probar primero en local.** Servidor de desarrollo corre en `http://localhost:3000`.
2. El servidor local resuelve URLs limpias (sin `.html`), imitando el comportamiento de GitHub Pages en producción.
3. **No hacer `git push` sin luz verde explícita de Ketzya.** Aunque el cambio se vea listo, se queda en local hasta que ella lo apruebe.
4. Cuando dé el visto bueno, hacer commit + `git push -u origin main`.
5. GitHub Pages tarda entre 1–2 minutos en desplegar después del push; recomendar recarga forzada (Ctrl+F5) o ventana de incógnito para verificar.

## Repositorio y dominio

- Usuario de GitHub: `ketzyaux`.
- Repo de producción: `ketzyaux/ketzyaux.github.io` (el nombre del repo debe coincidir exactamente con `usuario.github.io` para que GitHub Pages lo sirva como raíz).
- Sitio en vivo: https://ketzyaux.github.io/

## Preferencias de redacción y estilo de Ketzya

- Evitar guiones largos (—) en el cuerpo de texto; reemplazar por coma o paréntesis según el contexto gramatical.
- Es muy precisa con espaciado y alineación: suele pedir ajustes en px exactos (ej. "17px de separación", "100px de padding izquierdo") y alineaciones que respeten sangrías específicas del texto, no del contenedor general.
- Prefiere mostrar evidencia real (capturas, verbatims de usuarios) sobre placeholders, y cuidar la atribución correcta de cada dato a su fuente (session replay vs. WhatsApp).
- El tono general del copy es profesional, sobrio, sin signos de exclamación a menos que el diseño original de Figma los pida explícitamente.

## Notas de contenido (contexto de los casos)

- **Caso 1** (session replays): Tributi, fintech colombiana, 2026. ~20.000 usuarios abandonando el flujo en la etapa de información personal (caída del 100% al 44%). Metodología: 60 session replays en Highlight + 25 respuestas vía WhatsApp (no son hallazgos del mismo peso — los replays muestran comportamiento, WhatsApp aporta contexto con fiabilidad limitada).
- **Caso 2** (heurístico + behavioral economics): pantalla de selección de planes, conversión cayendo de ~46% a 43,7% en 2023, subió a 62,1% en 2024 tras el rediseño (+16pp, +35% relativo). Frameworks aplicados: Ley de Hick, sesgo de anclaje, aversión a la pérdida. Rol de Ketzya: análisis y recomendaciones (no ejecución visual del rediseño).

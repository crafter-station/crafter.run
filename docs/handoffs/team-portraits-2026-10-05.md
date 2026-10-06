# Equipo y retratos · 5 de octubre de 2026

## Estado actual

- **Corrección vigente del mismo día:** Cris usa `cris-cutout-v5.webp`,
  derivado de v8. El usuario rechazó v7/v4 por cabeza grande, trazo
  vectorial, capucha y C en el pecho. Se editó su primer retrato de la
  serie con Railly como referencia del acabado y un recorte facial del
  avatar original solo para rasgos. Lleva polo negro liso, sin logo, con
  el mismo ribete fino del resto. Encuadre, ojos, contornos y textura
  siguen la serie; no copiar la ropa ni el estilo vectorial del original.
- **Liz aprobada por el usuario:** `liz-cutout-v3.webp` conserva el dibujo
  v5 y el alpha de v2, con un recorte uniforme 23,5% más cercano para
  igualar la escala de la cabeza. No regenerar sus facciones.
- Procedencia vigente:
  `docs/team-portraits/cris-series-match-2026-10-05.json`.
  Evidencia: `outputs/crafter-team-portraits/cris-series-match/`.
  El encuadre aprobado de Liz permanece en `proportion-likeness-revision/`.
  Las propuestas rechazadas siguen preservadas.
- Nueve miembros activos, todos con retratos editoriales de la misma serie.
- Se generaron Liz, Cristian, Nicolas, Ignacio Velasquez, Carlos Tarmeno y
  Henry Jing. Railly, Ignacio Rueda/Jibaru y Edward conservan los aprobados.
- Portada: Railly → Ignacio/Jibaru → Liz → Edward.
- Shiara Arauzo es Alumni. Conserva el retrato ya generado.
- Gabriel Antunes queda oculto de activos y Alumni. Su registro histórico
  permanece para no romper las firmas del blog.
- Los perfiles internos de Shiara y Gabriel responden 404. Los Alumni
  enlazan a sus destinos externos, según el comportamiento existente.

## Archivos y procedencia

`apps/web/lib/team.ts` consume WebP con alpha de
`apps/web/public/team/station-ink/`. Cris usa `cris-cutout-v5.webp` y
Liz `liz-cutout-v3.webp`; el resto usa v1. Son 768 × 768, calidad 88.
La entrega original de seis sumaba 569.070 bytes; las dos correcciones
vigentes suman 171.682 bytes.

El usuario autorizó expresamente `gpt-image-2` vía Vercel AI Gateway.
Se usó el CLI oficial de imagegen sin modificar, modo edit, calidad high,
1024 × 1024, con dos imágenes: ilustración original de la persona y
Railly como referencia exclusiva de estilo. La credencial permaneció
en el entorno del proceso. No se incluye en artefactos.

Las facciones proceden de ilustraciones. Liz conserva la revisión guiada
por la foto del usuario. El original de Cris solo aporta rasgos; la
composición, el polo liso y el estilo proceden de los retratos de la serie.
La extracción local del fondo conserva los planos claros del rostro.
Los originales del repositorio y los seis PNG generados se preservan.

Prompts, parámetros y hashes: `docs/team-portraits/`.
Paquete visual y evidencia:

`/Users/raillyhugo/Documents/Codex/2026-10-04/listo-enlazado-desde-agents-md-handoff/outputs/crafter-team-portraits/`

Contiene `provenance.json`, `asset-manifest.json`, prompts, PNG de generación,
PNG con alpha, WebP, script de extracción, montaje de nueve miembros,
montaje de seis nuevos y capturas de la web.

## Verificación

- Corrección vigente (Cris v5 / Liz v3): 14 pruebas enfocadas pasan y
  `git diff --check` correcto. Directorio y perfil de Cris responden 200
  con la imagen nueva; Cris y Liz servidos coinciden por SHA-256.
  Los 14 assets previos se preservan y Liz sigue idéntica a la aprobada.
  Comparación de assets en claro/oscuro junto a Railly, Edward y Liz.
  No hay captura nueva de navegador por la restricción previa; se
  comprobó la integración por HTTP. Se reinició la preview colgada y
  quedó operativa en 8875. No se repitió el build para esta revisión de
  imagen/ruta. Evidencia: `cris-series-match/verification.json`.
- Corrección anterior (Cris v4 / Liz v3): 14 pruebas enfocadas pasan;
  `git diff --check` correcto. Portada, equipo y ambos perfiles responden
  200 y consumen los archivos seleccionados. Los dos WebP servidos
  coinciden por SHA-256. Los 12 assets anteriores se preservan y los bytes
  de Liz aprobada permanecen intactos.
  Comparación visual de assets en claro/oscuro con Railly y Edward.
  Se respeta la restricción previa del navegador: no hay captura nueva
  de la web; la integración se verificó por HTML y hashes vía HTTP local.
  No se repitió el build para este cambio de imágenes/rutas. Preview
  reiniciada y disponible en 8875. Ver `verification.json` en la evidencia
  vigente.
- Corrección anterior de Cris y Liz (v2): 14 pruebas enfocadas pasan, build de
  258 páginas correcto, cuatro rutas usan las referencias nuevas y ambos
  WebP servidos coinciden por SHA-256. Assets comparados visualmente con
  los avatares aprobados. La nueva revisión en navegador fue bloqueada por
  la política de URL de la pestaña; se comprobó la integración por HTTP.
  La preview quedó restaurada en 8875.
- 95 pruebas pasan, 0 fallan.
- Build: 3 tareas correctas, 258 páginas generadas.
- `git diff --check` pasa.
- Portada y directorio revisados en claro/oscuro a 1280 px.
- Portada a 390 px y directorio a 320 px; ambas rutas medidas a 320 px
  sin desbordamiento horizontal.
- Los nueve retratos cargan en el directorio; los cuatro correctos en portada.
- Diez rutas HTTP comprobadas: portada, directorio y los seis perfiles nuevos
  responden 200; Shiara y Gabriel responden 404. Los seis WebP servidos
  coinciden por SHA-256 con los archivos locales.
- Los límites de typecheck/lint y configuración local de producción
  continúan descritos en `redesign-ship-focus-2026-10-05.md`.

## Continuidad

Rama `feat/station-bucle`, cambios previos sin commit preservados.
Text 0.309 y Display 0.200 no cambiaron. Preview en
`http://localhost:8875/es`. No hubo commit, push ni deploy.
El siguiente paso de lanzamiento sigue siendo confirmar el destino y su
configuración, sin reabrir el roadmap completo de la fuente.

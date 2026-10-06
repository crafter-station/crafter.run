# Bounties · portada y detalle editorial

El usuario pidió rediseñar `/en/bounties/1`, crear `/bounties` y dedicar más
personalidad a la portada. Solicitó reutilizar la imagen original con un filtro
que la integre en el universo visual del sitio.

## Implementación

- Portada en los cinco locales, con una ilustración SVG propia de tickets,
  lápiz y sello, paleta miel/terracota, papel cálido y ambas variantes de tema.
- Tablero generado desde `lib/bounties.ts`, con conteos reales, convocatorias
  abiertas primero y archivo por fecha descendente. Sin convocatorias abiertas,
  muestra un estado explícito y conserva los retos anteriores.
- Tres pasos de participación y acceso al Discord existente.
- Detalle con el cartel original, pasos numerados, reparto de premios,
  programa de ponentes, ticket de recompensa, fecha del evento y cierre.
- La imagen `public/bounties/bounty-1-frontier-og-v1.jpg` no cambió. Su aspecto
  impreso se obtiene mediante grayscale, sepia, contraste y multiply en CSS.
  El OG del detalle conserva la imagen original.
- Copy editorial y del reto actual en cinco idiomas. Los datos del evento
  se formatean en `America/Lima`, con el lugar y la zona visibles.
- Bounties aparece en «Más» y en el sitemap, junto con sus detalles. Incluye
  metadatos localizados, alternates y breadcrumbs estructurados.
- El shell compartido sigue siendo el único dueño del header/footer.
- No se tocaron fuentes, retratos, formulario de contacto, rutas retiradas,
  secretos, esquemas de base de datos ni migraciones.

## Reglas y estado preservados

Bounty #1 cerró el 5 de octubre de 2026 a las 16:00 de Perú
(`2026-10-05T21:00:00Z`). El evento sigue siendo el 17 de octubre a las 09:00
de Perú. No se reabrió el formulario ni se inventaron ganadores.
Se mantienen tres entradas para los mejores posts y dos por sorteo,
participación presencial y los requisitos originales.

La portada y el detalle se renderizan por solicitud para que el cierre
no dependa de un nuevo deploy. Autenticación, lectura del envío previo,
validación, consentimiento, rate limits y acción de guardado existentes
se mantienen. El formulario conserva su copy anterior en español; sus dos
etiquetas de 10 px ahora usan Crafter Text a 14 px. No se hicieron envíos
de prueba ni operaciones sobre participantes.

## Validación local

- `bun run build`: tres tareas correctas.
- `bun test apps/web packages/cli packages/db apps/api`: 96 pasan, cero fallos,
  289 assertions.
- Typecheck: únicamente los seis errores preexistentes de
  `scripts/migrate-supabase-boards.ts`.
- `git diff --check`: correcto.
- Ambas páginas en los cinco locales a 320 px, claro y oscuro: 20
  combinaciones sin overflow horizontal ni texto del contenido bajo 14 px.
- Revisión visual a 1280 y 1024 px, imagen cargada y 200 px de margen a
  1024 para el sidebar. Un único encabezado compartido por página.
- Navegación tarjeta → detalle, «Más» → Bounties, selector de tema y Escape
  revisados. La sección cerrada no presenta formulario.
- Windows/Android, autenticación real y escritura de participaciones
  permanecen fuera de esta verificación.

La evidencia y el cierre de publicación se guardan fuera del repositorio:
`/Users/raillyhugo/Documents/Codex/2026-10-04/listo-enlazado-desde-agents-md-handoff/outputs/crafter-bounties-editorial/`.

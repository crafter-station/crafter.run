# Crafter Sans · web local 0.305

El 3 de octubre de 2026 el usuario pidió actualizar `http://localhost:8875/es`
con cada iteración. Es autorización vigente para integrar avances validados
en la web local, y sustituye la prohibición anterior de integración web.

El runtime y `/es/font` usan **Text 0.305** en los cuatro pesos, con descargas
OTF/TTF/WOFF2 y contornos/versiones sincronizados. Display sigue en 0.200.
Fuente completa: `/Users/raillyhugo/Programming/crafter-station/font/web-preview/0.305`.
Leer su README, integration.json y validation.json.

Se integran las 19 bases y diez acentos n/u de AGFT Masters 0.006 sobre el
repertorio 0.304. Se conservan 233 Unicode mappings, 205 glifos anteriores,
GSUB/GDEF y kerning completo. Ocho componentes privados se añaden al final:
242 glifos por corte. Algunas métricas intermedias cambian una unidad.
Las marcas públicas siguen en 0.304: la comprobación completa encontró y
rechazó una nueva colisión k̈ Medium al intentar usar la diéresis del piloto.
Las anclas f/t permanecen pendientes; no se declara terminado el alfabeto.

Validación: 48.400 parejas por corte, 249 muestras por formato, equivalencia
NFC/NFD, paridad de formatos, 520 combinaciones GPOS aisladas por corte sin
colisiones nuevas y doce fuentes reproducibles. La cobertura completa también
registra colisiones de marcas heredadas fuera del subconjunto del piloto.
Los canónicos 0.304, Display y los experimentos anteriores permanecen intactos.

Revisión web: portada Chromium/macOS de 1280px en claro y oscuro, sin overflow
horizontal, introducción a 18px y familia Crafter Text aplicada. Cinco fuentes
preload de Next y quince descargas coinciden por SHA-256 con sus fuentes.
`/es/font` muestra Text 0.305 y Display 0.200. No hay errores de decodificación
de fuentes en la consola revisada. Se restauró el tema Sistema. La pestaña
anterior no respondió al control; se dejó una portada nueva abierta.
Esta integración no añade otra certificación Safari, móvil, Windows o Android.
952 inputs congelados conservan sus hashes; 14 outputs se reproducen exactamente.

## En cada iteración validada

1. Preservar fuentes previas y ediciones manuales. Generar una preview con
   repertorio completo; nunca copiar una fuente de subconjunto al runtime.
2. Construir y validar usando el Python fijado. Para este checkpoint:
   `python -B sources/build_web_preview.py` desde el workspace de fuentes.
3. Sincronizar: `python -B apps/web/scripts/sync-font-specimen.py --source
   /Users/raillyhugo/Programming/crafter-station/font --text-source
   /Users/raillyhugo/Programming/crafter-station/font/web-preview/0.305`.
   El script valida hashes y cobertura antes de escribir.
4. Revisar el listener 8875, iniciar dev si hace falta y recargar `/es`.
   Verificar bytes de fuentes, aspecto y versiones/descargas en `/es/font`.
5. Registrar versión y evidencia en el handoff. Mantener el sitio local al día
   sin solicitar otra confirmación rutinaria. No implica deploy ni publicación.

El cargador Noto de desarrollo sigue usando el caché real aprobado:

```sh
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs \
  bun run --cwd apps/web dev --hostname localhost --port 8875
```

Detener dev antes de un build que comparta `.next`. Evidencia actual:
`outputs/crafter-sans-web-0305/` en el chat de continuidad, incluyendo respaldo
de los 37 archivos web previos. Sin commit, push ni deploy.

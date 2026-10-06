# Crafter Sans · i/j/l · Text 0.307

El bloque i/j/l está integrado en la web local. La portada `/es`, el specimen
`/es/font`, los contornos y las descargas sirven **Text 0.307**. Display sigue
en 0.200. Se conservaron los cambios previos sin commit en `feat/station-bucle`.

## Fuentes y decisión

Workspace: `/Users/raillyhugo/Programming/crafter-station/font`.

- Nuevo piloto: `experiments/2026-10-03-master-ijl/`, **IJL Masters 0.008**.
- Fuente completa: `web-preview/0.307/`, doce archivos para cuatro pesos.
- Generador: `sources/build_text_master_ijl.py`; renderer:
  `sources/render_text_master_ijl.py`; 173 entradas fijadas en `ijl-inputs.json`.
- Dos UFO compatibles y siete cortes 400–700. 22 bases (20 minúsculas), diez
  acentos n/u, ocho marcas y siete variantes; 47 glifos UFO / 49 compilados.
- Regular exacta en cúbicas y puntos i/j conservados en ambos extremos.
  Ocho esquinas reducidas: i 76→40, j 92→74, l 80→62 puntos. Cota máxima
  0,397613 unidades; se conservan la cola de j, el codo de l y sus terminales.
- Los 46 glifos compilados heredados, todos los GLIF previos, las anclas
  corregidas de f/t y los veinte pares de kerning permanecen.

## Integración y límites

La fuente completa conserva 233 asignaciones Unicode / 242 glifos por corte.
Solo cambia i/j/l; las otras 239 formas y las tablas GPOS/GSUB/GDEF quedan
intactas. Los acentos í/ì e Í/Ì conservan la corrección de 0.302. SemiBold gana
una unidad de avance por letra en i/j/l; los otros tres cortes no cambian.

Las marcas combinadas sobre i/j/l aún requieren diseño: el piloto conserva
165 intersecciones de 168 combinaciones superiores y no tiene sustitución
por i/j sin punto. No se aprueban esas combinaciones. El repertorio completo
no introduce colisiones nuevas y mantiene 270 heredadas en el control GPOS.
Windows/Android aplazados; sin hinting, cursivas ni variable.

## Comprobaciones

- 31 posiciones de interpolación, dos UFO y siete cortes compatibles.
- 7.168 parejas del piloto y 193.600 parejas completas.
- Shaping NFC/NFD, veinte pares de kerning y 560 posiciones heredadas de
  marcas. Los tres formatos completos conservan composición/posicionamiento.
- 28 pares de raster NFC/NFD idénticos; 28 control/piloto, máximo 2/255 a
  16/18 ppem y 6/255 global. Frente a 0.306: máximo 15/255.
- Dos builds reproducen 359 archivos; 5.760 archivos previos sin cambios.
- Muestras Chromium/Safari del Mac, 16/18/64px y ambos temas. Ocho marcos
  Chromium de 320px, sin desbordamiento.
- Cinco fuentes de runtime y quince descargas comprobadas por SHA-256.
  Las versiones del specimen y sus contornos se regeneraron de los OTF.
- Los cinco JSON de contornos servidos coinciden con los generados.
  `outputs/crafter-sans-ijl/font-workspace/` conserva las 173 entradas y los
  generadores actuales; una reconstrucción independiente desde este paquete
  también reprodujo los 359 archivos sin leer el workspace original.

No fue necesario cambiar componentes/CSS de producto ni compilar producción.
Se verificó la web en el servidor dev con respuestas HTTP 200.

## Recuperación de dev

La sustitución de las fuentes provocó una saturación del proceso dev anterior
(635% CPU, incluso los archivos estáticos dejaron de responder). Se detuvo
ese proceso, se comprobó el puerto libre y se reinició con el mismo cache
Noto real aprobado. Después `/es`, `/es/font` y los assets respondieron.

Antes de iniciar otro servidor, comprobar el listener 8875. Si vuelve a
saturarse al sincronizar fuentes, detener dev y reiniciarlo. Nunca ejecutar
un build de producción mientras dev comparte `.next`.

```sh
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs \
bun run --cwd apps/web dev --hostname localhost --port 8875
```

Los logs de dev contienen información privada del middleware de autenticación:
no copiarlos a los paquetes. La evidencia de esta iteración está en
`outputs/crafter-sans-ijl/` del chat activo.

## Continuar

Siguiente bloque geométrico: **k/v/w**, después **x/y/z**. Faltan seis
minúsculas para los masters; después siguen mayúsculas/resto del repertorio,
composición/anclas de acentos y validación de familia. La revisión i/j/l con
marcas requiere decidir el tratamiento de los puntos.

Conservar canónicos, 0.306 e históricos. Los UFO son exports: guardar ediciones
manuales antes de reconstruir, usando siempre un directorio de salida nuevo.
Actualizar `/es` con cada iteración validada, junto con las versiones,
contornos y descargas del specimen. El usuario ya autorizó este flujo local.

# Crafter Sans · Acentos n/u compatibles · 3 de octubre de 2026

El bloque de acentos está completo en el experimento **Crafter Sans Accent
Masters 0.004**. Se suman **ñ ń ň ù ú û ü ũ ū ů**, ocho marcas combinantes,
anclas y composición NFC/NFD al piloto de once letras. **Text 0.304 y Display
0.200 siguen intactos**; la web continúa usando los archivos canónicos.

## Abrir y retomar

- Fuentes: `/Users/raillyhugo/Programming/crafter-station/font`.
- Detalle técnico: `experiments/2026-10-03-master-accents/README.md` en fuentes.
- Prueba: `http://localhost:8874/experiments/2026-10-03-master-accents/index.html`.
  `#endpoints` compara con 0.304; `#anchors` muestra combinaciones sin precompuesto.
- Layout de 320px: `responsive.html` junto a la prueba.
- Evidencia y paquete portable:
  `/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-master-accents/`.
- ZIP y recuperación: `outputs/crafter-sans-master-accents.zip` y
  `outputs/crafter-sans-master-accents-verification.json` del mismo chat.
- Continuidad: `TEXT-HANDOFF.md`, `TEXT-ROADMAP.md` y los tres `AGENTS.md`.

Checkout web: `/Users/raillyhugo/Programming/crafter-station/crafter.run-bucle`,
rama `feat/station-bucle`. Los cambios anteriores sin commit se conservan.
El workspace de fuentes no es un repositorio Git; los hashes son la evidencia
de preservación. No se hizo commit, push, despliegue ni publicación.

Los servidores existentes 8874/8875 se conservaron. El dev y la recuperación
Noto siguen como indica `crafter-sans-text-0304.md`. Este bloque no cambia el
runtime web ni requiere build de Next; no compilar sobre la misma .next con
el dev activo. No se consultó la herramienta de búsqueda web.

## Decisiones de construcción

Las once bases compiladas y los auxiliares .notdef/espacio se heredan exactamente
del piloto anterior en cada peso. Las diez formas acentuadas son componentes
n/u + marca en UFO y TTF. Las marcas se hacen compatibles con subdivisiones
exactas y curvas colapsadas de Regular para corresponder con esquinas Bold.
Se preservan sus dibujos cúbicos originales en ambos extremos.

El redondeo CFF histórico hace que siete marcas dentro de los precompuestos
difieran ligeramente de la marca combinante pública. Siete variantes privadas
`.nu` mantienen ambos dibujos originales. El macrón comparte su marca pública.
No se sustituye un dibujo por el otro ni se introduce una aproximación nueva.

Anclas n/u `top=(304,619)` en Regular y `(318,619)` en Bold;
`_top=(0,0)` en las marcas, avance cero. Se interpolan y se redondean para los
cortes estáticos. hmtx públicos de las marcas conservados en 400/700, incluidos
sidebearings. Los intermedios conservan las diferencias de avance de +1 unidad
frente a ciertos cortes estáticos 500/600; los acentos siguen a n/u.

Dos UFO exportados (36 glifos cada uno), un designspace y siete cortes
TTF/WOFF2 400–700 (38 glifos, 30 asignaciones Unicode). No se implementa el
alfabeto completo, una familia variable ni apilamiento de varias marcas.

## Comprobaciones y límites

- 31 posiciones, topología/áreas, correspondencia y conversión conjunta Cu2Qu.
  Separación mínima cúbica acento/base: 27 unidades. Sin clipping de línea.
- 3.087 parejas (21 × 21 × 7), sin intersecciones; 494 cadenas por corte para
  NFC/NFD y paridad de shaping TTF/WOFF2. Shaping canónico exacto en extremos.
- 112 pruebas GPOS aisladas: se retiran las entradas cmap precompuestas de una
  copia en memoria y se desactiva ccmp para que la recomposición interna de
  HarfBuzz no oculte defectos de las anclas. 70 pruebas ccmp con esa misma copia.
- Límites compilados de marcas/acentos: diferencias de hasta 1 unidad frente
  a TTF canónicos, registradas. No confundir preservación de dibujos cúbicos
  con igualdad de contornos cuadráticos compilados por separado.
- Safari 26.6.2 y Chromium 154 (UA), Mac/DPR 2: los siete pesos en ambos temas
  a 16/18px, con controles 64px. También extremos contra 0.304 y marcas sin
  precompuesto. Nueve fuentes cargadas; sin regresión visible en las muestras.
- Chromium en marcos reales 320×740: ambas paletas, 22 muestras por estado,
  tamaños intactos y sin desbordamiento. No es Android/iOS. Windows/Android
  siguen aplazados por falta de equipos, conforme a la decisión del usuario.
- FreeType 2.13.2 sin hinting: 28 pares NFC/NFD con píxeles idénticos en
  16/18/32/36ppem. Ocho pares contra TTF canónicos: cambio máximo de cobertura
  17/255 a 16/18ppem y 18/255 en toda la matriz. La base de esta comparación
  es distinta del control de esquinas del experimento anterior.
- Dos builds reproducen 213 archivos. 2.471 originales intactos; 540 referencias
  congeladas verificadas. Nueve WOFF2 servidos y HTML coinciden con disco.
  Las condiciones guardadas de ambos navegadores contienen esos mismos hashes.
- El paquete registra reconstrucción portable, manifiesto y extracción real
  del ZIP. Los resultados de navegador son observaciones, no outputs
  deterministas del build.

## Reconstrucción y próximo bloque

Ejecutar solo `sources/build_text_master_accents.py` y
`sources/render_text_master_accents.py` con los requisitos fijados. El README
explica los cuatro helpers importados sin cambios y el entorno existente.
Las referencias del piloto anterior se copiaron antes de construir y se
compararon con el checkpoint: no había deriva manual.

**Preservar cualquier edición manual de los UFO antes del rebuild.** Son
exports recreados por el generador; este no relee cambios manuales. Trasladar
los cambios aceptados al pipeline antes de compilar.

Próximo bloque propuesto: **c/e primero, después r/s**. Medir correspondencia,
conservar semillas aprobadas, anchos, uniones y extremos; mantener el límite
0,51 para cualquier simplificación elegible y retener curvas si lo exceden.
Repetir parejas, shaping, lectura real y reproducibilidad sobre el repertorio
ampliado. Este bloque siguiente todavía no se implementó.

Los experimentos anteriores y sus paquetes quedan congelados. No hay promoción
canónica, hinting, cambio de licencia ni release público implícito.

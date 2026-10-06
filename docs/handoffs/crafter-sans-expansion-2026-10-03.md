# Crafter Sans · h/m/u y b/d/p/q · 3 de octubre de 2026

La ampliación solicitada está completa en un experimento separado. Hay dos
masters cúbicos compatibles para **H O n o h m u b d p q**, un designspace y siete
cortes TTF/WOFF2 de prueba (400–700). **Text 0.304 y Display 0.200 no cambian.**
La web continúa usando los archivos canónicos.

## Abrir y retomar

- Fuentes: `/Users/raillyhugo/Programming/crafter-station/font`.
- Experimento: `experiments/2026-10-03-master-expansion/README.md` en fuentes.
- Prueba real: `http://localhost:8874/experiments/2026-10-03-master-expansion/index.html`.
- Layout estrecho: `responsive.html` en el mismo directorio.
- Evidencia y paquete: `/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-expansion/`.
- ZIP: `outputs/crafter-sans-expansion.zip` del mismo chat; verificación de
  recuperación: `outputs/crafter-sans-expansion-verification.json`.
- Continuidad: `TEXT-HANDOFF.md` y `TEXT-ROADMAP.md` en fuentes; los tres
  `AGENTS.md` (fuentes, checkout web y chat) apuntan a esta ampliación.

Checkout web: `/Users/raillyhugo/Programming/crafter-station/crafter.run-bucle`,
rama `feat/station-bucle`. Conservar todos los cambios anteriores sin commit.
El dev existente de 8875 y la recuperación temporal del cargador Noto se
mantienen como describe `crafter-sans-text-0304.md`; no se compila contra su
misma carpeta .next mientras está corriendo. Este bloque solo agrega fuentes
experimentales, pruebas y documentación; no exige reconstruir la web.

## Qué cambió

Se completaron primero h/m/u y después b/d/p/q. Se subdividen curvas exactas
para corresponder entre Regular/Bold y luego se reducen las esquinas elegibles.
Los puntos de la correspondencia provisional pasan a:

| Letra | Puntos antes → después | Cota máxima real, unidades |
|---|---:|---:|
| h | 104 → 50 | 0,5017053523 |
| m | 161 → 89 | 0,5017053523 |
| u | 104 → 50 | 0,4966893132 |
| b | 125 → 89 | 0,3524728818 |
| d | 125 → 89 | 0,4966042429 |
| p | 125 → 89 | 0,4982102720 |
| q | 125 → 98 | 0,4966893132 |

Regular conserva geometría exacta. Bold conserva extremos, tangentes, límites
y uniones aprobadas; solo los interiores de esquinas elegibles usan una
aproximación medida. En d/q se invierte el recorrido del contorno Bold para
hacer corresponder los puntos, sin reflejar las letras. H/O/n/o y sus siete
compilados coinciden con el experimento anterior.

La tercera esquina de q conserva **sus cuatro curvas originales**: la propuesta
de curva única daba 0,5216700826 unidades, sobre el límite fijo 0,51. El error
real allí es cero. Esta excepción está en el generador y el informe por esquina.

Los avances/hmtx de 400/700 coinciden con Text 0.304. Los intermedios interpolan
los extremos: respecto al canónico 500, O/m avanzan +1 unidad; respecto a 600,
todas las letras avanzan +1 salvo m (0). No confundir la preservación de métricas
entre control/piloto con igualdad frente a todos los cortes canónicos estáticos.

## Evidencia y límites

- 31 posiciones: correspondencia, contornos, límites, áreas, trazos y ausencia
  de intersecciones imprevistas. Conversión conjunta cúbica/cuadrática.
- 847 parejas (121 × 7), shaping y paridad TTF/WOFF2. Extremos contrastados
  con los canónicos. Diferencia de límites compilados frente al control: cero.
- Safari 26.6.2/WebKit y Chromium 154 (UA), mismo Mac/DPR 2. Siete pesos,
  ambos temas, 16/18px y controles de 64px; extremos también frente a 0.304.
  No se observa regresión en estas muestras. 16 caras cargadas sin síntesis.
- Layout Chromium en marcos 320×740px, ambos temas: tamaños 16/18/64px y
  sin desbordamiento. El control de viewport principal falló; se usó un
  harness con iframes reales. El viewport principal final es 1280×720.
  No es prueba de Android/iOS ni de Safari móvil. Windows/Android aplazados.
- FreeType 2.13.2 sin hinting: 28 pares, 16/18/32/36ppem. Regular idéntica;
  diferencia máxima de cobertura 2/255 a 16/18ppem, 6/255 en toda la matriz.
- Dos builds reproducen 151 archivos; 2.269 archivos previos conservan hashes.
  Los 16 WOFF2 servidos coinciden con fuentes locales y HTML.
- Paquete con referencias congeladas, fuentes, scripts, requisitos fijados,
  capturas y reportes. `portable-rebuild.json` verifica la reconstrucción desde
  el paquete; el informe vecino al ZIP verifica recuperación y hashes.

Esto es un piloto de once letras y espacio, con auxiliares del binario; no
incluye acentos, una familia variable completa ni una nueva versión canónica.
La comparación del raster es contra el control con esquinas completas; la
comparación visual adicional sí incluye los extremos canónicos. No mezclar
estas dos bases al describir igualdad de píxeles o contornos.

## Código y reconstrucción

Nuevos scripts en `font/sources/`:

- `build_text_master_expansion.py`.
- `render_text_master_expansion.py`.

Usan helpers sin modificar de `build_text_experiments.py`,
`refine_text_master_corners.py` y `render_text_experiments.py`. Ejecutar solo
los dos nuevos scripts con el entorno fijado; los experimentos anteriores no
se regeneran. La referencia de 46 archivos tiene manifiesto SHA-256 propio.

Los UFO son exports editables: **preservar cualquier edición manual y pasar
los cambios aceptados al generador antes de reconstruir**. El compilador no
lee automáticamente las ediciones hechas en esos exports. Las referencias
previas fueron copiadas y verificadas antes de construir.

## Próximo bloque propuesto

Trasladar los acentos existentes de n/u al piloto compatible, con anclas,
composición y equivalencia NFC/NFD. Medir correspondencias y verificar todas
las parejas de ese nuevo repertorio, además de lectura real. Después ampliar
el alfabeto por bloques. No se implementaron estos acentos en esta iteración.

No se promueve el piloto, no se aplica hinting, no se cambia la licencia y no
hay commit, push, despliegue o publicación. Los paquetes históricos y las
versiones canónicas quedan preservados.

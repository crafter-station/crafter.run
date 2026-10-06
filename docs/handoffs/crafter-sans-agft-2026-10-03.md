# Crafter Sans · a/g y f/t · 3 de octubre de 2026

**El bloque geométrico a/g, después f/t está completo** en Crafter Sans AGFT
Masters 0.006. El piloto llega a diecinueve bases y conserva diez acentos n/u,
ocho marcas y siete variantes internas. Text 0.304 y Display 0.200 siguen
intactos; los archivos experimentales no se incorporan a la web.

## Abrir y retomar

- Workspace de fuentes: /Users/raillyhugo/Programming/crafter-station/font.
- Detalle: experiments/2026-10-03-master-agft/README.md en fuentes.
- Prueba: http://localhost:8874/experiments/2026-10-03-master-agft/index.html
  #endpoints compara 0.304; #composition y #anchors revisan las formas n/u y a/g.
  responsive.html contiene los marcos de 320px.
- Diagnóstico pendiente: anchor-limits.html compara los acentos f/t problemáticos.
- Evidencia y paquete: /Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-agft/.
- ZIP y recuperación: outputs/crafter-sans-agft.zip y
  outputs/crafter-sans-agft-verification.json del chat actual.
- Continuidad: TEXT-HANDOFF.md, TEXT-ROADMAP.md y los tres AGENTS.md actualizados.

Checkout web: /Users/raillyhugo/Programming/crafter-station/crafter.run-bucle, rama feat/station-bucle. Cambios anteriores sin commit
conservados. El workspace de fuentes no tiene Git. Sin commit, push, deploy,
publicación, cambio de licencia ni búsqueda web. 8874 ya estaba activo; 8875 no
estaba escuchando y no se inició. Se conserva la pestaña Home. La recuperación
Noto del dev está en crafter-sans-text-0304.md; comprobar listener antes de
arrancar y detener dev antes de compilar contra la misma .next. Solo se añade
continuidad documental al checkout web; no requiere build de Next.

## Decisiones

- a/g conservan su geometría cúbica exacta: a mantiene un segmento vertical
  interior corto (colapsado en Bold), g rota el inicio del ojo inferior Bold
  sin cambiar las curvas. Correspondencia final: 156/197 puntos.
- f/t conservan Regular, arcos, terminales y métricas. Solo seis esquinas Bold
  ortogonales por letra se simplifican: f 138→84 y t 135→81 puntos. Cotas
  0,501705352270 y 0,393765694876 unidades, por debajo del límite 0,51.
- Los 42 glifos compilados heredados siguen intactos. Dos UFO de 44 glifos,
  designspace y siete cortes TTF/WOFF2 400–700: 46 glifos / 38 Unicode mappings.
- Veinte pares de kerning canónicos; avances y hmtx 400/700 exactos.
  Algunos avances intermedios difieren +1 respecto a los estáticos 500/600.

## Límite óptico registrado

Las anclas canónicas f/t (y=619) cruzan los ascendentes. Se registran **96
colisiones en 112 combinaciones f/t × ocho marcas × siete cortes**. Se mantiene
la posición canónica; no se reajusta para aprobar una comprobación. Las 32
combinaciones de extremos se contrastan contra Text 0.304 y conservan la misma
clasificación de colisión. Las 448 combinaciones de n/u/c/e/r/s/a/g pasan sin
intersecciones. Las 560 pruebas GPOS certifican colocación, no calidad óptica
de todas las combinaciones; validation.json indica pass-with-known-anchor-limits.

anchor-limits.html y screenshots/anchor-limits-chromium.png dejan f + U+0301 y
t + U+030A a 16/18/64px, Regular/Bold, con referencia 0.304. No se aprueban
acentos sobre f/t. No hay nuevos precompuestos a/g/f/t ni acentos apilados.

## Validación

- 31 posiciones: correspondencia, topología, winding, áreas y secciones estables.
  Cu2Qu conjunto con tolerancia 0,5, paridad TTF/WOFF2 y sin hinting.
- 5.887 parejas (29×29×7) sin intersección tras kerning. Veinte pares probados
  también sin kern; 966 entradas de corpus/corte para shaping/NFC/NFD, incluye
  repetidas. Shaping canónico en extremos exacto; 70 ccmp n/u forzadas.
- Límites compilados a/g/f/t iguales al control. Frente al TTF canónico:
  delta máximo 0,142852784 unidades; heredados mantienen diferencias previas.
- Safari 26.6.2 y Chromium 154 (UA), Mac/DPR 2: siete pesos, ambos temas,
  16/18px y controles 64px; extremos, composición y anclas a/g revisados sin
  regresión visible en el corpus. 16 fuentes cargadas sin síntesis, 26 muestras.
  Chromium pasa ambos marcos 320×740; no emula Android/iOS.
- FreeType 2.13.2 sin hinting: 28 pares NFC/NFD idénticos. Control/piloto máximo
  2/255 a 16/18ppem y 6/255 global. TTF canónico/piloto máximo 17/255 a 16/18ppem
  y 19/255 global. Geometría cúbica exacta no significa raster idéntico.
- Dos builds reproducen 331 archivos; 4.149 previos y 603 referencias intactos.
  16 WOFF2 y tres HTML servidos coinciden con disco; hashes de siete condiciones
  de navegador coinciden. Reconstrucción portable y extracción real del ZIP
  verificadas en los informes incluidos. Capturas son observaciones del Mac.

## Reconstrucción y siguiente paso

Ejecutar solo sources/build_text_master_agft.py y sources/render_text_master_agft.py
con requirements.txt del experimento. Se incluyen ocho scripts: dos actuales y
seis helpers históricos importados sin cambios. No ejecutar sus builders.
Preservar ediciones manuales de UFO antes de reconstruir: son exports y no se
releen. Trasladar las decisiones aceptadas al generador. La copia inicial del
piloto anterior no tenía deriva manual.

Próximo bloque propuesto: **ajuste óptico de anclas f/t**, con la evidencia
registrada, y después **i/j/l** para ampliar hacia «station». Ninguno de esos
bloques está implementado. Conservar formas, métricas y referencias al comparar
anclas. Windows/Android siguen aplazados; no hay alfabeto completo, familia
variable, promoción ni release. Experimentos y paquetes anteriores congelados.

# Crafter Sans · Curvas abiertas compatibles · 3 de octubre de 2026

El bloque **c/e, después r/s** está completo en el experimento **Crafter Sans
Open Curves 0.005**. Amplía el piloto a 15 bases y conserva los diez acentos n/u,
ocho marcas y siete variantes internas. **Text 0.304 y Display 0.200 siguen
intactos**; la web continúa usando los archivos canónicos.

## Abrir y retomar

- Fuentes: /Users/raillyhugo/Programming/crafter-station/font.
- Detalle: experiments/2026-10-03-master-open-curves/README.md en fuentes.
- Prueba: http://localhost:8874/experiments/2026-10-03-master-open-curves/index.html
  #endpoints compara 0.304, #composition conserva NFC/NFD y #anchors revisa
  combinaciones sin precompuesto. responsive.html contiene los marcos de 320px.
- Evidencia y paquete portable:
  /Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/outputs/crafter-sans-open-curves/.
- ZIP y recuperación: outputs/crafter-sans-open-curves.zip y
  outputs/crafter-sans-open-curves-verification.json del mismo chat.
- Continuidad: TEXT-HANDOFF.md, TEXT-ROADMAP.md y los tres AGENTS.md.

Checkout web: /Users/raillyhugo/Programming/crafter-station/crafter.run-bucle,
rama feat/station-bucle. Cambios anteriores sin commit conservados. El workspace
de fuentes no tiene repositorio Git: los hashes verifican su preservación.
Sin commit, push, deploy, publicación ni cambio de licencia. No búsqueda web.

Se mantienen los servidores 8874/8875. La recuperación Noto del dev permanece
en crafter-sans-text-0304.md. Este bloque solo añade documentación al checkout
web: no requiere build de Next ni cambios de runtime. Comprobar el listener
antes de iniciar servidores; detener dev antes de compilar en la misma .next.

## Decisiones y resultado

c/e/s conservan geometría cúbica exacta mediante subdivisiones con correspondencia
medida y controles colapsados en Regular. La inclinación de e y los terminales
curvos/oblicuos se conservan. r mantiene el hombro y Regular exactos; solo cuatro
esquinas ortogonales Bold del asta reducen la correspondencia de 111 a 75 puntos,
con cota máxima 0,35247288184 unidades, dentro del límite 0,51. Los puntos de
c/e/s quedan 131/111/131; no se fuerza simplificación de sus terminales.

Los 38 glifos compilados heredados conservan contornos y hmtx. Se añaden c/e/r/s:
dos UFO de 40 glifos, designspace y siete TTF/WOFF2 400–700, con 42 glifos y
34 asignaciones Unicode. No se añaden acentos precompuestos de estas bases.

Kerning canónico rc/re/ro = −15 unidades en todos los cortes. Las anclas top
(y=619) interpolan x: n/u 304→318, c 305→319, e 306→320, r 212→226 y s 282→296.
Las ocho marcas públicas mantienen avance cero. hmtx 400/700 exactos; algunos
avances intermedios difieren +1 frente a estáticos 500/600, registrados.

## Evidencia y límites

- 31 posiciones: correspondencia, topología, extremos, crecimiento de tinta y
  dos secciones estables por letra. Cu2Qu conjunto, estructura cuadrática
  compatible; paridad TTF/WOFF2 de contornos, métricas y cmap. Sin hinting.
- 4.375 parejas (25×25×7), sin intersecciones con kerning aplicado; rc/re/ro
  comprobados también sin kern. 714 entradas de corpus por corte para shaping
  y NFC/NFD; la cifra incluye entradas repetidas.
- 336 GPOS aisladas: seis bases por ocho marcas por siete cortes. Se retira el
  cmap precompuesto n/u en memoria y se desactiva ccmp para exigir base+marca,
  avance cero y ancla exacta. 70 ccmp forzadas conservan la composición n/u.
- Shaping canónico exacto en corpus y parejas de extremos. Límites compilados
  c/e/r/s frente al control o TTF canónico: hasta 1 unidad de diferencia.
  Marcas/acentos heredados conservan las diferencias del checkpoint anterior.
- Safari 26.6.2 y Chromium 154 (UA), Mac/DPR 2: siete pesos, ambos temas,
  16/18px y controles 64px, extremos, composición y anclas; sin regresión visible
  en las muestras. 16 fuentes cargadas sin síntesis, 26 muestras por estado.
- Chromium en marcos 320×740: ambos temas, tamaños intactos, sin overflow.
  No es Android/iOS. Windows/Android continúan aplazados por el usuario.
- FreeType 2.13.2, gris de 8 bits, sin hinting: 28 pares NFC/NFD idénticos.
  28 control/piloto: máximo 2/255 a 16/18ppem y 7/255 en 16/18/32/36ppem;
  Regular idéntica. Ocho TTF canónico/piloto: máximo 17/255 a 16/18ppem y
  21/255 en la matriz completa. Estas dos referencias no son intercambiables.
- Dos builds reproducen 322 archivos e igualan el build revisado. 3.229 archivos
  previos y 593 referencias conservan hashes. Los 16 WOFF2 y HTML servidos
  coinciden con disco y las seis condiciones guardadas de navegador.
- El paquete añade reconstrucción portable, manifiesto y extracción real del
  ZIP. Los screenshots son observaciones, no outputs deterministas del build.

## Reconstrucción y continuación

Ejecutar solo sources/build_text_master_open_curves.py y
sources/render_text_master_open_curves.py, con las dependencias fijadas del
experimento. El README enumera seis helpers importados sin cambios. Se incluyen
ocho scripts en el paquete; no ejecutar los main de los helpers históricos.

**Preservar ediciones manuales de los UFO antes de reconstruir.** Son exports
recreados; el builder no los relee. Trasladar los cambios aceptados al pipeline.
La copia inicial del piloto anterior no tenía deriva manual frente al checkpoint.

Próximo bloque propuesto: **a/g, después f/t**, para ampliar el corpus hacia
«crafter» y trasladar las siguientes semillas aprobadas a masters compatibles.
Todavía no implementado. Medir recorridos/uniones, conservar anatomía, anchos,
extremos y tangentes; aplicar el límite 0,51 solo a esquinas elegibles.

Los experimentos y paquetes anteriores quedan congelados. Este piloto no es
el alfabeto completo, una familia variable, soporte de acentos apilados ni una
promoción de fuentes a la web. Licencia y desarrollo privado se conservan.

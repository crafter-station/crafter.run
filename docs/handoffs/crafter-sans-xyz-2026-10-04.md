# Crafter Sans · x/y/z · Text 0.309

**Terminado: 26/26 minúsculas con masters compatibles.** Integración local
validada el 4 de octubre de 2026. /es y /es/font sirven **Text 0.309**, con
contornos y descargas sincronizados. Display permanece en 0.200. Se conservan
los cambios anteriores sin commit en feat/station-bucle.

## Fuentes y decisiones

Workspace: /Users/raillyhugo/Programming/crafter-station/font.

- Piloto: experiments/2026-10-04-master-xyz/, **XYZ Masters 0.010**.
- Preview completa: web-preview/0.309/, cuatro pesos en OTF/TTF/WOFF2.
- Generador sources/build_text_master_xyz.py y renderer
  sources/render_text_master_xyz.py; 190 entradas fijadas en xyz-inputs.json.
- 28 bases (H/O y las 26 minúsculas), diez acentos n/u, ocho marcas y siete
  variantes privadas; 53 glifos UFO, 55 compilados y 47 mappings del piloto.
- Dos UFO, designspace, siete cortes 400–700 y 31 posiciones verificadas.
- Regular x/y/z cúbica exacta; x/y también exactas en Bold. Seis esquinas z
  reducen 95→41 puntos, cota 0,3774314001 dentro de 0,51. x tiene 84 e y 107.
- Se conservan el tramo interior corto de y y el borde de una unidad de z
  Regular. Sus correspondientes líneas Bold degeneradas mantienen la geometría
  exacta. Terminales diagonales y cola de y conservados; cuadráticas a 0,5.
- 52 glifos compilados heredados, métricas y GLIFs previos intactos.
  47 pares canónicos de kerning en el piloto.

La fuente completa cambia únicamente los dibujos x/y/z: 233 asignaciones y
242 glifos por corte; 239 formas restantes intactas. Marcas públicas y acentos
precompuestos, incluidos ý/ÿ/ź/ž, conservados. GPOS/GSUB/GDEF/OS2 y métricas
verticales idénticos a 0.308. En Medium, avances x 605→606, y 591→592,
z 583→584; en SemiBold, y 601→602. Márgenes izquierdos y métricas de extremos
sin cambios. La comprobación de shaping incluye la compensación esperada del
avance cuando se posicionan marcas combinantes.

## Anclas y alcance

Las 168 combinaciones nuevas x/y/z del piloto pasan sin intersección. Se
conservan las correcciones de f/t/k y las 896 posiciones heredadas de marcas.
La fuente completa mantiene 247 colisiones anteriores: 48/63/66/70 por corte,
cero nuevas en 2.080 combinaciones comprobadas.

i/j/l siguen pendientes: su prueba anterior registra 165 colisiones en 168
combinaciones superiores. No se aprueban esas combinaciones ni los acentos
apilados. Las formas precompuestas actuales siguen intactas. Completar los
masters minúsculos no termina mayúsculas, acentos ni validación de familia.
Windows/Android aplazados; sin hinting nuevo, cursivas ni fuente variable.

## Comprobaciones

- 31 posiciones: topología, sentido, cotas, área y progresión de trazos.
- 10.108 parejas piloto y 193.600 completas; formatos y NFC/NFD pasan.
- FreeType control/piloto: máximo 2/255 a 16/18ppem, 5/255 global; 28 pares
  NFC/NFD idénticos. Ocho comparaciones geométricas con 0.308: máximo 15/255.
  Dieciséis comparaciones f/t/k no cambian ningún píxel.
- Dos builds y una reconstrucción independiente reproducen los mismos 419
  archivos. 6.542 archivos históricos sin cambios.
- Chromium 154 y Safari reales del Mac: muestras Regular/Medium claras y
  SemiBold/Bold oscuras, 16/18/64px. Ocho marcos Chromium de 320px, cuatro
  pesos en ambos temas, sin desbordamiento. Es una revisión por muestras.
- /es y /es/font responden 200. Text 0.309 visible y alfabeto editable,
  ẍ ẙ ẑ y precompuestos revisados en Medium 64px. Portada sin desbordamiento.
- Quince descargas y cinco WOFF2 de runtime verificados por SHA-256.
  Cinco JSON de contornos servidos coinciden con los derivados de los OTF.

## Recuperación

Evidencia en outputs/crafter-sans-xyz/ del chat activo:
/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3.
font-workspace/ incluye las 190 entradas fijadas, nuevos generadores y productos
validados. verification.json registra los dos builds y recovery-verification.json
la reconstrucción desde ese paquete, sin leer las fuentes del workspace original.
preservation.json confirma el histórico y package-sha256.json registra el paquete.

Usar Python con las versiones de sources/requirements.txt y FreeType/Pillow del
entorno de pruebas; raster-validation.json identifica el rasterizador exacto.
No incluir dependencias, logs de dev, credenciales ni cachés en este paquete.

~~~sh
python -B sources/build_text_master_xyz.py --output /ruta/nueva/xyz-rebuild
~~~

Usar salida nueva. Guardar ediciones manuales de UFO antes de reconstruir;
los exports no se releen. La sincronización del repertorio completo es:

~~~sh
python -B <web>/apps/web/scripts/sync-font-specimen.py \
  --source <font> --text-source <font>/web-preview/0.309
~~~

El dev estaba detenido; se inició después de sincronizar los assets. Usa el
Noto real del build aprobado para evitar el fallo previo del cargador Google:

~~~sh
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs \
bun run --cwd apps/web dev --hostname localhost --port 8875
~~~

Comprobar el listener antes de iniciar otro proceso y detener dev antes de
compilar producción contra la misma carpeta .next. La integración cambia
assets, versiones y documentación; no requiere cambios de componentes/CSS.
No se hizo build de producción ni deploy. Los logs privados quedan en work/.

## Continuar

1. Resolver composición de acentos, especialmente i/j/l: manejo de puntos y
   altura del ancla l, preservando los precompuestos aprobados. Documentar cada
   defecto con cadena/peso/tamaño/plataforma y comparar antes/después.
2. Ampliar masters a mayúsculas y resto del repertorio.
3. Validar la familia completa y decidir por separado cursivas, hinting,
   variable, licencia y publicación. Windows/Android cuando haya dispositivos.

Actualizar /es y /es/font tras cada iteración validada: runtime, versiones,
contornos y descargas. El flujo local está autorizado. Mantener Text 0.304,
Display 0.200, todas las versiones históricas, UFO manuales y cambios previos.

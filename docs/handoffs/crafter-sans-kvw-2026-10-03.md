# Crafter Sans · k/v/w · Text 0.308

Integración local validada el 4 de octubre de 2026. /es y /es/font sirven
**Text 0.308**, con contornos y descargas sincronizados. Display sigue en
0.200. Se preservaron los cambios previos sin commit en feat/station-bucle.

## Fuentes y decisiones

Workspace: /Users/raillyhugo/Programming/crafter-station/font.

- Piloto: experiments/2026-10-03-master-kvw/, **KVW Masters 0.009**.
- Preview completa: web-preview/0.308/, cuatro pesos en OTF/TTF/WOFF2.
- Builder sources/build_text_master_kvw.py y renderer
  sources/render_text_master_kvw.py; 182 entradas fijadas en kvw-inputs.json.
- 25 bases, incluyendo 23 minúsculas; diez acentos n/u, ocho marcas y siete
  variantes privadas. Dos UFO, designspace, siete cortes y 31 posiciones.
- Regular cúbica exacta; v/w también exactas en Bold. Cuatro esquinas de k
  pasan 96→60 puntos, cota 0,352473. v conserva 61 puntos, w 91.
- 49 glifos compilados heredados, métricas y GLIFs previos intactos.
  38 pares canónicos de kerning en el piloto.

La fuente completa cambia solo k/v/w de dibujo: 233 asignaciones /242 glifos
por corte, 239 formas restantes intactas. Marcas públicas y acentos
precompuestos conservados. Medium k margen izquierdo 52→53, avance 565
intacto; SemiBold v avance 606→607 y w 923→924. Regular/Bold sin cambios de
métricas. GSUB/GDEF/OS2 y métricas verticales intactas; GPOS cambia solo Y
superior de k.

## Anclas y límites

El primer candidato introducía una colisión Medium k̈ con el ancla antigua
(y=619): área 35,9619140625 frente a cero en 0.307. Se rechazó. La solución
sube el ancla superior de k: round(847 + 28 * (peso - 400) / 300), conserva
su X en la fuente completa y deja las marcas sin cambios.

Quedan libres 56 combinaciones superiores del piloto y 36 completas, con
separación mínima 60/61 unidades. El punto más alto queda en 1067, bajo el
ascenso 1071. Se resuelven 23 colisiones antiguas y ninguna nueva aparece.
Las 168 combinaciones superiores k/v/w del piloto pasan. f/t siguen corregidas.

Persisten 247 colisiones heredadas en el control completo de marcas. i/j/l
siguen pendientes: 165 colisiones en 168 combinaciones superiores del piloto,
sin sustitución por letras sin punto. No se aprueban esas combinaciones ni
acentos apilados. Windows/Android aplazados; sin hinting nuevo ni variable.

## Comprobaciones

- 31 posiciones, siete cortes, topología, sentido, cotas, área y trazos.
- 8.575 parejas piloto y 193.600 completas. Shaping en tres formatos,
  NFC/NFD y 728 posiciones heredadas de marcas comprobados.
- FreeType: 28 control/piloto, máximo 2/255 a 16/18 ppem y 6/255 global;
  28 pares NFC/NFD idénticos. Comparación geométrica con 0.307: máximo 5/255.
  Las diferencias por mover el ancla de k se registran aparte.
- Dos builds reproducen 413 archivos; 6.124 archivos previos intactos.
- Chromium 154 y Safari reales del Mac: muestras 16/18/64px, ambos temas.
  Ocho marcos Chromium de 320px, cuatro pesos por tema, sin desbordamiento.
- Quince descargas y cinco WOFF2 de runtime verificados por SHA-256.
  Cinco JSON de contornos servidos iguales a los generados desde los OTF.
- /es y /es/font responden 200. Versión 0.308 visible y muestra editable
  kiwi. volver. web. con acentos k/v/w revisada en el specimen.

## Recuperación y reproducción

Evidencia en outputs/crafter-sans-kvw/ del chat activo. font-workspace/
contiene las 182 entradas fijadas, nuevos generadores y productos validados.
verification.json registra dos builds; recovery-verification.json confirma
los mismos 413 archivos al reconstruir desde el paquete independiente. No copiar
logs de dev, credenciales, cachés o dependencias a este paquete.

Usar el Python fijado, con FreeType/Pillow del entorno de pruebas:

```sh
python -B sources/build_text_master_kvw.py --output /ruta/nueva/kvw-rebuild
```

Las salidas deben ser nuevas. Guardar ediciones manuales de UFO antes de
reconstruir: los exports no se releen. La sincronización completa es:

```sh
python -B <web>/apps/web/scripts/sync-font-specimen.py \
  --source <font> --text-source <font>/web-preview/0.308
```

El dev estaba detenido y se inició después de copiar los assets, evitando
la saturación anterior por HMR de fuentes. Usa Noto real del build aprobado:

```sh
NEXT_FONT_GOOGLE_MOCKED_RESPONSES=/Users/raillyhugo/Documents/Codex/2026-10-02/listo-enlazado-desde-agents-md-handoff-3/work/crafter-sans-reading/noto-production-cache/responses.cjs \
bun run --cwd apps/web dev --hostname localhost --port 8875
```

Comprobar listener 8875 antes de iniciar otro proceso. Detener dev antes de
un build de producción que comparta .next. Esta integración de assets no
necesitó cambiar componentes/CSS ni compilar producción. No se hizo deploy.
Las pestañas de pruebas anteriores habían fallado; se revisó con una nueva
pestaña HTTP local. Los logs de autenticación quedan fuera de la evidencia.

## Continuar

**x/y/z**: faltan tres minúsculas para completar los masters compatibles.
Después siguen composición de acentos (incluidas i/j/l), mayúsculas/resto del
repertorio y validación de familia. No confundir alfabeto minúsculo compatible
con familia final, ni marcos del Mac con Android.

Actualizar /es con cada iteración validada, junto con /es/font, versiones,
contornos y descargas. Este flujo local ya está autorizado. Conservar Text
0.304, Display 0.200, versiones anteriores, UFO manuales y cambios previos.

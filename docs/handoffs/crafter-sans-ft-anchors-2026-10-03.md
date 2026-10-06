# Crafter Sans · Text 0.306 y anclas f/t

La web local usa **Text 0.306**, sincronizada con las descargas y el inspector
de `/es/font`. Display continúa en 0.200. Se conserva la instrucción del
usuario de actualizar `/es` después de cada iteración validada.

Se corrigieron exclusivamente las alturas de anclas superiores f/t:
f 836→864, t 706→734 entre 400 y 700. X, dibujos, avances, kerning,
composición y métricas verticales quedan intactos. Separación mínima real:
60 unidades. Mayor altura de las marcas: 1056 < ascendente 1071.

El piloto **FT Anchors 0.007** conserva dos UFO, designspace y siete cortes;
las 112 combinaciones superiores pasan, resolviendo 96 colisiones. La fuente
completa mantiene 233 Unicode mappings y 242 glifos; las 72 combinaciones
superiores en los cuatro pesos pasan, resolviendo 63 colisiones de 0.305.
No se corrigen en este bloque las demás anclas heredadas ni acentos apilados.

Validación: 193.600 parejas; 245 cadenas por corte/formato; NFC/NFD y paridad
de formatos; tablas anteriores intactas excepto GPOS/nombres/cabecera.
Dos builds reproducen 141 archivos generados y 967 inputs siguen intactos.
Prueba visual en Chromium y Safari/macOS a 16/18/64px, con capturas en ambos
temas. La portada se revisó a 1280px sin overflow; cinco fuentes de runtime
y quince descargas coinciden por SHA-256. Windows/Android siguen aplazados.

Fuente completa:
`/Users/raillyhugo/Programming/crafter-station/font/web-preview/0.306`.
Piloto y prueba:
`/Users/raillyhugo/Programming/crafter-station/font/experiments/2026-10-03-ft-anchors`.
Constructor: `sources/build_text_ft_anchors.py` en el workspace de fuentes,
con el entorno Python fijado y utilidades del builder 0.305 preservado.

```sh
python -B sources/build_text_ft_anchors.py
python -B /ruta/crafter.run-bucle/apps/web/scripts/sync-font-specimen.py \
  --source . --text-source web-preview/0.306
```

Mantener el recovery Noto local documentado en el handoff 0.305; comprobar
listeners antes de iniciar un servidor y detener dev antes de compilar sobre
la misma `.next`. Evidencia: `outputs/crafter-sans-ft-anchors/` en el chat.
No se hizo commit, push, deploy ni release.

**Siguiente: masters compatibles i/j/l**, aún sin implementar. Partir del nuevo
piloto con las anclas corregidas, conservar su geometría y fuentes previas,
y actualizar nuevamente `/es` cuando el siguiente bloque pase la validación.

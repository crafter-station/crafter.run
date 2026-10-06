# Crafter redesign · alcance para salir · 5 de octubre de 2026

## Prioridad del usuario

Aplicar el 20/80 al roadmap tipográfico para poder lanzar el redesign cuanto
antes. Este alcance sustituye la prioridad anterior de continuar automáticamente
con i/j/l y completar todos los masters antes de revisar la salida.

La candidata usa **Crafter Sans Text 0.309**, en sus cuatro pesos estáticos
400/500/600/700, y **Display 0.200**. Las mayúsculas, números, símbolos y
acentos del repertorio actual ya existen en las fuentes completas. Completar
sus masters compatibles es trabajo de evolución de la familia.

## Trabajo que sí entra

1. Comprobar los caracteres y la composición del contenido del sitio.
2. Corregir únicamente un defecto visible y reproducible que afecte a ese uso:
   texto ilegible, carácter ausente, acento incorrecto, recorte o layout roto.
3. Mantener runtime, versiones, contornos y descargas sincronizados.
4. Revisar las páginas principales en móvil/escritorio, los cinco idiomas,
   los dos temas y las interacciones básicas.
5. Pasar build y tests, identificar la configuración necesaria en el destino,
   y preparar la revisión final del despliegue.

No se justifica una nueva versión de la fuente solo por llegar a este checkpoint.
Si aparece un defecto real, usar una iteración aislada, probarlo y sincronizar
la fuente completa antes de integrar.

## Trabajo aplazado

- Completar masters de mayúsculas, cifras y demás repertorio.
- Resolver toda la matriz de marcas combinantes y acentos apilados.
- Variable, cursivas, más pesos, nuevos ejes e idiomas.
- Refactorizar toda la cadena de generadores.
- Hinting sin un defecto de rasterización demostrado y una mejora comparada.
- La release abierta independiente de la familia y su proceso editorial.

La deuda de composición i/j/l sigue documentada. Se retoma antes de salir
solo si un caso relevante para el sitio falla; completar todas las combinaciones
arbitrarias ya no es el siguiente paso obligatorio del redesign.

Windows/Android continúan aplazados por falta de dispositivos. La fuente
conserva su condición de preview y los límites declarados. La licencia y el
estado de publicación de la familia siguen pendientes.

## Comprobaciones realizadas el 5 de octubre

- `bun run build`: tres tareas correctas, 263 páginas generadas. Se ejecutó
  sin el workaround de Noto usado exclusivamente en la preview de desarrollo.
- `bun test apps/web packages/cli packages/db apps/api`: 95 tests pasan.
- `git diff --check`: sin errores al iniciar el cierre.
- Ocho rutas públicas en cinco locales: 40 respuestas HTTP 200 en desarrollo.
- Corpus del HTML emitido por esas páginas, excluyendo bloques de código:
  3.207 tokens únicos; 2.253 tokens soportados por Crafter en cada formato.
- Ningún carácter latino ausente en ese corpus.
- Los 2.253 tokens soportados pasan NFC/NFD y no producen `.notdef`, en
  Regular/Medium/SemiBold/Bold y OTF/TTF/WOFF2. Los formatos coinciden al
  componerlos. Esto prueba equivalencia de composición, no calidad óptica
  exhaustiva.
- El corpus emitido no contiene secuencias explícitas de marcas combinantes.
  Las 247 colisiones heredadas del audit general permanecen registradas; este
  checkpoint no las declara resueltas ni cubre todo texto futuro de usuarios.
- Quince descargas verificadas por SHA-256 y cinco JSON de contornos servidos
  idénticos a los archivos locales.
- Revisión de la portada a 1280 px y 320 px; cuerpo de 16 px, familias
  Crafter presentes y fuentes cargadas. Se revisaron ambos temas, apertura del
  menú móvil, ancho de 320 px y cierre con Escape.
- Se observaron las seis rutas principales en los cinco locales a 320 px
  sin overflow horizontal en las mediciones. Parte de las mediciones CJK
  ocurrió mientras seguían cargando fuentes; esa limitación queda en los
  resultados y no equivale a una revisión final de rasterización CJK.

## Configuración de salida que falta comprobar

El build compila. `next start` en esta máquina devuelve HTTP 500 en las
páginas por ausencia de `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`. Los recursos
estáticos sí responden. La preview de desarrollo funciona con el modo
temporal existente.

No se cambió autenticación ni se introdujo una clave ficticia. La ausencia
local no demuestra que falte en producción: antes del deploy hay que verificar
la configuración del proyecto de destino. No existe un enlace local
`.vercel/project.json` en la raíz ni en `apps/web`; no se verificó el entorno
remoto durante este cierre.

El build omite el typecheck de Next por la configuración existente.
Los seis errores históricos del script de migración y el lint sin configurar
siguen siendo límites conocidos; no se volvió a ejecutar esos checks.
Los flujos autenticados y las mutaciones externas quedan fuera de esta prueba.

## Estado para continuar

- Preview de desarrollo: `http://localhost:8875/es`.
- Font specimen: `http://localhost:8875/es/font`.
- Se conservan todas las ediciones previas sin commit, Text 0.304 canónica,
  Display 0.200, los binarios 0.309 y los históricos.
- No hubo cambios de dibujos, CSS, licencia, commit, push ni deploy en este
  checkpoint.
- Siguiente: confirmar destino/configuración del despliegue y cerrar el
  lanzamiento del sitio; no reabrir el roadmap tipográfico completo.

Evidencia del chat:
`/Users/raillyhugo/Documents/Codex/2026-10-04/listo-enlazado-desde-agents-md-handoff/outputs/crafter-redesign-ship/`.
El script de auditoría y los logs privados permanecen en `work/font-ship/`
del mismo chat.

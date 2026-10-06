# Crafter Station — retratos editoriales

Actualizado el 5 de octubre de 2026. Serie completa para los nueve miembros actuales. La landing muestra Railly Hugo → Ignacio Rueda (Jibaru) → Liz Riveros → Edward Ramos. Shiara Arauzo pasa a Alumni y conserva su retrato; Gabriel Antunes queda fuera de los listados públicos.

Se añadieron los seis retratos pendientes: Liz Riveros, Cristian Correa, Nicolas Vargas, Ignacio Velasquez, Carlos Tarmeno y Henry Jing. Los archivos están en `apps/web/public/team/station-ink`; Cris usa `cris-cutout-v5.webp`, Liz usa `liz-cutout-v3.webp` y los demás `-cutout-v1.webp`. Los originales anteriores permanecen intactos.

## Corrección vigente: Cris homogéneo con la serie

El usuario rechazó la versión con capucha y C en el pecho, la cabeza grande y el trazo demasiado cercano al cartoon vectorial original. Cris v8 se editó desde su primer retrato de la serie, usando Railly como referencia del trazo y un recorte facial del original solo para rasgos. Lleva el polo negro liso de cuello redondo, sin logo, con el ribete fino ya presente en el resto. Conserva barba, mirada hacia la cámara y giro ligero; la textura y los detalles faciales siguen la serie editorial.

Se extrajo el alpha y se igualó el encuadre con un recorte uniforme `(80, 30, 940, 890)`, sin deformar cabeza, cuello o torso. El WebP integrado es `cris-cutout-v5.webp`, 768 × 768, calidad 88, 87.396 bytes. **Liz v3 permanece idéntica por bytes a la versión aprobada.**

Prompt: `cris-series-v8.txt`. Procedencia y hashes: `cris-series-match-2026-10-05.json`. Evidencia vigente: `outputs/crafter-team-portraits/cris-series-match/` en el chat del 4 de octubre.

## Corrección anterior: avatar original de Cris y encuadre de Liz

La adaptación de Cris descrita en este apartado fue rechazada después por falta de homogeneidad. El encuadre de Liz sí permanece aprobado.

El usuario rechazó el rostro ensanchado de Cris v6 y eligió expresamente su avatar original: la imagen adjunta coincide por bytes con `apps/web/public/team/cris.png`, también idéntica al archivo del commit `211f268` del 12 de agosto de 2026. La generación v7 adapta ese dibujo a la textura de tinta y lápiz de Railly, conservando rostro, barba, peinado, hoodie y ausencia de lentes. Esta generación no usa las fotos anteriores como referencias. El recorte final tiene alpha y un encuadre uniforme 10,1% más cercano.

Liz conserva exactamente el dibujo v5 y el alpha de v2. Solo se aplicó el recorte `(110, 10, 940, 840)` y resize a 1024 × 1024: un encuadre 23,5% más cercano. El usuario lo aprobó expresamente; no regenerar ni modificar sus facciones.

Prompt histórico de Cris: `cris-original-v7.txt`. Procedencia, referencias, recortes y hashes: `proportion-likeness-2026-10-05.json`. Evidencia de esa iteración y del encuadre aprobado de Liz: `outputs/crafter-team-portraits/proportion-likeness-revision/` del chat del 4 de octubre. Las versiones rechazadas se conservan como exploraciones; no las consume la app.

## Corrección anterior de Cris y Liz desde fotografías

El usuario aportó fotos de ambos y pidió conservar la mirada hacia la cámara y el mismo dibujo simplificado de la serie. La corrección anterior derivó de `cris-v5.png` y `liz-v5.png`: se editaron los avatares ilustrados originales, usando las fotos solo como guía de rasgos y Railly como referencia de estilo y mirada.

Cris lleva lentes, cabello corto de lado y barba ligera; Liz conserva el cabello largo y tiene mejillas más llenas, nariz pequeña y mentón más suave. Los dos mantienen ojos y boca de personaje, contornos gruesos y planos crema. Las propuestas más realistas quedaron como exploraciones y no se consumen en la app.

Prompts de esa iteración: `cris-photo-v5.txt`, `liz-photo-v5.txt`. Procedencia y hashes: `photo-revision-2026-10-05.json`. Su evidencia histórica está en `outputs/crafter-team-portraits/photo-revision/` del chat del 4 de octubre. Las fotos de referencia se conservan en el directorio privado de trabajo, fuera de `public/`.

Dirección: contornos de tinta carbón, textura de lápiz/impresión, papel crema y círculo amarillo suave. Referencias de paleta: `#20221D`, `#F7F7F2`, `#F8E9A4`. Las facciones se derivan de las ilustraciones originales, salvo la corrección de Cris y Liz guiada por fotos del usuario. Son avatares estilizados. Las imágenes generadas interpretan los colores, mientras que la interfaz mantiene los tokens exactos.

Generación: habilidad imagegen, CLI oficial `image_gen.py edit`, modelo `gpt-image-2`, calidad alta, 1024 × 1024, a través de Vercel AI Gateway. La credencial autorizada se leyó del Keychain y solo se mantuvo en el entorno del proceso; no se incluye aquí.

Cada prompt identifica la imagen 1 como referencia de la persona. Los retratos de Ignacio, Shiara y Edward también usan el retrato terminado de Railly como imagen 2 para unificar estilo, sin copiar su identidad. Los originales anteriores se conservan. Las versiones para web son WebP de 768 × 768, calidad 88.

Los prompts se guardan junto a este documento. `series-2026-10-05.json` registra los parámetros, referencias y hashes de los seis retratos nuevos. Sus PNG de generación, PNG con alpha, WebP, hojas de revisión, capturas y script de extracción quedan en `outputs/crafter-team-portraits` del chat del 4 de octubre. La primera serie del 1 de octubre permanece en el espacio de diseño del 30 de septiembre. Los assets consumidos por la app están en `apps/web/public/team/station-ink`.

## Integración de miembros anteriores

Se adaptó el trabajo local de `feat/team-former-members`, conservando su copia sin modificar. Los Alumni visibles son Anthony Cueva, Emmy Arias, Juan Ortega y Shiara Arauzo. Gabriel Antunes conserva su registro histórico con `hiddenFromRoster: true` y queda fuera tanto de activos como de Alumni. Los nueve miembros actuales alimentan equipo, enlaces públicos, MCP y sitemap. Los perfiles retirados responden 404; las firmas históricas del blog conservan sus nombres y enlazan a sus perfiles externos, sin afirmar una relación laboral actual en los datos estructurados.

La landing usa un orden explícito: Railly → Ignacio/Jibaru → Liz → Edward. El directorio mantiene los filtros y la rotación aleatoria de la rama original.

## Ajuste de Ignacio

La versión final de Ignacio es `ignacio-v3`: más volumen de cabello y lentes oscuros, siguiendo la referencia adicional del usuario. La primera versión y el ajuste intermedio se conservan en los outputs de exploración; la web usa su versión final con transparencia, derivada de v3. El prompt adicional está en `ignacio-hair-sunglasses-v3.txt`.

## Siluetas transparentes y formas finales

Los archivos finales usan `-cutout-v1`, salvo Cris (`-cutout-v5`) y Liz (`-cutout-v3`): PNG originales con alpha en outputs y WebP optimizados con alpha en la app. El fondo se extrajo de forma determinista a partir del contorno de tinta, conservando las zonas claras interiores del rostro. No se regeneraron las facciones en este paso. La primera entrega de seis WebP sumaba 569.070 bytes; Cris y Liz vigentes suman 171.682 bytes. Todos miden 768 × 768.

La landing combina cuatro formas amarillas diferentes con las siluetas. El fondo y el retrato comparten el `clip-path` inferior; el amarillo acaba detrás de los hombros para que no sobresalga bajo el contorno. El cabello conserva su silueta por encima de la forma. Cada enlace mantiene nombre, orden y acceso por teclado.

Revisión del 5 de octubre: portada y directorio en escritorio claro/oscuro a 1280 px, portada móvil a 390 px y directorio a 320 px. Ambas rutas se midieron sin desbordamiento a 320 px. Capturas actuales: `home-new-portraits-desktop.jpg`, `home-new-portraits-dark.jpg`, `home-new-portraits-mobile.jpg`, `team-all-nine-desktop.jpg`, `team-all-nine-dark.jpg` y `team-mobile-dark.jpg`. Las capturas de la primera serie se conservan.

## Verificación vigente (Cris v5 / Liz v3)

14 pruebas enfocadas pasan, `git diff --check` correcto, directorio y
perfil de Cris HTTP 200 con el nuevo asset, y ambos WebP de Cris/Liz
servidos idénticos por SHA-256. Los 14 assets anteriores se preservan;
Liz permanece idéntica a la aprobada.

Comparación de imágenes en claro/oscuro junto a Railly, Edward y Liz.
Sin captura nueva de navegador por la restricción previa; integración
verificada por HTML y hashes vía HTTP. Preview reiniciada y operativa
en 8875. No se repitió el build para esta revisión de imagen y ruta.

## Verificación de la corrección anterior (Cris v4 / Liz v3)

14 pruebas enfocadas pasan y `git diff --check` no reporta errores.
Portada, directorio y los perfiles de Cris/Liz responden 200 con las rutas
nuevas; ambos WebP servidos coinciden por SHA-256 con los locales.
Los 12 assets anteriores se preservan. Los bytes de Liz aprobada
permanecen intactos.

Se compararon los assets seleccionados junto a Railly y Edward en
claro/oscuro. No hubo una captura nueva en navegador por la restricción
previa de URL; se verificó la integración por HTML y hashes vía HTTP local.
No se repitió el build para esta revisión de imágenes y sus rutas.
La preview quedó reiniciada en 8875.

## Verificación de la entrega inicial y estado

- Build de producción final: correcto, 3 tareas completadas, 258 páginas generadas.
- Suite: 95 pruebas, 0 fallos. Incluye orden de landing, exclusión de Alumni y miembros ocultos en enlaces y MCP, y créditos históricos del blog.
- El build omite el typecheck web por la configuración existente. No se repitieron el lint sin configurar ni el typecheck con seis errores históricos del script de migración.
- Equipo: 9 miembros actuales, 4 Alumni visibles. Todos los retratos cargan correctamente en el navegador; Liz está en portada y Shiara solo en Alumni.
- Navegador: claro/oscuro a 1280 px y móvil 390/320 px; sin desbordamiento horizontal.
- La copia original de `feat/team-former-members` conserva intacto su diff.

Rama de trabajo: `feat/station-bucle`. Vista local: `http://localhost:8875/es`. Sin commit, push ni deploy; la comprobación de configuración del destino sigue pendiente según `docs/handoffs/redesign-ship-focus-2026-10-05.md`.

# Crafter Station — retratos editoriales

1 de octubre de 2026. Serie para la landing, perfiles y avatares de Railly Hugo, Ignacio Rueda (Jibaru), Shiara Arauzo y Edward Ramos, en ese orden en la landing.

Dirección: contornos de tinta carbón, textura de lápiz/impresión, papel crema y círculo amarillo suave. Referencias de paleta: `#20221D`, `#F7F7F2`, `#F8E9A4`. La composición y las facciones se derivan de las ilustraciones originales del repositorio; no son retratos fotográficos verificados. Las imágenes generadas interpretan los colores, mientras que la interfaz mantiene los tokens exactos.

Generación: habilidad imagegen, CLI oficial `image_gen.py edit`, modelo `gpt-image-2`, calidad alta, 1024 × 1024, a través de Vercel AI Gateway. La credencial autorizada se leyó del Keychain y solo se mantuvo en el entorno del proceso; no se incluye aquí.

Cada prompt identifica la imagen 1 como referencia de la persona. Los retratos de Ignacio, Shiara y Edward también usan el retrato terminado de Railly como imagen 2 para unificar estilo, sin copiar su identidad. Los originales anteriores se conservan. Las versiones para web son WebP de 768 × 768, calidad 88.

Los cuatro prompts se guardan junto a este documento. Los PNG de generación, la hoja de revisión y el manifiesto de procedencia quedan en `outputs/crafter-team-portraits` del espacio de trabajo de diseño. Los assets publicados por la app están en `apps/web/public/team/station-ink`.

## Integración de miembros anteriores

Se adaptó el trabajo local de `feat/team-former-members`, conservando su copia sin modificar. Anthony Cueva, Emmy Arias, Gabriel Antunes y Juan Ortega pasan a Alumni. Los diez miembros actuales alimentan equipo, enlaces públicos, MCP y sitemap. Los perfiles retirados responden 404; las firmas históricas del blog conservan sus nombres y enlazan a sus perfiles externos, sin afirmar una relación laboral actual en los datos estructurados.

La landing usa un orden explícito: Railly → Ignacio/Jibaru → Shiara → Edward. El directorio mantiene los filtros y la rotación aleatoria de la rama original.

## Ajuste de Ignacio

La versión final de Ignacio es `ignacio-v3`: más volumen de cabello y lentes oscuros, siguiendo la referencia adicional del usuario. La primera versión y el ajuste intermedio se conservan en los outputs de exploración; la web usa su versión final con transparencia, derivada de v3. El prompt adicional está en `ignacio-hair-sunglasses-v3.txt`.

## Siluetas transparentes y formas finales

Los archivos finales son `railly-cutout-v1`, `ignacio-cutout-v1`, `shiara-cutout-v1` y `edward-cutout-v1`: PNG originales con alpha en outputs y WebP optimizados con alpha en la app. El fondo se extrajo de forma determinista a partir del contorno de tinta, conservando las zonas claras interiores del rostro. No se regeneraron las facciones en este paso.

La landing combina cuatro formas amarillas diferentes con las siluetas. El fondo y el retrato comparten el `clip-path` inferior; el amarillo acaba detrás de los hombros para que no sobresalga bajo el contorno. El cabello conserva su silueta por encima de la forma. Cada enlace mantiene nombre, orden y acceso por teclado.

Revisión visual final: escritorio claro/oscuro a 1440 px, móvil a 390 px y ausencia de desbordamiento a 320 px. Capturas finales: `home-cutouts-light.png`, `home-cutouts-dark.png`, `home-cutouts-mobile.png`.

## Verificación y estado

- Build de producción final: correcto, 3 tareas completadas.
- Suite: 88 pruebas, 0 fallos. Incluye orden de landing, exclusión de alumni en enlaces y MCP, y créditos históricos del blog.
- Typecheck web: quedan los seis errores preexistentes de `scripts/migrate-supabase-boards.ts`; no aparecen errores en los archivos de esta iteración.
- Equipo: 10 miembros actuales, 4 alumni. Todos los perfiles destacados responden 200; los perfiles retirados responden 404 y no figuran en el sitemap.
- Navegador: claro/oscuro a 1440 px y móvil 390/320 px; sin desbordamiento horizontal.
- La copia original de `feat/team-former-members` conserva intacto su diff.

Rama de trabajo: `feat/station-bucle`. Vista local: `http://localhost:8875/es`.

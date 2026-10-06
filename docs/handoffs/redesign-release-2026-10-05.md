# Crafter redesign · publicación autorizada · 5 de octubre de 2026

El usuario autorizó cerrar el redesign mediante PR y merge en la integración
existente de GitHub → Vercel. Destino confirmado: proyecto `crafter-run`,
equipo Crafter Station, dominio `crafter.run`. La producción previa estaba
Ready en `dpl_EEKa11L6sVz6TC5p6wWtRsURr2Ng`.

## Alcance final

- Ocultar el formulario de correo de la portada. Se mantienen los enlaces
  de comunidad y colaboración, sin confirmaciones de envío ficticias.
- Crafter Sans Text 0.309 y Display 0.200 siguen como tipografía del sitio.
  No se lanza la familia, su licencia ni su distribución independiente.
- `/font` sale de navegación, sitemap y rutas públicas. Su página se
  preserva en `app/[lang]/_font-preview`, carpeta privada de App Router.
- Los 23 archivos de descarga, contornos y notas se conservan fuera de
  `public/`, en `apps/web/.work/font-preview/assets` (ignorado por Git).
  El sincronizador genera ahí los futuros exports privados y mantiene los
  binarios del runtime. Hay copia verificada en `work/release-preserved/`
  del chat del 4 de octubre, junto al diff y el ZIP previo a este cierre.
- Equipo final: nueve activos, Shiara Alumni, Gabriel oculto. Cris usa v5,
  Liz conserva v3 aprobada. Las rutas retiradas mantienen sus decisiones.
- Incorporar los ocho commits de `main` posteriores a la base del redesign,
  incluidos los bounties y sus ajustes de formularios/límites.

## Comprobaciones de salida

Repetir build y suite sobre la candidata integrada, comprobar los cambios
de contacto y la ausencia del lanzamiento de la fuente, revisar checks y
preview del PR, hacer merge y comprobar el despliegue de producción.
La ausencia de clave pública de autenticación en la configuración local
no describe el entorno de Vercel.

No crear otro proyecto de Vercel, cambiar dominios ni ejecutar migraciones
como parte de esta publicación. El proyecto y las features de `main` ya
están en producción.

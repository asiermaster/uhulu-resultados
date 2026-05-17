# uhulu-resultados

Panel de clasificaciones y estadísticas para la quiniela ciclista de la Peña Astopotro / Uhulu Bike tropela.

## Stack

- HTML5 + CSS3 + JavaScript vanilla
- Bootstrap 5.1.3 + Bootstrap-Table 1.22.6
- Chart.js (participantes.html)
- jQuery
- Hosteado en GitHub Pages (sin backend, datos estáticos en JS)

## Estructura

| Ruta | Contenido |
|---|---|
| `index.html` | Página principal — medalleros, puntos, estadísticas |
| `participantes.html` | Perfiles de participantes con gráfico de evolución |
| `indexOld.html` | Versión legacy (no tocar) |
| `css/templateSidebar.css` | Sidebar moderno + paleta de colores + responsive |
| `css/medalStyles.css` | Badges de medallas 🥇🥈🥉, tablas, animaciones |
| `css/participantesStyle.css` | Tarjetas de participantes + chart |
| `css/templateStyles.css` | Bootstrap embedido (legacy, usado por participantes.html e indexOld.html, no borrar) |
| `js/index.js` | Lógica del medallero principal |
| `js/participantes.js` | Lógica de participantes + Chart.js |
| `js/indexOld.js` | Legacy (no tocar) |
| `data/data.js` | Datos de medalleros, puntos, top 10 |
| `data/participantesData.js` | Clasificaciones históricas por año |

## Convenciones

- Los datos son estáticos (arrays JS en `data/`) para GitHub Pages
- No usar backend, npm, build tools ni dependencias externas que no sean CDN
- No borrar archivos legacy sin preguntar primero (`indexOld.*`, `templateStyles.css`)
- Preferir emojis para iconos simples (🥇🥈🥉) en vez de cargar Font Awesome u otras librerías
- Las funciones JS que usa Bootstrap-Table como `data-formatter` deben ser globales (window)
- El sidebar usa clase `collapsed` para ocultarse (margin-left en desktop, width:0 en móvil)

## To-do / Mejoras pendientes

- Iconos por año en sidebar
- Década actual destacada
- Sticky headers en tablas
- Números formateados con separadores de miles
- Botón "Volver arriba" (FAB)
- Tooltips en medallas
- Skip to main content (a11y)

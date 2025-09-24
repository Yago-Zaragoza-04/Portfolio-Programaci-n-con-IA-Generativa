# Portfolio — Programación con IA Generativa (UP)

Portfolio interactivo hecho con Astro + React. Narra el recorrido de la materia con secciones por clase, en blanco y negro (paleta del logo UP). Cada sección tiene lugar para:

- Video de la actividad (placeholder para que coloques tu archivo o embed)
- Código fuente de input utilizado en el ejemplo (marco de código)
- Referencia final: creado con GitHub Copilot

## Estructura

- `src/pages/index.astro`: Página principal con secciones y animaciones.
- `src/components/Section.tsx`: Componente React para cada sección con efecto de aparición.
- `src/components/CodeFrame.tsx`: Marco estilizado para mostrar el código.
- `src/components/ProgressDots.tsx`: Indicador de progreso fijo en el costado.
- `src/data/modules.ts`: Contenido de las 7 clases + intro y cierre.
- `src/styles/globals.css`: Estilos globales (tema blanco/negro, scroll-snap, etc.).

## Agregar tus videos

- Reemplaza los placeholders en `src/data/modules.ts` con rutas a tus videos (por ejemplo en `/public/videos/...`) o embebidos.
- Si usas archivos locales: crea `public/videos` y coloca `intro.mp4`, `clase1.mp4`, etc., o cambia los nombres.
- Si usas YouTube/Vimeo, reemplaza el contenedor por un `<iframe>` en `index.astro`.

## Agregar tu código de ejemplo

- En `src/data/modules.ts` reemplaza `codePlaceholder` con el snippet real usado en tu video para cada clase.

## Ejecutar

1. Instala dependencias

```pwsh
npm install
```

2. Ejecuta el entorno de desarrollo

```pwsh
npm run dev
```

3. Abre `http://localhost:4321`.

## Build y preview

```pwsh
npm run build
npm run preview
```

## Licencia

Uso académico. Ajusta según necesidad.

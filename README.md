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
- `src/code/`: Archivos de código fuente por clase (p. ej., `clase_2.py`). La página los carga en crudo para mostrarlos en el marco de código.

## Agregar tus videos

- Coloca tus archivos `.mp4` en `public/videos`.
- Convención actual (según pedido): usa nombres `Video_Clase_N.mp4` a partir de la clase 2.
	- No hay video de clase 1.
	- Clase 2 → `Video_Clase_1.mp4`
	- Clase 3 → `Video_Clase_2.mp4`
	- …
	- Clase 7 → `Video_Clase_6.mp4`
- Los paths ya están configurados en `src/data/modules.ts` (campo `videoPlaceholder`). Si cambias nombres o agregas otros, ajusta allí.
- El reproductor en la página muestra una vista previa difuminada; al tocar, se abre un modal para reproducir.
- Si usas YouTube/Vimeo, podrías reemplazar el componente por un `<iframe>` o adaptar `VideoCard` para abrir el embed.

## Agregar tu código de ejemplo

- Opción recomendada: coloca el archivo en `src/code/` con el nombre `clase_N.py` (N=2..6). Ya está configurado en `src/data/modules.ts` con la propiedad `codeFile`.
- Alternativa rápida: puedes seguir usando `codePlaceholder` en `src/data/modules.ts`.

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

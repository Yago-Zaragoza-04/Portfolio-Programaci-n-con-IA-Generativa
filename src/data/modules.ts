export type ModuleItem = {
  id: string;
  title: string;
  subtitle: string;
  videoPlaceholder: string; // path or embed URL placeholder
  codePlaceholder: string; // code snippet placeholder
  presentationPlaceholder?: string; // optional PPT/PDF placeholder
  accent?: string; // hex color accent for sidebar/background
};

export const modules: ModuleItem[] = [
  {
    id: 'intro',
    title: 'Portfolio: Programación con IA Generativa',
    subtitle: 'Universidad de Palermo — Recorrido de la materia',
    videoPlaceholder: '/videos/intro.mp4',
    codePlaceholder: `// Bienvenidos!\n// Este portfolio recorre las actividades realizadas durante la materia.\n// Coloca aquí un breve snippet de setup, si lo deseas.`,
    accent: '#ffffff'
  },
  {
    id: 'clase1',
    title: 'Clase 1 — Técnicas de Prompts',
    subtitle: 'De lo general a lo específico, ejemplos, dividir, evitar ambigüedad y más.',
    videoPlaceholder: '/videos/clase1.mp4',
    codePlaceholder: `/* Ejemplo de prompt estructurado */\nObjetivo: Generar componente React accesible\nContexto: Proyecto Astro + React\nRequisitos:\n- Semántica correcta\n- Contrast ratio AA\n- Comentarios sobre decisiones\nSalida: Código + explicación`,
    presentationPlaceholder: '/presentaciones/clase1.pptx',
    accent: '#ffd166'
  },
  {
    id: 'clase2',
    title: 'Clase 2 — Sugerencias de Código',
    subtitle: 'Autocompletado y próxima edición (NES).',
    videoPlaceholder: '/videos/clase2.mp4',
    codePlaceholder: `// Placeholder del código usado en el video\nfunction suma(a, b){ return a + b } // Mejorar tipos y tests…`,
    presentationPlaceholder: '/presentaciones/clase2.pptx',
    accent: '#06d6a0'
  },
  {
    id: 'clase3',
    title: 'Clase 3 — Chat, Agente, Visión',
    subtitle: 'Interacción con asistentes de código, y visión.',
    videoPlaceholder: '/videos/clase3.mp4',
    codePlaceholder: `// Prompt de chat + imagen\n// Describí la UI y pedí feedback sobre accesibilidad.`,
    presentationPlaceholder: '/presentaciones/clase3.pptx',
    accent: '#118ab2'
  },
  {
    id: 'clase4',
    title: 'Clase 4 — Refactorización',
    subtitle: 'Renombrar, optimizar, eliminar repetición y modularizar.',
    videoPlaceholder: '/videos/clase4.mp4',
    codePlaceholder: `// Código antes y después de refactor\n// Mostrar funciones renombradas y módulos extraídos.`,
    presentationPlaceholder: '/presentaciones/clase4.pptx',
    accent: '#ef476f'
  },
  {
    id: 'clase5',
    title: 'Clase 5 — Revisión de Código',
    subtitle: 'Revisión de selección y feedback del asistente.',
    videoPlaceholder: '/videos/clase5.mp4',
    codePlaceholder: `// Snippet con issues de estilo y complejidad\n// Comentarios del asistente y cambios propuestos.`,
    presentationPlaceholder: '/presentaciones/clase5.pptx',
    accent: '#a8dadc'
  },
  {
    id: 'clase6',
    title: 'Clase 6 — Comparación de Modelos',
    subtitle: 'Evaluar GPT-4.1, o3-mini, Gemini 2.5, Claude Sonnet.',
    videoPlaceholder: '/videos/clase6.mp4',
    codePlaceholder: `// Prompt idéntico con dos LLMs\n// Comparar claridad, pasos y calidad de código.`,
    presentationPlaceholder: '/presentaciones/clase6.pptx',
    accent: '#ff9f1c'
  },
  {
    id: 'clase7',
    title: 'Clase 7 — Servidores MCP',
    subtitle: 'Conectar a un servidor MCP y usar sus herramientas.',
    videoPlaceholder: '/videos/clase7.mp4',
    codePlaceholder: `// Ejemplo de invocación a herramienta MCP\n// + resultado devuelto y cómo se integró al código.`,
    presentationPlaceholder: '/presentaciones/clase7.pptx',
    accent: '#b5179e'
  },
  {
    id: 'cierre',
    title: 'Cierre — Hecho con GitHub Copilot',
    subtitle: 'Esta página fue creada con ayuda de GitHub Copilot.',
    videoPlaceholder: '/videos/cierre.mp4',
    codePlaceholder: `// ¡Gracias por visitar!\n// Repositorio: añade tu URL de GitHub aquí.`,
    accent: '#ffffff'
  }
];

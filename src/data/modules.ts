export type ModuleItem = {
  id: string;
  title: string;
  subtitle: string;
  videoPlaceholder: string; // path or embed URL placeholder
  codePlaceholder: string; // fallback code snippet
  codeLanguage?: string; // language hint for CodeFrame (e.g., 'python')
  codeFile?: string; // optional path to raw code file under src/code
  presentationPlaceholder?: string; // optional PPT/PDF placeholder
  accent?: string; // hex color accent for sidebar/background
};

export const modules: ModuleItem[] = [
  {
    id: 'intro',
    title: 'Portfolio: Programación con IA Generativa',
    subtitle: 'Universidad de Palermo — Recorrido de la materia',
    videoPlaceholder: '',
    codePlaceholder: `// Bienvenidos!\n// Este portfolio recorre las actividades realizadas durante la materia.\n// Coloca aquí un breve snippet de setup, si lo deseas.`,
    accent: '#ffffff'
  },
  {
    id: 'clase1',
    title: 'Clase 1 — Técnicas de Prompts',
    subtitle: 'De lo general a lo específico, ejemplos, dividir, evitar ambigüedad y más.',
    videoPlaceholder: '',
    codePlaceholder: `/* Ejemplo de prompt estructurado */\nObjetivo: Generar componente React accesible\nContexto: Proyecto Astro + React\nRequisitos:\n- Semántica correcta\n- Contrast ratio AA\n- Comentarios sobre decisiones\nSalida: Código + explicación`,
    presentationPlaceholder: '/presentaciones/Clase 1 - 04 - Prompt Engineering para Copilot.pptx (1).pdf',
    accent: '#ffd166'
  },
  {
    id: 'clase2',
    title: 'Clase 2 — Sugerencias de Código',
    subtitle: 'Autocompletado y próxima edición (NES).',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_1.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_2.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_2.py',
    presentationPlaceholder: '/presentaciones/Clase 2 - 01 - Sugerencias de Código.pptx.pdf',
    accent: '#06d6a0'
  },
  {
    id: 'clase3',
    title: 'Clase 3 — Chat, Agente, Visión',
    subtitle: 'Interacción con asistentes de código, y visión.',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_2.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_3.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_3.py',
    presentationPlaceholder: '/presentaciones/Clase 3 - 01 - Chat, Asistente de Edición y Visión.pptx.pdf',
    accent: '#118ab2'
  },
  {
    id: 'clase4',
    title: 'Clase 4 — Refactorización',
    subtitle: 'Renombrar, optimizar, eliminar repetición y modularizar.',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_3.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_4.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_4.py',
    presentationPlaceholder: '/presentaciones/Clase 4 - 01 - Refactorización de código.pptx.pdf',
    accent: '#ef476f'
  },
  {
    id: 'clase5',
    title: 'Clase 5 — Revisión de Código',
    subtitle: 'Revisión de selección y feedback del asistente.',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_4.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_5.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_5.py',
    presentationPlaceholder: '/presentaciones/Clase 5 - 01 - Revisión de código.pptx.pdf',
    accent: '#a8dadc'
  },
  {
    id: 'clase6',
    title: 'Clase 6 — Comparación de Modelos',
    subtitle: 'Evaluar GPT-4.1, o3-mini, Gemini 2.5, Claude Sonnet.',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_5.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_6.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_6.py',
    presentationPlaceholder: '/presentaciones/Clase 6 - 01 - Modelos LLM para asistencia de código.pptx.pdf',
    accent: '#ff9f1c'
  },
  {
    id: 'clase7',
    title: 'Clase 7 — Servidores MCP',
    subtitle: 'Conectar a un servidor MCP y usar sus herramientas.',
  videoPlaceholder: 'https://raw.githubusercontent.com/Yago-Zaragoza-04/Portfolio-Programaci-n-con-IA-Generativa/main/public/videos/Video_Clase_6.mp4',
    codePlaceholder: '# Ver archivo src/code/clase_7.py',
    codeLanguage: 'python',
    codeFile: '/src/code/clase_7.py',
    presentationPlaceholder: '/presentaciones/Clase 07 - Agentes - Herramientas - Servidores MCP.pptx (1).pdf',
    accent: '#b5179e'
  },
  {
    id: 'cierre',
    title: 'Cierre — Hecho con GitHub Copilot',
    subtitle: 'Esta página fue creada con ayuda de GitHub Copilot.',
    videoPlaceholder: '',
    codePlaceholder: `// ¡Gracias por visitar!\n// Repositorio: añade tu URL de GitHub aquí.`,
    accent: '#ffffff'
  }
];

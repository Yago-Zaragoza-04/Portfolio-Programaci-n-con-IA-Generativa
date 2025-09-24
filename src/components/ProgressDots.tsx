import React, { useEffect, useState } from 'react';

export default function ProgressDots({ count }: { count: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.main');
    const sections = Array.from(document.querySelectorAll('[data-section-index]')) as HTMLElement[];
    if (!container || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry mostly in view
        let bestIdx = active; let bestRatio = 0;
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.sectionIndex || '0');
          if (e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; bestIdx = idx; }
        }
        setActive(bestIdx);
      },
      { root: container as Element | null, threshold: [0.2, 0.4, 0.6, 0.8, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const onClick = (i: number) => {
    const el = document.querySelector(`[data-section-index="${i}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="progress" aria-label="Progreso de secciones">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={"dot" + (i === active ? ' active' : '')}
          aria-current={i===active}
          aria-label={`Ir a la sección ${i+1}`}
          onClick={() => onClick(i)}
          style={{appearance:'none',border:'none',padding:0,cursor:'pointer'}}
        />
      ))}
    </div>
  );
}

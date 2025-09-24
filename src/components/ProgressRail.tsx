import React, { useEffect, useMemo, useRef, useState } from 'react';

type Props = {
  labels: string[];
  accents?: string[]; // colors per section
};

export default function ProgressRail({ labels, accents }: Props) {
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);

  const count = labels.length;

  useEffect(() => {
    const container = document.querySelector('.main');
    const sections = Array.from(document.querySelectorAll('[data-section-index]')) as HTMLElement[];
    if (!container || sections.length === 0) return;

    const update = () => {
      const rects = sections.map(s => s.getBoundingClientRect());
      // Choose section nearest to top
      let bestIdx = 0; let bestTop = Infinity;
      for (let i=0;i<rects.length;i++) {
        const top = Math.abs(rects[i].top);
        if (top < bestTop) { bestTop = top; bestIdx = i; }
      }
      setActive(bestIdx);
      if (railRef.current) {
        railRef.current.style.setProperty('--accent', accents?.[bestIdx] || '#fff');
      }
      // Mark active section and set global accent (for CSS usage)
      sections.forEach((s, i) => {
        if (i === bestIdx) s.setAttribute('data-active', 'true'); else s.removeAttribute('data-active');
      });
      document.documentElement.style.setProperty('--accent', accents?.[bestIdx] || '#fff');
    };

    const onScroll = () => update();
  update();
  // Safety: if nothing is active (fresh load), mark first
  const first = sections[0];
  if (first && !first.hasAttribute('data-active')) first.setAttribute('data-active', 'true');
    container.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      container.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [accents]);

  const onClickTick = (i: number) => {
    const el = document.querySelector(`[data-section-index="${i}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const ticks = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  return (
    <div ref={railRef} className="progress-rail" aria-label="Navegación por secciones">
      <ul className="pr-ticks">
        {ticks.map(i => (
          <li key={i}>
            <button
              className={"pr-tick" + (i === active ? ' active' : '')}
              aria-label={`Ir a ${labels[i]}`}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => onClickTick(i)}
              style={{ '--tick-color': (accents?.[i] || '#888') } as React.CSSProperties}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

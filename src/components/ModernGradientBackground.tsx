import React, { useEffect, useRef } from 'react';

export default function ModernGradientBackground() {
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const spheresRef = useRef<NodeListOf<HTMLDivElement>>();
  const timeoutsRef = useRef<number[]>([]);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

  const rootEl = rootRef.current;
  spheresRef.current = document.querySelectorAll('.gradient-sphere');

    const particleCount = 80;

    const resetParticle = (el: HTMLDivElement) => {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      el.style.left = `${posX}%`;
      el.style.top = `${posY}%`;
      el.style.opacity = '0';
      return { x: posX, y: posY };
    };

    const animateParticle = (el: HTMLDivElement) => {
      const pos = resetParticle(el);
      const duration = Math.random() * 10 + 10; // 10..20s
      const delay = Math.random() * 5; // 0..5s
      const t1 = window.setTimeout(() => {
        el.style.transition = `all ${duration}s linear`;
        el.style.opacity = String(Math.random() * 0.3 + 0.1);
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;
        el.style.left = `${moveX}%`;
        el.style.top = `${moveY}%`;
        const t2 = window.setTimeout(() => animateParticle(el), duration * 1000);
        timeoutsRef.current.push(t2);
      }, delay * 1000);
      timeoutsRef.current.push(t1);
    };

    const getAccent = () => (getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ffffff');

    const recolorLiveElements = () => {
      const accent = getAccent();
      // recolor all particles
      const cont = particlesRef.current;
      if (cont) {
        cont.querySelectorAll<HTMLDivElement>('.particle').forEach(p => {
          p.style.background = accent;
          // keep a softer glow for background particles, stronger for recent ones
          p.style.boxShadow = `0 0 8px ${accent}`;
        });
      }
      // recolor glow
      const glow = rootEl?.querySelector<HTMLDivElement>('.glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle, color-mix(in srgb, ${accent} 22%, transparent), transparent 70%)`;
      }
      // recolor spheres gradient to accent family
      spheresRef.current?.forEach((sphere, idx) => {
        const aStrong = `color-mix(in srgb, ${accent} 80%, transparent)`;
        const aSoft = `color-mix(in srgb, ${accent} 35%, transparent)`;
        const angle = idx === 0 ? 40 : idx === 1 ? 240 : 120;
        (sphere as HTMLDivElement).style.background = `linear-gradient(${angle}deg, ${aStrong}, ${aSoft})`;
      });
    };

    const createParticle = () => {
      const el = document.createElement('div');
      el.className = 'particle';
      const size = Math.random() * 3 + 1; // 1..4px
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      const accent = getAccent();
      el.style.background = accent;
      el.style.boxShadow = `0 0 8px ${accent}`;
      container.appendChild(el);
      animateParticle(el);
    };

  for (let i = 0; i < particleCount; i++) createParticle();
  // set initial colors
  recolorLiveElements();

  // observe --accent changes on root
  observerRef.current = new MutationObserver(() => recolorLiveElements());
  observerRef.current.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    const onMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;

      // ephemeral particle
  const el = document.createElement('div');
      el.className = 'particle';
      const size = Math.random() * 4 + 2;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${mouseX}%`;
      el.style.top = `${mouseY}%`;
      el.style.opacity = '0.7';
  // color according to current section accent
  const accent = getAccent();
      el.style.background = accent;
      el.style.boxShadow = `0 0 10px ${accent}`;
      container.appendChild(el);
      const t3 = window.setTimeout(() => {
        el.style.transition = 'all 2s ease-out';
        el.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        el.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
  el.style.opacity = '0';
  el.style.boxShadow = 'none';
        const t4 = window.setTimeout(() => el.remove(), 2000);
        timeoutsRef.current.push(t4);
      }, 10);
      timeoutsRef.current.push(t3);

      // subtle sphere parallax
      const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
      spheresRef.current?.forEach((sphere) => {
        (sphere as HTMLDivElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => {
  document.removeEventListener('mousemove', onMouseMove);
  observerRef.current?.disconnect();
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
      // cleanup particles
      if (container) container.innerHTML = '';
    };
  }, []);

  return (
    <div className="gradient-background" aria-hidden ref={rootRef}>
      <div className="gradient-sphere sphere-1" />
      <div className="gradient-sphere sphere-2" />
      <div className="gradient-sphere sphere-3" />
      <div className="glow" />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
      <div className="particles-container" ref={particlesRef} />
    </div>
  );
}

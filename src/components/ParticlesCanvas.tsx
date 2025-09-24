import React, { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  color?: string; // particle color
};

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number };

export default function ParticlesCanvas({ className, color = '255,255,255' }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafId = useRef<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const running = useRef<boolean>(true);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0, height = 0;

    const particles: Particle[] = [];
    const COUNT = 140; // balance perf/quality
    const SPEED = 0.5;
    const FIELD_FREQ = 0.0018; // noise-ish field frequency

    const resize = () => {
      const parent = canvas.parentElement as HTMLElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * DPR));
      canvas.height = Math.max(1, Math.floor(height * DPR));
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const rand = (n=1)=>Math.random()*n;
    const spawn = (): Particle => ({
      x: rand(width), y: rand(height), vx: 0, vy: 0,
      life: 0, maxLife: 200 + Math.random()*200
    });

    const fieldAngle = (x:number, y:number, t:number) => {
      const a = Math.sin((y + t*60) * FIELD_FREQ) + Math.cos((x - t*40) * FIELD_FREQ*1.2);
      return a * 1.2; // radians
    };

    const step = (tms: number) => {
      if (!running.current) { rafId.current = requestAnimationFrame(step); return; }
      const t = tms / 1000;
      ctx.clearRect(0,0,width,height);

      ctx.globalCompositeOperation = 'lighter';
      for (let i=0;i<particles.length;i++){
        const p = particles[i];
        const a = fieldAngle(p.x, p.y, t);
        p.vx += Math.cos(a) * SPEED*0.3;
        p.vy += Math.sin(a) * SPEED*0.3;
        // damp
        p.vx *= 0.96; p.vy *= 0.96;
        p.x += p.vx; p.y += p.vy;
        p.life++;

        // wrap around edges and respawn on life end
        if (p.x < 0) p.x = width; else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
        if (p.life > p.maxLife) particles[i] = spawn();

        // draw
  const opacity = 0.12 + 0.12*Math.sin((p.life/p.maxLife)*Math.PI);
  ctx.fillStyle = `rgba(${color},${opacity.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2);
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(step);
    };

    const onVisibility = () => { running.current = document.visibilityState === 'visible'; };
    const init = () => {
      resize();
      particles.length = 0;
      for (let i=0;i<COUNT;i++) particles.push(spawn());
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(step);
    };

    // pause when not visible / not intersecting
    observer.current = new IntersectionObserver((entries) => {
      const e = entries[0];
      running.current = e?.isIntersecting ?? true;
    }, { threshold: 0.1 });
    observer.current.observe(canvas);

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement as Element);

    document.addEventListener('visibilitychange', onVisibility);
    init();

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      observer.current?.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}

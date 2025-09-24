import React from 'react';
import ParticlesCanvas from './ParticlesCanvas';

export default function SectionBackground({ accent }: { accent?: string }) {
  // convert hex to rgb string
  const rgb = (hex?: string) => {
    const h = (hex || '#ffffff').replace('#','');
    const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `${r},${g},${b}`;
  };
  return (
    <div className="section-bg" style={{ ['--accent' as any]: accent || '#fff' }}>
      <ParticlesCanvas className="hero-bg" color={rgb(accent)} />
    </div>
  );
}

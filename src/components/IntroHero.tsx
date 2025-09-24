import React, { useState } from 'react';
import ParticlesCanvas from './ParticlesCanvas';

type Props = {
  title: string;
  subtitle?: string;
  videoSrc?: string; // optional background video path
};

export default function IntroHero({ title, subtitle, videoSrc }: Props) {
  const [canPlay, setCanPlay] = useState<boolean>(!!videoSrc);
  return (
    <section className="section" data-section-index={0}>
      <div className="hero">
        {canPlay ? (
          <video
            className="hero-bg"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setCanPlay(false)}
          />
        ) : (
          <>
            <div className="hero-gradient" aria-hidden="true" />
            <ParticlesCanvas className="hero-bg" />
          </>
        )}
        <div className="hero-overlay" />
        <div className="hero-content container">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

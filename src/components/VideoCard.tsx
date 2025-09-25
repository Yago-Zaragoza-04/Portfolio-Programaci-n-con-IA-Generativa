import React, { useEffect, useRef, useState } from 'react';

type Props = {
  src?: string;
  title: string;
};

/**
 * VideoCard
 * - Inline: Shows a blurred preview tile. Click to open modal.
 * - Modal: Plays the video with controls. Closes on backdrop click or ESC.
 */
export default function VideoCard({ src, title }: Props) {
  const [open, setOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
      // stop playback when closing
      if (modalVideoRef.current) { modalVideoRef.current.pause(); modalVideoRef.current.currentTime = 0; }
    }
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const hasSrc = !!src && src.trim().length > 0;

  return (
    <div className="card">
      <div className="label-strong">Video</div>
      <div className="media" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
        {hasSrc ? (
          <button
            aria-label={`Abrir video: ${title}`}
            onClick={() => setOpen(true)}
            style={{ display: 'block', width: '100%', height: '100%', background: 'transparent', padding: 0, border: 'none', cursor: 'pointer' }}
          >
            {/* Use a video element as a blurred background preview without autoplay to avoid heavy load */}
            <video
              src={src}
              preload="metadata"
              muted
              playsInline
              tabIndex={-1}
              aria-hidden
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(6px) brightness(0.85)', transform: 'scale(1.03)' }}
            />
            <div
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)', color: 'white', fontWeight: 600, letterSpacing: 0.3, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              <span style={{ padding: '10px 16px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.35)' }}>Tocar para reproducir</span>
            </div>
          </button>
        ) : (
          <div style={{ height: '100%', display: 'grid', placeItems: 'center', color: '#aaa' }}>
            <span>Sin video disponible</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && hasSrc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: 'min(1200px, 96vw)', height: 'min(84vh, 900px)', background: '#0d0f12', borderRadius: 14, boxShadow: '0 12px 48px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              style={{ position: 'absolute', top: 10, right: 12, zIndex: 2, background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' }}
            >
              ✕
            </button>
            <video
              ref={modalVideoRef}
              src={src}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'black' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

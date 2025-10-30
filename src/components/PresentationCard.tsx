import React, { useEffect, useMemo, useState } from 'react';

type Props = {
  src: string;
  title: string;
};

/**
 * PresentationCard
 * - If src is a PDF: shows a blurred inline preview; clicking opens a centered modal with an embedded PDF viewer.
 * - If src is not PDF (e.g., PPTX): shows a download/open link.
 */
export default function PresentationCard({ src, title }: Props) {
  const isPdf = useMemo(() => src.toLowerCase().endsWith('.pdf'), [src]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleOpen = () => {
    if (isPdf) setOpen(true);
  };

  return (
    <div className="card card-presentation">
      <div className="label-strong">Presentación</div>
      <div className="media" style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
        {isPdf ? (
          // Blurred inline preview
          <button
            aria-label={`Abrir presentación: ${title}`}
            onClick={handleOpen}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              background: 'transparent',
              padding: 0,
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <iframe
              src={src}
              title={`Vista previa difuminada: ${title}`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                filter: 'blur(6px) brightness(0.8)',
                transform: 'scale(1.02)',
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)',
                color: 'white',
                fontWeight: 600,
                letterSpacing: 0.3,
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                pointerEvents: 'none'
              }}
            >
              <span style={{
                padding: '8px 14px',
                borderRadius: 10,
                border: '1px dashed rgba(255,255,255,0.35)',
                fontSize: 'clamp(0.75rem, 1.8vw, 0.95rem)'
              }}>Tocar para ver en grande</span>
            </div>
          </button>
        ) : (
          // PPTX or other: offer a direct link
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a className="button" href={src} target="_blank" rel="noopener">
              Descargar presentación (PPTX)
            </a>
          </div>
        )}
      </div>

      {/* Modal for PDFs */}
      {isPdf && open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '24px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(1200px, 96vw)',
              height: 'min(84vh, 900px)',
              background: '#0d0f12',
              borderRadius: 14,
              boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden'
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: 10,
                right: 12,
                zIndex: 2,
                background: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            <iframe
              src={src}
              title={title}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

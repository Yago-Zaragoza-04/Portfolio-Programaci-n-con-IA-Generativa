import React, { useMemo, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';

type Props = {
  title?: string;
  language?: string;
  placeholder?: string;
  children?: React.ReactNode;
  code?: string;
  // Optional blurred overlay that, when clicked, navigates to a URL
  blurOverlay?: {
    enabled: boolean;
    href: string;
    label?: string;
    iconSrc?: string; // optional custom icon, defaults to /favicon.svg
  };
};

export default function CodeFrame({ title, language = 'tsx', placeholder, children, code, blurOverlay }: Props) {
  const [copied, setCopied] = useState(false);
  const raw = useMemo(() => {
    if (typeof code === 'string') return code;
    if (children) return (typeof children === 'string') ? children : placeholder || '';
    return placeholder || '';
  }, [code, children, placeholder]);

  const highlighted = useMemo(() => {
    const lang = (language?.toLowerCase() || 'tsx') as keyof typeof Prism.languages;
    const grammar = Prism.languages[lang] || Prism.languages.tsx;
    return Prism.highlight(raw, grammar, language);
  }, [raw, language]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(raw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <div className="card" aria-label={title || 'Código'} style={{position:'relative'}}>
      {title && <div style={{fontWeight:700, marginBottom:8}}>{title}</div>}
      <button type="button" onClick={onCopy}
        style={{position:'absolute', right:12, top:10, background:'#1a1a1a', color:'#fff', border:'1px solid #333', borderRadius:8, padding:'4px 8px', cursor:'pointer'}}
        aria-label="Copiar código">
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      <div className="codeframe" role="region" aria-live="polite">
        <pre style={{margin:0}}>
          <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>

      {blurOverlay?.enabled && (
        <a
          href={blurOverlay.href}
          target="_blank"
          rel="noopener"
          aria-label={blurOverlay.label || 'Abrir enlace'}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            backdropFilter: 'blur(10px) saturate(130%)',
            WebkitBackdropFilter: 'blur(10px) saturate(130%)',
            background: 'rgba(0,0,0,0.22)',
            textDecoration: 'none',
            color: 'white',
            fontWeight: 600,
            letterSpacing: 0.2
          }}
        >
          <span style={{
            padding: '10px 16px',
            borderRadius: 10,
            border: '1px dashed rgba(255,255,255,0.45)',
            background: 'rgba(0,0,0,0.32)',
            textShadow: '0 2px 8px rgba(0,0,0,0.45)'
          }}>
            {blurOverlay.label || 'Ver en GitHub'}
          </span>
        </a>
      )}
    </div>
  );
}

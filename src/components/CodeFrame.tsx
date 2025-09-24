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
};

export default function CodeFrame({ title, language = 'tsx', placeholder, children, code }: Props) {
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
    </div>
  );
}

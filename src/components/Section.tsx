import React from 'react';

type Props = {
  index: number;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export default function Section({ index, title, subtitle, children }: Props) {
  return (
    <section className="section" data-section-index={index}>
      <div className="content">
        <div className="container">
          <h2 className="title">{title}</h2>
          {subtitle && <p className="subtitle">{subtitle}</p>}
          <div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

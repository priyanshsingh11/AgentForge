import React from 'react';

export const PresetArchitectures: React.FC = () => {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-2xl relative z-10">
      <span className="text-on-surface-variant/40 text-xs uppercase tracking-widest w-full text-center mb-2 font-headline">Preset Architectures</span>
      {[
        { icon: 'search', label: 'Market Sentiment Analysis', color: 'text-primary' },
        { icon: 'code', label: 'Refactor Legacy Backend', color: 'text-secondary' },
        { icon: 'trending_up', label: 'Growth Strategy Generation', color: 'text-tertiary' }
      ].map((s, i) => (
        <button key={i} className="bg-surface-container-high/50 hover:bg-surface-container-high border border-outline-variant/10 px-4 py-2 rounded-full text-xs text-on-surface/70 transition-colors flex items-center gap-2">
          <span className={`material-symbols-outlined text-sm ${s.color}`}>{s.icon}</span>
          {s.label}
        </button>
      ))}
    </div>
  );
};

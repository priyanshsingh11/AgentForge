import React from 'react';

export const PresetArchitectures: React.FC = () => {
  return (
    <div className="mt-4 w-full max-w-3xl relative z-10">

      <span className="block text-on-surface-variant/40 text-[10px] uppercase tracking-widest text-center mb-2 font-semibold">
        Preset Architectures
      </span>

      <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar">
        {[
          { icon: 'search', label: 'Market Sentiment Analysis', color: 'text-primary' },
          { icon: 'code', label: 'Refactor Legacy Backend', color: 'text-secondary' },
          { icon: 'trending_up', label: 'Growth Strategy Generation', color: 'text-tertiary' }
        ].map((s, i) => (
          <button
            key={i}
            className="flex-shrink-0 bg-surface-container-high/50 hover:bg-surface-container-high border border-outline-variant/10 px-3 py-1.5 rounded-full text-xs text-on-surface/70 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span className={`material-symbols-outlined text-sm ${s.color}`}>
              {s.icon}
            </span>
            {s.label}
          </button>
        ))}
      </div>

    </div>
  );
};
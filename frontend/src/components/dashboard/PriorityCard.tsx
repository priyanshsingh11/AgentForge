import React from 'react';
import { AnalysisResult } from '../../types/business';

interface PriorityCardProps {
  result: AnalysisResult | null;
}

export const PriorityCard: React.FC<PriorityCardProps> = ({ result }) => {
  const priorities = result?.strategies?.priority_actions || [
    "Scale multi-agent collaborative workflows to reduce operational friction by 25%.",
    "Integrate vertical-specific knowledge bases for high-precision industry context.",
    "Optimize strategic inference paths to minimize overhead and accelerate deployment.",
    "Establish cross-sector neural clusters for real-time market sentiment indexing.",
    "Deploy autonomous compliance swarms to ensure zero-latency regulatory alignment."
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-8 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Top Priorities</h3>
        <span className="material-symbols-outlined text-primary text-xl">priority_high</span>
      </div>

      <div className="space-y-8 flex-1">
        {priorities.map((text, i) => (
          <div key={i} className="flex gap-6 items-start group">
            <span className="text-4xl font-headline font-black text-on-surface-variant/20 group-hover:text-primary/40 transition-colors">
              0{i + 1}
            </span>
            <p className="text-[13px] font-medium text-on-surface/80 leading-relaxed mt-1">
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

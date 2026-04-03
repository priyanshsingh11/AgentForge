import React from 'react';
import { AnalysisResult } from '../../types/business';

interface CompetitorInsightsProps {
  result: AnalysisResult | null;
}

export const CompetitorInsights: React.FC<CompetitorInsightsProps> = ({ result }) => {
  const strengths = result?.strategies?.competitor_strengths?.slice(0, 3) || [
    "Large established enterprise client bases",
    "Extensive legacy software integrations",
    "High R&D budgets for core LLM training"
  ];
  
  const weaknesses = result?.strategies?.competitor_weaknesses?.slice(0, 3) || [
    "Slow decision cycles in product updates",
    "Rigid architectural lock-in for users",
    "High pricing barriers for mid-market"
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col h-full shadow-sm">
      <div className="space-y-12">
        {/* Strengths */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Competitor Strengths</h3>
          <ul className="space-y-4">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">{s}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-error mb-6">Competitor Weaknesses</h3>
          <ul className="space-y-4">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-error text-sm mt-0.5">cancel</span>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">{w}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

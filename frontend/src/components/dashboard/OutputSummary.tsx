import React from 'react';
import { AnalysisResult } from '../../types/business';

interface OutputSummaryProps {
  result: AnalysisResult | null;
}

export const OutputSummary: React.FC<OutputSummaryProps> = ({ result }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-2 px-4">Output Summary</h3>
      <div className="bg-surface-container-lowest border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-8">
         <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[.4em] block mb-4">Strategic Advantage</span>
            <h4 className="text-3xl font-headline font-black text-on-surface leading-tight tracking-tight">
               {result?.strategies?.strategies?.[0]?.split('.')[0] || "Identifying first-mover market opportunities."}
            </h4>
         </div>

          <div className="space-y-6">
            {/* Competitor Strengths */}
            <div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] block mb-3">Competitor Strengths</span>
              <ul className="space-y-2">
                {(result?.strategies?.strengths || ["Analyzing market leader stability...", "Mapping digital footprint..."]).slice(0, 3).map((item, i) => (
                  <li key={i} className="text-[11px] text-on-surface/60 flex gap-2">
                    <span className="text-emerald-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gap Analysis */}
            <div>
              <span className="text-[10px] font-black text-secondary uppercase tracking-[.4em] block mb-3">Gap Analysis (Why you lag)</span>
              <ul className="space-y-2">
                {(result?.strategies?.gaps || ["Identifying service bottlenecks...", "Evaluating customer friction..."]).slice(0, 3).map((item, i) => (
                  <li key={i} className="text-[11px] text-on-surface/60 flex gap-2">
                    <span className="text-secondary">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

         <button className="mt-auto w-full py-4 bg-white/5 hover:bg-white/10 text-on-surface border border-white/10 rounded-xl font-bold transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-lg">download</span>
            Export JSON Manifest
         </button>
      </div>
    </div>
  );
};

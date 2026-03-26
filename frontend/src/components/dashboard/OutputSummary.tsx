import React from 'react';
import { AnalysisResult } from '../../types/business';

interface OutputSummaryProps {
  result: AnalysisResult | null;
}

export const OutputSummary: React.FC<OutputSummaryProps> = ({ result }) => {
  const s = result?.strategies;

  // Defensive rendering helper
  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(" ");
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  const renderList = (val: any, fallback: string[]) => {
    if (!val) return fallback;
    if (Array.isArray(val)) return val;
    if (typeof val === 'object') return Object.values(val).map(v => renderText(v));
    if (typeof val === 'string') return [val];
    return fallback;
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-2 px-4">Strategic Analysis</h3>
      
      <div className="bg-surface-container-lowest border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-8">
          {/* Market Summary */}
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[.4em] block mb-3">Market Intelligence Summary</span>
            <p className="text-sm text-on-surface/80 leading-relaxed font-medium capitalize">
               {renderText(s?.market_summary) || "Analyzing macro-economic shifts and digital-first consolidation trends..."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Competitor Weaknesses */}
            <div>
              <span className="text-[10px] font-black text-error/60 uppercase tracking-[.4em] block mb-3">Target Weaknesses</span>
              <ul className="space-y-2">
                {renderList(s?.competitor_weaknesses, ["Scanning legacy stacks...", "Identifying franchise friction..."]).slice(0, 3).map((item, i) => (
                  <li key={i} className="text-[11px] text-on-surface/50 flex gap-2">
                    <span className="text-error/40">•</span> {renderText(item)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div>
              <span className="text-[10px] font-black text-primary uppercase tracking-[.4em] block mb-3">Market Opportunities</span>
              <ul className="space-y-2">
                {renderList(s?.opportunities, ["B2B Subscription vectors...", "Subscription potential..."]).slice(0, 3).map((item, i) => (
                  <li key={i} className="text-[11px] text-on-surface/50 flex gap-2">
                    <span className="text-primary/40">•</span> {renderText(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-surface-variant/10 rounded-2xl p-6 border border-white/5">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] block mb-4">Priority Execution Roadmap (Top 3)</span>
            <div className="space-y-4">
              {renderList(s?.priority_actions, ["Phase 1: Initial deployment", "Phase 2: Market capture", "Phase 3: Scale"]).slice(0, 3).map((action, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-black text-emerald-500 border border-emerald-500/20">{i+1}</span>
                  <p className="text-xs font-bold text-on-surface/80">{renderText(action)}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
               <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Expected Strategic Impact</span>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-black text-emerald-500 uppercase">{renderText(s?.estimated_impact) || "High"}</span>
               </div>
            </div>
          </div>

      </div>
    </div>
  );
};

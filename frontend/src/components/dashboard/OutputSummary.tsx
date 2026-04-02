import React from 'react';
import { AnalysisResult } from '../../types/business';

interface OutputSummaryProps {
  result: AnalysisResult | null;
}

export const OutputSummary: React.FC<OutputSummaryProps> = ({ result }) => {
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

      <div className="bg-surface border border-outline-variant rounded-[2rem] p-8 flex flex-col gap-8 shadow-sm">
        {/* Market Summary */}
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[.4em] block mt-3">Market Intelligence Summary</span>
          <p className="text-sm text-on-surface/80 leading-relaxed font-medium capitalize">
            {renderText(result?.strategies?.market_summary) || "Analyzing macro-economic shifts and digital-first consolidation trends..."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Actionable Steps */}
          <div>
            <span className="text-[10px] font-black text-primary/60 uppercase tracking-[.4em] block mb-4">Action Plan</span>
            <ul className="space-y-3">
              {renderList(result?.strategies?.actionable_steps, ["Deploying compute clusters...", "Initializing market protocols..."]).slice(0, 3).map((item, i) => (
                <li key={i} className="text-[11px] font-medium text-on-surface/60 flex gap-2 leading-relaxed">
                  <span className="text-primary/40">0{i + 1}</span> {renderText(item)}
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div>
            <span className="text-[10px] font-black text-secondary/60 uppercase tracking-[.4em] block mb-4">Strategic Upside</span>
            <ul className="space-y-3">
              {renderList(result?.strategies?.opportunities, ["Vertical integration vectors...", "Expansion blueprints..."]).slice(0, 3).map((item, i) => (
                <li key={i} className="text-[11px] font-medium text-on-surface/60 flex gap-2 leading-relaxed">
                  <span className="text-secondary/40">•</span> {renderText(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant">
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[.4em] block mb-4">Priority Execution Roadmap (Top 3)</span>
          <div className="space-y-4">
            {renderList(result?.strategies?.priority_actions, ["Phase 1: Initial deployment", "Phase 2: Market capture", "Phase 3: Scale"]).slice(0, 3).map((action, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-surface rounded-2xl border border-outline-variant shadow-sm transition-all group hover:border-primary/40">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">{i + 1}</span>
                <p className="text-xs font-bold text-on-surface/80">{renderText(action)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-outline-variant flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">Expected Strategic Impact</span>
            </div>
            <p className="text-sm font-bold text-emerald-500 uppercase leading-snug">
              {renderText(result?.strategies?.estimated_impact) || "High"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

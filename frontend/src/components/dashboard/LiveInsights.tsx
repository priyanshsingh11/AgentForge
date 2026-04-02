import React from 'react';
import { AnalysisResult } from '../../types/business';

interface LiveInsightsProps {
  result: AnalysisResult | null;
}

export const LiveInsights: React.FC<LiveInsightsProps> = ({ result }) => {
  // Defensive rendering helper
  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(" ");
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-2 px-4">Live Insights</h3>
      
      {/* Growth Spike */}
      <div className="bg-surface border border-outline-variant rounded-[2.5rem] p-8 flex flex-col gap-6 relative overflow-hidden group shadow-sm">
         <div className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors">
            <span className="material-symbols-outlined scale-[3.0]">insights</span>
         </div>
         <div className="flex items-center justify-between">
            <div className="bg-primary/20 text-primary text-[10px] font-black px-3 py-1 rounded w-fit uppercase tracking-widest">Market Intel</div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-on-surface-variant/40 uppercase">Impact</span>
               <span className="text-xs font-black text-primary">{renderText(result?.strategies?.estimated_impact) || 'HIGH'}</span>
            </div>
         </div>
         <p className="text-on-surface/80 text-sm leading-relaxed relative z-10 font-medium">
            {renderText(result?.strategies?.market_summary) || "Intelligence cluster initialized. Scanning hyper-local market vectors for strategic anomalies..."}
         </p>
         <div className="flex items-end gap-2 h-16 pt-4 relative z-10">
            {[40, 60, 45, 80, 100].map((h, i) => (
              <div key={i} className={`flex-1 rounded-sm ${i === 4 ? 'intelligence-gradient' : 'bg-white/5'}`} style={{ height: `${h}%` }}></div>
            ))}
         </div>
      </div>

      {/* Competitor Weaknesses */}
      <div className="bg-surface border border-outline-variant rounded-[2rem] p-6 flex flex-col gap-4 group shadow-sm">
         <div className="flex items-center justify-between">
            <div className="bg-error/10 text-error text-[10px] font-black px-3 py-1 rounded w-fit uppercase tracking-widest">Market Gaps</div>
            <span className="material-symbols-outlined text-error/60 text-sm">warning</span>
         </div>
         <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-3">Competitor Weaknesses</h4>
            <div className="space-y-3">
               {result?.strategies?.competitor_weaknesses.slice(0, 2).map((weak, i) => (
                  <p key={i} className="text-sm font-medium text-on-surface/70 leading-relaxed flex gap-2">
                     <span className="text-error/40">•</span> {weak}
                  </p>
               ))}
            </div>
         </div>
      </div>

      {/* Gap Analysis */}
      <div className="bg-surface-container border border-outline-variant rounded-[2rem] p-6 flex flex-col gap-4 group shadow-sm">
         <div className="flex items-center justify-between">
            <div className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded w-fit uppercase tracking-widest">Strategic Gap</div>
            <span className="material-symbols-outlined text-primary/60 text-sm">analytics</span>
         </div>
         <p className="text-xs font-bold text-on-surface-variant/80 leading-relaxed italic">
            {result?.strategies?.gap_analysis[0] || "Identifying primary friction points in current deployment stack..."}
         </p>
      </div>
    </div>
  );
};

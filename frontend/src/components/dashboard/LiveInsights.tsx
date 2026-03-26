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
      <div className="glass-panel border border-primary/10 rounded-[2.5rem] p-8 flex flex-col gap-6 relative overflow-hidden group">
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

      {/* Sentiment Alert */}
      <div className="bg-surface-container-high/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 group">
         <div className="flex items-center justify-between">
            <div className="bg-secondary/20 text-secondary text-[10px] font-black px-3 py-1 rounded w-fit uppercase tracking-widest">Sentiment Alert</div>
            <span className="material-symbols-outlined text-secondary text-sm">chat_bubble</span>
         </div>
         <p className="text-on-surface/80 text-sm leading-relaxed">
            {renderText(result?.sentiments?.summary) || "Analyzing customer feedback vectors across major review platforms..."}
         </p>
         <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
               {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-surface-variant"></div>)}
            </div>
            <span className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">+1.2k mentions</span>
         </div>
      </div>
    </div>
  );
};

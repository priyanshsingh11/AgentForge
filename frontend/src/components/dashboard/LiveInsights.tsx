import React from 'react';
import { AnalysisResult } from '../../types/business';
import { motion } from 'framer-motion';

interface LiveInsightsProps {
  result: AnalysisResult | null;
}

export const LiveInsights: React.FC<LiveInsightsProps> = ({ result }) => {
  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) return val.join(" ");
    return String(val);
  };

  if (!result) return null;

  return (
    <div className="flex flex-col gap-6 w-full pt-8 border-t border-outline-variant/30">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-sm animate-pulse">settings_input_component</span>
          <h3 className="text-[10px] font-black uppercase tracking-[.4em] text-on-surface-variant/60">Lower Deck: System Intelligence & Live Feed</h3>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest">Neural Link</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase">Stable</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-widest">Protocol</span>
              <span className="text-[10px] font-black text-primary uppercase">v2.0.4-Alpha</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Market Sentiment / Stream */}
        <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col gap-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Market Sentiment Stream</span>
              <span className="material-symbols-outlined text-xs text-primary/40">sensors</span>
           </div>
           <p className="text-xs font-medium text-on-surface/60 leading-relaxed italic">
              "{renderText(result?.strategies?.market_summary).slice(0, 120)}..."
           </p>
           <div className="flex items-end gap-1 h-3 mt-auto">
              {[20, 40, 30, 80, 50, 90, 70, 40].map((h, i) => (
                <div key={i} className={`flex-1 rounded-full ${i === 5 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
              ))}
           </div>
        </div>

        {/* Gap Analysis Summary */}
        <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col gap-4 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Strategic Gap Protocol</span>
              <span className="material-symbols-outlined text-xs text-primary/40">analytics</span>
           </div>
           <div className="space-y-4 flex-1">
              {result?.strategies?.gap_analysis?.slice(0, 2).map((gap: any, i: number) => (
                <div key={i} className="flex gap-3 items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1"></div>
                   <p className="text-[11px] font-medium text-on-surface-variant/80">
                     {typeof gap === 'string' ? gap : gap.title}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* Impact / Performance */}
        <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col gap-4 shadow-inner relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
              <span className="material-symbols-outlined text-[100px]">monitoring</span>
           </div>
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Impact Forecast</span>
              <span className="material-symbols-outlined text-xs text-primary/40">trending_up</span>
           </div>
           <div className="mt-2">
              <span className="text-4xl font-headline font-black text-on-surface uppercase tracking-tighter">
                {renderText(result?.strategies?.estimated_impact) || 'High'}
              </span>
              <div className="h-[2px] w-full bg-outline-variant/30 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-primary" 
                  initial={{ width: 0 }}
                  animate={{ width: '84%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-widest">Probability: 84%</span>
                <span className="text-[8px] font-black text-primary uppercase tracking-widest">Optimal Deployment</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

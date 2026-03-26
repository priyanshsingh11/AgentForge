import React from 'react';
import { AnalysisResult } from '../../types/business';

interface OutputSummaryProps {
  result: AnalysisResult | null;
}

export const OutputSummary: React.FC<OutputSummaryProps> = ({ result }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-2 px-4">Output Summary</h3>
      <div className="bg-surface-container-lowest border border-white/5 rounded-[2.5rem] p-8 flex-1 flex flex-col gap-8">
         <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[.4em] block mb-4">Strategic Advantage</span>
            <h4 className="text-3xl font-headline font-black text-on-surface leading-tight tracking-tight">
               {result?.strategies?.strategies?.[0]?.split('.')[0] || "Identifying first-mover market opportunities."}
            </h4>
         </div>

         <div className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                  <span>Data Accuracy</span>
                  <span>98.4%</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[98.4%]"></div>
               </div>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                  <span>Network Latency</span>
                  <span>14ms</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[20%]"></div>
               </div>
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

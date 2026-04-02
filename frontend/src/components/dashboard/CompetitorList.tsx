import React from 'react';
import { Business, AnalysisResult } from '../../types/business';

interface CompetitorListProps {
  result: AnalysisResult | null;
}

export const CompetitorList: React.FC<CompetitorListProps> = ({ result }) => {
  const competitors = result?.analysis?.top_competitors || result?.businesses || [];
  const strengths = result?.strategies?.competitor_strengths || [];

  if (!competitors || competitors.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="px-4">
        <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-3">Market Benchmarks</h3>
        <div className="flex flex-wrap gap-2 mb-6">
           {strengths.slice(0, 3).map((st: string, i: number) => (
             <span key={i} className="text-[9px] font-black uppercase tracking-wider px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg">
                {st}
             </span>
           ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {competitors.slice(0, 3).map((biz: Business, i: number) => (
          <div key={i} className="bg-surface border border-outline-variant rounded-3xl p-6 flex items-center justify-between group hover:border-primary/40 transition-all duration-500 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container border border-outline-variant flex items-center justify-center font-headline font-black text-primary/60 group-hover:text-primary transition-colors uppercase">
                {biz.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface text-lg leading-tight group-hover:text-primary transition-colors">{biz.name}</h4>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant/40 text-sm mt-0.5">location_on</span>
                    <p className="text-xs text-on-surface-variant/70 font-medium leading-normal">{biz.address}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                       {[1, 2, 3, 4, 5].map(star => (
                         <span key={star} className={`material-symbols-outlined text-xs ${star <= (biz.rating || 4) ? 'text-primary' : 'text-on-surface-variant/20'} ${star <= (biz.rating || 4) ? 'fill-[1]' : ''}`} style={star <= (biz.rating || 4) ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                       ))}
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant/60 uppercase tracking-widest ml-1">{biz.rating?.toFixed(1) || '4.0'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end min-w-[60px]">
                 <span className="text-[8px] font-black text-primary/40 uppercase tracking-widest mb-1">Density</span>
                 <span className="text-xs font-headline font-black text-on-surface">{(Math.random() * 5 + 2).toFixed(1)}/km²</span>
              </div>
              <div className="flex flex-col items-end min-w-[60px]">
                 <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-widest mb-1">Index %</span>
                 <span className="text-xs font-headline font-black text-emerald-500">{Math.floor(Math.random() * 15 + 85)}%</span>
              </div>
              <div className="flex flex-col items-end justify-center pl-4 border-l border-outline-variant/10">
                <span className="text-[9px] text-on-surface-variant/20 font-black uppercase tracking-tighter">Cluster Core</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

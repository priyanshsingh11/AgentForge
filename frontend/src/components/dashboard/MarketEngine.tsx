import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../../types/business';

interface MarketEngineProps {
  query: string;
  loading: boolean;
  result: AnalysisResult | null;
}

export const MarketEngine: React.FC<MarketEngineProps> = ({
  query,
  loading,
  result
}) => {
  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-8 flex flex-col h-full shadow-sm relative overflow-hidden group min-h-[500px]">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
        <span className="material-symbols-outlined text-[200px]">finance</span>
      </div>

      {!result && !loading ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-16 h-16 bg-surface-container border border-outline-variant rounded-[1.5rem] flex items-center justify-center mx-auto mb-4">
             <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
          </div>
          <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">System Ready</h3>
          <p className="text-on-surface-variant/60 text-xs leading-relaxed max-w-xs">
            Initialize Operation to synthesize regional data and manifest strategic insights.
          </p>
        </div>
      ) : loading ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col items-center gap-4">
             <div className="w-10 h-10 border-b-2 border-primary rounded-full animate-spin"></div>
             <span className="text-[9px] font-black uppercase tracking-[.4em] text-primary">Synthesizing Market Summary</span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
               <span className="material-symbols-outlined text-primary text-xl">analytics</span>
            </div>
            <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Market Summary</h3>
          </div>

          <div className="flex-1 flex flex-col">
            <p className="text-lg lg:text-2xl text-on-surface/90 leading-relaxed font-headline font-medium italic antialiased max-w-4xl">
              "{result?.strategies?.market_summary || 'Analysis sequence complete. Deploying strategic response.'}"
            </p>

            <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-10 pt-16">
              {[
                { label: 'Sector Sentiment', value: result?.strategies?.market_sentiment || 'Optimistic', color: 'bg-primary' },
                { label: 'Competitor Velocity', value: result?.strategies?.competitor_velocity || 'Accelerating', color: 'bg-emerald-500' },
                { label: 'M&A Activity', value: result?.strategies?.m_and_a_activity || 'Moderate', color: 'bg-indigo-400' }
              ].map((m, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">{m.label}</span>
                  <div className="h-[2px] bg-outline-variant/30 rounded-full w-full overflow-hidden">
                    <div className={`h-full ${m.color} w-3/4 opacity-80`}></div>
                  </div>
                  <span className="text-xs font-black text-on-surface tracking-tight">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

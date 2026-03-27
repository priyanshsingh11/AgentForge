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
    <div className="xl:col-span-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[.3em] uppercase mb-1 block">Operation: {query.toUpperCase().replace(' ', '_')}</span>
          <h2 className="text-4xl font-headline font-black text-on-surface tracking-tight leading-none">
            Intelligence Command Center
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-high/50 p-2 pl-4 rounded-full border border-white/5">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{loading ? 'Intelligence Stream: Active' : 'Strategy Manifest: 100%'}</span>
          <button className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-sm">more_vert</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest/80 border border-outline-variant/10 rounded-[2.5rem] p-8 flex-1 min-h-[400px] lg:min-h-[500px] flex flex-col justify-center items-center">
        {!result && !loading ? (
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">Ready for Deployment</h3>
            <p className="text-on-surface-variant/60 text-sm leading-relaxed">
              Define your objective to initialize the neural market engine. AgentForge will synthesize regional data into a strategic manifest.
            </p>
          </div>
        ) : loading ? (
          <div className="w-full space-y-8 animate-in fade-in duration-700">
             <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="text-xs font-black uppercase tracking-[.3em] text-primary">Analyzing Market Vectors</span>
             </div>
             
             <div className="space-y-4 max-w-lg mx-auto w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 bg-surface-variant/20 rounded-full w-full overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-primary/10"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-primary/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Opportunity Score</span>
                <div className="text-4xl font-headline font-black text-on-surface">A+ Cluster</div>
              </div>
              <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-secondary/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block">Market Saturation</span>
                <div className="text-4xl font-headline font-black text-on-surface">Low Density</div>
              </div>
            </div>
            
            <div className="p-8 bg-surface-variant/10 rounded-[2rem] border border-outline-variant/10 flex-1">
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant/40 mb-6">Executive Summary</h4>
              <p className="text-lg text-on-surface leading-relaxed font-medium italic">
                "{result?.strategies?.market_summary || 'Strategic analysis complete. Ready for implementation.'}"
              </p>
            </div>
          </div>
        )}

        <div className="bg-background/50 border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary animate-spin">sync</span>
              <span className="text-xs font-bold uppercase tracking-widest">Searching competitors</span>
            </div>
            <span className="text-xs font-bold text-primary">{loading ? '74% COMPLETE' : '100% COMPLETE'}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full intelligence-gradient"
              initial={{ width: 0 }}
              animate={{ width: loading ? '74%' : '100%' }}
            />
          </div>
          <p className="mt-4 text-[10px] text-on-surface-variant/40 leading-relaxed">
            Scanning: Google Maps, Tavily Index, HuggingFace Sentiment Clusters...<br />
            Entities identified: {result?.businesses?.length || 'Scanning'} relevant targets in area.
          </p>
        </div>
      </div>
    </div>
  );
};

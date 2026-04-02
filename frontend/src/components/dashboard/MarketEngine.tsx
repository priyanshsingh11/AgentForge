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
      <div className="flex items-center justify-between px-2">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[.3em] uppercase mb-1 block">Operation: {query.toUpperCase().replace(' ', '_')}</span>
          <h2 className="text-4xl font-headline font-black text-on-surface tracking-tighter leading-none">
            Intelligence Command <span className="text-primary italic">Center</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-surface-container/50 px-4 py-2 rounded-full border border-outline-variant">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`}></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80">{loading ? 'Intelligence Stream: Active' : 'Strategy Manifest: 100%'}</span>
        </div>
      </div>

      <div className="bg-surface border border-outline-variant rounded-[3rem] p-10 flex-1 min-h-[400px] lg:min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden shadow-sm">
        {!result && !loading ? (
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-20 h-20 bg-surface-container border border-outline-variant rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
              <span className="material-symbols-outlined text-on-surface text-3xl">terminal_analytics</span>
            </div>
            <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Ready for Deployment</h3>
            <p className="text-on-surface-variant/60 text-sm leading-relaxed px-4">
              Define your objective to initialize the neural market engine. AgentForge will synthesize regional data into a strategic manifest.
            </p>
          </div>
        ) : loading ? (
          <div className="w-full space-y-10 animate-in fade-in duration-1000 max-w-xl">
             <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-b-2 border-primary rounded-full animate-spin"></div>
                <span className="text-[10px] font-black uppercase tracking-[.4em] text-primary">Analyzing Market Vectors</span>
             </div>
             
             <div className="space-y-6 w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[2px] bg-outline-variant rounded-full w-full overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    />
                  </div>
                ))}
             </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-700">
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="bg-surface-container border border-outline-variant p-8 rounded-[2rem] shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 block">Opportunity Score</span>
                <div className="text-5xl font-headline font-black text-on-surface tracking-tighter">A+ Cluster</div>
              </div>
              <div className="bg-surface-container border border-outline-variant p-8 rounded-[2rem] shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 mb-3 block">Market Saturation</span>
                <div className="text-5xl font-headline font-black text-on-surface tracking-tighter">Low Density</div>
              </div>
            </div>
            
            <div className="p-10 border border-outline-variant rounded-[2.5rem] flex-1 flex flex-col justify-center bg-surface-container/30">
              <h4 className="text-[10px] font-black uppercase tracking-[.2em] text-primary/40 mb-8 px-2">Primary Strategic Insight</h4>
              <p className="text-2xl text-on-surface leading-relaxed font-medium italic px-2">
                "{result?.strategies?.market_summary || 'Strategic analysis complete. Ready for implementation.'}"
              </p>
            </div>
          </div>
        )}

        <div className="w-full mt-10 pt-10 border-t border-outline-variant">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`material-symbols-outlined text-primary text-lg ${loading ? 'animate-spin' : ''}`}>sync</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Neural Indexing Pipeline</span>
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[.2em]">{loading ? '74.2% Processing' : '100% Manifested'}</span>
          </div>
          <div className="h-[2px] bg-outline-variant rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: loading ? '74%' : '100%' }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="mt-4 text-[9px] text-on-surface-variant/40 leading-relaxed uppercase tracking-wider">
            Scanning: Google Maps, Tavily Index, HuggingFace Sentiment Clusters... 
            <span className="ml-2 text-primary">Entities identified: {result?.businesses?.length || 'Scanning'}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

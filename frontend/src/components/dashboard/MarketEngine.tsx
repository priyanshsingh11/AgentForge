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
    <div className="xl:col-span-12 flex flex-col gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-4 mb-1">
            <span className="h-[1px] w-6 bg-primary/30"></span>
            <span className="text-primary/70 text-[9px] uppercase tracking-[0.4em] font-black">
              Operation: {query.toUpperCase().replace(' ', '_')}
            </span>
            <span className="h-[1px] w-6 bg-primary/30"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black text-on-surface tracking-tighter leading-[0.95] max-w-4xl">
            Intelligence Command <br />
            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent italic">
              Center
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-surface-container/50 px-4 py-2 rounded-full border border-outline-variant self-start mt-4">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]'}`}></span>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/80">{loading ? 'Intelligence Stream: Active' : 'Strategy Manifest: 100%'}</span>
        </div>
      </div>

      <div className="bg-surface border border-outline-variant rounded-3xl p-6 flex-1 flex flex-col items-center relative shadow-sm min-h-[400px] overflow-visible">
        {!result && !loading ? (
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-16 h-16 bg-surface-container border border-outline-variant rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-sm">
              <span className="material-symbols-outlined text-on-surface text-2xl">terminal_analytics</span>
            </div>
            <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Ready for Deployment</h3>
            <p className="text-on-surface-variant/60 text-xs leading-relaxed px-4">
              Define your objective to initialize the neural market engine. AgentForge will synthesize regional data into a strategic manifest.
            </p>
          </div>
        ) : loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full space-y-8 animate-in fade-in duration-1000 max-w-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-b-2 border-primary rounded-full animate-spin"></div>
                <span className="text-[9px] font-black uppercase tracking-[.4em] text-primary">Analyzing Market Vectors</span>
              </div>

              <div className="space-y-4 w-full">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[1.5px] bg-outline-variant rounded-full w-full overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0 bg-primary"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-700">

            {/* Primary Strategic Insight (Full Width) */}
            <div className="flex-1 flex flex-col justify-start p-8 bg-surface-container/20 rounded-3xl border border-outline-variant shadow-[inset_0_2px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none transform translate-x-1/4 translate-y-[-1/4]">
                <span className="material-symbols-outlined text-[300px]">monitoring</span>
              </div>

              <div className="flex items-center gap-3 mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-primary px-2 leading-none">Primary Strategic Manifest</h4>
                <span className="h-[1px] flex-1 bg-outline-variant/30"></span>
              </div>

              <p className="text-2xl sm:text-3xl lg:text-5xl text-on-surface leading-[1.1] font-headline font-medium italic relative z-10 antialiased max-w-4xl">
                "{result?.strategies?.market_summary || 'Analysis sequence complete. Deploying strategic response.'}"
              </p>

              <div className="mt-auto pt-10 flex items-center gap-8 text-[10px] uppercase font-black tracking-widest text-on-surface-variant/20 italic">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">verified</span> Data Validated</span>
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">precision_manufacturing</span> Neural Synthesis</span>
                <span className="flex items-center gap-2 px-3 py-1 border border-outline-variant/10 rounded-full animate-pulse"><span className="material-symbols-outlined text-xs">radar</span> Live Stream Active</span>
              </div>
            </div>

            {/* Neural Indexing Pipeline (Footer) */}
            <div className="w-full mt-10 p-8 bg-surface-container-low rounded-3xl border border-outline-variant/50 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-primary text-xl ${loading ? 'animate-spin' : ''}`}>sync</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Neural Indexing Pipeline</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-black font-headline tracking-tighter">{loading ? '74.2%' : '100%'}</span>
                  <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-[.2em]">{loading ? 'Processing' : 'Manifested'}</span>
                </div>
              </div>
              <div className="h-[3px] bg-outline-variant/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full intelligence-gradient shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: loading ? '74.2%' : '100%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <p className="mt-4 text-[9px] text-on-surface-variant/40 leading-relaxed uppercase tracking-wider flex items-center justify-between">
                <span>Scanning: Google Maps, Tavily Index, HuggingFace Sentiment Clusters...</span>
                <span className="text-primary font-bold">Cloud Cluster: Alpha_9 // Entities: {result?.businesses?.length || 'Scanning'}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../../types/business';

interface MarketEngineProps {
  query: string;
  loading: boolean;
  logs: string[];
  result: AnalysisResult | null;
}

export const MarketEngine: React.FC<MarketEngineProps> = ({ 
  query, 
  loading, 
  logs, 
  result 
}) => {
  return (
    <div className="xl:col-span-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[.3em] uppercase mb-1 block">Operation: {query.toUpperCase().replace(' ', '_')}</span>
          <h2 className="text-4xl font-headline font-black text-on-surface tracking-tight leading-none">
            Market Analysis Engine
          </h2>
        </div>
        <div className="flex items-center gap-3 bg-surface-container-high/50 p-2 pl-4 rounded-full border border-white/5">
          <span className={`w-2 h-2 rounded-full ${loading ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">{loading ? 'Live Execution' : 'Deployment Complete'}</span>
          <button className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-sm">more_vert</span>
          </button>
        </div>
      </div>

      <div className="bg-surface-container-lowest/80 border border-outline-variant/10 rounded-[2.5rem] p-8 flex-1 min-h-[500px] font-mono flex flex-col">
        <div className="flex-1 space-y-4 mb-8">
           {logs.map((log, i) => (
             <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-500">
               <span className="text-on-surface-variant/30 select-none">{log.split(' ')[0]}</span>
               <span className={log.includes('Success') || log.includes('identified') ? 'text-primary' : log.includes('ERROR') ? 'text-error' : 'text-on-surface/70'}>
                 {log.split(' ').slice(1).join(' ')}
               </span>
             </div>
           ))}
           {loading && (
             <div className="flex gap-4 animate-pulse">
               <span className="text-on-surface-variant/30 select-none">[{new Date().toLocaleTimeString()}]</span>
               <span className="text-primary italic">Processing recursive market signals...</span>
             </div>
           )}
        </div>

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
            Scanning: Google Maps, Tavily Index, HuggingFace Sentiment Clusters...<br/>
            Entities identified: {result?.businesses?.length || 'Scanning'} relevant targets in area.
          </p>
        </div>
      </div>
    </div>
  );
};

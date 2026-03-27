import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../../types/business';

interface ManifestProps {
   result: AnalysisResult;
}

export const StrategicManifest: React.FC<ManifestProps> = ({ result }) => {
   const { strategies, analysis, sentiments } = result;

   return (
      <div className="flex flex-col gap-10 pb-20 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000">
         {/* Header Section */}
         <div className="flex justify-between items-end border-b border-white/5 pb-8">
            <div>
               <span className="text-xs font-black uppercase tracking-[.4em] text-primary mb-3 block">Quarterly Strategic Review</span>
               <h1 className="text-6xl font-headline font-black text-on-surface tracking-tighter">
                  Strategic <span className="text-primary italic">Insights</span>
               </h1>
            </div>
            <div className="flex items-center gap-12">
               <div className="text-right">
                  <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest block mb-1">Estimated Impact</span>
                  <div className="flex items-center gap-2">
                     <span className="text-2xl font-headline font-black text-primary uppercase">{strategies.estimated_impact || 'Optimal'}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Top Row: Market Summary & Priorities */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-8 glass-panel border border-white/5 rounded-[3rem] p-10 flex flex-col gap-10">
               <div>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl">equalizer</span>
                     <h3 className="text-xl font-headline font-bold text-on-surface">Market Summary</h3>
                  </div>
                  <p className="text-2xl font-medium text-on-surface/80 leading-[1.6] max-w-3xl">
                     {strategies.market_summary}
                  </p>
               </div>

               <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3 block">Sector Sentiment</span>
                     <div className="h-1 w-full bg-white/5 rounded-full mb-3">
                        <div className="h-full bg-primary rounded-full w-[85%]"></div>
                     </div>
                     <span className="text-lg font-black text-on-surface">85% Optimistic</span>
                  </div>
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3 block">Competitor Velocity</span>
                     <div className="h-1 w-full bg-white/5 rounded-full mb-3">
                        <div className="h-full bg-secondary rounded-full w-[60%]"></div>
                     </div>
                     <span className="text-lg font-black text-on-surface">Accelerating</span>
                  </div>
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-3 block">Market Intensity</span>
                     <div className="h-1 w-full bg-white/5 rounded-full mb-3">
                        <div className="h-full bg-emerald-500 rounded-full w-[45%]"></div>
                     </div>
                     <span className="text-lg font-black text-on-surface">Moderate</span>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 glass-panel border border-white/5 bg-primary/5 rounded-[3rem] p-10 relative overflow-hidden">
               <span className="material-symbols-outlined absolute -top-4 -right-4 text-primary/5 text-[10rem] rotate-12 select-none">priority_high</span>
               <h3 className="text-3xl font-headline font-black text-on-surface mb-10 flex items-center justify-between">
                  Top 4 Priorities
                  <span className="material-symbols-outlined text-primary">warning</span>
               </h3>
               <div className="space-y-10">
                  {strategies.priority_actions.slice(0, 4).map((item, i) => (
                     <div key={i} className="flex gap-6 items-start group">
                        <span className="text-4xl font-headline font-black text-primary/20 group-hover:text-primary transition-colors">0{i + 1}</span>
                        <p className="text-sm font-bold text-on-surface/70 leading-relaxed group-hover:text-on-surface transition-colors">
                           {item}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Middle Row: Competitors & Gaps */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 flex flex-col gap-6">
               <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-on-surface-variant/30 mb-2 px-10">Top Competitors</h4>
               <div className="space-y-4">
                  {analysis.top_competitors.slice(0, 5).map((biz, i) => (
                     <div key={i} className="glass-panel border border-white/5 bg-surface-container-low/30 rounded-[2rem] p-6 flex items-center justify-between group hover:bg-white/5 transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-primary group-hover:scale-110 transition-transform">
                              {biz.name.charAt(0)}
                           </div>
                           <div>
                              <h5 className="font-bold text-on-surface">{biz.name}</h5>
                              <div className="flex items-center gap-2 mt-1">
                                 <span className="material-symbols-outlined text-[12px] text-primary">star</span>
                                 <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-black">Rating: {biz.rating || '4.0'}</p>
                              </div>
                           </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${i === 0 ? 'bg-emerald-500/10 text-emerald-500' : i === 1 ? 'bg-blue-500/10 text-blue-500' : i === 2 ? 'bg-purple-500/10 text-purple-500' : i === 3 ? 'bg-orange-500/10 text-orange-500' : 'bg-pink-500/10 text-pink-500'}`}>
                           {i === 0 ? 'Stable' : i === 1 ? 'Rising' : i === 2 ? 'Disruptive' : i === 3 ? 'Challenger' : 'Niche'}
                        </span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-4 glass-panel border border-white/5 rounded-[3rem] p-10">
               <div className="space-y-12">
                  <div>
                     <h4 className="text-[10px] font-black uppercase tracking-[.3em] text-primary mb-6">Competitor Strengths</h4>
                     <div className="space-y-5">
                        {strategies.competitor_strengths.slice(0, 3).map((s, i) => (
                           <div key={i} className="flex items-center gap-4 text-sm font-medium text-on-surface/70">
                              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                              {s}
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="border-t border-white/5 pt-10">
                     <h4 className="text-[10px] font-black uppercase tracking-[.3em] text-secondary mb-6">Competitor Weaknesses</h4>
                     <div className="space-y-5">
                        {strategies.competitor_weaknesses.slice(0, 3).map((w, i) => (
                           <div key={i} className="flex items-center gap-4 text-sm font-medium text-on-surface/70">
                              <span className="material-symbols-outlined text-secondary text-lg">cancel</span>
                              {w}
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 glass-panel border border-white/5 rounded-[3rem] p-10 flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-headline font-bold text-on-surface underline decoration-primary decoration-4 underline-offset-8">Gap Analysis</h3>
                  <span className="material-symbols-outlined text-primary">location_on</span>
               </div>
               <div className="space-y-4 mb-10 flex-1">
                  {strategies.gap_analysis.slice(0, 3).map((gap, i) => (
                     <p key={i} className="text-sm text-on-surface/60 leading-relaxed italic border-l-2 border-primary/20 pl-4">
                        {gap}
                     </p>
                  ))}
               </div>
               <div className="bg-surface-container-high/40 p-5 rounded-2xl border border-white/5 mb-4">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Search Engine Precision</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-secondary">Critical Gap</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-secondary w-[90%]"></div>
                  </div>
               </div>
               <div className="flex items-center justify-center gap-3 py-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-black uppercase tracking-[.3em] text-emerald-500">AI Strategy Core: Online</span>
               </div>
            </div>
         </div>

         {/* Bottom Row: Opportunities & Roadmap */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-4 flex flex-col gap-6">
               <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-primary px-10">Opportunities</h4>
               <div className="flex-1 flex flex-col gap-4">
                  {strategies.opportunities.slice(0, 4).map((opp, i) => (
                     <div key={i} className="glass-panel border border-white/5 bg-white/[0.02] rounded-[2rem] p-8 flex flex-col gap-4 border-l-primary border-l-4">
                        <h5 className="font-headline font-black text-on-surface text-lg">{opp.split(':').length > 1 ? opp.split(':')[0] : 'Strategic Hub'}</h5>
                        <p className="text-xs text-on-surface-variant/60 leading-relaxed italic">
                           {opp.split(':').length > 1 ? opp.split(':').slice(1).join(':') : opp}
                        </p>
                     </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-8 glass-panel border border-white/5 rounded-[3rem] p-10 flex flex-col min-h-[500px]">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="text-3xl font-headline font-black text-on-surface">Actionable Roadmap</h3>
                  <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest">High Impact</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest">Medium Impact</span>
                     </div>
                  </div>
               </div>

               <div className="flex-1">
                  <table className="w-full">
                     <thead>
                        <tr className="border-b border-white/5 text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40">
                           <th className="text-left pb-6">Step</th>
                           <th className="text-left pb-6">Action Required</th>
                           <th className="text-left pb-6">Timeline</th>
                           <th className="text-right pb-6">Impact</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {strategies.actionable_steps.slice(0, 4).map((step, i) => (
                           <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                              <td className="py-8 text-lg font-headline font-black text-primary/30 group-hover:text-primary transition-colors">0{i + 1}</td>
                              <td className="py-8 font-bold text-on-surface/80 group-hover:text-on-surface transition-colors">{step}</td>
                              <td className="py-8 text-xs font-bold text-on-surface-variant/40 uppercase tracking-widest">{i * 2 + 2}-{i * 2 + 4} Weeks</td>
                              <td className="py-8 text-right">
                                 <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${i < 2 ? 'bg-primary/10 text-primary border-primary/20' : i === 2 ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-surface-variant text-on-surface-variant border-white/5'}`}>
                                    {i < 2 ? 'High' : i === 2 ? 'Medium' : 'Low'}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Footer Branding */}
         <div className="flex justify-between items-center border-t border-white/5 pt-10 text-[9px] font-black uppercase tracking-[.4em] text-on-surface-variant/20">
            <span>Generated by AgentForge Intelligence Engine © 2026</span>
            <div className="flex gap-10">
               <span>System Health: Optimal</span>
               <span>Data Privacy: Enterprise Grade</span>
            </div>
         </div>
      </div>
   );
};

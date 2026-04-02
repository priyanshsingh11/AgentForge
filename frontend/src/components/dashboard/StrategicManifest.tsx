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
         <div className="flex flex-col gap-2 border-b border-outline-variant pb-10">
            <div className="flex items-center gap-3">
               <span className="h-[1px] w-6 bg-primary/30"></span>
               <span className="text-[10px] font-black uppercase tracking-[.4em] text-primary/60">Intelligence Report</span>
            </div>
            <div className="flex justify-between items-end">
               <h1 className="text-6xl font-headline font-black text-on-surface tracking-tighter leading-tight">
                  Growth Catalyst <span className="text-primary italic">Dashboard</span>
               </h1>
               <div className="text-right hidden sm:block">
                  <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-[.2em] block mb-1">Impact Analysis</span>
                  <div className="flex items-center gap-2">
                     <span className="text-2xl font-headline font-black text-on-surface uppercase">{strategies.estimated_impact || 'Optimal'}</span>
                     <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)] animate-pulse"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-8 glass-panel rounded-[2.5rem] p-12 flex flex-col gap-12">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Market Summary</h3>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[.2em] px-3 py-1 bg-primary/10 text-primary rounded-full">Live Feed</span>
               </div>
               
               <p className="text-xl font-medium text-on-surface-variant leading-relaxed max-w-3xl">
                  {strategies.market_summary}
               </p>

               <div className="grid grid-cols-3 gap-12 pt-10 border-t border-outline-variant">
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[.15em] mb-4 block">Adoption</span>
                     <div className="h-0.5 w-full bg-outline-variant rounded-full mb-4">
                        <div className="h-full bg-on-surface rounded-full w-[82.4%]"></div>
                     </div>
                     <span className="text-3xl font-headline font-black text-on-surface">82.4%</span>
                  </div>
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[.15em] mb-4 block">Velocity</span>
                     <div className="h-0.5 w-full bg-outline-variant rounded-full mb-4">
                        <div className="h-full bg-primary rounded-full w-[60%]"></div>
                     </div>
                     <span className="text-3xl font-headline font-black text-on-surface">1.2<span className="text-sm font-normal text-on-surface-variant ml-1">x</span></span>
                  </div>
                  <div>
                     <span className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-[.15em] mb-4 block">Sentiment</span>
                     <div className="h-0.5 w-full bg-outline-variant rounded-full mb-4">
                        <div className="h-full bg-on-surface rounded-full w-[95%]"></div>
                     </div>
                     <span className="text-3xl font-headline font-black text-on-surface">Pos<span className="text-sm font-normal text-on-surface-variant ml-1">++</span></span>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 bg-[#0F172A] text-white rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col">
               <h3 className="text-2xl font-headline font-black text-white mb-10">Priority Actions</h3>
               <div className="space-y-8 flex-1">
                  {strategies.priority_actions.slice(0, 3).map((item, i) => (
                     <div key={i} className="flex gap-5 items-start group">
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-primary group-hover:bg-primary group-hover:text-white transition-all">
                           0{i + 1}
                        </div>
                        <p className="text-[13px] font-medium text-white/70 leading-relaxed group-hover:text-white transition-colors">
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
               <h4 className="text-[10px] font-black uppercase tracking-[.4em] text-on-surface-variant/50 mb-2 px-4">Top Competitors</h4>
               <div className="space-y-4">
                  {analysis.top_competitors.slice(0, 2).map((biz, i) => (
                     <div key={i} className="glass-panel border border-outline-variant bg-surface rounded-3xl p-6 flex items-center justify-between group hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center font-black text-primary text-sm">
                              {biz.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                           </div>
                           <div>
                              <h5 className="font-bold text-on-surface text-sm">{biz.name}</h5>
                              <p className="text-[9px] text-on-surface-variant uppercase tracking-widest mt-1">Market Leader: Series B</p>
                           </div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant/40 text-sm">trending_up</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="lg:col-span-8 glass-panel border border-outline-variant rounded-[2.5rem] p-12">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Gap Analysis</h3>
               </div>
               <div className="space-y-10">
                  {[
                     { label: 'Processing Latency', val: '95%', status: 'CRITICAL', color: 'bg-on-surface' },
                     { label: 'Model Precision', val: '100%', status: 'OPTIMAL', color: 'bg-on-surface' },
                     { label: 'Cost Efficiency', val: '45%', status: 'AT RISK', color: 'bg-[#B48B40]' },
                  ].map((gap, i) => (
                     <div key={i}>
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{gap.label}</span>
                           <span className={`text-[9px] font-black uppercase tracking-widest ${gap.status === 'CRITICAL' ? 'text-on-surface' : gap.status === 'AT RISK' ? 'text-[#B48B40]' : 'text-on-surface-variant'}`}>{gap.status}</span>
                        </div>
                        <div className="h-1 bg-outline-variant rounded-full overflow-hidden">
                           <div className={`h-full ${gap.color} transition-all duration-1000`} style={{ width: gap.val }}></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Bottom Row: Insights & Road Map Overview */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-panel border-l-4 border-l-[#B48B40] rounded-[2rem] p-10 flex flex-col gap-6">
                  <span className="text-[10px] font-black uppercase tracking-[.3em] text-[#B48B40]">AI Suggestion</span>
                  <h4 className="text-2xl font-headline font-black text-on-surface leading-tight">Vertical Integration in MedTech</h4>
                  <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                     Current analysis shows zero AI agent penetration in private surgical clinics for scheduling compliance workflows.
                  </p>
                  <button className="flex items-center gap-2 group self-start">
                     <span className="text-[10px] font-black uppercase tracking-widest text-on-surface border-b border-on-surface pb-1">View Opportunity Mapping</span>
                     <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
               </div>

               <div className="glass-panel rounded-[2rem] p-10 flex flex-col gap-8">
                  <span className="text-[10px] font-black uppercase tracking-[.3em] text-on-surface-variant/40">Estimated Impact</span>
                  <div className="space-y-6">
                     {[
                        { label: 'Revenue Growth', val: 'HIGH', color: 'bg-on-surface' },
                        { label: 'Churn Reduction', val: 'MEDIUM', color: 'bg-outline-variant' },
                        { label: 'Operating Cost', val: 'LOW', color: 'bg-[#B48B40]' },
                     ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-between">
                           <span className="text-[13px] font-bold text-on-surface/80">{stat.label}</span>
                           <span className={`text-[8px] font-black tracking-widest px-4 py-1.5 rounded-lg text-white ${stat.color} dark:text-background`}>{stat.val}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="lg:col-span-4 rounded-[2.5rem] overflow-hidden relative group">
               <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop" 
                  alt="Quarterly Forecast" 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-12 text-center">
                  <h4 className="text-3xl font-headline font-black text-white leading-tight">
                     Quarterly Forecast: <br/> 
                     <span className="text-primary">+24.2% Growth Anticipated</span>
                  </h4>
               </div>
            </div>
         </div>

         {/* Final Section: Timeline Roadmap */}
         <div className="glass-panel border border-outline-variant rounded-[3rem] p-16 flex flex-col items-center text-center">
            <h3 className="text-4xl font-headline font-black text-on-surface mb-16">Actionable Roadmap: Phase I Deployment</h3>
            
            <div className="relative w-full max-w-4xl space-y-24 before:absolute before:left-1/2 before:top-4 before:bottom-4 before:w-[1px] before:bg-outline-variant">
               {[
                  { title: 'Infrastructure Audit', time: 'WEEK 01-02', desc: 'Identify compute bottlenecks and optimize token cache parameters for agent fleet.', align: 'left' },
                  { title: 'Integration Phase', time: 'WEEK 03-05', desc: 'Bridging the Gap Analysis findings by integrating top-tier CRM and ERP webhooks.', align: 'right' },
                  { title: 'Full Deployment', time: 'WEEK 06+', desc: 'Launching autonomous agents into high-value customer success pathways.', align: 'left' },
               ].map((step, i) => (
                  <div key={i} className={`flex items-center gap-12 ${step.align === 'right' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                     <div className="flex-1 space-y-2">
                        <h5 className="text-2xl font-headline font-black text-on-surface">{step.title}</h5>
                        <p className="text-xs font-medium text-on-surface-variant leading-relaxed max-w-sm ml-auto mr-auto lg:mx-0">
                           {step.desc}
                        </p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-surface border-4 border-outline-variant flex items-center justify-center z-10">
                        <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-[#B48B40]' : 'bg-on-surface'}`}></div>
                     </div>
                     <div className="flex-1">
                         <span className={`text-[10px] font-black uppercase tracking-[.3em] ${i === 1 ? 'text-[#B48B40]' : 'text-on-surface-variant'}`}>{step.time}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Footer Branding */}
         <div className="flex justify-between items-center border-t border-outline-variant pt-10 text-[9px] font-black uppercase tracking-[.4em] text-on-surface-variant/20">
            <span>Generated by AgentForge Intelligence Engine © 2026</span>
            <div className="flex gap-10">
               <span>System Health: Optimal</span>
               <span>Data Privacy: Enterprise Grade</span>
            </div>
         </div>
      </div>
   );
};

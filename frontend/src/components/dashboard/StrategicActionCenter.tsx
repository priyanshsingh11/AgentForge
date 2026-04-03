import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../../types/business';

interface StrategicActionCenterProps {
  result: AnalysisResult | null;
}

export const StrategicActionCenter: React.FC<StrategicActionCenterProps> = ({ result }) => {
  const actionableSteps = result?.strategies?.actionable_steps || [];
  const opportunities = result?.strategies?.opportunities || [];
  const priorityActions = result?.strategies?.priority_actions || [];

  if (!result) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-6 h-full font-body antialiased"
    >
      <div className="flex items-center gap-3 px-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span>
        <h3 className="text-[10px] font-black uppercase tracking-[.4em] text-on-surface-variant/40">Section 03: Strategic Command</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Priority Roadmap */}
        <motion.div 
          variants={itemVariants}
          className="bg-surface-container/20 border-l-4 border-l-primary/60 border border-outline-variant rounded-[2rem] p-8 shadow-sm flex flex-col h-full group hover:border-primary/40 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">rocket_launch</span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-[.2em] text-primary">Priority Roadmap</span>
          </div>

          <div className="space-y-8 flex-1">
            {priorityActions.length > 0 ? priorityActions.slice(0, 3).map((action, i) => (
              <div key={i} className="flex gap-5 items-start group/item">
                <div className="w-10 h-10 rounded-2xl bg-surface-container-high/40 border border-outline-variant flex items-center justify-center flex-shrink-0 text-[11px] font-black text-on-surface/40 group-hover/item:text-primary group-hover/item:border-primary/30 transition-all">
                  0{i + 1}
                </div>
                <p className="text-[14px] font-bold text-on-surface/70 leading-relaxed group-hover/item:text-on-surface transition-colors pt-1">
                  {action}
                </p>
              </div>
            )) : (
              <p className="text-xs text-on-surface-variant/40 italic">Synthesizing primary execution vectors...</p>
            )}
          </div>
        </motion.div>

        {/* Operational Steps & Growth Anomalies */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div 
            variants={itemVariants}
            className="bg-surface-container/20 border border-outline-variant rounded-[2rem] p-8 shadow-sm group hover:border-on-surface-variant/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6 text-on-surface-variant">
              <div className="w-8 h-8 rounded-xl bg-on-surface-variant/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[.2em]">Operational Steps</span>
            </div>
            <ul className="space-y-5">
              {actionableSteps.length > 0 ? actionableSteps.slice(0, 3).map((step, i) => (
                <li key={i} className="text-[12px] font-bold text-on-surface/50 flex items-start gap-4 leading-relaxed group/li hover:text-on-surface/80 transition-colors">
                  <span className="text-primary/40 group-hover/li:text-primary text-lg leading-none pt-0.5">›</span> 
                  {step}
                </li>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Mapping tactical response clusters...</p>
              )}
            </ul>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-surface-container/20 border border-outline-variant rounded-[2rem] p-8 shadow-sm group hover:border-indigo-400/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6 text-indigo-400">
              <div className="w-8 h-8 rounded-xl bg-indigo-400/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">diamond</span>
              </div>
              <span className="text-[11px] font-black uppercase tracking-[.2em]">Growth Anomalies</span>
            </div>
            <div className="space-y-6">
              {opportunities.length > 0 ? opportunities.slice(0, 3).map((opp, i) => (
                <div key={i} className="flex flex-col gap-1.5 group/opp">
                  <h4 className="text-[13px] font-black text-on-surface/80 group-hover/opp:text-indigo-400 transition-colors">
                    {typeof opp === 'string' ? opp : opp.title}
                  </h4>
                  {typeof opp === 'object' && opp.description && (
                    <p className="text-[11px] font-medium text-on-surface-variant/50 leading-relaxed">
                      {opp.description}
                    </p>
                  )}
                </div>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Scanning market anomalies for strategic upside...</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

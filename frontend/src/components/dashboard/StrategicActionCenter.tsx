import React from 'react';
import { AnalysisResult } from '../../types/business';

interface StrategicActionCenterProps {
  result: AnalysisResult | null;
}

export const StrategicActionCenter: React.FC<StrategicActionCenterProps> = ({ result }) => {
  const actionableSteps = result?.strategies?.actionable_steps || [];
  const opportunities = result?.strategies?.opportunities || [];
  const priorityActions = result?.strategies?.priority_actions || [];

  if (!result) return null;

  return (
    <div className="flex flex-col gap-6 h-full font-body antialiased">
      <div className="flex items-center gap-3 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/60">Section 03: Strategic Command</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Priority Actions */}
        <div className="bg-surface border-l-4 border-l-primary/60 border-outline-variant bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Priority Roadmap</span>
          </div>

          <div className="space-y-6 flex-1">
            {priorityActions.length > 0 ? priorityActions.slice(0, 3).map((action, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-[10px] font-black text-primary transition-all">
                  0{i + 1}
                </div>
                <p className="text-[13px] font-medium text-on-surface/80 leading-relaxed group-hover:text-primary transition-colors">
                  {action}
                </p>
              </div>
            )) : (
              <p className="text-xs text-on-surface-variant/40 italic">Synthesizing primary execution vectors...</p>
            )}
          </div>
        </div>

        {/* Actionable Steps & Opportunities */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-surface border border-outline-variant rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Operational Steps</span>
            </div>
            <ul className="space-y-4">
              {actionableSteps.length > 0 ? actionableSteps.slice(0, 3).map((step, i) => (
                <li key={i} className="text-[11px] font-medium text-on-surface/60 flex items-start gap-3 leading-relaxed group">
                  <span className="text-primary/40 group-hover:text-primary transition-colors select-none">›</span> {step}
                </li>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Mapping tactical response clusters...</p>
              )}
            </ul>
          </div>

          <div className="bg-surface border border-outline-variant rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-indigo-400">
              <span className="material-symbols-outlined text-sm">diamond</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Growth Anomalies</span>
            </div>
            <ul className="space-y-4">
              {opportunities.length > 0 ? opportunities.slice(0, 3).map((opp, i) => (
                <li key={i} className="text-[11px] font-medium text-on-surface/60 flex items-start gap-3 leading-relaxed group">
                  <span className="text-indigo-400/40 group-hover:text-indigo-400 transition-colors select-none">•</span> {opp}
                </li>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Scanning market anomalies for strategic upside...</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

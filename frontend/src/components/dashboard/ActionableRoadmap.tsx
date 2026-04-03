import React from 'react';
import { AnalysisResult } from '../../types/business';

interface ActionableRoadmapProps {
  result: AnalysisResult | null;
}

export const ActionableRoadmap: React.FC<ActionableRoadmapProps> = ({ result }) => {
  const steps = result?.strategies?.actionable_steps?.slice(0, 4) || [
    { step: "Integrate Vector Memory Modules", timeline: "2-3 Weeks", impact: "HIGH" },
    { step: "Beta Launch: Industry Connector SDK", timeline: "4-6 Weeks", impact: "MEDIUM" },
    { step: "Scalable API Rate Limit Refactor", timeline: "1 Week", impact: "HIGH" },
    { step: "Automated Compliance Auditor Agent", timeline: "8 Weeks", impact: "LOW" }
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-8 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Actionable Roadmap</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary/40"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">High Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400/40"></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Med Impact</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-visible relative">
        <table className="w-full text-left border-separate border-spacing-y-6">
          <thead>
            <tr className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40 border-b border-outline-variant/10">
              <th className="pb-4 pt-0">Step</th>
              <th className="pb-4 pt-0">Action Required</th>
              <th className="pb-4 pt-0">Timeline</th>
              <th className="pb-4 pt-0 text-center">Impact</th>
            </tr>
          </thead>
          <tbody className="mt-4">
            {steps.map((s: any, i: number) => (
              <tr key={i} className="group hover:bg-surface-container/10 transition-colors">
                <td className="py-4 text-[13px] font-black text-primary/60 group-hover:text-primary transition-colors pr-6">0{i + 1}</td>
                <td className="py-4 text-[13px] font-bold text-on-surface pr-10">{typeof s === 'string' ? s : s.step}</td>
                <td className="py-4 text-[13px] font-medium text-on-surface-variant/60 pr-10">{s.timeline || "TBD"}</td>
                <td className="py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${s.impact === 'HIGH' ? 'bg-primary/10 text-primary border border-primary/20' : s.impact === 'MEDIUM' ? 'bg-indigo-400/10 text-indigo-400 border border-indigo-400/20' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/30'}`}>
                    {s.impact || "MED"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

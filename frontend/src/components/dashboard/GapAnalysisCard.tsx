import React from 'react';
import { AnalysisResult } from '../../types/business';

interface GapAnalysisCardProps {
  result: AnalysisResult | null;
}

export const GapAnalysisCard: React.FC<GapAnalysisCardProps> = ({ result }) => {
  const gaps = result?.strategies?.gap_analysis?.slice(0, 1) || [
    "Current infrastructure lags in real-time cognitive switching. While competitors offer basic automation, our delta lies in the 'latency of thought' between complex reasoning tasks."
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-headline font-black text-on-surface tracking-tight">Gap Analysis</h3>
        <span className="material-symbols-outlined text-primary text-xl">location_on</span>
      </div>

      <div className="space-y-8 flex-1">
        <p className="text-[13px] font-medium text-on-surface-variant leading-relaxed">
          {gaps[0]}
        </p>

        <div className="space-y-4 pt-10">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/60">Agent Coordination</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">Critical Gap</span>
          </div>
          <div className="h-[2px] bg-primary/20 rounded-full w-full relative">
            <div className="absolute inset-y-0 left-0 bg-primary/40 w-1/2"></div>
            <div className="absolute inset-y-0 left-1/2 bg-primary w-1/4"></div>
          </div>
          <span className="text-[9px] italic text-on-surface-variant/40 mt-1 block">Required: Multi-vector reasoning engine integration.</span>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-center">
        <div className="bg-surface-container border border-outline-variant rounded-full px-4 py-2 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/80">AI Strategy Core: Online</span>
        </div>
      </div>
    </div>
  );
};

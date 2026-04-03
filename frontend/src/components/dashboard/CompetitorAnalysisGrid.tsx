import React from 'react';
import { AnalysisResult, Business } from '../../types/business';

interface CompetitorAnalysisGridProps {
  result: AnalysisResult | null;
}

export const CompetitorAnalysisGrid: React.FC<CompetitorAnalysisGridProps> = ({ result }) => {
  const competitors = result?.analysis?.top_competitors || result?.businesses || [];
  const strengths = result?.strategies?.competitor_strengths || [];
  const weaknesses = result?.strategies?.competitor_weaknesses || [];

  if (!result && !competitors.length) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3 px-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
        <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/60">Section 02: Competitor Intelligence</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths & Weaknesses */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-outline-variant rounded-3xl p-6 shadow-sm group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-2 mb-4 text-emerald-500">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Market Strengths</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {strengths.length > 0 ? strengths.map((s, i) => (
                <span key={i} className="text-[10px] font-bold px-3 py-1.5 bg-emerald-500/5 text-emerald-500 border border-emerald-500/10 rounded-xl">
                  {s}
                </span>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Scanning competitor value propositions...</p>
              )}
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-3xl p-6 shadow-sm group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-2 mb-4 text-error">
              <span className="material-symbols-outlined text-sm">warning</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Strategic Weaknesses</span>
            </div>
            <div className="space-y-3">
              {weaknesses.length > 0 ? weaknesses.slice(0, 3).map((w, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-error/40 text-xs mt-0.5">•</span>
                  <p className="text-xs font-medium text-on-surface-variant leading-relaxed">{w}</p>
                </div>
              )) : (
                <p className="text-xs text-on-surface-variant/40 italic">Identifying operational friction points...</p>
              )}
            </div>
          </div>
        </div>

        {/* Competitor List */}
        <div className="bg-surface border border-outline-variant rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-sm">groups</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Key Players</span>
            </div>
            <span className="text-[9px] font-black text-on-surface-variant/40 uppercase tracking-tighter">Entities: {competitors.length}</span>
          </div>

          <div className="space-y-4">
            {competitors.slice(0, 4).map((biz: Business, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-surface-container/30 border border-outline-variant/30 group hover:border-primary/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center font-headline font-black text-primary/60 text-xs group-hover:text-primary transition-colors">
                    {biz.name.charAt(0)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-headline font-bold text-on-surface text-sm leading-tight">{biz.name}</h4>
                    <div className="flex items-start gap-1.5 mt-0.5">
                      <span className="material-symbols-outlined text-on-surface-variant/40 text-[12px] mt-0.5">location_on</span>
                      <p className="text-[10px] text-on-surface-variant/70 font-medium leading-relaxed max-w-[180px]">{biz.address}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-xs fill-[1]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="text-[11px] font-black text-on-surface">{biz.rating?.toFixed(1) || '4.0'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

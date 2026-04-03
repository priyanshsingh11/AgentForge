import React from 'react';
import { AnalysisResult, Business } from '../../types/business';

interface TopCompetitorsProps {
  result: AnalysisResult | null;
}

export const TopCompetitors: React.FC<TopCompetitorsProps> = ({ result }) => {
  const competitors = result?.analysis?.top_competitors || result?.businesses || [];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Top Competitors</h3>
      </div>

      <div className="space-y-4">
        {competitors.slice(0, 3).map((biz, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container/30 border border-outline-variant/30 group hover:border-primary/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">corporate_fare</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-on-surface">{biz.name}</span>
                <div className="flex items-center gap-4 text-[10px] font-medium">
                  <div className="flex items-start gap-1 text-on-surface-variant/40 mt-0.5">
                    <span className="material-symbols-outlined text-[10px] mt-0.5 flex-shrink-0">location_on</span>
                    <span className="leading-tight">{biz.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

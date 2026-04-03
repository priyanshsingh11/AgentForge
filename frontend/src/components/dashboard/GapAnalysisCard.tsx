import React from 'react';
import { AnalysisResult } from '../../types/business';

interface GapAnalysisCardProps {
  result: AnalysisResult | null;
}

export const GapAnalysisCard: React.FC<GapAnalysisCardProps> = ({ result }) => {
  const gaps = result?.strategies?.gap_analysis || [
    { title: "Digital Discovery", impact: "Critical", description: "No online booking or visible menu. Competitors are capturing 40% of traffic through digital pre-orders." },
    { title: "Service Throughput", impact: "High", description: "Wait times average 12 minutes compared to the 5-minute industry benchmark." },
    { title: "Price Perception", impact: "Medium", description: "Value-based bundles are missing. Individual items are priced 15% too high." }
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col h-full shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-headline font-black text-on-surface tracking-tight leading-none">Gap Analysis</h3>
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Competitive Audit</span>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
           <span className="material-symbols-outlined text-primary text-xl">insights</span>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {gaps.map((gap, i) => (
          <div key={i} className="flex flex-col gap-3 group animate-in fade-in slide-in-from-right-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-widest text-on-surface">{gap.title}</span>
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${
                gap.impact === 'Critical' ? 'bg-error/10 text-error border-error/20' : 
                gap.impact === 'High' ? 'bg-primary/10 text-primary border-primary/20' : 
                'bg-indigo-400/10 text-indigo-400 border-indigo-400/20'
              }`}>
                {gap.impact}
              </span>
            </div>
            
            <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">
              {gap.description}
            </p>

            <div className="space-y-1.5 mt-1">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-on-surface-variant/30">
                <span>Competitive Delta</span>
                <span>{gap.impact === 'Critical' ? '92%' : gap.impact === 'High' ? '65%' : '38%'}</span>
              </div>
              <div className="h-[2px] bg-outline-variant/20 rounded-full w-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    gap.impact === 'Critical' ? 'bg-error' : gap.impact === 'High' ? 'bg-primary' : 'bg-indigo-400'
                  }`} 
                  style={{ width: gap.impact === 'Critical' ? '92%' : gap.impact === 'High' ? '65%' : '38%' }}
                ></div>
              </div>
            </div>

            {i < gaps.length - 1 && <div className="h-[1px] w-full bg-outline-variant/10 mt-2"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

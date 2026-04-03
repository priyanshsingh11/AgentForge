import { AnalysisResult } from '../../types/business';

interface DashboardHeaderProps {
  query: string;
  result: AnalysisResult | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ query, result }) => {
  const marketIndex = result?.strategies?.market_index || '+12.4%';
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 px-2">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-black uppercase tracking-[.4em] text-primary/60">Quarterly Review</span>
        <h1 className="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tighter leading-none antialiased">
          Strategic <span className="bg-gradient-to-r from-white to-on-surface/40 bg-clip-text text-transparent">Insights</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-[8px] font-black uppercase tracking-[.3em] text-on-surface-variant/40">Market Index</span>
          <span className="text-xl font-headline font-black text-primary">{marketIndex}</span>
        </div>
      </div>
    </div>
  );
};

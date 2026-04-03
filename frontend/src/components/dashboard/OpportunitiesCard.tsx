import React from 'react';
import { AnalysisResult } from '../../types/business';

interface OpportunitiesCardProps {
  result: AnalysisResult | null;
}

export const OpportunitiesCard: React.FC<OpportunitiesCardProps> = ({ result }) => {
  const opportunities = result?.strategies?.opportunities || [
    { title: "Morning Pastry Bundles", description: "Package a coffee and a croissant for a special price between 8 AM and 10 AM to attract nearby office workers." },
    { title: "Eco-Friendly Loyalty", description: "Give a 5% discount to customers who bring reusable bags to show community commitment." },
    { title: "Local Business Cross-Promo", description: "Partner with nearby gyms to offer healthy samples to their members after workouts." }
  ];

  return (
    <div className="bg-surface-container/20 border border-outline-variant rounded-3xl p-6 flex flex-col h-full shadow-sm">
      <div className="flex items-center gap-2 mb-8 px-2">
        <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">Opportunities</h3>
      </div>

      <div className="space-y-4">
        {opportunities.map((opp: { title: string; description: string }, i: number) => (
          <div key={i} className="p-4 rounded-2xl bg-surface-container/40 border border-outline-variant/30 group hover:border-primary/40 transition-all cursor-pointer">
            <h4 className="text-sm font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
              {opp.title}
            </h4>
            <p className="text-[10px] text-on-surface-variant/60 font-medium leading-relaxed">
              {opp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

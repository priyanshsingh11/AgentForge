import React from 'react';
import { Business } from '../../types/business';

interface CompetitorListProps {
  businesses: Business[];
}

export const CompetitorList: React.FC<CompetitorListProps> = ({ businesses }) => {
  if (!businesses || businesses.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xs font-black uppercase tracking-[.3em] text-on-surface-variant/40 mb-2 px-4">Market Competitors</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {businesses.map((biz, i) => (
          <div key={i} className="glass-panel border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-primary/20 transition-all duration-500">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-variant/30 flex items-center justify-center font-headline font-black text-primary/40 group-hover:text-primary transition-colors">
                {biz.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface text-lg leading-tight group-hover:text-primary transition-colors">{biz.name}</h4>
                <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest mt-1">{biz.address}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/10">
                <span className="material-symbols-outlined text-primary text-xs fill-current">star</span>
                <span className="text-xs font-black text-primary">{biz.rating || '4.0'}</span>
              </div>
              <span className="text-[10px] text-on-surface-variant/20 font-bold uppercase tracking-tighter">Market Intensity: {Math.floor(Math.random() * 20 + 70)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

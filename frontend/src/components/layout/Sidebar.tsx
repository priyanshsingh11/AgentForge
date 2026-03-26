import React from 'react';
import { AnalysisResult } from '../../types/business';

interface SidebarProps {
  result: AnalysisResult | null;
  onNewInitiative: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ result, onNewInitiative }) => {
  return (
    <aside className="Sidebar fixed left-0 top-0 h-full w-[280px] z-40 bg-[#050505] flex flex-col pt-20 pb-8 px-6 font-body text-sm antialiased border-r border-white/5 shadow-2xl">
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="w-12 h-12 intelligence-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-on-primary-fixed text-2xl">bolt</span>
        </div>
        <div>
          <h2 className="font-headline font-black text-primary leading-tight text-lg tracking-tight">AgentForge</h2>
          <p className="text-[10px] text-on-surface-variant/30 uppercase tracking-[0.3em] font-bold">Autonomous v2.4</p>
        </div>
      </div>
      
      <button 
        onClick={onNewInitiative}
        className="mb-10 w-full py-4 px-4 intelligence-gradient text-on-primary-fixed rounded-2xl font-black flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group shadow-xl shadow-primary/10"
      >
        <span className="material-symbols-outlined font-bold">add</span>
        <span className="tracking-tight text-base">New Initiative</span>
      </button>

      <nav className="flex-1 space-y-1">
        <a className={`flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 ${!result ? 'bg-surface-variant/40 text-primary font-bold border-r-4 border-primary shadow-inner' : 'text-on-surface-variant/30 hover:bg-surface-variant/20 hover:text-on-surface'}`} href="#">
          <span className="material-symbols-outlined">hub</span> Agent Workspace
        </a>
      </nav>

      <div className="mt-auto pt-8 border-t border-outline-variant/10 space-y-1">
        <a className="flex items-center gap-3 py-2 px-4 text-on-surface-variant/40 hover:text-on-surface transition-colors" href="#">
          <span className="material-symbols-outlined text-sm">pulse_alert</span> System Health
        </a>
        <a className="flex items-center gap-3 py-2 px-4 text-on-surface-variant/40 hover:text-on-surface transition-colors" href="#">
          <span className="material-symbols-outlined text-sm">description</span> Documentation
        </a>
      </div>
    </aside>
  );
};

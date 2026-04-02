import React from 'react';
import { AnalysisResult } from '../../types/business';

interface SidebarProps {
  result: AnalysisResult | null;
  onNewInitiative: () => void;
  onShowHistory: () => void;
  onShowSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ result, onNewInitiative, onShowHistory, onShowSettings }) => {
  return (
    <aside className="Sidebar fixed left-0 top-0 h-full w-[280px] z-40 bg-surface-container-lowest flex flex-col pt-20 pb-8 px-6 font-body text-sm antialiased border-r border-outline-variant shadow-sm transition-all duration-300">
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
        className="mb-10 w-full py-3.5 px-4 bg-on-background text-background dark:bg-primary dark:text-on-primary-fixed rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-all cursor-pointer group shadow-lg shadow-black/5 dark:shadow-primary/10"
      >
        <span className="material-symbols-outlined font-bold text-sm">add</span>
        <span className="tracking-tight text-sm">New Initiative</span>
      </button>

      <nav className="flex-1 space-y-2">
        <a className={`flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 ${!result ? 'bg-primary/10 text-primary font-bold border-r-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`} href="#">
          <span className="material-symbols-outlined text-[20px]">hub</span> Agent Workspace
        </a>
      </nav>

      <div className="mt-auto pt-8 border-t border-outline-variant space-y-1">
        <button
          onClick={onShowHistory}
          className="w-full flex items-center gap-3 py-2.5 px-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all text-left"
        >
          <span className="material-symbols-outlined text-[18px]">history</span> History
        </button>
        <button
          onClick={onShowSettings}
          className="w-full flex items-center gap-3 py-2.5 px-4 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-all text-left"
        >
          <span className="material-symbols-outlined text-[18px]">settings</span> Settings
        </button>
      </div>
    </aside>
  );
};

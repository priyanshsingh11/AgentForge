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
      <div className="flex items-center gap-4 mb-6 px-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="mt-2 font-headline font-black leading-tight text-3xl tracking-tight flex items-center">
              <span className="text-on-surface">Agent</span>
              <span className="text-primary">Forge</span>
            </h2>
            <span className="px-1.5 py-0.5 rounded-md border border-primary/30 text-primary text-[8px] font-black leading-none mt-0.5">AI</span>
          </div>
        </div>
      </div>

      <button
        onClick={onNewInitiative}
        className="mb-5 w-full py-3 px-4 gap-5 bg-on-background text-background dark:bg-primary dark:text-on-primary-fixed rounded-2xl font-bold flex items-center justify-start active:scale-[0.98] transition-all cursor-pointer group shadow-lg shadow-black/5 dark:shadow-primary/10"
      >
        <span className="material-symbols-outlined font-bold text-sm ml-1">add</span>
        <span className="tracking-tight text-[15px]">New Initiative</span>
      </button>

      <nav className="flex-1 space-y-2">
        <a className={`flex items-center gap-5 py-3 px-4 rounded-xl transition-all duration-300 ${!result ? 'bg-primary/10 text-primary font-bold border-r-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`} href="#">
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

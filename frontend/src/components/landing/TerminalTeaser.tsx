import React from 'react';

export const TerminalTeaser: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-0 right-0 px-12 flex justify-between items-end opacity-50">
      <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 rounded-lg max-w-sm">
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-[10px] text-on-surface-variant/30 uppercase tracking-[0.3em]">Environment</div>
        <div className="text-on-surface/50 text-xs font-mono">PROD_CLUSTER_ALPHA_2</div>
      </div>
    </div >
  );
};

import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center mb-16 max-w-5xl relative z-10">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="h-[1px] w-12 bg-primary/20"></span>
        <span className="text-primary/70 font-label text-[11px] uppercase tracking-[0.5em] font-black">Architect of Tomorrow</span>
        <span className="h-[1px] w-12 bg-primary/20"></span>
      </div>
      <h1 className="font-headline text-8xl md:text-9xl font-black tracking-tighter text-on-surface mb-8 leading-[0.85]">
        Define your <br/><span className="text-transparent bg-clip-text intelligence-gradient">Intelligence.</span>
      </h1>
      <p className="text-on-surface-variant/60 text-xl font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
        Deploy autonomous agents to execute complex workflows, analyze deep data structures, and architect solutions at scale.
      </p>
    </div>
  );
};

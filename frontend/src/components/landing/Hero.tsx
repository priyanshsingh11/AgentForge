import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-6 max-w-5xl mx-auto">

      {/* Top Label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="h-[1px] w-8 bg-primary/30"></span>
        <span className="text-primary/70 text-[10px] uppercase tracking-[0.3em] font-semibold">
          Strategic Business Intelligence
        </span>
        <span className="h-[1px] w-8 bg-primary/30"></span>
      </div>

      {/* Heading */}
      <h1 className="font-headline font-black tracking-tighter text-white leading-[0.9]
                     text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6">
        Scale your <br />
        <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent italic">
          Growth.
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-none leading-relaxed">
        Autonomous AI agents to analyze market dynamics and scale your business growth with strategic intelligence.
      </p>
    </section>
  );
};
import React from 'react';

export const TopNav: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 h-16 bg-[#111417]/60 backdrop-blur-[20px] border-b border-[#424754]/15 flex justify-between items-center px-8 font-headline tracking-tight">
      <div className="flex items-center gap-8">
        <span className="text-lg font-bold tracking-[0.2em] text-[#E1E2E7] uppercase">AgentForge AI</span>
        <div className="hidden md:flex items-center gap-6">
          <a className="text-primary font-bold border-b-2 border-primary transition-all duration-300 px-3 py-1" href="#">Explorer</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4 text-[#E1E2E7]/60">
          <button className="p-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        <button className="bg-primary text-on-primary-fixed px-5 py-2 rounded-lg font-semibold active:scale-[0.98] transition-transform">
          Deploy Agent
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
          <img alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMkCyJuuVGLxVvUHvks9gtb6a847lqWeeLX6bCbd-FvGSnXQwvYoMUxRDXp27Hn92GPfWOnG-SgT9ZAiJH0NR_5h9iJ33-C0G4BNypdQM7FFho8e3rfl8T7boXhkFKbQukpVzu3LTSgnAcVoDP-jBfZA0J_CXMrvVtvPiTunImRzlFnREgU_vy_KSyOoX91xtJxLueUMT6WkRqlC7NIBRXrnT2b1Ln_s4PtsPI7-vGknOvNJFF_1qz2rexJEudAKJ3bZaE02PBfvbe" />
        </div>
      </div>
    </nav>
  );
};

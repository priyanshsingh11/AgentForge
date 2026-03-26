import React from 'react';

interface GoalInputProps {
  query: string;
  location: string;
  setQuery: (q: string) => void;
  setLocation: (l: string) => void;
  handleAnalyze: (e?: React.FormEvent) => void;
}

export const GoalInput: React.FC<GoalInputProps> = ({
  query,
  location,
  setQuery,
  setLocation,
  handleAnalyze
}) => {
  return (
    <div className="w-full max-w-4xl glass-panel p-3 rounded-[2.5rem] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative z-10">
      <form onSubmit={handleAnalyze} className="relative flex flex-col md:flex-row items-center gap-6 bg-surface-container-lowest p-6 rounded-[2rem] border border-white/5 group hover:border-primary/20 transition-colors">
        <div className="flex-1 w-full px-4">
          <label className="block text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] mb-2 ml-1">Autonomous Goal</label>
          <input
            className="w-full bg-transparent border-none text-on-surface text-2xl placeholder:text-on-surface-variant/10 focus:ring-0 focus:outline-none py-1 font-body font-medium tracking-tight"
            placeholder="e.g., 'Analyze coffee shop competitors in North London'"
            type="text"
            value={query + (location ? ` in ${location}` : '')}
            onChange={(e) => {
              const parts = e.target.value.split(' in ');
              setQuery(parts[0]);
              if (parts[1]) setLocation(parts[1]);
            }}
          />
        </div>
        <button type="submit" className="w-full md:w-auto px-10 py-5 intelligence-gradient text-on-primary-fixed font-black text-lg rounded-2xl shadow-2xl active:scale-[0.96] transition-all flex items-center justify-center gap-4 group">
          <span>Execute Goal</span>
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </form>
    </div>
  );
};

import React, { useState } from 'react';

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
  const [isLocating, setIsLocating] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use Geoapify Reverse Geocoding to get a readable address
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=eddc49298bf548b1b035af9339895d88`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const address = data.features[0].properties.city || data.features[0].properties.county || data.features[0].properties.formatted;
            setLocation(address);
          } else {
            setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          }
        } catch (error) {
          console.error("Reverse geocoding failed", error);
          setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation failed", error);
        alert("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="w-full max-w-4xl glass-panel p-2 rounded-[2rem] border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative z-10">
      <form onSubmit={handleAnalyze} className="relative flex flex-col md:flex-row items-center gap-4 bg-surface-container-lowest p-5 rounded-[1.8rem] border border-white/5 group hover:border-primary/20 transition-colors">
        <div className="flex-1 w-full px-2 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-[9px] font-black text-primary/40 uppercase mb-1 ml-1">Autonomous Goal</label>
            <input
              className="w-full bg-transparent border-none text-on-surface text-lg placeholder:text-on-surface-variant/20 focus:ring-0 focus:outline-none py-1 font-headline font-black tracking-tight"
              placeholder="e.g., 'Luxury Hotel'"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/3 border-l border-white/5 md:pl-4 pl-0 relative">
            <div className="flex justify-between items-center mb-1 ml-1">
              <label className="text-[9px] font-black text-primary/40 uppercase">Target Region</label>
              <button
                type="button"
                onClick={handleUseMyLocation}
                className={`flex items-center gap-1 text-[9px] font-black uppercase transition-all ${isLocating ? 'text-primary animate-pulse' : 'text-primary/40 hover:text-primary'}`}
              >
                <span className="material-symbols-outlined text-xs">{isLocating ? 'progress_activity' : 'my_location'}</span>
                {isLocating ? 'Locating...' : 'My Location'}
              </button>
            </div>
            <input
              className="w-full bg-transparent border-none text-on-surface text-lg placeholder:text-on-surface-variant/20 focus:ring-0 focus:outline-none py-1 font-headline font-black tracking-tight"
              placeholder="e.g., 'London'"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="w-full md:w-auto px-8 py-4 intelligence-gradient text-on-primary-fixed font-black text-base rounded-xl shadow-xl active:scale-[0.96] transition-all flex items-center justify-center group">
          <span>Execute Goal</span>
          <span className="material-symbols-outlined font-black text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </form>
    </div>
  );
};

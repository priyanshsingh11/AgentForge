'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '../types/business';

// Layout Components
import { TopNav } from '../components/layout/TopNav';
import { Sidebar } from '../components/layout/Sidebar';

// Landing Components
import { Hero } from '../components/landing/Hero';
import { GoalInput } from '../components/landing/GoalInput';
import { PresetArchitectures } from '../components/landing/PresetArchitectures';
import { TerminalTeaser } from '../components/landing/TerminalTeaser';

// Dashboard Components
import { MarketEngine } from '../components/dashboard/MarketEngine';
import { LiveInsights } from '../components/dashboard/LiveInsights';
import { OutputSummary } from '../components/dashboard/OutputSummary';
import { CompetitorList } from '../components/dashboard/CompetitorList';

export default function AgentForgeApp() {
  const [query, setQuery] = useState('Coffee Shop');
  const [location, setLocation] = useState('Greater Noida');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);
    setLogs([]);

    addLog("Initializing agent cluster 'Architecture_Primary'...");

    try {
      setTimeout(() => addLog("Accessing global market data repositories... Success."), 1000);
      setTimeout(() => addLog(`Geocoding target location: ${location}... Coordinates identified.`), 2000);
      setTimeout(() => addLog(`Scanning for ${query} entities in vicinity...`), 3000);

      const response = await fetch('http://localhost:8000/api/business/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, location }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Analysis failed');
      }

      setTimeout(() => {
        addLog("Cross-referencing sentiment scores with market benchmarks...");
        addLog("Generating visual heatmaps for geographic saturation...");
        addLog("Neural weights adjusted for specific industry vertical.");
        setResult(data);
        setLoading(false);
      }, 4000);

    } catch (error: any) {
      addLog(`CRITICAL ERROR: ${error.message}`);
      console.error('Analysis failed:', error);
      alert(`Analysis failed: ${error.message}`);
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const resetState = () => {
    setResult(null);
    setQuery('');
    setLocation('');
    setLogs([]);
  };

  return (
    <div className="bg-background text-on-background font-body antialiased mesh-bg min-h-screen">
      <TopNav />
      <Sidebar result={result} onNewInitiative={resetState} />

      <main className="pl-[280px] pt-16 h-[calc(100vh-64px)] relative flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!result && !loading ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-between px-8 py-6 relative overflow-hidden"
            >
              {/* Background Accents */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
              <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none"></div>

              <Hero />
              <GoalInput
                query={query}
                location={location}
                setQuery={setQuery}
                setLocation={setLocation}
                handleAnalyze={handleAnalyze}
              />
              <PresetArchitectures />
              <TerminalTeaser />

            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full p-8 overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-w-[1600px] mx-auto">
                <MarketEngine
                  query={query}
                  loading={loading}
                  logs={logs}
                  result={result}
                />

                <div className="xl:col-span-4 flex flex-col gap-8">
                  <LiveInsights result={result} />
                  <CompetitorList businesses={result?.analysis?.top_competitors || []} />
                  <OutputSummary result={result} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

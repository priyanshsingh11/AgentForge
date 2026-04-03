'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnalysisResult } from '../types/business';
import { useAuth } from '@/context/AuthContext';

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
import { StrategicManifest } from '../components/dashboard/StrategicManifest';
import { HistoryModal } from '../components/dashboard/HistoryModal';
import { SettingsModal } from '../components/dashboard/SettingsModal';

import { AuthModal } from '../components/auth/AuthModal';

export default function AgentForgeApp() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    setIsMounted(true);
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('agentforge-theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    localStorage.setItem('agentforge-theme', newTheme);
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const handleClearHistory = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:8000/api/task/clear/${user.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setResult(null);
        alert('History cleared successfully');
      } else {
        throw new Error('Failed to clear history');
      }
    } catch (error) {
      console.error('Clear history failed:', error);
      alert('Failed to clear history from database.');
    }
  };


  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);

    try {

      const response = await fetch('http://localhost:8000/api/business/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id || 'anonymous',
          query,
          location
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Analysis failed');
      }

      // The backend now returns { task_id, status, data }
      setResult(data.data);
      setLoading(false);

    } catch (error: any) {
      console.error('Analysis failed:', error);
      alert(`Analysis failed: ${error.message}`);
      setLoading(false);
    }
  };

  const handleSelectTask = async (taskId: number) => {
    setShowHistory(false);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8000/api/task/detail/${taskId}`);
      const data = await response.json();

      if (!response.ok) throw new Error('Failed to load task details');

      if (data.outputs && data.outputs.length > 0) {
        // Parse the latest output content
        const lastOutput = data.outputs[data.outputs.length - 1];
        const sharedResult = JSON.parse(lastOutput.content);
        setResult(sharedResult);
      } else {
        alert('No saved output found for this task.');
      }
    } catch (error: any) {
      console.error('Failed to load history item:', error);
      alert(`Could not restore analysis: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  const resetState = () => {
    setResult(null);
    setQuery('');
    setLocation('');
  };

  return (
    <div className="bg-background text-on-background font-body antialiased mesh-bg min-h-screen">
      <TopNav onSignIn={() => setShowAuthModal(true)} />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      <Sidebar
        result={result}
        onNewInitiative={resetState}
        onShowHistory={() => setShowHistory(true)}
        onShowSettings={() => setShowSettings(true)}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onClearHistory={handleClearHistory}
      />

      <HistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectTask={handleSelectTask}
      />

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
            <div className="h-full p-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1440px] mx-auto pb-16 h-full">
                <MarketEngine
                  query={query}
                  loading={loading}
                  result={result}
                />

                <div className="xl:col-span-4 flex flex-col gap-6 h-full">
                  <LiveInsights result={result} />
                  <CompetitorList result={result} />
                  <OutputSummary result={result} />
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

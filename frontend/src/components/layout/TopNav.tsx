'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const TopNav: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Get display name: prefer full_name from metadata, fall back to email prefix
  const displayName = user
    ? (user.user_metadata?.full_name as string | undefined) ?? user.email?.split('@')[0] ?? 'Agent'
    : null;

  return (
    <nav className="TopNav fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant z-50 px-8 flex items-center justify-between transition-all duration-300">
      {/* Left — Brand */}
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-4 group">
          <img src="/logo.png" alt="AgentForge Logo" className="w-18 h-18 object-contain transition-transform group-hover:rotate-12" />
        </Link>
      </div>

      {/* Center — Horizontal Logic Rail (Static) */}
      <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-surface-container/30 rounded-full border border-outline-variant/10">
        {[
          { label: "Autonomous Agents", color: "bg-emerald-500" },
          { label: "AI Agents", color: "bg-primary" },
          { label: "Self-Learning Systems", color: "bg-purple-500" },
          { label: "Execution Engines", color: "bg-cyan-500" },
          { label: "Automation Pipelines", color: "bg-amber-500" },
          { label: "Intelligent Workflows", color: "bg-rose-500" },
          { label: "Agent Systems", color: "bg-teal-500" },
          { label: "Task Orchestration", color: "bg-indigo-500" }
        ].map((item, idx, arr) => (
          <React.Fragment key={item.label}>
            <div className="flex items-center gap-2">
              <span className="font-headline font-black tracking-tighter leading-[0.95] text-[13px] italic ">
                {item.label}
              </span>
            </div>
            {idx < arr.length - 1 && (
              <div className="h-3 w-[1px] bg-outline-variant/30 mx-1"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right — User area */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden shadow-inner group-hover:border-primary/40 transition-colors">
              <span className="material-symbols-outlined text-primary text-[24px]">account_circle</span>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-2.5 rounded-xl text-on-surface-variant hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-surface-container border border-outline-variant text-on-surface px-6 py-2.5 rounded-xl text-[13px] font-black hover:bg-surface-container-high hover:border-primary/40 active:scale-[0.98] transition-all shadow-xl shadow-black/20 group flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">login</span>
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

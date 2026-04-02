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
    <nav className="TopNav fixed top-0 left-0 right-0 h-16 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-50 px-8 flex items-center justify-between">
      {/* Left — Brand */}
      <div className="flex items-center gap-8">
        <Link href="/" className="text-lg font-bold tracking-[0.2em] text-[#E1E2E7] uppercase">
          AgentForge AI
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a
            className="text-primary font-bold border-b-2 border-primary transition-all duration-300 px-3 py-1"
            href="#"
          >
            Explorer
          </a>
        </div>
      </div>

      {/* Right — User area */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* User email pill */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontSize: '16px' }}>
                person
              </span>
              <span className="text-sm font-medium text-[#E1E2E7]/80 tracking-tight">
                {displayName}
              </span>
            </div>

            {/* Logout button — matches sidebar bottom links style */}
            <button
              onClick={handleLogout}
              title="Sign out"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-on-surface-variant/60 hover:bg-white/10 hover:text-red-400 active:scale-[0.97] transition-all duration-200 text-sm font-semibold"
            >
              <span className="material-symbols-outlined text-base" style={{ fontSize: '16px' }}>
                logout
              </span>
              <span>Sign out</span>
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="intelligence-gradient text-on-primary px-5 py-2 rounded-xl font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary/20">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

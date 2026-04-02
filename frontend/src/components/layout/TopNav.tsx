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
        <Link href="/" className="text-sm font-bold tracking-[0.2em] text-on-surface uppercase whitespace-nowrap">
          AgentForge AI
        </Link>

      </div>

      {/* Right — User area */}
      <div className="flex items-center gap-6">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User display — compact like reference */}
            <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
            </div>

            {/* Logout button — now just an icon for cleaner look if desktop */}
            <button
              onClick={handleLogout}
              title="Sign out"
              className="p-2 rounded-lg text-on-surface-variant hover:text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="bg-on-background text-background px-5 py-2 rounded-lg text-[13px] font-bold active:scale-[0.98] transition-transform shadow-sm">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

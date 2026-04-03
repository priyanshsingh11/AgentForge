'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


interface TopNavProps {
  onSignIn: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onSignIn }) => {
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
        <Link href="/" className="flex items-center group">
          <img src="/logo.png" alt="AgentForge Logo" className="w-15 h-15 object-contain transition-transform" />
          <div className="flex items-center gap-2">
            <h2 className="font-headline font-black leading-tight text-2xl tracking-tighter flex items-center">
              <span className="text-on-surface">Agent</span>
              <span className="text-primary">Forge</span>
            </h2>
            <span className="px-1.5 py-0.5 rounded-md border border-primary/30 text-primary text-[8px] font-black leading-none mt-0.5">AI</span>
          </div>
        </Link>
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
          <button
            onClick={onSignIn}
            className="bg-surface-container border border-outline-variant text-on-surface px-6 py-2.5 rounded-xl text-[13px] font-black hover:bg-surface-container-high hover:border-primary/40 active:scale-[0.98] transition-all shadow-xl shadow-black/20 group flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px] opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">login</span>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

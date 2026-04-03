'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' }>({
    text: '',
    type: 'error',
  });

  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: 'error' });

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setMessage({ text: error, type: 'error' });
        } else {
          router.push('/');
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          setMessage({ text: error, type: 'error' });
        } else {
          setMessage({
            text: 'Account created! Check your email to confirm, then sign in.',
            type: 'success',
          });
          setIsLogin(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-[3vh] bg-background relative overflow-hidden font-body p-6">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[180px] rounded-full pointer-events-none"></div>

      {/* TOP BRANDING */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-5 z-10"
      >
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-1 mb-1">
          <span className="text-on-surface">Agent</span>
          <span className="text-primary">Forge</span>
        </h1>
        <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.3em] font-black opacity-60">
          Command Center
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-[480px] p-10 rounded-[2.5rem] bg-surface/40 border border-outline-variant backdrop-blur-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(129,138,248,0.05)] z-10"
      >

        {/* TAB SWITCHER */}
        <div className="bg-surface-container/50 border border-outline-variant p-1.5 rounded-2xl mb-8 flex relative">
          <motion.div
            layout
            className="absolute inset-y-1.5 rounded-xl bg-primary/10 border border-primary/20 shadow-inner"
            style={{
              width: "calc(50% - 9px)",
              left: isLogin ? "6px" : "calc(50% + 3px)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />

          <button
            onClick={() => { setIsLogin(true); setMessage({ text: '', type: 'error' }); }}
            className={`flex-1 py-3.5 text-base font-black transition-all relative z-10 ${isLogin ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsLogin(false); setMessage({ text: '', type: 'error' }); }}
            className={`flex-1 py-3.5 text-base font-black transition-all relative z-10 ${!isLogin ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Create Account
          </button>
        </div>

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-2 overflow-hidden"
            >
              <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full px-6 py-4 bg-surface-container/30 border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-on-surface-variant/30 transition-all font-medium text-base"
                required={!isLogin}
              />
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
              {isLogin ? "Business Email" : "Company Email"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-6 py-4 bg-surface-container/30 border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-on-surface-variant/30 transition-all text-base font-medium"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant">Password</label>
              {isLogin && (
                <button type="button" className="text-[11px] font-black text-primary hover:underline transition-all uppercase tracking-wider">
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-surface-container/30 border border-outline-variant rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-on-surface-variant/30 transition-all text-base font-medium"
                required
                minLength={6}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="flex items-start gap-3 ml-1 mt-2">
              <input type="checkbox" id="terms" required className="mt-1 rounded border-outline-variant bg-surface-container text-primary focus:ring-primary/30 size-4" />
              <label htmlFor="terms" className="text-[12px] text-on-surface-variant leading-relaxed">
                I agree to the <span className="text-on-surface hover:text-primary transition-colors cursor-pointer font-bold">Terms of Service</span> and <span className="text-on-surface hover:text-primary transition-colors cursor-pointer font-bold">Privacy Policy</span>
              </label>
            </div>
          )}

          {message.text && (
            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-sm font-bold text-center px-5 py-4 rounded-2xl border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}
            >
              {message.text}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 rounded-2xl font-black text-base tracking-widest uppercase bg-primary text-on-primary shadow-[0_15px_40px_rgba(129,138,248,0.3)] hover:brightness-110 active:brightness-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <>
                {isLogin ? 'Access Dashboard' : 'Begin Growth Journey'}
                <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

    </div>
  );
}
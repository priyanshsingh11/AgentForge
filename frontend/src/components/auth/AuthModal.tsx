'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' }>({
    text: '',
    type: 'error',
  });

  const { signIn, signUp } = useAuth();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
          onClose(); // Close modal on success
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          setMessage({ text: error, type: 'error' });
        } else {
          setMessage({
            text: 'Account created! Please check your email to confirm, then sign in.',
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-[480px] p-10 rounded-[2.5rem] bg-surface/80 border border-outline-variant backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(129,138,248,0.1)] z-10 relative overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {/* Content Branding */}
            <div className="flex flex-col items-center mb-10">
              <h1 className="text-4xl font-black tracking-tight flex items-center gap-1 mb-2">
                <span className="text-on-surface">Agent</span>
                <span className="text-primary">Forge</span>
              </h1>
              <p className="text-on-surface-variant text-[11px] uppercase tracking-[0.4em] font-black opacity-60">
                Command Center Access
              </p>
            </div>

            {/* TAB SWITCHER */}
            <div className="bg-surface-container/50 border border-outline-variant p-1.5 rounded-2xl mb-8 flex relative">
              <motion.div
                layout
                className="absolute inset-y-1.5 rounded-xl bg-primary/10 border border-primary/20 shadow-inner"
                style={{
                  width: "calc(50% - 9px)",
                  left: isLogin ? "6.5px" : "calc(50% + 2.5px)",
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
                Register
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
                  Email Address
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
                className="w-full py-5 rounded-2xl font-black text-sm tracking-widest uppercase bg-primary text-on-primary shadow-[0_15px_40px_rgba(129,138,248,0.3)] hover:brightness-110 active:brightness-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
              >
                {loading ? (
                  <span className="material-symbols-outlined animate-spin size-6 text-[24px]">sync</span>
                ) : (
                  <>
                    {isLogin ? 'Access Dashboard' : 'Create Account'}
                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

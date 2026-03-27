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
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const body = isLogin ? { email, password, name: 'Login' } : { email, password, name };
      
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      if (isLogin) {
        // Mock user fetch or get from token
        const user = { id: 1, name: email.split('@')[0], email }; 
        login(data.access_token, user);
        router.push('/');
      } else {
        setIsLogin(true);
        setError('Account created! Please log in.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-body">
      {/* Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-white/60">
            {isLogin ? 'Enter your credentials to access AgentForge' : 'Join the elite multi-agent intelligence platform'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-on-primary-fixed rounded-xl font-bold tracking-wide active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/40 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

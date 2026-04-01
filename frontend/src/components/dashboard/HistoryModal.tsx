'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface Task {
  id: number;
  goal: string;
  status: string;
  created_at: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTask: (taskId: number) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, onSelectTask }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      fetchTasks();
    }
  }, [isOpen, user]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/task/list/${user?.id}`);
      const data = await response.json();
      if (response.ok) {
        // Sort by id descending (most recent first)
        setTasks(data.sort((a: Task, b: Task) => b.id - a.id));
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#000]/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Search History</h3>
              <p className="text-xs text-on-surface-variant/40 uppercase tracking-widest mt-1">Review and restore past market analyses</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface/60">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Accessing Archives...</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/20 mb-4">history</span>
                <p className="text-on-surface-variant/40 font-medium">No past initiatives found yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onSelectTask(task.id)}
                    className="w-full text-left p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-white/[0.07] transition-all group active:scale-[0.99]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary text-xl">database</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{task.goal}</h4>
                          <span className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest">{new Date(task.created_at).toLocaleDateString()} • ID: {task.id}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${task.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
                          {task.status}
                        </span>
                        <span className="material-symbols-outlined text-on-surface-variant/20 group-hover:translate-x-1 transition-transform">chevron_right</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-end">
             <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/20 italic">Data processed via Enterprise Persistence Bridge</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

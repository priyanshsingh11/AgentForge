'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearHistory: () => Promise<void>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onClearHistory,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearHistory = async () => {
    setIsDeleting(true);
    await onClearHistory();
    setIsDeleting(false);
    setShowConfirm(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-surface-container-lowest border border-outline-variant shadow-2xl"
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-on-surface">Settings</h2>
                  <p className="text-on-surface-variant/60 text-sm mt-1">Configure your workspace intelligence</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">close</span>
                </button>
              </div>

              <div className="space-y-8">
                {/* Data Management */}
                <div className="space-y-4 pt-4 border-t border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-xl">database</span>
                    <h3 className="font-bold text-on-surface uppercase tracking-widest text-[10px]">Data Management</h3>
                  </div>

                  {!showConfirm ? (
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-400/5 border border-red-400/10 hover:bg-red-400/10 transition-all group"
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-red-400">Clear All History</p>
                        <p className="text-[10px] text-red-400/60 uppercase tracking-tighter">Permanently delete all analyses</p>
                      </div>
                      <span className="material-symbols-outlined text-red-400 group-hover:translate-x-1 transition-transform">delete_forever</span>
                    </button>
                  ) : (
                    <div className="p-6 rounded-2xl bg-red-400/10 border border-red-400/20 space-y-4">
                      <p className="text-sm text-red-100 font-medium">Are you absolutely sure? This will erase all your strategic data permanently.</p>
                      <div className="flex gap-3">
                        <button
                          disabled={isDeleting}
                          onClick={handleClearHistory}
                          className="flex-1 py-2 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? 'Erasing...' : 'Yes, Delete Everything'}
                        </button>
                        <button
                          disabled={isDeleting}
                          onClick={() => setShowConfirm(false)}
                          className="flex-1 py-2 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-variant transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

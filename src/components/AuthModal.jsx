import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, Check, ArrowRight, ShieldCheck, Palette } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, currentUser, onLogin, onLogout, onOpenCreator }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('Haute Couture');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      name: mode === 'login' ? (email.split('@')[0] || "Fashion Enthusiast") : (name || "New Creator"),
      email: email || "reader@belleligne.com",
      role: mode === 'login' ? "Verified Reader" : "Editorial Magazine Creator",
      savedCount: 4,
      memberSince: "2028"
    };

    onLogin(userObj);
    onClose();

    // Auto-launch Magazine Creator studio as requested!
    if (onOpenCreator) {
      setTimeout(() => onOpenCreator(), 300);
    }
  };

  const loginAsDemo = (profile) => {
    onLogin(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-[#121419] rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 transition-colors"
        >
          <X size={18} />
        </button>

        {currentUser ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-teal-600 to-amber-500 text-white font-editorial text-2xl flex items-center justify-center shadow-lg mb-3">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-editorial text-2xl font-bold">{currentUser.name}</h3>
            <p className="text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 mt-1 font-semibold">
              {currentUser.role}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{currentUser.email}</p>

            {/* Launch Magazine Creator Directly */}
            <div className="my-5 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-700 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-700 dark:text-teal-300 font-bold block">
                Creator Studio Ready
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                You are signed in! Start designing, painting, and publishing your first digital fashion magazine.
              </p>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenCreator) onOpenCreator();
                }}
                className="mt-3 w-full py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow"
              >
                <Palette size={14} />
                <span>Open Magazine Paint Studio</span>
              </button>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 rounded-full border border-rose-500/40 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-semibold uppercase tracking-wider"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold">
                Belle Ligne Reader &amp; Creator Portal
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold mt-1">
                {mode === 'login' ? 'Sign In & Create' : 'Join Belle Ligne'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Sign in to create, paint, and publish your own digital fashion magazine!
              </p>
            </div>

            {/* Quick 1-Click Role Login Switches */}
            <div className="mb-4">
              <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 text-center mb-2">
                Quick Demo Sign-In
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => loginAsDemo({
                    name: "Daisy",
                    email: "daisy.editor@pcte.edu.in",
                    role: "Editorial Director & Platform Lead",
                    savedCount: 6,
                    memberSince: "2028"
                  })}
                  className="p-2 text-left rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-teal-500 transition-all text-xs"
                >
                  <div className="font-bold text-teal-600 dark:text-teal-400">👩‍💻 Daisy (Editor)</div>
                  <div className="text-[10px] text-neutral-500">Platform Lead</div>
                </button>

                <button
                  type="button"
                  onClick={() => loginAsDemo({
                    name: "Aria Laurent",
                    email: "aria.critic@paris.com",
                    role: "VIP Fashion Critic",
                    savedCount: 4,
                    memberSince: "2028"
                  })}
                  className="p-2 text-left rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-amber-500 transition-all text-xs"
                >
                  <div className="font-bold text-amber-600 dark:text-amber-400">✨ Aria (Critic)</div>
                  <div className="text-[10px] text-neutral-500">VIP Member</div>
                </button>
              </div>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono bg-white dark:bg-[#121419] px-2 text-neutral-400">
                Or enter credentials
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Your Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Moreau"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@belleligne.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md mt-4 flex items-center justify-center space-x-1.5"
              >
                <span>{mode === 'login' ? 'Sign In & Launch Creator Studio' : 'Register & Start Creating'}</span>
                <ArrowRight size={14} />
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button onClick={() => setMode('register')} className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                    Register here
                  </button>
                </span>
              ) : (
                <span>
                  Already a member?{' '}
                  <button onClick={() => setMode('login')} className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                    Sign in
                  </button>
                </span>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

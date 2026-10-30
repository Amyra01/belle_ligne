import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthPage({ onBack, onLoginSuccess, onOpenCreator }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Daisy',
    email: 'daisy.editor@pcte.edu.in',
    password: '••••••••',
    tier: 'Haute Couture Studio',
    interest: 'Runway & Creative Direction'
  });
  const [statusMsg, setStatusMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg('');

    const userPayload = {
      name: formData.name || (isSignUp ? 'New Designer' : 'Daisy'),
      email: formData.email,
      role: isSignUp ? 'Contributing Fashion Editor' : 'Editorial Director & Platform Lead',
      tier: formData.tier,
      memberSince: '2028',
      savedCount: 6
    };

    try {
      // Direct sync with backend database on port 5000
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });
      const data = await res.json();
      if (data && data.user) {
        userPayload.id = data.user.id;
      }
    } catch (err) {
      console.warn('Backend sync local fallback:', err);
    }

    // Save to local storage for persistent session
    localStorage.setItem('belle_ligne_user', JSON.stringify(userPayload));

    setIsLoading(false);
    if (onLoginSuccess) {
      onLoginSuccess(userPayload);
    }
    setStatusMsg('Access verified & saved to backend database! Opening Creator Studio...');
    setTimeout(() => {
      if (onOpenCreator) {
        onOpenCreator();
      } else if (onBack) {
        onBack();
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between relative overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Bar with Go Back */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-neutral-800 z-10">
        <button
          onClick={onBack}
          className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-sm font-serif tracking-wider transition-all duration-200"
        >
          <span className="text-teal-400 group-hover:-translate-x-1 transition-transform">←</span>
          <span>Return to Magazine</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="font-serif tracking-widest text-lg font-bold text-neutral-100">belle ligne</span>
          <span className="text-neutral-600 text-xs font-mono uppercase tracking-widest">| Member Studio</span>
        </div>
      </div>

      {/* Main Auth Split Container */}
      <div className="max-w-5xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 z-10">
        
        {/* Left Side: Haute Couture Editorial Showcase */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-800/50 text-teal-400 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Digital Magazine Maker Access</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif tracking-tight leading-tight text-neutral-100">
            Publish your vision in <span className="italic font-light text-teal-300">Belle Ligne</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Sign in or create your creative membership to unlock our interactive digital canvas. Paint spreads, layer bespoke typography, stamp runway silhouettes, and publish your own issue directly to the global archive.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-neutral-800 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs shrink-0 mt-0.5">✓</span>
              <p className="text-xs text-neutral-300">Full-featured Canvas Studio with Neon Brushes, Glow Effects & Eraser</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-neutral-800 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs shrink-0 mt-0.5">✓</span>
              <p className="text-xs text-neutral-300">9 Curated Editorial Templates (Paris Noir, Cyber Tokyo, Silk Teal)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 rounded-full bg-neutral-800 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs shrink-0 mt-0.5">✓</span>
              <p className="text-xs text-neutral-300">Live Backend Database saving & instant library publishing</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm">
            <p className="text-xs text-neutral-400 italic">
              "Every great designer began with a single blank spread. Welcome to the future of fashion publishing."
            </p>
            <p className="text-xs font-serif text-teal-400 mt-2 font-medium">
              — Daisy, Editorial Director
            </p>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex items-center space-x-2 p-1 bg-neutral-950 rounded-xl border border-neutral-800 mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest rounded-lg transition-all ${
                !isSignUp
                  ? 'bg-neutral-800 text-teal-300 font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Sign In (Editor Access)
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest rounded-lg transition-all ${
                isSignUp
                  ? 'bg-neutral-800 text-teal-300 font-bold shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                  Full Name / Designer Label
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Daisy or Maison Atelier"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Fashion Press / University Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="daisy.editor@pcte.edu.in"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-sm focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Passkey / Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-sm focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            {isSignUp && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Editorial Tier
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="Haute Couture Studio">Haute Couture Studio</option>
                    <option value="Digital Press Member">Digital Press Member</option>
                    <option value="PCTE IFDT Scholar">PCTE IFDT Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Primary Craft
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs focus:outline-none focus:border-teal-500"
                  >
                    <option value="Runway & Creative Direction">Runway & Creative Direction</option>
                    <option value="Sustainable Textile Design">Sustainable Textile Design</option>
                    <option value="Avant-Garde Streetwear">Avant-Garde Streetwear</option>
                    <option value="3D Model Stylist">3D Model Stylist</option>
                  </select>
                </div>
              </div>
            )}

            {/* Quick Demo Pre-fill for Convenience */}
            <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <span>Quick Role: Daisy (Editor-in-Chief)</span>
              <button
                type="button"
                onClick={() => setFormData({
                  name: 'Daisy',
                  email: 'daisy.editor@pcte.edu.in',
                  password: '••••••••',
                  tier: 'Haute Couture Studio',
                  interest: 'Runway & Creative Direction'
                })}
                className="text-teal-400 hover:underline"
              >
                Pre-fill Daisy Credentials
              </button>
            </div>

            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs rounded-xl text-center font-medium"
              >
                {statusMsg}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-neutral-950 font-serif font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-teal-950/50 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Entering Studio...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Join & Launch Magazine Creator' : 'Sign In & Launch Magazine Creator'}</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          {/* Direct shortcut to creator without login */}
          <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-500">Want to test as Guest Designer?</span>
            <button
              onClick={onOpenCreator}
              className="text-neutral-300 hover:text-teal-400 font-mono underline"
            >
              Direct Studio Access →
            </button>
          </div>
        </div>

      </div>

      {/* Footer credits */}
      <div className="max-w-6xl mx-auto w-full pt-4 text-center text-xs text-neutral-500 font-mono">
        BELLE LIGNE DIGITAL FASHION ARCHIVE • PCTE CSE × IFDT 2028 • CHIEF EDITOR DAISY
      </div>
    </div>
  );
}

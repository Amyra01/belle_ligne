import React, { useState } from 'react';
import { 
  Mail, Check, Sparkles, Heart, ArrowUp, Instagram, 
  Twitter, Youtube, Globe, Award, ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MAGAZINE_INFO } from '../data/magazineData';

export default function Footer({ onOpenQuiz, onOpenCMS, onExploreRunway, onOpen404 }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);

    // Micro-interaction celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#146872', '#2cb0bf', '#A65539', '#CBB279']
    });

    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#090A0D] text-white pt-16 pb-20 sm:pb-14 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Brand & Interdisciplinary Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-editorial text-4xl sm:text-5xl font-black lowercase tracking-tight">
              {MAGAZINE_INFO.title}
            </h2>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400">
              {MAGAZINE_INFO.subtitle}
            </p>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed max-w-sm">
              An interdisciplinary graduation project pairing Computer Science engineering with Fashion Design and visual curation. Bridging high-fashion editorial rigor with real-time 3D simulation and recommendation intelligence.
            </p>

            <div className="pt-2 text-xs text-neutral-300 space-y-1">
              <div><strong>Institution:</strong> {MAGAZINE_INFO.institution}</div>
              <div><strong>Team:</strong> Daisy (B.Tech CSE) • Ishika (B.Des Fashion)</div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-3">
              <a 
                href="#instagram" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center text-white transition-colors"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="#twitter" 
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center text-white transition-colors"
              >
                <Twitter size={15} />
              </a>
              <a 
                href="#youtube" 
                aria-label="YouTube Runway Livestream"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center text-white transition-colors"
              >
                <Youtube size={15} />
              </a>
              <a 
                href="#global" 
                aria-label="Global Edition"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-teal-600 flex items-center justify-center text-white transition-colors"
              >
                <Globe size={15} />
              </a>
            </div>
          </div>

          {/* Quick Magazine Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Magazine Sections
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <button onClick={onExploreRunway} className="hover:text-teal-400 transition-colors">
                  Live 3D Catwalk &amp; Ramp Show
                </button>
              </li>
              <li>
                <a href="#runway-reels" className="hover:text-teal-400 transition-colors">
                  Vertical Runway Reels (9:16)
                </a>
              </li>
              <li>
                <a href="#reader" className="hover:text-teal-400 transition-colors">
                  Glossy Flipbook Reader
                </a>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-teal-400 transition-colors">
                  Lookbook Swipe (Runway vs Street)
                </a>
              </li>
              <li>
                <a href="#editor-letter" className="hover:text-teal-400 transition-colors">
                  Editor's Letter (Ishika)
                </a>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-teal-400 transition-colors text-left">
                  AI Style Discovery Engine
                </button>
              </li>
              <li>
                <button onClick={onOpenCMS} className="hover:text-teal-400 transition-colors text-left">
                  Daisy's Editorial CMS &amp; Analytics
                </button>
              </li>
              <li>
                <button onClick={onOpen404} className="hover:text-teal-400 transition-colors text-left text-neutral-500 text-xs">
                  Archive 404 View
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription with Animated Ticket & Confetti */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold">
              The 2028 Dispatch
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive front-row runway alerts, designer interviews, and seasonal trend forecasts directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email address..."
                  className="w-full pl-10 pr-28 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-xs text-white focus:outline-none focus:border-teal-500 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow"
                >
                  Join
                </button>
              </div>

              {/* SUCCESS ANIMATION BANNER */}
              {subscribed && (
                <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-400/60 text-teal-200 text-xs flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center flex-none">
                    <Check size={12} />
                  </div>
                  <div>
                    <span className="font-bold">Welcome to the Front Row!</span>
                    <span className="block text-[11px] text-teal-300">You are subscribed to Belle Ligne Volume 12.</span>
                  </div>
                </div>
              )}
            </form>

            <div className="pt-2 text-[11px] font-mono text-neutral-500 flex flex-wrap gap-2">
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">MERN Stack</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">Python AI Microservice</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">Three.js 3D WebGL</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center space-x-2">
            <span>© 2028 Belle Ligne Magazine. All rights reserved.</span>
            <span>•</span>
            <span className="text-teal-400 font-semibold">Made by PCTE CSE × IFDT</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="font-mono text-[11px] text-teal-400">ISSN 2808-012X</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { ArrowRight, Sparkles, BookOpen, Flame, Play, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { MAGAZINE_INFO } from '../data/magazineData';

export default function HeroSection({ 
  onExploreRunway, 
  onOpenReader, 
  onOpenQuiz, 
  onOpenArticle,
  onWatchShow 
}) {
  const [videoError, setVideoError] = useState(false);

  // High quality runway video URL with local poster fallback
  const bgVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-runway-show-39878-large.mp4";

  return (
    <section id="hero" className="relative -mt-4 pt-12 pb-16 sm:pb-24 overflow-hidden rounded-3xl border border-neutral-300/40 dark:border-neutral-800/80 shadow-2xl">
      
      {/* 1. FULL-BLEED MUTED AUTOPLAYING RUNWAY VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/cover_teal.jpg"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-35 scale-105 filter saturate-150 transition-opacity duration-1000"
          >
            <source src={bgVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/cover_teal.jpg"
            alt="Hero runway fallback"
            className="w-full h-full object-cover opacity-25 filter blur-sm"
          />
        )}

        {/* Multi-layer Editorial Dark Gradient Overlay so text is 100% readable & high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090A0E] via-[#090A0E]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0E] via-transparent to-[#090A0E]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        
        {/* Editorial Sub-Masthead Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 text-[11px] font-mono tracking-widest uppercase text-neutral-300 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            <span className="font-semibold text-teal-300">Vol. 12 Summer / Autumn-Winter 2028</span>
          </div>
          <div className="text-neutral-400">PCTE Engineering (CSE) × Fashion Design Interdisciplinary Project</div>
          <div className="hidden md:block text-neutral-400">Milan • Paris • Tokyo • New York</div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-6 sm:mt-10">
          
          {/* Left Column: Staggered Editorial Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-teal-950/80 text-teal-300 text-xs font-semibold uppercase tracking-wider border border-teal-500/40 backdrop-blur-md"
            >
              <Sparkles size={13} className="text-teal-400" />
              <span>Digital Fashion Magazine &amp; Style Discovery Platform</span>
            </motion.div>

            {/* Staggered Line Headlines */}
            <div className="overflow-hidden space-y-1">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                The Future
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                <span className="italic font-light text-teal-300 font-serif">Is Now.</span>
              </motion.div>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-xl text-neutral-300 max-w-xl font-sans leading-relaxed font-light"
            >
              Weaving editorial storytelling with intelligent, personalized web technology. Step into our real-time <strong className="text-white font-semibold">3D interactive runway</strong>, explore glossy digital magazine flipbooks, and discover your tailored 2028 style identity.
            </motion.p>

            {/* Editorial Feature Highlights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs"
            >
              <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
                <div className="font-mono text-teal-400 font-bold uppercase text-[10px]">Lead Palette</div>
                <div className="font-editorial text-base font-bold text-white mt-0.5">Transformative Teal</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
                <div className="font-mono text-amber-400 font-bold uppercase text-[10px]">Silhouette</div>
                <div className="font-editorial text-base font-bold text-white mt-0.5">Origami Cut Streetwear</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm col-span-2 sm:col-span-1">
                <div className="font-mono text-emerald-400 font-bold uppercase text-[10px]">Ethos</div>
                <div className="font-editorial text-base font-bold text-white mt-0.5">Bio-Circularity &amp; Tech</div>
              </div>
            </motion.div>

            {/* Action Buttons with "Watch the Show" Cinema Trigger */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <button
                onClick={onWatchShow}
                data-cursor="PLAY"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-rose-600/30 hover:scale-105"
              >
                <Film size={16} />
                <span>Watch the Show</span>
              </button>

              <button
                onClick={onExploreRunway}
                className="px-6 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-teal-600/25 hover:scale-105"
              >
                <Flame size={16} />
                <span>Live 3D Ramp Walk</span>
              </button>

              <button
                onClick={onOpenReader}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 backdrop-blur-md transition-all"
              >
                <BookOpen size={16} />
                <span>Flipbook Reader</span>
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-4 py-3.5 rounded-full border border-dashed border-teal-400/60 text-teal-300 hover:bg-teal-950/40 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Style Quiz</span>
              </button>
            </motion.div>

            {/* Team Credits */}
            <div className="pt-4 border-t border-white/10 text-xs text-neutral-400 flex items-center space-x-4">
              <span>Submitted by: <strong className="text-white">Daisy</strong> (B.Tech CSE) &amp; <strong className="text-white">Ishika</strong> (B.Des Fashion)</span>
              <span>•</span>
              <span>IFDT PCTE</span>
            </div>

          </div>

          {/* Right Column: High Fashion 3D Tilt Cover Presentation with Subtle Parallax */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => onOpenArticle('trends-2028')}
              data-cursor="READ"
              className="group relative cursor-pointer max-w-sm w-full perspective-1000 transform transition-all duration-500 hover:rotate-1 hover:scale-105"
            >
              {/* Outer Magazine Drop Shadow */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(20,104,114,0.5)] border-4 border-white/10 backdrop-blur-sm">
                <img 
                  src="/images/cover_teal.jpg" 
                  alt="Belle Ligne Magazine Summer 2028 Cover"
                  className="w-full h-auto object-cover" 
                />

                {/* Shimmer Gloss Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/15 opacity-70 group-hover:opacity-30 transition-opacity" />

                {/* Floating Click-to-Read Callout */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 block">Cover Story 2028</span>
                    <span className="font-editorial text-sm font-bold">The Future Is Now</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>

              {/* Barcode Accent */}
              <div className="absolute -bottom-4 -right-4 p-2.5 rounded-lg bg-neutral-900 text-white shadow-xl border border-white/20 hidden sm:block">
                <div className="font-mono text-[9px] tracking-widest uppercase text-teal-400">ISSN 2808-012X</div>
                <div className="text-[10px] tracking-tighter font-mono font-bold text-neutral-300">||| | |||| | ||| ||||</div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Animated Marquee Ticker with Pause-On-Hover */}
      <div className="mt-12 sm:mt-16 py-3 bg-black/80 text-white overflow-hidden border-y border-white/10 group cursor-pointer">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] space-x-8 text-xs font-mono uppercase tracking-[0.25em]">
          <span>★ BELLE LIGNE VOL. 12</span>
          <span>TRANSFORMATIVE TEAL 2028</span>
          <span>PARIS FASHION WEEK LIVE 3D</span>
          <span>STREETWEAR EVOLVES: BOLDER &amp; STRUCTURED</span>
          <span>PCTE CSE &amp; FASHION INTERDISCIPLINARY PLATFORM</span>
          <span>ZERO-WASTE PATTERN CUTTING</span>
          <span>AI STYLE DISCOVERY &amp; RECOMMENDATION</span>
          <span>★ THE NEXT WAVE A/W 2028</span>
          <span>ORIGAMI COLLARS &amp; TACTICAL CARGO</span>
          <span>BIO-REGENERATIVE SILK</span>
        </div>
      </div>
    </section>
  );
}

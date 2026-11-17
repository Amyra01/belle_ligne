import React, { useState } from 'react';
import { 
  Sparkles, Palette, Flame, BookOpen, Shirt, 
  Dna, ArrowRight, Check, X, HelpCircle, Compass, Play, Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WelcomeGuideModal({ isOpen, onClose, onNavigate, onOpenTryOn, onOpenDna }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const guideSteps = [
    {
      title: "Welcome to Belle Ligne",
      badge: "Digital Fashion Platform",
      icon: Sparkles,
      color: "#146872",
      headline: "The Future of Digital Fashion Journalism",
      description: "Belle Ligne merges high-fashion editorial storytelling with interactive 3D WebGL technology and in-browser creative tools. Here is a quick 30-second tour of what you can do!",
      actionLabel: "Start Guided Tour →",
      onAction: () => setCurrentStep(1)
    },
    {
      title: "1. Interactive 3D Runway",
      badge: "Live 3D WebGL",
      icon: Flame,
      color: "#F43F5E",
      headline: "Experience Catwalk Ramp Walks in Real-Time",
      description: "Watch 3D models walk the catwalk with real-time camera tracking (front-row, close-up, orbit), dynamic lighting, and catwalk audio beats. You can switch garments and customize model looks.",
      actionLabel: "Try 3D Runway →",
      onAction: () => {
        onClose();
        if (onNavigate) onNavigate('runway');
      }
    },
    {
      title: "2. Create Your Own Magazine",
      badge: "In-Browser Studio",
      icon: Palette,
      color: "#D97706",
      headline: "Paint, Design & Publish to the Live Library",
      description: "Become a guest editor! Open our canvas design studio to draw with neon glow brushes, layer high-fashion typography, stamp runway models, upload your device gallery photos, and publish your own issue directly to our database.",
      actionLabel: "Launch Creator Studio →",
      onAction: () => {
        onClose();
        if (onNavigate) onNavigate('creator');
      }
    },
    {
      title: "3. Virtual Try-On & Outfits",
      badge: "Mannequin Lab",
      icon: Shirt,
      color: "#06B6D4",
      headline: "Build Your Dream Haute Couture Look",
      description: "Mix & match tops, bottoms, and cyber accessories on an interactive mannequin with customizable skin tones. Save your combinations directly into your personal wardrobe drawer.",
      actionLabel: "Open Try-On Lab →",
      onAction: () => {
        onClose();
        if (onOpenTryOn) onOpenTryOn();
      }
    },
    {
      title: "4. Style DNA & Flipbook Library",
      badge: "AI Discovery & Reading",
      icon: Dna,
      color: "#10B981",
      headline: "Discover Your Aesthetic & Read 12+ Issues",
      description: "Generate a downloadable Style DNA card sharing your aesthetic breakdown. Flip through 12+ glossy magazine volumes with built-in voice narration, trend timelines, and visionary designer spotlights.",
      actionLabel: "Start Exploring Now!",
      onAction: () => {
        confetti({ particleCount: 50, spread: 60 });
        onClose();
      }
    }
  ];

  const step = guideSteps[currentStep];
  const StepIcon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C0E14] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Glow ambient background */}
        <div 
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-500"
          style={{ backgroundColor: step.color }}
        />

        {/* Top Header */}
        <div className="p-5 border-b border-neutral-800 bg-[#11141D] flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2.5">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: `${step.color}25`, color: step.color }}
            >
              <StepIcon size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold block">
                {step.badge}
              </span>
              <h3 className="text-sm font-serif font-bold text-white">{step.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Close Guide"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 relative z-10">
          
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-white leading-tight">
              {step.headline}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {step.description}
            </p>
          </div>

          {/* Quick Shortcuts Grid (if on welcome step) */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => { onClose(); onNavigate('runway'); }}
                className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-teal-500/60 text-left transition-all group"
              >
                <div className="flex items-center space-x-1.5 text-rose-400 text-xs font-bold mb-1">
                  <Flame size={13} />
                  <span>3D Runway</span>
                </div>
                <p className="text-[10px] text-neutral-400">Live 3D model catwalk walk</p>
              </button>

              <button
                onClick={() => { onClose(); onNavigate('creator'); }}
                className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-teal-500/60 text-left transition-all group"
              >
                <div className="flex items-center space-x-1.5 text-amber-400 text-xs font-bold mb-1">
                  <Palette size={13} />
                  <span>Create Magazine</span>
                </div>
                <p className="text-[10px] text-neutral-400">Paint &amp; publish your own issue</p>
              </button>

              <button
                onClick={() => { onClose(); onOpenTryOn(); }}
                className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-teal-500/60 text-left transition-all group"
              >
                <div className="flex items-center space-x-1.5 text-teal-400 text-xs font-bold mb-1">
                  <Shirt size={13} />
                  <span>Try-On Lab</span>
                </div>
                <p className="text-[10px] text-neutral-400">Mannequin outfit builder</p>
              </button>

              <button
                onClick={() => { onClose(); onNavigate('flipbook'); }}
                className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-teal-500/60 text-left transition-all group"
              >
                <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-bold mb-1">
                  <BookOpen size={13} />
                  <span>Magazine Library</span>
                </div>
                <p className="text-[10px] text-neutral-400">Flip through 12+ issues</p>
              </button>
            </div>
          )}

          {/* Progress Indicators */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="flex items-center space-x-1.5">
              {guideSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentStep === i ? 'w-6 bg-teal-400' : 'w-2 bg-neutral-700'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-700 text-xs text-neutral-300 hover:text-white"
                >
                  Back
                </button>
              )}

              {currentStep < guideSteps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1 transition-all"
                >
                  <span>Next Step</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  onClick={step.onAction}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:brightness-110 text-neutral-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1 transition-all"
                >
                  <span>{step.actionLabel}</span>
                  <Check size={13} />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

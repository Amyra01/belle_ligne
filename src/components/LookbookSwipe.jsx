import React, { useState, useRef } from 'react';
import { Sparkles, MoveHorizontal, Bookmark, Eye, Check, Sliders } from 'lucide-react';

export default function LookbookSwipe({ onSaveLook, isSaved, onBack }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <section id="lookbook" className="py-12 sm:py-16 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800 gap-4">
        <div>
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/60 text-xs font-serif font-bold uppercase tracking-wider mb-3 hover:bg-teal-100 dark:hover:bg-teal-900 transition-all"
            >
              <span>← Back to Magazine</span>
            </button>
          )}
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold mb-1">
            <Sparkles size={14} />
            <span>Interactive Visual Lookbook</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white">
            Lookbook of the Week
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
            Swipe the divider to explore how high-fashion runway concept translates into real-world street architecture.
          </p>
        </div>

        {/* Save Look CTA */}
        <button
          onClick={onSaveLook}
          className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center space-x-2 transition-all ${
            isSaved 
              ? 'bg-amber-500 border-amber-400 text-white shadow-md' 
              : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-teal-500'
          }`}
        >
          {isSaved ? <Check size={14} /> : <Bookmark size={14} />}
          <span>{isSaved ? 'Look Saved' : 'Save This Look'}</span>
        </button>
      </div>

      {/* Interactive Drag Split View */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        data-cursor="SWIPE"
        className="relative w-full h-[480px] sm:h-[600px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-neutral-200 dark:border-neutral-800 shadow-2xl bg-neutral-950"
      >
        {/* RIGHT IMAGE (Street Translation - 100% width background) */}
        <div className="absolute inset-0">
          <img
            src="/images/feature_streetwear.jpg"
            alt="Streetwear Translation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          
          {/* Right Label Pill */}
          <div className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-widest font-bold">
            Street Translation
          </div>

          <div className="absolute bottom-6 right-6 z-10 text-right text-white max-w-xs">
            <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">A/W 2028 Commercial Cut</span>
            <h3 className="font-editorial text-2xl font-bold">Modular Parachute Cargo</h3>
            <p className="text-xs text-neutral-300 font-sans mt-1">
              Engineered ripstop, oversized volume, and concealed magnetic utility harness.
            </p>
          </div>
        </div>

        {/* LEFT IMAGE (Runway Concept - Clipped by Slider percentage) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src="/images/cover_teal.jpg"
            alt="Runway Haute Couture Concept"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Left Label Pill */}
          <div className="absolute top-6 left-6 z-10 px-4 py-1.5 rounded-full bg-teal-950/80 backdrop-blur-md border border-teal-400/50 text-teal-300 text-xs font-mono uppercase tracking-widest font-bold">
            Runway Haute Couture
          </div>

          <div className="absolute bottom-6 left-6 z-10 text-left text-white max-w-xs">
            <span className="text-[10px] font-mono uppercase text-teal-300 tracking-wider">Paris Couture Gala 2028</span>
            <h3 className="font-editorial text-2xl font-bold">Transformative Teal Gown</h3>
            <p className="text-xs text-neutral-300 font-sans mt-1">
              100% bio-silk faille, fluid 2.4m train, and asymmetric structural cowl collar.
            </p>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-white text-white flex items-center justify-center shadow-2xl backdrop-blur-md">
            <MoveHorizontal size={18} />
          </div>
        </div>

      </div>

      {/* Swipe Instruction Hint */}
      <div className="mt-3 flex items-center justify-center space-x-2 text-xs font-mono text-neutral-400">
        <MoveHorizontal size={14} className="animate-pulse" />
        <span>Drag the center line left or right to compare</span>
      </div>
    </section>
  );
}

import React from 'react';
import { X, ArrowLeft, Search, Sparkles, BookOpen } from 'lucide-react';

export default function Magazine404({ isOpen, onClose, onGoHome, onOpenSearch }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0F1116] rounded-3xl p-8 sm:p-10 border border-neutral-800 shadow-[0_0_60px_rgba(20,104,114,0.3)] text-white text-center overflow-hidden">
        
        {/* Subtle Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-[200px] font-editorial font-bold">404</span>
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono uppercase tracking-widest font-semibold mb-3">
          <Sparkles size={12} />
          <span>Editorial Archive Error</span>
        </div>

        <h1 className="font-editorial text-5xl sm:text-7xl font-black tracking-tight text-white mt-1">
          404
        </h1>
        <h2 className="font-editorial text-xl sm:text-2xl font-bold text-teal-300 mt-2">
          Issue Out of Print
        </h2>

        <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-sans leading-relaxed max-w-sm mx-auto">
          The editorial spread or look you requested has either walked off the catwalk or is currently being tailored for the upcoming 2029 season.
        </p>

        {/* Barcode Element */}
        <div className="my-6 py-2 px-4 inline-block bg-white text-black rounded-lg">
          <div className="font-mono text-[9px] uppercase tracking-widest">ERROR-404-BELLE-LIGNE</div>
          <div className="font-mono text-xs font-bold tracking-tighter">|||| | ||| || |||| | |||</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          <button
            onClick={() => {
              onClose();
              if (onGoHome) onGoHome();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg"
          >
            <ArrowLeft size={14} />
            <span>Return to Cover</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
          >
            <Search size={14} />
            <span>Search Stories</span>
          </button>
        </div>

      </div>
    </div>
  );
}

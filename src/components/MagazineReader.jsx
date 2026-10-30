import React, { useState } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, Volume2, VolumeX, 
  Maximize2, Share2, Bookmark, Eye, Sparkles, Layers, ZoomIn, ArrowLeft, X 
} from 'lucide-react';
import { MAGAZINE_INFO } from '../data/magazineData';

export default function MagazineReader({ onOpenArticle, onGoToLibrary }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [savedSpreads, setSavedSpreads] = useState([]);
  const [zoomedImage, setZoomedImage] = useState(null);

  const spreads = [
    {
      id: "cover-main",
      pageNumber: "Cover",
      type: "cover",
      title: "The Future Is Now",
      season: "SUMMER 2028 • VOL. 12",
      image: "/images/cover_teal.jpg",
      headline: "TRANSFORMATIVE TEAL & NEO-SILHOUETTES",
      articleId: "trends-2028",
      narrative: "Welcome to Belle Ligne Volume 12 directed by Daisy. Summer 2028 leads with Transformative Teal, uniting digital luminescence with liquid silk faille."
    },
    {
      id: "contents-spread",
      pageNumber: "02 - 03",
      type: "spread",
      title: "Contents & Editorial Note",
      season: "VOL. 12 • ISSUE 01",
      image: "/images/contents_style.jpg",
      headline: "STYLE BUILDS TOMORROW",
      articleId: "streetwear-evolves",
      narrative: "Our curated directory: Trends 2028, Streetwear Evolution, Visionary Designers, and Regenerative Textiles curated and directed by Daisy."
    },
    {
      id: "streetwear-feature",
      pageNumber: "04 - 05",
      type: "spread",
      title: "Feature: Streetwear Evolves",
      season: "A/W 2028 FOCUS",
      image: "/images/feature_streetwear.jpg",
      headline: "BOLDER • STRUCTURED • MORE EXPRESSIVE",
      articleId: "streetwear-evolves",
      narrative: "In 2028, streetwear isn't just a style, it is an architectural mindset. Think oversized silhouettes, tactical fabrics, and origami cuts."
    },
    {
      id: "menswear-nextwave",
      pageNumber: "06 - 07",
      type: "spread",
      title: "The Next Wave: Neo-Menswear",
      season: "A/W 2028 VOL. 12",
      image: "/images/cover_nextwave.jpg",
      headline: "FASHION BEYOND THE OBVIOUS",
      articleId: "the-next-wave",
      narrative: "The Next Wave explores origami tailoring in burnt terracotta, paired with cyber-tinted protective eyewear."
    },
    {
      id: "back-credits",
      pageNumber: "08 - 09",
      type: "credits",
      title: "Interdisciplinary Masthead & Research",
      season: "PCTE SYNOPSIS EDIT",
      image: "/images/cover_teal.jpg",
      headline: "WHERE FASHION MEETS ENGINEERING",
      articleId: "textile-innovations",
      narrative: "Belle Ligne brings together two disciplines that rarely share a classroom: fashion design and software engineering, curated by Daisy."
    }
  ];

  const currentSpread = spreads[currentPage];

  const nextPage = () => {
    if (currentPage < spreads.length - 1) {
      setCurrentPage(prev => prev + 1);
      stopNarration();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      stopNarration();
    }
  };

  const toggleSave = (spreadId) => {
    setSavedSpreads(prev => 
      prev.includes(spreadId) ? prev.filter(id => id !== spreadId) : [...prev, spreadId]
    );
  };

  const toggleNarration = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSpread.narrative);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const stopNarration = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#15171C] to-[#0A0C10] text-white p-4 sm:p-8 border border-neutral-800 shadow-2xl overflow-hidden">
      
      {/* Magazine Reader Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-neutral-800/80 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-teal-400 font-mono mb-1">
            <BookOpen size={14} />
            <span>Glossy Digital Issue Reader</span>
            <span className="text-neutral-500">•</span>
            <span>{MAGAZINE_INFO.volume}</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl text-white font-bold">
            Interactive Magazine Flipbook
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {onGoToLibrary && (
            <button
              onClick={onGoToLibrary}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              Open Full Library ({spreads.length} Spreads) →
            </button>
          )}

          <button
            onClick={toggleNarration}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isSpeaking 
                ? 'bg-teal-600 border-teal-400 text-white animate-pulse' 
                : 'bg-neutral-800/60 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title="Read Spread Aloud"
          >
            {isSpeaking ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{isSpeaking ? 'Listening...' : 'Listen to Spread'}</span>
          </button>

          <button
            onClick={() => toggleSave(currentSpread.id)}
            className={`p-2 rounded-full border transition-all ${
              savedSpreads.includes(currentSpread.id)
                ? 'bg-amber-600/30 border-amber-400 text-amber-300'
                : 'bg-neutral-800/60 border-neutral-700 text-neutral-400 hover:text-white'
            }`}
            title="Bookmark this spread"
          >
            <Bookmark size={15} fill={savedSpreads.includes(currentSpread.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Main 3D Magazine Spread Viewport */}
      <div className="relative my-8 flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
        
        {/* Navigation Buttons */}
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`absolute left-0 sm:left-4 z-20 p-3 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md transition-all ${
            currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-teal-600 hover:scale-110'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === spreads.length - 1}
          className={`absolute right-0 sm:right-4 z-20 p-3 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md transition-all ${
            currentPage === spreads.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-teal-600 hover:scale-110'
          }`}
          aria-label="Next Page"
        >
          <ChevronRight size={22} />
        </button>

        {/* 3D Physical Magazine Spread Container */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-[#111317] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-neutral-700/60 transition-all duration-500">
          
          {/* Left Page (Image Artwork & Gloss with Click-to-Zoom that HAS A CLOSE BUTTON) */}
          <div 
            onClick={() => setZoomedImage(currentSpread.image)}
            className="w-full md:w-1/2 relative bg-[#090A0D] min-h-[320px] sm:min-h-[440px] flex items-center justify-center overflow-hidden group cursor-zoom-in"
            title="Click to Zoom Picture (with Back button)"
          >
            <img 
              src={currentSpread.image} 
              alt={currentSpread.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none hidden md:block" />

            {/* Click to Zoom indicator */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={13} />
              <span>Zoom Picture</span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-teal-300">
              {currentSpread.season}
            </div>
          </div>

          {/* Right Page (Editorial Copy) */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#15171D] to-[#0E1014] relative">
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none hidden md:block" />

            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800">
                <span className="font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  Page {currentSpread.pageNumber}
                </span>
                <span className="tracking-widest uppercase text-[10px] text-neutral-400">
                  Edited by Daisy
                </span>
              </div>

              <div className="mt-4">
                <span className="text-[11px] uppercase tracking-widest text-amber-500 font-semibold">
                  {currentSpread.headline}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white font-bold mt-1 leading-snug">
                  {currentSpread.title}
                </h3>
              </div>

              <div className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-light">
                <p className="drop-cap">
                  {currentSpread.narrative}
                </p>
                <p className="mt-3 text-neutral-400 text-xs italic">
                  "Fashion is not static. It exists as an ongoing dialogue between physical silhouette and personal identity."
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 flex items-center justify-between">
              <button
                onClick={() => onOpenArticle(currentSpread.articleId)}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors group"
              >
                <span>Read Full Feature Article</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="text-[11px] font-mono text-neutral-400">
                Spread {currentPage + 1} of {spreads.length}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="flex items-center justify-center space-x-3 overflow-x-auto py-2">
        {spreads.map((spread, idx) => (
          <button
            key={spread.id}
            onClick={() => {
              setCurrentPage(idx);
              stopNarration();
            }}
            className={`relative rounded-lg overflow-hidden border transition-all duration-300 ${
              currentPage === idx
                ? 'w-20 h-14 border-teal-400 ring-2 ring-teal-500/40 scale-105'
                : 'w-16 h-12 border-neutral-700 opacity-50 hover:opacity-100 hover:border-neutral-500'
            }`}
          >
            <img 
              src={spread.image} 
              alt={spread.title} 
              className="w-full h-full object-cover" 
            />
            <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-center text-white py-0.5 font-mono">
              {spread.pageNumber}
            </span>
          </button>
        ))}
      </div>

      {/* ZOOM PICTURE MODAL WITH PROMINENT BACK & CLOSE BUTTONS */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
            <button
              onClick={() => setZoomedImage(null)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-teal-400 font-bold text-xs uppercase tracking-wider transition-all shadow-2xl hover:scale-105"
            >
              <ArrowLeft size={16} />
              <span>← Back to Flipbook</span>
            </button>

            <button
              onClick={() => setZoomedImage(null)}
              className="p-3 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors border border-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-w-4xl max-h-[85vh] p-2 flex items-center justify-center">
            <img src={zoomedImage} alt="Zoomed Spread" className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20" />
          </div>

          <div className="absolute bottom-6 inset-x-0 text-center text-xs text-neutral-400 font-mono">
            Press Esc or click "← Back to Flipbook" to return
          </div>
        </div>
      )}

    </div>
  );
}

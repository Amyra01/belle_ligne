import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn,
  Volume2, VolumeX, Bookmark, Star, Tag, BookOpen,
  Filter, Sparkles, Play, Eye
} from 'lucide-react';
import { MAGAZINES_CATALOG } from '../data/magazineData';

// ─────────────────────────────────────────────
// FEATURED HERO CAROUSEL
// ─────────────────────────────────────────────
function FeaturedCarousel({ magazines, onRead }) {
  const featured = magazines.filter(m => m.featured);
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % featured.length);
    }, 5000);
  }, [featured.length]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goTo = (idx) => { setActiveIdx(idx); resetTimer(); };
  const prev = () => { setActiveIdx(i => (i - 1 + featured.length) % featured.length); resetTimer(); };
  const next = () => { setActiveIdx(i => (i + 1) % featured.length); resetTimer(); };

  if (!featured.length) return null;
  const mag = featured[activeIdx];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl mb-12" style={{ minHeight: 480 }}>
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${mag.coverImage})`, filter: 'brightness(0.35) saturate(1.3)' }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${mag.accentColor}55 0%, #0A0C10cc 50%, #0A0C10ee 100%)`
      }} />
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: mag.accentColor }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-10 py-14" style={{ minHeight: 480 }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold tracking-[0.25em] px-3 py-1 rounded-full"
            style={{ background: mag.accentColor, color: '#fff' }}>
            ★ FEATURED
          </span>
          <span className="text-xs tracking-widest text-gray-400 font-mono">{mag.volume} · {mag.issue}</span>
          <span className="text-xs tracking-widest text-gray-400 font-mono">{mag.season}</span>
        </div>
        <h2 className="text-5xl font-black text-white mb-3 leading-tight" style={{
          fontFamily: 'Georgia, serif', letterSpacing: '-0.02em', maxWidth: 680
        }}>
          {mag.title}
        </h2>
        <p className="text-lg text-gray-300 mb-2 max-w-xl font-light italic">{mag.subtitle}</p>
        <p className="text-sm text-gray-400 mb-6 max-w-2xl leading-relaxed">{mag.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {mag.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10 tracking-wide">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onRead(mag)}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-widest transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: mag.accentColor, color: '#fff', boxShadow: `0 0 30px ${mag.accentColor}66` }}
          >
            <BookOpen size={16} /> READ NOW
          </button>
          <span className="text-gray-400 text-sm">{mag.pagesCount} pages · Ed. by {mag.editor}</span>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {featured.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 24 : 8, height: 8,
              background: i === activeIdx ? mag.accentColor : 'rgba(255,255,255,0.3)'
            }}
          />
        ))}
      </div>

      {/* Issue counter */}
      <div className="absolute top-5 right-5 z-20 text-xs font-mono text-gray-400">
        {activeIdx + 1} / {featured.length}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FILTER BAR
// ─────────────────────────────────────────────
function FilterBar({ magazines, activeFilter, onFilter }) {
  const allTags = ['All', 'Featured', ...new Set(magazines.flatMap(m => m.tags))];
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {allTags.slice(0, 12).map(tag => (
        <button
          key={tag}
          onClick={() => onFilter(tag)}
          className="px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-200 border"
          style={activeFilter === tag ? {
            background: '#146872', color: '#fff', borderColor: '#146872', boxShadow: '0 0 16px #14687244'
          } : {
            background: 'transparent', color: '#9ca3af', borderColor: 'rgba(255,255,255,0.12)'
          }}
        >
          {tag.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAGAZINE CARD
// ─────────────────────────────────────────────
function MagazineCard({ mag, onRead }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        transform: hovered ? 'scale(1.025)' : 'scale(1)',
        boxShadow: hovered
          ? `0 8px 48px ${mag.accentColor}55, 0 2px 16px #00000099`
          : '0 4px 24px #00000066',
        border: `1px solid ${hovered ? mag.accentColor : 'rgba(255,255,255,0.07)'}`,
        background: '#12151C',
        borderLeft: `3px solid ${mag.accentColor}`
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onRead(mag)}
    >
      {/* Cover image – 3:4 aspect ratio */}
      <div style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
        <img
          src={mag.coverImage}
          alt={mag.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          onError={e => { e.target.src = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80`; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, ${mag.accentColor}cc 0%, #0A0C10aa 50%, transparent 100%)`,
            opacity: hovered ? 1 : 0.7
          }}
        />
        {/* READ NOW hover button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-6 py-3 rounded-full text-sm font-black tracking-widest"
            style={{ background: '#146872', color: '#fff', boxShadow: '0 0 24px #14687288' }}>
            READ NOW →
          </span>
        </div>
        {/* Featured badge */}
        {mag.featured && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-yellow-500/90 text-black">
              <Star size={10} fill="black" /> FEATURED
            </span>
          </div>
        )}
        {/* Volume badge */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black/70 text-white border border-white/10">
            {mag.volume}
          </span>
        </div>
        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs tracking-widest font-mono" style={{ color: mag.accentColor }}>{mag.season}</span>
          </div>
          <h3 className="text-base font-black text-white leading-tight mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            {mag.title}
          </h3>
          <p className="text-xs text-gray-300 line-clamp-2 opacity-90">{mag.subtitle}</p>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-400">Ed. <span className="text-white font-semibold">{mag.editor}</span></span>
          <span className="text-xs font-mono" style={{ color: mag.accentColor }}>{mag.pagesCount} pgs</span>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {mag.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{
              background: `${mag.accentColor}22`, color: mag.accentColor,
              border: `1px solid ${mag.accentColor}44`
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ZOOM MODAL
// ─────────────────────────────────────────────
function ZoomModal({ image, headline, onClose, onBack }) {
  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.97)',
        backdropFilter: 'blur(12px)'
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-screen p-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={16} /> BACK TO MAGAZINE
          </button>
          <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">{headline}</span>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: '#146872', boxShadow: '0 0 20px #14687266' }}
          >
            <X size={16} /> CLOSE
          </button>
        </div>
        {/* Image */}
        <div className="flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <img
            src={image}
            alt={headline}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ boxShadow: '0 0 80px rgba(20,104,114,0.3)' }}
            onError={e => { e.target.src = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80`; }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SPREAD READER
// ─────────────────────────────────────────────
function SpreadReader({ mag, onBack }) {
  const defaultSpreads = [
    { page: 'Cover', image: mag.coverImage, headline: mag.title, text: mag.subtitle, season: mag.season },
    { page: '02 - 03', image: '/images/contents_style.jpg', headline: 'EDITORIAL DIRECTORY', text: 'Curated content by Daisy — trend reports, streetwear evolutions, and textile innovations.', season: 'Belle Ligne' },
    { page: '04 - 05', image: '/images/feature_streetwear.jpg', headline: 'RUNWAY FEATURE', text: 'Bolder, structured, and unapologetically expressive — street meets art on the global catwalk.', season: 'A/W Focus' },
    { page: '06 - 07', image: '/images/cover_nextwave.jpg', headline: 'THE NEXT WAVE', text: 'Avant-garde menswear subverting traditional codes with geometric lapels and protective cyber eyewear.', season: 'Tokyo Archive' }
  ];
  const spreads = (mag.spreads && mag.spreads.length) ? mag.spreads : defaultSpreads;

  const [idx, setIdx] = useState(0);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [animDir, setAnimDir] = useState('');

  const spread = spreads[idx];

  const navigate = (dir) => {
    const newIdx = dir === 'next' ? idx + 1 : idx - 1;
    if (newIdx < 0 || newIdx >= spreads.length) return;
    stopSpeech();
    setAnimDir(dir);
    setTimeout(() => { setIdx(newIdx); setAnimDir(''); }, 200);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const toggleNarration = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      stopSpeech();
    } else {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(`${spread.headline}. ${spread.text}`);
      utt.onend = () => setSpeaking(false);
      utt.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
      setSpeaking(true);
    }
  };

  useEffect(() => { return () => stopSpeech(); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0C10' }}>
      {/* Reader toolbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b border-white/10"
        style={{ background: '#0A0C10ee', backdropFilter: 'blur(16px)' }}>
        <button
          onClick={() => { stopSpeech(); onBack(); }}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
        >
          <ArrowLeft size={16} /> Back to Magazine Home
        </button>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-xs tracking-widest font-mono" style={{ color: mag.accentColor }}>{mag.volume} · {mag.issue}</p>
            <p className="text-sm font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>{mag.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleNarration}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-all"
            style={speaking
              ? { background: '#146872', borderColor: '#146872', color: '#fff' }
              : { background: 'transparent', borderColor: 'rgba(255,255,255,0.15)', color: '#9ca3af' }
            }
          >
            {speaking ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {speaking ? 'NARRATING' : 'NARRATE'}
          </button>
          <span className="text-xs font-mono text-gray-500">{idx + 1} / {spreads.length}</span>
        </div>
      </div>

      {/* Spread */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Image panel */}
        <div
          className="flex-1 relative rounded-xl overflow-hidden cursor-zoom-in group"
          style={{
            opacity: animDir ? 0 : 1, transition: 'opacity 0.2s',
            minHeight: 400,
            border: `1px solid ${mag.accentColor}33`,
            boxShadow: `0 0 60px ${mag.accentColor}22`
          }}
          onClick={() => setZoomedImg({ image: spread.image, headline: spread.headline })}
        >
          <img
            src={spread.image}
            alt={spread.headline}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ minHeight: 400, maxHeight: 640 }}
            onError={e => { e.target.src = `https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80`; }}
          />
          {/* Gradient */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(to right, #0A0C10 0%, transparent 30%, transparent 70%, #0A0C10 100%)` }}
          />
          {/* Zoom hint */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold text-white"
              style={{ background: '#146872' }}>
              <ZoomIn size={12} /> ZOOM
            </span>
          </div>
          {/* Season label */}
          <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: 'linear-gradient(to top, #0A0C10ee, transparent)' }}>
            <span className="text-xs font-mono tracking-widest" style={{ color: mag.accentColor }}>{spread.season}</span>
          </div>
        </div>

        {/* Text panel */}
        <div
          className="w-full lg:w-80 xl:w-96 flex flex-col justify-center px-8 py-6"
          style={{ opacity: animDir ? 0 : 1, transition: 'opacity 0.2s' }}
        >
          <div className="mb-2">
            <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">Page {spread.page}</span>
          </div>
          <div className="w-12 h-0.5 mb-6 rounded" style={{ background: mag.accentColor }} />
          <h2 className="text-2xl xl:text-3xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}>
            {spread.headline}
          </h2>
          <p className="text-base text-gray-300 leading-relaxed mb-8 font-light">{spread.text}</p>

          {/* Spread nav */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate('prev')}
              disabled={idx === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all border"
              style={idx === 0
                ? { borderColor: 'rgba(255,255,255,0.06)', color: '#374151', cursor: 'not-allowed' }
                : { borderColor: mag.accentColor, color: mag.accentColor, background: `${mag.accentColor}11` }
              }
            >
              <ChevronLeft size={16} /> PREV
            </button>
            <button
              onClick={() => navigate('next')}
              disabled={idx === spreads.length - 1}
              className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold transition-all"
              style={idx === spreads.length - 1
                ? { background: '#1f2937', color: '#374151', cursor: 'not-allowed' }
                : { background: mag.accentColor, color: '#fff', boxShadow: `0 0 20px ${mag.accentColor}44` }
              }
            >
              NEXT <ChevronRight size={16} />
            </button>
          </div>

          {/* Spread dots */}
          <div className="flex flex-wrap gap-2">
            {spreads.map((s, i) => (
              <button
                key={i}
                onClick={() => { stopSpeech(); setIdx(i); }}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === idx ? mag.accentColor : 'rgba(255,255,255,0.2)',
                  transform: i === idx ? 'scale(1.5)' : 'scale(1)'
                }}
              />
            ))}
          </div>

          {/* Mag info footer */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 mb-1">Curated by</p>
            <p className="text-sm font-bold text-white">{mag.editor} <span className="text-gray-500 font-normal">· Editorial Director</span></p>
            <p className="text-xs text-gray-500 mt-1">{mag.pagesCount} pages · Belle Ligne Magazine</p>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoomedImg && (
        <ZoomModal
          image={zoomedImg.image}
          headline={zoomedImg.headline}
          onClose={() => setZoomedImg(null)}
          onBack={() => { setZoomedImg(null); onBack(); }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN FLIPBOOK PAGE
// ─────────────────────────────────────────────
export default function FlipbookPage({ onBack, customMagazines = [] }) {
  const allMagazines = [...MAGAZINES_CATALOG, ...customMagazines];
  const [selectedMag, setSelectedMag] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredMags = allMagazines.filter(m => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return m.featured;
    return m.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()) ||
      m.theme?.toLowerCase().includes(activeFilter.toLowerCase());
  });

  // If a magazine is selected, show the reader
  if (selectedMag) {
    return <SpreadReader mag={selectedMag} onBack={() => setSelectedMag(null)} />;
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0C10', color: '#fff' }}>

      {/* ── TOP NAVIGATION BAR ── */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/8"
        style={{ background: '#0A0C10f0', backdropFilter: 'blur(20px)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-full border border-white/10 hover:border-teal-500/50 hover:bg-white/5"
        >
          <ArrowLeft size={16} /> Back to Magazine Home
        </button>
        <div className="flex items-center gap-3">
          <Sparkles size={18} style={{ color: '#146872' }} />
          <span className="text-sm font-black tracking-widest text-white"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>
            BELLE LIGNE
          </span>
          <span className="text-xs text-gray-500 tracking-widest font-mono">ARCHIVE</span>
        </div>
        <div className="text-xs text-gray-500 font-mono tracking-widest">
          {allMagazines.length} VOLUMES
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ── HEADER ── */}
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.35em] font-mono mb-3" style={{ color: '#146872' }}>
            EDITORIAL ARCHIVE · BELLE LIGNE DIGITAL MAGAZINE
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
            The Magazine
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto font-light italic">
            12 volumes of fashion-forward editorial journalism curated by Daisy
          </p>
          <div className="w-24 h-0.5 mx-auto mt-6 rounded" style={{ background: 'linear-gradient(90deg, transparent, #146872, transparent)' }} />
        </div>

        {/* ── FEATURED CAROUSEL ── */}
        <FeaturedCarousel magazines={allMagazines} onRead={setSelectedMag} />

        {/* ── SECTION TITLE ── */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'Georgia, serif' }}>
            All Volumes
          </h2>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-xs font-mono text-gray-500 tracking-widest">{filteredMags.length} ISSUES</span>
        </div>

        {/* ── FILTER BAR ── */}
        <FilterBar magazines={allMagazines} activeFilter={activeFilter} onFilter={setActiveFilter} />

        {/* ── MAGAZINE GRID ── */}
        {filteredMags.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No magazines match this filter.</p>
            <button onClick={() => setActiveFilter('All')}
              className="mt-4 px-6 py-2 rounded-full text-sm font-bold border border-teal-500/40 text-teal-400 hover:bg-teal-500/10 transition-all">
              Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMags.map(mag => (
              <MagazineCard key={mag.id} mag={mag} onRead={setSelectedMag} />
            ))}
          </div>
        )}

        {/* ── FOOTER ── */}
        <div className="mt-20 pt-10 border-t border-white/8 text-center">
          <p className="text-xs font-mono tracking-widest text-gray-600 mb-1">BELLE LIGNE DIGITAL MAGAZINE</p>
          <p className="text-xs text-gray-700">Editorial Director: Daisy · PCTE Institute of Engineering & Technology and Institute of Fashion Design & Technology</p>
        </div>
      </div>
    </div>
  );
}

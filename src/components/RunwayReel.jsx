import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, 
  Flame, Bookmark, ArrowUpRight, Heart, Share2, Check 
} from 'lucide-react';
import { RUNWAY_REELS_DATA } from '../data/magazineData';

export default function RunwayReel({ onSelectLook }) {
  const scrollContainerRef = useRef(null);
  const [activeMute, setActiveMute] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="runway-reels" className="py-12 sm:py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold mb-1">
            <Flame size={14} className="text-rose-500 animate-pulse" />
            <span>Interactive Runway Reels Showcase</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white">
            Runway Reels &amp; Catwalk Motions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-sans">
            Playable 9:16 high-fashion clips. Click the Play button or hover to watch models walk the catwalk with audio controls.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveMute(!activeMute)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center space-x-1.5 transition-all ${
              !activeMute ? 'bg-teal-600 border-teal-500 text-white' : 'bg-neutral-800 border-neutral-700 text-neutral-300'
            }`}
          >
            {!activeMute ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{!activeMute ? 'All Audio On' : 'Muted'}</span>
          </button>

          <button
            onClick={scrollLeft}
            className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors shadow-sm"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollRight}
            className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors shadow-sm"
            aria-label="Scroll Right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll-Snap Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch space-x-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {RUNWAY_REELS_DATA.map((reel) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            isMuted={activeMute}
            onToggleMute={() => setActiveMute(!activeMute)}
            onSelect={() => onSelectLook && onSelectLook(reel)}
          />
        ))}
      </div>
    </section>
  );
}

// Individual Vertical Reel Card with 100% Guaranteed Playback Controls
function ReelCard({ reel, isMuted, onToggleMute, onSelect }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  const [hasLiked, setHasLiked] = useState(false);

  // Play / Pause toggle
  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(err => {
        console.log('Play err', err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current && window.innerWidth >= 768) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && window.innerWidth >= 768) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes(l => l - 1);
      setHasLiked(false);
    } else {
      setLikes(l => l + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      data-cursor="PLAY"
      className="relative flex-none w-[270px] sm:w-[300px] h-[480px] sm:h-[520px] rounded-3xl overflow-hidden snap-center bg-black border border-neutral-200 dark:border-neutral-800 shadow-2xl group transition-all duration-300 hover:-translate-y-2 cursor-pointer"
    >
      {/* HTML5 Video Element with Native Poster */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* Dark Vignette Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40 pointer-events-none" />

      {/* Top Meta Badges & Controls */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
          {reel.tag}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute();
          }}
          className="p-2 rounded-full bg-black/60 text-white border border-white/20 hover:bg-black transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`w-14 h-14 rounded-full bg-teal-600/90 text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 border border-white/30 ${
          isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100 shadow-[0_0_25px_rgba(20,104,114,0.8)]'
        }`}>
          <Play size={24} className="ml-1" />
        </div>
      </div>

      {/* Bottom Look Details */}
      <div className="absolute bottom-4 inset-x-4 z-20 text-white space-y-1.5">
        <div className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold">
          {reel.collection}
        </div>
        <h3 className="font-editorial text-xl font-bold leading-tight group-hover:text-teal-300 transition-colors">
          {reel.title}
        </h3>
        <p className="text-xs text-neutral-300 font-sans line-clamp-2 font-light">
          {reel.description}
        </p>

        <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10 text-neutral-400">
          <button
            onClick={handleLike}
            className="flex items-center space-x-1.5 text-neutral-300 hover:text-rose-400 transition-colors"
          >
            <Heart size={14} className={hasLiked ? "text-rose-500 fill-rose-500" : ""} />
            <span className="font-mono text-[11px]">{likes.toLocaleString()}</span>
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect();
            }}
            className="flex items-center space-x-1 text-teal-300 hover:text-white font-medium text-[11px] uppercase tracking-wider font-mono"
          >
            <span>Inspect 3D</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

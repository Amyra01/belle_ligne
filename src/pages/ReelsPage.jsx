import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Play, Pause, Volume2, VolumeX, Heart, MessageSquare, 
  Share2, Bookmark, ChevronUp, ChevronDown, Sparkles, Check, Flame 
} from 'lucide-react';
import { RUNWAY_REELS_DATA } from '../data/magazineData';

export default function ReelsPage({ onBack, onSaveLook, savedLooks = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState(() => RUNWAY_REELS_DATA.map(r => r.likes));
  const [likedList, setLikedList] = useState([]);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);

  const activeReel = RUNWAY_REELS_DATA[activeIndex];

  // When changing reel, try to play
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay was paused pending user click:", err);
        setIsPlaying(false);
      });
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < RUNWAY_REELS_DATA.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : RUNWAY_REELS_DATA.length - 1));
  };

  const handleLike = (idx) => {
    if (likedList.includes(idx)) {
      setLikedList(prev => prev.filter(i => i !== idx));
      setLikes(prev => {
        const copy = [...prev];
        copy[idx] -= 1;
        return copy;
      });
    } else {
      setLikedList(prev => [...prev, idx]);
      setLikes(prev => {
        const copy = [...prev];
        copy[idx] += 1;
        return copy;
      });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white flex flex-col justify-between py-4 px-4 sm:px-8 animate-in fade-in duration-300">
      
      {/* Top Header Navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-4 border-b border-neutral-800/80">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105"
        >
          <ArrowLeft size={16} />
          <span>← Back to Magazine Home</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
          <Flame size={14} className="text-rose-500" />
          <span>Haute Couture Reels Theater ({activeIndex + 1}/{RUNWAY_REELS_DATA.length})</span>
        </div>

        <button
          onClick={toggleMute}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            !isMuted ? 'bg-teal-600 border-teal-500 text-white' : 'bg-white/10 border-white/20 text-neutral-300'
          }`}
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          <span>{isMuted ? 'Muted' : 'Audio Live'}</span>
        </button>
      </div>

      {/* Main Centered Video Hub */}
      <div className="flex-1 flex items-center justify-center my-4 relative">
        
        {/* Navigation Buttons (Desktop) */}
        <div className="hidden sm:flex flex-col space-y-3 mr-6">
          <button
            onClick={handlePrev}
            className="p-3.5 rounded-full bg-white/10 hover:bg-teal-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110"
            title="Previous Reel"
          >
            <ChevronUp size={22} />
          </button>
          <button
            onClick={handleNext}
            className="p-3.5 rounded-full bg-white/10 hover:bg-teal-600 text-white transition-all border border-white/20 shadow-lg hover:scale-110"
            title="Next Reel"
          >
            <ChevronDown size={22} />
          </button>
        </div>

        {/* 9:16 Vertical Video Frame */}
        <div 
          onClick={togglePlay}
          className="relative w-full max-w-[360px] sm:max-w-[420px] h-[580px] sm:h-[680px] rounded-3xl overflow-hidden bg-black border-2 border-neutral-700/80 shadow-[0_0_60px_rgba(20,104,114,0.4)] group select-none cursor-pointer"
        >
          {/* HTML5 Native Video Element */}
          <video
            ref={videoRef}
            key={activeReel.id}
            src={activeReel.videoUrl}
            poster={activeReel.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Large Center Play / Pause Indicator */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <div className="w-20 h-20 rounded-full bg-teal-600/95 text-white flex items-center justify-center shadow-[0_0_35px_rgba(20,104,114,0.9)] border-2 border-white/40 scale-105">
                <Play size={36} className="ml-1.5" />
              </div>
            </div>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />

          {/* Top Info */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
            <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-wider text-teal-300 font-bold">
              {activeReel.tag}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="p-2 rounded-full bg-black/70 text-white border border-white/20 hover:bg-neutral-800"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>

          {/* Right Action Stack */}
          <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center space-y-4 pointer-events-auto">
            {/* Like */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(activeIndex);
              }}
              className="flex flex-col items-center text-white"
            >
              <div className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                likedList.includes(activeIndex)
                  ? 'bg-rose-600 text-white border-rose-400 scale-110 shadow-lg shadow-rose-600/40'
                  : 'bg-black/60 text-white border-white/20 hover:bg-black'
              }`}>
                <Heart size={22} fill={likedList.includes(activeIndex) ? "currentColor" : "none"} />
              </div>
              <span className="text-[10px] font-mono mt-1 text-neutral-300 font-bold">
                {likes[activeIndex].toLocaleString()}
              </span>
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSaveLook) onSaveLook(activeReel.id);
              }}
              className={`flex flex-col items-center text-white ${
                savedLooks.includes(activeReel.id) ? 'text-amber-400' : ''
              }`}
            >
              <div className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black">
                <Bookmark size={22} fill={savedLooks.includes(activeReel.id) ? "currentColor" : "none"} />
              </div>
              <span className="text-[10px] font-mono mt-1 text-neutral-300">Save</span>
            </button>

            {/* Share */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="flex flex-col items-center text-white"
            >
              <div className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black">
                {copied ? <Check size={22} className="text-emerald-400" /> : <Share2 size={22} />}
              </div>
              <span className="text-[10px] font-mono mt-1 text-neutral-300">
                {copied ? 'Copied' : 'Share'}
              </span>
            </button>
          </div>

          {/* Bottom Details */}
          <div className="absolute bottom-5 left-5 right-20 z-20 text-white space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-teal-300 font-bold">
              {activeReel.collection}
            </div>
            <h3 className="font-editorial text-2xl font-bold leading-tight">
              {activeReel.title}
            </h3>
            <p className="text-xs text-neutral-300 font-sans line-clamp-2 font-light">
              {activeReel.description}
            </p>
            <div className="text-[11px] text-neutral-400 pt-1 font-mono">
              Designed by <strong className="text-white">{activeReel.designer}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* Reel Thumbnails Bottom Bar */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-center space-x-2.5 overflow-x-auto py-2">
        {RUNWAY_REELS_DATA.map((reel, idx) => (
          <button
            key={reel.id}
            onClick={() => setActiveIndex(idx)}
            className={`w-14 sm:w-16 h-20 rounded-xl overflow-hidden border-2 flex-none transition-all ${
              activeIndex === idx
                ? 'border-teal-400 ring-2 ring-teal-500 scale-105'
                : 'border-neutral-800 opacity-50 hover:opacity-100'
            }`}
          >
            <img src={reel.poster} alt={reel.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

    </div>
  );
}

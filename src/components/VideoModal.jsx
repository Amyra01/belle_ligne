import React, { useRef, useState, useEffect } from 'react';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  RotateCcw, Sliders, Sparkles, Film 
} from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reliable high-fashion runway video source with fallback
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-runway-show-39878-large.mp4";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);

    const format = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    setCurrentTime(format(curr));
    setDuration(format(dur));
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1.0, 1.25, 1.5, 0.75];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const next = speeds[nextIdx];
    setPlaybackRate(next);
    if (videoRef.current) videoRef.current.playbackRate = next;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black border border-neutral-800 shadow-[0_0_80px_rgba(20,104,114,0.4)] flex flex-col group"
      >
        {/* Top Header Controls */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-teal-600/80 text-white text-[10px] font-mono uppercase tracking-widest font-bold">
              <Film size={12} />
              <span>Belle Ligne Cinema</span>
            </span>
            <span className="text-xs text-neutral-300 font-sans hidden sm:inline">
              Vol. 12 Runway Master Broadcast
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Element */}
        <div className="relative aspect-video w-full bg-neutral-950 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            src={videoUrl}
            poster="/images/cover_teal.jpg"
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Big Center Play/Pause indicator on click */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20 scale-110 transition-transform">
                <Play size={32} className="ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Custom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col space-y-2 pointer-events-auto">
          
          {/* Scrubber Timeline */}
          <div 
            onClick={handleSeek}
            className="w-full h-2 rounded-full bg-white/20 hover:h-3 transition-all cursor-pointer relative overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-amber-400"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between text-white text-xs pt-1">
            <div className="flex items-center space-x-3">
              <button onClick={togglePlay} className="p-1 hover:text-teal-400 transition-colors">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button onClick={toggleMute} className="p-1 hover:text-teal-400 transition-colors">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <span className="font-mono text-[11px] text-neutral-400">
                {currentTime} / {duration}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSpeedChange}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 font-mono text-[11px] border border-white/10"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1 hover:text-teal-400 transition-colors"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

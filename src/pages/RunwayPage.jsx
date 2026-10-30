import React from 'react';
import { ArrowLeft, Sparkles, Volume2, VolumeX, Maximize2, ShieldCheck, Bookmark, Flame } from 'lucide-react';
import Runway3D from '../components/Runway3D';

export default function RunwayPage({ onBack, isMusicPlaying, toggleMusic, onSaveLook, savedLooks }) {
  return (
    <div className="min-h-screen bg-[#07090D] text-white py-6 px-4 sm:px-8 animate-in fade-in duration-300">
      
      {/* Top Prominent Back Navigation Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105"
        >
          <ArrowLeft size={16} />
          <span>← Back to Magazine Home</span>
        </button>

        <div className="text-center hidden sm:block">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
            <Flame size={14} className="text-rose-500 animate-pulse" />
            <span>Dedicated Live 3D Catwalk &amp; Ramp Show</span>
          </div>
          <h1 className="font-editorial text-2xl font-bold">Milan &amp; Paris Satellite Stage</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isMusicPlaying
                ? 'bg-teal-600 border-teal-500 text-white shadow-lg'
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
          >
            {isMusicPlaying ? <Volume2 size={14} className="animate-bounce" /> : <VolumeX size={14} />}
            <span>{isMusicPlaying ? 'Beat Playing' : 'Runway Beat'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Stage Container */}
      <div className="max-w-7xl mx-auto mt-6">
        <Runway3D
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
          onSaveLook={onSaveLook}
          savedLooks={savedLooks}
        />
      </div>

      {/* Bottom Information */}
      <div className="max-w-7xl mx-auto mt-8 p-6 rounded-2xl bg-[#111319] border border-neutral-800 text-xs text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <strong className="text-white block text-sm font-editorial">Haute Couture 3D Mechanics</strong>
          Procedural catwalk cross-step kinematic algorithm designed by Daisy. Includes dynamic pelvic sway, fabric inertia, and camera flash reactions.
        </div>
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
        >
          Return to Overview
        </button>
      </div>

    </div>
  );
}

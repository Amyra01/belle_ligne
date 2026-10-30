import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Upload, Sparkles, Check, ArrowRight, 
  ExternalLink, Sun, RefreshCw, Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ColorPaletteFinderModal({ isOpen, onClose, onSelectArticle }) {
  const fileInputRef = useRef(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const [selectedSeasonTone, setSelectedSeasonTone] = useState('summer-cool');
  const [analyzing, setAnalyzing] = useState(false);

  if (!isOpen) return null;

  const skinTonePresets = [
    {
      id: 'summer-cool',
      label: 'Oceanic Cool / Summer',
      toneSample: '#F0D5C9',
      recommendedPalette: [
        { name: 'Transformative Teal', hex: '#146872', rationale: 'Creates striking high-fashion resonance with cool undertones' },
        { name: 'Cyber Cyan', hex: '#4EC7D4', rationale: 'Highlights cheekbone contours and digital silhouettes' },
        { name: 'Midnight Charcoal', hex: '#1E232B', rationale: 'Grounds dramatic evening outerwear' }
      ],
      matchingArticleId: 'trends-2028',
      articleTitle: 'Trends 2028: Transformative Teal Leads The Horizon'
    },
    {
      id: 'autumn-warm',
      label: 'Terracotta Warm / Autumn',
      toneSample: '#B87B57',
      recommendedPalette: [
        { name: 'Burnt Terracotta', hex: '#A65539', rationale: 'Harmonizes with warm golden undertones' },
        { name: 'Liquid Champagne Gold', hex: '#D4AF37', rationale: 'Brings out natural radiance for runway galas' },
        { name: 'Obsidian Matte', hex: '#121418', rationale: 'Contrast anchor for origami lapels' }
      ],
      matchingArticleId: 'streetwear-evolves',
      articleTitle: 'Streetwear Evolves: Bolder, Structured & Art-Infused'
    },
    {
      id: 'deep-rich',
      label: 'Deep Ebony / Winter Glow',
      toneSample: '#3B261D',
      recommendedPalette: [
        { name: 'Electric Cyan Glow', hex: '#06B6D4', rationale: 'Spectacular luminescence on deep complexions' },
        { name: 'Milanese Pure Gold', hex: '#F59E0B', rationale: 'Opulent contrast engineered for high evening editorial' },
        { name: 'Sculptured Emerald', hex: '#10B981', rationale: 'Regenerative bio-pigment that commands presence' }
      ],
      matchingArticleId: 'the-next-wave',
      articleTitle: 'The Next Wave: Avant-Garde Menswear & Neo-Tailoring'
    },
    {
      id: 'spring-neutral',
      label: 'Natural Flax / Spring Fresh',
      toneSample: '#DDB697',
      recommendedPalette: [
        { name: 'Bio-Linen Sage', hex: '#84A98C', rationale: 'Understated botanical calm for sustainable tailoring' },
        { name: 'Warm Terracotta', hex: '#C0804D', rationale: 'Sculptural warmth for origami cuts' },
        { name: 'Soft Cream', hex: '#F9F8F6', rationale: 'Clean editorial backdrop' }
      ],
      matchingArticleId: 'sustainability-future',
      articleTitle: 'Sustainability: Bio-Circularity & Regenerative Fibers'
    }
  ];

  const currentMatch = skinTonePresets.find(p => p.id === selectedSeasonTone);

  const handleUploadSelfie = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setUserPhoto(event.target.result);
      setTimeout(() => {
        setAnalyzing(false);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      }, 700);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0C0E14] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-[#12151D]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Palette size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                AI Color Palette Finder &amp; Undertone Matcher
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                Curated by Daisy • Belle Ligne Color Lab 2028
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Step 1: Upload or pick preset */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
              Step 1: Upload A Selfie or Pick Your Undertone
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Upload Box */}
              <div className="sm:col-span-5">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-teal-500/40 hover:border-teal-400 rounded-2xl p-4 text-center cursor-pointer bg-teal-950/20 hover:bg-teal-950/30 transition-all flex flex-col items-center justify-center space-y-2 h-36 relative overflow-hidden"
                >
                  {userPhoto ? (
                    <>
                      <img src={userPhoto} alt="Selfie" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-[11px] font-mono text-white bg-black/70 px-2.5 py-1 rounded-full">
                          Change Selfie
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={20} className="text-teal-400" />
                      <p className="text-xs font-semibold text-white">Upload Your Photo</p>
                      <p className="text-[9px] text-neutral-400">AI scans undertones locally in browser</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadSelfie}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Or Select Presets */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-2">
                {skinTonePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedSeasonTone(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedSeasonTone === preset.id
                        ? 'border-teal-400 bg-teal-950/50 ring-1 ring-teal-400 shadow'
                        : 'border-neutral-800 bg-[#12151D] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: preset.toneSample }}
                      />
                      <span className="text-[11px] font-semibold text-white truncate">{preset.label.split('/')[0]}</span>
                    </div>
                    <span className="text-[9px] text-teal-400 block mt-1 font-mono">{preset.label.split('/')[1] || 'Palette'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Harmonious 2028 Palettes */}
          {analyzing ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono text-teal-300">Extracting chromatic undertones &amp; matching articles...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                  Step 2: Your Flattering Haute Palette
                </span>
                <span className="text-[10px] font-mono text-neutral-400">{currentMatch.label}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentMatch.recommendedPalette.map((col) => (
                  <div
                    key={col.hex}
                    className="p-3.5 rounded-2xl border border-neutral-800 bg-[#12151D] flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className="w-8 h-8 rounded-xl shadow-md border border-white/20 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div>
                        <span className="text-xs font-serif font-bold text-white block">{col.name}</span>
                        <span className="text-[10px] font-mono text-neutral-400">{col.hex}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-300 leading-relaxed font-sans">{col.rationale}</p>
                  </div>
                ))}
              </div>

              {/* Step 3: Direct Link to Matching Magazine Article */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-teal-950/60 to-neutral-900 border border-teal-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-teal-400 font-bold block mb-0.5">
                    Recommended Magazine Story For Your Undertone:
                  </span>
                  <h4 className="text-sm font-serif font-bold text-white">
                    {currentMatch.articleTitle}
                  </h4>
                </div>

                <button
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(currentMatch.matchingArticleId);
                      onClose();
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shrink-0 transition-all hover:scale-105"
                >
                  <span>Read Story</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

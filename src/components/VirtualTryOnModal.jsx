import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Bookmark, RotateCcw, Download, Share2, 
  Check, Shirt, Layers, Heart, Palette, Wand2, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VirtualTryOnModal({ isOpen, onClose, onSaveLook }) {
  const [selectedTop, setSelectedTop] = useState('teal-silk-cape');
  const [selectedBottom, setSelectedBottom] = useState('origami-cargo');
  const [selectedAccessory, setSelectedAccessory] = useState('cyber-visor');
  const [selectedTone, setSelectedTone] = useState('#221714'); // Mannequin skin tone
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  // Garment Assets
  const tops = [
    {
      id: 'teal-silk-cape',
      name: 'Bioluminescent Teal Cape',
      designer: 'Daisy Atelier 2028',
      type: 'Haute Couture',
      color: '#146872',
      accent: 'Liquid Silk Faille'
    },
    {
      id: 'origami-hood-jacket',
      name: 'Origami Storm Jacket',
      designer: 'Kenji Sato x IFDT',
      type: 'Avant-Garde Streetwear',
      color: '#1F2937',
      accent: 'Structured Ripstop'
    },
    {
      id: 'milan-gold-corset',
      name: 'Milanese Gold Velvet Bodice',
      designer: 'Elena Rossi',
      type: 'Evening Gala',
      color: '#D4AF37',
      accent: 'Botanical Gold Velvet'
    },
    {
      id: 'eco-linen-tunic',
      name: 'Zero-Waste Raw Linen Tunic',
      designer: 'BioWeave Labs',
      type: 'Sustainable Circular',
      color: '#84A98C',
      accent: 'Organic Flax'
    }
  ];

  const bottoms = [
    {
      id: 'origami-cargo',
      name: 'Modular Pleated Cargo Parachute',
      designer: 'Kurogane Tokyo',
      type: 'Streetwear',
      color: '#111215',
      accent: 'Articulated Knee Pleats'
    },
    {
      id: 'teal-fluid-trousers',
      name: 'Teal Silk Wide-Leg Palazzo',
      designer: 'Daisy Couture',
      type: 'Haute Couture',
      color: '#0E4950',
      accent: 'High-Waist Drape'
    },
    {
      id: 'architectural-skirt',
      name: 'Geometric Asymmetric Fold Skirt',
      designer: 'PCTE Fashion Lab',
      type: 'Avant-Garde',
      color: '#A65539',
      accent: 'Terracotta Wool'
    }
  ];

  const accessories = [
    {
      id: 'cyber-visor',
      name: 'Obsidian Protective Cyber Visor',
      designer: 'Belle Ligne Optical',
      color: '#000000',
      type: 'Eyewear'
    },
    {
      id: 'gold-harness',
      name: 'Sculptured Brass Spine Harness',
      designer: 'Atelier Daisy',
      color: '#D4AF37',
      type: 'Jewelry'
    },
    {
      id: 'bio-scarf',
      name: 'Spirulina Cyan Floating Scarf',
      designer: 'BioDesign Studio',
      color: '#4EC7D4',
      type: 'Neckwear'
    }
  ];

  const currentTop = tops.find(t => t.id === selectedTop);
  const currentBottom = bottoms.find(b => b.id === selectedBottom);
  const currentAcc = accessories.find(a => a.id === selectedAccessory);

  const handleSave = () => {
    setIsSaved(true);
    if (onSaveLook) {
      onSaveLook({
        id: `look-${Date.now()}`,
        top: currentTop,
        bottom: currentBottom,
        accessory: currentAcc,
        date: new Date().toLocaleDateString()
      });
    }
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0D0F14] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-[#12151C]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Shirt size={16} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                Virtual Try-On &amp; Mannequin Outfit Builder
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
                Interactive Wardrobe Lab • Directed by Daisy
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

        {/* Studio Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 overflow-y-auto">
          
          {/* Mannequin Live View */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-gradient-to-b from-[#151922] to-[#0A0C10] p-6 rounded-2xl border border-neutral-800/80 relative min-h-[400px]">
            
            {/* Tone Selector */}
            <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-black/40 px-2 py-1 rounded-full border border-neutral-800">
              <span className="text-[9px] font-mono text-neutral-400">Tone:</span>
              {['#F2DDD2', '#D39C7E', '#8C5A3E', '#2A1D17'].map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedTone === tone ? 'scale-125 border-white' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: tone }}
                />
              ))}
            </div>

            {/* Stylized Interactive Mannequin SVG */}
            <div className="relative w-44 h-80 flex flex-col items-center">
              
              {/* Head & Accessory */}
              <div 
                className="w-14 h-18 rounded-full border-2 border-white/20 relative shadow-inner flex items-center justify-center"
                style={{ backgroundColor: selectedTone }}
              >
                {/* Accessory Overlay */}
                {selectedAccessory === 'cyber-visor' && (
                  <div className="w-12 h-3.5 bg-neutral-900 border border-teal-400 rounded-sm shadow-md shadow-teal-500/50 mt-1 flex items-center justify-center">
                    <span className="w-2 h-0.5 bg-cyan-400 animate-pulse" />
                  </div>
                )}
                {selectedAccessory === 'gold-harness' && (
                  <div className="absolute -bottom-2 w-14 h-4 border-b-2 border-amber-400 rounded-full" />
                )}
                {selectedAccessory === 'bio-scarf' && (
                  <div className="absolute -bottom-3 w-16 h-5 bg-cyan-500/80 rounded-full blur-[1px]" />
                )}
              </div>

              {/* Neck & Shoulders */}
              <div className="w-6 h-4" style={{ backgroundColor: selectedTone }} />

              {/* Selected Top Garment */}
              <motion.div
                key={selectedTop}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-28 rounded-2xl relative shadow-xl border border-white/20 flex flex-col justify-between p-2 overflow-hidden"
                style={{ backgroundColor: currentTop.color }}
              >
                <div className="text-[8px] font-mono uppercase text-white/70 tracking-widest text-center truncate">
                  {currentTop.name}
                </div>
                <div className="w-full flex justify-center">
                  <span className="w-8 h-1 bg-white/30 rounded-full" />
                </div>
                <div className="text-[7px] text-white/50 text-center font-mono">
                  {currentTop.accent}
                </div>
              </motion.div>

              {/* Waist band */}
              <div className="w-20 h-2 bg-neutral-900 border-x border-neutral-700" />

              {/* Selected Bottom Garment */}
              <motion.div
                key={selectedBottom}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-28 h-36 rounded-b-2xl relative shadow-lg border border-white/10 flex flex-col justify-between p-2"
                style={{ backgroundColor: currentBottom.color }}
              >
                <div className="w-full h-1 bg-white/20 rounded-full" />
                <div className="text-[8px] font-mono text-center text-white/70 truncate">
                  {currentBottom.name}
                </div>
                {/* Leg Split */}
                <div className="flex justify-between px-2 pt-2">
                  <div className="w-4 h-14 border-x border-white/10 rounded-b-lg" />
                  <div className="w-4 h-14 border-x border-white/10 rounded-b-lg" />
                </div>
              </motion.div>

            </div>

            {/* Look Summary Pill */}
            <div className="mt-4 p-2.5 rounded-xl bg-black/60 border border-neutral-800 text-center w-full">
              <span className="text-[11px] font-serif font-bold text-teal-300 block">
                {currentTop.name} × {currentBottom.name}
              </span>
              <span className="text-[9px] font-mono text-neutral-400">
                Accessory: {currentAcc.name}
              </span>
            </div>
          </div>

          {/* Garment Selector Rack */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Tops Carousel */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                1. Select Haute Tops &amp; Outerwear
              </span>
              <div className="grid grid-cols-2 gap-2">
                {tops.map((top) => (
                  <button
                    key={top.id}
                    onClick={() => setSelectedTop(top.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedTop === top.id
                        ? 'border-teal-400 bg-teal-950/40 ring-1 ring-teal-400 shadow'
                        : 'border-neutral-800 bg-[#12151C] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: top.color }} />
                      <span className="text-xs font-semibold text-white truncate">{top.name}</span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block mt-1 font-mono">{top.designer}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottoms Carousel */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                2. Select Bottoms &amp; Tailored Silhouettes
              </span>
              <div className="grid grid-cols-3 gap-2">
                {bottoms.map((btm) => (
                  <button
                    key={btm.id}
                    onClick={() => setSelectedBottom(btm.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedBottom === btm.id
                        ? 'border-teal-400 bg-teal-950/40 ring-1 ring-teal-400 shadow'
                        : 'border-neutral-800 bg-[#12151C] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" style={{ backgroundColor: btm.color }} />
                      <span className="text-[11px] font-semibold text-white truncate">{btm.name}</span>
                    </div>
                    <span className="text-[9px] text-neutral-400 block mt-1 font-mono">{btm.type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                3. High-Concept Accessories
              </span>
              <div className="grid grid-cols-3 gap-2">
                {accessories.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccessory(acc.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedAccessory === acc.id
                        ? 'border-teal-400 bg-teal-950/40 ring-1 ring-teal-400 shadow'
                        : 'border-neutral-800 bg-[#12151C] hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-[11px] font-semibold text-white block truncate">{acc.name}</span>
                    <span className="text-[9px] text-teal-400 block mt-0.5 font-mono">{acc.type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:brightness-110 text-white font-serif font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2 transition-all"
              >
                {isSaved ? <Check size={14} /> : <Bookmark size={14} />}
                <span>{isSaved ? 'Look Added to Wardrobe!' : 'Save This Mannequin Look'}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedTop('teal-silk-cape');
                  setSelectedBottom('origami-cargo');
                  setSelectedAccessory('cyber-visor');
                }}
                className="px-4 py-3 rounded-xl border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white text-xs font-semibold"
              >
                Reset
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

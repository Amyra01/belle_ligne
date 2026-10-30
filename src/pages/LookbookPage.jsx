import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Bookmark, Check, ZoomIn, X } from 'lucide-react';
import LookbookSwipe from '../components/LookbookSwipe';

export default function LookbookPage({ onBack, onSaveLook, savedLooks = [] }) {
  const [zoomedImage, setZoomedImage] = useState(null);

  const lookbookGallery = [
    { title: "Transformative Teal Silk Faille", image: "/images/cover_teal.jpg", cat: "Haute Couture" },
    { title: "Modular Tactical Parachute Cargo", image: "/images/feature_streetwear.jpg", cat: "Streetwear" },
    { title: "Origami Lapel Trench & Cyber Shades", image: "/images/cover_nextwave.jpg", cat: "Menswear" },
    { title: "Bio-Circular Peace Silk Moodboard", image: "/images/contents_style.jpg", cat: "Sustainable" }
  ];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white py-6 px-4 sm:px-8 animate-in fade-in duration-300">
      
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
            <Sparkles size={14} />
            <span>Dedicated Lookbook &amp; Style Comparison Studio</span>
          </div>
          <h1 className="font-editorial text-2xl font-bold">Runway vs Street Architecture</h1>
        </div>

        <button
          onClick={() => onSaveLook('lookbook-week')}
          className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all ${
            savedLooks.includes('lookbook-week')
              ? 'bg-amber-500 border-amber-400 text-white shadow-md'
              : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
          }`}
        >
          {savedLooks.includes('lookbook-week') ? <Check size={14} /> : <Bookmark size={14} />}
          <span>{savedLooks.includes('lookbook-week') ? 'Saved' : 'Save Collection'}</span>
        </button>
      </div>

      {/* Main Interactive Swipe Section */}
      <div className="max-w-7xl mx-auto mt-6">
        <LookbookSwipe
          onSaveLook={() => onSaveLook('lookbook-week')}
          isSaved={savedLooks.includes('lookbook-week')}
          onBack={onBack}
        />
      </div>

      {/* High-Fashion Gallery Grid with Click-to-Zoom */}
      <div className="max-w-7xl mx-auto mt-12">
        <h3 className="font-editorial text-2xl font-bold mb-6">Seasonal Lookbook Archive</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setZoomedImage(item.image)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-zoom-in"
            >
              <img src={item.image} alt={item.title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={14} />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">{item.cat}</span>
                <h4 className="font-editorial text-lg font-bold leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Modal with Back & Close */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
            <button
              onClick={() => setZoomedImage(null)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-teal-400 font-bold text-xs uppercase tracking-wider transition-all shadow-2xl hover:scale-105"
            >
              <ArrowLeft size={16} />
              <span>← Back to Lookbook</span>
            </button>

            <button
              onClick={() => setZoomedImage(null)}
              className="p-3 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors border border-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-w-4xl max-h-[85vh] p-2 flex items-center justify-center">
            <img src={zoomedImage} alt="Zoomed Look" className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20" />
          </div>
        </div>
      )}

    </div>
  );
}

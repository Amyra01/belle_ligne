import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Image as ImageIcon, Trash2, 
  Download, Share2, Sparkles, Bookmark, Check, Move
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MoodBoardMakerPage({ onBack, onSaveBoard }) {
  const [boardName, setBoardName] = useState('My Autumn 2028 Inspo');
  const [boardElements, setBoardElements] = useState([
    { id: '1', title: 'Teal Silk Draping', image: '/images/cover_teal.jpg', note: 'Liquid high sheen for evening' },
    { id: '2', title: 'Origami Storm Collar', image: '/images/feature_streetwear.jpg', note: 'Geometric tailoring' },
    { id: '3', title: 'Obsidian Lapel Trench', image: '/images/cover_nextwave.jpg', note: 'Menswear silhouette' },
    { id: '4', title: 'Sustainable Bio-Flax', image: '/images/contents_style.jpg', note: 'Eco circularity' }
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const stockPins = [
    { title: 'Paris Noir Velvet', image: '/images/cover_paris_noir.jpg' },
    { title: 'Milanese Pure Gold', image: '/images/cover_milan_gold.jpg' },
    { title: 'Tokyo Cyber Cargo', image: '/images/cover_tokyo_cyber.jpg' },
    { title: 'Raw Organic Linen', image: '/images/cover_sustainable_linen.jpg' },
    { title: 'Runway Gala Walk', image: '/images/model_walk_1.jpg' },
    { title: 'Avant-Garde Origami', image: '/images/cover_avant_garde.jpg' }
  ];

  const handleAddPin = (pin) => {
    const newElement = {
      id: `pin-${Date.now()}`,
      title: pin.title,
      image: pin.image,
      note: noteInput || 'Pinned from Belle Ligne archive'
    };
    setBoardElements(prev => [...prev, newElement]);
    setNoteInput('');
    confetti({ particleCount: 20, spread: 40 });
  };

  const handleRemove = (id) => {
    setBoardElements(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveBoard = () => {
    setIsSaved(true);
    if (onSaveBoard) {
      onSaveBoard({
        title: boardName,
        itemsCount: boardElements.length,
        savedAt: new Date().toISOString()
      });
    }
    confetti({ particleCount: 45, spread: 60 });
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white py-8 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-serif tracking-wider transition-colors"
        >
          <ArrowLeft size={14} className="text-teal-400" />
          <span>Return to Magazine</span>
        </button>

        <div className="text-center">
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="text-lg sm:text-xl font-editorial font-bold bg-transparent text-center border-b border-dashed border-teal-500/50 focus:outline-none focus:border-teal-400 text-white"
          />
          <span className="text-[10px] font-mono text-teal-400 block mt-0.5">
            Click title to rename • Mini-Pinterest Editorial Mood Board
          </span>
        </div>

        <button
          onClick={handleSaveBoard}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-teal-600/30 transition-all hover:scale-105"
        >
          {isSaved ? <Check size={14} /> : <Bookmark size={14} />}
          <span>{isSaved ? 'Board Saved!' : 'Save Mood Board'}</span>
        </button>
      </div>

      {/* Main Grid: Pin Palette + Canvas Board */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Stock Archive Pins Palette */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-[#11141D] border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
              Available Fashion Spreads
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">+ Add to board</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {stockPins.map((pin, i) => (
              <div
                key={i}
                onClick={() => handleAddPin(pin)}
                className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer hover:border-teal-400 transition-all p-1"
              >
                <img src={pin.image} alt={pin.title} className="w-full h-24 object-cover rounded-xl group-hover:scale-105 transition-transform" />
                <span className="text-[10px] text-neutral-200 block mt-1 font-semibold truncate px-1">{pin.title}</span>
                <div className="absolute inset-0 bg-teal-950/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-xs font-bold text-teal-200">+ Pin Item</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800/80">
            <span className="text-[10px] text-neutral-400 block mb-1">Custom Caption Note for Next Pin</span>
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="e.g. Color inspo for runway cape..."
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>

        {/* Right: The Dynamic Mood Board Canvas */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0D0F15] border border-neutral-800/80 min-h-[500px]">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/60">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Board Layout: {boardElements.length} Pinned References
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono">Curated by Daisy</span>
          </div>

          {boardElements.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <ImageIcon size={32} className="text-neutral-600 mx-auto" />
              <p className="text-xs text-neutral-400">Your mood board is empty. Click any spread on the left to pin it!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {boardElements.map((el) => (
                <div
                  key={el.id}
                  className="group relative rounded-2xl overflow-hidden bg-[#131722] border border-neutral-800 hover:border-teal-500/50 transition-all p-2 flex flex-col justify-between shadow-xl"
                >
                  <div className="relative rounded-xl overflow-hidden mb-2">
                    <img src={el.image} alt={el.title} className="w-full h-44 object-cover" />
                    <button
                      onClick={() => handleRemove(el.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                      title="Remove Pin"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="px-1 space-y-0.5">
                    <h4 className="text-xs font-serif font-bold text-white truncate">{el.title}</h4>
                    <p className="text-[10px] text-teal-300/80 font-mono truncate">{el.note}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

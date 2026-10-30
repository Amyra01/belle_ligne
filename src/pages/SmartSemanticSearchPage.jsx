import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Mic, MicOff, Filter, 
  Sparkles, SlidersHorizontal, BookOpen, Clock, Tag
} from 'lucide-react';
import { ARTICLES } from '../data/magazineData';

export default function SmartSemanticSearchPage({ onBack, onSelectArticle }) {
  const [query, setQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTone, setSelectedTone] = useState('all');
  const [isListening, setIsListening] = useState(false);

  // Pre-configured intelligent intent queries
  const smartShortcuts = [
    { label: 'Something comfy for a college fest', query: 'campus streetwear comfort oversized' },
    { label: 'Bioluminescent teal gala couture', query: 'transformative teal silk couture gala' },
    { label: 'Zero-waste origami tailoring', query: 'origami zero-waste sustainable pattern' },
    { label: 'Avant-garde menswear sunglasses', query: 'avant-garde menswear eyewear lapel' },
  ];

  // Voice recognition simulation / native SpeechRecognition hook
  const handleToggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice dictation is supported in modern Chrome/Edge browsers. Trying voice simulation...');
      setQuery('something comfy for a college fest');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  // Smart Semantic Scoring matching
  const filteredArticles = ARTICLES.filter(art => {
    const q = query.toLowerCase().trim();
    if (!q) return true;

    // Check tags, title, excerpt, full content keywords, and semantic intent
    const titleMatch = art.title.toLowerCase().includes(q);
    const excerptMatch = art.excerpt.toLowerCase().includes(q);
    const tagMatch = art.tags.some(t => t.toLowerCase().includes(q));
    const contentMatch = art.content.some(c => c.toLowerCase().includes(q));

    // Semantic conceptual mapping
    let semanticBonus = false;
    if (q.includes('college') || q.includes('fest') || q.includes('comfy')) {
      semanticBonus = art.category === 'campus' || art.category === 'streetwear';
    }
    if (q.includes('eco') || q.includes('earth') || q.includes('green') || q.includes('sustainable')) {
      semanticBonus = art.category === 'sustainable';
    }
    if (q.includes('evening') || q.includes('gala') || q.includes('prom') || q.includes('party')) {
      semanticBonus = art.category === 'runway';
    }

    return titleMatch || excerptMatch || tagMatch || contentMatch || semanticBonus;
  }).filter(art => {
    if (selectedCategory !== 'all' && art.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090D] text-white py-8 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Top Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between pb-6 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-serif tracking-wider transition-colors"
        >
          <ArrowLeft size={14} className="text-teal-400" />
          <span>Back to Magazine</span>
        </button>

        <div className="text-right">
          <span className="font-editorial text-lg font-bold text-white block">belle ligne</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
            AI Semantic Search Engine &amp; Voice Stylist
          </span>
        </div>
      </div>

      {/* Main Search Input */}
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        
        <div className="relative flex items-center">
          <Search size={18} className="absolute left-4 text-teal-400 pointer-events-none" />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by meaning, mood, or occasion (e.g. 'something comfy for a college fest')..."
            className="w-full pl-12 pr-14 py-4 rounded-2xl bg-[#11141E] border border-neutral-700/80 text-sm text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 shadow-2xl transition-all"
          />

          <button
            onClick={handleToggleVoice}
            className={`absolute right-3 p-2.5 rounded-xl transition-all ${
              isListening ? 'bg-rose-600 text-white animate-pulse' : 'bg-neutral-800 hover:bg-neutral-700 text-teal-400'
            }`}
            title="Search with Voice"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        </div>

        {/* Semantic Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center space-x-1 mr-1">
            <Sparkles size={11} className="text-teal-400" />
            <span>AI Prompts:</span>
          </span>
          {smartShortcuts.map((sc, i) => (
            <button
              key={i}
              onClick={() => setQuery(sc.query)}
              className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 hover:text-teal-300 hover:border-teal-500/60 transition-colors"
            >
              "{sc.label}"
            </button>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 pt-3 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-mono uppercase text-neutral-400">Category:</span>
          {['all', 'runway', 'streetwear', 'sustainable', 'textiles', 'campus'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Results Feed */}
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
        <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800 font-mono">
          <span>Found {filteredArticles.length} Editorial Stories</span>
          {query && <span>Intent Filter: "{query}"</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle && onSelectArticle(art.id)}
              className="p-4 rounded-2xl bg-[#11141E] border border-neutral-800 hover:border-teal-500/60 transition-all cursor-pointer group flex space-x-4 items-center"
            >
              <img
                src={art.coverImage}
                alt={art.title}
                className="w-24 h-24 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="space-y-1 overflow-hidden">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block">
                  {art.categoryLabel}
                </span>
                <h4 className="text-sm font-serif font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2">
                  {art.title}
                </h4>
                <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono">
                  <span>{art.readTime}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

import React from 'react';
import { Flame, TrendingUp, ArrowRight, Eye, Bookmark, Sparkles } from 'lucide-react';
import { EDITORIAL_ANALYTICS } from '../data/magazineData';

export default function TrendingStrip({ onSelectArticle }) {
  const topTrending = EDITORIAL_ANALYTICS.topTrending;

  const articleMap = {
    'Trends 2028: Transformative Teal': 'trends-2028',
    'Streetwear Evolves: Bolder & Structured': 'streetwear-evolves',
    'The Next Wave: Avant-Garde Menswear': 'the-next-wave',
    'Sustainability: Circular Bio-Fibers': 'sustainability-future',
  };

  return (
    <div id="trending-strip" className="relative w-full rounded-2xl bg-gradient-to-r from-teal-950/90 via-neutral-900 to-neutral-950 p-4 sm:p-5 border border-teal-500/30 text-white shadow-xl overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Badge */}
        <div className="flex items-center space-x-2.5 flex-none">
          <div className="p-2 rounded-xl bg-teal-600/80 text-white shadow-lg shadow-teal-600/30">
            <TrendingUp size={16} />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-widest text-teal-300 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Trending Now</span>
            </div>
            <div className="text-xs text-neutral-400 font-sans">
              Real-time reader engagement &amp; saves
            </div>
          </div>
        </div>

        {/* Trending Stories Horizontal Scroll */}
        <div className="flex items-center space-x-3 overflow-x-auto w-full lg:w-auto py-1 scrollbar-none">
          {topTrending.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectArticle && onSelectArticle(articleMap[item.title] || 'trends-2028')}
              data-cursor="READ"
              className="group flex-none flex items-center space-x-3 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-400/50 cursor-pointer transition-all duration-200"
            >
              <span className="font-editorial text-sm font-bold text-teal-400 group-hover:text-white">
                #{idx + 1}
              </span>
              <div className="text-left">
                <div className="text-xs font-semibold text-white group-hover:text-teal-300 transition-colors whitespace-nowrap">
                  {item.title}
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-neutral-400 font-mono">
                  <span>{(item.views / 1000).toFixed(1)}k views</span>
                  <span>•</span>
                  <span>{item.score} score</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-neutral-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

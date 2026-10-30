import React, { useState } from 'react';
import { 
  Sparkles, Bookmark, Clock, ArrowRight, Eye, 
  Flame, Shirt, Leaf, Award, Cpu, Compass 
} from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/magazineData';

export default function EditorialFeed({ onSelectArticle, savedArticles, toggleSaveArticle }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = selectedCategory === 'all' 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <section id="stories" className="py-12 sm:py-16">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-300 dark:border-neutral-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold mb-1">
            <Sparkles size={14} />
            <span>Curated Editorial Dispatches</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white">
            Stories &amp; Trend Forecasts
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-md'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, idx) => {
          const isSaved = savedArticles.includes(article.id);
          const isLarge = idx === 0 || idx === 1;

          return (
            <div
              key={article.id}
              className={`group relative rounded-2xl overflow-hidden bg-white dark:bg-[#121419] border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                isLarge ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Image & Badges */}
                <div 
                  onClick={() => onSelectArticle(article.id)}
                  className="relative h-64 sm:h-72 w-full overflow-hidden cursor-pointer"
                >
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
                    {article.categoryLabel}
                  </div>

                  {/* Bookmark Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(article.id);
                    }}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md border transition-all ${
                      isSaved
                        ? 'bg-amber-500 text-white border-amber-400'
                        : 'bg-black/50 text-white border-white/20 hover:bg-black/80'
                    }`}
                    title="Bookmark Story"
                  >
                    <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
                  </button>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 text-white flex items-center justify-between text-xs">
                    <span className="font-mono text-teal-300 text-[10px] tracking-wider uppercase">{article.date}</span>
                    <span className="flex items-center space-x-1 text-neutral-300 text-[11px]">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold mb-1">
                    Index #{article.index}
                  </div>
                  
                  <h3 
                    onClick={() => onSelectArticle(article.id)}
                    className="font-editorial text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors cursor-pointer leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-sans line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  By {article.author}
                </span>

                <button
                  onClick={() => onSelectArticle(article.id)}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>Read Feature</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}

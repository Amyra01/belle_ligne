import React, { useState } from 'react';
import { Search, X, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { ARTICLES, CATEGORIES } from '../data/magazineData';

export default function SearchModal({ isOpen, onClose, onSelectArticle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const quickTags = ["Transformative Teal", "Streetwear", "Origami Lapel", "Bio-Circularity", "Smart Fabrics", "PCTE"];

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      article.title.toLowerCase().includes(term) ||
      article.subtitle.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.tags.some(t => t.toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121419] rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-3.5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search trends, designers, fabrics, or issue stories..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Quick Tag Suggestions */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase text-neutral-400 mr-1">Trending:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-600 dark:hover:text-teal-400 border border-neutral-200 dark:border-neutral-700 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-neutral-400">
              <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No stories found matching "{searchTerm}"</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onClose();
                  onSelectArticle(article.id);
                }}
                className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <img src={article.coverImage} alt={article.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-teal-600 dark:text-teal-400 font-bold">
                      {article.categoryLabel}
                    </span>
                    <h4 className="font-editorial text-sm font-bold text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-1">{article.excerpt}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

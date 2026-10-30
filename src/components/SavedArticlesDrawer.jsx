import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/magazineData';

export default function SavedArticlesDrawer({ isOpen, onClose, savedArticles, toggleSaveArticle, onSelectArticle }) {
  if (!isOpen) return null;

  const bookmarkedItems = ARTICLES.filter(a => savedArticles.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#121419] border-l border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 flex flex-col justify-between text-neutral-900 dark:text-white animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-2">
                <Bookmark size={18} className="text-teal-600 dark:text-teal-400" />
                <h3 className="font-editorial text-xl font-bold">Your Reading Wardrobe</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-neutral-500 mt-2">
              {bookmarkedItems.length} {bookmarkedItems.length === 1 ? 'feature' : 'features'} saved for offline reading
            </div>

            {/* List */}
            <div className="mt-6 space-y-3 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
              {bookmarkedItems.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <BookOpen size={36} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-2" />
                  <p className="text-sm">No saved articles yet.</p>
                  <p className="text-xs mt-1 text-neutral-500">
                    Click the bookmark icon on any story or spread to add it to your collection.
                  </p>
                </div>
              ) : (
                bookmarkedItems.map((article) => (
                  <div
                    key={article.id}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-teal-500/50 bg-neutral-50 dark:bg-neutral-900/40 flex items-center justify-between gap-3 group transition-all"
                  >
                    <img 
                      src={article.coverImage} 
                      alt={article.title} 
                      className="w-14 h-14 rounded-lg object-cover cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectArticle(article.id);
                      }}
                    />
                    <div 
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectArticle(article.id);
                      }}
                    >
                      <span className="text-[10px] font-mono uppercase text-teal-600 dark:text-teal-400 font-bold block">
                        {article.categoryLabel}
                      </span>
                      <h4 className="font-editorial text-sm font-bold truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {article.title}
                      </h4>
                      <div className="text-[11px] text-neutral-400 truncate">
                        {article.readTime} • By {article.author}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveArticle(article.id)}
                      className="p-1.5 text-neutral-400 hover:text-rose-500 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-mono">Belle Ligne Vol. 12</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold"
            >
              Close Wardrobe
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

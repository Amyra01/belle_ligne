import React, { useState } from 'react';
import { 
  X, BarChart3, TrendingUp, Users, BookOpen, PlusCircle, 
  Calendar, CheckCircle, Clock, Eye, Bookmark, Sparkles, Sliders
} from 'lucide-react';
import { EDITORIAL_ANALYTICS, ARTICLES, CATEGORIES } from '../data/magazineData';

export default function EditorialCMS({ isOpen, onClose, onArticleCreated }) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'create' | 'articles'
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState('runway');
  const [newAuthor, setNewAuthor] = useState('Ishika (Editorial Director)');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: `custom-${Date.now()}`,
      index: `0${ARTICLES.length + 1}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Exclusive digital magazine editorial dispatch.',
      category: newCategory,
      categoryLabel: CATEGORIES.find(c => c.id === newCategory)?.name || 'Editorial',
      author: newAuthor,
      readTime: '4 min read',
      date: 'Autumn 2028',
      featured: true,
      coverImage: '/images/cover_teal.jpg',
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      excerpt: newContent.slice(0, 140) + '...',
      content: [newContent || 'Published via Daisy & Ishika Belle Ligne CMS.'],
      pullQuote: 'Created with Belle Ligne No-Code Editorial CMS.',
      designerCredits: 'Belle Ligne Interdisciplinary Collective'
    };

    if (onArticleCreated) {
      onArticleCreated(created);
    }

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setNewTitle('');
      setNewSubtitle('');
      setNewContent('');
      setNewTags('');
      setActiveTab('articles');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#121419] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white my-8 overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-5 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-400 font-bold mb-0.5">
              <span>Belle Ligne Editorial Studio</span>
              <span>•</span>
              <span>Daisy (CSE Lead) & Ishika (IFDT) CMS Module</span>
            </div>
            <h2 className="font-editorial text-2xl font-bold">
              Content Management & Analytics Dashboard
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 px-6">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'analytics'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 size={15} />
            <span>Reader Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'create'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <PlusCircle size={15} />
            <span>Publish New Story</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'articles'
                ? 'border-teal-600 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BookOpen size={15} />
            <span>Published Library ({ARTICLES.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">Total Readers</div>
                  <div className="font-editorial text-2xl font-bold text-neutral-900 dark:text-white">{EDITORIAL_ANALYTICS.totalReaders}</div>
                  <div className="text-[10px] text-emerald-500 font-medium mt-1">↑ +18.4% this month</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">3D Runway Plays</div>
                  <div className="font-editorial text-2xl font-bold text-teal-600 dark:text-teal-400">{EDITORIAL_ANALYTICS.runway3dViews}</div>
                  <div className="text-[10px] text-teal-500 font-medium mt-1">Catwalk engagement peak</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">Article Saves</div>
                  <div className="font-editorial text-2xl font-bold text-amber-500">{EDITORIAL_ANALYTICS.totalArticleSaves}</div>
                  <div className="text-[10px] text-amber-500 font-medium mt-1">Reader bookmarks</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">Avg Read Time</div>
                  <div className="font-editorial text-2xl font-bold text-neutral-900 dark:text-white">{EDITORIAL_ANALYTICS.avgReadTime}</div>
                  <div className="text-[10px] text-neutral-400 font-medium mt-1">Deep editorial depth</div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-[11px] uppercase font-mono text-neutral-400 mb-1">Active Subscribers</div>
                  <div className="font-editorial text-2xl font-bold text-neutral-900 dark:text-white">{EDITORIAL_ANALYTICS.activeSubscribers}</div>
                  <div className="text-[10px] text-emerald-500 font-medium mt-1">Global circulation</div>
                </div>
              </div>

              {/* Trending Performance Table */}
              <div>
                <h3 className="font-editorial text-lg font-bold mb-4 flex items-center space-x-2">
                  <TrendingUp size={16} className="text-teal-600 dark:text-teal-400" />
                  <span>Story Performance & Recommendation Affinity</span>
                </h3>

                <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-100 dark:bg-neutral-900 text-neutral-500 uppercase font-mono text-[10px]">
                      <tr>
                        <th className="p-3.5">Headline</th>
                        <th className="p-3.5">Total Views</th>
                        <th className="p-3.5">Saves / Bookmarks</th>
                        <th className="p-3.5">AI Engine Score</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-sans">
                      {EDITORIAL_ANALYTICS.topTrending.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                          <td className="p-3.5 font-medium text-neutral-900 dark:text-white">{item.title}</td>
                          <td className="p-3.5 text-neutral-500">{item.views.toLocaleString()}</td>
                          <td className="p-3.5 text-neutral-500">{item.saves.toLocaleString()}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-mono font-bold">
                              {item.score}
                            </span>
                          </td>
                          <td className="p-3.5 text-emerald-500 font-semibold">● Trending Now</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CREATE STORY */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateArticle} className="space-y-4 max-w-2xl mx-auto animate-in fade-in duration-200">
              {publishSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500 flex items-center space-x-2 text-xs font-semibold">
                  <CheckCircle size={16} />
                  <span>Article published successfully to the Belle Ligne feed!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sculptural Knitwear: The New Tactical Silhouette"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Subtitle / Excerpt</label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="A short punchy editorial summary for the cover and feed..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Author Credit</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Content / Editorial Copy</label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Draft the article text here. You can include trend analysis, runway notes, and styling direction..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Runway, Streetwear, 2028 Trends, Knitwear, Paris"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
                >
                  Publish to Live Magazine
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PUBLISHED ARTICLES LIST */}
          {activeTab === 'articles' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              {ARTICLES.map((article) => (
                <div 
                  key={article.id} 
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between hover:border-teal-500 transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
                >
                  <div className="flex items-center space-x-4">
                    <img src={article.coverImage} alt={article.title} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <div className="text-[10px] font-mono uppercase text-teal-600 dark:text-teal-400 font-bold">
                        {article.categoryLabel} • {article.date}
                      </div>
                      <h4 className="font-editorial text-base font-bold text-neutral-900 dark:text-white">
                        {article.title}
                      </h4>
                      <div className="text-xs text-neutral-500">By {article.author} • {article.readTime}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-medium">
                      Published
                    </span>
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

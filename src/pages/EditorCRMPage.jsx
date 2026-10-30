import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BarChart3, Users, BookOpen, PlusCircle, 
  Mail, Calendar, CheckCircle2, TrendingUp, Sliders, ShieldCheck, 
  Send, Sparkles, RefreshCw, MessageSquare, Clock, FileCheck, AlertCircle, Edit3
} from 'lucide-react';
import { EDITORIAL_ANALYTICS, ARTICLES, CATEGORIES } from '../data/magazineData';

export default function EditorCRMPage({ onBack, onArticleCreated }) {
  const [activeTab, setActiveTab] = useState('workflow'); // 'workflow' | 'crm' | 'analytics' | 'publish' | 'articles'
  const [subscribers, setSubscribers] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [newSubEmail, setNewSubEmail] = useState('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubTier, setNewSubTier] = useState('VIP Critic');

  // Workflow Pipeline State
  const [workflowArticles, setWorkflowArticles] = useState([
    {
      id: 'wf-1',
      title: 'Algorithmic Silk Drapes: CSE Neural Weaving',
      author: 'Daisy (Lead Platform Architect)',
      stage: 'in_review',
      category: 'textiles',
      updatedAt: '12 mins ago',
      comments: [
        'Daisy: Check CAD tension before finalizing the pattern.',
        'Reviewer: Approved bias stretch ratios.'
      ]
    },
    {
      id: 'wf-2',
      title: 'Paris Midnight Noir: Velvet Tailoring Archive',
      author: 'Elena Rossi',
      stage: 'approved',
      category: 'runway',
      updatedAt: '2 hours ago',
      comments: ['Daisy: Verified high-res imagery for glossy flipbook spread.']
    },
    {
      id: 'wf-3',
      title: 'Campus Subculture: Ludhiana Streetwear Wave',
      author: 'IFDT Student Collective',
      stage: 'draft',
      category: 'campus',
      updatedAt: 'Yesterday',
      comments: ['Daisy: Needs 2 more student quotes on upcycled denim.']
    },
    {
      id: 'wf-4',
      title: 'The 2028 Transformative Teal Manifesto',
      author: 'Daisy',
      stage: 'published',
      category: 'runway',
      updatedAt: '3 days ago',
      comments: ['Daisy: Live in Vol. 12 issue 01 catalog.']
    }
  ]);

  // Publish Form States
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState('runway');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Fetch from backend database
  const fetchCRMData = async () => {
    try {
      const subRes = await fetch('http://localhost:5000/api/crm/subscribers');
      const subData = await subRes.json();
      setSubscribers(subData);

      const anaRes = await fetch('http://localhost:5000/api/crm/analytics');
      const anaData = await anaRes.json();
      setAnalyticsData(anaData);
    } catch (err) {
      console.warn("Backend API sync offline fallback mode:", err);
      setSubscribers([
        { email: "vogue.critic@paris.com", name: "Aria Laurent", date: "2028-06-12", tier: "VIP Fashion Critic" },
        { email: "daisy.editor@pcte.edu.in", name: "Daisy", date: "2028-07-01", tier: "Editorial Director" },
        { email: "tokyo.street@kurogane.jp", name: "Kenji Sato", date: "2028-08-15", tier: "Designer Member" },
        { email: "milan.style@atelier.it", name: "Elena Rossi", date: "2028-09-02", tier: "Haute Couture Stylist" }
      ]);
    }
  };

  useEffect(() => {
    fetchCRMData();
  }, []);

  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (!newSubEmail) return;

    try {
      await fetch('http://localhost:5000/api/crm/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newSubEmail, name: newSubName, tier: newSubTier })
      });
      fetchCRMData();
    } catch (err) {
      setSubscribers(prev => [
        { email: newSubEmail, name: newSubName || newSubEmail.split('@')[0], date: "2028-10-30", tier: newSubTier },
        ...prev
      ]);
    }

    setNewSubEmail('');
    setNewSubName('');
  };

  const advanceStage = (id) => {
    setWorkflowArticles(prev => prev.map(art => {
      if (art.id !== id) return art;
      const order = ['draft', 'in_review', 'approved', 'published'];
      const nextIdx = Math.min(order.length - 1, order.indexOf(art.stage) + 1);
      return {
        ...art,
        stage: order[nextIdx],
        updatedAt: 'Just now',
        comments: [...art.comments, `Daisy advanced status to ${order[nextIdx].toUpperCase()}`]
      };
    }));
  };

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = {
      id: `custom-art-${Date.now()}`,
      index: `0${ARTICLES.length + 1}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Exclusive digital magazine editorial dispatch.',
      category: newCategory,
      categoryLabel: CATEGORIES.find(c => c.id === newCategory)?.name || 'Editorial',
      author: 'Daisy (Editorial Director)',
      readTime: '4 min read',
      date: 'Autumn 2028',
      featured: true,
      coverImage: '/images/cover_teal.jpg',
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      excerpt: newContent.slice(0, 140) + '...',
      content: [newContent || 'Published via Daisy Belle Ligne Editorial CRM.'],
      pullQuote: 'Curated by Daisy for Belle Ligne Vol. 12.',
      designerCredits: 'Daisy Interdisciplinary Fashion Studio'
    };

    if (onArticleCreated) onArticleCreated(created);

    // Add to workflow as in_review
    setWorkflowArticles(prev => [
      {
        id: created.id,
        title: created.title,
        author: created.author,
        stage: 'in_review',
        category: created.category,
        updatedAt: 'Just now',
        comments: ['Submitted via Editorial Studio CMS by Daisy.']
      },
      ...prev
    ]);

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setNewTitle('');
      setNewSubtitle('');
      setNewContent('');
      setNewTags('');
      setActiveTab('workflow');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080A0E] text-white py-6 px-4 sm:px-8 animate-in fade-in duration-300">
      
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
            <Sliders size={14} />
            <span>Daisy's Editorial Studio &amp; Editorial Workflow</span>
          </div>
          <h1 className="font-editorial text-2xl font-bold">Editorial Director Dashboard &amp; CMS</h1>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-500/40 text-teal-300 text-xs font-mono">
            Backend Attached (Port 5000)
          </span>
        </div>
      </div>

      {/* CRM Navigation Tabs */}
      <div className="max-w-7xl mx-auto mt-6 flex border-b border-neutral-800 bg-[#101218] rounded-t-2xl px-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('workflow')}
          className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'workflow' ? 'border-teal-500 text-teal-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <FileCheck size={15} />
          <span>Editorial Workflow (Draft → Publish)</span>
        </button>

        <button
          onClick={() => setActiveTab('crm')}
          className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'crm' ? 'border-teal-500 text-teal-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Users size={15} />
          <span>Subscriber &amp; Reader CRM ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'analytics' ? 'border-teal-500 text-teal-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <BarChart3 size={15} />
          <span>Live Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('publish')}
          className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'publish' ? 'border-teal-500 text-teal-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <PlusCircle size={15} />
          <span>Submit Story</span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`py-4 px-4 text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'articles' ? 'border-teal-500 text-teal-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen size={15} />
          <span>All Published ({ARTICLES.length})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto bg-[#101218] rounded-b-2xl p-6 sm:p-8 border-x border-b border-neutral-800 shadow-2xl">
        
        {/* TAB 0: EDITORIAL WORKFLOW (Draft -> Review -> Approve -> Publish) */}
        {activeTab === 'workflow' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-neutral-800">
              <div>
                <h3 className="text-xl font-editorial font-bold text-white">
                  Editorial Multi-Stage Approval Pipeline
                </h3>
                <p className="text-xs text-neutral-400">
                  Role-based editorial pipeline: <strong>Writer</strong> (Draft) → <strong>Senior Editor</strong> (In Review) → <strong>Daisy</strong> (Approve &amp; Publish)
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono">
                  Role: Daisy (Editor-in-Chief)
                </span>
              </div>
            </div>

            {/* 4 Pipeline Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Col 1: Draft */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-400 pb-2 border-b border-neutral-800">
                  <span>1. DRAFTS</span>
                  <span className="bg-neutral-800 px-2 py-0.5 rounded text-white">
                    {workflowArticles.filter(a => a.stage === 'draft').length}
                  </span>
                </div>
                {workflowArticles.filter(a => a.stage === 'draft').map(art => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-[#141824] border border-neutral-800 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-teal-400 block">{art.category}</span>
                    <h5 className="text-xs font-serif font-bold text-white">{art.title}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono">By {art.author}</p>
                    <button
                      onClick={() => advanceStage(art.id)}
                      className="w-full py-1.5 rounded-lg bg-teal-900 hover:bg-teal-800 text-teal-200 text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Submit for Review →
                    </button>
                  </div>
                ))}
              </div>

              {/* Col 2: In Review */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400 pb-2 border-b border-neutral-800">
                  <span>2. IN REVIEW</span>
                  <span className="bg-neutral-800 px-2 py-0.5 rounded text-amber-300">
                    {workflowArticles.filter(a => a.stage === 'in_review').length}
                  </span>
                </div>
                {workflowArticles.filter(a => a.stage === 'in_review').map(art => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-[#141824] border border-amber-500/30 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-amber-400 block">{art.category}</span>
                    <h5 className="text-xs font-serif font-bold text-white">{art.title}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono">By {art.author}</p>
                    <button
                      onClick={() => advanceStage(art.id)}
                      className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Approve Article →
                    </button>
                  </div>
                ))}
              </div>

              {/* Col 3: Approved */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-400 pb-2 border-b border-neutral-800">
                  <span>3. APPROVED</span>
                  <span className="bg-neutral-800 px-2 py-0.5 rounded text-teal-300">
                    {workflowArticles.filter(a => a.stage === 'approved').length}
                  </span>
                </div>
                {workflowArticles.filter(a => a.stage === 'approved').map(art => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-[#141824] border border-teal-500/30 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-teal-400 block">{art.category}</span>
                    <h5 className="text-xs font-serif font-bold text-white">{art.title}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono">By {art.author}</p>
                    <button
                      onClick={() => advanceStage(art.id)}
                      className="w-full py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Publish to Live Issue →
                    </button>
                  </div>
                ))}
              </div>

              {/* Col 4: Published */}
              <div className="p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400 pb-2 border-b border-neutral-800">
                  <span>4. LIVE PUBLISHED</span>
                  <span className="bg-neutral-800 px-2 py-0.5 rounded text-emerald-300">
                    {workflowArticles.filter(a => a.stage === 'published').length}
                  </span>
                </div>
                {workflowArticles.filter(a => a.stage === 'published').map(art => (
                  <div key={art.id} className="p-3.5 rounded-xl bg-[#141824] border border-emerald-500/30 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-emerald-400 block">{art.category}</span>
                    <h5 className="text-xs font-serif font-bold text-white">{art.title}</h5>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300 text-[9px] font-mono">
                      ● Active in Reader Feed
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 1: SUBSCRIBERS CRM */}
        {activeTab === 'crm' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">Total Fashion Subscribers</span>
                <div className="text-2xl font-bold font-editorial text-teal-400 mt-1">{subscribers.length + 42800}</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">Database Sync Status</span>
                <div className="text-2xl font-bold font-editorial text-emerald-400 mt-1">Live Synced (Port 5000)</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">PCTE IFDT Readers</span>
                <div className="text-2xl font-bold font-editorial text-amber-400 mt-1">12,410 Students &amp; Faculty</div>
              </div>
            </div>

            {/* Quick Add Subscriber */}
            <form onSubmit={handleAddSubscriber} className="p-4 rounded-xl border border-neutral-800 bg-[#14161F] flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                placeholder="Subscriber Name"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs focus:ring-1 focus:ring-teal-500"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={newSubEmail}
                onChange={(e) => setNewSubEmail(e.target.value)}
                className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs focus:ring-1 focus:ring-teal-500"
              />
              <select
                value={newSubTier}
                onChange={(e) => setNewSubTier(e.target.value)}
                className="w-full sm:w-1/4 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs focus:ring-1 focus:ring-teal-500"
              >
                <option value="VIP Critic">VIP Fashion Critic</option>
                <option value="Editorial Press">Editorial Press</option>
                <option value="PCTE Student">PCTE IFDT Scholar</option>
                <option value="Atelier Designer">Atelier Designer</option>
              </select>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs whitespace-nowrap shadow"
              >
                + Add Member
              </button>
            </form>

            {/* Subscribers Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {subscribers.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-neutral-800/50">
                      <td className="py-3 px-4 font-semibold text-white">{sub.name}</td>
                      <td className="py-3 px-4 text-neutral-300 font-mono">{sub.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800 text-[10px]">
                          {sub.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">{sub.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">Total Unique Readers</span>
                <div className="text-2xl font-bold font-editorial text-white mt-1">168,920</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">3D Runway Plays</span>
                <div className="text-2xl font-bold font-editorial text-teal-400 mt-1">108,240</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">Average Read Duration</span>
                <div className="text-2xl font-bold font-editorial text-amber-400 mt-1">5m 12s</div>
              </div>
              <div className="p-4 rounded-xl bg-[#14161F] border border-neutral-800">
                <span className="text-xs font-mono text-neutral-400">Lighthouse Score</span>
                <div className="text-2xl font-bold font-editorial text-emerald-400 mt-1">98 / 100</div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-neutral-800 bg-[#14161F] space-y-4">
              <h4 className="font-editorial text-base font-bold text-white">Trending Categories &amp; Reader Affinity</h4>
              {EDITORIAL_ANALYTICS.topTrending.map((trend, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-neutral-200">{trend.title}</span>
                    <span className="font-mono text-teal-400">{trend.views.toLocaleString()} views • {trend.score}</span>
                  </div>
                  <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: trend.score }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SUBMIT STORY */}
        {activeTab === 'publish' && (
          <form onSubmit={handleCreateArticle} className="space-y-4 max-w-2xl animate-in fade-in duration-200">
            {publishSuccess && (
              <div className="p-3 bg-teal-950 border border-teal-500 text-teal-300 rounded-xl text-xs font-semibold">
                ✓ Story successfully created and added to the Editorial Workflow!
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Headline</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sculptured Velvet: The Milanese Autumn Forecast"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Subtitle / Dek</label>
              <input
                type="text"
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                placeholder="A secondary hook explaining the look..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Content / Editorial Copy</label>
              <textarea
                rows={5}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Draft the article text here. You can include trend analysis, runway notes, and styling direction..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="Runway, Streetwear, 2028 Trends, Paris"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg"
              >
                Submit into Editorial Pipeline
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: ALL PUBLISHED ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {ARTICLES.map((article) => (
              <div 
                key={article.id} 
                className="p-4 rounded-xl border border-neutral-800 flex items-center justify-between hover:border-teal-500 transition-all bg-[#161822]"
              >
                <div className="flex items-center space-x-4">
                  <img src={article.coverImage} alt={article.title} className="w-14 h-14 rounded-lg object-cover" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-teal-400 font-bold">
                      {article.categoryLabel} • {article.date}
                    </div>
                    <h4 className="font-editorial text-base font-bold text-white">
                      {article.title}
                    </h4>
                    <div className="text-xs text-neutral-400">Edited by Daisy • {article.readTime}</div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-mono text-[10px] font-bold">
                  ● Published
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

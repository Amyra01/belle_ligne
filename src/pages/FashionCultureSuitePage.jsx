import React, { useState } from 'react';
import { 
  ArrowLeft, Clock, Sparkles, BookOpen, User, 
  HelpCircle, Calendar, Video, Award, ChevronRight,
  TrendingUp, Check, Share2, Tag, Compass, Flame, Leaf, Eye
} from 'lucide-react';
import { 
  FASHION_GLOSSARY, 
  DESIGNER_SPOTLIGHTS, 
  TREND_TIMELINE, 
  FASHION_EVENTS_CALENDAR, 
  IFDT_BEHIND_THE_SCENES 
} from '../data/fashionSuiteData';
import confetti from 'canvas-confetti';

export default function FashionCultureSuitePage({ onBack, onSelectArticle }) {
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'designers', 'glossary', 'bts', 'events'
  const [selectedDesigner, setSelectedDesigner] = useState(DESIGNER_SPOTLIGHTS[0]);
  const [reminders, setReminders] = useState([]);
  const [activePollVote, setActivePollVote] = useState(null);

  const toggleReminder = (id) => {
    setReminders(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white py-8 px-4 sm:px-6 lg:px-8 select-none">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-serif tracking-wider transition-colors"
        >
          <ArrowLeft size={14} className="text-teal-400" />
          <span>Return to Magazine</span>
        </button>

        <div className="text-right">
          <span className="font-editorial text-lg font-bold text-white block">belle ligne</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400">
            Fashion Intelligence &amp; Cultural Archive • Directed by Daisy
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-1 bg-[#10131B] border border-neutral-800 rounded-2xl text-xs font-semibold">
          {[
            { id: 'timeline', label: 'Trend Timeline', icon: TrendingUp },
            { id: 'designers', label: 'Designer Spotlight', icon: User },
            { id: 'glossary', label: 'Fashion Glossary', icon: BookOpen },
            { id: 'bts', label: 'IFDT Student BTS', icon: Video },
            { id: 'events', label: 'Events Calendar', icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-2 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-600/30 font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                <Icon size={14} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-6xl mx-auto mt-8">
        
        {/* 1. TREND TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Archival Evolution
              </span>
              <h2 className="text-3xl font-editorial font-bold text-white mt-1">
                How Streetwear Evolved: 2015 → 2028
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Trace the trajectory from graphic screenprints and hype drops to algorithmic zero-waste origami folds and bioluminescent smart textiles.
              </p>
            </div>

            <div className="relative border-l-2 border-teal-500/40 ml-4 pl-6 space-y-8">
              {TREND_TIMELINE.map((step) => (
                <div key={step.year} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-teal-500 border-4 border-[#07090E] shadow-md shadow-teal-500/50" />
                  
                  <div className="p-5 rounded-2xl bg-[#11141E] border border-neutral-800 hover:border-teal-500/60 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-teal-950 border border-teal-700/60 text-teal-300 text-xs font-mono font-bold">
                        {step.year}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        {step.palette.map((c, i) => (
                          <span key={i} className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-white mb-1">{step.era}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed mb-3">{step.description}</p>
                    
                    <div className="text-[11px] font-mono text-teal-400 flex items-center space-x-1">
                      <Sparkles size={12} />
                      <span>Milestone: {step.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Interactive Poll Box */}
            <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-teal-950/60 to-neutral-900 border border-teal-800/60">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold block mb-1">
                Reader Vote • This or That
              </span>
              <h3 className="text-lg font-serif font-bold text-white mb-3">
                Which 2028 direction will dominate next season?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActivePollVote('origami');
                    confetti({ particleCount: 20 });
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activePollVote === 'origami' ? 'border-teal-400 bg-teal-900/60 ring-2 ring-teal-400' : 'border-neutral-800 bg-neutral-900'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Origami Structured Streetwear</span>
                  <span className="text-[10px] text-teal-300 font-mono">68% of Readers Agree</span>
                </button>

                <button
                  onClick={() => {
                    setActivePollVote('biocouture');
                    confetti({ particleCount: 20 });
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    activePollVote === 'biocouture' ? 'border-teal-400 bg-teal-900/60 ring-2 ring-teal-400' : 'border-neutral-800 bg-neutral-900'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">Liquid Teal Bio-Silk Couture</span>
                  <span className="text-[10px] text-teal-300 font-mono">32% of Readers Agree</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. DESIGNER SPOTLIGHT */}
        {activeTab === 'designers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-300">
            {/* List */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold block mb-2">
                Visionary Creators
              </span>
              {DESIGNER_SPOTLIGHTS.map(des => (
                <button
                  key={des.id}
                  onClick={() => setSelectedDesigner(des)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                    selectedDesigner.id === des.id
                      ? 'border-teal-400 bg-[#141824] shadow-lg ring-1 ring-teal-400'
                      : 'border-neutral-800 bg-[#0F1219] hover:border-neutral-700'
                  }`}
                >
                  <img src={des.image} alt={des.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white">{des.name}</h4>
                    <span className="text-[10px] text-teal-400 font-mono block">{des.role}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Profile Detail */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#11141E] border border-neutral-800 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold">
                    {selectedDesigner.location}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mt-1">
                    {selectedDesigner.name}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">{selectedDesigner.role}</p>
                </div>
                <img src={selectedDesigner.image} alt={selectedDesigner.name} className="w-20 h-20 rounded-2xl object-cover border border-teal-500/40" />
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-neutral-800">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Editorial Philosophy</span>
                <p className="text-xs sm:text-sm text-neutral-200 italic leading-relaxed">
                  "{selectedDesigner.philosophy}"
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                  Signature Look
                </span>
                <p className="text-xs text-white font-semibold">
                  {selectedDesigner.signatureLook}
                </p>
              </div>

              {/* Career Milestones */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-2">
                  Career Milestones
                </span>
                <div className="space-y-2">
                  {selectedDesigner.timeline.map((ev, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs">
                      <span className="font-mono text-teal-400 shrink-0 font-bold">{ev.year} —</span>
                      <span className="text-neutral-300">{ev.event}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-800/40">
                <span className="text-[9px] font-mono uppercase text-teal-300 block mb-1">Interview Excerpt</span>
                <p className="text-xs text-neutral-200">
                  "{selectedDesigner.interviewQuote}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. FASHION GLOSSARY */}
        {activeTab === 'glossary' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Editorial Lexicon
              </span>
              <h2 className="text-3xl font-editorial font-bold text-white mt-1">
                The Haute Couture Glossary 2028
              </h2>
              <p className="text-xs text-neutral-400 mt-2">
                Demystifying advanced textile engineering, origami pattern geometry, and ecological chemistry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FASHION_GLOSSARY.map((term) => (
                <div key={term.term} className="p-5 rounded-2xl bg-[#11141E] border border-neutral-800 hover:border-teal-500/50 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-white">{term.term}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                      {term.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 block">{term.phonetic}</span>
                  <p className="text-xs text-neutral-300 leading-relaxed">{term.definition}</p>
                  <div className="pt-2 border-t border-neutral-800/80 text-[10px] font-mono text-teal-400">
                    Applied in: {term.application}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. IFDT BEHIND THE SCENES */}
        {activeTab === 'bts' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Campus Workshop Access
              </span>
              <h2 className="text-3xl font-editorial font-bold text-white mt-1">
                Inside the IFDT Atelier: How It's Made
              </h2>
              <p className="text-xs text-neutral-400 mt-2">
                Step inside PCTE's design labs to witness the meticulous draping, algorithmic paper-folding, and natural dye extractions powering the magazine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {IFDT_BEHIND_THE_SCENES.map((bts) => (
                <div key={bts.id} className="rounded-2xl overflow-hidden bg-[#11141E] border border-neutral-800 flex flex-col justify-between">
                  <div>
                    <img src={bts.image} alt={bts.title} className="w-full h-44 object-cover" />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono text-teal-400">
                        <span>{bts.author}</span>
                        <span>{bts.readTime}</span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-white">{bts.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">{bts.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. EVENTS CALENDAR */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Global Runway Itinerary
              </span>
              <h2 className="text-3xl font-editorial font-bold text-white mt-1">
                2028 Fashion Weeks &amp; Campus Fests
              </h2>
              <p className="text-xs text-neutral-400 mt-2">
                Never miss an international couture week or student showcase. Click "Remind Me" to save to your personal editorial planner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FASHION_EVENTS_CALENDAR.map((evt) => {
                const isReminded = reminders.includes(evt.id);
                return (
                  <div key={evt.id} className="p-5 rounded-2xl bg-[#11141E] border border-neutral-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-teal-400 font-bold">{evt.city}</span>
                        <span className="px-2 py-0.5 rounded bg-black/60 border border-neutral-700 text-[10px] text-neutral-300">
                          {evt.badge}
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-white">{evt.title}</h3>
                      <span className="text-xs font-mono text-neutral-400 block mt-1">{evt.date}</span>
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{evt.description}</p>
                    </div>

                    <button
                      onClick={() => toggleReminder(evt.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                        isReminded
                          ? 'bg-teal-600 text-white'
                          : 'bg-neutral-900 border border-neutral-700 hover:border-teal-400 text-neutral-300 hover:text-white'
                      }`}
                    >
                      {isReminded ? <Check size={14} /> : <Calendar size={14} />}
                      <span>{isReminded ? 'Reminder Added!' : 'Remind Me'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, Sparkles, ChevronRight, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { STYLE_QUIZ_QUESTIONS, ARTICLES } from '../data/magazineData';

export default function StyleQuizPage({ onBack, onSelectArticle }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [styleProfile, setStyleProfile] = useState(null);

  const handleSelectOption = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);

    if (currentStep < STYLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      computeRecommendations(updated);
    }
  };

  const computeRecommendations = (finalAnswers) => {
    const chosenTags = Object.values(finalAnswers).map(a => a.tag);

    const scoredArticles = ARTICLES.map(article => {
      let score = 65;
      if (chosenTags.includes(article.category)) score += 25;
      article.tags.forEach(t => {
        if (chosenTags.some(ct => t.toLowerCase().includes(ct))) score += 8;
      });
      score = Math.min(99, score);
      return { ...article, matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore);

    let personaTitle = "Neo-Couture Visionary";
    let personaDesc = "Your taste balances classical high-fashion silhouette geometry with modern computational textile innovation.";
    
    if (finalAnswers.vibe?.tag === 'streetwear') {
      personaTitle = "Cyber-Origami Tactician";
      personaDesc = "You gravitate toward architectural streetwear, technical cargo draping, and bold oversized volume.";
    } else if (finalAnswers.vibe?.tag === 'sustainable') {
      personaTitle = "Bio-Regenerative Purist";
      personaDesc = "You champion zero-waste construction, circular bio-leathers, and understated earth-conscious elegance.";
    } else if (finalAnswers.vibe?.tag === 'textiles') {
      personaTitle = "Smart-Material Futurist";
      personaDesc = "You are drawn to responsive textiles, thermochromic weaves, and wearable computational design.";
    }

    setStyleProfile({ title: personaTitle, desc: personaDesc });
    setRecommendations(scoredArticles.slice(0, 3));
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setQuizCompleted(false);
    setStyleProfile(null);
  };

  const currentQ = STYLE_QUIZ_QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-[#090B0E] text-white py-6 px-4 sm:px-8 animate-in fade-in duration-300">
      
      {/* Top Prominent Back Navigation Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between pb-6 border-b border-neutral-800">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all hover:scale-105"
        >
          <ArrowLeft size={16} />
          <span>← Back to Magazine Home</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
          <Sparkles size={14} />
          <span>AI Style Discovery Engine</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 p-6 sm:p-10 bg-[#12141C] rounded-3xl border border-neutral-800 shadow-2xl">
        {!quizCompleted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Step {currentStep + 1} of {STYLE_QUIZ_QUESTIONS.length}
              </span>
              <h2 className="font-editorial text-3xl font-bold mt-1">Discover Your 2028 Style DNA</h2>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-teal-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / STYLE_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-neutral-100">{currentQ.question}</h3>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className="w-full text-left p-4 rounded-xl border border-neutral-700 hover:border-teal-400 hover:bg-teal-950/20 transition-all flex items-start justify-between group"
                >
                  <div>
                    <div className="font-semibold text-sm group-hover:text-teal-400 transition-colors">
                      {opt.label}
                    </div>
                    {opt.desc && (
                      <div className="text-xs text-neutral-400 mt-1">{opt.desc}</div>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-neutral-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all mt-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center pb-6 border-b border-neutral-800">
              <div className="inline-flex p-3 rounded-full bg-teal-950/80 text-teal-400 mb-2 border border-teal-500/30">
                <CheckCircle2 size={32} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
                Your Fashion DNA Profile
              </div>
              <h2 className="font-editorial text-3xl font-bold mt-1 text-white">{styleProfile?.title}</h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed font-sans">
                {styleProfile?.desc}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-3 text-xs text-neutral-400 font-mono">
                <span>Recommended Stories For You</span>
                <button onClick={resetQuiz} className="flex items-center space-x-1 text-teal-400 hover:underline">
                  <RefreshCw size={12} />
                  <span>Retake</span>
                </button>
              </div>

              <div className="space-y-3">
                {recommendations.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticle && onSelectArticle(article.id)}
                    className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 hover:border-teal-500 hover:bg-neutral-800/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={article.coverImage} alt={article.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-bold mr-2">
                          {article.matchScore}% Match
                        </span>
                        <h4 className="font-editorial text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-neutral-400 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  onClick={onBack}
                  className="px-6 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider"
                >
                  Explore Magazine with this DNA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

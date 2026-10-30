import React, { useState } from 'react';
import { Sparkles, X, ChevronRight, CheckCircle2, RefreshCw, Bookmark, ArrowRight } from 'lucide-react';
import { STYLE_QUIZ_QUESTIONS, ARTICLES, RUNWAY_OUTFITS } from '../data/magazineData';

export default function StyleQuizModal({ isOpen, onClose, onSelectArticle }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [styleProfile, setStyleProfile] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (questionId, option) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);

    if (currentStep < STYLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate Content-Based Recommendations
      computeRecommendations(updated);
    }
  };

  const computeRecommendations = (finalAnswers) => {
    // Simulated TF-IDF & Cosine Similarity Match against Article tags
    const chosenTags = Object.values(finalAnswers).map(a => a.tag);

    const scoredArticles = ARTICLES.map(article => {
      let score = 65; // base compatibility
      if (chosenTags.includes(article.category)) score += 25;
      article.tags.forEach(t => {
        if (chosenTags.some(ct => t.toLowerCase().includes(ct))) score += 8;
      });
      score = Math.min(99, score);
      return { ...article, matchScore: score };
    }).sort((a, b) => b.matchScore - a.matchScore);

    // Formulate Style Persona Title
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#121419] rounded-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 transition-colors"
        >
          <X size={18} />
        </button>

        {!quizCompleted ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-1">
                <Sparkles size={14} />
                <span>AI Style Discovery Engine</span>
                <span className="text-neutral-400">•</span>
                <span>Daisy's Python Microservice Simulation</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold">
                Discover Your 2028 Style Persona
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Step {currentStep + 1} of {STYLE_QUIZ_QUESTIONS.length} — Content-based fashion recommendation
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div 
                  className="bg-teal-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / STYLE_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <h3 className="text-base sm:text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className="w-full text-left p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-teal-600 dark:hover:border-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 transition-all flex items-start justify-between group"
                >
                  <div>
                    <div className="font-semibold text-sm group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {opt.label}
                    </div>
                    {opt.desc && (
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {opt.desc}
                      </div>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all mt-1" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Quiz Results View */
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="inline-flex p-3 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 mb-2">
                <CheckCircle2 size={32} />
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold">
                Your Fashion DNA Profile
              </div>
              <h2 className="font-editorial text-3xl font-bold mt-1 text-neutral-900 dark:text-white">
                {styleProfile?.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto mt-2 leading-relaxed font-sans">
                {styleProfile?.desc}
              </p>
            </div>

            {/* Top Recommendations */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Recommended For You (Content Match)
                </span>
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center space-x-1 text-xs text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <RefreshCw size={12} />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <div className="space-y-3">
                {recommendations.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onClose();
                      onSelectArticle(article.id);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-teal-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="w-12 h-12 rounded-lg object-cover" 
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                            {article.matchScore}% Match
                          </span>
                          <span className="text-xs text-neutral-400">• {article.readTime}</span>
                        </div>
                        <h4 className="font-editorial text-sm font-bold text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {article.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-neutral-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Explore Magazine with this Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

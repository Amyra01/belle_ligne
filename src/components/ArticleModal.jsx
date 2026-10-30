import React, { useState } from 'react';
import { 
  X, ArrowLeft, Volume2, VolumeX, Bookmark, Share2, Sparkles, 
  Clock, Calendar, User, MessageSquare, Send, Heart, Check, ZoomIn
} from 'lucide-react';
import { ARTICLES } from '../data/magazineData';

export default function ArticleModal({ articleId, onClose, onSelectArticle, savedArticles, toggleSaveArticle }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState('base');
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(248);
  const [hasLiked, setHasLiked] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [comments, setComments] = useState([
    { id: 1, author: "Aria Thorne", role: "Vogue Paris Reader", text: "Transformative Teal is genuinely the palette of 2028. Daisy's curation of the asymmetrical silk cape in the 3D runway is breathtaking!", time: "2 hours ago" },
    { id: 2, author: "Vikram Malhotra", role: "PCTE IFDT Alum", text: "Proud to see Daisy bridging technical programming with real runway aesthetics. The origami collar cut is pure genius.", time: "5 hours ago" }
  ]);
  const [newComment, setNewComment] = useState("");

  if (!articleId) return null;
  const article = ARTICLES.find(a => a.id === articleId) || ARTICLES[0];
  const isSaved = savedArticles.includes(article.id);

  const toggleNarration = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const fullText = `${article.title}. By ${article.author}. ${article.excerpt}. ${article.content.join(" ")}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        author: "You (Signed In Reader)",
        role: "Belle Ligne Member",
        text: newComment.trim(),
        time: "Just now"
      }
    ]);
    setNewComment("");
  };

  const handleClose = () => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#121419] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-white my-8 overflow-hidden">
        
        {/* Prominent Sticky Top Bar with CLEAR BACK ARROW and CLOSE BUTTON */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/95 dark:bg-[#121419]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
          
          {/* Prominent Back Button */}
          <button
            onClick={handleClose}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 font-semibold text-xs uppercase tracking-wider transition-all"
          >
            <ArrowLeft size={16} />
            <span>← Back to Magazine</span>
          </button>

          <div className="flex items-center space-x-2">
            {/* Audio narration */}
            <button
              onClick={toggleNarration}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isSpeaking 
                  ? 'bg-teal-600 border-teal-500 text-white animate-pulse' 
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {isSpeaking ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hidden sm:inline">{isSpeaking ? 'Playing Voice' : 'Listen'}</span>
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => toggleSaveArticle(article.id)}
              className={`p-2 rounded-full border transition-all ${
                isSaved 
                  ? 'bg-amber-500/20 border-amber-400 text-amber-500' 
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-500'
              }`}
              title="Save to Reading List"
            >
              <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-teal-600 transition-colors"
              title="Share article link"
            >
              {copied ? <Check size={15} className="text-emerald-500" /> : <Share2 size={15} />}
            </button>

            {/* Prominent Close (X) button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="p-6 sm:p-10 max-w-3xl mx-auto">
          
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-600 dark:text-teal-400 font-bold">
              Story #{article.index} • {article.date}
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
              {article.subtitle}
            </p>

            <div className="flex items-center space-x-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center space-x-1.5 font-medium text-neutral-800 dark:text-neutral-200">
                <User size={14} />
                <span>By {article.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>

          {/* Hero Image with Zoom & Back option */}
          <div 
            onClick={() => setZoomedImage(article.coverImage)}
            className="my-8 rounded-xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 cursor-zoom-in relative group"
            title="Click to zoom image"
          >
            <img 
              src={article.coverImage} 
              alt={article.title}
              className="w-full max-h-[460px] object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={16} />
            </div>
            <div className="p-3 bg-neutral-100 dark:bg-neutral-900 text-xs text-neutral-500 flex justify-between">
              <span>{article.designerCredits}</span>
              <span className="font-mono">Edited by Daisy</span>
            </div>
          </div>

          {/* Pull Quote */}
          {article.pullQuote && (
            <div className="my-8 p-6 rounded-xl bg-teal-50 dark:bg-teal-950/40 border-l-4 border-teal-600 text-teal-950 dark:text-teal-100 font-editorial text-xl sm:text-2xl italic leading-relaxed">
              "{article.pullQuote}"
            </div>
          )}

          {/* Paragraphs */}
          <div className="space-y-6 text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans text-base sm:text-lg">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? "drop-cap" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-neutral-400 mr-2">Filed Under:</span>
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Reaction Bar */}
          <div className="my-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                hasLiked 
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md' 
                  : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <Heart size={15} fill={hasLiked ? "currentColor" : "none"} />
              <span>{likes} Applauds</span>
            </button>

            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Back to Stories
            </button>
          </div>

          {/* Reader Dialogue / Comments */}
          <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare size={18} className="text-teal-600 dark:text-teal-400" />
              <h3 className="font-editorial text-2xl font-bold">
                Reader Dialogue ({comments.length})
              </h3>
            </div>

            <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your perspective on this look or trend..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Send size={14} />
                <span>Post</span>
              </button>
            </form>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <span className="font-bold text-neutral-900 dark:text-white mr-2">{comment.author}</span>
                      <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">{comment.role}</span>
                    </div>
                    <span className="text-neutral-400 text-[10px]">{comment.time}</span>
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      {zoomedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
            <button
              onClick={() => setZoomedImage(null)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-teal-400 font-bold text-xs uppercase tracking-wider transition-all shadow-2xl"
            >
              <ArrowLeft size={16} />
              <span>← Back to Article</span>
            </button>

            <button
              onClick={() => setZoomedImage(null)}
              className="p-3 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors border border-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-w-4xl max-h-[85vh] p-2 flex items-center justify-center">
            <img src={zoomedImage} alt="Zoomed Cover" className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20" />
          </div>
        </div>
      )}

    </div>
  );
}

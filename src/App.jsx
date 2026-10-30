import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingStrip from './components/TrendingStrip';
import Runway3D from './components/Runway3D';
import RunwayReel from './components/RunwayReel';
import MagazineReader from './components/MagazineReader';
import LookbookSwipe from './components/LookbookSwipe';
import EditorLetter from './components/EditorLetter';
import TableOfContents from './components/TableOfContents';
import EditorialFeed from './components/EditorialFeed';
import Footer from './components/Footer';

// Modals
import ArticleModal from './components/ArticleModal';
import StyleQuizModal from './components/StyleQuizModal';
import EditorialCMS from './components/EditorialCMS';
import AuthModal from './components/AuthModal';
import SavedArticlesDrawer from './components/SavedArticlesDrawer';
import SearchModal from './components/SearchModal';
import VideoModal from './components/VideoModal';
import Magazine404 from './components/Magazine404';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import ColorPaletteFinderModal from './components/ColorPaletteFinderModal';
import StyleDNACardModal from './components/StyleDNACardModal';

// Dedicated Sub-Pages
import RunwayPage from './pages/RunwayPage';
import ReelsPage from './pages/ReelsPage';
import FlipbookPage from './pages/FlipbookPage';
import LookbookPage from './pages/LookbookPage';
import EditorCRMPage from './pages/EditorCRMPage';
import StyleQuizPage from './pages/StyleQuizPage';
import AuthPage from './pages/AuthPage';
import MagazineCreator from './components/MagazineCreator';
import FashionCultureSuitePage from './pages/FashionCultureSuitePage';
import SmartSemanticSearchPage from './pages/SmartSemanticSearchPage';
import MoodBoardMakerPage from './pages/MoodBoardMakerPage';

import { runwayAudio } from './utils/audioSynth';
import { ARTICLES as INITIAL_ARTICLES, MAGAZINES_CATALOG } from './data/magazineData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'runway' | 'reels' | 'flipbook' | 'lookbooks' | 'editor-crm' | 'style-quiz' | 'creator'
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  
  // Modals state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [is404Open, setIs404Open] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isPaletteFinderOpen, setIsPaletteFinderOpen] = useState(false);
  const [isDnaCardOpen, setIsDnaCardOpen] = useState(false);
  
  // Reading & Look wardrobe
  const [savedArticles, setSavedArticles] = useState(['trends-2028', 'streetwear-evolves']);
  const [savedLooks, setSavedLooks] = useState(['teal-couture']);

  // Custom User Magazines from Backend Database
  const [customMagazines, setCustomMagazines] = useState([]);

  // Authenticated user (Edited by Daisy) loaded from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('belle_ligne_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Daisy",
      email: "daisy.editor@pcte.edu.in",
      role: "Editorial Director & Platform Lead",
      savedCount: 4,
      memberSince: "2028"
    };
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [articlesList, setArticlesList] = useState(INITIAL_ARTICLES);

  // Fetch magazines from Express backend database on startup
  useEffect(() => {
    fetch('http://localhost:5000/api/magazines')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const userMags = data.filter(m => m.isUserCreated);
          setCustomMagazines(userMags);
        }
      })
      .catch(err => console.log('Backend syncing offline mode:', err));
  }, []);

  // Initialize Lenis Smooth Scroll (only on home page, respecting reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (currentPage !== 'home') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, [currentPage]);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const toggleMusic = () => {
    const playing = runwayAudio.toggle();
    setIsMusicPlaying(playing);
  };

  const toggleSaveArticle = (articleId) => {
    setSavedArticles(prev => 
      prev.includes(articleId) ? prev.filter(id => id !== articleId) : [...prev, articleId]
    );
  };

  const toggleSaveLook = (lookId) => {
    setSavedLooks(prev => 
      prev.includes(lookId) ? prev.filter(id => id !== lookId) : [...prev, lookId]
    );
  };

  const handleArticleCreated = (newArticle) => {
    setArticlesList(prev => [newArticle, ...prev]);
  };

  const handleMagazineSaved = (newMag) => {
    setCustomMagazines(prev => [newMag, ...prev]);
  };

  const navigateTo = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      darkMode ? 'bg-[#0A0C10] text-white' : 'bg-[#F9F8F6] text-[#121419]'
    }`}>
      
      {/* 1. Custom High-Fashion Precision Cursor */}
      <CustomCursor />

      {/* 2. Top Scroll Progress */}
      {currentPage === 'home' && <ScrollProgress />}

      {/* 3. Global Navbar with Dedicated Page Routing & Mobile Bottom Dock */}
      <Navbar
        onOpenAuth={() => navigateTo('auth')}
        currentUser={currentUser}
        savedArticlesCount={savedArticles.length + savedLooks.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onNavigate={navigateTo}
        currentPage={currentPage}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenSearch={() => navigateTo('semantic-search')}
        onOpenTryOn={() => setIsTryOnOpen(true)}
        onOpenPaletteFinder={() => setIsPaletteFinderOpen(true)}
        onOpenStyleDna={() => setIsDnaCardOpen(true)}
      />

      {/* 4. DEDICATED FULL-SCREEN PAGES ROUTER */}
      {currentPage === 'creator' && (
        <MagazineCreator
          onBack={() => navigateTo('home')}
          onMagazineSaved={handleMagazineSaved}
          currentUser={currentUser}
        />
      )}

      {currentPage === 'runway' && (
        <RunwayPage
          onBack={() => navigateTo('home')}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
          onSaveLook={toggleSaveLook}
          savedLooks={savedLooks}
        />
      )}

      {currentPage === 'reels' && (
        <ReelsPage
          onBack={() => navigateTo('home')}
          onSaveLook={toggleSaveLook}
          savedLooks={savedLooks}
        />
      )}

      {currentPage === 'flipbook' && (
        <FlipbookPage
          onBack={() => navigateTo('home')}
          onOpenArticle={(id) => setSelectedArticleId(id)}
          customMagazines={customMagazines}
        />
      )}

      {currentPage === 'lookbooks' && (
        <LookbookPage
          onBack={() => navigateTo('home')}
          onSaveLook={toggleSaveLook}
          savedLooks={savedLooks}
        />
      )}

      {currentPage === 'editor-crm' && (
        <EditorCRMPage
          onBack={() => navigateTo('home')}
          onArticleCreated={handleArticleCreated}
        />
      )}

      {currentPage === 'style-quiz' && (
        <StyleQuizPage
          onBack={() => navigateTo('home')}
          onSelectArticle={(id) => setSelectedArticleId(id)}
        />
      )}

      {currentPage === 'auth' && (
        <AuthPage
          onBack={() => navigateTo('home')}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
          }}
          onOpenCreator={() => navigateTo('creator')}
        />
      )}

      {currentPage === 'fashion-suite' && (
        <FashionCultureSuitePage
          onBack={() => navigateTo('home')}
          onSelectArticle={(id) => setSelectedArticleId(id)}
        />
      )}

      {currentPage === 'semantic-search' && (
        <SmartSemanticSearchPage
          onBack={() => navigateTo('home')}
          onSelectArticle={(id) => setSelectedArticleId(id)}
        />
      )}

      {currentPage === 'moodboard' && (
        <MoodBoardMakerPage
          onBack={() => navigateTo('home')}
          onSaveBoard={async (board) => {
            try {
              await fetch('http://localhost:5000/api/moodboards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(board)
              });
            } catch (e) {}
          }}
        />
      )}

      {/* 5. MAIN HOME PAGE OVERVIEW */}
      {currentPage === 'home' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 pt-2">
          
          {/* Section 1: Editorial Hero with Video Background */}
          <HeroSection
            onExploreRunway={() => navigateTo('runway')}
            onOpenReader={() => navigateTo('flipbook')}
            onOpenQuiz={() => navigateTo('style-quiz')}
            onOpenArticle={(id) => setSelectedArticleId(id)}
            onWatchShow={() => setIsVideoModalOpen(true)}
          />

          {/* Section 2: Trending Now Live Strip */}
          <TrendingStrip
            onSelectArticle={(id) => setSelectedArticleId(id)}
          />

          {/* Section 3: Interactive 3D Runway Walk Preview */}
          <section id="runway" className="scroll-mt-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 pb-3 border-b border-neutral-300 dark:border-neutral-800 gap-2">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400 font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                  <span>Real-Time 3D Ramp Walk Experience</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white">
                  Live Catwalk &amp; Ramp Show
                </h2>
              </div>
              <button
                onClick={() => navigateTo('runway')}
                className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                Open Dedicated 3D Runway Page →
              </button>
            </div>

            <Runway3D
              isMusicPlaying={isMusicPlaying}
              toggleMusic={toggleMusic}
              onSaveLook={toggleSaveLook}
              savedLooks={savedLooks}
            />
          </section>

          {/* Section 4: Vertical Video Runway Reels */}
          <section id="runway-reels" className="scroll-mt-24">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => navigateTo('reels')}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-teal-600 border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Open Fullscreen Reels Player (6+ Playable Clips) →
              </button>
            </div>
            <RunwayReel
              onSelectLook={() => navigateTo('reels')}
            />
          </section>

          {/* Section 5: Interactive Glossy Digital Magazine Flipbook Reader */}
          <section id="reader" className="scroll-mt-24">
            <MagazineReader
              onOpenArticle={(id) => setSelectedArticleId(id)}
              onGoToLibrary={() => navigateTo('flipbook')}
            />
          </section>

          {/* Section 6: Lookbook of the Week */}
          <section id="lookbook" className="scroll-mt-24">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => navigateTo('lookbooks')}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-teal-600 border border-white/20 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Explore Full Lookbook Studio →
              </button>
            </div>
            <LookbookSwipe
              onSaveLook={() => toggleSaveLook('lookbook-week')}
              isSaved={savedLooks.includes('lookbook-week')}
            />
          </section>

          {/* Section 7: Editor's Letter by Daisy */}
          <EditorLetter />

          {/* Section 8: Authentic Table of Contents Explorer */}
          <section id="contents" className="scroll-mt-24">
            <TableOfContents
              onSelectArticle={(id) => setSelectedArticleId(id)}
            />
          </section>

          {/* Section 9: Editorial Stories & Trend Forecasts Grid */}
          <EditorialFeed
            onSelectArticle={(id) => setSelectedArticleId(id)}
            savedArticles={savedArticles}
            toggleSaveArticle={toggleSaveArticle}
          />

        </main>
      )}

      {/* Footer & Academic Acknowledgment */}
      <Footer
        onOpenQuiz={() => navigateTo('style-quiz')}
        onOpenCMS={() => navigateTo('editor-crm')}
        onExploreRunway={() => navigateTo('runway')}
        onOpen404={() => setIs404Open(true)}
      />

      {/* MODALS & OVERLAYS (WITH PROMINENT BACK & CLOSE BUTTONS) */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <ArticleModal
        articleId={selectedArticleId}
        onClose={() => setSelectedArticleId(null)}
        onSelectArticle={(id) => setSelectedArticleId(id)}
        savedArticles={savedArticles}
        toggleSaveArticle={toggleSaveArticle}
      />

      <StyleQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectArticle={(id) => setSelectedArticleId(id)}
      />

      <EditorialCMS
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        onArticleCreated={handleArticleCreated}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        onOpenCreator={() => navigateTo('creator')}
      />

      <SavedArticlesDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedArticles={savedArticles}
        toggleSaveArticle={toggleSaveArticle}
        onSelectArticle={(id) => setSelectedArticleId(id)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(id) => setSelectedArticleId(id)}
      />

      <VirtualTryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        onSaveLook={toggleSaveLook}
      />

      <ColorPaletteFinderModal
        isOpen={isPaletteFinderOpen}
        onClose={() => setIsPaletteFinderOpen(false)}
        onSelectArticle={(id) => setSelectedArticleId(id)}
      />

      <StyleDNACardModal
        isOpen={isDnaCardOpen}
        onClose={() => setIsDnaCardOpen(false)}
        userProfile={{
          name: currentUser?.name || 'Daisy',
          primaryAesthetic: 'Haute Sculptural & Neo-Origami',
          breakdown: [
            { label: 'Haute Couture Draping', percent: 45, color: '#146872' },
            { label: 'Tactical Origami Streetwear', percent: 30, color: '#A65539' },
            { label: 'Bio-Circularity & Raw Silks', percent: 15, color: '#84A98C' },
            { label: 'Wearable Tech & Cybernetics', percent: 10, color: '#06B6D4' }
          ],
          signatureTone: 'Bioluminescent Transformative Teal',
          powerGarment: 'Structured Origami Storm Hood with Liquid Train',
          issueAffinity: 'Belle Ligne Vol. 12 Exclusive'
        }}
        onOpenCreator={() => navigateTo('creator')}
      />

      <Magazine404
        isOpen={is404Open}
        onClose={() => setIs404Open(false)}
        onGoHome={() => {
          navigateTo('home');
          setIs404Open(false);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

    </div>
  );
}

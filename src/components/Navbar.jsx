import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Volume2, VolumeX, Sparkles, Bookmark, 
  User, Sun, Moon, Search, Compass, Sliders, BookOpen, Flame, Home, Palette, Film
} from 'lucide-react';
import { MAGAZINE_INFO } from '../data/magazineData';

export default function Navbar({ 
  onOpenAuth, 
  currentUser, 
  savedArticlesCount, 
  onOpenSaved, 
  onNavigate,
  currentPage,
  isMusicPlaying,
  toggleMusic,
  darkMode,
  toggleDarkMode,
  onOpenSearch,
  onOpenTryOn,
  onOpenPaletteFinder,
  onOpenStyleDna,
  onOpenGuide
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navPages = [
    { id: 'home', label: 'Home' },
    { id: 'runway', label: '3D Runway', badge: 'Live 3D' },
    { id: 'reels', label: 'Runway Reels', badge: 'Playable' },
    { id: 'flipbook', label: 'Magazine Library' },
    { id: 'lookbooks', label: 'Style Lookbook' },
    { id: 'moodboard', label: 'Mood Board', badge: 'Studio' },
    { id: 'fashion-suite', label: 'Culture & Designers', badge: 'New' },
    { id: 'editor-crm', label: "Daisy's CRM" },
  ];

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-[#0B0D11]/95 backdrop-blur-md shadow-lg py-2.5 border-b border-neutral-200/70 dark:border-neutral-800' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left: Issue Info & Brand Tag */}
            <div className="hidden lg:flex items-center space-x-3 text-[11px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200 dark:border-teal-800/60">
                {MAGAZINE_INFO.volume}
              </span>
              <span>Edited by Daisy</span>
            </div>

            {/* Center: Iconic Masthead "belle ligne" */}
            <div className="flex flex-col items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <h1 className={`font-editorial font-black tracking-tight text-neutral-900 dark:text-white lowercase leading-none select-none hover:text-teal-700 dark:hover:text-teal-400 transition-all duration-300 ${
                scrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}>
                {MAGAZINE_INFO.title}
              </h1>
              {!scrolled && (
                <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-mono mt-1 hidden sm:block">
                  {MAGAZINE_INFO.tagline}
                </span>
              )}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              
              {/* CREATE MAGAZINE BUTTON */}
              <button
                onClick={() => onNavigate('creator')}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-600 to-amber-600 hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                title="Design and paint your own digital magazine"
              >
                <Palette size={13} />
                <span>Create Magazine</span>
              </button>

              {/* Virtual Try-On Mannequin Trigger */}
              <button
                onClick={onOpenTryOn}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 dark:bg-neutral-800 text-teal-400 border border-neutral-700 hover:border-teal-400 text-xs font-semibold transition-all"
                title="Virtual Try-On / Outfit Builder"
              >
                <Sparkles size={13} />
                <span>Try-On</span>
              </button>

              {/* Color Palette Finder Trigger */}
              <button
                onClick={onOpenPaletteFinder}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 dark:bg-neutral-800 text-amber-400 border border-neutral-700 hover:border-amber-400 text-xs font-semibold transition-all"
                title="AI Color Palette Finder"
              >
                <Sun size={13} />
                <span>Palette</span>
              </button>

              {/* Style DNA Trigger */}
              <button
                onClick={onOpenStyleDna}
                className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 dark:bg-neutral-800 text-cyan-400 border border-neutral-700 hover:border-cyan-400 text-xs font-semibold transition-all"
                title="Your Style DNA Shareable Card"
              >
                <Sparkles size={13} />
                <span>Style DNA</span>
              </button>

              {/* Guide / How to Use Trigger */}
              <button
                onClick={onOpenGuide}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/50 text-teal-300 hover:text-white hover:bg-teal-900 text-xs font-semibold transition-all shadow"
                title="Interactive Guide & Tour"
              >
                <Compass size={13} className="text-teal-400 animate-spin-slow" />
                <span className="hidden sm:inline">Guide</span>
              </button>

              {/* Search Modal Trigger */}
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-teal-600 transition-colors"
                title="Search Stories & Trends"
                aria-label="Search"
              >
                <Search size={15} />
              </button>

              {/* Runway Music Equalizer Toggle */}
              <button
                onClick={toggleMusic}
                className={`p-2 rounded-full border transition-all flex items-center space-x-1.5 ${
                  isMusicPlaying
                    ? 'bg-teal-600 border-teal-500 text-white shadow-md shadow-teal-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-teal-600'
                }`}
                title="Catwalk Music Beat"
                aria-label="Runway Music Beat"
              >
                {isMusicPlaying ? (
                  <div className="flex items-end space-x-0.5 h-3.5 px-0.5">
                    <span className="w-0.5 bg-white h-2 animate-pulse" />
                    <span className="w-0.5 bg-white h-3.5 animate-bounce" />
                    <span className="w-0.5 bg-white h-1.5 animate-pulse" />
                  </div>
                ) : (
                  <VolumeX size={15} />
                )}
              </button>

              {/* Dark Mode Switcher */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-teal-600 transition-colors"
                title="Toggle Day/Editorial Dark Theme"
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Saved Articles Drawer Trigger */}
              <button
                onClick={onOpenSaved}
                className="relative p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-teal-600 transition-colors"
                title="Saved Articles & Wardrobe"
                aria-label="Reading Wardrobe"
              >
                <Bookmark size={15} />
                {savedArticlesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {savedArticlesCount}
                  </span>
                )}
              </button>

              {/* Sign In / Profile Button */}
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold tracking-wide hover:brightness-110 transition-all shadow"
              >
                <User size={13} />
                <span className="hidden sm:inline">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg lg:hidden text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>
          </div>

          {/* Dedicated Page Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 pt-2.5 pb-1 border-t border-neutral-200/50 dark:border-neutral-800/60 mt-2 text-xs font-semibold uppercase tracking-wider">
            {navPages.map((page) => (
              <button
                key={page.id}
                onClick={() => onNavigate(page.id)}
                className={`relative py-1 transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                  currentPage === page.id 
                    ? 'text-teal-600 dark:text-teal-400 font-bold' 
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <span>{page.label}</span>
                {page.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white font-mono uppercase font-bold animate-pulse">
                    {page.badge}
                  </span>
                )}
                {currentPage === page.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4 bg-white dark:bg-[#121419] border-b border-neutral-200 dark:border-neutral-800 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            <button
              onClick={() => {
                onNavigate('creator');
                setMobileMenuOpen(false);
              }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-teal-600 to-amber-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
            >
              <Palette size={16} />
              <span>Paint Your First Digital Magazine</span>
            </button>

            <div className="space-y-1">
              {navPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onNavigate(page.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg flex items-center justify-between ${
                    currentPage === page.id ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 font-bold' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>{page.label}</span>
                  {page.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                      {page.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Navigation" className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/95 dark:bg-[#0E1015]/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 py-2 px-3 shadow-[0_-5px_20px_rgba(0,0,0,0.15)]">
        <div className="flex items-center justify-around text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
          <button 
            onClick={() => onNavigate('home')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'home' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
          >
            <Home size={17} />
            <span>Home</span>
          </button>

          <button 
            onClick={() => onNavigate('runway')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'runway' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
          >
            <Flame size={17} className="text-rose-500" />
            <span>3D Ramp</span>
          </button>

          <button 
            onClick={() => onNavigate('reels')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'reels' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
          >
            <Film size={17} />
            <span>Reels</span>
          </button>

          <button 
            onClick={() => onNavigate('creator')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'creator' ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-amber-500 font-semibold'}`}
          >
            <Palette size={17} />
            <span>Paint</span>
          </button>

          <button 
            onClick={() => onNavigate('flipbook')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'flipbook' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
          >
            <BookOpen size={17} />
            <span>Library</span>
          </button>

          <button 
            onClick={() => onNavigate('editor-crm')} 
            className={`flex flex-col items-center space-y-1 ${currentPage === 'editor-crm' ? 'text-teal-600 dark:text-teal-400 font-bold' : ''}`}
          >
            <Sliders size={17} />
            <span>CRM</span>
          </button>
        </div>
      </nav>
    </>
  );
}

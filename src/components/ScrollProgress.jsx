import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }

      // Check current visible section
      const sections = ['hero', 'trending-strip', 'runway', 'runway-reels', 'reader', 'lookbook', 'editor-letter', 'contents', 'stories'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Topmost Hairline Gradient Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-teal-500 via-teal-300 to-amber-400 transition-all duration-75 ease-out shadow-[0_0_10px_#2cb0bf]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Right-Side Section Navigator (Desktop) */}
      <aside aria-label="Section navigation" className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center space-y-3 pointer-events-auto">
        <div className="bg-black/40 dark:bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 flex flex-col space-y-2 shadow-xl">
          {[
            { id: 'hero', label: 'Top' },
            { id: 'runway', label: '3D' },
            { id: 'runway-reels', label: 'Reels' },
            { id: 'reader', label: 'Book' },
            { id: 'lookbook', label: 'Swipe' },
            { id: 'editor-letter', label: 'Letter' },
            { id: 'stories', label: 'Feed' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              title={item.label}
              className={`group relative flex items-center justify-center p-1 rounded-full transition-all ${
                activeSection === item.id ? 'scale-125' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSection === item.id ? 'bg-teal-400 shadow-[0_0_8px_#2cb0bf]' : 'bg-neutral-400 group-hover:bg-white'
                }`}
              />
              {/* Tooltip on hover */}
              <span className="absolute right-6 px-2 py-0.5 rounded bg-black/85 text-[10px] font-mono uppercase tracking-wider text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

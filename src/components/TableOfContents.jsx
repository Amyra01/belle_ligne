import React from 'react';
import { ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import { TABLE_OF_CONTENTS } from '../data/magazineData';

export default function TableOfContents({ onSelectArticle }) {
  return (
    <section className="relative w-full rounded-2xl bg-[#F4EFEB] dark:bg-[#14161C] p-6 sm:p-10 lg:p-12 border border-[#E5DDD5] dark:border-neutral-800 shadow-xl transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Authentic Contents List matching the uploaded image */}
        <div className="lg:col-span-7">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xs uppercase font-mono tracking-widest text-teal-700 dark:text-teal-400 font-semibold">
              Vol. 12 • A/W 2028 Directory
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase mb-8">
            Contents
          </h2>

          <div className="space-y-4">
            {TABLE_OF_CONTENTS.map((item) => (
              <div
                key={item.num}
                onClick={() => onSelectArticle(item.articleId)}
                className="group flex items-baseline justify-between py-3 border-b border-neutral-300 dark:border-neutral-800 hover:border-teal-600 dark:hover:border-teal-400 cursor-pointer transition-all duration-200"
              >
                <div className="flex items-baseline space-x-4 sm:space-x-6">
                  <span className="font-editorial text-lg sm:text-xl font-bold text-neutral-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {item.num}
                  </span>
                  
                  <div>
                    <h3 className="font-editorial text-base sm:text-lg font-bold tracking-wide uppercase text-neutral-800 dark:text-neutral-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 text-teal-600 dark:text-teal-400">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Editorial Moodboard Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
            <img 
              src="/images/contents_style.jpg" 
              alt="Belle Ligne Editorial Contents Moodboard"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
            />

            <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/75 backdrop-blur-md text-white border border-white/20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 block">
                Editorial Moodboard
              </span>
              <span className="font-serif italic text-base">
                "Style Builds Tomorrow"
              </span>
            </div>

            <div className="absolute bottom-4 right-4 p-2.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-md border border-neutral-300 dark:border-neutral-700 text-xs">
              <p className="font-semibold text-neutral-900 dark:text-white">Curated by Daisy</p>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Editorial Director &amp; Platform Lead • PCTE IFDT</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

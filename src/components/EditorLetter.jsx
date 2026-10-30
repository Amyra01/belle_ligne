import React from 'react';
import { Quote, Sparkles, Feather } from 'lucide-react';
import { MAGAZINE_INFO } from '../data/magazineData';

export default function EditorLetter() {
  return (
    <section id="editor-letter" className="py-12 sm:py-16 scroll-mt-24">
      <div className="relative rounded-3xl bg-[#F4EFEB] dark:bg-[#14161D] border border-[#E5DDD5] dark:border-neutral-800 p-6 sm:p-12 shadow-xl overflow-hidden transition-colors">
        
        {/* Subtle Decorative Background Watermark */}
        <div className="absolute right-0 bottom-0 text-[180px] font-editorial font-bold text-neutral-300/20 dark:text-neutral-800/20 leading-none select-none pointer-events-none">
          BL
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Portrait Photo & Frame */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
              <img
                src="/images/contents_style.jpg"
                alt="Daisy - Editorial Director"
                className="w-full h-[400px] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 font-bold block">
                  Editorial Director &amp; Platform Lead
                </span>
                <h3 className="font-editorial text-2xl font-bold">
                  Daisy
                </h3>
                <p className="text-xs text-neutral-300 font-sans">
                  B.Tech CSE &amp; Fashion Media Specialist • PCTE IFDT
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Letter Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-700 dark:text-teal-400 font-semibold">
              <Feather size={14} />
              <span>Volume 12 Opening Dispatch</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight">
              Letter from the Editor
            </h2>

            <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 space-y-4 font-sans leading-relaxed">
              <p className="drop-cap">
                For over a century, the printed page was the sacred temple of fashion journalism. You waited an entire month for glossy prints to reach newsstands, inhaling the smell of fresh ink. Yet in our connected era, fashion occurs in milliseconds. The moment an origami collar struts across a Paris catwalk or an underground Tokyo collective reimagines streetwear, the culture has already shifted.
              </p>
              <p>
                Belle Ligne was born out of an interdisciplinary conviction: what happens when Computer Science engineering and Haute Couture design build a publication together? We refused to accept the static constraints of conventional fashion blogs. We engineered a platform with real-time 3D ramp walks, tactile digital flipbooks, paint creator studios, and machine-learning style discovery that treats each reader as an active participant, not a passive consumer.
              </p>
              <p className="italic text-neutral-600 dark:text-neutral-400 text-sm">
                "Fashion is an architectural shield for the spirit. In 2028, we step into the future with boldness, intention, and regenerative purpose."
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-neutral-300 dark:border-neutral-800/80 flex items-center justify-between">
              <div>
                <div className="font-signature text-4xl sm:text-5xl text-teal-800 dark:text-teal-300 font-bold tracking-wide">
                  Daisy
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">
                  Editorial Director, Belle Ligne Magazine
                </div>
              </div>

              <div className="text-right text-xs font-mono text-neutral-400">
                <div>Summer / A/W 2028</div>
                <div className="text-[10px]">PCTE Campus Edit</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target.closest('[data-cursor]');
      const isClickable = e.target.closest('button, a, input, select, textarea, [role="button"]');

      if (target) {
        setCursorText(target.getAttribute('data-cursor') || 'VIEW');
        setIsHovered(true);
      } else if (isClickable) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Fluid spring physics for the trailing gold/teal ring
    let animId;
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Pinpoint */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-teal-400 to-amber-300 pointer-events-none z-[9999] shadow-[0_0_12px_rgba(44,176,191,0.9)]"
      />

      {/* Luxury Trailing Animated Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          cursorText
            ? '-ml-9 -mt-9 w-20 h-20 bg-[#07252C]/90 text-white backdrop-blur-md border border-teal-400/80 shadow-[0_0_25px_rgba(20,104,114,0.6)] scale-100'
            : isHovered
            ? '-ml-6 -mt-6 w-12 h-12 border-2 border-amber-400/80 bg-teal-500/10 scale-110 shadow-[0_0_15px_rgba(203,178,121,0.4)]'
            : '-ml-4 -mt-4 w-8 h-8 border border-teal-500/40'
        }`}
      >
        {cursorText && (
          <span className="text-[10px] font-mono tracking-widest font-bold uppercase text-teal-200 select-none animate-pulse">
            [{cursorText}]
          </span>
        )}
      </div>
    </>
  );
}

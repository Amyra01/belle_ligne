import React, { useRef, useState } from 'react';
import { 
  Dna, Sparkles, Download, Share2, ArrowLeft, 
  Check, RefreshCw, Palette, Award, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StyleDNACardModal({ isOpen, onClose, userProfile, onOpenCreator }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const profile = userProfile || {
    name: 'Daisy',
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
  };

  const handleDownloadCard = () => {
    setIsExporting(true);

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 840;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 600, 840);
    bgGrad.addColorStop(0, '#090C12');
    bgGrad.addColorStop(0.5, '#101724');
    bgGrad.addColorStop(1, '#05070A');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 600, 840);

    // Glowing border
    ctx.strokeStyle = '#146872';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 800);

    // Inner gold hairline
    ctx.strokeStyle = '#D4AF3744';
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 30, 540, 780);

    // Header Masthead
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.fillText('belle ligne', 300, 80);

    ctx.fillStyle = '#4EC7D4';
    ctx.font = 'bold 11px monospace';
    ctx.letterSpacing = '3px';
    ctx.fillText('OFFICIAL STYLE DNA REPORT • A/W 2028', 300, 105);

    // User Name & Badge
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px "Playfair Display", Georgia, serif';
    ctx.fillText(profile.name.toUpperCase(), 300, 160);

    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Primary Aesthetic: ${profile.primaryAesthetic}`, 300, 185);

    // Aesthetic Percent Bars
    ctx.textAlign = 'left';
    let startY = 240;
    profile.breakdown.forEach((item) => {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px sans-serif';
      ctx.fillText(item.label, 60, startY);

      ctx.textAlign = 'right';
      ctx.fillStyle = item.color;
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`${item.percent}%`, 540, startY);

      // Track bar
      ctx.fillStyle = '#1F2937';
      ctx.fillRect(60, startY + 8, 480, 8);

      // Fill bar
      ctx.fillStyle = item.color;
      ctx.fillRect(60, startY + 8, (480 * item.percent) / 100, 8);

      startY += 50;
      ctx.textAlign = 'left';
    });

    // Signature traits box
    ctx.fillStyle = '#111827';
    ctx.fillRect(60, startY + 20, 480, 130);
    ctx.strokeStyle = '#374151';
    ctx.strokeRect(60, startY + 20, 480, 130);

    ctx.fillStyle = '#4EC7D4';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('COLOR SIGNATURE', 80, startY + 50);
    ctx.fillStyle = '#E5E7EB';
    ctx.font = '13px sans-serif';
    ctx.fillText(profile.signatureTone, 80, startY + 70);

    ctx.fillStyle = '#4EC7D4';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('POWER GARMENT', 80, startY + 105);
    ctx.fillStyle = '#E5E7EB';
    ctx.font = '13px sans-serif';
    ctx.fillText(profile.powerGarment, 80, startY + 125);

    // Footer
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px monospace';
    ctx.fillText('CURATED BY DAISY • PCTE CSE × IFDT 2028', 300, 770);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.download = `style-dna-${profile.name.toLowerCase()}-2028.jpg`;
    link.href = dataUrl;
    link.click();

    setIsExporting(false);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + '#style-dna');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0C0E14] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 bg-[#11141D] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Dna size={16} />
            </div>
            <div>
              <h3 className="text-sm font-serif font-bold text-white">Your Editorial Style DNA Card</h3>
              <span className="text-[10px] font-mono uppercase text-teal-400">Algorithmic Aesthetic Identity</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Card Body */}
        <div ref={cardRef} className="p-6 space-y-6 overflow-y-auto">
          
          {/* Identity Header */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#151A26] to-[#0A0D14] border border-teal-500/40 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-teal-300 font-bold block mb-1">
              BELLE LIGNE ARCHIVE 2028
            </span>
            <h2 className="text-2xl font-editorial font-bold text-white mb-1">
              {profile.name}
            </h2>
            <div className="inline-block px-3 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-[11px] font-mono font-semibold">
              {profile.primaryAesthetic}
            </div>
          </div>

          {/* Aesthetic Bars */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-neutral-400 block font-bold">
              Aesthetic Composition
            </span>
            {profile.breakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-sans text-neutral-200">
                  <span>{item.label}</span>
                  <span className="font-mono font-bold" style={{ color: item.color }}>{item.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Signature Traits */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[9px] font-mono uppercase text-teal-400 block mb-1">Color Signature</span>
              <p className="font-semibold text-neutral-200">{profile.signatureTone}</p>
            </div>
            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <span className="text-[9px] font-mono uppercase text-teal-400 block mb-1">Power Silhouette</span>
              <p className="font-semibold text-neutral-200">{profile.powerGarment}</p>
            </div>
          </div>

          {/* Actions: Download Card & Share */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadCard}
              disabled={isExporting}
              className="py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-teal-600/30"
            >
              <Download size={14} />
              <span>{isExporting ? 'Generating...' : 'Download Card'}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all"
            >
              {copied ? <Check size={14} /> : <Share2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Share DNA'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

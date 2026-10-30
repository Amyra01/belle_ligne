import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, Download, Upload, Palette, Type, Sparkles, 
  Trash2, RotateCcw, Check, Bookmark, Layers, Eye, RefreshCw, Stamp,
  Layout, Image as ImageIcon, Sliders, Sun, Shield, Wand2, Maximize2,
  Move, Plus, ZoomIn, ZoomOut, Scissors, Sparkle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MagazineCreator({ onBack, onMagazineSaved, currentUser }) {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const stickerInputRef = useRef(null);

  // Drawing & Canvas Settings
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('brush'); // 'brush', 'highlighter', 'eraser', 'glow'
  const [brushColor, setBrushColor] = useState('#146872');
  const [brushSize, setBrushSize] = useState(8);
  const [activeFilter, setActiveFilter] = useState('none'); // 'none', 'grayscale', 'noir', 'vintage', 'glow'

  // Editorial Typographic Headers
  const [magazineTitle, setMagazineTitle] = useState('belle ligne');
  const [titleFont, setTitleFont] = useState('serif'); // 'serif', 'sans', 'cormorant', 'display'
  const [magazineHeadline, setMagazineHeadline] = useState('THE FUTURE IS NOW');
  const [magazineSubhead, setMagazineSubhead] = useState('Autumn / Winter 2028 • Special Issue');
  const [issueNumber, setIssueNumber] = useState('VOL. 14 • ISSUE 01');
  const [badgeText, setBadgeText] = useState('EXCLUSIVE EDIT');
  const [textColor, setTextColor] = useState('#FFFFFF');
  
  // Custom Images / Gallery Layers State
  const [galleryImages, setGalleryImages] = useState([
    { id: 'stock-1', name: 'Teal Silk Couture', src: '/images/cover_teal.jpg' },
    { id: 'stock-2', name: 'Paris Midnight Noir', src: '/images/cover_paris_noir.jpg' },
    { id: 'stock-3', name: 'Milanese Gold', src: '/images/cover_milan_gold.jpg' },
    { id: 'stock-4', name: 'Tokyo Cyber Tech', src: '/images/cover_tokyo_cyber.jpg' },
    { id: 'stock-5', name: 'Origami Streetwear', src: '/images/feature_streetwear.jpg' },
    { id: 'stock-6', name: 'Eco Linen Drape', src: '/images/cover_sustainable_linen.jpg' },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState('/images/cover_teal.jpg');
  const [placedStickers, setPlacedStickers] = useState([]); // user gallery elements dropped on canvas
  const [history, setHistory] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery', 'templates', 'paint', 'type', 'models'

  // Model Asset Cutouts to Stamp
  const modelStickers = [
    { name: 'Catwalk Stride', src: '/images/model_walk_1.jpg' },
    { name: 'Studio Editorial', src: '/images/model_walk_2.jpg' },
    { name: 'Runway Gala', src: '/images/model_walk_3.jpg' },
    { name: 'Street Pose', src: '/images/model_walk_4.jpg' },
    { name: 'Origami Hood', src: '/images/model_walk_5.jpg' },
  ];

  const colors = [
    '#146872', // Teal
    '#A65539', // Terracotta
    '#D4AF37', // Gold
    '#111215', // Black
    '#FFFFFF', // White
    '#4EC7D4', // Cyan
    '#E11D48', // Rose
    '#A78BFA', // Violet
    '#10B981', // Emerald
    '#F59E0B'  // Amber
  ];

  // Load selected template / background picture
  useEffect(() => {
    loadTemplateImage(selectedTemplate);
  }, [selectedTemplate]);

  const loadTemplateImage = (src) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      applyFilterToCanvas();
      saveState();
    };
  };

  const applyFilterToCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (activeFilter === 'noir') {
      ctx.fillStyle = 'rgba(10, 12, 18, 0.35)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (activeFilter === 'glow') {
      ctx.fillStyle = 'rgba(20, 104, 114, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (activeFilter === 'vintage') {
      ctx.fillStyle = 'rgba(192, 128, 77, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory(prev => [...prev.slice(-15), canvas.toDataURL()]);
  };

  // Drawing Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x * (canvas.width / rect.width), y * (canvas.height / rect.height));
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (!clientX || !clientY) return;

    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else if (tool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = `${brushColor}55`; // translucent
      ctx.lineWidth = brushSize * 2.5;
    } else if (tool === 'glow') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 15;
      ctx.shadowColor = brushColor;
      ctx.strokeStyle = brushColor;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;
      ctx.strokeStyle = brushColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newHistory = [...history];
    newHistory.pop();
    const prevState = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const img = new Image();
    img.src = prevState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  // Upload Photo from User's Own Device / Gallery
  const handleUserGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const newImgItem = {
        id: `user-upload-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, "").slice(0, 20),
        src: dataUrl,
        isCustom: true
      };
      setGalleryImages(prev => [newImgItem, ...prev]);
      // Set directly as the canvas cover or stamp
      setSelectedTemplate(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Stamp or Layer an image from the gallery onto the canvas at custom coordinates
  const stampImageFromGallery = (imgSrc, xRatio = 0.5, yRatio = 0.65, width = 280, height = 360) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;
    img.onload = () => {
      ctx.globalCompositeOperation = 'source-over';
      const posX = canvas.width * xRatio - width / 2;
      const posY = canvas.height * yRatio - height / 2;
      
      // Save canvas state for shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 20;
      ctx.drawImage(img, posX, posY, width, height);
      ctx.restore();

      saveState();
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.6 } });
    };
  };

  // Generate Full Finished Cover Canvas Composite
  const generateCompositeCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return '';

    const compCanvas = document.createElement('canvas');
    compCanvas.width = 600;
    compCanvas.height = 800;
    const ctx = compCanvas.getContext('2d');

    // 1. Draw base drawing/photo canvas
    ctx.drawImage(canvas, 0, 0, 600, 800);

    // 2. Gradients for editorial legibility
    const topGrad = ctx.createLinearGradient(0, 0, 0, 240);
    topGrad.addColorStop(0, 'rgba(0,0,0,0.7)');
    topGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, 600, 240);

    const botGrad = ctx.createLinearGradient(0, 520, 0, 800);
    botGrad.addColorStop(0, 'rgba(0,0,0,0)');
    botGrad.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, 520, 600, 280);

    // 3. Draw Masthead
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';

    let fontFam = '"Playfair Display", Georgia, serif';
    if (titleFont === 'sans') fontFam = '"Plus Jakarta Sans", sans-serif';
    if (titleFont === 'display') fontFam = '"Syne", sans-serif';
    if (titleFont === 'cormorant') fontFam = '"Cormorant Garamond", serif';

    ctx.font = `bold 62px ${fontFam}`;
    ctx.fillText(magazineTitle.toLowerCase(), 300, 85);

    // 4. Sub-masthead
    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#4EC7D4';
    ctx.letterSpacing = '3px';
    ctx.fillText('DIGITAL FASHION MAGAZINE • EDITED BY DAISY', 300, 110);

    // 5. Volume Badge
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(issueNumber, 36, 175);

    // 6. Right Badge
    if (badgeText) {
      ctx.textAlign = 'right';
      ctx.fillStyle = brushColor;
      ctx.fillRect(450, 160, 115, 22);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(badgeText.toUpperCase(), 555, 175);
    }

    // 7. Bottom Headlines
    ctx.textAlign = 'left';
    ctx.font = 'bold 32px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(magazineHeadline, 36, 680);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#E5E5E5';
    ctx.fillText(magazineSubhead, 36, 715);

    // 8. Footer Credit Bar
    ctx.font = '10px monospace';
    ctx.fillStyle = '#9CA3AF';
    ctx.fillText(`CURATED BY ${currentUser?.name?.toUpperCase() || 'DAISY'} • PCTE IFDT`, 36, 765);

    return compCanvas.toDataURL('image/jpeg', 0.92);
  };

  const handleDownload = () => {
    const finalDataUrl = generateCompositeCover();
    const link = document.createElement('a');
    link.download = `${magazineTitle.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.jpg`;
    link.href = finalDataUrl;
    link.click();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handlePublishMagazine = async () => {
    setIsSaving(true);
    const finalDataUrl = generateCompositeCover();

    const newMagazinePayload = {
      id: `user-mag-${Date.now()}`,
      volume: issueNumber.split('•')[0]?.trim() || 'VOL. 14',
      issue: issueNumber.split('•')[1]?.trim() || 'ISSUE 01',
      season: 'Autumn / Winter 2028',
      title: magazineHeadline,
      subtitle: magazineSubhead,
      coverImage: finalDataUrl,
      editor: currentUser?.name || 'Daisy',
      pagesCount: 42,
      featured: true,
      accentColor: brushColor,
      description: `Bespoke digital magazine designed by ${currentUser?.name || 'Daisy'} using Belle Ligne Studio. Includes custom gallery imagery and hand-painted typography.`,
      tags: ['Reader Creation', 'Custom Spread', 'Belle Ligne Studio', 'Digital Paint'],
      isUserCreated: true,
      createdAt: new Date().toISOString()
    };

    try {
      await fetch('http://localhost:5000/api/magazines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMagazinePayload)
      });
    } catch (e) {
      console.log('Saved locally to memory');
    }

    if (onMagazineSaved) {
      onMagazineSaved(newMagazinePayload);
    }

    setIsSaving(false);
    setSaveSuccess(true);
    confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#07090D] text-white py-6 px-3 sm:px-6 select-none">
      
      {/* Top Header Controls Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-serif tracking-wider transition-colors"
          >
            <ArrowLeft size={14} className="text-teal-400" />
            <span>Back to Magazine</span>
          </button>
          
          <div className="hidden sm:block">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
              Belle Ligne Digital Magazine Studio
            </span>
            <span className="text-[10px] text-neutral-400 block font-mono">
              Lead Designer: {currentUser?.name || 'Daisy'} (PCTE CSE × IFDT)
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 transition-colors"
            title="Download HD Cover Image"
          >
            <Download size={14} />
            <span className="hidden md:inline">Download HD</span>
          </button>

          <button
            onClick={handlePublishMagazine}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-500 hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-teal-600/30 transition-all hover:scale-105"
          >
            {saveSuccess ? <Check size={14} /> : <Bookmark size={14} />}
            <span>{isSaving ? 'Publishing...' : saveSuccess ? 'Published to Library!' : 'Publish to Magazine'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        
        {/* Left Creator Toolbar */}
        <div className="lg:col-span-5 space-y-5 bg-[#101319] p-5 sm:p-6 rounded-3xl border border-neutral-800/90 shadow-2xl">
          
          {/* Tab Switcher */}
          <div className="grid grid-cols-5 p-1 rounded-2xl bg-black/50 border border-neutral-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center ${
                activeTab === 'gallery' ? 'bg-teal-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Upload size={12} className="mb-0.5" />
              <span className="text-[10px]">Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center ${
                activeTab === 'templates' ? 'bg-teal-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layout size={12} className="mb-0.5" />
              <span className="text-[10px]">Themes</span>
            </button>

            <button
              onClick={() => setActiveTab('paint')}
              className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center ${
                activeTab === 'paint' ? 'bg-teal-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Palette size={12} className="mb-0.5" />
              <span className="text-[10px]">Paint</span>
            </button>

            <button
              onClick={() => setActiveTab('type')}
              className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center ${
                activeTab === 'type' ? 'bg-teal-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Type size={12} className="mb-0.5" />
              <span className="text-[10px]">Type</span>
            </button>

            <button
              onClick={() => setActiveTab('models')}
              className={`py-2 rounded-xl transition-all flex flex-col items-center justify-center ${
                activeTab === 'models' ? 'bg-teal-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Stamp size={12} className="mb-0.5" />
              <span className="text-[10px]">Models</span>
            </button>
          </div>

          {/* TAB 1: USER OWN GALLERY & PHOTOS */}
          {activeTab === 'gallery' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold flex items-center space-x-1.5">
                  <ImageIcon size={14} />
                  <span>Your Device Photo Gallery</span>
                </label>
                <span className="text-[10px] text-neutral-400">{galleryImages.length} images</span>
              </div>

              {/* Upload Button */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-teal-500/50 hover:border-teal-400 rounded-2xl p-4 text-center cursor-pointer bg-teal-950/20 hover:bg-teal-950/40 transition-all flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-10 h-10 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-teal-200">Add Picture From Your Own Gallery</p>
                  <p className="text-[10px] text-neutral-400">Click to upload photos (PNG, JPG, WebP) from phone or laptop</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUserGalleryUpload}
                  className="hidden"
                />
              </div>

              {/* Gallery Grid with dual actions: Set as Full Cover or Stamp as Inset */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                  Click an image to set as background cover, or + Layer into spread:
                </span>

                <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 p-1 flex flex-col justify-between hover:border-teal-500/70 transition-all"
                    >
                      <img src={img.src} alt={img.name} className="w-full h-24 object-cover rounded-xl" />
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-200 font-semibold truncate max-w-[90px]">
                          {img.name}
                        </span>
                        {img.isCustom && (
                          <span className="text-[8px] bg-teal-900 text-teal-300 px-1.5 py-0.5 rounded font-mono">
                            Yours
                          </span>
                        )}
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center p-2 space-y-1.5">
                        <button
                          onClick={() => setSelectedTemplate(img.src)}
                          className="w-full py-1.5 rounded-lg bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-teal-500"
                        >
                          Set As Cover
                        </button>
                        <button
                          onClick={() => stampImageFromGallery(img.src)}
                          className="w-full py-1.5 rounded-lg bg-neutral-800 text-neutral-200 text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-700"
                        >
                          + Stamp on Canvas
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEMPLATES & FILTERS */}
          {activeTab === 'templates' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <label className="block text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Haute Couture Editorial Themes
              </label>

              <div className="grid grid-cols-2 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
                {galleryImages.slice(0, 6).map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.src)}
                    className={`relative rounded-2xl overflow-hidden border-2 p-1 text-left transition-all ${
                      selectedTemplate === tpl.src
                        ? 'border-teal-400 ring-2 ring-teal-500/50 scale-[1.02]'
                        : 'border-neutral-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={tpl.src} alt={tpl.name} className="w-full h-24 object-cover rounded-xl" />
                    <span className="text-[11px] text-white block mt-1 font-semibold truncate">{tpl.name}</span>
                  </button>
                ))}
              </div>

              {/* Filters */}
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1.5">Mood Lighting Filter</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {['none', 'glow', 'noir', 'vintage'].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setActiveFilter(f);
                        setTimeout(() => loadTemplateImage(selectedTemplate), 50);
                      }}
                      className={`py-1.5 rounded-xl text-[10px] font-mono uppercase border transition-colors ${
                        activeFilter === f ? 'bg-teal-600 text-white border-teal-500 font-bold' : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAINT TOOLS */}
          {activeTab === 'paint' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <label className="block text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Brushes, Highlighters &amp; Neon Glow
              </label>

              {/* Tool Selection */}
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  onClick={() => setTool('brush')}
                  className={`py-2 rounded-xl text-[11px] font-semibold border flex items-center justify-center space-x-1 transition-all ${
                    tool === 'brush' ? 'bg-teal-600 border-teal-500 text-white shadow' : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Palette size={13} />
                  <span>Brush</span>
                </button>

                <button
                  onClick={() => setTool('glow')}
                  className={`py-2 rounded-xl text-[11px] font-semibold border flex items-center justify-center space-x-1 transition-all ${
                    tool === 'glow' ? 'bg-teal-600 border-teal-500 text-white shadow' : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Sparkles size={13} />
                  <span>Neon</span>
                </button>

                <button
                  onClick={() => setTool('highlighter')}
                  className={`py-2 rounded-xl text-[11px] font-semibold border flex items-center justify-center space-x-1 transition-all ${
                    tool === 'highlighter' ? 'bg-teal-600 border-teal-500 text-white shadow' : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Wand2 size={13} />
                  <span>Shade</span>
                </button>

                <button
                  onClick={() => setTool('eraser')}
                  className={`py-2 rounded-xl text-[11px] font-semibold border flex items-center justify-center space-x-1 transition-all ${
                    tool === 'eraser' ? 'bg-amber-600 border-amber-500 text-white shadow' : 'border-neutral-800 text-neutral-400'
                  }`}
                >
                  <Trash2 size={13} />
                  <span>Eraser</span>
                </button>
              </div>

              {/* Color Swatches */}
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">Palette Swatches</span>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setBrushColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        brushColor === c ? 'scale-125 border-white ring-2 ring-teal-400' : 'border-transparent hover:scale-110'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Stroke Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Stroke Thickness</span>
                  <span>{brushSize}px</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="48"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>

              {/* Undo / Clear */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={undo}
                  className="flex-1 py-2 rounded-xl border border-neutral-700 bg-neutral-900 text-xs font-semibold flex items-center justify-center space-x-1.5 hover:bg-neutral-800"
                >
                  <RotateCcw size={13} />
                  <span>Undo Stroke</span>
                </button>

                <button
                  onClick={() => loadTemplateImage(selectedTemplate)}
                  className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-900 text-xs font-semibold hover:bg-neutral-800 text-rose-400"
                >
                  Clear Canvas
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: TYPOGRAPHY */}
          {activeTab === 'type' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <label className="block text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Editorial Masthead &amp; Headlines
              </label>

              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Magazine Title (Masthead)</span>
                <input
                  type="text"
                  value={magazineTitle}
                  onChange={(e) => setMagazineTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs font-bold text-white focus:ring-1 focus:ring-teal-500"
                />
              </div>

              {/* Font Family */}
              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Masthead Typography Style</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'serif', label: 'Playfair Serif' },
                    { id: 'display', label: 'Syne Display' },
                    { id: 'cormorant', label: 'Cormorant' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setTitleFont(f.id)}
                      className={`py-1.5 rounded-xl text-[10px] font-semibold border ${
                        titleFont === f.id ? 'bg-teal-600 border-teal-500 text-white' : 'border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Main Cover Story Headline</span>
                <input
                  type="text"
                  value={magazineHeadline}
                  onChange={(e) => setMagazineHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <span className="text-[10px] text-neutral-400 block mb-1">Subheading / Season</span>
                <input
                  type="text"
                  value={magazineSubhead}
                  onChange={(e) => setMagazineSubhead(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Volume Tag</span>
                  <input
                    type="text"
                    value={issueNumber}
                    onChange={(e) => setIssueNumber(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-[11px] text-white"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block mb-1">Corner Badge</span>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 text-[11px] text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MODELS & SILHOUETTES */}
          {activeTab === 'models' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <label className="block text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                Stamp Runway Models &amp; Silhouettes
              </label>

              <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {modelStickers.map((stk) => (
                  <button
                    key={stk.name}
                    onClick={() => stampImageFromGallery(stk.src, 0.5, 0.65, 300, 420)}
                    className="p-1 rounded-2xl border border-neutral-800 bg-neutral-900 hover:border-teal-500 group transition-all text-left"
                  >
                    <img src={stk.src} alt={stk.name} className="w-full h-28 object-cover rounded-xl group-hover:scale-105 transition-transform" />
                    <span className="text-[11px] text-white block mt-1.5 font-semibold font-mono">
                      + Stamp {stk.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Canvas: High-Resolution Real-Time Layout Board */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(20,104,114,0.35)] border-4 border-white/20 cursor-crosshair">
            
            {/* The HTML5 Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={600}
              height={800}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-[320px] sm:w-[420px] md:w-[460px] h-[426px] sm:h-[560px] md:h-[613px] bg-black touch-none"
            />

            {/* Live Editorial Typography Overlay Preview */}
            <div className="absolute inset-0 pointer-events-none p-6 sm:p-8 flex flex-col justify-between select-none">
              
              {/* Top Masthead */}
              <div className="text-center">
                <h2 className="font-editorial text-4xl sm:text-6xl font-black lowercase text-white tracking-tight drop-shadow-2xl">
                  {magazineTitle}
                </h2>
                <div className="text-[9px] font-mono tracking-[0.25em] uppercase text-teal-300 font-bold mt-1 drop-shadow">
                  DIGITAL FASHION MAGAZINE • EDITED BY DAISY
                </div>
              </div>

              {/* Mid Badges */}
              <div className="flex items-center justify-between text-xs font-mono text-white">
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 text-[10px] font-bold">
                  {issueNumber}
                </span>
                {badgeText && (
                  <span 
                    className="text-white px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider shadow"
                    style={{ backgroundColor: brushColor }}
                  >
                    {badgeText}
                  </span>
                )}
              </div>

              {/* Bottom Headlines */}
              <div className="space-y-1 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 rounded-2xl">
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow">
                  {magazineHeadline}
                </h3>
                <p className="text-xs text-neutral-200 font-sans line-clamp-2 font-light">
                  {magazineSubhead}
                </p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-white/10 mt-2">
                  <span>Edited by <strong>{currentUser?.name || 'Daisy'}</strong></span>
                  <span className="bg-white text-black px-2 py-0.5 rounded font-bold">|||| | |||</span>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-4 text-xs text-neutral-400 text-center font-sans max-w-md">
            Click <strong>"Gallery"</strong> to upload your own camera/gallery photos, draw or stamp models, and click <strong>"Publish to Magazine"</strong>!
          </div>
        </div>

      </div>

    </div>
  );
}

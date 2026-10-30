// Belle Ligne - Digital Fashion Magazine & Style Discovery Platform Data
// Authentic editorial content directed by Daisy (Editorial Director, Platform Lead)

export const MAGAZINE_INFO = {
  title: "belle ligne",
  tagline: "FASHION • CULTURE • FUTURE",
  volume: "VOL. 12 | ISSUE 01",
  season: "SUMMER / AUTUMN-WINTER 2028",
  subtitle: "A Digital Fashion Magazine & Style Discovery Platform",
  institution: "PCTE Institute of Engineering & Technology and Institute of Fashion Design & Technology",
  editor: "Daisy",
  editorRole: "Editorial Director & Platform Lead",
  editorDegree: "B.Tech CSE & Fashion Media Specialist",
  authors: [
    { name: "Daisy", role: "Editorial Director & Platform Lead", degree: "B.Tech CSE & Fashion Technology" }
  ]
};

export const CATEGORIES = [
  { id: "all", name: "All Stories", icon: "Sparkles" },
  { id: "runway", name: "Runway & Trends", icon: "Flame" },
  { id: "streetwear", name: "Street Style", icon: "Shirt" },
  { id: "sustainable", name: "Sustainable Fashion", icon: "Leaf" },
  { id: "designers", name: "Visionary Designers", icon: "Award" },
  { id: "textiles", name: "Textile Tech & Future", icon: "Cpu" },
  { id: "campus", name: "Campus & Next-Gen", icon: "Compass" }
];

// Complete Multi-Magazine Catalog (Over 9 Distinct Rich Volumes)
export const MAGAZINES_CATALOG = [
  {
    id: "vol-12",
    volume: "VOL. 12",
    issue: "ISSUE 01",
    season: "SUMMER / A-W 2028",
    title: "The Future Is Now",
    subtitle: "Transformative Teal Leads the 2028 Palette & Neo-Silhouettes",
    coverImage: "/images/cover_teal.jpg",
    editor: "Daisy",
    pagesCount: 68,
    featured: true,
    accentColor: "#146872",
    description: "The flagship edition investigating oceanic bioluminescence, liquid silk faille, and the boundary between physical tailoring and digital avatars.",
    tags: ["2028 Trends", "Transformative Teal", "Haute Couture", "Silk Faille"]
  },
  {
    id: "vol-11",
    volume: "VOL. 11",
    issue: "ISSUE 04",
    season: "SPRING 2028",
    title: "Streetwear Evolves",
    subtitle: "Street Meets Art — Bolder, Structured, More Expressive",
    coverImage: "/images/feature_streetwear.jpg",
    editor: "Daisy",
    pagesCount: 58,
    featured: true,
    accentColor: "#A65539",
    description: "Architectural cargo, origami folding mechanics, and technical weather-responsive gear redefining Paris and Tokyo streets.",
    tags: ["Streetwear", "Techwear", "Origami Fold", "Tokyo Runway"]
  },
  {
    id: "vol-10",
    volume: "VOL. 10",
    issue: "ISSUE 03",
    season: "A/W 2027",
    title: "The Next Wave",
    subtitle: "Avant-Garde Menswear & Sculptured Lapels",
    coverImage: "/images/cover_nextwave.jpg",
    editor: "Daisy",
    pagesCount: 52,
    featured: false,
    accentColor: "#C0804D",
    description: "Breaking traditional tailoring conventions with asymmetric ochre origami lapels, obsidian shields, and protective outerwear.",
    tags: ["Menswear", "Avant-Garde", "Origami Lapel", "Sculptural"]
  },
  {
    id: "vol-09",
    volume: "VOL. 09",
    issue: "ISSUE 02",
    season: "SUMMER 2027",
    title: "Style Builds Tomorrow",
    subtitle: "Directory of Sustainable Bio-Materials & Zero Waste",
    coverImage: "/images/contents_style.jpg",
    editor: "Daisy",
    pagesCount: 48,
    featured: false,
    accentColor: "#2cb0bf",
    description: "Exploring mycelium bio-leathers, closed-loop circular systems, and zero-waste pattern drafting methodologies.",
    tags: ["Circularity", "Zero Waste", "Bio-Leather", "Ethics"]
  },
  {
    id: "vol-08",
    volume: "VOL. 08",
    issue: "ISSUE 01",
    season: "WINTER 2027",
    title: "Paris Noir Edition",
    subtitle: "Dark Romanticism & Sculptured Velvet In Paris",
    coverImage: "/images/cover_paris_noir.jpg",
    editor: "Daisy",
    pagesCount: 62,
    featured: true,
    accentColor: "#2b1055",
    description: "A dark romantic exploration of structural corsetry, brooding midnight silhouettes, and Parisian night runways.",
    tags: ["Paris", "Midnight Noir", "Velvet", "Gothic Glamour"]
  },
  {
    id: "vol-07",
    volume: "VOL. 07",
    issue: "ISSUE 03",
    season: "AUTUMN 2026",
    title: "Milanese Gold & Satin",
    subtitle: "Opulence Redefined: Liquid Metallic Weaves",
    coverImage: "/images/cover_milan_gold.jpg",
    editor: "Daisy",
    pagesCount: 56,
    featured: false,
    accentColor: "#D4AF37",
    description: "Golden hour drapes, high-sheen satin trench coats, and gilded artisan embroidery from historical Milanese ateliers.",
    tags: ["Milan", "Liquid Gold", "High Sheen", "Luxury"]
  },
  {
    id: "vol-06",
    volume: "VOL. 06",
    issue: "ISSUE 02",
    season: "SPRING 2026",
    title: "Neo-Tokyo Cyberpunk",
    subtitle: "Neon Dystopia Meets High-Performance Techwear",
    coverImage: "/images/cover_tokyo_cyber.jpg",
    editor: "Daisy",
    pagesCount: 60,
    featured: false,
    accentColor: "#06B6D4",
    description: "Electroluminescent thread, waterproof ballistic nylon, and cybernetic visor aesthetics captured in Shibuya night rain.",
    tags: ["Tokyo", "Cyberpunk", "Techwear", "Futuristic"]
  },
  {
    id: "vol-05",
    volume: "VOL. 05",
    issue: "ISSUE 01",
    season: "SUMMER 2026",
    title: "Eco-Linen Solitude",
    subtitle: "Raw Organic Textures & Mediterranean Serenity",
    coverImage: "/images/cover_sustainable_linen.jpg",
    editor: "Daisy",
    pagesCount: 50,
    featured: false,
    accentColor: "#84A98C",
    description: "Undyed biological linens, sun-bleached cotton hemp, and flowing gender-free silhouettes inspired by coastal light.",
    tags: ["Eco-Linen", "Minimalist", "Organic", "Summer"]
  },
  {
    id: "vol-04",
    volume: "VOL. 04",
    issue: "ISSUE 04",
    season: "A/W 2025",
    title: "Architectural Avant-Garde",
    subtitle: "Geometric Extremes & Asymmetric Sculptures",
    coverImage: "/images/cover_avant_garde.jpg",
    editor: "Daisy",
    pagesCount: 54,
    featured: false,
    accentColor: "#E11D48",
    description: "Challenging human anatomy through 3D wireframe crinolines, angular shoulders, and hyper-conceptual fabric draping.",
    tags: ["Sculptural", "Avant-Garde", "Catwalk Extreme", "Art Couture"]
  }
];

export const ARTICLES = [
  {
    id: "trends-2028",
    index: "01",
    title: "Trends 2028: The Future Is Now & Transformative Teal",
    subtitle: "A curated edit of the silhouettes, emotional palettes, and attitudes defining 2028.",
    category: "runway",
    categoryLabel: "Runway & Trends",
    author: "Daisy (Editorial Director)",
    readTime: "6 min read",
    date: "Summer 2028",
    featured: true,
    coverImage: "/images/cover_teal.jpg",
    tags: ["Runway", "Color Forecast", "Teal", "Neo-Couture", "2028 Trends"],
    excerpt: "Transformative Teal leads the 2028 color forecast, fusing digital bio-luminescence with rich silk drape. As boundaries between virtual avatars and physical tailoring dissolve, silhouettes pivot to fluid hyper-elegance.",
    content: [
      "Fashion media has moved decisively from the printed page to the screen. Readers no longer wait for a monthly issue — they expect trend reports, styling ideas, and runway coverage the moment they happen.",
      "In 2028, the defining hue is unquestionably Transformative Teal: a shade suspended between oceanic depth and synthetic screen radiance. Unlike past minimalist neutral eras, 2028 embraces luminous saturation that shifts with ambient light.",
      "Couture houses in Paris and Milan are pairing this jewel tone with sweeping architectural capes, asymmetrical off-shoulder necklines, and liquid silk faille that billows with kinetic grace upon the catwalk.",
      "The runway does not merely predict what we will wear; it mirrors our social longing for quiet grandeur in a high-speed world."
    ],
    pullQuote: "Transformative Teal is neither nostalgic nor dystopian. It is the chromatic pulse of an optimistic next decade.",
    designerCredits: "Maison De L'Ombre & Atelier Daisy 2028"
  },
  {
    id: "streetwear-evolves",
    index: "02",
    title: "Streetwear Evolves: Bolder, Structured, More Expressive",
    subtitle: "Street Meets Art — in 2028, streetwear isn't just a style, it is a mindset.",
    category: "streetwear",
    categoryLabel: "Street Style",
    author: "Daisy & Editorial Desk",
    readTime: "5 min read",
    date: "A/W 2028",
    featured: true,
    coverImage: "/images/feature_streetwear.jpg",
    tags: ["Streetwear", "Techwear", "Origami Cut", "Tactical Cargo", "Tokyo Runway"],
    excerpt: "Think oversized silhouettes, technical ripstop fabrics, unexpected sculptural origami cuts, and a newly liberated sense of raw individuality taking over Paris, Tokyo, and Seoul.",
    content: [
      "In 2028, streetwear has severed its ties to predictable athletic logos. It has morphed into a sophisticated discipline of geometric tailoring and technical performance.",
      "Wide-leg parachute trousers with modular utility harness straps, structured angular storm hoods, and sculptural origami collars now command equal respect on the sidewalk and the high-fashion red carpet.",
      "Designers are blending utilitarian military archive references with Japanese paper-folding mechanics. The result? Garments that adapt their volume according to weather, movement, and emotional posture.",
      "The wearer is no longer a passive spectator of seasonal marketing: through modular zippers and cinched silhouette cords, each person crafts their own architectural silhouette."
    ],
    pullQuote: "In 2028, streetwear isn't just a style — it's an architectural mindset that walks among us.",
    designerCredits: "Kurogane Studio & Belle Ligne Lab"
  },
  {
    id: "the-next-wave",
    index: "03",
    title: "The Next Wave: Avant-Garde Menswear & Neo-Tailoring",
    subtitle: "Fashion beyond the obvious — breaking traditional gender codes with origami collars.",
    category: "runway",
    categoryLabel: "Runway & Trends",
    author: "Daisy (Editorial Director)",
    readTime: "7 min read",
    date: "A/W 2028",
    featured: true,
    coverImage: "/images/cover_nextwave.jpg",
    tags: ["Menswear", "Avant-Garde", "Origami Fold", "Sunglasses", "Sculptural"],
    excerpt: "Subverting the conventional suit, the 2028 menswear revolution combines sharp angular ochre folds with matte black utility cloaks, paired with cyber-tinted eyewear.",
    content: [
      "The conventional two-piece suit has officially completed its metamorphosis. What has emerged is a sculptured hybrid of ceremonial outerwear and industrial pragmatism.",
      "Our cover star showcases the season's boldest inflection: the asymmetric ochre lapel engineered like a faceted gemstone, contrasting sharply against rain-repellent matte carbon fabric.",
      "Eyewear shifts away from delicate wireframes toward bold wrap-around protective shields that command an unapologetic, futuristic stance.",
      "From Tokyo underground clubs to PCTE fashion exhibitions, young creatives are proving that tailored elegance can be as bold as sculpture."
    ],
    pullQuote: "We are casting off the dull uniform of the corporate past to build uniforms for tomorrow's thinkers.",
    designerCredits: "Origami Atelier Tokyo x Daisy Curation"
  },
  {
    id: "sustainability-future",
    index: "04",
    title: "Sustainability: A Kinder, Regenerative Future for Fashion",
    subtitle: "Beyond greenwashing: bio-fabricated mycelium leathers and closed-loop circularity.",
    category: "sustainable",
    categoryLabel: "Sustainable Fashion",
    author: "Daisy (Lead Editor)",
    readTime: "4 min read",
    date: "Issue 01",
    featured: false,
    coverImage: "/images/contents_style.jpg",
    tags: ["Circularity", "Zero Waste", "Bio-Leather", "Regenerative Cotton", "Ethics"],
    excerpt: "How emerging designers are eliminating virgin synthetics in favor of mushroom roots, algae dyes, and 100% recyclable mono-fiber collections.",
    content: [
      "True luxury in 2028 is measured not by scarcity, but by conscience. As Gen Z and Alpha readers demand radical supply-chain transparency, the fashion industry has been compelled to reimagine materials from the cellular level.",
      "Zero-waste pattern cutting techniques eliminate up to 18% of fabric scrap previously destined for landfills. Designers draft garment patterns like interlocking puzzle pieces where every square inch serves a structural purpose.",
      "At Belle Ligne, our editorial ethos places ecological accountability on equal footing with aesthetic drama."
    ],
    pullQuote: "If an outfit cannot safely return to the soil, it does not belong on tomorrow's runway.",
    designerCredits: "BioWeave Labs & Sustainable Design Collective"
  },
  {
    id: "textile-innovations",
    index: "05",
    title: "Textile Innovations: Smart Fabrics That Breathe and Move",
    subtitle: "Thermo-responsive weaves, solar-charging micro-threads, and kinetic draping.",
    category: "textiles",
    categoryLabel: "Textile Tech & Future",
    author: "Daisy (Tech & Editorial Lead)",
    readTime: "6 min read",
    date: "Summer 2028",
    featured: false,
    coverImage: "/images/cover_paris_noir.jpg",
    tags: ["Smart Fabrics", "Wearable Tech", "Thermochromic", "Nanotech", "Biomimicry"],
    excerpt: "The intersection of computer science and textile engineering: explore how self-regulating micro-capsules respond to body temperature and ambient humidity.",
    content: [
      "Where computer science meets material chemistry, clothing ceases to be static. The 2028 textile horizon introduces fibers embedded with phase-change micro-capsules.",
      "When the body's internal temperature rises during movement or transit, microscopic pores expand autonomously to release trapped heat, snapping shut in cold drafts without electronic batteries.",
      "This synergy between CSE engineering and Fashion Design embodies the very soul of Belle Ligne's interdisciplinary research."
    ],
    pullQuote: "Garments are becoming our second skin — responsive, communicative, and intelligent.",
    designerCredits: "PCTE Textile Engineering & Daisy's Smart Lab"
  },
  {
    id: "campus-style-insights",
    index: "06",
    title: "Campus Style & Gen Z Insights: What Tomorrow's Stylists Want",
    subtitle: "From student mood boards to international fashion week: how college culture drives trends.",
    category: "campus",
    categoryLabel: "Campus & Next-Gen",
    author: "Daisy (Editorial Director)",
    readTime: "5 min read",
    date: "Autumn 2028",
    featured: false,
    coverImage: "/images/cover_milan_gold.jpg",
    tags: ["Campus Style", "Gen Z", "Subculture", "DIY Aesthetics", "Thrift Upcycling"],
    excerpt: "College campuses are the world's most authentic fashion incubators. Inside the classrooms and corridors where student design flourishes.",
    content: [
      "Independent and student-run fashion content today is often relegated to ephemeral social reels. Yet college campuses remain the raw crucible where tomorrow's macro-trends are born.",
      "At PCTE Institute of Fashion Design and Technology, students are pioneering gender-fluid layering, reconstructed vintage denim, and hand-embroidered augmented reality markers.",
      "By marrying genuine student journalism with an enterprise web architecture, Belle Ligne provides the spotlight that youthful fashion journalism deserves."
    ],
    pullQuote: "The hallway is the real runway. The most fearless fashion always starts before graduation.",
    designerCredits: "PCTE IFDT Student Showcase 2028"
  }
];

export const TABLE_OF_CONTENTS = [
  { num: "01", title: "TRENDS 2028", desc: "What's shaping the next season", articleId: "trends-2028" },
  { num: "02", title: "FEATURE", desc: "The new face of streetwear & structured techwear", articleId: "streetwear-evolves" },
  { num: "03", title: "DESIGNERS", desc: "Visionaries redefining haute couture & silhouettes", articleId: "the-next-wave" },
  { num: "04", title: "SUSTAINABILITY", desc: "A kinder future for fashion & bio-materials", articleId: "sustainability-future" },
  { num: "05", title: "TEXTILE INNOVATIONS", desc: "Materials that move & smart fabrics", articleId: "textile-innovations" },
  { num: "06", title: "STYLING", desc: "Modern looks, real life & runway translation", articleId: "trends-2028" },
  { num: "07", title: "EVENTS", desc: "Global fashion highlights from Paris to Tokyo", articleId: "streetwear-evolves" },
  { num: "08", title: "CONSUMER INSIGHTS", desc: "What the next generation wants", articleId: "campus-style-insights" }
];

export const RUNWAY_OUTFITS = [
  {
    id: "teal-couture",
    gender: "female",
    modelName: "Elena V. (Haute Couture Catwalk)",
    title: "Transformative Teal Silk Gown",
    collection: "Belle Ligne Summer 2028 Collection",
    color: "#146872",
    accentColor: "#2cb0bf",
    garmentType: "Floor-length Sculptural Silk Gown with Asymmetric Cape",
    fabric: "100% Bio-Engineered Mulberry Silk with Liquid Satin Weave",
    movementProfile: "Gliding, billowing, high-drape fluid dynamics",
    designer: "Daisy (IFDT Paris Edit)",
    lightingMood: "Teal Gala Spotlight",
    spotlightHex: 0x146872,
    details: [
      { pin: "Neckline", desc: "Asymmetric sculpted cowl collar framing the collarbone" },
      { pin: "Cape", desc: "Detachable 2.4m silk organza floor train with aerodynamic hem" },
      { pin: "Waist", desc: "Internal corsetry with boned structure for architectural posture" }
    ]
  },
  {
    id: "streetwear-noir",
    gender: "male",
    modelName: "Kenji R. (Avant-Garde Streetwear)",
    title: "Neo-Cyber Structured Trench & Origami Lapel",
    collection: "Belle Ligne A/W 2028 Vol. 12",
    color: "#181A20",
    accentColor: "#A65539",
    garmentType: "Architectural Techwear Coat with Terracotta Origami Fold",
    fabric: "High-density Cordura Nylon with Terracotta Waxed Canvas Collar",
    movementProfile: "Structured, sharp geometric angles, deliberate stride",
    designer: "Daisy Techwear Studio",
    lightingMood: "Cyber Noir Amber Flash",
    spotlightHex: 0xA65539,
    details: [
      { pin: "Collar", desc: "Self-supporting 3D geometric origami collar in burnt terracotta" },
      { pin: "Utility Harness", desc: "Integrated modular load-bearing straps with magnetic buckles" },
      { pin: "Trousers", desc: "Extra-wide pleated tactical trousers with articulated knee darts" }
    ]
  },
  {
    id: "luxe-minimalist",
    gender: "female",
    modelName: "Sora M. (Modern Tailoring)",
    title: "Bioluminescent Champagne Slit Ensemble",
    collection: "Future Evening Capsule",
    color: "#E2DCD5",
    accentColor: "#CBB279",
    garmentType: "Bias-cut Silk Sheath with Gold Shimmer Threading",
    fabric: "Organic Peace Silk interwoven with Photonic Fibers",
    movementProfile: "Supple, light-catching liquid movement",
    designer: "Belle Ligne Milan Lab by Daisy",
    lightingMood: "Golden Hour Glow",
    spotlightHex: 0xCBB279,
    details: [
      { pin: "Fabric", desc: "Photonic nano-threads reflecting amber gallery lights" },
      { pin: "Slit", desc: "Sculpted thigh-high slit enabling 90cm runway stride" },
      { pin: "Back", desc: "Plunging geometric halter strap with brushed bronze clasp" }
    ]
  },
  {
    id: "mens-cyber-trench",
    gender: "male",
    modelName: "Marcus Thorne (Neo-Tokyo Line)",
    title: "All-Black Tactical Parachute Suit",
    collection: "Street Meets Art 2028",
    color: "#0B0C0E",
    accentColor: "#4ec7d4",
    garmentType: "Modular Oversized Cargo Parka & Cyber Bucket Hat",
    fabric: "Water-resistant Triple-weave Ripstop with Memory Shape Alloy",
    movementProfile: "Heavy, dynamic athletic gait with swagger",
    designer: "Kurogane x Daisy Lab",
    lightingMood: "Electric Neon Blue Spotlight",
    spotlightHex: 0x4ec7d4,
    details: [
      { pin: "Parka", desc: "Oversized storm collar with dual-access waterproof chest rig" },
      { pin: "Headwear", desc: "Structured tactical bucket hat with anti-glare brim" },
      { pin: "Footwear", desc: "Lug-soled chunky brutalist hybrid runway derbies" }
    ]
  }
];

// 100% Reliable, Playable Vertical Runway Reels (Local videos in public/videos)
export const RUNWAY_REELS_DATA = [
  {
    id: "reel-1",
    title: "Transformative Teal Paris Gala",
    designer: "Atelier Daisy",
    collection: "Paris Fashion Week 2028",
    tag: "Haute Couture",
    poster: "/images/cover_teal.jpg",
    videoUrl: "/videos/runway1.mp4",
    duration: "0:30",
    likes: 18400,
    commentsCount: 420,
    description: "Fluid cyan and transformative teal gowns gliding across the reflective water catwalk in Paris."
  },
  {
    id: "reel-2",
    title: "Tokyo Avant-Garde Origami Stride",
    designer: "Daisy × Kurogane Studio",
    collection: "Neo-Tokyo A/W 2028",
    tag: "Streetwear",
    poster: "/images/cover_nextwave.jpg",
    videoUrl: "/videos/runway2.mp4",
    duration: "0:25",
    likes: 21900,
    commentsCount: 560,
    description: "Sharp terracotta origami collar and cyber-protective eyewear dominating the catwalk."
  },
  {
    id: "reel-3",
    title: "Milanese Gold High-Sheen Walk",
    designer: "Belle Ligne Studio",
    collection: "Milan Runway Edit",
    tag: "Haute Couture",
    poster: "/images/cover_milan_gold.jpg",
    videoUrl: "/videos/runway3.mp4",
    duration: "0:28",
    likes: 15300,
    commentsCount: 310,
    description: "Fluid gold lamé and structured shoulder tailoring catching intense spotlights."
  },
  {
    id: "reel-4",
    title: "Midnight Velvet Paris Showcase",
    designer: "Daisy IFDT Lab",
    collection: "Night Couture 2028",
    tag: "Paris Noir",
    poster: "/images/cover_paris_noir.jpg",
    videoUrl: "/videos/runway1.mp4",
    duration: "0:32",
    likes: 24700,
    commentsCount: 680,
    description: "Deep obsidian velvet evening cloaks with corseted internal architectural bones."
  },
  {
    id: "reel-5",
    title: "Tokyo Cybernetic Tactical Cargo",
    designer: "Daisy Techwear Lab",
    collection: "Shibuya Underground",
    tag: "Streetwear",
    poster: "/images/cover_tokyo_cyber.jpg",
    videoUrl: "/videos/runway2.mp4",
    duration: "0:22",
    likes: 19600,
    commentsCount: 410,
    description: "Articulated ripstop knee pleats and magnetic harness straps shown in kinetic stride."
  },
  {
    id: "reel-6",
    title: "Bio-Circular Sustainable Linen Flow",
    designer: "Maison Belle Ligne",
    collection: "Future Mediterranean",
    tag: "Sustainable",
    poster: "/images/cover_sustainable_linen.jpg",
    videoUrl: "/videos/runway3.mp4",
    duration: "0:27",
    likes: 14100,
    commentsCount: 290,
    description: "Raw organic flax drape and zero-waste pattern drafting in graceful motion."
  }
];

export const STYLE_QUIZ_QUESTIONS = [
  {
    id: "vibe",
    question: "What is your primary fashion aesthetic?",
    options: [
      { label: "Haute Couture & Sculptural Elegance", tag: "runway", desc: "Silk drapes, gala grandeur, and refined high-concept silhouettes" },
      { label: "Avant-Garde & Tactical Streetwear", tag: "streetwear", desc: "Oversized cuts, origami collars, technical cargo, and urban attitude" },
      { label: "Eco-Conscious & Circular Minimalism", tag: "sustainable", desc: "Zero-waste patterns, bio-leathers, organic drapes, and earth tones" },
      { label: "Futuristic & Smart Wearable Tech", tag: "textiles", desc: "Adaptive fabrics, cyber accents, and thermo-responsive textiles" }
    ]
  },
  {
    id: "color",
    question: "Which 2028 color mood calls to you?",
    options: [
      { label: "Transformative Teal & Cyan Glow", tag: "teal", desc: "Luminous, aquatic, and sovereign digital royalty" },
      { label: "Burnt Terracotta & Obsidian Black", tag: "terracotta", desc: "Raw, earth-fired architectural contrast" },
      { label: "Monochrome Carbon & Concrete Gray", tag: "noir", desc: "Sleek, industrial, and hyper-modern precision" },
      { label: "Champagne Gold & Natural Flax", tag: "gold", desc: "Timeless warmth and serene understated luxury" }
    ]
  },
  {
    id: "occasion",
    question: "Where are you making your defining entrance?",
    options: [
      { label: "Front Row at Paris Fashion Week", tag: "runway" },
      { label: "Underground Art & Music Gallery in Tokyo", tag: "streetwear" },
      { label: "Sustainable Design Biennale in Copenhagen", tag: "sustainable" },
      { label: "University Campus & Creative Studio", tag: "campus" }
    ]
  }
];

export const EDITORIAL_ANALYTICS = {
  totalReaders: "168,920",
  activeSubscribers: "42,810",
  avgReadTime: "4m 58s",
  totalArticleSaves: "61,400",
  runway3dViews: "108,240",
  topTrending: [
    { title: "Trends 2028: Transformative Teal", views: 48100, saves: 14400, score: "99%" },
    { title: "Streetwear Evolves: Bolder & Structured", views: 42900, saves: 12800, score: "98%" },
    { title: "Paris Noir Edition: Velvet & Shadows", views: 36500, saves: 11200, score: "96%" },
    { title: "The Next Wave: Avant-Garde Menswear", views: 33200, saves: 10400, score: "94%" }
  ]
};

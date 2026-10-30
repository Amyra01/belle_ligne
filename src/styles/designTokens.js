// Belle Ligne Design Tokens
// System-wide variables for luxury editorial aesthetics, typography, radius, shadows, and color scales

export const DESIGN_TOKENS = {
  colors: {
    primary: {
      teal950: '#032024',
      teal900: '#07353b',
      teal800: '#0e4e56',
      teal700: '#146872', // Signature Belle Ligne Transformative Teal
      teal600: '#1e8894',
      teal500: '#2cb0bf',
      teal400: '#4ec7d4',
      teal100: '#e1f9fb',
      teal50: '#f0fcfd',
    },
    accent: {
      terracotta: '#A65539', // Origami collar burnt clay
      bronze: '#C0804D',
      gold: '#CBB279',
      champagne: '#E5DDD5',
      rose: '#E11D48',
      emerald: '#10B981',
    },
    neutral: {
      editorialBg: '#F8F7F4',
      editorialCard: '#FFFFFF',
      editorialDarkBg: '#090A0D',
      editorialDarkCard: '#121419',
      slate: '#2C3038',
      subtle: '#7E8695',
      borderLight: '#E8E4DF',
      borderDark: '#232731',
    }
  },

  typography: {
    fonts: {
      serifMasthead: '"Playfair Display", Georgia, serif',
      editorialClassic: '"Cormorant Garamond", Georgia, serif',
      modernBody: '"Plus Jakarta Sans", sans-serif',
      avantGardeDisplay: '"Syne", sans-serif',
      signatureScript: '"Alex Brush", "Caveat", cursive',
      monoMeta: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
    scale: {
      displayHero: 'clamp(2.5rem, 6vw, 5.5rem)',
      editorialH1: 'clamp(2rem, 4vw, 3.75rem)',
      editorialH2: 'clamp(1.5rem, 3vw, 2.75rem)',
      editorialH3: 'clamp(1.25rem, 2vw, 1.875rem)',
      bodyLarge: '1.125rem',
      bodyBase: '1rem',
      caption: '0.75rem',
      overline: '0.6875rem',
    }
  },

  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },

  shadows: {
    card: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
    cardHover: '0 20px 40px -15px rgba(20, 104, 114, 0.25)',
    magazineGloss: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
    glowTeal: '0 0 35px -5px rgba(20, 104, 114, 0.4)',
    glowAmber: '0 0 35px -5px rgba(166, 85, 57, 0.4)',
  },

  transitions: {
    default: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    spring: { type: 'spring', damping: 25, stiffness: 200 },
    magazineFlip: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
  }
};

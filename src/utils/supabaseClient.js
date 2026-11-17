import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (can be configured in .env or Vercel Environment Variables)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// True if live Supabase credentials are provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

// Instantiate Supabase client or null fallback
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback database sync keys
const LOCAL_STORAGE_KEYS = {
  MAGAZINES: 'belle_ligne_supabase_magazines',
  USERS: 'belle_ligne_supabase_users',
  LOOKS: 'belle_ligne_supabase_looks',
  BOARDS: 'belle_ligne_supabase_boards',
  ARTICLES: 'belle_ligne_supabase_articles',
  SUBSCRIBERS: 'belle_ligne_supabase_subscribers'
};

function getLocal(key, defaultVal = []) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

/**
 * 1. MAGAZINES SERVICE (Cloud Supabase + Fallback)
 */
export const magazineService = {
  async getAll() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('magazines')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && Array.isArray(data) && data.length > 0) {
          return data.map(m => ({
            id: m.id,
            title: m.title,
            subtitle: m.subtitle,
            volume: m.volume,
            issue: m.issue,
            season: m.season,
            coverImage: m.cover_image,
            editor: m.editor,
            pagesCount: m.pages_count,
            featured: m.featured,
            isUserCreated: m.is_user_created,
            accentColor: m.accent_color,
            description: m.description,
            tags: m.tags || []
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back:', err);
      }
    }
    // Fallback: Express API or LocalStorage
    try {
      const res = await fetch('http://localhost:5000/api/magazines');
      const data = await res.json();
      if (Array.isArray(data)) return data;
    } catch (e) {}
    return getLocal(LOCAL_STORAGE_KEYS.MAGAZINES, []);
  },

  async create(magazine) {
    const magPayload = {
      id: magazine.id || `custom-mag-${Date.now()}`,
      title: magazine.title,
      subtitle: magazine.subtitle,
      volume: magazine.volume || 'VOL. 14',
      issue: magazine.issue || 'ISSUE 01',
      season: magazine.season || 'AUTUMN / WINTER 2028',
      cover_image: magazine.coverImage || magazine.coverDataUrl,
      editor: magazine.editor || 'Daisy (Studio Member)',
      pages_count: magazine.pagesCount || 16,
      featured: true,
      is_user_created: true,
      accent_color: magazine.accentColor || magazine.palette || '#146872',
      description: magazine.description || 'Custom digital magazine created via Belle Ligne Studio.',
      tags: magazine.tags || ['Custom Magazine', 'Digital Paint']
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('magazines').insert([magPayload]);
        if (!error) console.log('✓ Magazine saved to Supabase Cloud Database');
      } catch (e) {
        console.warn('Supabase insert note:', e);
      }
    }

    // Always update local cache & call Express backend
    const current = getLocal(LOCAL_STORAGE_KEYS.MAGAZINES, []);
    setLocal(LOCAL_STORAGE_KEYS.MAGAZINES, [magazine, ...current]);

    try {
      await fetch('http://localhost:5000/api/magazines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(magazine)
      });
    } catch (e) {}

    return magazine;
  }
};

/**
 * 2. AUTH & PROFILES SERVICE
 */
export const authService = {
  async syncUser(user) {
    if (!user || !user.email) return user;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .upsert([{
            email: user.email.toLowerCase(),
            name: user.name || 'Daisy',
            role: user.role || 'Verified Reader',
            tier: user.tier || 'Haute Couture Studio',
            saved_articles: user.savedArticles || [],
            saved_looks: user.savedLooks || [],
            updated_at: new Date().toISOString()
          }], { onConflict: 'email' });
        if (!error) console.log('✓ Profile synced with Supabase Cloud Auth');
      } catch (e) {}
    }

    // Save to local storage & express
    localStorage.setItem('belle_ligne_user', JSON.stringify(user));
    try {
      await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
    } catch (e) {}

    return user;
  }
};

/**
 * 3. MOOD BOARDS SERVICE
 */
export const moodboardService = {
  async saveBoard(board) {
    const payload = {
      id: board.id || `board-${Date.now()}`,
      title: board.title || 'My Mood Board',
      items_count: board.itemsCount || 4,
      elements: board.elements || []
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('moodboards').insert([payload]);
        console.log('✓ Moodboard saved to Supabase');
      } catch (e) {}
    }

    const current = getLocal(LOCAL_STORAGE_KEYS.BOARDS, []);
    setLocal(LOCAL_STORAGE_KEYS.BOARDS, [board, ...current]);

    try {
      await fetch('http://localhost:5000/api/moodboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(board)
      });
    } catch (e) {}
    return board;
  }
};

/**
 * 4. SAVED LOOKS (Virtual Try-on) SERVICE
 */
export const looksService = {
  async saveLook(look, userEmail) {
    const payload = {
      id: look.id || `look-${Date.now()}`,
      user_email: userEmail || 'daisy.editor@pcte.edu.in',
      top_name: look.top?.name || '',
      top_color: look.top?.color || '',
      bottom_name: look.bottom?.name || '',
      bottom_color: look.bottom?.color || '',
      accessory_name: look.accessory?.name || '',
      skin_tone: look.skinTone || ''
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('saved_looks').insert([payload]);
        console.log('✓ Try-on look saved to Supabase');
      } catch (e) {}
    }

    const current = getLocal(LOCAL_STORAGE_KEYS.LOOKS, []);
    setLocal(LOCAL_STORAGE_KEYS.LOOKS, [look, ...current]);
    return look;
  }
};

/**
 * 5. EDITORIAL CMS WORKFLOW SERVICE
 */
export const workflowService = {
  async getArticles() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('editorial_articles')
          .select('*')
          .order('updated_at', { ascending: false });
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (e) {}
    }
    return getLocal(LOCAL_STORAGE_KEYS.ARTICLES, []);
  },

  async updateArticleStatus(id, stage, comment) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('editorial_articles')
          .update({ stage, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch (e) {}
    }
  }
};

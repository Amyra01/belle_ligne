import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Helper to load db
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading database file:', err);
  }
  return { 
    magazines: [], 
    customUserMagazines: [], 
    subscribers: [], 
    users: [], 
    articles: [],
    moodboards: [],
    styleDnaProfiles: {} 
  };
}

// Helper to save db
function saveDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to database file:', err);
    return false;
  }
}

// Root Dashboard — visual overview of the entire database
app.get('/', (req, res) => {
  const db = loadDB();
  const users = db.users || [];
  const subscribers = db.subscribers || [];
  const magazines = [...(db.magazines || []), ...(db.customUserMagazines || [])];
  const articles = db.articles || [];
  const moodboards = db.moodboards || [];

  const userRows = users.map(u => `
    <tr>
      <td>${u.name || '—'}</td>
      <td>${u.email}</td>
      <td>${u.role || '—'}</td>
      <td>${u.tier || '—'}</td>
      <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleString() : '—'}</td>
    </tr>
  `).join('');

  const subRows = subscribers.map(s => `
    <tr>
      <td>${s.name || '—'}</td>
      <td>${s.email}</td>
      <td>${s.tier || '—'}</td>
      <td>${s.date || '—'}</td>
    </tr>
  `).join('');

  const magRows = magazines.map(m => `
    <tr>
      <td>${m.title}</td>
      <td>${m.volume || ''} ${m.issue || ''}</td>
      <td>${m.editor || '—'}</td>
      <td>${m.isUserCreated ? '✦ User Created' : 'Catalog'}</td>
      <td>${(m.tags || []).join(', ')}</td>
    </tr>
  `).join('');

  const artRows = articles.map(a => `
    <tr>
      <td>${a.title}</td>
      <td>${a.author || '—'}</td>
      <td><span class="status-badge status-${a.status || 'draft'}">${(a.status || 'draft').toUpperCase()}</span></td>
      <td>${a.updatedAt ? new Date(a.updatedAt).toLocaleString() : '—'}</td>
    </tr>
  `).join('');

  const boardRows = moodboards.map(b => `
    <tr>
      <td>${b.title}</td>
      <td>${b.itemsCount || 0}</td>
      <td>${b.savedAt ? new Date(b.savedAt).toLocaleString() : '—'}</td>
    </tr>
  `).join('');

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Belle Ligne — Backend Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 2rem; }
    h1 { font-size: 2rem; font-weight: 300; letter-spacing: 0.15em; text-transform: uppercase; color: #5eead4; margin-bottom: 0.25rem; }
    .subtitle { color: #737373; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2rem; }
    .stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .stat-card { background: #171717; border: 1px solid #262626; border-radius: 12px; padding: 1.25rem 1.5rem; min-width: 160px; flex: 1; }
    .stat-card .num { font-size: 2rem; font-weight: 700; color: #5eead4; }
    .stat-card .lbl { font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: #a3a3a3; margin-top: 4px; }
    .section { margin-bottom: 2.5rem; }
    .section h2 { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.12em; color: #d4d4d4; border-bottom: 1px solid #262626; padding-bottom: 0.5rem; margin-bottom: 1rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    th { text-align: left; padding: 0.6rem 0.75rem; color: #737373; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #262626; }
    td { padding: 0.6rem 0.75rem; border-bottom: 1px solid #1a1a1a; color: #d4d4d4; }
    tr:hover td { background: #171717; }
    .status-badge { font-size: 0.65rem; padding: 3px 10px; border-radius: 999px; font-weight: 600; letter-spacing: 0.06em; }
    .status-draft { background: #422006; color: #fbbf24; }
    .status-in_review { background: #172554; color: #60a5fa; }
    .status-approved { background: #052e16; color: #4ade80; }
    .status-published { background: #134e4a; color: #5eead4; }
    .empty { color: #525252; font-style: italic; padding: 1rem 0; }
    .api-links { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem; }
    .api-links a { display: inline-block; padding: 6px 14px; border: 1px solid #262626; border-radius: 8px; color: #5eead4; text-decoration: none; font-size: 0.75rem; font-family: monospace; transition: all 0.2s; }
    .api-links a:hover { background: #134e4a; border-color: #5eead4; }
    .refresh { position: fixed; bottom: 1.5rem; right: 1.5rem; padding: 10px 20px; background: #134e4a; color: #5eead4; border: 1px solid #5eead4; border-radius: 10px; cursor: pointer; font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; }
    .refresh:hover { background: #5eead4; color: #0a0a0a; }
  </style>
</head>
<body>
  <h1>Belle Ligne</h1>
  <div class="subtitle">Backend Database Dashboard — Port ${PORT}</div>

  <div class="stats">
    <div class="stat-card"><div class="num">${users.length}</div><div class="lbl">Registered Users</div></div>
    <div class="stat-card"><div class="num">${subscribers.length}</div><div class="lbl">Subscribers</div></div>
    <div class="stat-card"><div class="num">${magazines.length}</div><div class="lbl">Total Magazines</div></div>
    <div class="stat-card"><div class="num">${articles.length}</div><div class="lbl">CMS Articles</div></div>
    <div class="stat-card"><div class="num">${moodboards.length}</div><div class="lbl">Mood Boards</div></div>
  </div>

  <div class="section">
    <h2>👤 Registered Users (Login Data)</h2>
    ${users.length ? '<table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Tier</th><th>Last Login</th></tr></thead><tbody>' + userRows + '</tbody></table>' : '<div class="empty">No users have logged in yet. Sign in from the frontend to see data here.</div>'}
  </div>

  <div class="section">
    <h2>📬 Subscribers</h2>
    ${subscribers.length ? '<table><thead><tr><th>Name</th><th>Email</th><th>Tier</th><th>Date</th></tr></thead><tbody>' + subRows + '</tbody></table>' : '<div class="empty">No subscribers yet.</div>'}
  </div>

  <div class="section">
    <h2>📖 Magazines</h2>
    ${magazines.length ? '<table><thead><tr><th>Title</th><th>Volume / Issue</th><th>Editor</th><th>Type</th><th>Tags</th></tr></thead><tbody>' + magRows + '</tbody></table>' : '<div class="empty">No magazines yet.</div>'}
  </div>

  <div class="section">
    <h2>✍️ CMS Articles</h2>
    ${articles.length ? '<table><thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Updated</th></tr></thead><tbody>' + artRows + '</tbody></table>' : '<div class="empty">No articles yet.</div>'}
  </div>

  <div class="section">
    <h2>🎨 Mood Boards</h2>
    ${moodboards.length ? '<table><thead><tr><th>Title</th><th>Items</th><th>Saved At</th></tr></thead><tbody>' + boardRows + '</tbody></table>' : '<div class="empty">No mood boards yet.</div>'}
  </div>

  <div class="api-links">
    <a href="/api/health">Health Check</a>
    <a href="/api/magazines">Magazines API</a>
    <a href="/api/crm/subscribers">Subscribers API</a>
    <a href="/api/crm/analytics">Analytics API</a>
    <a href="/api/cms/articles">Articles API</a>
    <a href="/api/moodboards">Moodboards API</a>
  </div>

  <button class="refresh" onclick="location.reload()">↻ Refresh Data</button>
</body>
</html>`);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Belle Ligne Backend & Database', editor: 'Daisy', timestamp: new Date().toISOString() });
});

// 1. Get All Magazines (Catalog + User Created)
app.get('/api/magazines', (req, res) => {
  const db = loadDB();
  const allMagazines = [...(db.magazines || []), ...(db.customUserMagazines || [])];
  res.json(allMagazines);
});

// 2. Save User-Created Magazine from Paint / Creator Studio
app.post('/api/magazines', (req, res) => {
  const { title, subtitle, issueNumber, coverDataUrl, coverImage, palette, accentColor, author, editor, tags } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Magazine title is required' });
  }

  const db = loadDB();
  if (!db.customUserMagazines) db.customUserMagazines = [];

  const newMagazine = {
    id: `custom-mag-${Date.now()}`,
    volume: `EDITION ${db.customUserMagazines.length + 1}`,
    issue: issueNumber || 'ISSUE 01',
    season: 'CREATOR SPECIAL 2028',
    title: title.trim(),
    subtitle: subtitle || 'Custom digital magazine created via Belle Ligne Studio.',
    coverImage: coverImage || coverDataUrl || '/images/cover_teal.jpg',
    editor: editor || author || 'Daisy (Studio Member)',
    pagesCount: 16,
    featured: true,
    isUserCreated: true,
    accentColor: accentColor || palette || '#146872',
    description: 'Designed and painted using the Belle Ligne Interactive Digital Magazine Canvas.',
    tags: tags || ['Custom Magazine', 'Digital Paint', 'User Edition'],
    createdTimestamp: Date.now()
  };

  db.customUserMagazines.unshift(newMagazine);
  saveDB(db);

  res.status(201).json({ success: true, magazine: newMagazine });
});

// 3. User Authentication, Registration & Profile Persistence
app.post('/api/auth/login', (req, res) => {
  const { email, name, role, tier, savedArticles, savedLooks } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const db = loadDB();
  if (!db.users) db.users = [];

  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      name: name || (email.split('@')[0]),
      role: role || 'Verified Reader & Stylist',
      tier: tier || 'Haute Couture Studio',
      memberSince: '2028',
      savedArticles: savedArticles || ['trends-2028', 'streetwear-evolves'],
      savedLooks: savedLooks || ['teal-couture'],
      lastLogin: new Date().toISOString()
    };
    db.users.push(user);
  } else {
    // Update existing user's login timestamp and merged items
    user.lastLogin = new Date().toISOString();
    if (name) user.name = name;
    if (role) user.role = role;
    if (tier) user.tier = tier;
    if (savedArticles) user.savedArticles = Array.from(new Set([...(user.savedArticles || []), ...savedArticles]));
    if (savedLooks) user.savedLooks = Array.from(new Set([...(user.savedLooks || []), ...savedLooks]));
  }

  saveDB(db);
  res.json({ success: true, user });
});

// Get user profile by email
app.get('/api/auth/user/:email', (req, res) => {
  const db = loadDB();
  const user = (db.users || []).find(u => u.email.toLowerCase() === req.params.email.toLowerCase());
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// 4. Editorial Workflow CMS: Draft -> Review -> Approve -> Publish
app.get('/api/cms/articles', (req, res) => {
  const db = loadDB();
  res.json(db.articles || []);
});

app.post('/api/cms/articles', (req, res) => {
  const { title, subtitle, category, content, author, role, status, comments, tags } = req.body;
  const db = loadDB();
  if (!db.articles) db.articles = [];

  const newArticle = {
    id: `art-${Date.now()}`,
    title: title || 'Untitled Dispatch',
    subtitle: subtitle || '',
    category: category || 'runway',
    content: Array.isArray(content) ? content : [content || ''],
    author: author || 'Daisy (Editorial Director)',
    role: role || 'Editor-in-Chief',
    status: status || 'draft', // 'draft' | 'in_review' | 'approved' | 'published'
    comments: comments || ['Initial draft submitted for review.'],
    tags: tags || ['Editorial', '2028 Preview'],
    updatedAt: new Date().toISOString()
  };

  db.articles.unshift(newArticle);
  saveDB(db);
  res.status(201).json({ success: true, article: newArticle });
});

app.patch('/api/cms/articles/:id/status', (req, res) => {
  const { status, comment, reviewer } = req.body;
  const db = loadDB();
  const art = (db.articles || []).find(a => a.id === req.params.id);
  if (!art) return res.status(404).json({ error: 'Article not found' });

  art.status = status;
  art.updatedAt = new Date().toISOString();
  if (comment) {
    if (!art.comments) art.comments = [];
    art.comments.push(`${reviewer || 'Daisy'}: ${comment} [${new Date().toLocaleTimeString()}]`);
  }
  saveDB(db);
  res.json({ success: true, article: art });
});

// 5. Mood Boards
app.get('/api/moodboards', (req, res) => {
  const db = loadDB();
  res.json(db.moodboards || []);
});

app.post('/api/moodboards', (req, res) => {
  const { title, itemsCount, savedAt } = req.body;
  const db = loadDB();
  if (!db.moodboards) db.moodboards = [];

  const newBoard = {
    id: `board-${Date.now()}`,
    title: title || 'My Mood Board',
    itemsCount: itemsCount || 4,
    savedAt: savedAt || new Date().toISOString()
  };
  db.moodboards.unshift(newBoard);
  saveDB(db);
  res.status(201).json({ success: true, moodboard: newBoard });
});

// 6. Subscribers CRM & Analytics
app.get('/api/crm/subscribers', (req, res) => {
  const db = loadDB();
  res.json(db.subscribers || []);
});

app.post('/api/crm/subscribers', (req, res) => {
  const { email, name, tier } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const db = loadDB();
  if (!db.subscribers) db.subscribers = [];

  const existing = db.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
  if (!existing) {
    db.subscribers.push({
      email,
      name: name || email.split('@')[0],
      date: new Date().toISOString().split('T')[0],
      tier: tier || 'Front-Row Member'
    });
    saveDB(db);
  }

  res.json({ success: true, subscribersCount: db.subscribers.length });
});

app.get('/api/crm/analytics', (req, res) => {
  const db = loadDB();
  res.json({
    totalReaders: '168,920',
    runway3dPlays: '108,240',
    subscriberCount: (db.subscribers || []).length + 42810,
    customMagazinesCreated: (db.customUserMagazines || []).length,
    workflowArticlesCount: (db.articles || []).length,
    trendingAffinity: [
      { name: 'Transformative Teal Couture', views: 48100, saves: 14400 },
      { name: 'Streetwear Evolves (Origami Cut)', views: 42900, saves: 12800 },
      { name: 'The Next Wave Menswear', views: 36500, saves: 11200 },
      { name: 'Bio-Circularity Silk', views: 33200, saves: 10400 }
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Belle Ligne Backend] Server & Database running on port ${PORT}`);
});

# Disney News Scraper + Staging Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an RSS scraper that fetches Disney World news from DFB and AllEars, stores articles in a JSON file, and displays them on a `/news` page for review.

**Architecture:** Standalone Node.js script fetches RSS feeds, parses XML, deduplicates by URL, writes to `src/data/newsArticles.json`. A lazy-loaded React page at `/news` displays articles with filtering by status and source. No backend — purely static.

**Tech Stack:** Node.js (native `fetch`), `fast-xml-parser` (XML parsing), React + CSS Modules, react-router-dom

---

### Task 1: Install dependency and create scripts directory

**Files:**
- Modify: `package.json` (add `fast-xml-parser`)
- Create: `scripts/` directory

**Step 1: Install fast-xml-parser**

```bash
cd disney-site && npm install fast-xml-parser
```

**Step 2: Create scripts directory**

```bash
mkdir -p scripts
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add fast-xml-parser dependency for RSS scraping"
```

---

### Task 2: Build the RSS scraper script

**Files:**
- Create: `scripts/scrape-news.js`
- Create: `src/data/newsArticles.json` (empty array seed)

**Step 1: Create the seed JSON file**

Create `src/data/newsArticles.json` with content `[]`.

**Step 2: Write the scraper script**

Create `scripts/scrape-news.js`:

```js
#!/usr/bin/env node
/**
 * Scrapes Disney World news from RSS feeds and appends to newsArticles.json.
 * Usage: node scripts/scrape-news.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

const FEEDS = [
  { url: 'https://www.disneyfoodblog.com/feed/', source: 'DFB' },
  { url: 'https://allears.net/feed/', source: 'AllEars' },
];

const DATA_PATH = new URL('../src/data/newsArticles.json', import.meta.url);

// Strip HTML tags and decode common entities
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// Generate a slug ID from source + URL path
function makeId(source, link) {
  const slug = new URL(link).pathname
    .replace(/^\/|\/$/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/gi, '')
    .slice(0, 80);
  return `${source.toLowerCase()}-${slug}`;
}

// Extract image URL from RSS item (media:content, enclosure, or content:encoded)
function extractImage(item) {
  // media:content (DFB uses this)
  const media = item['media:content'];
  if (media) {
    const url = Array.isArray(media) ? media[0]?.['@_url'] : media['@_url'];
    if (url) return url;
  }
  // enclosure
  if (item.enclosure?.['@_url']) return item.enclosure['@_url'];
  // Fall back: first <img> in content:encoded
  const content = item['content:encoded'] || '';
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

// Extract categories as array of strings
function extractCategories(item) {
  if (!item.category) return [];
  const cats = Array.isArray(item.category) ? item.category : [item.category];
  return cats.map(c => (typeof c === 'string' ? c : c['#text'] || String(c)));
}

async function fetchFeed(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Disney Trip Planner RSS Reader)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}

function parseItems(xml, source) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  const parsed = parser.parse(xml);
  const items = parsed?.rss?.channel?.item || [];
  return (Array.isArray(items) ? items : [items]).map(item => {
    const link = item.link || '';
    const contentEncoded = item['content:encoded'] || '';
    const snippet = stripHtml(contentEncoded).slice(0, 300);
    return {
      id: makeId(source, link),
      title: stripHtml(item.title || ''),
      link,
      source,
      pubDate: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
      description: stripHtml(item.description || ''),
      categories: extractCategories(item),
      imageUrl: extractImage(item),
      contentSnippet: snippet + (snippet.length >= 300 ? '...' : ''),
      status: 'new',
      notes: '',
    };
  });
}

async function main() {
  // Load existing articles
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch { /* empty or missing file */ }

  const existingUrls = new Set(existing.map(a => a.link));
  let newCount = 0;

  for (const feed of FEEDS) {
    try {
      console.log(`Fetching ${feed.source}...`);
      const xml = await fetchFeed(feed.url);
      const items = parseItems(xml, feed.source);
      for (const item of items) {
        if (!existingUrls.has(item.link)) {
          existing.push(item);
          existingUrls.add(item.link);
          newCount++;
        }
      }
      console.log(`  ${items.length} items parsed, ${items.filter(i => !existingUrls.has(i.link) || newCount > 0).length} new`);
    } catch (err) {
      console.error(`Error fetching ${feed.source}: ${err.message}`);
    }
  }

  // Sort by date descending
  existing.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + '\n');
  console.log(`\nDone. ${newCount} new articles added. Total: ${existing.length}`);
}

main();
```

**Step 3: Test the scraper**

```bash
node scripts/scrape-news.js
```

Expected: prints fetch progress, new article count, writes to `src/data/newsArticles.json`. Verify the JSON file has articles with all fields populated.

**Step 4: Commit**

```bash
git add scripts/scrape-news.js src/data/newsArticles.json
git commit -m "feat: add RSS scraper for Disney news (DFB + AllEars)"
```

---

### Task 3: Add /news route to the React router

**Files:**
- Modify: `src/main.jsx` (add lazy import + route)

**Step 1: Add NewsPage route**

In `src/main.jsx`, add after the GuidePage lazy import:

```js
const NewsPage = lazy(() => import('./pages/NewsPage'));
```

Add route inside `<Routes>`:

```jsx
<Route path="/news" element={<NewsPage />} />
```

**Step 2: Don't commit yet** — the NewsPage component doesn't exist. Continue to Task 4.

---

### Task 4: Build the NewsPage component

**Files:**
- Create: `src/pages/NewsPage.jsx`
- Create: `src/pages/NewsPage.module.css`

**Step 1: Create NewsPage.module.css**

Design reference: follow the existing site's design system — `var(--bg)`, `var(--white)`, `var(--shadow-md)`, `var(--radius-md)`, Nunito headings, Inter body. Use the same section/card patterns as Timeline and park pages.

```css
.page {
  min-height: 100vh;
  background: var(--bg);
  padding: 2rem 1rem 4rem;
}
.inner {
  max-width: 900px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.header h1 {
  font-family: 'Nunito', sans-serif;
  font-size: 2rem;
  color: var(--text);
  margin-bottom: 0.25rem;
}
.header p {
  color: var(--text-light);
  font-size: 0.9rem;
}
.backLink {
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--blue);
  text-decoration: none;
  margin-bottom: 1rem;
}
.backLink:hover { opacity: 0.8; }

/* Filters */
.filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.filterBtn {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.35rem 0.9rem;
  border: 2px solid var(--blue);
  border-radius: 999px;
  background: transparent;
  color: var(--blue);
  cursor: pointer;
  transition: all 0.2s ease;
}
.filterBtn:hover { opacity: 0.8; }
.filterBtnActive {
  background: var(--blue);
  color: white;
}
.sourceBtn { border-color: var(--purple); color: var(--purple); }
.sourceBtnActive { background: var(--purple); color: white; }

/* Article cards */
.articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card {
  display: flex;
  gap: 1rem;
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.cardExpanded {
  flex-direction: column;
}
.cardImage {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.cardBody { flex: 1; min-width: 0; }
.cardMeta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  flex-wrap: wrap;
}
.sourceBadge {
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  color: white;
  text-transform: uppercase;
}
.sourceDFB { background: #FF6B6B; }
.sourceAllEars { background: var(--purple); }
.statusDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.statusNew { background: var(--blue); }
.statusDismissed { background: var(--text-muted); }
.statusIncorporated { background: var(--mint); }
.cardDate {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.cardTitle {
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.3rem;
  line-height: 1.3;
}
.cardDesc {
  font-size: 0.85rem;
  color: var(--text-light);
  line-height: 1.5;
}
.cardCategories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
}
.catTag {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: var(--bg-alt);
  color: var(--text-light);
}

/* Expanded view */
.expandedContent {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--bg-alt);
}
.snippet {
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 0.75rem;
}
.openLink {
  display: inline-block;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--blue);
  text-decoration: none;
}
.openLink:hover { text-decoration: underline; }

.emptyState {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}

/* Count badge */
.countBadge {
  font-size: 0.7rem;
  font-weight: 800;
  margin-left: 0.2rem;
}

@media (max-width: 600px) {
  .card { flex-direction: column; }
  .cardImage { width: 100%; height: 160px; }
  .header h1 { font-size: 1.5rem; }
}
```

**Step 2: Create NewsPage.jsx**

```jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/newsArticles.json';
import styles from './NewsPage.module.css';

const STATUS_FILTERS = ['all', 'new', 'dismissed', 'incorporated'];
const SOURCE_FILTERS = ['all', 'DFB', 'AllEars'];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function NewsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() =>
    articles.filter(a =>
      (statusFilter === 'all' || a.status === statusFilter) &&
      (sourceFilter === 'all' || a.source === sourceFilter)
    ), [statusFilter, sourceFilter]);

  const counts = useMemo(() => {
    const c = { all: articles.length, new: 0, dismissed: 0, incorporated: 0 };
    articles.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>

        <div className={styles.header}>
          <h1>Disney News Staging</h1>
          <p>{articles.length} articles from Disney Food Blog & AllEars.net</p>
        </div>

        {/* Status filters */}
        <div className={styles.filters}>
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${statusFilter === s ? styles.filterBtnActive : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={styles.countBadge}>({counts[s]})</span>
            </button>
          ))}
          <span style={{ width: '1px', height: '24px', background: 'var(--text-muted)', margin: '0 0.25rem' }} />
          {SOURCE_FILTERS.map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${styles.sourceBtn} ${sourceFilter === s ? styles.sourceBtnActive : ''}`}
              onClick={() => setSourceFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className={styles.articles}>
          {filtered.length === 0 && (
            <div className={styles.emptyState}>No articles match this filter.</div>
          )}
          {filtered.map(article => {
            const isExpanded = expandedId === article.id;
            return (
              <div
                key={article.id}
                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
              >
                {article.imageUrl && (
                  <img
                    className={styles.cardImage}
                    src={article.imageUrl}
                    alt=""
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={`${styles.sourceBadge} ${article.source === 'DFB' ? styles.sourceDFB : styles.sourceAllEars}`}>
                      {article.source}
                    </span>
                    <span className={`${styles.statusDot} ${styles[`status${article.status.charAt(0).toUpperCase() + article.status.slice(1)}`]}`} />
                    <span className={styles.cardDate}>{formatDate(article.pubDate)}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  {!isExpanded && <p className={styles.cardDesc}>{article.description}</p>}
                  {isExpanded && (
                    <div className={styles.expandedContent}>
                      <p className={styles.snippet}>{article.contentSnippet}</p>
                      <div className={styles.cardCategories}>
                        {article.categories.map(cat => (
                          <span key={cat} className={styles.catTag}>{cat}</span>
                        ))}
                      </div>
                      <a
                        className={styles.openLink}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        Read Full Article →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: clean build, no errors. The `/news` route should be code-split into its own chunk.

**Step 4: Commit**

```bash
git add src/main.jsx src/pages/NewsPage.jsx src/pages/NewsPage.module.css
git commit -m "feat: add /news staging page with status and source filters"
```

---

### Task 5: End-to-end test

**Step 1: Start dev server and verify**

```bash
npm run dev
```

1. Navigate to `localhost:5173/news`
2. Verify articles render with images, source badges, dates
3. Click an article — verify it expands to show snippet + categories + "Read Full Article" link
4. Test status filter buttons (All/New/Dismissed/Incorporated)
5. Test source filter buttons (All/DFB/AllEars)
6. Verify "Back to Home" link works
7. Test mobile layout (resize to ~375px width)
8. Test dark mode toggle

**Step 2: Build and deploy**

```bash
npm run build && systemctl --user restart disney-site
```

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "feat: Disney news scraper and staging page complete"
```

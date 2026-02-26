#!/usr/bin/env node
/**
 * Scrapes Disney World news from RSS feeds and appends to newsArticles.json.
 * Usage: node scripts/scrape-news.js
 */
import { readFileSync, writeFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';
import { fetchTranscript } from 'youtube-transcript-plus';

const FEEDS = [
  { url: 'https://www.disneyfoodblog.com/feed/', source: 'DFB' },
  { url: 'https://allears.net/feed/', source: 'AllEars' },
  { url: 'https://blogmickey.com/feed/', source: 'BlogMickey' },
  { url: 'https://www.disneytouristblog.com/feed/', source: 'DTB' },
  { url: 'https://touringplans.com/blog/feed/', source: 'TouringPlans' },
  { url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCnpWedLQdHpZqhgTLdB9Yyg', source: 'DFB Video', type: 'youtube' },
];

// --- WDW Relevance Filter ---
// Exclude articles clearly about other parks/topics
const EXCLUDE_PATTERNS = [
  /\bdisneyland\b/i, /\bcalifornia adventure\b/i, /\bDCA\b/, /\banaheim\b/i,
  /\btokyo disney/i, /\bshanghai disney/i, /\bhong kong disney/i, /\bparis disney/i,
  /\buniversal\b/i, /\bseaworld\b/i, /\bbusch gardens\b/i, /\blegoland\b/i,
  /\bdisney cruise\b/i, /\bdisney wish\b/i, /\bdisney treasure\b/i, /\bdisney adventure\b/i,
  /\bdisney\+/i, /\bdisneyplus\b/i, /\bstreaming\b/i,
  /\bbox office\b/i, /\bmovie review\b/i,
];

// Include if title/categories/description mention WDW-specific terms
const INCLUDE_PATTERNS = [
  /\bwalt disney world\b/i, /\bwdw\b/i, /\bdisneyworld\b/i,
  /\bmagic kingdom\b/i, /\bhollywood studios\b/i, /\bepcot\b/i,
  /\banimal kingdom\b/i, // relevant for general WDW news even though we're skipping AK
  /\bdisney springs\b/i, /\bboardwalk\b/i,
  /\bpop century\b/i, /\bart of animation\b/i, /\ball-star\b/i,
  /\bcontemporary\b/i, /\bpolynesian\b/i, /\bgrand floridian\b/i,
  /\bwilderness lodge\b/i, /\bfort wilderness\b/i, /\bcoronado\b/i,
  /\bcaribbean beach\b/i, /\briviera\b/i, /\byacht club\b/i, /\bbeach club\b/i,
  /\bskyliner\b/i, /\bmonorail\b/i, /\blightning lane\b/i, /\bgenie\+/i,
  /\bmemory maker\b/i, /\bphotopass\b/i,
  /\borlando\b/i, /\bflorida\b/i, /\bmco\b/i,
  /\brope drop\b/i, /\bpark hopper\b/i, /\bmy disney experience\b/i,
  /\btron\b/i, /\bspace mountain\b/i, /\bbig thunder\b/i, /\bseven dwarfs\b/i,
  /\btower of terror\b/i, /\brise of the resistance\b/i, /\bslinky dog\b/i,
  /\btest track\b/i, /\bguardians of the galaxy.+coaster/i, /\bremy/i,
  /\bfrozen.+ride/i, /\btiny world\b/i, /\bcountry bear/i,
];

function isWdwRelevant(article) {
  const text = `${article.title} ${article.description} ${article.categories.join(' ')}`;

  // Hard exclude: clearly about other parks/topics
  for (const pat of EXCLUDE_PATTERNS) {
    if (pat.test(text)) return false;
  }

  // Hard include: mentions WDW-specific terms
  for (const pat of INCLUDE_PATTERNS) {
    if (pat.test(text)) return true;
  }

  // Generic Disney articles without specific park mentions — include from
  // WDW-focused sources, skip from general sources
  const wdwFocusedSources = ['BlogMickey', 'TouringPlans'];
  if (wdwFocusedSources.includes(article.source)) return true;

  // For general sources (DFB, AllEars, DTB), if no WDW keywords matched
  // and no exclude keywords matched, it's ambiguous — include it anyway
  // since these sources are still mostly WDW-oriented
  return true;
}

const DATA_PATH = new URL('../src/data/newsArticles.json', import.meta.url);

// Strip HTML tags and decode common entities
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#0?38;|&amp;/g, '&')
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

function parseYouTubeItems(xml, source) {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const parsed = parser.parse(xml);
  const entries = parsed?.feed?.entry || [];
  return (Array.isArray(entries) ? entries : [entries])
    .filter(entry => {
      const link = entry.link?.['@_href'] || '';
      return !link.includes('/shorts/');
    })
    .map(entry => {
      const videoId = entry['yt:videoId'] || '';
      const link = `https://www.youtube.com/watch?v=${videoId}`;
      const mediaGroup = entry['media:group'] || {};
      const description = stripHtml(String(mediaGroup['media:description'] || ''));
      const thumbnail = mediaGroup['media:thumbnail']?.['@_url'] || null;
      const title = stripHtml(
        typeof entry.title === 'string' ? entry.title : entry.title?.['#text'] || ''
      );
      return {
        id: makeId(source, link),
        title, link, source,
        pubDate: entry.published ? new Date(entry.published).toISOString() : new Date().toISOString(),
        description: description.slice(0, 300),
        categories: ['YouTube', 'Video'],
        imageUrl: thumbnail,
        contentSnippet: '',
        transcript: '',
        videoId,
        status: 'new',
        notes: '',
      };
    });
}

async function fetchTranscriptForItem(item) {
  if (!item.videoId) return item;
  try {
    const segments = await fetchTranscript(item.videoId, { lang: 'en' });
    const fullText = segments.map(s => s.text).join(' ')
      .replace(/\[Music\]/gi, '')
      .replace(/\[Applause\]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    item.transcript = fullText.slice(0, 3000);
    item.contentSnippet = fullText.slice(0, 800) + (fullText.length > 800 ? '...' : '');
  } catch (err) {
    console.warn(`    Transcript unavailable for ${item.videoId}: ${err.message}`);
    item.contentSnippet = item.description;
    item.transcript = '';
  }
  return item;
}

function normalizeTitle(title) {
  return title.replace(/^DFB Video:\s*/i, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
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
  let existing = [];
  try {
    existing = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch { /* empty or missing file */ }

  const existingUrls = new Set(existing.map(a => a.link));
  const existingTitles = new Set(existing.map(a => normalizeTitle(a.title)));
  let newCount = 0;

  for (const feed of FEEDS) {
    try {
      console.log(`Fetching ${feed.source}...`);
      const xml = await fetchFeed(feed.url);
      const items = feed.type === 'youtube'
        ? parseYouTubeItems(xml, feed.source)
        : parseItems(xml, feed.source);

      let accepted = 0;
      let filtered = 0;

      for (const item of items) {
        if (existingUrls.has(item.link)) continue;

        // Cross-source title dedup for YouTube
        if (feed.type === 'youtube' && existingTitles.has(normalizeTitle(item.title))) {
          continue;
        }

        if (!isWdwRelevant(item)) {
          filtered++;
          continue;
        }

        // Fetch transcript for YouTube videos
        if (feed.type === 'youtube') {
          console.log(`  Fetching transcript: ${item.title.slice(0, 60)}...`);
          await fetchTranscriptForItem(item);
          await sleep(2000);
        }

        existing.push(item);
        existingUrls.add(item.link);
        existingTitles.add(normalizeTitle(item.title));
        accepted++;
        newCount++;
      }
      console.log(`  ${items.length} items parsed, ${accepted} added, ${filtered} filtered (non-WDW)`);
    } catch (err) {
      console.error(`Error fetching ${feed.source}: ${err.message}`);
    }
  }

  existing.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  writeFileSync(DATA_PATH, JSON.stringify(existing, null, 2) + '\n');
  console.log(`\nDone. ${newCount} new articles added. Total: ${existing.length}`);
}

main();

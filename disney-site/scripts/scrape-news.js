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
      console.log(`  ${items.length} items parsed`);
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

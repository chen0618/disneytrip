# Disney News Scraper + Staging Page

**Date**: 2026-02-25
**Status**: Approved

## Problem

Between now and the January 2027 trip, Disney will announce new rides, restaurant changes, closures, and policy updates. We need a way to track these announcements and decide which ones should be incorporated into the trip site.

## Decisions

- **UX**: New `/news` route in the existing React app
- **Runtime**: Manual trigger only (run script by hand or via Claude Code)
- **Architecture**: Node.js RSS scraper + static JSON file (no backend, no database)

## Sources

| Source | RSS Feed | Format |
|--------|----------|--------|
| Disney Food Blog | `disneyfoodblog.com/feed/` | RSS 2.0 with `media:content`, `content:encoded` |
| AllEars.net | `allears.net/feed/` | RSS 2.0 with `media:content`, `content:encoded` |

Both feeds provide: title, link, description, categories, pubDate, featured image, full HTML body.

## Scraper Script

**File**: `scripts/scrape-news.js`

Standalone Node.js script that:
1. Fetches RSS XML from both sources
2. Parses with `fast-xml-parser`
3. Extracts: title, link, source, pubDate, description, categories, imageUrl, contentSnippet (first ~300 chars, HTML-stripped)
4. Deduplicates against existing `newsArticles.json` by URL
5. Adds new articles with `status: "new"`
6. Writes back sorted by pubDate descending

## Data Schema

```json
{
  "id": "dfb-2026-02-25-new-ride",
  "title": "NEW Ride Coming to Magic Kingdom in 2027!",
  "link": "https://www.disneyfoodblog.com/2026/02/25/...",
  "source": "DFB",
  "pubDate": "2026-02-25T14:30:00Z",
  "description": "Disney just announced...",
  "categories": ["Magic Kingdom", "Rides", "2027"],
  "imageUrl": "https://cdn.disneyfoodblog.com/...",
  "contentSnippet": "First 300 chars of body text...",
  "status": "new",
  "notes": ""
}
```

Status values: `new` (unreviewed), `dismissed` (not relevant), `incorporated` (added to site).

## React Page

**Route**: `/news` (lazy-loaded)
**Files**: `src/pages/NewsPage.jsx`, `src/pages/NewsPage.module.css`

- Filter bar: status tabs (All/New/Dismissed/Incorporated) + source filter (All/DFB/AllEars)
- Card list with image thumbnail, title, source badge, date, category tags, snippet
- Click to expand: full snippet + "Open Original" link
- Read-only display (status managed via JSON edits or helper script)

## New Files

```
disney-site/
├── scripts/
│   └── scrape-news.js
├── src/
│   ├── data/
│   │   └── newsArticles.json
│   └── pages/
│       ├── NewsPage.jsx
│       └── NewsPage.module.css
```

## Dependencies

- `fast-xml-parser` (npm) — XML parsing, no native deps

## Workflow

1. `node scripts/scrape-news.js` — fetch latest articles
2. Browse `/news` to review
3. Edit `newsArticles.json` to mark status
4. If incorporating: update relevant data files, rebuild, redeploy

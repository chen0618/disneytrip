Process all unreviewed Disney news articles and update the trip site with relevant information.

## Context

You are maintaining a Disney World trip planning site for a family trip in January 2027. The news staging page at /news contains scraped articles from Disney blogs. Your job is to read each unreviewed article, determine if it contains actionable information for the trip, and update the site's data files accordingly.

**The trip**: January 16–23, 2027. Parks: Magic Kingdom, Hollywood Studios, EPCOT (skipping Animal Kingdom). Hotel: Pop Century Resort. 20 people, 6 kids.

## Step 1: Read unreviewed articles

```bash
cd /home/andrew/Projects/DisneySite/disney-site && node -e "
const articles = JSON.parse(require('fs').readFileSync('src/data/newsArticles.json','utf-8'));
const newOnes = articles.filter(a => a.status === 'new');
console.log(newOnes.length + ' unreviewed articles:');
newOnes.forEach((a,i) => console.log((i+1) + '. [' + a.source + '] ' + a.title + ' (' + a.id + ')'));
"
```

## Step 2: Fetch and analyze each article

For each unreviewed article, fetch the full content:

```bash
curl -sL -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" "ARTICLE_URL" | sed 's/<[^>]*>//g' | sed '/^$/d' | head -200
```

Or use WebFetch if available. Read the full article and decide:

**INCORPORATE** if the article contains information that affects the January 2027 trip:
- New ride, show, or attraction opening before Jan 2027 at MK, HS, or EPCOT
- Ride/attraction closing or undergoing refurbishment during Jan 2027
- Restaurant opening, closing, or major menu change at a WDW park or Disney Springs
- Lightning Lane, Genie+, or booking policy changes
- Transportation changes (Skyliner, buses, monorail)
- Hotel changes at Pop Century or nearby resorts
- Ticket pricing or discount changes
- New tips or strategies that improve the trip experience
- Disney Springs venue changes
- Special events happening during Jan 16–23, 2027

**DISMISS** if the article is:
- About merchandise, Loungeflys, clothing collections, home decor
- About events outside the Jan 16–23 window (Halloween parties, Food & Wine festival dates, etc.)
- General opinion pieces or listicles without new factual info
- About parks we're skipping (Animal Kingdom)
- About Disney resorts we're not staying at (unless it's dining we'd visit)
- Corporate/financial news (earnings, conferences)
- About experiences at other Disney properties

## Step 3: Update site data files

For each INCORPORATED article, determine which data files to update. Common mappings:

| Information Type | Data File(s) to Update |
|-----------------|----------------------|
| New ride | `src/data/mapRides.js`, `src/data/whatsNewInfo.js`, park-specific data file |
| Ride closure/refurb | `src/data/whatsNewInfo.js` (heads-up section) |
| New restaurant | `src/data/snacks.js`, `src/data/officialDisneyData.js` |
| Restaurant closure | Remove from `snacks.js`, update `whatsNewInfo.js` |
| New show | `src/data/mapShows.js`, `src/data/showsInfo.js` |
| Lightning Lane change | `src/data/lightningLaneInfo.js` |
| Transportation change | `src/data/transportInfo.js` |
| Disney Springs venue | `src/data/springsVenues.js` |
| Strategy/tip | Relevant section data file |

**Important conventions:**
- For new map markers, look up coordinates via OSM Overpass API — never use estimated coordinates
- For official Disney URLs/images, add entries to `src/data/officialDisneyData.js`
- Read the existing data file first to understand the format before adding entries
- Keep the same code style and data structure as existing entries
- Update any hardcoded counts in Hero sections if ride/show totals change

## Step 4: Update article statuses

After processing all articles, update their statuses in newsArticles.json:

```bash
node -e "
const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('src/data/newsArticles.json','utf-8'));
const updates = {
  'ARTICLE_ID_1': { status: 'incorporated', notes: 'Added X to whatsNewInfo.js' },
  'ARTICLE_ID_2': { status: 'dismissed', notes: 'Merchandise only' },
  // ... all processed articles
};
articles.forEach(a => {
  if (updates[a.id]) {
    a.status = updates[a.id].status;
    a.notes = updates[a.id].notes;
  }
});
fs.writeFileSync('src/data/newsArticles.json', JSON.stringify(articles, null, 2) + '\n');
console.log('Updated ' + Object.keys(updates).length + ' articles');
"
```

## Step 5: Rebuild and deploy

```bash
cd /home/andrew/Projects/DisneySite/disney-site && npm run build && systemctl --user restart disney-site
```

## Step 6: Summary

Report:
- How many articles were processed
- How many incorporated vs dismissed
- What specific data file changes were made
- Any articles that need human judgment (ambiguous relevance)

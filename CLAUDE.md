# Disney Family Trip Site

## Architecture
- **Vite + React** app in `disney-site/` directory — JSX components, CSS Modules, JS data files
- Google Fonts: Nunito (headings), Inter (body) — loaded in `index.html`
- Images: local files in `public/images/`, Wikimedia Commons, and official Disney CDN (cdn1.parksmedia.wdprapps.disney.com)
- react-leaflet + leaflet.markercluster for interactive map (rides, food, shows, transport, boundaries)
- react-router-dom for client-side routing (/ main site, /map interactive map, /park/* park guides, /guide planning guide, /news staging page)
- Dark mode via `html[data-theme="dark"]` attribute + `useDarkMode` hook (localStorage-persisted)

## Development
- Install: `cd disney-site && npm install`
- Dev server: `npm run dev` (runs on localhost:5173)
- Build: `npm run build` (outputs to `disney-site/dist/`)
- Verify with Playwright MCP browser tools (navigate to localhost:5173, take screenshots)

## Deployment
- **Service**: `systemctl --user` unit `disney-site.service` — serves `dist/` on port 5173 with `--single` for SPA routing
- **Service file**: `~/.config/systemd/user/disney-site.service`
- **Cloudflare Tunnel** (token-based, managed in Zero Trust dashboard) → localhost:5173
- **Domain**: disneytrip.frostbitex.work
- Manage: `systemctl --user start|stop|restart|status disney-site`
- After building: `systemctl --user restart disney-site` to pick up new dist files
- Linger enabled — service survives logout

## Project Structure
```
disney-site/
├── index.html                    # Vite entry (Google Fonts)
├── vite.config.js
├── package.json
├── scripts/
│   ├── scrape-news.js           # RSS scraper — 5 feeds with WDW relevance filter
│   └── daily-news-pull.sh       # Cron wrapper — scrapes, builds, deploys (8 AM EST daily)
├── src/
│   ├── main.jsx                  # BrowserRouter + Routes (/ → App, /map → MapPage, /park/* → park pages)
│   ├── App.jsx                   # ActiveSectionProvider + 5 main sections + nav + footer
│   ├── styles/
│   │   ├── global.css            # :root tokens, reset, typography, reveal classes, keyframes
│   │   └── leaflet-overrides.css # Popup, marker, cluster, route animation, ride/show styles
│   ├── hooks/
│   │   ├── useScrollReveal.js    # IntersectionObserver → adds .active to .reveal elements
│   │   ├── useActiveSection.js   # Tracks which section is in viewport for nav dots
│   │   └── useDarkMode.js        # localStorage-persisted dark/light theme toggle
│   ├── utils/
│   │   └── enrichItem.js         # Merges officialDisneyData into map items at render time
│   ├── context/
│   │   └── ActiveSectionContext.jsx
│   ├── components/               # Shared/reusable
│   │   ├── FloatingNav/          # Nav dots + map link + dark mode toggle (reads ActiveSectionContext, accepts optional sections/extraLinks props)
│   │   ├── LoadingSpinner/       # Branded Suspense fallback (castle emoji + orbiting sparkles)
│   │   ├── BackToTop/            # Fixed bottom-right scroll-to-top button (shows after 1 viewport)
│   │   ├── ParkMiniMap/          # Reusable Leaflet mini-map for park pages (boundary + emoji markers)
│   │   ├── InteractiveMap/       # Full interactive map — rides, food, shows, transport, boundaries
│   │   ├── DetailPanel/          # Slide-in detail panel (desktop: side, mobile: bottom sheet)
│   │   ├── WaveDivider.jsx       # SVG wave separator (props: position, fill, variant)
│   │   ├── SectionHeader/        # h2 + subtitle with reveal class
│   │   ├── AttractionCard/       # Image+body card (used by data files)
│   │   ├── DayTimeline/          # Morning/Afternoon/Evening strip
│   │   ├── Callout/              # Accent box (kids, highlight, world variants) — uses <div> body (not <p>) to support <br> breaks
│   │   └── Footer/               # Map CTA + credits; variant="park" + currentPark prop for park page footers with nav links
│   ├── pages/
│   │   ├── MapPage.jsx           # Full-page interactive map (/map route) with DetailPanel — lazy loaded
│   │   ├── GuidePage.jsx         # Planning guide (/guide route) — BeforeYouGo, RopeDrop, LightningLane, PhotoPass — lazy loaded
│   │   ├── NewsPage.jsx           # News staging page (/news route) — article cards with status/source filters — lazy loaded
│   │   ├── MagicKingdomPage.jsx  # MK park guide (/park/magic-kingdom) — lazy loaded
│   │   ├── HollywoodStudiosPage.jsx # HS park guide (/park/hollywood-studios) — lazy loaded
│   │   └── EpcotPage.jsx         # EPCOT park guide (/park/epcot) — lazy loaded
│   ├── sections/                 # One folder per section
│   │   ├── Hero/                 # Cinderella Castle bg + countdown timer + park guide + news link buttons
│   │   ├── Timeline/             # 8-day itinerary, travel group (20 people, 8 families), park guide links
│   │   ├── BeforeYouGo/          # Pre-trip checklist + first-timer tips (rendered on /guide)
│   │   ├── WhatsNew/             # New rides, restaurants, closures for 2026-2027
│   │   ├── Hotel/
│   │   ├── Transportation/       # Contains SkylineRouteMap.jsx (SVG animateMotion)
│   │   ├── RopeDrop/             # Morning strategy (rendered on /guide)
│   │   ├── LightningLane/        # LL Multi Pass vs Single Pass, Rider Swap (rendered on /guide)
│   │   ├── PhotoPass/            # Memory Maker, family sharing, account setup (rendered on /guide)
│   │   └── parks/                # Park-specific sections (8-10 per park)
│   │       ├── mk/               # MKHero, LandsExplorer, MKRides, MKShows, MKDining, HiddenMagic, MKStrategy, MKShopping
│   │       ├── hs/               # HSHero, GalaxysEdge, ToyStoryLand, HSRides, ThrillGuide, HSShows, HSDining, HSStrategy, HSShopping
│   │       └── epcot/            # EpcotHero, WorldShowcase, EpcotRides, FestivalGuide, CountryGuide, BestForKids, EpcotDining, EpcotStrategy, EpcotShopping
│   └── data/                     # All content extracted from HTML
│       ├── navSections.js        # Main page FloatingNav sections (5 entries)
│       ├── guideNavSections.js   # Guide page FloatingNav sections (4 entries)
│       ├── timelineDays.js
│       ├── travelGroup.js        # 20-person travel party with family grouping
│       ├── springsVenues.js      # Disney Springs venues with lat/lng
│       ├── hotelHighlights.js
│       ├── transportInfo.js
│       ├── skylinerPhotos.js
│       ├── mapRides.js           # 44 rides with coordinates, height data, images
│       ├── parkDaySchedules.js
│       ├── ropeDropSteps.js
│       ├── lightningLaneInfo.js
│       ├── photoPassInfo.js
│       ├── heightRequirements.js
│       ├── showsInfo.js
│       ├── snacks.js
│       ├── mapParks.js
│       ├── mapShows.js           # 37 show/event markers for interactive map
│       ├── mapShops.js           # 157 shop markers (MK, HS, EPCOT, Disney Springs)
│       ├── beforeYouGoInfo.js    # Pre-trip checklist + first-timer tips data
│       ├── whatsNewInfo.js      # New experiences + heads-up alerts for 2026-2027
│       ├── magicKingdomData.js  # MK lands, easter eggs, strategy, fireworks, nav sections
│       ├── hollywoodStudiosData.js # HS Galaxy's Edge, Toy Story Land, thrill guide, strategy
│       ├── epcotData.js         # EPCOT countries, food tour, festivals, kid guide, strategy
│       ├── COORDINATE_STATUS.md  # Living doc tracking OSM-verified coordinates
│       ├── parkBoundaries.js     # Polygon coords for park boundary overlays
│       ├── newsArticles.json    # RSS-scraped Disney news articles (status: new/incorporated/dismissed)
│       ├── busRoutes.js
│       └── officialDisneyData.js # Official Disney URLs + CDN images, keyed by marker ID/name
```

## Design System (CSS variables in :root — global.css)
- Colors: --blue (#1E90FF), --yellow (#FFD700), --coral (#FF6B6B), --mint (#4ECDC4), --purple (#A29BFE)
- Backgrounds: --bg (#FFF8F0), --bg-alt (#FFF0E0); dark mode: --bg (#1a1520), --bg-alt (#231e2a), --text (#ede8f0)
- `--footer-bg` variable keeps footer dark in both themes
- Sections alternate between --bg and --bg-alt backgrounds
- Wave SVG dividers between sections (WaveDivider component with variant prop)

## Scroll Animations
- Global classes in global.css: .reveal, .reveal-left, .reveal-right, .reveal-scale
- useScrollReveal hook uses IntersectionObserver to add .active class imperatively
- Stagger with .delay-1 through .delay-6
- SVG animations use <animateMotion> with path and rotate="auto" (SkylineRouteMap)

## Official Disney Data Layer
- `src/data/officialDisneyData.js` — supplementary lookup keyed by marker ID or restaurant name
- `src/utils/enrichItem.js` — merges official data into map items at render time: `enrichItem(item)` → adds `officialUrl`, `officialImage`
- DetailPanel image priority: `officialImage || image || cardImage`; emoji hero fallback for types: show, fireworks, parade, shop
- DetailPanel shows "View on DisneyWorld.com" link when `officialUrl` is non-null
- **Closed rides**: `closed: true` in mapRides.js → greyed/desaturated map marker with red X badge, "Temporarily Closed" badge in DetailPanel, LL badge hidden
- Disney website blocks Playwright/WebFetch — use `curl -sL -H "User-Agent: Mozilla/5.0..."` to scrape
- Disney URL slugs are inconsistent (e.g., `rock-and-roller-coaster` not `rock-n-roller-coaster`, `luminous-the-symphony-us` not `luminous-the-symphony-of-us`) — always verify with `curl` or `site:disneyworld.disney.go.com` Google search
- Disney CDN image pattern: `cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/{width}/{height}/75/{path}`

## Dark Mode CSS Pattern
- Progressive enhancement: `var(--dark-var, light-fallback)` — variable undefined in light mode uses fallback, defined in `html[data-theme="dark"]` block overrides
- Dark mode badge variables in global.css: `--badge-bg`, `--badge-tip-bg`, `--badge-ll-bg`/`--badge-ll-color`, `--show-badge-bg`/`--show-badge-color`, `--epcot-accent`/`--epcot-accent-bg`
- When adding colored badges/accents: add dark mode variable to global.css, use `var(--new-var, #light-fallback)` in component CSS

## Image Sourcing
- Use Wikimedia Commons API: `curl -s "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=TERM&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=960&format=json"`
- Extract `thumburl` from response, verify with `curl -s -o /dev/null -w "%{http_code}" URL`
- Some subjects have no Wikimedia photos (e.g., Art Smith's Homecoming, Ronto Wrap food)
- Wikimedia 429 rate limiting can occur — space requests or reduce batch sizes

## Main Page Sections (in order, 5 on home page)
1. hero — Cinderella Castle background, countdown timer, sparkle animations
2. timeline — 8-day trip cards, travel group (20 people, 8 families), "split off" blurb
3. whats-new — New/upgraded rides, restaurants, closures & heads-up alerts for 2026-2027
4. hotel — Pop Century Resort, dual photos + highlight list, gift card budget tip
5. transportation — Bus + Skyliner + airport transport (A Way We Go), animated SVG route map

## Planning Guide Page (/guide, 5 sections — including hero)
1. before-you-go — Pre-trip checklist (interactive checkboxes) + 4 first-timer tip cards
2. rope-drop — Morning strategy, coffee split strategy, Minnie Van vs bus comparison
3. lightning-lane — Multi Pass vs Single Pass, rolling window strategy, Rider Swap
4. photo-pass — Memory Maker, family sharing plan, Disney account setup tutorial

## Interactive Map (/map page)
- **InteractiveMap** component in `components/InteractiveMap/InteractiveMap.jsx`
- **DetailPanel** component — slide-in panel (desktop: 380px right side, mobile: 60vh bottom sheet)
- Mutually exclusive layer toggles: Rides | Food & Dining | Shows & Events | Transportation
- Independent boundary overlay toggle (Zillow-style park polygons)
- **Rides layer**: 44 rides from mapRides.js, park sub-filter (All/MK/HS/EPCOT)
- **Food layer**: snacks (clustered) + Disney Springs venues, park sub-filter
- **Shows layer**: stage shows (pink), fireworks (gold), parades (purple) with sub-toggles
- **Transport layer**: bus routes, Skyliner, boats with animated markers
- Clicking any marker opens DetailPanel via `onSelectItem` callback (no Leaflet popups for content markers)
- Park label markers and transport routes still use Leaflet popups (simple info)

## Park Guide Pages (/park/*)
- 3 dedicated park guide pages: Magic Kingdom, Hollywood Studios, EPCOT
- **Routes**: `/park/magic-kingdom`, `/park/hollywood-studios`, `/park/epcot`
- **Lazy loaded** via React.lazy + Suspense (code-split into separate JS/CSS chunks)
- Each page has its own ActiveSectionProvider + FloatingNav with park-specific sections
- FloatingNav accepts optional `sections` prop (overrides navSections.js) and `extraLinks` (e.g., "Back to Home")
- Park theme colors: MK=coral (#FF6B6B), HS=purple (#A29BFE), EPCOT=yellow (#FFD700)
- **EPCOT area names** (retired "Future World"): World Celebration (Spaceship Earth, Figment), World Discovery (Guardians, Test Track, Mission: SPACE), World Nature (Soarin', Land, Seas)
- **Shared data**: Rides, food, shows, shops filtered from mapRides.js, snacks.js, mapShows.js, mapShops.js by park field
- **Park-specific data**: magicKingdomData.js, hollywoodStudiosData.js, epcotData.js
- **ParkMiniMap**: Reusable Leaflet component showing park boundary polygon + emoji ride/food markers
- **Entry points**: Hero section park buttons + Timeline day card "View Park Guide" links
- Each page: 8 content sections + embedded ParkMiniMap, alternating --bg/--bg-alt backgrounds with WaveDividers

### Data Accuracy Gotchas
- **Disneyland vs WDW confusion**: Many Disney "facts" apply to Disneyland (CA), not Walt Disney World (FL) — always verify location-specific claims (e.g., Pirates skulls = DL only, Astro Orbiter height req = DL only, Space Mountain rebuild = Tokyo DL)
- **Temporal tense**: Site targets January 2027 trip — rides currently closed but reopening before the trip should have `closed: true` with descriptions noting the expected reopening
- **Callout tips in JSX duplicate shared data**: EpcotRides.jsx, HSStrategy.jsx, EpcotStrategy.jsx contain hardcoded ride tips/facts that can drift from mapRides.js — update BOTH when facts change
- **lightningLane boolean limitation**: `lightningLane: true/false` in mapRides.js doesn't distinguish Multi Pass (included) vs Single Pass (paid individually) — tips should clarify when it's Single Pass

### Data Consistency Gotchas
- **Shared data files are the source of truth** — mapRides.js, snacks.js, mapShows.js contain the canonical ride/food/show data
- Park-specific data files (magicKingdomData.js, etc.) reference items from shared data — if a ride/restaurant exists in a callout or strategy, it MUST also exist in the shared data file
- **Hardcoded stats in Hero sections** (ride counts, land counts) can go stale — verify against shared data when adding/removing items

### Cross-Page Conventions (must match across all 3 parks)
- Dining section heading: "Dining Guide"
- Must-try callout title: "Must-Try at [Park Name]"
- Strategy subtitle: includes specific park day dates (e.g., "January 18 & 22")
- Rides subtitle: "Every ride at [Park]..." pattern
- Shows section heading: "Shows & Entertainment" (not "Shows & Fireworks")
- Fireworks/nighttime badge label: "Nighttime Spectacular" (not "Fireworks")
- Map subtitle: "rides and attractions" (not "rides and dining")

### World Showcase Data Patterns
- Optional `<key>Items` arrays (e.g., `mustTryFoodItems`) override single-image rendering for that category
- Convention: WorldShowcase.jsx checks `country[key + 'Items']` — works for mustTryFood, mustTryDrink, kidFriendlyOption
- Keep original scalar fields (`mustTryFood`, `mustTryFoodImg`) alongside Items array as fallback/summary
- **Edit tool + emoji flags**: Flag emojis render as `\u{1F1EB}` escapes in Read output — use a unique non-emoji substring when editing epcotData.js country entries

## News Pipeline
- **Scraper**: `node scripts/scrape-news.js` — fetches 5 RSS feeds + DFB YouTube channel (transcripts via `youtube-transcript-plus`), filters non-WDW articles, appends to `newsArticles.json`
- **Sources**: DFB, DFB Video (YouTube), AllEars, BlogMickey, DTB, TouringPlans
- **YouTube pipeline**: Atom RSS → filter Shorts → fetch transcript (2s throttle) → cross-source title dedup with DFB blog
- **Slash commands**: `/pullnews` (scrape + build + deploy), `/processnews` (triage articles, update site data, mark statuses)
- **Article statuses**: `new` → `incorporated` (with data file updates) or `dismissed` (with reason in `notes`)
- **Blog scraping gotcha**: Disney blog sites are JS-rendered — WebFetch and curl return ad scripts, not article content. Use Playwright browser to read full articles.
- **RSS dependency**: `fast-xml-parser` for XML parsing, `youtube-transcript-plus` for YouTube transcripts

## Map Coordinates
- All marker coordinates verified via OpenStreetMap Overpass API — see `src/data/COORDINATE_STATUS.md`
- To verify a coordinate: `curl -s "https://overpass-api.de/api/interpreter" --data-urlencode "data=[out:json];(node[\"name\"=\"VENUE NAME\"](28.3,-81.7,28.5,-81.4);way[\"name\"=\"VENUE NAME\"](28.3,-81.7,28.5,-81.4););out center;"`
- NEVER use rough/estimated coordinates — always look up via OSM Overpass API
- When adding new map locations, update COORDINATE_STATUS.md with the verification date
- Map TileLayer: maxNativeZoom=19, maxZoom=23 (OSM tiles max at 19, overzooms beyond)

## Adding a New Section (checklist)
1. Create data file in src/data/
2. Create section folder in src/sections/ with Component.jsx + Component.module.css
3. Set background to --bg or --bg-alt (must alternate with neighbors)
4. Set WaveDivider top fill to PREVIOUS section's background, bottom fill to NEXT section's background
   - **Remember**: The wave's `fill` color = the color of the section the wave visually "belongs to" (i.e., what's below the wave)
5. Add to App.jsx or GuidePage.jsx imports and JSX (order matters)
6. Add to data/navSections.js or data/guideNavSections.js (depending on which page)
7. Inserting an odd number of sections shifts all downstream backgrounds — recheck alternation

## Floating Nav
- FloatingNav component reads ActiveSectionContext
- Labels always visible on desktop (opacity 0.7, 1 on hover/active), dots-only on mobile
- Includes map link (🗺️) and dark mode toggle (🌙/☀️) at bottom
- **Touch-scrub**: Slide finger along nav to preview labels; uses proximity-based `getClosestItem()` (not `elementFromPoint`)
- `touch-action: none` on nav permanently — must be set before touch starts (CSS evaluates at touch-start, not after JS)
- All nav items (dots, map, dark mode) share `data-nav-id` attributes for unified touch detection
- `.itemTouched` class with `.navTouching` parent for high-specificity override of mobile `:hover` stickiness
- **React touch gotcha**: React touch listeners are `passive: true` — `e.preventDefault()` in `onTouchMove` is silently ignored; use CSS `touch-action: none` or native `addEventListener({ passive: false })` instead
- useActiveSection hook tracks which section is in viewport via IntersectionObserver
- When adding a section: add entry to data/navSections.js, create section component, add to App.jsx
- **Park pages**: Pass `sections` prop to override default navSections, `extraLinks` for "Back to Home" link

## Trip Details
- Dates: January 16–23, 2027
- Hotel: Pop Century Resort (Skyliner access)
- Travel: ACY → MCO
- Kids: Luna (born June 16, 2022), Clara (born April 2, 2024)
- Travel group: 20 people in 8 families — Us (Andrew, Rosy, Luna, Clara), Grandparents (Tuc, Oanh), Teresa, James, Sandy & Gavin, Paul & Kayla, Natali & Alex & Esme & Eli, AJ & Amy & Liam & Asher — 6 kids total (Luna, Clara, Esme, Eli, Liam, Asher)
- Day 1 (Jan 16): Travel, Day 2 (17): Pool + Disney Springs, Day 3 (18): MK, Day 4 (19): HS, Day 5 (20): Rest, Day 6 (21): EPCOT, Day 7 (22): MK again, Day 8 (23): Travel home
- Skipping Animal Kingdom entirely — do not mention it
- Airport transport: A Way We Go (private vehicle + stroller rentals)
- Budget strategy: Disney gift cards at 5–15% off from Costco, Sam's Club, Target

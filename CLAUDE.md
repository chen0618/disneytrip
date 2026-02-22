# Disney Family Trip Site

## Architecture
- **Vite + React** app in `disney-site/` directory — JSX components, CSS Modules, JS data files
- Google Fonts: Nunito (headings), Inter (body) — loaded in `index.html`
- All images sourced from Wikimedia Commons (freely licensed) — no local image files
- react-leaflet + leaflet.markercluster for interactive map (snacks, transport, shows, boundaries)
- react-router-dom for client-side routing (/ main site, /map full-page map)
- Legacy single-file version preserved in `legacy/index.html`

## Development
- Install: `cd disney-site && npm install`
- Dev server: `npm run dev` (runs on localhost:5173)
- Build: `npm run build` (outputs to `disney-site/dist/`)
- Serve built site: `npx serve disney-site/dist -l 5173 --single` (--single needed for SPA routing)
- Verify with Playwright MCP browser tools (navigate to localhost:5173, take screenshots)
- Deployment: Cloudflare Tunnel (token-based, managed in Zero Trust dashboard) → localhost:5173

## Project Structure
```
disney-site/
├── index.html                    # Vite entry (Google Fonts)
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx                  # BrowserRouter + Routes (/ → App, /map → MapPage)
│   ├── App.jsx                   # ActiveSectionProvider + all sections + nav + footer
│   ├── styles/
│   │   ├── global.css            # :root tokens, reset, typography, reveal classes, keyframes
│   │   └── leaflet-overrides.css # Popup, marker, cluster, route animation styles
│   ├── hooks/
│   │   ├── useScrollReveal.js    # IntersectionObserver → adds .active to .reveal elements
│   │   └── useActiveSection.js   # Tracks which section is in viewport for nav dots
│   ├── context/
│   │   └── ActiveSectionContext.jsx
│   ├── components/               # Shared/reusable
│   │   ├── FloatingNav/          # Nav dots (reads ActiveSectionContext)
│   │   ├── WaveDivider.jsx       # SVG wave separator (props: position, fill, variant)
│   │   ├── SectionHeader/        # h2 + subtitle with reveal class
│   │   ├── AttractionCard/       # Image+body card (used by MK, HS, EPCOT)
│   │   ├── DayTimeline/          # Morning/Afternoon/Evening strip
│   │   ├── Callout/              # Accent box (kids, highlight, world variants)
│   │   └── Footer/
│   ├── pages/
│   │   └── MapPage.jsx           # Full-page interactive map (/map route)
│   ├── sections/                 # One folder per page section
│   │   ├── Hero/
│   │   ├── Timeline/             # useState for mode + expandedCard
│   │   ├── Hotel/
│   │   ├── Transportation/       # Contains SkylineRouteMap.jsx (SVG animateMotion)
│   │   ├── RopeDrop/
│   │   ├── LightningLane/        # LL Multi Pass vs Single Pass, Rider Swap
│   │   ├── PhotoPass/            # Memory Maker, family sharing, account setup
│   │   ├── DisneySprings/
│   │   ├── MagicKingdom/
│   │   ├── HollywoodStudios/
│   │   ├── Epcot/
│   │   ├── HeightGuide/          # Height requirements by ride, kid profiles
│   │   ├── ShowsAndFireworks/    # Fireworks, parades, stage shows, strategy
│   │   └── DisneySnacks/         # Contains SnackMap.jsx (react-leaflet)
│   └── data/                     # All content extracted from HTML
│       ├── navSections.js
│       ├── timelineDays.js
│       ├── travelGroup.js        # 16-person travel party
│       ├── springsVenues.js
│       ├── hotelHighlights.js
│       ├── transportInfo.js
│       ├── skylinerPhotos.js
│       ├── attractions.js        # {magicKingdom, hollywoodStudios, epcot}
│       ├── parkDaySchedules.js
│       ├── ropeDropSteps.js
│       ├── lightningLaneInfo.js
│       ├── photoPassInfo.js
│       ├── heightRequirements.js
│       ├── showsInfo.js
│       ├── snacks.js
│       ├── mapParks.js
│       ├── mapShows.js           # Show/event markers for interactive map
│       ├── parkBoundaries.js     # Polygon coords for park boundary overlays
│       └── busRoutes.js
```

## Design System (CSS variables in :root — global.css)
- Colors: --blue (#1E90FF), --yellow (#FFD700), --coral (#FF6B6B), --mint (#4ECDC4), --purple (#A29BFE)
- Backgrounds: --bg (#FFF8F0), --bg-alt (#FFF0E0)
- Sections alternate between --bg and --bg-alt backgrounds
- Wave SVG dividers between sections (WaveDivider component with variant prop)

## Scroll Animations
- Global classes in global.css: .reveal, .reveal-left, .reveal-right, .reveal-scale
- useScrollReveal hook uses IntersectionObserver to add .active class imperatively
- Stagger with .delay-1 through .delay-6
- SVG animations use <animateMotion> with path and rotate="auto" (SkylineRouteMap)

## Image Sourcing
- Use Wikimedia Commons API: `curl -s "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=TERM&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=960&format=json"`
- Extract `thumburl` from response, verify with `curl -s -o /dev/null -w "%{http_code}" URL`
- Some subjects have no Wikimedia photos (e.g., Art Smith's Homecoming, Ronto Wrap food)
- Wikimedia 429 rate limiting can occur — space requests or reduce batch sizes

## Sections (in order, 14 total)
1. hero — Cinderella Castle background, sparkle animations
2. timeline — Trip cards, travel group (16 people), Jan 16–23 2027 dates
3. hotel — Pop Century Resort, dual photos + highlight list, gift card budget tip
4. transportation — Bus + Skyliner + airport transport (A Way We Go), animated SVG route map
5. rope-drop — Morning strategy, coffee split strategy, Minnie Van vs bus comparison
6. lightning-lane — Multi Pass vs Single Pass, rolling window strategy, Rider Swap
7. photo-pass — Memory Maker, family sharing plan, Disney account setup tutorial
8. disney-springs — NOT a theme park callout, 6 venue cards with 3D hover
9. magic-kingdom — Day timeline strip + 6 attraction cards
10. hollywood-studios — Same format as MK
11. epcot — Same format, World Showcase emphasis
12. height-guide — Rides by height requirement, Luna/Clara profiles with can-ride indicators
13. shows-fireworks — Fireworks, parades, 8 stage shows, timing strategy
14. disney-snacks — 8 snack cards, Port Orleans boat callout, CTA link to /map

## Adding a New Section (checklist)
1. Create data file in src/data/
2. Create section folder in src/sections/ with Component.jsx + Component.module.css
3. Set background to --bg or --bg-alt (must alternate with neighbors)
4. Set WaveDivider top fill to PREVIOUS section's background, bottom fill to NEXT section's background
5. Add to App.jsx imports and JSX (order matters)
6. Add to data/navSections.js
7. Inserting an odd number of sections shifts all downstream backgrounds — recheck alternation

## Floating Nav
- FloatingNav component reads ActiveSectionContext
- useActiveSection hook tracks which section is in viewport via IntersectionObserver
- When adding a section: add entry to data/navSections.js, create section component, add to App.jsx

## Leaflet Map (SnackMap.jsx)
- Lives on dedicated /map page (MapPage.jsx), linked from DisneySnacks section
- SnackMap accepts `fullPage` prop for inline vs dedicated page rendering
- Uses imperative L.markerClusterGroup() via useMap() hook for snack markers
- Animated bus/boat markers use useState + useEffect with setInterval
- Layer toggle (all/food/transport/shows) via useState, with sub-toggles per category
- Shows layer: stage shows (pink), fireworks (gold), parades (purple) with emoji markers
- Park boundary polygons (Zillow-style) — independent toggle, multi-select, fly-to on click
- Park markers always visible, snack + transport layers togglable

## Trip Details
- Dates: January 16–23, 2027
- Hotel: Pop Century Resort (Skyliner access)
- Travel: ACY → MCO
- Kids: Luna (born June 16, 2022, ~41-42" tall by trip), Clara (born April 2, 2024, ~34-35" tall)
- Travel group: 16 people (Andrew, Rosy, Luna, Clara, Teresa, James, Sandy, Gavin, Paul, Kayla, Tuc, Oanh, Natali, Alex, Esme, Eli) — Esme and Eli are also kids
- Day 1 (Jan 16): Travel, Day 2 (17): Pool + Disney Springs, Day 3 (18): MK, Day 4 (19): HS, Day 5 (20): Rest, Day 6 (21): EPCOT, Day 7 (22): MK again, Day 8 (23): Travel home
- Skipping Animal Kingdom entirely — do not mention it
- Airport transport: A Way We Go (private vehicle + stroller rentals)
- Budget strategy: Disney gift cards at 5–15% off from Costco, Sam's Club, Target

# Disney Family Trip Site

## Architecture
- **Vite + React** app in `disney-site/` directory — JSX components, CSS Modules, JS data files
- Google Fonts: Nunito (headings), Inter (body) — loaded in `index.html`
- All images sourced from Wikimedia Commons (freely licensed) — no local image files
- react-leaflet + leaflet.markercluster for interactive map (rides, food, shows, transport, boundaries)
- react-router-dom for client-side routing (/ main site, /map full-page interactive map)
- Legacy single-file version preserved in `legacy/index.html`

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
├── src/
│   ├── main.jsx                  # BrowserRouter + Routes (/ → App, /map → MapPage)
│   ├── App.jsx                   # ActiveSectionProvider + 8 trip-planning sections + nav + footer
│   ├── styles/
│   │   ├── global.css            # :root tokens, reset, typography, reveal classes, keyframes
│   │   └── leaflet-overrides.css # Popup, marker, cluster, route animation, ride/show styles
│   ├── hooks/
│   │   ├── useScrollReveal.js    # IntersectionObserver → adds .active to .reveal elements
│   │   └── useActiveSection.js   # Tracks which section is in viewport for nav dots
│   ├── context/
│   │   └── ActiveSectionContext.jsx
│   ├── components/               # Shared/reusable
│   │   ├── FloatingNav/          # Nav dots + map link (reads ActiveSectionContext)
│   │   ├── InteractiveMap/       # Full interactive map — rides, food, shows, transport, boundaries
│   │   ├── DetailPanel/          # Slide-in detail panel (desktop: side, mobile: bottom sheet)
│   │   ├── WaveDivider.jsx       # SVG wave separator (props: position, fill, variant)
│   │   ├── SectionHeader/        # h2 + subtitle with reveal class
│   │   ├── AttractionCard/       # Image+body card (used by data files)
│   │   ├── DayTimeline/          # Morning/Afternoon/Evening strip
│   │   ├── Callout/              # Accent box (kids, highlight, world variants)
│   │   └── Footer/               # Map CTA button + credits
│   ├── pages/
│   │   └── MapPage.jsx           # Full-page interactive map (/map route) with DetailPanel
│   ├── sections/                 # One folder per main-page section (9 total)
│   │   ├── Hero/
│   │   ├── Timeline/             # 8-day itinerary, travel group (20 people, 7 families)
│   │   ├── BeforeYouGo/          # Pre-trip checklist + first-timer tips
│   │   ├── WhatsNew/             # New rides, restaurants, closures for 2026-2027
│   │   ├── Hotel/
│   │   ├── Transportation/       # Contains SkylineRouteMap.jsx (SVG animateMotion)
│   │   ├── RopeDrop/
│   │   ├── LightningLane/        # LL Multi Pass vs Single Pass, Rider Swap
│   │   └── PhotoPass/            # Memory Maker, family sharing, account setup
│   └── data/                     # All content extracted from HTML
│       ├── navSections.js
│       ├── timelineDays.js
│       ├── travelGroup.js        # 20-person travel party with family grouping
│       ├── springsVenues.js      # Disney Springs venues with lat/lng
│       ├── hotelHighlights.js
│       ├── transportInfo.js
│       ├── skylinerPhotos.js
│       ├── attractions.js        # {magicKingdom, hollywoodStudios, epcot}
│       ├── mapRides.js           # 33 rides with coordinates, height data, images
│       ├── parkDaySchedules.js
│       ├── ropeDropSteps.js
│       ├── lightningLaneInfo.js
│       ├── photoPassInfo.js
│       ├── heightRequirements.js
│       ├── showsInfo.js
│       ├── snacks.js
│       ├── mapParks.js
│       ├── mapShows.js           # 11 show/event markers for interactive map
│       ├── mapShops.js           # 90+ shop markers (MK, HS, EPCOT, Disney Springs)
│       ├── beforeYouGoInfo.js    # Pre-trip checklist + first-timer tips data
│       ├── whatsNewInfo.js      # New experiences + heads-up alerts for 2026-2027
│       ├── COORDINATE_STATUS.md  # Living doc tracking OSM-verified coordinates
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

## Main Page Sections (in order, 9 total)
1. hero — Cinderella Castle background, sparkle animations
2. timeline — 8-day trip cards, travel group (20 people, 7 families), "split off" blurb
3. before-you-go — Pre-trip checklist (interactive checkboxes) + 4 first-timer tip cards
4. whats-new — New/upgraded rides, restaurants, closures & heads-up alerts for 2026-2027
5. hotel — Pop Century Resort, dual photos + highlight list, gift card budget tip
6. transportation — Bus + Skyliner + airport transport (A Way We Go), animated SVG route map
7. rope-drop — Morning strategy, coffee split strategy, Minnie Van vs bus comparison
8. lightning-lane — Multi Pass vs Single Pass, rolling window strategy, Rider Swap
9. photo-pass — Memory Maker, family sharing plan, Disney account setup tutorial

## Interactive Map (/map page)
- **InteractiveMap** component in `components/InteractiveMap/InteractiveMap.jsx`
- **DetailPanel** component — slide-in panel (desktop: 380px right side, mobile: 60vh bottom sheet)
- Mutually exclusive layer toggles: Rides | Food & Dining | Shows & Events | Transportation
- Independent boundary overlay toggle (Zillow-style park polygons)
- **Rides layer**: 33 rides from mapRides.js, park sub-filter (All/MK/HS/EPCOT), height sub-filter (Luna can ride / Clara can ride)
- **Food layer**: snacks (clustered) + Disney Springs venues, park sub-filter
- **Shows layer**: stage shows (pink), fireworks (gold), parades (purple) with sub-toggles
- **Transport layer**: bus routes, Skyliner, boats with animated markers
- Clicking any marker opens DetailPanel via `onSelectItem` callback (no Leaflet popups for content markers)
- Park label markers and transport routes still use Leaflet popups (simple info)

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
5. Add to App.jsx imports and JSX (order matters)
6. Add to data/navSections.js
7. Inserting an odd number of sections shifts all downstream backgrounds — recheck alternation

## Floating Nav
- FloatingNav component reads ActiveSectionContext
- Labels always visible on desktop (opacity 0.7, 1 on hover/active), dots-only on mobile
- Includes map link (🗺️) at bottom that links to /map
- useActiveSection hook tracks which section is in viewport via IntersectionObserver
- When adding a section: add entry to data/navSections.js, create section component, add to App.jsx

## Trip Details
- Dates: January 16–23, 2027
- Hotel: Pop Century Resort (Skyliner access)
- Travel: ACY → MCO
- Kids: Luna (born June 16, 2022, ~41-42" tall by trip), Clara (born April 2, 2024, ~34-35" tall)
- Travel group: 20 people in 7 families — Us (Andrew, Rosy, Luna, Clara), Grandparents (Tuc, Oanh), Teresa & James, Sandy & Gavin, Paul & Kayla, Natali & Alex & Esme & Eli, AJ & Amy & Liam & Asher — 6 kids total (Luna, Clara, Esme, Eli, Liam, Asher)
- Day 1 (Jan 16): Travel, Day 2 (17): Pool + Disney Springs, Day 3 (18): MK, Day 4 (19): HS, Day 5 (20): Rest, Day 6 (21): EPCOT, Day 7 (22): MK again, Day 8 (23): Travel home
- Skipping Animal Kingdom entirely — do not mention it
- Airport transport: A Way We Go (private vehicle + stroller rentals)
- Budget strategy: Disney gift cards at 5–15% off from Costco, Sam's Club, Target

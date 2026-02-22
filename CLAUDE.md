# Disney Family Trip Site

## Architecture
- **Vite + React** app in `disney-site/` directory — JSX components, CSS Modules, JS data files
- Google Fonts: Nunito (headings), Inter (body) — loaded in `index.html`
- All images sourced from Wikimedia Commons (freely licensed) — no local image files
- react-leaflet + leaflet.markercluster for interactive snack map
- Legacy single-file version preserved in `legacy/index.html`

## Development
- Install: `cd disney-site && npm install`
- Dev server: `npm run dev` (runs on localhost:5173)
- Build: `npm run build` (outputs to `disney-site/dist/`)
- Verify with Playwright MCP browser tools (navigate to localhost:5173, take screenshots)

## Project Structure
```
disney-site/
├── index.html                    # Vite entry (Google Fonts)
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx                  # ReactDOM.createRoot + global.css import
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
│   ├── sections/                 # One folder per page section
│   │   ├── Hero/
│   │   ├── Timeline/             # useState for mode + expandedCard
│   │   ├── DisneySprings/
│   │   ├── Hotel/
│   │   ├── Transportation/       # Contains SkylineRouteMap.jsx (SVG animateMotion)
│   │   ├── MagicKingdom/
│   │   ├── HollywoodStudios/
│   │   ├── Epcot/
│   │   ├── RopeDrop/
│   │   └── DisneySnacks/         # Contains SnackMap.jsx (react-leaflet)
│   └── data/                     # All content extracted from HTML
│       ├── navSections.js
│       ├── timelineDays.js
│       ├── springsVenues.js
│       ├── hotelHighlights.js
│       ├── transportInfo.js
│       ├── skylinerPhotos.js
│       ├── attractions.js        # {magicKingdom, hollywoodStudios, epcot}
│       ├── parkDaySchedules.js
│       ├── ropeDropSteps.js
│       ├── snacks.js
│       ├── mapParks.js
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

## Sections (in order, 10 total)
1. hero — Cinderella Castle background, sparkle animations
2. timeline — Interactive 5-day trip cards, 3-day comparison toggle (useState mode)
3. disney-springs — NOT a theme park callout, 6 venue cards with 3D hover
4. hotel — Pop Century Resort, dual photos + highlight list
5. transportation — Bus + Skyliner info, animated SVG route map with gondolas
6. magic-kingdom — Day timeline strip + 6 attraction cards
7. hollywood-studios — Same format as MK
8. epcot — Same format, World Showcase emphasis
9. rope-drop — Morning strategy, Minnie Van vs bus comparison
10. disney-snacks — Interactive Leaflet.js map, 8 snack cards, Port Orleans boat callout

## Floating Nav
- FloatingNav component reads ActiveSectionContext
- useActiveSection hook tracks which section is in viewport via IntersectionObserver
- When adding a section: add entry to data/navSections.js, create section component, add to App.jsx

## Leaflet Map (SnackMap.jsx)
- Uses imperative L.markerClusterGroup() via useMap() hook for snack markers
- Animated bus/boat markers use useState + useEffect with setInterval
- Layer toggle (all/food/transport) via useState
- Park markers always visible, snack + transport layers togglable

## Trip Details
- Dates: January 2027
- Hotel: Pop Century Resort (Skyliner access)
- Travel: ACY → MCO
- Kids: 2.5yo and 4.5yo (daughter born June 16, 2022)
- Day 1: Travel + Disney Springs, Day 2: MK, Day 3: HS, Day 4: EPCOT, Day 5: MK again
- Skipping Animal Kingdom entirely — do not mention it

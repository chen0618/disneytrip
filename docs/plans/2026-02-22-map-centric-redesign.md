# Map-Centric Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform site from 14-section scrolling page into focused trip-planning page (7 sections) + Disney-app-style interactive map with rich detail panels.

**Architecture:** Main page keeps logistics (hotel, transport, rope drop, LL, PhotoPass). All location-based content (rides, food, shows, venues) moves to the `/map` page as toggleable layers. Clicking a map marker opens a slide-in detail panel (desktop: right side panel, mobile: bottom sheet) with image, description, and contextual metadata.

**Tech Stack:** React, react-leaflet, Leaflet, CSS Modules, react-router-dom

---

### Task 1: Create `mapRides.js` data file

**Files:**
- Create: `disney-site/src/data/mapRides.js`
- Reference: `disney-site/src/data/attractions.js`, `disney-site/src/data/heightRequirements.js`

**Step 1:** Create `mapRides.js` with all rides from `attractions.js` (18 rides across 3 parks) plus rides from `heightRequirements.js` that aren't in `attractions.js` (e.g., Seven Dwarfs Mine Train, Tiana's Bayou Adventure, TRON, etc.). Each entry needs:

```js
{
  id: 'space-mountain',
  name: 'Space Mountain',
  emoji: '🚀',
  type: 'ride',
  park: 'Magic Kingdom',
  land: 'Tomorrowland',
  lat: 28.4192,
  lng: -81.5773,
  description: 'Indoor roller coaster in the dark. A true classic and must-do for thrill seekers!',
  image: 'https://upload.wikimedia.org/...',
  heightReq: '44"',
  lunaCanRide: false,
  claraCanRide: false,
  lightningLane: true,
  tip: null,
}
```

Use OpenStreetMap knowledge for lat/lng coordinates of each ride within its park. Group rides by park in comments. Include ALL rides from heightRequirements.js tiers (about 30 total rides). For rides that appear in both `attractions.js` (which has images/descriptions) and `heightRequirements.js` (which has height data), merge the fields.

**Step 2:** Verify build passes.

Run: `cd disney-site && npm run build`

**Step 3:** Commit.

```
git add disney-site/src/data/mapRides.js
git commit -m "feat: add mapRides.js with coordinates for all rides"
```

---

### Task 2: Add lat/lng to `springsVenues.js`

**Files:**
- Modify: `disney-site/src/data/springsVenues.js`

**Step 1:** Add `lat`, `lng`, and `type: 'venue'` to each venue in `springsVenues.js`. Disney Springs coordinates center around lat 28.3712, lng -81.5184. Spread venues across the four neighborhoods (Marketplace, The Landing, Town Center, West Side).

Also add `id` field to each venue for consistent keying.

**Step 2:** Verify build passes.

**Step 3:** Commit.

```
git add disney-site/src/data/springsVenues.js
git commit -m "feat: add lat/lng coordinates to Disney Springs venues"
```

---

### Task 3: Build `DetailPanel` component

**Files:**
- Create: `disney-site/src/components/DetailPanel/DetailPanel.jsx`
- Create: `disney-site/src/components/DetailPanel/DetailPanel.module.css`

**Step 1:** Create `DetailPanel.jsx`. Props: `{ item, onClose }` where `item` is null (panel hidden) or an object with marker data. The component renders differently based on `item.type`:

- **ride**: Image, name, description, park tag, height requirement badge, Luna/Clara can-ride indicators (green check / red X), Lightning Lane badge, tip
- **food** (snack or venue): Image, name, description, park/location tag, price badge
- **show/fireworks/parade**: Emoji, name, description, park tag, time, viewing tip
- **transport**: Name, description, time

Panel structure:
```jsx
<div className={`${styles.panel} ${item ? styles.open : ''}`}>
  <button className={styles.close} onClick={onClose}>×</button>
  {item?.image && <img ... />}
  <div className={styles.body}>
    <h2>{item?.emoji} {item?.name}</h2>
    <span className={styles.parkTag}>{item?.park}</span>
    <p>{item?.description}</p>
    {/* Contextual metadata based on item.type */}
    {item?.tip && <div className={styles.tip}>...</div>}
  </div>
</div>
```

**Step 2:** Create `DetailPanel.module.css`:

Desktop (>768px):
- `.panel`: position fixed, right 0, top 0, height 100vh, width 380px, transform translateX(100%), transition transform 0.3s, z-index 1001, background white, overflow-y auto, box-shadow
- `.open`: transform translateX(0)

Mobile (<=768px):
- `.panel`: position fixed, bottom 0, left 0, right 0, height 60vh, transform translateY(100%), border-radius 16px 16px 0 0
- `.open`: transform translateY(0)

Image: full-width, max-height 240px, object-fit cover. Close button: absolute top-right. Park tag: colored pill badge. Height/can-ride badges: inline flex row. Tip: italic, muted color, with lightbulb icon.

**Step 3:** Verify build passes.

**Step 4:** Commit.

```
git add disney-site/src/components/DetailPanel/
git commit -m "feat: add DetailPanel component with responsive side panel / bottom sheet"
```

---

### Task 4: Refactor map component — rename, add rides & food layers

**Files:**
- Rename: `disney-site/src/sections/DisneySnacks/SnackMap.jsx` → `disney-site/src/components/InteractiveMap/InteractiveMap.jsx`
- Create: `disney-site/src/components/InteractiveMap/InteractiveMap.module.css` (for any module-scoped styles)
- Modify: `disney-site/src/pages/MapPage.jsx` (update import path)

**Step 1:** Copy `SnackMap.jsx` to `disney-site/src/components/InteractiveMap/InteractiveMap.jsx`. Rename the export from `SnackMap` to `InteractiveMap`. Update `MapPage.jsx` to import from the new path.

**Step 2:** Add rides layer to InteractiveMap:
- Import `mapRides` from `../../data/mapRides`
- Add `layer === 'rides'` as a new layer state option
- Add rides toggle button: `🎢 Rides`
- Add ride sub-filters when rides layer is active:
  - Park filter: All Parks / MK / HS / EPCOT
  - Height filters: "Luna can ride" / "Clara can ride" toggle buttons
- State: `const [rideParkFilter, setRideParkFilter] = useState('all')` and `const [heightFilter, setHeightFilter] = useState(null)` (null = no filter, 'luna', 'clara')
- Render ride markers: emoji markers with coral border for MK, mint for HS, yellow for EPCOT
- When ride marker clicked: call `onSelectItem(rideData)` prop instead of opening popup

**Step 3:** Add food layer (combines snacks + springs venues):
- Import `springsVenues` from `../../data/springsVenues`
- Replace `layer === 'food'` to show both snacks AND venues
- Add food sub-filter when food layer is active: All / MK / EPCOT / HS / Disney Springs
- State: `const [foodParkFilter, setFoodParkFilter] = useState('all')`
- Venue markers: use venue emoji, blue border
- When food marker clicked: call `onSelectItem(foodData)` prop

**Step 4:** Change all marker click handlers from opening Leaflet popups to calling `onSelectItem(item)`:
- Add `onSelectItem` prop to InteractiveMap
- For rides, food, shows — clicking marker calls `onSelectItem` with the full data object
- Remove `<Popup>` from show markers, snack cluster markers, ride markers
- Keep popups ONLY for park label markers and transport route markers (those are simple info)
- For snack cluster: switch from imperative cluster `.bindPopup()` to eventListening: `marker.on('click', () => onSelectItem(snackData))`

**Step 5:** Update toggle bar order to: Rides | Food | Shows & Events | Transportation (removed "Show All" — too many layers now; default to Rides)

- Default `layer` state: `useState('rides')`
- Remove `layer === 'all'` logic — each layer is now exclusive
- Keep boundaries as independent toggle (not affected by layer switch)

**Step 6:** Verify build passes.

**Step 7:** Commit.

```
git add disney-site/src/components/InteractiveMap/ disney-site/src/pages/MapPage.jsx
git commit -m "feat: rename SnackMap to InteractiveMap, add rides and food layers with panel callbacks"
```

---

### Task 5: Integrate DetailPanel into MapPage

**Files:**
- Modify: `disney-site/src/pages/MapPage.jsx`
- Modify: `disney-site/src/pages/MapPage.module.css`

**Step 1:** Update `MapPage.jsx`:
- Import `DetailPanel`
- Add state: `const [selectedItem, setSelectedItem] = useState(null)`
- Pass `onSelectItem={setSelectedItem}` to InteractiveMap
- Render `<DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />`
- Update subtitle text: "Rides, food, shows, transportation, and more"

**Step 2:** Update `MapPage.module.css`:
- `.mapWrap`: position relative (panel is fixed, so no layout changes needed)
- Remove padding from mapWrap when panel is open (optional, can keep)

**Step 3:** Verify build passes. Navigate to /map in browser, click a marker, verify panel opens.

**Step 4:** Commit.

```
git add disney-site/src/pages/
git commit -m "feat: integrate DetailPanel into MapPage with marker selection"
```

---

### Task 6: Remove sections from main page

**Files:**
- Modify: `disney-site/src/App.jsx`
- Modify: `disney-site/src/data/navSections.js`
- Modify: `disney-site/src/components/Footer/Footer.jsx`
- Modify: `disney-site/src/components/Footer/Footer.module.css`

**Step 1:** Update `App.jsx`:
- Remove imports: MagicKingdom, HollywoodStudios, Epcot, DisneySnacks, ShowsAndFireworks, HeightGuide, DisneySprings
- Remove from JSX: `<DisneySprings />`, `<MagicKingdom />`, `<HollywoodStudios />`, `<Epcot />`, `<HeightGuide />`, `<ShowsAndFireworks />`, `<DisneySnacks />`
- Remaining order: Hero → Timeline → Hotel → Transportation → RopeDrop → LightningLane → PhotoPass → Footer
- Fix WaveDivider: PhotoPass's bottom wave fill should match Footer's background (var(--text) which is what Footer uses as its dark background)

**Step 2:** Update `navSections.js` — remove entries for disney-springs, magic-kingdom, hollywood-studios, epcot, height-guide, shows-fireworks, disney-snacks. Keep: hero, timeline, hotel, transportation, rope-drop, lightning-lane, photo-pass.

**Step 3:** Add a map CTA to Footer. Update `Footer.jsx` to include a prominent "Explore the Interactive Map →" link above the existing footer text. Import `Link` from react-router-dom. Style it as a large button.

**Step 4:** Verify background alternation for remaining 7 sections:
1. Hero — var(--bg)
2. Timeline — var(--bg)
3. Hotel — var(--bg-alt)
4. Transportation — var(--bg)
5. RopeDrop — var(--bg-alt)
6. LightningLane — var(--bg)
7. PhotoPass — var(--bg-alt)

This matches the existing backgrounds — no changes needed since we're removing sections from after PhotoPass.

**Step 5:** Verify build passes. Navigate to localhost:5173, verify main page has 7 sections + footer.

**Step 6:** Commit.

```
git add disney-site/src/App.jsx disney-site/src/data/navSections.js disney-site/src/components/Footer/
git commit -m "feat: remove park/food/show sections from main page, add map CTA to footer"
```

---

### Task 7: Clean up old SnackMap references and DisneySnacks section

**Files:**
- Modify: `disney-site/src/sections/DisneySnacks/DisneySnacks.jsx` — can be deleted or kept as dead code
- Check: any remaining imports of SnackMap from old path

**Step 1:** Search codebase for any remaining references to `SnackMap` or `DisneySnacks` imports. The old `SnackMap.jsx` file in `sections/DisneySnacks/` can remain (it's not imported anywhere after the rename). Or clean it up by deleting it if no longer referenced.

**Step 2:** Verify build passes with no warnings about missing imports.

**Step 3:** Commit.

```
git commit -m "chore: clean up old SnackMap references"
```

---

### Task 8: Update CLAUDE.md and verify

**Files:**
- Modify: `CLAUDE.md`

**Step 1:** Update CLAUDE.md:
- Project Structure: add `components/InteractiveMap/` and `components/DetailPanel/`, note SnackMap is replaced
- Sections list: update to 7 (remove park/food/show sections)
- Leaflet Map section: update to reflect new layer system (rides, food, shows, transport, boundaries), detail panel, sub-filters
- Note that ride/food/show content now lives exclusively on /map page

**Step 2:** Build, verify main page and map page work.

Run:
```
cd disney-site && npm run build
systemctl --user restart disney-site
```

**Step 3:** Verify with Playwright: navigate to localhost:5173 (main page), then localhost:5173/map (map page), click markers, verify panel.

**Step 4:** Commit all remaining changes.

```
git add -A
git commit -m "docs: update CLAUDE.md for map-centric redesign"
```

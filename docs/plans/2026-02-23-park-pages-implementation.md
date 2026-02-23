# Park Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 3 unique park guide pages (Magic Kingdom, Hollywood Studios, EPCOT) with embedded mini-maps, floating nav, and park-specific content sections accessible from the main page Hero and Timeline.

**Architecture:** Three separate page files, each with independent section components and data files. Shared infrastructure includes a reusable ParkMiniMap component and parameterized FloatingNav. Routes added to main.jsx. Main page Hero gets park buttons; Timeline day cards become links.

**Tech Stack:** React, react-router-dom, react-leaflet, CSS Modules, existing design system (global.css variables)

---

## Phase 1: Shared Infrastructure

### Task 1: Add Routes and ParkMiniMap Component

**Files:**
- Modify: `disney-site/src/main.jsx`
- Create: `disney-site/src/components/ParkMiniMap/ParkMiniMap.jsx`
- Create: `disney-site/src/components/ParkMiniMap/ParkMiniMap.module.css`

**Step 1: Add route placeholders in main.jsx**

Add imports for the 3 park pages (placeholder components) and 3 new Route entries:
- `/park/magic-kingdom` → `MagicKingdomPage`
- `/park/hollywood-studios` → `HollywoodStudiosPage`
- `/park/epcot` → `EpcotPage`

**Step 2: Create ParkMiniMap component**

A reusable Leaflet map component that:
- Accepts props: `parkId` (string), `markers` (array of {lat, lng, emoji, name, id}), `boundary` (coords array from parkBoundaries.js), `center` ([lat, lng]), `zoom` (number), `color` (hex string)
- Renders a MapContainer with TileLayer (same as InteractiveMap: maxNativeZoom=19, maxZoom=23)
- Renders a Polygon for the park boundary
- Renders emoji markers for each item in `markers`
- Clicking a marker calls optional `onMarkerClick(id)` callback
- CSS: 100% width, 400px height desktop, 300px mobile, border-radius var(--radius-md)

**Step 3: Build and verify**

Run: `cd disney-site && npm run build`
Expected: Build succeeds (park pages are empty placeholders)

**Step 4: Commit**

```
feat: add park page routes and ParkMiniMap component
```

---

### Task 2: Parameterize FloatingNav for Park Pages

**Files:**
- Modify: `disney-site/src/components/FloatingNav/FloatingNav.jsx`

**Step 1: Make FloatingNav accept optional props**

Add optional `sections` prop (array of {id, label}) and optional `extraLinks` prop (array of {to, icon, label}). If `sections` is provided, use it instead of the default navSections import. If `extraLinks` is provided, render them after the dots (same style as existing map link).

This allows park pages to pass their own section list and a "Back to Home" link.

Default behavior (no props) remains identical to current implementation — zero regression risk.

**Step 2: Build and verify main page nav still works**

Navigate to localhost:5173, confirm FloatingNav renders all 9 section dots + map link.

**Step 3: Commit**

```
feat: parameterize FloatingNav to support park page sections
```

---

### Task 3: Add Park Buttons to Hero Section

**Files:**
- Modify: `disney-site/src/sections/Hero/Hero.jsx`
- Modify: `disney-site/src/sections/Hero/Hero.module.css`

**Step 1: Add 3 park link buttons below the tagline**

After the `.tagline` paragraph, add a `.parkLinks` div containing 3 Link components (from react-router-dom):
- 🏰 Magic Kingdom → `/park/magic-kingdom` (background: var(--coral))
- 🎬 Hollywood Studios → `/park/hollywood-studios` (background: var(--purple))
- 🌍 EPCOT → `/park/epcot` (background: var(--yellow), text: var(--text) for contrast)

**Step 2: Style the park buttons**

CSS for `.parkLinks`: flex, gap 1rem, justify-content center, flex-wrap wrap, margin-top 1.5rem.
CSS for `.parkLink`: padding 0.6rem 1.2rem, border-radius var(--radius-md), color white, font-weight 700, font-size 0.9rem, text-decoration none, transition transform 0.2s. Hover: scale(1.05).
Mobile: buttons full width at max-width 480px.

**Step 3: Build, navigate to localhost:5173, verify buttons appear in hero**

**Step 4: Commit**

```
feat: add park guide buttons to Hero section
```

---

### Task 4: Make Timeline Day Cards Link to Park Pages

**Files:**
- Modify: `disney-site/src/sections/Timeline/Timeline.jsx`
- Modify: `disney-site/src/sections/Timeline/Timeline.module.css`
- Modify: `disney-site/src/data/timelineDays.js`

**Step 1: Add `parkLink` field to timelineDays.js**

Add a `parkLink` property to the relevant day objects:
- Day 3 (Jan 18, MK): `parkLink: '/park/magic-kingdom'`
- Day 4 (Jan 19, HS): `parkLink: '/park/hollywood-studios'`
- Day 6 (Jan 21, EPCOT): `parkLink: '/park/epcot'`
- Day 7 (Jan 22, MK again): `parkLink: '/park/magic-kingdom'`
- All other days: `parkLink: null`

**Step 2: Render Link on cards with parkLink**

In Timeline.jsx, wrap the card content or add a small "View Park Guide →" link at the bottom of cards that have a `parkLink`. Use react-router-dom `Link` component. Style as a subtle text link with the card's color.

**Step 3: Build and verify**

**Step 4: Commit**

```
feat: link timeline park day cards to park guide pages
```

---

## Phase 2: Magic Kingdom Page

### Task 5: Create MK Data File

**Files:**
- Create: `disney-site/src/data/magicKingdomData.js`

**Step 1: Write magicKingdomData.js**

Export the following data structures:

`lands` — Array of 6 MK lands:
```js
{ id, name, emoji, color, vibe, topAttractions: [string] }
```
- Main Street U.S.A. (🏘️, warm red), Adventureland (🌴, green), Frontierland (🤠, brown), Liberty Square (🔔, navy), Fantasyland (🏰, pink), Tomorrowland (🚀, blue)

`easterEggs` — Array of hidden magic items:
```js
{ title, emoji, description }
```
- Underground Utilidors, Cinderella Castle suite, forced perspective on Main Street, hidden Mickeys locations, liberty bell crack, real human skulls on Pirates

`mkStrategy` — Object with morning/afternoon/evening arrays of steps (expand on parkDaySchedules.js)

`fireworksGuide` — Object with show name, best viewing spots, tips

`mkNavSections` — Array of {id, label} for FloatingNav

**Step 2: Commit**

```
feat: add Magic Kingdom data file
```

---

### Task 6: Create MK Section Components

**Files:**
- Create: `disney-site/src/sections/parks/mk/MKHero.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/LandsExplorer.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/MKRides.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/MKShows.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/MKDining.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/HiddenMagic.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/MKStrategy.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/mk/MKShopping.jsx` + `.module.css`

**Step 1: MKHero** — Full-height hero with Cinderella Castle bg (reuse existing Wikimedia URL from Hero.jsx), coral gradient overlay, park name + tagline "The park that started it all", scroll indicator

**Step 2: LandsExplorer** — Grid of 6 land cards from `lands` data. Each card: emoji, land name, vibe text, top attractions list. Coral accent colors. Click scrolls to MKRides section filtered to that land.

**Step 3: MKRides** — Filter mapRides.js for park === 'Magic Kingdom'. Group by land. Each ride card: emoji, name, height badges (Luna ✅/❌, Clara ✅/❌), Lightning Lane badge, description, tip. Optional filter buttons: "All" / "Luna Can Ride" / "Clara Can Ride".

**Step 4: MKShows** — Filter mapShows.js for MK. Card per show with emoji, name, type badge (show/fireworks/parade), description, tip. Fireworks section with viewing spot guide.

**Step 5: MKDining** — Filter snacks.js for MK. Toggle: Quick Service / Table Service. Card per restaurant: emoji, name, price tier, description. Highlight "Must-Try" items (Dole Whip, turkey leg, etc.) with special callout.

**Step 6: HiddenMagic** — Render easterEggs from data file as discovery cards. Scavenger-hunt style with numbered items and fun descriptions. Coral-themed borders.

**Step 7: MKStrategy** — Morning/afternoon/evening timeline (similar to RopeDrop section pattern). Rope drop order, LL priority list, fireworks viewing tip. Expand on parkDaySchedules content.

**Step 8: MKShopping** — Filter mapShops.js for MK. Group by land. Card per shop: emoji, name, description, tip.

**Step 9: Commit each section or batch 2-3 at a time**

```
feat: add Magic Kingdom page sections
```

---

### Task 7: Create MK Page and Wire It Up

**Files:**
- Create: `disney-site/src/pages/MagicKingdomPage.jsx`
- Create: `disney-site/src/pages/MagicKingdomPage.module.css`
- Modify: `disney-site/src/main.jsx` (replace placeholder import)

**Step 1: Create MagicKingdomPage.jsx**

- Import ActiveSectionProvider, FloatingNav (with MK sections), useScrollReveal
- Import all MK section components
- Import ParkMiniMap
- Render: ActiveSectionProvider wrapping FloatingNav + all sections in order
- Call useScrollReveal() for animations
- Alternating backgrounds (--bg / --bg-alt) with WaveDividers between sections
- ParkMiniMap section: filter mapRides + snacks for MK markers, pass MK boundary from parkBoundaries.js

**Step 2: Update main.jsx to import real MagicKingdomPage**

**Step 3: Build, navigate to localhost:5173/park/magic-kingdom, verify all sections render**

**Step 4: Commit**

```
feat: complete Magic Kingdom park guide page
```

---

## Phase 3: Hollywood Studios Page

### Task 8: Create HS Data File

**Files:**
- Create: `disney-site/src/data/hollywoodStudiosData.js`

**Step 1: Write hollywoodStudiosData.js**

Export:
- `galaxysEdgeGuide` — Array of experiences: lightsaber building at Savi's, Oga's Cantina drinks, Smuggler's Run role tips (pilot/gunner/engineer), Mando & Grogu mission, hidden details ("Bright Suns" greeting, Batuu language, droid tracks)
- `toyStoryLandGuide` — Array: Slinky Dog strategy, Alien Saucers tips, Woody's Lunch Box, giant toy photo ops
- `thrillGuide` — Array: Tower of Terror drop sequences, Rock 'n' Roller Coaster (now Muppets) tips, best seats
- `hsStrategy` — Morning/afternoon/evening expanded plan
- `hsNavSections` — FloatingNav sections

**Step 2: Commit**

```
feat: add Hollywood Studios data file
```

---

### Task 9: Create HS Section Components

**Files:**
- Create: `disney-site/src/sections/parks/hs/HSHero.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/GalaxysEdge.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/ToyStoryLand.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/HSRides.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/ThrillGuide.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/HSShows.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/HSDining.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/hs/HSStrategy.jsx` + `.module.css`

**Step 1: HSHero** — Tower of Terror bg (Wikimedia), purple gradient, "Where movies come to life"

**Step 2: GalaxysEdge** — Deep dive section. Card grid for each experience (Savi's, Oga's, Smuggler's Run, etc.). Purple accents. Tips callouts. "Cast members say 'Bright Suns' instead of hello" type hidden details.

**Step 3: ToyStoryLand** — Family-focused. Bright, playful layout. Giant toy theme. Slinky Dog strategy, ride tips, food. Callout: "Everything here is perfect for Luna & Clara's age!"

**Step 4: HSRides** — Filter mapRides.js for HS. Group by area. Height badges, LL status. Highlight the new Muppets coaster.

**Step 5: ThrillGuide** — For adults/thrill seekers. Tower of Terror mechanics, best strategies for intense rides. "While the other parent does Rider Swap..."

**Step 6: HSShows** — Filter mapShows for HS. Indiana Jones stunts, Fantasmic!, Disney Junior. Fantasmic! dining package strategy and viewing tips.

**Step 7: HSDining** — Filter snacks for HS. Ronto Wraps, totchos, 50's Prime Time Café, Docking Bay 7. Service type toggle.

**Step 8: HSStrategy** — Day plan timeline. Rope drop Tower of Terror first, morning Galaxy's Edge, afternoon Toy Story Land, evening Fantasmic!

**Step 9: Commit**

```
feat: add Hollywood Studios page sections
```

---

### Task 10: Create HS Page and Wire It Up

**Files:**
- Create: `disney-site/src/pages/HollywoodStudiosPage.jsx`
- Create: `disney-site/src/pages/HollywoodStudiosPage.module.css`
- Modify: `disney-site/src/main.jsx`

Same pattern as Task 7 but for HS. Purple theme, HS sections, HS boundary/markers.

**Step 1: Create page, wire routes, build, verify**

**Step 2: Commit**

```
feat: complete Hollywood Studios park guide page
```

---

## Phase 4: EPCOT Page

### Task 11: Create EPCOT Data File

**Files:**
- Create: `disney-site/src/data/epcotData.js`

**Step 1: Write epcotData.js**

Export:
- `worldShowcaseCountries` — Array of 11 countries: { name, emoji, flag, mustTryFood, mustTryDrink, kidFriendlyOption, characterMeet, uniqueShopping, hiddenDetail }
  - Mexico, Norway, China, Germany, Italy, America, Japan, Morocco, France, UK, Canada
- `festivalGuide` — Festival of the Arts info (January timing matches trip!): food booths, art activities, Disney on Broadway concerts, special merch
- `kidGuide` — Array: Frozen ride, Nemo, Figment, Kidcot Fun Stops, character meets, interactive fountains
- `epcotStrategy` — Morning/afternoon/evening plan expanded
- `epcotNavSections` — FloatingNav sections

**Step 2: Commit**

```
feat: add EPCOT data file
```

---

### Task 12: Create EPCOT Section Components

**Files:**
- Create: `disney-site/src/sections/parks/epcot/EpcotHero.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/WorldShowcase.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/EpcotRides.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/FestivalGuide.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/CountryGuide.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/BestForKids.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/EpcotDining.jsx` + `.module.css`
- Create: `disney-site/src/sections/parks/epcot/EpcotStrategy.jsx` + `.module.css`

**Step 1: EpcotHero** — Spaceship Earth bg (Wikimedia), yellow/gold gradient, "Eat, drink, and ride around the world"

**Step 2: WorldShowcase** — THE signature section. Passport-style layout with 11 country cards. Each card: flag emoji, country name, must-try food + drink, kid-friendly option. Visually distinctive — use border colors matching country flags or cultural colors.

**Step 3: EpcotRides** — Filter mapRides for EPCOT (8 rides). Guardians virtual queue strategy callout, Soarin' Across America highlight (new!), Test Track "design your car" tips, Frozen Ever After.

**Step 4: FestivalGuide** — Festival of the Arts (matches our January dates!). Food booth highlights, art activities for kids, Disney on Broadway concert schedule, special merchandise. Gold/yellow theme.

**Step 5: CountryGuide** — Deep-dive walking tour of World Showcase. Architecture highlights, character meet locations (Mulan in China, Belle in France, etc.), unique shopping per country, hidden details (Japan's pagoda layers, Morocco's authentic tiles).

**Step 6: BestForKids** — EPCOT isn't just for adults. Highlight: Frozen Ever After, The Seas with Nemo, Journey Into Imagination with Figment, Kidcot Fun Stops (free craft at every country), interactive play areas. Callout: "Luna will love..." / "Clara will love..."

**Step 7: EpcotDining** — Filter snacks for EPCOT. Ranked table service restaurants. Le Cellier, Teppan Edo, Space 220 (eating in space!), GEO-82 Lounge (new!). World Showcase vs Future World dining split.

**Step 8: EpcotStrategy** — Day plan: rope drop Guardians, morning Future World rides, afternoon World Showcase food tour, evening fireworks from the lagoon. Lightning Lane priorities.

**Step 9: Commit**

```
feat: add EPCOT page sections
```

---

### Task 13: Create EPCOT Page and Wire It Up

**Files:**
- Create: `disney-site/src/pages/EpcotPage.jsx`
- Create: `disney-site/src/pages/EpcotPage.module.css`
- Modify: `disney-site/src/main.jsx`

Same pattern as Task 7/10 but for EPCOT. Yellow theme, EPCOT sections, EPCOT boundary/markers.

**Step 1: Create page, wire routes, build, verify**

**Step 2: Commit**

```
feat: complete EPCOT park guide page
```

---

## Phase 5: Polish & Integration

### Task 14: Responsive Testing and Fixes

**Step 1: Test all 3 park pages at 1280x800 (desktop)**
- Verify all sections render, no horizontal overflow, images load, mini-maps display

**Step 2: Test at 768x1024 (tablet)**
- Verify grids collapse appropriately, mini-map resizes

**Step 3: Test at 390x844 (mobile)**
- Verify single-column stacking, no overflow, floating nav dots visible
- Park buttons in Hero fit on small screens

**Step 4: Fix any responsive issues found**

**Step 5: Commit**

```
fix: responsive adjustments for park guide pages
```

---

### Task 15: Build, Deploy, and Final Verification

**Step 1: Full build**
```bash
cd disney-site && npm run build
```

**Step 2: Restart service**
```bash
systemctl --user restart disney-site
```

**Step 3: Navigate to all routes and verify**
- localhost:5173 (main page — hero buttons, timeline links)
- localhost:5173/park/magic-kingdom
- localhost:5173/park/hollywood-studios
- localhost:5173/park/epcot
- localhost:5173/map

**Step 4: Update CLAUDE.md**
- Add park page routes to project structure
- Add new data files
- Add sections/parks/ directory description
- Update route list

**Step 5: Commit**

```
docs: update CLAUDE.md with park page structure
```

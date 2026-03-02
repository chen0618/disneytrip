# Map & UX Enhancements — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add four features: wait time best-times in DetailPanel, photo spots map layer, first-timer tip badges, and milestone countdown enhancements.

**Architecture:** All features are data-driven — new fields on existing data objects or new data files. No API calls, no new dependencies. Features are independent and can be built in any order. The photo spots layer follows the existing map layer toggle pattern (simple markers like Shows).

**Tech Stack:** React (JSX), CSS Modules, Leaflet (via react-leaflet), existing design system CSS variables.

---

## Task 1: Milestone Countdown Utility + Before You Go Enhancement

**Files:**
- Create: `disney-site/src/utils/getDaysUntil.js`
- Modify: `disney-site/src/sections/BeforeYouGo/BeforeYouGo.jsx:7-16,40-54`
- Modify: `disney-site/src/sections/BeforeYouGo/BeforeYouGo.module.css:131-156`

**Step 1: Create shared getDaysUntil utility**

```js
// src/utils/getDaysUntil.js
export function getDaysUntil(dateStr) {
  const target = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / 86_400_000);
}

export function getUrgency(dateStr) {
  const days = getDaysUntil(dateStr);
  let level = 'future';
  if (days < 0) level = 'past';
  else if (days <= 30) level = 'urgent';
  else if (days <= 90) level = 'soon';
  return { days, level };
}
```

**Step 2: Update BeforeYouGo to use shared utility**

Replace the inline `getUrgency` function (lines 7–17) with an import:

```js
import { getUrgency } from '../../utils/getDaysUntil';
```

Delete the local `getUrgency` function entirely.

**Step 3: Enhance deadline badge text**

In BeforeYouGo.jsx, replace the badge text logic (line 41):

```js
// Before:
const badgeText = level === 'past' ? 'Done' : `${days}d`;

// After:
const badgeText = level === 'past'
  ? 'Done ✓'
  : days === 0 ? 'Today!'
  : days === 1 ? '1 day'
  : `${days} days`;
```

**Step 4: Add pulse animation for urgent badges**

In BeforeYouGo.module.css, add after `.badge_urgent` (line 152):

```css
.badge_urgent {
  background: rgba(255, 107, 107, 0.15);
  color: var(--coral);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

**Step 5: Verify and commit**

Run: `cd disney-site && npm run build`
Expected: Clean build, no errors.

Visually verify: Navigate to `localhost:5173/guide`, check deadline badges show "X days" text with color coding.

```bash
git add src/utils/getDaysUntil.js src/sections/BeforeYouGo/BeforeYouGo.jsx src/sections/BeforeYouGo/BeforeYouGo.module.css
git commit -m "feat(guide): add shared countdown utility and enhance deadline badges"
```

---

## Task 2: Hero Section Milestone Chips

**Files:**
- Modify: `disney-site/src/sections/Hero/Hero.jsx:1-2,31-67`
- Modify: `disney-site/src/sections/Hero/Hero.module.css`

**Step 1: Import deadlines and utility into Hero**

Add imports at the top of Hero.jsx:

```js
import { getDaysUntil } from '../../utils/getDaysUntil';
import { keyDeadlines } from '../../data/beforeYouGoInfo';
```

**Step 2: Add milestone chips row below countdown**

In Hero.jsx, between the `.countdown` paragraph (line 47) and the `.tagline` paragraph (line 48), add:

```jsx
{(() => {
  const upcoming = keyDeadlines
    .map(dl => ({ ...dl, days: getDaysUntil(dl.date) }))
    .filter(dl => dl.days > 0)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3);
  if (!upcoming.length) return null;
  return (
    <div className={styles.milestones}>
      {upcoming.map(dl => (
        <span key={dl.label} className={styles.milestone}>
          {dl.icon} {dl.label.split('(')[0].trim()} in <strong>{dl.days}d</strong>
        </span>
      ))}
    </div>
  );
})()}
```

**Step 3: Add milestone CSS**

In Hero.module.css, after `.countdown` styles (line 52), add:

```css
.milestones {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  animation: fadeInUp 1s ease 0.55s both;
}
.milestone {
  font-size: clamp(0.7rem, 1.2vw, 0.82rem);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  white-space: nowrap;
}
.milestone strong {
  color: var(--yellow);
}
```

**Step 4: Verify and commit**

Run: `cd disney-site && npm run build`

Visually verify: Navigate to `localhost:5173`, check Hero section shows 2–3 milestone chips below countdown. Chips should have glassmorphism styling and yellow day counts.

```bash
git add src/sections/Hero/Hero.jsx src/sections/Hero/Hero.module.css
git commit -m "feat(hero): add milestone countdown chips below trip countdown"
```

---

## Task 3: First Timer Tips — Data + DetailPanel

**Files:**
- Modify: `disney-site/src/data/mapRides.js` (add `firstTimerTip` field to ~15-20 rides)
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.jsx:136-139`
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.module.css:190-200`

**Step 1: Add firstTimerTip data to major rides in mapRides.js**

Add `firstTimerTip` field to these rides (add right after the existing `tip` field for each):

**Magic Kingdom:**
- `space-mountain`: `'It\'s a roller coaster in complete darkness — not very fast, but the surprise factor makes it thrilling. Stay relaxed and enjoy the stars!'`
- `haunted-mansion`: `'The "stretch room" is actually an elevator going down — don\'t panic! Pick a side near the door for faster loading into your Doom Buggy.'`
- `big-thunder-mountain`: `'A fun, bumpy mine train — not too intense. The best views are from the left side. Great first "big kid" coaster.'`
- `pirates-of-the-caribbean`: `'There\'s a small drop in the dark at the start — it\'s gentle! Then it\'s a peaceful boat ride through pirate scenes. Kids love it.'`
- `seven-dwarfs-mine-train`: `'A gentle family coaster that swings side to side. The cars tilt on curves — sit in the back for more swing! Under 3 minutes.'`
- `splash-mountain` (Tiana's): `'The big drop looks scarier than it is — you\'ll get a splash but it\'s over in seconds. Front seats get wettest.'`
- `tron-lightcycle-run`: `'You lean forward on a motorcycle-style seat. Stow everything in a locker (free). The launch is fast but smooth — just hold on and enjoy the lights!'`
- `jungle-cruise`: `'A slow boat ride with a live skipper telling jokes — some are groan-worthy on purpose! Sit on the right side for better views.'`

**Hollywood Studios:**
- `tower-of-terror`: `'The drop sequence is randomized — sometimes 2 drops, sometimes 4+. The moment of weightlessness is brief. Front row has the best view when doors open at the top.'`
- `rock-n-roller-coaster`: `'The launch is 0–57 mph in 2.8 seconds — intense! There are 3 inversions in the dark. If you\'re nervous, close your eyes during the launch and open them after.'`
- `slinky-dog-dash`: `'A family-friendly coaster that\'s smooth and fun, not scary. Two small launches, gentle drops. Great for first-time coaster riders.'`
- `rise-of-the-resistance`: `'This is a full experience, not just a ride — you\'ll be "captured" by the First Order. Lasts about 18 minutes total. No big drops, but there are dark moments and loud sounds.'`
- `toy-story-mania`: `'It\'s a 3D shooting game on a moving ride — pull the string to shoot! Aim for high-value targets. Competitive and great for all ages.'`

**EPCOT:**
- `test-track`: `'You design a car then ride it through speed/handling tests. The final outdoor stretch hits 65 mph — the fastest ride at WDW! Hold on to loose items.'`
- `guardians-of-the-galaxy`: `'An indoor roller coaster that spins your car to face the action — unique and disorienting in the best way. Stow loose items. The music is amazing!'`
- `frozen-ever-after`: `'A gentle boat ride through Arendelle with a small backwards section and a short drop. Kids who love Frozen will be enchanted.'`
- `soarin`: `'A hang-gliding simulator — your feet dangle as you fly over world landmarks. Front row center has the best view with no feet in your sightline.'`
- `mission-space`: `'Choose Green (mild, no spinning) or Orange (intense, simulated G-forces). Green is great for most people. Orange can cause motion sickness — skip if you\'re sensitive.'`

**Step 2: Add first-timer tip rendering to DetailPanel**

In DetailPanel.jsx, after the existing tip block (line 139), add:

```jsx
{/* First Timer Tip */}
{item.firstTimerTip && (
  <div className={styles.firstTimerTip}>🌟 First Timer: {item.firstTimerTip}</div>
)}
```

**Step 3: Add first-timer tip CSS**

In DetailPanel.module.css, after `.tip` styles (line 200), add:

```css
/* ========== FIRST TIMER TIP ========== */
.firstTimerTip {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.12), rgba(255, 215, 0, 0.06));
  border-left: 3px solid var(--yellow);
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  color: var(--text-light);
  line-height: 1.5;
}
```

**Step 4: Verify and commit**

Run: `cd disney-site && npm run build`

Visually verify: Navigate to `localhost:5173/map`, click on Space Mountain or Haunted Mansion, check the DetailPanel shows the 🌟 First Timer block below the 💡 tip.

```bash
git add src/data/mapRides.js src/components/DetailPanel/DetailPanel.jsx src/components/DetailPanel/DetailPanel.module.css
git commit -m "feat(map): add first-timer tips to ride data and DetailPanel"
```

---

## Task 4: First Timer Tips — Park Page Ride Cards

**Files:**
- Modify: `disney-site/src/sections/parks/shared/ParkRidesSection.jsx:80-99`
- Modify: `disney-site/src/sections/parks/shared/ParkRidesSection.module.css`

**Step 1: Add first-timer badge to ride cards**

In ParkRidesSection.jsx, after the badges div (line 96), before the description paragraph (line 97), add:

```jsx
{ride.firstTimerTip && (
  <details className={styles.firstTimer}>
    <summary className={styles.firstTimerLabel}>🌟 First Timer Tip</summary>
    <p className={styles.firstTimerText}>{ride.firstTimerTip}</p>
  </details>
)}
```

Using `<details>/<summary>` gives expand/collapse for free — no state needed, accessible by default.

**Step 2: Add first-timer styles**

In ParkRidesSection.module.css, add at the end:

```css
/* First Timer expandable tip */
.firstTimer {
  margin: 0.5rem 0;
}
.firstTimerLabel {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--park-accent, var(--yellow));
  cursor: pointer;
  user-select: none;
  list-style: none;
}
.firstTimerLabel::marker { display: none; }
.firstTimerLabel::-webkit-details-marker { display: none; }
.firstTimerText {
  font-size: 0.82rem;
  color: var(--text-light);
  line-height: 1.5;
  margin-top: 0.35rem;
  padding-left: 1.4rem;
}
```

**Step 3: Verify and commit**

Run: `cd disney-site && npm run build`

Visually verify: Navigate to `localhost:5173/park/magic-kingdom`, find Space Mountain ride card, confirm "🌟 First Timer Tip" label appears and expands on click. Check dark mode too.

```bash
git add src/sections/parks/shared/ParkRidesSection.jsx src/sections/parks/shared/ParkRidesSection.module.css
git commit -m "feat(parks): add expandable first-timer tips to ride cards"
```

---

## Task 5: Wait Time Best-Times — Data

**Files:**
- Modify: `disney-site/src/data/mapRides.js` (add `bestTimes` field to ~20-25 rides)

**Step 1: Add bestTimes data to rides with significant wait variation**

Add `bestTimes` field to these rides. Each has `{ morning, midday, evening }` with values `'low'`, `'medium'`, or `'high'`, plus a `recommendation` string.

**Magic Kingdom (headliners):**
- `seven-dwarfs-mine-train`: `{ morning: 'medium', midday: 'high', evening: 'high', rec: 'Rope drop priority #1 — waits build fast after 10am' }`
- `tron-lightcycle-run`: `{ morning: 'medium', midday: 'high', evening: 'medium', rec: 'Virtual queue or Lightning Lane recommended. Waits drop after dark.' }`
- `peter-pans-flight`: `{ morning: 'medium', midday: 'high', evening: 'high', rec: 'Consistently the longest wait in MK — go at rope drop or use LL' }`
- `space-mountain`: `{ morning: 'low', midday: 'high', evening: 'medium', rec: 'Best before 11am or during fireworks' }`
- `big-thunder-mountain`: `{ morning: 'low', midday: 'high', evening: 'medium', rec: 'Great at rope drop or last hour of the night' }`
- `splash-mountain` (Tiana's): `{ morning: 'low', midday: 'high', evening: 'medium', rec: 'Morning waits are short — ride before noon' }`
- `haunted-mansion`: `{ morning: 'low', midday: 'medium', evening: 'medium', rec: 'Rarely a long wait — flexible timing works' }`
- `jungle-cruise`: `{ morning: 'low', midday: 'high', evening: 'medium', rec: 'After dark is a different experience — worth the wait!' }`
- `pirates-of-the-caribbean`: `{ morning: 'low', midday: 'medium', evening: 'low', rec: 'Consistently short waits — ride anytime' }`
- `buzz-lightyear`: `{ morning: 'low', midday: 'medium', evening: 'low', rec: 'Skip at rope drop — hit headliners first, then circle back' }`

**Hollywood Studios (headliners):**
- `rise-of-the-resistance`: `{ morning: 'high', midday: 'high', evening: 'medium', rec: 'LL Single Pass strongly recommended — waits rarely drop below 60 min' }`
- `slinky-dog-dash`: `{ morning: 'medium', midday: 'high', evening: 'medium', rec: 'Rope drop #1 for HS — head straight here at park open' }`
- `tower-of-terror`: `{ morning: 'low', midday: 'high', evening: 'medium', rec: 'Morning or during Fantasmic are the shortest waits' }`
- `rock-n-roller-coaster`: `{ morning: 'low', midday: 'medium', evening: 'medium', rec: 'Morning waits are manageable — pair with Tower of Terror at rope drop' }`
- `toy-story-mania`: `{ morning: 'medium', midday: 'high', evening: 'medium', rec: 'Gets busy fast — ride before 11am or use Lightning Lane' }`
- `millennium-falcon`: `{ morning: 'low', midday: 'medium', evening: 'low', rec: 'Often under 30 min — flexible timing works, ask for pilot seat' }`

**EPCOT (headliners):**
- `guardians-of-the-galaxy`: `{ morning: 'high', midday: 'high', evening: 'medium', rec: 'Virtual queue required early in the day. Evening standby drops significantly.' }`
- `test-track`: `{ morning: 'medium', midday: 'high', evening: 'medium', rec: 'Rope drop or evening — waits peak 12pm–3pm' }`
- `frozen-ever-after`: `{ morning: 'medium', midday: 'high', evening: 'medium', rec: 'Hit early or during fireworks. LL is worth it here.' }`
- `soarin`: `{ morning: 'low', midday: 'medium', evening: 'low', rec: 'Request front row center for the best view — worth a short extra wait' }`
- `remy`: `{ morning: 'low', midday: 'medium', evening: 'medium', rec: 'Morning is best — waits build as World Showcase opens at 11am' }`

Rides NOT getting bestTimes (consistently short waits): Astro Orbiter, Barnstormer, Dumbo, It's a Small World, PeopleMover, Magic Carpets, Mad Tea Party, all shows, Alien Swirling Saucers, etc.

**Step 2: Verify and commit**

Run: `cd disney-site && npm run build`
Expected: Clean build (data-only change, no UI yet).

```bash
git add src/data/mapRides.js
git commit -m "feat(data): add bestTimes wait time data to 21 headliner rides"
```

---

## Task 6: Wait Time Best-Times — DetailPanel UI

**Files:**
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.jsx`
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.module.css`

**Step 1: Add BestTimes bar component in DetailPanel**

In DetailPanel.jsx, before the `export default function DetailPanel` line, add a helper:

```jsx
const TIME_SLOTS = [
  { key: 'morning', label: '🌅 Morning', sub: '9am–12pm' },
  { key: 'midday', label: '☀️ Midday', sub: '12–5pm' },
  { key: 'evening', label: '🌙 Evening', sub: '5pm–close' },
];

const LEVEL_LABELS = { low: 'Low', medium: 'Moderate', high: 'Busy' };
```

**Step 2: Render BestTimes bar in DetailPanel**

In the content section, after the firstTimerTip block (added in Task 3) and before the action links, add:

```jsx
{/* Best Times */}
{item.bestTimes && (
  <div className={styles.bestTimes}>
    <div className={styles.bestTimesHeader}>⏱️ Best Times to Ride</div>
    <div className={styles.bestTimesBar}>
      {TIME_SLOTS.map(slot => {
        const level = item.bestTimes[slot.key];
        return (
          <div key={slot.key} className={`${styles.timeSlot} ${styles[`time_${level}`]}`}>
            <span className={styles.timeLabel}>{slot.label}</span>
            <span className={styles.timeLevel}>{LEVEL_LABELS[level]}</span>
          </div>
        );
      })}
    </div>
    {item.bestTimes.rec && (
      <p className={styles.bestTimesRec}>{item.bestTimes.rec}</p>
    )}
  </div>
)}
```

**Step 3: Add BestTimes CSS**

In DetailPanel.module.css, add after the `.firstTimerTip` styles:

```css
/* ========== BEST TIMES ========== */
.bestTimes {
  margin-top: 0.75rem;
}
.bestTimesHeader {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.4rem;
}
.bestTimesBar {
  display: flex;
  gap: 0.35rem;
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.timeSlot {
  flex: 1;
  text-align: center;
  padding: 0.4rem 0.25rem;
  border-radius: var(--radius-sm);
}
.timeLabel {
  display: block;
  font-size: 0.72rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}
.timeLevel {
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.time_low {
  background: rgba(78, 205, 196, 0.18);
  color: #2d9e94;
}
.time_medium {
  background: rgba(255, 215, 0, 0.18);
  color: #b8960a;
}
.time_high {
  background: rgba(255, 107, 107, 0.15);
  color: #d94848;
}
.bestTimesRec {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
  margin-top: 0.4rem;
  line-height: 1.4;
}
```

**Step 4: Add dark mode support**

In `disney-site/src/styles/global.css`, inside the `html[data-theme="dark"]` block, add:

```css
--time-low-bg: rgba(78, 205, 196, 0.25);
--time-low-color: #5eddd3;
--time-med-bg: rgba(255, 215, 0, 0.22);
--time-med-color: #f0d040;
--time-high-bg: rgba(255, 107, 107, 0.22);
--time-high-color: #ff8a8a;
```

Then update the `.time_low`, `.time_medium`, `.time_high` classes to use these:

```css
.time_low {
  background: var(--time-low-bg, rgba(78, 205, 196, 0.18));
  color: var(--time-low-color, #2d9e94);
}
.time_medium {
  background: var(--time-med-bg, rgba(255, 215, 0, 0.18));
  color: var(--time-med-color, #b8960a);
}
.time_high {
  background: var(--time-high-bg, rgba(255, 107, 107, 0.15));
  color: var(--time-high-color, #d94848);
}
```

**Step 5: Verify and commit**

Run: `cd disney-site && npm run build`

Visually verify: Navigate to `localhost:5173/map`, click Space Mountain → should see 3-slot color bar (green/red/yellow) plus recommendation text. Check dark mode too.

```bash
git add src/components/DetailPanel/DetailPanel.jsx src/components/DetailPanel/DetailPanel.module.css src/styles/global.css
git commit -m "feat(map): add best-times wait bar to DetailPanel for headliner rides"
```

---

## Task 7: Photo Spots — Data File

**Files:**
- Create: `disney-site/src/data/mapPhotoSpots.js`

**Step 1: Create mapPhotoSpots.js with ~25-30 curated photo spots**

All coordinates MUST be verified via OSM Overpass API:
```bash
curl -s "https://overpass-api.de/api/interpreter" --data-urlencode "data=[out:json];(node[\"name\"=\"VENUE NAME\"](28.3,-81.7,28.5,-81.4);way[\"name\"=\"VENUE NAME\"](28.3,-81.7,28.5,-81.4););out center;"
```

Create the data file with this structure:

```js
export const mapPhotoSpots = [
  // === Magic Kingdom ===
  {
    id: 'castle-hub',
    name: 'Cinderella Castle Hub',
    emoji: '📸',
    type: 'photo',
    park: 'Magic Kingdom',
    land: 'Main Street, U.S.A.',
    lat: null, // OSM-verified
    lng: null,
    description: 'The classic family photo — Cinderella Castle straight on from the hub. Best light in the morning (sun behind you) or at night with dream lights.',
    tip: 'Stand at the brass compass marker in the center of the hub for perfect symmetry. PhotoPass photographers are usually here.',
    category: 'landmark',
  },
  // ... more spots
];
```

**Categories:**
- `landmark` (~12-15): Cinderella Castle hub, EPCOT Spaceship Earth, Tower of Terror, Hollywood sign, Toy Story Land entrance, World Showcase lagoon, Main Street train station, Tomorrowland arches, etc.
- `hidden-gem` (~12-15): Tangled restrooms area, purple wall (Tomorrowland), bubblegum wall (Tomorrowland), France pavilion bridge/Eiffel Tower view, Expedition Everest from bridge viewpoint, Galaxy's Edge Millennium Falcon, Harambe Market arch, etc.

**IMPORTANT:** Look up every coordinate via OSM. Do not estimate. Include only spots at MK, HS, and EPCOT (skip AK). Update `src/data/COORDINATE_STATUS.md` with verification dates.

**Step 2: Verify and commit**

Run: `cd disney-site && npm run build`
Expected: Clean build (data-only, not imported yet).

```bash
git add src/data/mapPhotoSpots.js src/data/COORDINATE_STATUS.md
git commit -m "feat(data): add 25-30 curated photo spot locations with OSM coordinates"
```

---

## Task 8: Photo Spots — Map Layer Integration

**Files:**
- Modify: `disney-site/src/components/InteractiveMap/InteractiveMap.jsx`
- Modify: `disney-site/src/styles/leaflet-overrides.css`

**Step 1: Import photo spots data**

At the top of InteractiveMap.jsx, add:

```js
import { mapPhotoSpots } from '../../data/mapPhotoSpots';
```

**Step 2: Add photoIcon factory function**

After the existing `venueIcon` function (~line 89), add:

```js
function photoIcon(emoji, category) {
  const color = category === 'hidden-gem' ? '#E84393' : '#00CEC9';
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker photo-marker" style="border-color:${color};box-shadow:0 2px 8px ${color}80;">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}
```

**Step 3: Add photo layer state and visibility**

In the component state area (~line 401), add:

```js
const [photoParkFilter, setPhotoParkFilter] = useState('all');
```

In the visibility derivations (~line 410), add:

```js
const showPhotos = layer === 'photos';
```

Add a `selectPhotoPark` function after the other `select*Park` functions:

```js
function selectPhotoPark(val) {
  if (val === photoParkFilter) return;
  setPhotoParkFilter(val);
  if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
}
```

**Step 4: Add Photo Spots layer tab**

In the `.map-layer-tabs` div (~line 491), add after the Transport tab:

```jsx
<button className={`map-tab ${layer === 'photos' ? 'active' : ''}`} onClick={() => setLayer('photos')}>📸 Photos</button>
```

**Step 5: Add photo layer sub-filters**

In the sub-filter row (~line 545), before the `chip-sep` + Hotel button, add:

```jsx
{layer === 'photos' && (<>
  <button className={`map-chip ${photoParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectPhotoPark('all')}>All</button>
  <button className={`map-chip ${photoParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectPhotoPark('Magic Kingdom')}>MK</button>
  <button className={`map-chip ${photoParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectPhotoPark('Hollywood Studios')}>HS</button>
  <button className={`map-chip ${photoParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectPhotoPark('EPCOT')}>EPCOT</button>
</>)}
```

**Step 6: Add photo spot markers in MapContainer**

After the Shows markers block (~line 690), add:

```jsx
{/* Photo Spot markers */}
{showPhotos && mapPhotoSpots
  .filter(s => photoParkFilter === 'all' || s.park === photoParkFilter)
  .map(s => (
    <Marker
      key={s.id}
      position={[s.lat, s.lng]}
      icon={photoIcon(s.category === 'hidden-gem' ? '✨' : '📸', s.category)}
      zIndexOffset={1500}
      eventHandlers={{ click: () => onSelectItem(enrichItem(s)) }}
    />
  ))
}
```

**Step 7: Add photo-marker style to leaflet-overrides.css**

```css
.photo-marker {
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
```

**Step 8: Add category badge rendering in DetailPanel**

In DetailPanel.jsx, after the tags row (~line 89), add a category badge for photo type:

```jsx
{type === 'photo' && item.category && (
  <div className={styles.badges}>
    <span className={styles.categoryBadge} style={{
      background: item.category === 'hidden-gem' ? '#E84393' : '#00CEC9',
      color: '#fff',
    }}>
      {item.category === 'hidden-gem' ? '✨ Hidden Gem' : '🏰 Landmark'}
    </span>
  </div>
)}
```

Add in DetailPanel.module.css:

```css
.categoryBadge {
  composes: badge;
}
```

**Step 9: Verify and commit**

Run: `cd disney-site && npm run build`

Visually verify: Navigate to `localhost:5173/map`, click "📸 Photos" tab, verify markers appear with teal (landmarks) and pink (hidden gems) styling. Click a marker → DetailPanel shows description, tip, and category badge. Test park filter. Test dark mode.

```bash
git add src/components/InteractiveMap/InteractiveMap.jsx src/styles/leaflet-overrides.css src/components/DetailPanel/DetailPanel.jsx src/components/DetailPanel/DetailPanel.module.css
git commit -m "feat(map): add Photo Spots layer with landmark and hidden gem markers"
```

---

## Task 9: Final Verification + CLAUDE.md Update

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Full visual verification**

Build and restart:
```bash
cd disney-site && npm run build && systemctl --user restart disney-site
```

Check all features on desktop and mobile (375px width):
1. **Hero**: Milestone chips visible below countdown, correct day counts
2. **Before You Go** (/guide): Deadline badges show "X days" with color progression
3. **Map → Rides**: Click Space Mountain → DetailPanel shows 💡 tip, 🌟 First Timer tip, ⏱️ Best Times bar
4. **Map → Photos**: New 📸 Photos tab, markers appear, park filter works, DetailPanel shows category badge
5. **Park pages**: Ride cards show expandable "🌟 First Timer Tip" for rides that have them
6. **Dark mode**: All new elements render correctly

**Step 2: Update CLAUDE.md**

Add to project structure:
- `mapPhotoSpots.js` in data/ listing with description

Add to Interactive Map section:
- **Photo Spots layer**: 📸 Photos tab, ~25-30 spots, landmark/hidden-gem categories, teal/pink markers

Add to Design System or relevant section:
- `firstTimerTip` and `bestTimes` fields on mapRides.js
- `getDaysUntil.js` utility shared by Hero and BeforeYouGo

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md with photo spots, first-timer tips, best-times, milestone countdowns"
```

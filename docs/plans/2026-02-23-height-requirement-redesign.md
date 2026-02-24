# Height Requirement Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace child-specific ride filtering (Luna/Clara can ride) with raw height requirement display and a "By Land" / "By Height" sort toggle.

**Architecture:** Remove `lunaCanRide`/`claraCanRide` from all data layers. Add `heightReqInches` numeric field for sorting. Replace filter buttons with view-mode toggle in 3 park ride components. Clean up DetailPanel and InteractiveMap. Remove child-specific prose.

**Tech Stack:** React (JSX), CSS Modules, existing design system vars

---

### Task 1: Add `heightReqInches` and remove child booleans from `mapRides.js`

**Files:**
- Modify: `disney-site/src/data/mapRides.js` (all 35 ride objects)

**Step 1: Edit mapRides.js**

For each ride object, do a find-and-replace transformation:
- Remove the `lunaCanRide: true/false,` line
- Remove the `claraCanRide: true/false,` line
- After the `heightReq` line, add `heightReqInches` with the numeric value

Mapping (parse from existing `heightReq` strings):
- `heightReq: null` → `heightReqInches: 0`
- `heightReq: '32"'` → `heightReqInches: 32`
- `heightReq: '35"'` → `heightReqInches: 35`
- `heightReq: '38"'` → `heightReqInches: 38`
- `heightReq: '40"'` → `heightReqInches: 40`
- `heightReq: '42"'` → `heightReqInches: 42`
- `heightReq: '44"'` → `heightReqInches: 44`
- `heightReq: '48"'` → `heightReqInches: 48`

**Step 2: Update file header comment**

```js
// All rides across Magic Kingdom, Hollywood Studios, and EPCOT
// Merged from attractions.js (descriptions/images) and heightRequirements.js (height data)
```

(Remove the "can-ride" part of the comment on line 2.)

**Step 3: Verify**

Run: `cd disney-site && npm run build`
Expected: Build succeeds (unused fields don't cause errors, but consumers will break — fixed in later tasks)

**Step 4: Commit**

```bash
git add disney-site/src/data/mapRides.js
git commit -m "refactor: remove lunaCanRide/claraCanRide, add heightReqInches to mapRides"
```

---

### Task 2: Clean up `heightRequirements.js`

**Files:**
- Modify: `disney-site/src/data/heightRequirements.js`

**Step 1: Remove `kidProfiles` export entirely** (lines 6-9)

**Step 2: Remove `lunaCanRide` and `claraCanRide` from each tier object**

Each tier keeps: `tier`, `emoji`, `color`, `note`, `rides`. Remove the two boolean fields.

**Step 3: Update notes to be generic** (remove child-specific wording)

- `'~34–35"'` references → remove
- `'Can ride most 40" rides!'` → remove
- `'Clara might just make this!'` → `'Mild — most kids can handle this'`
- `'Clara might not be tall enough yet'` → `'First coaster territory'`
- `'Luna can ride! Clara will need Rider Swap.'` → `'Rider Swap available for shorter kids'`
- `'Luna is borderline — measure her before the trip! Rider Swap for Clara.'` → `'Rider Swap available for shorter kids'`
- `'Luna might not be tall enough. Rider Swap for both kids.'` → `'Rider Swap available for shorter kids'`
- `'Adults only — Rider Swap for both kids.'` → `'Taller riders only — Rider Swap available'`

**Step 4: Commit**

```bash
git add disney-site/src/data/heightRequirements.js
git commit -m "refactor: remove child-specific data from heightRequirements"
```

---

### Task 3: Clean up prose in `hollywoodStudiosData.js` and `epcotData.js`

**Files:**
- Modify: `disney-site/src/data/hollywoodStudiosData.js`
- Modify: `disney-site/src/data/epcotData.js`

**Step 1: Edit hollywoodStudiosData.js**

Three strings to fix (found via grep):

1. Smuggler's Run tip: `"38\" height req — Luna can ride!"` → `"38\" height requirement"`
2. Alien Saucers tip: `"Both Luna and Clara can ride!"` → `"No height requirement — great for little ones!"`
3. Tower of Terror description: `"40\" height req."` stays (factual). Tip: `"Luna can ride if she hits 40\"!"` → `"40\" height requirement"`

**Step 2: Edit epcotData.js**

1. Frozen Ever After in kidGuide: `"Luna will be OBSESSED. No height requirement — Clara can ride too!"` → `"No height requirement — the whole family can ride!"`

**Step 3: Edit EpcotRides.jsx callout strings**

1. Test Track tip: `"even if they can't ride (40\" min)"` → `"even if they can't ride (40\" height requirement)"`
2. Frozen Ever After tip: `"perfect for Luna AND Clara."` → `"perfect for the whole family."`

**Step 4: Commit**

```bash
git add disney-site/src/data/hollywoodStudiosData.js disney-site/src/data/epcotData.js disney-site/src/sections/parks/epcot/EpcotRides.jsx
git commit -m "fix: remove child-specific height references from prose"
```

---

### Task 4: Update MKRides.jsx — view toggle with "By Land" / "By Height"

**Files:**
- Modify: `disney-site/src/sections/parks/mk/MKRides.jsx`

**Step 1: Replace FILTERS and filter logic**

```jsx
import { useState, useMemo } from 'react';
import { mapRides } from '../../../data/mapRides';
import styles from './MKRides.module.css';

const VIEW_MODES = [
  { key: 'land', label: 'By Land' },
  { key: 'height', label: 'By Height' },
];

export default function MKRides() {
  const [viewMode, setViewMode] = useState('land');

  const mkRides = useMemo(
    () => mapRides.filter((r) => r.park === 'Magic Kingdom'),
    [],
  );

  const grouped = useMemo(() => {
    if (viewMode === 'land') {
      const map = {};
      mkRides.forEach((r) => {
        if (!map[r.land]) map[r.land] = [];
        map[r.land].push(r);
      });
      return Object.entries(map);
    }
    // By height — group by heightReqInches descending, then "No Requirement"
    const withReq = mkRides.filter((r) => r.heightReqInches > 0);
    const noReq = mkRides.filter((r) => r.heightReqInches === 0);
    const tierMap = {};
    withReq.forEach((r) => {
      const label = r.heightReq;
      if (!tierMap[label]) tierMap[label] = { inches: r.heightReqInches, rides: [] };
      tierMap[label].rides.push(r);
    });
    const sorted = Object.entries(tierMap)
      .sort(([, a], [, b]) => b.inches - a.inches)
      .map(([label, { rides }]) => [label, rides]);
    if (noReq.length) sorted.push(['No Requirement', noReq]);
    return sorted;
  }, [mkRides, viewMode]);

  return (
    <section id="mk-rides" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Rides & Attractions</h2>
          <p className="subtitle">Every ride at Magic Kingdom, filtered for our crew</p>
        </div>

        <div className={styles.filters}>
          {VIEW_MODES.map((m) => (
            <button
              key={m.key}
              className={`${styles.filterBtn} ${viewMode === m.key ? styles.active : ''}`}
              onClick={() => setViewMode(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {grouped.map(([group, rides]) => (
          <div key={group} className={styles.landGroup}>
            <h3 className={styles.landTitle}>{group}</h3>
            <div className={styles.rideGrid}>
              {rides.map((ride) => (
                <div key={ride.id} className={styles.rideCard}>
                  <div className={styles.rideHeader}>
                    <span className={styles.rideEmoji}>{ride.emoji}</span>
                    <h4 className={styles.rideName}>{ride.name}</h4>
                  </div>
                  <div className={styles.badges}>
                    <span
                      className={styles.badge}
                      style={{ background: '#e8e8e8', color: '#333' }}
                    >
                      {ride.heightReq || 'Any Height'}
                    </span>
                    {ride.lightningLane && (
                      <span className={styles.llBadge}>Lightning Lane</span>
                    )}
                  </div>
                  <p className={styles.rideDesc}>{ride.description}</p>
                  {ride.tip && <p className={styles.rideTip}>{ride.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Key changes:
- `FILTERS` → `VIEW_MODES` with land/height
- `filter` state → `viewMode` state
- Grouped logic: height mode groups by `heightReqInches` descending, with "No Requirement" last
- Badge: always rendered with neutral gray (`#e8e8e8` / `#333`), shows `heightReq` or "Any Height"
- Removed empty-state message (no filtering = always rides to show)

**Step 2: Commit**

```bash
git add disney-site/src/sections/parks/mk/MKRides.jsx
git commit -m "feat: replace Luna/Clara filters with By Land / By Height toggle in MKRides"
```

---

### Task 5: Update HSRides.jsx — same pattern as MKRides

**Files:**
- Modify: `disney-site/src/sections/parks/hs/HSRides.jsx`

**Step 1: Apply same transformation as Task 4**

Identical logic but:
- Filter: `r.park === 'Hollywood Studios'`
- Section id: `hs-rides`
- Background: `var(--bg-alt)`
- Subtitle: `"Every ride at Hollywood Studios, filtered for our crew"`

**Step 2: Commit**

```bash
git add disney-site/src/sections/parks/hs/HSRides.jsx
git commit -m "feat: replace Luna/Clara filters with By Land / By Height toggle in HSRides"
```

---

### Task 6: Update EpcotRides.jsx — same pattern plus callouts

**Files:**
- Modify: `disney-site/src/sections/parks/epcot/EpcotRides.jsx`

**Step 1: Apply same view toggle transformation as Task 4**

Same logic but:
- Filter: `r.park === 'EPCOT'`
- Section id: `epcot-rides`
- Background: `var(--bg)`
- Subtitle: `"Every ride at EPCOT, filtered for our crew"`
- Keep the CALLOUTS section above the filters (already cleaned up in Task 3)

**Step 2: Commit**

```bash
git add disney-site/src/sections/parks/epcot/EpcotRides.jsx
git commit -m "feat: replace Luna/Clara filters with By Land / By Height toggle in EpcotRides"
```

---

### Task 7: Update InteractiveMap.jsx — remove height filter chips

**Files:**
- Modify: `disney-site/src/components/InteractiveMap/InteractiveMap.jsx`

**Step 1: Remove `heightFilter` state**

Delete: `const [heightFilter, setHeightFilter] = useState(null);`

**Step 2: Remove height filter logic from ride filtering**

Delete these two lines from the rides filter chain (~lines 444-445):
```js
if (heightFilter === 'luna' && !r.lunaCanRide) return false;
if (heightFilter === 'clara' && !r.claraCanRide) return false;
```

**Step 3: Remove Luna/Clara chip buttons from JSX**

Delete the chip separator and two buttons (~lines 504-506):
```jsx
<span className="chip-sep">|</span>
<button className={`map-chip ride-chip ${heightFilter === 'luna' ? 'active' : ''}`} ...>Luna</button>
<button className={`map-chip ride-chip ${heightFilter === 'clara' ? 'active' : ''}`} ...>Clara</button>
```

**Step 4: Commit**

```bash
git add disney-site/src/components/InteractiveMap/InteractiveMap.jsx
git commit -m "refactor: remove Luna/Clara height filter from interactive map"
```

---

### Task 8: Update DetailPanel.jsx and CSS — remove child badges

**Files:**
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.jsx`
- Modify: `disney-site/src/components/DetailPanel/DetailPanel.module.css`

**Step 1: Remove Luna/Clara badge JSX from DetailPanel.jsx**

Delete lines 101-109:
```jsx
{item.lunaCanRide != null && (
  <span className={item.lunaCanRide ? styles.lunaYes : styles.lunaNo}>
    Luna {item.lunaCanRide ? '✓' : '✗'}
  </span>
)}
{item.claraCanRide != null && (
  <span className={item.claraCanRide ? styles.claraYes : styles.claraNo}>
    Clara {item.claraCanRide ? '✓' : '✗'}
  </span>
)}
```

**Step 2: Remove CSS classes from DetailPanel.module.css**

Delete `.lunaYes`, `.lunaNo`, `.claraYes`, `.claraNo` (lines 165-184).

**Step 3: Commit**

```bash
git add disney-site/src/components/DetailPanel/DetailPanel.jsx disney-site/src/components/DetailPanel/DetailPanel.module.css
git commit -m "refactor: remove Luna/Clara badges from DetailPanel"
```

---

### Task 9: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (repo root)

**Step 1: Update Rides layer description**

Change:
```
- **Rides layer**: 35 rides from mapRides.js, park sub-filter (All/MK/HS/EPCOT), height sub-filter (Luna can ride / Clara can ride)
```
To:
```
- **Rides layer**: 35 rides from mapRides.js, park sub-filter (All/MK/HS/EPCOT)
```

**Step 2: Update Trip Details kids line**

Change:
```
- Kids: Luna (born June 16, 2022, ~41-42" tall by trip), Clara (born April 2, 2024, ~34-35" tall)
```
To:
```
- Kids: Luna (born June 16, 2022), Clara (born April 2, 2024)
```

**Step 3: Remove "Height badges" gotcha from Data Consistency section**

Delete: `- **Height badges**: heightReq field already includes the unit (e.g., "40\"") — do NOT append "min" or other suffixes`

(This is no longer relevant with the new neutral badge approach.)

**Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for height requirement redesign"
```

---

### Task 10: Build, deploy, and visual verification

**Step 1: Build**

```bash
cd disney-site && npm run build
```

Expected: Clean build, no warnings about missing fields.

**Step 2: Deploy**

```bash
systemctl --user restart disney-site
```

**Step 3: Visual verification**

Navigate to each page and verify:
1. `localhost:5173/park/magic-kingdom` — "By Land" / "By Height" toggle works, neutral gray height badges
2. `localhost:5173/park/hollywood-studios` — same toggle, no "Luna can ride!" in prose
3. `localhost:5173/park/epcot` — same toggle, callouts cleaned up
4. `localhost:5173/map` — rides layer has park chips only, no Luna/Clara chips
5. Click a ride on map — DetailPanel shows height badge, no Luna/Clara checkmarks

**Step 4: Final commit if any visual fixes needed**

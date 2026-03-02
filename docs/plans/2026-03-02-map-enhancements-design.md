# Map & UX Enhancements — Design

**Date:** 2026-03-02
**Status:** Approved

## Features

### 1. Wait Time Best-Times (DetailPanel)

Add static `bestTimes` data to ~20-25 rides in `mapRides.js`:

```js
bestTimes: { morning: 'low', midday: 'high', evening: 'medium' },
// null for flat rides with consistently short waits
```

Render a compact 3-slot bar in DetailPanel below the existing tip:
- Slots: 🌅 Morning / ☀️ Midday / 🌙 Evening
- Color-coded: green (low), yellow (medium), red (high)
- One-line recommendation text: e.g., "Best at rope drop — waits build quickly after 11am"

Static data only — January crowd patterns are well-documented and stable. No API calls.

### 2. Photo Spots Map Layer

New 5th layer tab "📸 Photos" on the interactive map. Simple markers (not clustered).

New data file `src/data/mapPhotoSpots.js` with ~25-30 spots:

```js
{
  id: 'castle-hub',
  name: 'Cinderella Castle Hub',
  emoji: '📸',
  type: 'photo',
  park: 'Magic Kingdom',
  lat: 28.4195,
  lng: -81.5812,
  description: 'The classic family photo spot...',
  tip: 'Stand at the center of the hub for a symmetrical shot.',
  category: 'landmark', // landmark | hidden-gem
}
```

- Marker styling: Camera emoji with teal/cyan border. Hidden gems get ✨ variant.
- Park sub-filter like other layers.
- DetailPanel reuse: renders description, tip, category badge ("Landmark" / "Hidden Gem").

### 3. First Timer Tips

Add optional `firstTimerTip` field to ~15-20 rides in `mapRides.js`:

```js
firstTimerTip: 'The stretch room is an elevator — don\'t panic!',
// null for rides that don't need special first-timer guidance
```

Two render surfaces:
- **DetailPanel**: Below existing 💡 tip, new block: `🌟 First Timer: ...` with distinct styling.
- **Park page ride cards**: Small "🌟 First Timer" badge on ParkRidesSection cards. Tap to reveal tip text.

### 4. Milestone Countdowns

Surface existing `beforeYouGoInfo.js` deadline dates in two places:

**Hero section** — Compact row of 2-3 milestone chips below main countdown:
```
🍽️ ADR opens in 142d  |  ⚡ LL window in 258d
```
- Only show future deadlines, max 3 chips
- Disappears once all deadlines have passed

**Before You Go section** — Enhance existing deadline badges:
- Replace static "Xd" with live countdown: "142 days" / "23 days" / "5 days!" / "Done ✓"
- Color progression: blue (future) → yellow (soon) → red+pulse (urgent) → grey (past)

**Shared utility**: `src/utils/getDaysUntil.js` — single source of truth for both components.

## Data Changes Summary

| Feature | Data Source | New Files |
|---------|------------|-----------|
| Wait Time Best-Times | `bestTimes` field on mapRides.js | None |
| Photo Spots Layer | New `mapPhotoSpots.js` | 1 data file |
| First Timer Tips | `firstTimerTip` field on mapRides.js | None |
| Milestone Countdowns | Existing beforeYouGoInfo.js | 1 utility file |

## Non-Goals

- No real-time wait time API integration
- No PhotoPass photographer station data
- No per-kid height filtering (separate feature)

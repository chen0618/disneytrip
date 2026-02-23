# Park Pages Design — Magic Kingdom, Hollywood Studios, EPCOT

**Date:** 2026-02-23
**Status:** Approved

## Overview

Add 3 dedicated park guide pages to the Disney trip planning site. Each page is fully unique in structure and content, reflecting the personality of its park. Pages are accessed via buttons in the Hero section and clickable day cards in the Timeline section.

## Architecture

**Approach:** Three separate page files (no shared shell). Each park gets independent section components, data files, and CSS modules.

**Routes:**
- `/park/magic-kingdom` → MagicKingdomPage.jsx
- `/park/hollywood-studios` → HollywoodStudiosPage.jsx
- `/park/epcot` → EpcotPage.jsx

**Navigation:**
- Each park page has its own `ActiveSectionProvider` + `FloatingNav` with park-specific sections
- FloatingNav includes "Back to Home" and "View Full Map" links
- Reuses existing `useScrollReveal` hook for animations

**Main Page Integration:**
- Hero section: 3 park buttons below tagline (MK=coral, HS=purple, EPCOT=yellow)
- Timeline section: Park day cards become clickable links to corresponding pages

**Embedded Mini-Map:**
- Small Leaflet map (~400px tall) per park page
- Zoomed to park boundary, showing ride/food markers
- Clicking a marker scrolls to that item in page content

## Park Theme Colors

| Park | Color Variable | Hex |
|------|---------------|-----|
| Magic Kingdom | --coral | #FF6B6B |
| Hollywood Studios | --purple | #A29BFE |
| EPCOT | --yellow | #FFD700 |

## Magic Kingdom — "The Classic"

Hero: Cinderella Castle background, coral overlay

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Castle bg, coral theme. "The park that started it all." |
| 2 | Lands Explorer | Grid of 6 lands with emoji, vibe, top attractions. Click to scroll to rides. |
| 3 | Rides & Attractions | 14 rides grouped by land. Height badges (Luna/Clara), LL status, tips. Filterable. |
| 4 | Shows & Fireworks | Parades, stage shows, Happily Ever After. Viewing spot tips. |
| 5 | Dining Guide | Quick/table service toggle. Must-try snacks (Dole Whip, turkey leg). |
| 6 | Hidden Magic & Easter Eggs | Utilidors, forced perspective, hidden Mickeys, scavenger hunt style. |
| 7 | Our MK Strategy | Morning/afternoon/evening plan. Rope drop order, LL priorities, fireworks spot. |
| 8 | Park Map | Embedded mini-map of MK with ride/food markers. |
| 9 | Shopping Guide | Shops by land from mapShops.js. Unique-to-MK items. |

## Hollywood Studios — "The Immersive Experience"

Hero: Tower of Terror silhouette, purple overlay

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Tower of Terror bg, purple theme. "Where movies come to life." |
| 2 | Galaxy's Edge Deep Dive | Lightsaber building, Oga's Cantina, Smuggler's Run mechanics, Mando mission, hidden details. |
| 3 | Toy Story Land | Slinky Dog strategy, Alien Saucers, Woody's Lunch Box. Family-focused for Luna & Clara. |
| 4 | Rides & Attractions | 11 rides grouped by area. Height badges, LL status, Muppets coaster highlight. |
| 5 | Thrill Seeker's Guide | Tower of Terror drop sequences, Rock 'n' Roller Coaster tips. For adults during Rider Swap. |
| 6 | Shows & Entertainment | Indiana Jones stunts, Fantasmic!, Disney Junior Live. Fantasmic! dining package. |
| 7 | Dining & Snacks | Ronto Wraps, totchos, 50's Prime Time Café experience. |
| 8 | Our HS Strategy | Rope drop ToT, morning Galaxy's Edge, afternoon Toy Story, evening Fantasmic! |
| 9 | Park Map | Embedded mini-map of HS. |

## EPCOT — "The World Explorer"

Hero: Spaceship Earth, yellow/gold overlay

| # | Section | Content |
|---|---------|---------|
| 1 | Hero | Spaceship Earth bg, yellow theme. "Eat, drink, and ride around the world." |
| 2 | World Showcase Food Tour | 11 countries, must-try food/drink per country. Passport-style layout. Kid-friendly options. |
| 3 | Rides & Attractions | 8 rides. Guardians virtual queue strategy, new Soarin', Test Track design tips. |
| 4 | Festival Guide | Festival of the Arts (January timing!). Food booths, art activities, Broadway concerts. |
| 5 | Country-by-Country Guide | Architecture, character meets (Mulan, Belle), unique shopping, hidden details. Walking tour. |
| 6 | Best for Kids | Frozen, Nemo, Figment, Kidcot Fun Stops, character meets. EPCOT isn't just for adults! |
| 7 | Dining Guide | Table service ranked. Le Cellier, Teppan Edo, Space 220, GEO-82 Lounge. |
| 8 | Our EPCOT Strategy | Rope drop Guardians, morning Future World, afternoon food tour, evening fireworks. |
| 9 | Park Map | Embedded mini-map of EPCOT. |

## Data Files

Each park page will have a dedicated data file:
- `src/data/magicKingdomData.js` — lands, easter eggs, strategy, unique content
- `src/data/hollywoodStudiosData.js` — Galaxy's Edge details, thrill guide, unique content
- `src/data/epcotData.js` — countries/food tour, festival info, kid guide, unique content

Existing data files (mapRides.js, snacks.js, mapShows.js, mapShops.js) will be filtered by park field.

## File Structure

```
disney-site/src/
├── pages/
│   ├── MagicKingdomPage.jsx
│   ├── HollywoodStudiosPage.jsx
│   └── EpcotPage.jsx
├── sections/
│   ├── parks/
│   │   ├── mk/           # MK-specific sections
│   │   ├── hs/           # HS-specific sections
│   │   └── epcot/        # EPCOT-specific sections
│   └── ...existing sections
├── data/
│   ├── magicKingdomData.js
│   ├── hollywoodStudiosData.js
│   └── epcotData.js
└── components/
    └── ParkMiniMap/       # Reusable embedded mini-map component
```

## Responsive Design

- Desktop: Multi-column grids, side-by-side layouts
- Tablet (≤768px): 2-column grids collapse, stacking begins
- Mobile (≤480px): Single column, full-width cards
- Mini-map: Full width at all sizes, height adjusts (400px desktop, 300px mobile)

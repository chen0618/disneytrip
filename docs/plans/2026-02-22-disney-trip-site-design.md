# Disney Family Trip Site — Design Document

## Purpose
A single-page animated scroll website to educate family members about an upcoming Disney World trip in January 2027. The family has never been to Disney parks and needs visual, engaging explanations of logistics, transportation, parks, and scheduling.

## Key Goals
1. Explain Disney Springs is NOT a theme park (high-level highlights only)
2. Showcase Pop Century resort and why it was chosen
3. Visually explain Disney transportation (buses + Skyliner gondola system)
4. Provide interactive trip timeline that demonstrates why a full week is needed vs. 3 days
5. Show what a day at each park looks like (Magic Kingdom, Hollywood Studios, EPCOT)

## Audience
Mix of ages — older parents/in-laws and younger adults. Must be accessible and engaging for all.

## Technical Approach
- **Single HTML file** with CSS + vanilla JavaScript
- No frameworks, no build tools, no npm
- Google Fonts (Nunito/Quicksand for headlines, Inter for body)
- Real images from Wikimedia Commons stored locally in `images/`
- SVG animations for Skyliner route
- Intersection Observer API for scroll-triggered animations
- Fully responsive (mobile + desktop)

## Design System

### Color Palette
- Primary: Bright blue (#1E90FF), Sunny yellow (#FFD700)
- Accents: Coral (#FF6B6B), Mint green (#4ECDC4)
- Background: Warm off-white (#FFF8F0)
- Text: Dark charcoal (#2D3436)

### Typography
- Headlines: Rounded playful font (Nunito/Quicksand), bold, large
- Body: Clean sans-serif (Inter), easy to read

### Animation Style
- Fun & playful: bouncy entrances, subtle hover effects, floating elements
- Scroll-triggered reveals (fade + slide)
- Parallax depth effects
- Interactive toggle for trip comparison

## Page Sections (top to bottom)

### 1. Hero / Welcome
- Large animated title: "Our Disney Adventure — January 2027"
- Playful tagline about celebrating the birthday
- Bright, colorful, sets the tone

### 2. Interactive Trip Timeline
- 5 day cards in a horizontal strip
- Each card: day number, date, icon, label, expandable details
- **Comparison toggle**: "Full Week" vs "3-Day Trip"
  - Full Week: all cards vibrant and populated
  - 3-Day: Days 4-5 vanish, Days 1 & 3 half-grayed (travel), Day 2 sole bright card
  - Callout: "1 park day. That's it." with shake animation
- Icons: airplane, castle, rocket, globe, shopping bag

### 3. Disney Springs
- Clear header: "This is NOT a Theme Park"
- High-level overview: shopping, dining, entertainment district
- 4-6 photo cards of interesting highlights
- Tilting 3D hover effect on cards
- Brief, visual, not text-heavy

### 4. Our Hotel: Pop Century
- Photos of the resort (exterior, rooms, theming)
- Brief overview of why it was chosen (value + Skyliner access)
- Key amenities

### 5. Disney Transportation
- **Bus system**: how it works for resort guests (free, goes to all parks)
- **Skyliner gondola**: animated SVG showing the route
  - Pop Century station → Caribbean Beach hub → EPCOT / Hollywood Studios
  - Gondola icon rides along the cable path
  - Multiple real photos from different angles
- Why Skyliner matters (faster, more fun, avoid bus waits)

### 6. A Day at Magic Kingdom
- Visual day timeline (morning → afternoon → evening)
- Key rides, shows, dining highlights
- Set expectations for first-timers

### 7. A Day at Hollywood Studios
- Same format as Magic Kingdom section

### 8. A Day at EPCOT
- Same format with emphasis on World Showcase

## Navigation
- Floating sticky nav with dots/icons per section
- Click to jump, smooth scroll
- Current section highlighted

## Trip Details
- Dates: January 2027 (exact dates TBD, before collegiate cheer competition and Skyliner maintenance)
- Travel: ACY → MCO
- Hotel: Pop Century Resort
- Day 1: Travel + Disney Springs
- Day 2: Magic Kingdom
- Day 3: Hollywood Studios
- Day 4: EPCOT
- Day 5: Magic Kingdom (second day — family has young kids: 2.5yo and 4.5yo)
- Daughter's birthday: June 16, 2022 (will be ~4.5 at time of trip)

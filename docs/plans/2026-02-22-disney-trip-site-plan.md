# Disney Family Trip Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page animated scroll website that educates family members about an upcoming Disney World trip in January 2027, covering Disney Springs, Pop Century resort, transportation (buses + Skyliner), trip timeline with 3-day vs full-week comparison, and what to expect at each park.

**Architecture:** Single HTML file with embedded CSS and inline JavaScript. No build tools, no frameworks. Scroll-triggered animations via Intersection Observer API. Interactive trip timeline with comparison toggle. SVG-based Skyliner route animation. Real Wikimedia Commons images loaded directly.

**Tech Stack:** HTML5, CSS3 (animations, grid, flexbox), vanilla JavaScript, Google Fonts (Nunito + Inter), Wikimedia Commons images via direct URLs

---

### Task 1: Project Setup and Base HTML Structure

**Files:**
- Create: `index.html`

**Step 1: Create the base HTML file**

Create `index.html` with:
- HTML5 doctype, meta viewport for responsive
- Google Fonts link (Nunito weight 400,700,800 + Inter weight 400,500)
- CSS custom properties for the design system colors:
  - `--blue: #1E90FF`, `--yellow: #FFD700`, `--coral: #FF6B6B`, `--mint: #4ECDC4`
  - `--bg: #FFF8F0`, `--text: #2D3436`, `--text-light: #636e72`
- CSS reset (box-sizing, margin 0, smooth scroll)
- Base typography styles (Nunito for headings, Inter for body)
- Empty `<section>` placeholders for all 8 sections with IDs: hero, timeline, disney-springs, hotel, transportation, magic-kingdom, hollywood-studios, epcot
- Floating nav bar (fixed position, right side) with dot indicators for each section

**Step 2: Add scroll-triggered animation CSS and JS**

CSS classes:
- `.reveal` — elements start with `opacity: 0; transform: translateY(30px)`
- `.reveal.active` — transition to `opacity: 1; transform: translateY(0)` with `transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- `.reveal-left` / `.reveal-right` — same but with translateX(-50px) / translateX(50px)
- `.reveal-scale` — starts at scale(0.8), transitions to scale(1)

JavaScript:
- Intersection Observer watching all `.reveal` elements with threshold 0.15
- When element enters viewport, add `.active` class
- Nav dot highlighting: track which section is in view, update active dot

**Step 3: Verify in browser**

Open index.html in browser. Should see:
- Warm off-white background
- 8 empty sections (visible as spaced areas)
- Floating nav dots on the right side
- Clicking a dot smooth-scrolls to that section

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: base HTML structure with scroll animations and nav"
```

---

### Task 2: Hero Section

**Files:**
- Modify: `index.html`

**Step 1: Build the hero section**

Inside `#hero`:
- Full-viewport height section (`min-height: 100vh`) with centered content
- Background: gradient from `--blue` to a lighter blue, or the Cinderella Castle image with overlay
- Floating sparkle/star elements (CSS-only, using `@keyframes float` with random positions)
- Large title: "Our Disney Adventure" in Nunito 800, white
- Subtitle: "January 2027" in `--yellow`
- Tagline: "Celebrating [daughter's name]'s Birthday!" (or generic "A Magical Family Trip")
- Animated down-arrow indicator at bottom (bouncing CSS animation) to encourage scrolling
- Hero image: Cinderella Castle background
  - URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Walt_Disney_World_Cinderella_Castle_in_2021.jpg/1920px-Walt_Disney_World_Cinderella_Castle_in_2021.jpg`

CSS for floating stars:
```css
.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--yellow);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
}
```

**Step 2: Verify in browser**

- Castle background visible with overlay
- Title and subtitle centered and readable
- Sparkle elements floating
- Down arrow bouncing

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: hero section with castle background and sparkle animations"
```

---

### Task 3: Interactive Trip Timeline

**Files:**
- Modify: `index.html`

**Step 1: Build the timeline section**

Section header: "Our Trip at a Glance" with a subtitle about the schedule.

Toggle buttons at top:
- "Full Week ✨" (active by default, styled with `--blue` background)
- "But What About 3 Days? 🤔" (inactive, outlined style)

5 day cards in a horizontal flexbox (wrapping on mobile):

| Day | Icon | Title | Subtitle | Color | Details (expanded) |
|-----|------|-------|----------|-------|--------------------|
| 1 | ✈️ | Travel Day | ACY → MCO | --blue | Fly in, drop bags at Pop Century, head to Disney Springs |
| 2 | 🏰 | Magic Kingdom | The Classic | --coral | Cinderella Castle, rides, fireworks, the full Disney experience |
| 3 | 🚀 | Hollywood Studios | Movies & Stars | --mint | Star Wars Galaxy's Edge, Toy Story Land, Tower of Terror |
| 4 | 🌍 | EPCOT | World Showcase | --yellow | Travel the world, ride Guardians, eat around the globe |
| 5 | 🏰 | Magic Kingdom 2 | With the Kids | --coral | Second day for a relaxed pace with our little ones |

Each card:
- Click/tap to expand details (CSS transition on max-height)
- Icon is large (3rem emoji or SVG)
- Day number badge in top-left corner
- Subtle box-shadow, rounded corners (16px)
- On hover: slight lift (translateY(-4px)) and shadow increase

**Step 2: Build the 3-day comparison toggle**

When "3 Days" is clicked:
- JavaScript adds class `.three-day-mode` to the timeline container
- Cards 4 and 5 animate out: `transform: scale(0.8); opacity: 0; max-height: 0` with transition
- Cards 1 and 3 get class `.travel-only`: desaturated with diagonal stripe overlay and "TRAVEL DAY" badge
- Card 2 stays vibrant but gets a pulsing border
- Below the cards, a callout div animates in:
  - Red background with white text
  - "1 park day. That's it. 😬" in large bold text
  - CSS `@keyframes shake` animation on appear
  - Below: "After flights, airport time, bus to hotel, and settling in... you'd have ONE day to experience Disney."

Toggle back to "Full Week" reverses all animations.

**Step 3: Verify in browser**

- 5 cards visible, clickable to expand
- Toggle between Full Week and 3 Days works
- 3-Day mode: cards 4-5 disappear, 1 & 3 grayed, callout shakes in
- Responsive: cards stack vertically on mobile

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: interactive trip timeline with 3-day comparison toggle"
```

---

### Task 4: Disney Springs Section

**Files:**
- Modify: `index.html`

**Step 1: Build Disney Springs section**

Section header with reveal animation:
- Large text: "Disney Springs"
- Subheader with emphasis: "This is NOT a Theme Park — It's Better (and it's FREE!)"
- Brief paragraph: "Disney Springs is Walt Disney World's open-air shopping, dining, and entertainment district. No park ticket needed — just walk in and enjoy over 150 shops, restaurants, and experiences."

Photo card grid (CSS Grid, 2-3 columns on desktop, 1 on mobile):

6 highlight cards, each with:
- Background image (from Wikimedia or CSS gradient placeholder)
- Title overlay at bottom
- 1-sentence description on hover/tap
- 3D tilt effect on hover (CSS perspective + rotateX/rotateY)

Cards:
1. **World of Disney** — "The world's largest Disney store. Souvenirs for EVERYONE."
2. **The BOATHOUSE** — "Waterfront dining + ride in vintage Amphicars that drive into the lake!"
3. **Splitsville Lanes** — "Two floors of bowling, billiards, and great food. Fun for all ages."
4. **LEGO Store** — "Giant LEGO sculptures, Pick-a-Brick wall, and outdoor play areas for kids."
5. **Dining & Snacks** — "From fancy restaurants to quick bites — something for every taste."
6. **Live Entertainment** — "Street performers, live music, and seasonal events throughout the district."

Images:
- Disney Springs aerial: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Disney_Springs_Ariel_View.jpg/960px-Disney_Springs_Ariel_View.jpg`
- Disney Springs ground: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Disney_Springs_%2823169700192%29.jpg/960px-Disney_Springs_%2823169700192%29.jpg`

CSS 3D tilt effect:
```css
.springs-card {
  perspective: 1000px;
  transition: transform 0.3s ease;
}
.springs-card:hover {
  transform: rotateX(2deg) rotateY(-3deg) translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

**Step 2: Verify in browser**

- Cards display in grid
- Hover tilt effect works
- "NOT a Theme Park" message is prominent
- Text is minimal and visual-focused

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: Disney Springs section with highlight cards and 3D hover effects"
```

---

### Task 5: Pop Century Hotel Section

**Files:**
- Modify: `index.html`

**Step 1: Build hotel section**

Section header: "Our Hotel: Pop Century Resort"
Subheader: "A Value Resort with a Secret Superpower 🚡"

Layout: Split content — image gallery on one side, info on the other (flex row, stacking on mobile).

Image gallery (auto-cycling with CSS animation or manual dots):
- Pop Century entrance: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Disney%27s-Pop-Century-Resort-Entrance.jpg/960px-Disney%27s-Pop-Century-Resort-Entrance.jpg`
- Hourglass Lake view: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg/960px-Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg`

Info panel with icon-paired highlights:
- 🏨 **Value Resort** — Disney's most affordable tier, but recently renovated rooms
- 🎨 **Decade Theming** — Giant icons from the 50s through 90s (huge Rubik's Cubes, bowling pins, yo-yos)
- 🚡 **Skyliner Access** — Direct gondola to EPCOT & Hollywood Studios (the "secret superpower")
- 🏊 **Hippy Dippy Pool** — Flower-power themed main pool
- 🍽️ **Everything POP** — Large food court with tons of options

Each highlight animates in sequentially with staggered delays (0.1s increments).

**Step 2: Verify in browser**

- Images display correctly
- Info highlights stagger-animate on scroll
- Responsive layout stacks on mobile

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: Pop Century hotel section with image gallery and amenity highlights"
```

---

### Task 6: Transportation Section with Animated Skyliner

**Files:**
- Modify: `index.html`

**Step 1: Build transportation overview**

Section header: "Getting Around: Disney Transportation"
Subheader: "Everything is FREE for Resort Guests! 🎉"

Two sub-sections:

**A) Bus System (brief)**
- Simple icon + text card
- 🚌 "Complimentary buses run from Pop Century to ALL parks and Disney Springs"
- "Buses come every ~20 minutes. Track them in the My Disney Experience app."
- "Plan 30-45 min for bus transport during busy times (park open/close)"

**B) The Skyliner — Our Secret Weapon (detailed, with SVG animation)**

Animated Skyliner route map:
- SVG illustration showing the route with labeled stations
- Stations as circles: Pop Century/Art of Animation → Caribbean Beach (hub) → branches to EPCOT and Hollywood Studios
- Cable lines connecting stations
- Animated gondola icon that travels along the path using CSS `offset-path` or SVG `animateMotion`
- The gondola loops continuously: Pop Century → Caribbean Beach → EPCOT → back

Below the animation, a photo gallery of Skyliner images (horizontal scroll):
- Gondola cabin close-up: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Disney_Skyliner%2C_gondola_cabin.jpg/960px-Disney_Skyliner%2C_gondola_cabin.jpg`
- Caribbean Beach station: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Disney_Skyliner_Caribbean_Beach_Station.jpg/960px-Disney_Skyliner_Caribbean_Beach_Station.jpg`
- Skyliner at first light: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Disney_Skyliner_at_first_light_%2853140462489%29.jpg/960px-Disney_Skyliner_at_first_light_%2853140462489%29.jpg`
- Skyliner overview: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Disney_Skyliner%2C_October_2019.jpg/960px-Disney_Skyliner%2C_October_2019.jpg`

Key info callout boxes:
- "🕐 ~15-20 min to EPCOT or Hollywood Studios (including transfer)"
- "👥 Each gondola holds up to 10 guests"
- "⚠️ Transfer at Caribbean Beach hub — well-signed, quick walk"
- "🌧️ Closes during thunderstorms — buses are the backup"

**Step 2: Build SVG animation**

The SVG should be approximately:
```
[Pop Century] ----cable---- [Caribbean Beach] ----cable---- [EPCOT]
                                    |
                                    |----cable---- [Hollywood Studios]
```

Gondola icon (simple cable car shape) animates along the path.
Use `<animateMotion>` with `path` attribute matching the cable route, or CSS `offset-path`.

**Step 3: Verify in browser**

- Bus info card is clear and brief
- SVG Skyliner animation plays smoothly
- Gondola moves along cable route
- Photo gallery scrolls horizontally
- Info callouts are prominent

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: transportation section with animated Skyliner route map"
```

---

### Task 7: Magic Kingdom Section

**Files:**
- Modify: `index.html`

**Step 1: Build Magic Kingdom section**

Section header: "Day 2 & 5: Magic Kingdom 🏰"
Subheader: "The Most Magical Place on Earth"

Brief intro paragraph: "This is THE Disney park — Cinderella Castle, Main Street U.S.A., classic rides, character meet-and-greets, and fireworks. It's where the magic happens, and it's why we're going back twice."

Visual day timeline — a horizontal scrolling strip showing:
- **Morning** (sunrise icon, light yellow bg): "Arrive early (rope drop!), hit the big rides first"
  - Pirates of the Caribbean, Space Mountain, Jungle Cruise
- **Afternoon** (sun icon, warm bg): "Explore the lands, meet characters, grab lunch"
  - It's a Small World, Buzz Lightyear, Haunted Mansion
- **Evening** (moon icon, dark purple bg): "Slow down, dinner, FIREWORKS!"
  - Be Our Guest dinner, Main Street for fireworks viewing

Attraction highlight cards (grid, 3 columns desktop):
Each card has an image, name, and one-line description.

1. Pirates of the Caribbean — "Classic boat ride through pirate scenes. All ages!"
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pirates_of_the_Caribbean_Magic_Kingdom.JPG/960px-Pirates_of_the_Caribbean_Magic_Kingdom.JPG`
2. Space Mountain — "Indoor roller coaster in the dark. A must-do!"
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Space_Mountain_%28Magic_Kingdom%29_3.jpg/960px-Space_Mountain_%28Magic_Kingdom%29_3.jpg`
3. It's a Small World — "The classic gentle boat ride. Perfect for little ones."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/It%27s_A_Small_World_%28Magic_Kingdom%29_1998_1.jpg/960px-It%27s_A_Small_World_%28Magic_Kingdom%29_1998_1.jpg`
4. Haunted Mansion — "Spooky but fun. Mildly scary for younger kids."
5. Jungle Cruise — "Boat ride with animatronics and corny skipper jokes."
6. Buzz Lightyear's Space Ranger Spin — "Shoot targets with laser blasters. Fun for all!"

Special callout for families with young kids:
"👶 With a 2.5 and 4.5 year old: Many rides here are perfect for little ones! Rider Switch is available for bigger rides — one parent rides while the other waits with kids, then you swap without waiting in line again."

**Step 2: Verify in browser**

- Day timeline scrolls horizontally
- Attraction cards display with images
- Kid-friendly callout is prominent
- All reveal animations trigger on scroll

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: Magic Kingdom section with day timeline and attraction cards"
```

---

### Task 8: Hollywood Studios Section

**Files:**
- Modify: `index.html`

**Step 1: Build Hollywood Studios section**

Section header: "Day 3: Hollywood Studios 🚀"
Subheader: "Movies, Star Wars & Toy Story Come to Life"

Brief intro: "Hollywood Studios has been completely transformed by two massive new lands: Star Wars: Galaxy's Edge and Toy Story Land. It's an immersive movie experience unlike anything else."

Same day timeline format:
- **Morning**: Galaxy's Edge — Rise of the Resistance, Millennium Falcon
- **Afternoon**: Toy Story Land — Slinky Dog Dash, Toy Story Mania
- **Evening**: Tower of Terror, Mickey's Runaway Railway, dinner

Attraction highlight cards:

1. Rise of the Resistance — "The most impressive ride Disney has EVER built."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Star_Wars%2C_Galaxy%27s_Edge%2C_Walt_Disney_World.jpg/960px-Star_Wars%2C_Galaxy%27s_Edge%2C_Walt_Disney_World.jpg`
2. Slinky Dog Dash — "Family coaster in Toy Story Land. Great for kids!"
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg/960px-Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg`
3. Tower of Terror — "Drop tower in a haunted hotel. THRILLING."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Hollywood_Tower_Hotel.jpg/960px-Hollywood_Tower_Hotel.jpg`
4. Toy Story Mania — "3D shooting gallery. Fun for absolutely everyone."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Toy_Story_Land_sign_WDW.jpg/960px-Toy_Story_Land_sign_WDW.jpg`
5. Mickey & Minnie's Runaway Railway — "Trackless ride inside a cartoon. No height requirement!"
6. Millennium Falcon: Smugglers Run — "YOU pilot the Falcon. Yes, really."

Land spotlight boxes:
- **Galaxy's Edge**: "You literally step onto another planet. Cast Members stay in character, even the Coca-Cola comes in Star Wars containers."
- **Toy Story Land**: "You've been shrunk to toy size in Andy's backyard. Bright, colorful, and kids LOVE it."

**Step 2: Verify in browser**

- Section follows same visual pattern as Magic Kingdom
- Images load correctly
- Land spotlight boxes stand out

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: Hollywood Studios section with Galaxy's Edge and Toy Story Land"
```

---

### Task 9: EPCOT Section

**Files:**
- Modify: `index.html`

**Step 1: Build EPCOT section**

Section header: "Day 4: EPCOT 🌍"
Subheader: "Innovation, Adventure & Eating Around the World"

Brief intro: "EPCOT is a park of two halves: the front has world-class rides and technology, and the back — World Showcase — takes you around the world through 11 country pavilions with authentic food, architecture, and culture."

Day timeline:
- **Morning**: Guardians of the Galaxy: Cosmic Rewind, Test Track, Frozen Ever After
- **Afternoon**: "Eat & Drink Around the World" — stroll World Showcase
- **Evening**: Spaceship Earth, Remy's Ratatouille, evening spectacular on the lagoon

Attraction highlight cards:

1. Spaceship Earth — "Ride inside the iconic golf ball through the history of communication."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Spaceship_Earth_2.jpg/960px-Spaceship_Earth_2.jpg`
2. Guardians of the Galaxy: Cosmic Rewind — "Reverse-launch coaster with a killer soundtrack."
3. Test Track — "Design a car and then test it at high speed!"
4. Frozen Ever After — "Boat ride through Arendelle. Kids will be obsessed."
5. Remy's Ratatouille Adventure — "Shrunk to rat size in a French kitchen. All ages!"
6. World Showcase — "11 countries, authentic food, real cultural representatives."
   - Image: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Epcot_World_Showcase_04.jpg/960px-Epcot_World_Showcase_04.jpg`

Special World Showcase callout:
"🌎 **Eating Around the World** is an EPCOT tradition — sample food and drinks from each of the 11 countries as you walk the 1.2-mile loop: Mexico, Norway, China, Germany, Italy, USA, Japan, Morocco, France, United Kingdom, Canada. It's especially fun for adults, but kids enjoy the Kidcot Fun Stops at each pavilion!"

Second image: Spaceship Earth at night:
`https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Spaceship_Earth_at_night.jpg/960px-Spaceship_Earth_at_night.jpg`

**Step 2: Verify in browser**

- EPCOT section complete with all attractions
- World Showcase callout is visually distinct
- Images load

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: EPCOT section with World Showcase and attraction cards"
```

---

### Task 10: Polish, Responsive Design & Final Touches

**Files:**
- Modify: `index.html`

**Step 1: Add responsive breakpoints**

Media queries:
- `@media (max-width: 768px)`: Stack card grids to 1 column, reduce font sizes, simplify timeline to vertical, nav dots smaller
- `@media (max-width: 480px)`: Further reduce padding, hero title smaller, timeline cards full-width

**Step 2: Add section dividers**

Between each section, add a wavy SVG divider or a subtle gradient transition to create visual flow between sections.

**Step 3: Add loading polish**

- CSS loading animation (simple spinner) that fades out when page is ready
- Images use `loading="lazy"` attribute
- Add `alt` text to all images for accessibility

**Step 4: Add footer**

Simple footer: "Made with ❤️ for our family's magical adventure"
Small text: "Images courtesy of Wikimedia Commons contributors. All Disney parks, resorts, and attractions are property of The Walt Disney Company."

**Step 5: Cross-browser test**

Open in browser, test:
- All sections animate on scroll
- Timeline toggle works
- All images load
- Mobile layout works (use browser dev tools responsive mode)
- Nav dots work
- Skyliner animation plays

**Step 6: Commit**

```bash
git add index.html
git commit -m "feat: responsive design, section dividers, polish, and footer"
```

---

## Image Reference

All images are from Wikimedia Commons (freely licensed):

### Cinderella Castle / Magic Kingdom
- `https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Walt_Disney_World_Cinderella_Castle_in_2021.jpg/1920px-Walt_Disney_World_Cinderella_Castle_in_2021.jpg`

### Pop Century Resort
- Entrance: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Disney%27s-Pop-Century-Resort-Entrance.jpg/960px-Disney%27s-Pop-Century-Resort-Entrance.jpg`
- Lake view: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg/960px-Orlando_-_Disney_World_-_Disney%27s_Pop_Century_Resort_-_Art_of_Animation_Resort_Across_Hourglass_Lake_%2817031500338%29.jpg`

### Disney Skyliner
- Cabin: `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Disney_Skyliner%2C_gondola_cabin.jpg/960px-Disney_Skyliner%2C_gondola_cabin.jpg`
- Caribbean Beach Station: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Disney_Skyliner_Caribbean_Beach_Station.jpg/960px-Disney_Skyliner_Caribbean_Beach_Station.jpg`
- At first light: `https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Disney_Skyliner_at_first_light_%2853140462489%29.jpg/960px-Disney_Skyliner_at_first_light_%2853140462489%29.jpg`
- Overview: `https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Disney_Skyliner%2C_October_2019.jpg/960px-Disney_Skyliner%2C_October_2019.jpg`

### Disney Springs
- Aerial: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Disney_Springs_Ariel_View.jpg/960px-Disney_Springs_Ariel_View.jpg`
- Ground: `https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Disney_Springs_%2823169700192%29.jpg/960px-Disney_Springs_%2823169700192%29.jpg`

### Park Attractions
- Pirates of the Caribbean: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pirates_of_the_Caribbean_Magic_Kingdom.JPG/960px-Pirates_of_the_Caribbean_Magic_Kingdom.JPG`
- Space Mountain: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Space_Mountain_%28Magic_Kingdom%29_3.jpg/960px-Space_Mountain_%28Magic_Kingdom%29_3.jpg`
- It's a Small World: `https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/It%27s_A_Small_World_%28Magic_Kingdom%29_1998_1.jpg/960px-It%27s_A_Small_World_%28Magic_Kingdom%29_1998_1.jpg`
- Galaxy's Edge: `https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Star_Wars%2C_Galaxy%27s_Edge%2C_Walt_Disney_World.jpg/960px-Star_Wars%2C_Galaxy%27s_Edge%2C_Walt_Disney_World.jpg`
- Slinky Dog Dash: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg/960px-Slinky_Dog_Dash_%2829262611338%29_%28cropped%29.jpg`
- Tower of Terror: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Hollywood_Tower_Hotel.jpg/960px-Hollywood_Tower_Hotel.jpg`
- Toy Story Land: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Toy_Story_Land_sign_WDW.jpg/960px-Toy_Story_Land_sign_WDW.jpg`
- Spaceship Earth: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Spaceship_Earth_2.jpg/960px-Spaceship_Earth_2.jpg`
- Spaceship Earth at night: `https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Spaceship_Earth_at_night.jpg/960px-Spaceship_Earth_at_night.jpg`
- World Showcase: `https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Epcot_World_Showcase_04.jpg/960px-Epcot_World_Showcase_04.jpg`

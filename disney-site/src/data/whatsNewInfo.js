// What's New for our January 2027 trip
// Changes between Jan 2026 and Jan 2027 that affect our visit

export const newExperiences = [
  // --- Magic Kingdom ---
  {
    park: 'Magic Kingdom',
    parkEmoji: '🏰',
    items: [
      {
        name: 'Big Thunder Mountain Railroad',
        emoji: '⛰️',
        badge: 'Upgraded',
        description: 'Reopened spring 2026 with a brand-new underground Rainbow Caverns scene featuring glowing pools and shimmering rockwork, plus a completely rebuilt track.',
      },
      {
        name: "Buzz Lightyear's Space Ranger Spin",
        emoji: '🔫',
        badge: 'Upgraded',
        description: 'Reopened spring 2026 with handheld blasters you can actually aim (no more fixed guns!), redesigned ride vehicles, a new show scene, and overhauled gameplay.',
      },
      {
        name: 'The Beak and Barrel',
        emoji: '🏴‍☠️',
        badge: 'New',
        description: "A pirate-themed tavern right next to Pirates of the Caribbean — Magic Kingdom's first bar! Themed rooms, sing-alongs, and a 45-minute reservation experience. Family-friendly with mocktails for kids.",
      },
      {
        name: 'Country Bear Musical Jamboree',
        emoji: '🐻',
        badge: 'Reimagined',
        description: 'The beloved Country Bear show was completely reimagined in 2024! The same classic animatronic bears now perform Disney song covers instead of the original country tunes. A fun, refreshed experience!',
      },
      {
        name: 'Cinderella Castle — Fresh Paint',
        emoji: '🏰',
        badge: 'Upgraded',
        description: 'The castle began a full repaint in January 2026 with a refreshed "Classic" color scheme. By our trip it will look brand new — perfect for photos!',
      },
    ],
  },
  // --- Hollywood Studios ---
  {
    park: 'Hollywood Studios',
    parkEmoji: '🎬',
    items: [
      {
        name: "Rock 'n' Roller Coaster Starring The Muppets",
        emoji: '🐸',
        badge: 'Reimagined',
        description: "The Aerosmith version closed March 2026. It's now themed to The Electric Mayhem — Animal on drums, Dr. Teeth on keys — racing through Hollywood to make their biggest concert. Features a new Scooter audio-animatronic!",
      },
      {
        name: 'Smugglers Run: Mando & Grogu Mission',
        emoji: '🚀',
        badge: 'New Mission',
        description: "Launched May 2026. Fly the Falcon with Din Djarin and Grogu tracking ex-Imperial officers. For the first time, the crew picks their destination — Bespin, Endor's Death Star wreckage, or Coruscant. Engineers can communicate with Grogu!",
      },
      {
        name: 'The Magic of Disney Animation',
        emoji: '🎨',
        badge: 'New',
        description: 'Opened summer 2026 in the reimagined Walt Disney Studios area. Drawing classes, a short film experience, character meets in themed animation departments, and an indoor playground for little ones.',
      },
    ],
  },
  // --- EPCOT ---
  {
    park: 'EPCOT',
    parkEmoji: '🌍',
    items: [
      {
        name: "Soarin' Across America",
        emoji: '🦅',
        badge: 'New Film',
        description: "A limited-time film debuting Memorial Day 2026, celebrating America's 250th birthday — fly over stunning landscapes and iconic cityscapes from 13+ American locations. Replaces Soarin' Around the World (which may return).",
      },
      {
        name: 'GEO-82 Lounge',
        emoji: '🍸',
        badge: 'New',
        description: 'An adults-only cocktail lounge inside Spaceship Earth (opened June 2025). Retro-futuristic vibes, craft cocktails, small plates, and gorgeous views of World Celebration. Named for the year Spaceship Earth opened — 1982.',
      },
    ],
  },
  // --- Disney Springs ---
  {
    park: 'Disney Springs',
    parkEmoji: '🛍️',
    items: [
      {
        name: 'LEVEL99',
        emoji: '🎮',
        badge: 'New',
        description: 'A two-story interactive gaming venue on the West Side. Craft cocktails, local brews, and their famous Detroit-style pizza. Think escape rooms meets bar games meets immersive challenges.',
      },
      {
        name: 'Six Ravens',
        emoji: '🥐',
        badge: 'New',
        description: "From the creators of Gideon's Bakehouse — a grab-and-go spot specializing in \"Coffyns,\" fluffy yeast-based rolls filled with sweet and savory options. Think gourmet hand pies.",
      },
    ],
  },
];

export const headsUpAlerts = [
  {
    emoji: '🚡',
    title: 'Skyliner Annual Maintenance (late January)',
    description: 'Annual maintenance typically late January (Jan 25-31 in 2026). We leave Jan 23 — we\'re safe! Watch for 2027 dates closer to the trip.',
    severity: 'info', // 'info' or 'warning'
  },
  {
    emoji: '🏗️',
    title: 'Monstropolis Under Construction',
    description: 'Muppet*Vision 3D permanently closed June 2025. The area at Hollywood Studios is being transformed into a Monsters, Inc. land (Monstropolis). Expect construction walls near Grand Avenue. Won\'t be open for our trip.',
    severity: 'info',
  },
  {
    emoji: '😈',
    title: 'Villains Land — Under Construction',
    description: "Disney is building a Villains-themed land in Magic Kingdom with rumored Emperor's New Groove coaster, Maleficent dark ride, and Hades dinner show. Plans were recently expanded to be \"bigger and bolder.\" Won't be open for our trip, but expect construction walls in the park.",
    severity: 'info',
  },
  {
    emoji: '🎠',
    title: 'Carousel of Progress — Maybe Closed',
    description: 'Disney hasn\'t confirmed dates, but Carousel of Progress may close for a reimagining in late 2026 or early 2027. It\'s getting a new Walt Disney audio-animatronic intro scene. Check before we go!',
    severity: 'warning',
  },
  {
    emoji: '🚂',
    title: 'WDW Railroad — Partial Service',
    description: 'Frontierland station is closed. The train runs as a shuttle between Main Street and Fantasyland stations only.',
    severity: 'info',
  },
];

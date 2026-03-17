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
        description: 'Reopening early May 2026 with all-new trains, refreshed audio-animatronics throughout, and a brand-new Rainbow Caverns underground scene featuring glowing pools, shimmering stalagmites, and dramatic lightning effects. Plus a completely rebuilt track.',
      },
      {
        name: "Buzz Lightyear's Space Ranger Spin",
        emoji: '🔫',
        badge: 'Upgraded',
        description: 'Reopened April 8, 2026 with handheld blasters you can actually aim (with always-on laser sights!), redesigned ride vehicles with scoring monitors, reactive light-up targets, and a new opening scene starring "Buddy" the support-bot.',
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
        description: "The Aerosmith version permanently closed March 1, 2026. Reopening Summer 2026 as a Muppets retheme — The Electric Mayhem racing through Hollywood to make their biggest concert. Features a new Scooter audio-animatronic! Should be open for our trip.",
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
        description: "A limited-time film opening May 26, 2026, celebrating America's 250th birthday — fly over stunning landscapes and iconic cityscapes from 13+ American locations including the Grand Canyon. Soarin' Around the World closed May 13 for this overlay. Expected to run at least through early 2027.",
      },
      {
        name: 'Frozen Ever After — New Animatronics',
        emoji: '❄️',
        badge: 'Upgraded',
        description: 'Reopened February 2026 after a month-long closure with brand-new animatronics of Anna, Elsa, and Kristoff replacing the original projection-mapped figures. The upgraded characters match the quality of newer versions at Hong Kong Disneyland.',
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
    title: 'Skyliner Maintenance Starts Day After We Leave!',
    description: 'Disney confirmed the 2027 Skyliner closure: January 24–30, 2027. We check out January 23 — we\'re safe by exactly one day! Skyliner runs normally for our entire trip.',
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
    title: 'Villains Land & Piston Peak — Under Construction',
    description: "Disney is building two new lands in Magic Kingdom: a Villains-themed land (rumored Emperor's New Groove coaster, Maleficent dark ride, Hades dinner show) and Piston Peak National Park (Cars-themed). Infrastructure work runs March 2026–Dec 2027. Won't be open for our trip, but expect construction walls near Frontierland.",
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

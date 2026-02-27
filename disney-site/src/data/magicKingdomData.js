// Magic Kingdom park page data

export const lands = [
  { id: 'main-street', name: 'Main Street, U.S.A.', emoji: '🏘️', color: '#E17055', vibe: 'Nostalgic small-town charm', topAttractions: ['The Emporium', 'Town Square Theater Character Meets', 'Horse-drawn streetcar'] },
  { id: 'adventureland', name: 'Adventureland', emoji: '🌴', color: '#00B894', vibe: 'Tropical exploration & pirates', topAttractions: ['Pirates of the Caribbean', 'Jungle Cruise', 'Magic Carpets of Aladdin'] },
  { id: 'frontierland', name: 'Frontierland', emoji: '🤠', color: '#D35400', vibe: 'Wild West & thrilling coasters', topAttractions: ['Big Thunder Mountain Railroad', "Tiana's Bayou Adventure"] },
  { id: 'liberty-square', name: 'Liberty Square', emoji: '🔔', color: '#2C3E50', vibe: 'Colonial charm & the haunted', topAttractions: ['Haunted Mansion', 'The Hall of Presidents'] },
  { id: 'fantasyland', name: 'Fantasyland', emoji: '🏰', color: '#E84393', vibe: 'Classic Disney fairytales', topAttractions: ['Seven Dwarfs Mine Train', "Peter Pan's Flight", "It's a Small World", 'Dumbo'] },
  { id: 'tomorrowland', name: 'Tomorrowland', emoji: '🚀', color: '#0984E3', vibe: 'Space-age thrills & laser battles', topAttractions: ['TRON Lightcycle / Run', 'Tomorrowland Transit Authority PeopleMover', "Buzz Lightyear's Space Ranger Spin"] },
];

export const easterEggs = [
  { title: 'The Utilidors', emoji: '🚇', description: "There's an entire city beneath Magic Kingdom. The 'Utilidors' (utility corridors) are a 9-acre network of tunnels where cast members travel unseen, trash is whisked away by vacuum tubes, and characters from one land never accidentally wander into another." },
  { title: 'Cinderella Castle Suite', emoji: '🏰', description: "There's a secret hotel suite INSIDE Cinderella Castle, but you can't book it. It was originally planned as Walt Disney's family apartment, but after Walt's death in 1966 the space was never completed. It sat as offices and storage until 2007, when it was transformed into a luxury suite for contest winners." },
  { title: 'Forced Perspective', emoji: '👁️', description: "Main Street buildings use 'forced perspective' — the second stories are built at 5/8 scale and the third at 1/2 scale, making buildings look taller than they are. Cinderella Castle uses the same trick to appear 189 feet tall." },
  { title: 'Hidden Mickeys', emoji: '🐭', description: "There are hundreds of 'Hidden Mickeys' throughout the park — three circles arranged to form Mickey's head, embedded in architecture, ride designs, and landscaping. Finding them is a beloved scavenger hunt!" },
  { title: 'Liberty Bell Crack', emoji: '🔔', description: "The Liberty Bell in Liberty Square is a replica with the same famous crack. It was cast in France and donated to Disney in 1989 — one of many replicas across the country." },
  { title: 'Real Skulls on Pirates', emoji: '💀', description: "When the original Pirates of the Caribbean opened at Disneyland in 1967, the Imagineers used real human skulls from UCLA because the props looked too fake. Most have since been replaced, though rumor says a few still remain at Disneyland. The WDW version (opened 1973) used improved props from the start." },
];

export const mkTips = [
  {
    emoji: '\u{1F305}',
    timeLabel: 'Before Park Open',
    title: 'How Early Entry Actually Works',
    details: [
      'Park opens at 9 AM, but Early Entry for resort guests starts at 8:30 AM.',
      'Disney lets guests onto Main Street as early as 7:45 AM \u2014 browse shops and grab coffee while you wait.',
      'At the hub past the Walt & Mickey statue, Cast Members check that you\'re staying on Disney property before letting you continue into the lands.',
      'Rides typically start loading around 8:30, so arriving by 7:45 gives you ~45 minutes of line position before the first ride cycle.',
      'First resort buses start running around 7:30 AM. Minnie Vans are another option for a direct, private ride to the park.',
    ],
  },
  {
    emoji: '\u{1F3A2}',
    timeLabel: 'First Hour',
    title: 'Make Your First Ride Count',
    details: [
      'Seven Dwarfs Mine Train and Peter Pan\'s Flight have the longest waits all day \u2014 one of these should be your Early Entry target.',
      'After your first ride, you can often chain 2\u20133 more in Fantasyland before standby lines build up.',
      'TRON Lightcycle / Run is a Lightning Lane Single Pass ride \u2014 book it for later and skip the morning rush.',
    ],
  },
  {
    emoji: '\u2600\uFE0F',
    timeLabel: 'Midday',
    title: 'Beat the Heat & Crowds',
    details: [
      'Lines peak between 11 AM \u2013 3 PM. Great window for indoor rides: PhilharMagic, Laugh Floor, Carousel of Progress, Haunted Mansion.',
      'Mobile order lunch 30 minutes ahead \u2014 Cosmic Ray\'s and Pecos Bill\'s have the most options.',
      'A pool break at Pop Century is a 15-minute bus ride away. Recharge and come back for the evening.',
    ],
  },
  {
    emoji: '\u{1F386}',
    timeLabel: 'Evening',
    title: 'The Park Gets Better at Night',
    details: [
      'After fireworks, wait times drop dramatically \u2014 ride Pirates, Jungle Cruise, Space Mountain, and Big Thunder with minimal waits.',
      'Festival of Fantasy parade runs in the afternoon \u2014 Frontierland has the best viewing with the least congestion.',
      'Main Street shops stay open 30 minutes after park close. No rush to leave.',
    ],
  },
];

export const fireworksGuide = {
  name: 'Happily Ever After',
  time: '~9:00 PM (varies by season)',
  duration: '18 minutes',
  bestSpots: [
    { spot: 'Main Street, U.S.A.', tip: 'Classic head-on view. Arrive 30-45 min early for a good spot.' },
    { spot: 'Tomorrowland Bridge', tip: 'Less crowded, great side angle with castle projections visible.' },
    { spot: 'Frontierland (near river)', tip: 'Almost no crowd, fireworks still spectacular but miss some projections.' },
  ],
  tips: 'The show includes castle projections, fireworks, and lasers. A must-see — many people say it makes them cry!',
};

export const mkNavSections = [
  { id: 'mk-hero', label: 'Magic Kingdom' },
  { id: 'mk-lands', label: 'Explore the Lands' },
  { id: 'mk-rides', label: 'Rides & Attractions' },
  { id: 'mk-shows', label: 'Shows & Entertainment' },
  { id: 'mk-hidden', label: 'Hidden Magic' },
  { id: 'mk-strategy', label: 'Our MK Strategy' },
  { id: 'mk-map', label: 'Park Map' },
  { id: 'mk-dining', label: 'Dining Guide' },
  { id: 'mk-shopping', label: 'Shopping' },
];

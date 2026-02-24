// Magic Kingdom park page data

export const lands = [
  { id: 'main-street', name: 'Main Street, U.S.A.', emoji: '🏘️', color: '#E17055', vibe: 'Nostalgic small-town charm', topAttractions: ['The Emporium', 'Town Square Theater Character Meets', 'Horse-drawn streetcar'] },
  { id: 'adventureland', name: 'Adventureland', emoji: '🌴', color: '#00B894', vibe: 'Tropical exploration & pirates', topAttractions: ['Pirates of the Caribbean', 'Jungle Cruise', 'Magic Carpets of Aladdin'] },
  { id: 'frontierland', name: 'Frontierland', emoji: '🤠', color: '#D35400', vibe: 'Wild West & thrilling coasters', topAttractions: ['Big Thunder Mountain Railroad', "Tiana's Bayou Adventure"] },
  { id: 'liberty-square', name: 'Liberty Square', emoji: '🔔', color: '#2C3E50', vibe: 'Colonial charm & the haunted', topAttractions: ['Haunted Mansion', 'Liberty Belle Riverboat'] },
  { id: 'fantasyland', name: 'Fantasyland', emoji: '🏰', color: '#E84393', vibe: 'Classic Disney fairytales', topAttractions: ['Seven Dwarfs Mine Train', "Peter Pan's Flight", "It's a Small World", 'Dumbo'] },
  { id: 'tomorrowland', name: 'Tomorrowland', emoji: '🚀', color: '#0984E3', vibe: 'Space-age thrills & laser battles', topAttractions: ['TRON Lightcycle / Run', 'Space Mountain', "Buzz Lightyear's Space Ranger Spin"] },
];

export const easterEggs = [
  { title: 'The Utilidors', emoji: '🚇', description: "There's an entire city beneath Magic Kingdom. The 'Utilidors' (utility corridors) are a 9-acre network of tunnels where cast members travel unseen, trash is whisked away by vacuum tubes, and characters from one land never accidentally wander into another." },
  { title: 'Cinderella Castle Suite', emoji: '🏰', description: "There's a secret hotel suite INSIDE Cinderella Castle, but you can't book it. It was originally Walt's personal apartment but was converted into a luxury suite for contest winners. Only a handful of people have ever slept there." },
  { title: 'Forced Perspective', emoji: '👁️', description: "Main Street buildings use 'forced perspective' — the second stories are built at 5/8 scale and the third at 1/2 scale, making buildings look taller than they are. Cinderella Castle uses the same trick to appear 189 feet tall." },
  { title: 'Hidden Mickeys', emoji: '🐭', description: "There are hundreds of 'Hidden Mickeys' throughout the park — three circles arranged to form Mickey's head, embedded in architecture, ride designs, and landscaping. Finding them is a beloved scavenger hunt!" },
  { title: 'Liberty Bell Crack', emoji: '🔔', description: "The Liberty Bell in Liberty Square is an exact replica cast from the original mold in Philadelphia. It even has the same famous crack — though Disney claims theirs is one of only 53 authentic replicas." },
  { title: 'Real Skulls on Pirates', emoji: '💀', description: "When Pirates of the Caribbean first opened, the Imagineers weren't happy with how fake the prop skulls looked. So they acquired real human skulls from the UCLA Medical Center. Most have been replaced, but rumor says the skull above the headboard in the captain's quarters is still real." },
];

export const mkStrategy = {
  morning: [
    { time: '6:30 AM', step: 'Wake up, get dressed, grab breakfast to-go' },
    { time: '7:00 AM', step: 'Head to bus stop (or Minnie Van for guaranteed early arrival)' },
    { time: '7:30 AM', step: 'Arrive at MK gates, go through bag check & tapstiles' },
    { time: '8:30 AM', step: 'Early Entry begins — head straight to Seven Dwarfs Mine Train' },
    { time: '8:50 AM', step: "After Mine Train: Peter Pan's Flight, then Haunted Mansion" },
    { time: '9:00 AM', step: "Official park opening. Hit Big Thunder Mountain or Tiana's Bayou" },
  ],
  afternoon: [
    { time: '11:30 AM', step: 'Mobile order lunch at Cosmic Ray\'s or Pecos Bill' },
    { time: '12:00 PM', step: 'Use Lightning Lane for Space Mountain or TRON' },
    { time: '1:00 PM', step: 'Cool off at indoor rides: PhilharMagic, Laugh Floor, Carousel of Progress' },
    { time: '2:00 PM', step: 'Catch the Festival of Fantasy parade from Frontierland (~2:00-3:00 PM)' },
    { time: '3:00 PM', step: 'Pool break back at Pop Century (optional!)' },
  ],
  evening: [
    { time: '5:00 PM', step: 'Return to MK for dinner & evening fun' },
    { time: '6:00 PM', step: 'Ride favorites with shorter lines: Pirates, Jungle Cruise' },
    { time: '7:30 PM', step: 'Stake out a fireworks spot on Main Street (bridge near Tomorrowland is great too)' },
    { time: '8:00 PM', step: 'Happily Ever After fireworks spectacular' },
    { time: '9:00 PM', step: 'Post-fireworks: ride everything with minimal waits!' },
  ],
};

export const fireworksGuide = {
  name: 'Happily Ever After',
  time: '~8:00-9:00 PM (varies by season)',
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
  { id: 'mk-shows', label: 'Shows & Fireworks' },
  { id: 'mk-dining', label: 'Dining Guide' },
  { id: 'mk-hidden', label: 'Hidden Magic' },
  { id: 'mk-strategy', label: 'Our MK Strategy' },
  { id: 'mk-map', label: 'Park Map' },
  { id: 'mk-shopping', label: 'Shopping' },
];

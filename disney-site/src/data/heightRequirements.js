// Height tiers organized from no requirement to tallest
// Luna: ~39" in Jan 2026, estimated ~41-42" by Jan 2027
// Clara: born April 2024, estimated ~34-35" by Jan 2027
// Esme and Eli: ages unknown, listed as kids

export const kidProfiles = [
  { name: 'Luna', height: '~41–42"', age: '4.5 years', note: 'Can ride most 40" rides!' },
  { name: 'Clara', height: '~34–35"', age: '2 years 9 months', note: 'Limited to no-requirement and 32" rides' },
];

export const heightTiers = [
  {
    tier: 'No Height Requirement',
    emoji: '👶',
    color: '#4ECDC4',
    note: 'Everyone can ride!',
    lunaCanRide: true,
    claraCanRide: true,
    rides: [
      { name: 'Haunted Mansion', park: 'Magic Kingdom' },
      { name: 'Pirates of the Caribbean', park: 'Magic Kingdom' },
      { name: 'Jungle Cruise', park: 'Magic Kingdom' },
      { name: "it's a small world", park: 'Magic Kingdom' },
      { name: 'Dumbo the Flying Elephant', park: 'Magic Kingdom' },
      { name: 'Peter Pan\'s Flight', park: 'Magic Kingdom' },
      { name: 'The Many Adventures of Winnie the Pooh', park: 'Magic Kingdom' },
      { name: 'Buzz Lightyear\'s Space Ranger Spin', park: 'Magic Kingdom' },
      { name: 'Under the Sea ~ Journey of the Little Mermaid', park: 'Magic Kingdom' },
      { name: 'Frozen Ever After', park: 'EPCOT' },
      { name: 'Spaceship Earth', park: 'EPCOT' },
      { name: 'Remy\'s Ratatouille Adventure', park: 'EPCOT' },
      { name: 'Living with the Land', park: 'EPCOT' },
      { name: 'Toy Story Mania!', park: 'Hollywood Studios' },
      { name: 'Mickey & Minnie\'s Runaway Railway', park: 'Hollywood Studios' },
    ],
  },
  {
    tier: '32 inches',
    emoji: '🟢',
    color: '#2ECC71',
    note: 'Clara might just make this!',
    lunaCanRide: true,
    claraCanRide: true,
    rides: [
      { name: 'Tomorrowland Speedway', park: 'Magic Kingdom', note: '54" to drive alone' },
      { name: 'Alien Swirling Saucers', park: 'Hollywood Studios' },
    ],
  },
  {
    tier: '35 inches',
    emoji: '🟡',
    color: '#F1C40F',
    note: 'Clara might not be tall enough yet',
    lunaCanRide: true,
    claraCanRide: false,
    rides: [
      { name: 'The Barnstormer', park: 'Magic Kingdom', note: 'Great first coaster!' },
    ],
  },
  {
    tier: '38 inches',
    emoji: '🟠',
    color: '#FF6B35',
    note: 'Luna can ride! Clara will need Rider Swap.',
    lunaCanRide: true,
    claraCanRide: false,
    rides: [
      { name: 'Seven Dwarfs Mine Train', park: 'Magic Kingdom' },
      { name: 'Slinky Dog Dash', park: 'Hollywood Studios' },
      { name: 'Millennium Falcon: Smugglers Run', park: 'Hollywood Studios' },
    ],
  },
  {
    tier: '40 inches',
    emoji: '🔴',
    color: '#FF6B6B',
    note: 'Luna is borderline — measure her before the trip! Rider Swap for Clara.',
    lunaCanRide: true,
    claraCanRide: false,
    rides: [
      { name: 'Big Thunder Mountain Railroad', park: 'Magic Kingdom' },
      { name: "Tiana's Bayou Adventure", park: 'Magic Kingdom' },
      { name: 'Soarin\' Around the World', park: 'EPCOT' },
      { name: 'Test Track', park: 'EPCOT' },
      { name: 'Mission: SPACE', park: 'EPCOT' },
      { name: 'Tower of Terror', park: 'Hollywood Studios' },
      { name: 'Star Wars: Rise of the Resistance', park: 'Hollywood Studios' },
      { name: 'Star Tours', park: 'Hollywood Studios' },
    ],
  },
  {
    tier: '42 inches',
    emoji: '🚫',
    color: '#A29BFE',
    note: 'Luna might not be tall enough. Rider Swap for both kids.',
    lunaCanRide: false,
    claraCanRide: false,
    rides: [
      { name: 'Guardians of the Galaxy: Cosmic Rewind', park: 'EPCOT' },
    ],
  },
  {
    tier: '44 inches',
    emoji: '🚫',
    color: '#636e72',
    note: 'Adults only — Rider Swap for both kids.',
    lunaCanRide: false,
    claraCanRide: false,
    rides: [
      { name: 'Space Mountain', park: 'Magic Kingdom' },
    ],
  },
  {
    tier: '48 inches',
    emoji: '🚫',
    color: '#2D3436',
    note: 'Adults only — Rider Swap for both kids.',
    lunaCanRide: false,
    claraCanRide: false,
    rides: [
      { name: 'TRON Lightcycle / Run', park: 'Magic Kingdom' },
      { name: 'Rock \'n\' Roller Coaster', park: 'Hollywood Studios' },
    ],
  },
];

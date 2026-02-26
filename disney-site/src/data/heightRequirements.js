// Height tiers organized from no requirement to tallest

export const heightTiers = [
  {
    tier: 'No Height Requirement',
    emoji: '👶',
    color: '#4ECDC4',
    note: 'Everyone can ride!',
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
    note: 'Mild — most kids can handle this',
    rides: [
      { name: 'Tomorrowland Speedway', park: 'Magic Kingdom', note: '54" to drive alone' },
      { name: 'Alien Swirling Saucers', park: 'Hollywood Studios' },
    ],
  },
  {
    tier: '35 inches',
    emoji: '🟡',
    color: '#F1C40F',
    note: 'First coaster territory',
    rides: [
      { name: 'The Barnstormer', park: 'Magic Kingdom', note: 'Great first coaster!' },
    ],
  },
  {
    tier: '38 inches',
    emoji: '🟠',
    color: '#FF6B35',
    note: 'Rider Swap available for shorter kids',
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
    note: 'Rider Swap available for shorter kids',
    rides: [
      { name: 'Big Thunder Mountain Railroad', park: 'Magic Kingdom' },
      { name: "Tiana's Bayou Adventure", park: 'Magic Kingdom' },
      { name: 'Soarin\' Across America', park: 'EPCOT' },
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
    note: 'Rider Swap available for shorter kids',
    rides: [
      { name: 'Guardians of the Galaxy: Cosmic Rewind', park: 'EPCOT' },
    ],
  },
  {
    tier: '44 inches',
    emoji: '🚫',
    color: '#636e72',
    note: 'Rider Swap available for shorter kids',
    rides: [
      { name: 'Space Mountain', park: 'Magic Kingdom' },
    ],
  },
  {
    tier: '48 inches',
    emoji: '🚫',
    color: '#2D3436',
    note: 'Taller riders only — Rider Swap available',
    rides: [
      { name: 'TRON Lightcycle / Run', park: 'Magic Kingdom' },
      { name: 'Rock \'n\' Roller Coaster Starring The Muppets', park: 'Hollywood Studios' },
    ],
  },
];

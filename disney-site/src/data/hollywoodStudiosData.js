// Hollywood Studios park guide data

export const galaxysEdgeGuide = [
  { id: 'savis', name: "Savi's Workshop — Lightsaber Building", emoji: '⚔️', description: "Build your own custom lightsaber in a secret workshop guided by Gatherers. Choose from 4 crystal colors and 4 hilt themes. It's an immersive 20-minute ceremony — genuinely emotional for Star Wars fans. Costs ~$275 but includes the lightsaber.", tip: 'Reservations required and sell out fast. Book at 7AM ET exactly 60 days before your visit.' },
  { id: 'ogas', name: "Oga's Cantina", emoji: '🍹', description: "One of the most unique bars in any Disney park! Themed as a smuggler's watering hole with DJ R-3X spinning tunes. Try the Fuzzy Tauntaun (foam that makes your lips tingle) or the Jedi Mind Trick. Non-alcoholic options and blue/green milk available for kids.", tip: 'Reservations strongly recommended. 45-minute time limit. Standing room only gets you in faster.' },
  { id: 'smugglers-run', name: "Millennium Falcon: Smugglers Run — A New Mission", emoji: '🛸', description: "Fly the Falcon with Din Djarin and Grogu! The crew picks their destination — Bespin, Endor's Death Star wreckage, or Coruscant. Pilots steer, gunners fire, and engineers can now communicate with Grogu. Launched May 2026 with a full Mandalorian overlay.", tip: 'Request to be a pilot for the most interactive experience. 38" height requirement' },
  { id: 'droid-depot', name: "Droid Depot", emoji: '🤖', description: "Build your own R-unit or BB-unit droid from interchangeable parts on a conveyor belt. Your droid interacts with Bluetooth beacons throughout Galaxy's Edge, beeping and reacting to its surroundings. ~$130.", tip: 'A great activity for kids. Droids work best when you walk slowly through Batuu.' },
  { id: 'hidden-details', name: 'Hidden Details of Batuu', emoji: '🔍', description: "Cast Members say 'Bright Suns' (hello) and 'Til the Spire' (goodbye). Droid tracks in the ground, cockroach-like creatures in the walls, and the spires of the ancient ruins all tell a story. The Coke bottles are even shaped like thermal detonators!", tip: 'Download the Play Disney Parks app for interactive Batuu experiences.' },
];

export const toyStoryLandGuide = [
  { id: 'slinky', name: 'Slinky Dog Dash Strategy', emoji: '🐕', description: "The most popular family coaster at HS. Fun, bouncy, and not too intense — perfect for kids 38\"+. The queue gets long fast, so rope drop or Lightning Lane is essential.", tip: 'Rope drop priority #2 after Rise of the Resistance. Or use Lightning Lane Multi Pass.' },
  { id: 'alien-saucers', name: 'Alien Swirling Saucers', emoji: '👽', description: "Whip-style spinning ride themed to the Little Green Men. Gentle enough for younger kids (32\" req). The neon lighting and Toy Story music make it a blast.", tip: 'Usually shorter waits in the afternoon. Low 32" height requirement — great for little ones!' },
  { id: 'woodys-lunch', name: "Woody's Lunch Box", emoji: '🥪', description: "Quick-service dining IN Toy Story Land. Totchos (loaded tater tots) are legendary. Also great: grilled cheese, lunch box tarts, and the Mystic Portal Punch drink.", tip: 'Mobile order essential — it gets packed. Try the totchos, you won\'t regret it.' },
  { id: 'photo-ops', name: 'Giant Toy Photo Ops', emoji: '📸', description: "You're shrunk to the size of a toy! Giant Tinker Toys, Jenga blocks, Cooties, and Green Army Men patrol the area. Amazing photo opportunities everywhere.", tip: 'Best photos in the morning light or at night when everything glows.' },
];

export const thrillGuide = [
  { id: 'tower', name: 'Tower of Terror — Drop Sequences', emoji: '🗼', description: "The Hollywood Tower Hotel uses a randomized drop sequence — each ride is different! Sometimes you get 2 drops, sometimes 4+. The moment of weightlessness at the top, with the doors opening to reveal the park, is unforgettable. 40\" height req.", tip: 'Front row has the best view when doors open. 40" height requirement' },
  { id: 'rock-n-roller', name: "Rock 'n' Roller Coaster Starring The Muppets", emoji: '🎸', description: "High-speed launch coaster that goes 0-57 mph in 2.8 seconds, with 3 inversions in the dark, now featuring The Muppets' Electric Mayhem band. The only Disney World coaster with inversions. 48\" req — adults only for our group.", tip: 'Use Rider Swap so both parents can ride. Single rider line is also fast.' },
  { id: 'rider-swap-strategy', name: 'Rider Swap Strategy', emoji: '🔄', description: "For rides the kids can't do, use Disney's Rider Swap. Parent A rides while Parent B waits with kids. Then Parent B gets to ride with up to 2 others without waiting again! Works great for Tower of Terror and the Muppets coaster.", tip: 'Ask a Cast Member at the ride entrance to set up Rider Swap before joining the line.' },
];

export const hsStrategy = {
  morning: [
    { time: '6:30 AM', step: 'Wake up and head to bus/Minnie Van' },
    { time: '8:00 AM', step: 'Arrive at HS, through bag check' },
    { time: '8:30 AM', step: "Early Entry: Head straight to Rise of the Resistance" },
    { time: '9:00 AM', step: "Official opening — Slinky Dog Dash or Tower of Terror" },
    { time: '9:30 AM', step: "Head to Galaxy's Edge for Smuggler's Run" },
    { time: '9:30 AM', step: "Explore Galaxy's Edge — Droid Depot, Oga's Cantina (if reserved)" },
  ],
  afternoon: [
    { time: '11:00 AM', step: "Lunch at Docking Bay 7 or Woody's Lunch Box (mobile order!)" },
    { time: '12:00 PM', step: 'Toy Story Land: Alien Saucers, Toy Story Mania' },
    { time: '1:30 PM', step: "Lightning Lane for Mickey & Minnie's Runaway Railway" },
    { time: '2:00 PM', step: 'Frozen Sing-Along (air conditioned break!)' },
    { time: '3:00 PM', step: 'Indiana Jones Stunt Spectacular if timing works' },
  ],
  evening: [
    { time: '5:00 PM', step: '50\'s Prime Time Café or Sci-Fi Dine-In' },
    { time: '6:30 PM', step: 'Re-ride favorites or catch anything missed' },
    { time: '8:00 PM', step: 'Grab spot for Fantasmic! — aim for mid-level center seats (avoid front rows: splash zone + visible effects mechanics). Consider the Fantasmic Dining Package for reserved seating.' },
    { time: '8:30 PM', step: 'Fantasmic! water, fire, and projection spectacular (check schedule — varies by season, ~30 min)' },
    { time: '9:30 PM', step: 'Post-show: low-wait rides or head back to resort' },
  ],
};

export const hsNavSections = [
  { id: 'hs-hero', label: 'Hollywood Studios' },
  { id: 'hs-galaxys-edge', label: "Galaxy's Edge" },
  { id: 'hs-toy-story', label: 'Toy Story Land' },
  { id: 'hs-rides', label: 'Rides & Attractions' },
  { id: 'hs-thrills', label: 'Thrill Guide' },
  { id: 'hs-shows', label: 'Shows & Entertainment' },
  { id: 'hs-dining', label: 'Dining Guide' },
  { id: 'hs-strategy', label: 'Our HS Strategy' },
  { id: 'hs-shopping', label: 'Shopping' },
  { id: 'hs-map', label: 'Park Map' },
];

// Official Disney data — supplementary lookup keyed by marker ID or name
// Scraped from disneyworld.disney.go.com February 2026
// Images served from cdn1.parksmedia.wdprapps.disney.com

export const officialData = {
  // ═══════════════════════════════════════════════════════════════
  // RIDES (33)
  // ═══════════════════════════════════════════════════════════════

  // Magic Kingdom
  'pirates-of-the-caribbean': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/pirates-of-the-caribbean/',
    officialImage: '/images/pirates-of-the-caribbean.jpg',
  },
  'jungle-cruise': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/jungle-cruise/',
    officialImage: '/images/jungle-cruise.jpg',
  },
  'big-thunder-mountain-railroad': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/big-thunder-mountain-railroad/',
    officialImage: '/images/big-thunder-mountain-railroad.jpg',
  },
  'tianas-bayou-adventure': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/tianas-bayou-adventure/',
    officialImage: '/images/tianas-bayou-adventure.jpg',
  },
  'haunted-mansion': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/haunted-mansion/',
    officialImage: '/images/haunted-mansion.jpg',
  },
  'its-a-small-world': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/its-a-small-world/',
    officialImage: '/images/its-a-small-world.jpg',
  },
  'peter-pans-flight': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/peter-pan-flight/',
    officialImage: null,
  },
  'seven-dwarfs-mine-train': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/seven-dwarfs-mine-train/',
    officialImage: '/images/seven-dwarfs-mine-train.jpg',
  },
  'dumbo-the-flying-elephant': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/dumbo-the-flying-elephant/',
    officialImage: '/images/dumbo-the-flying-elephant.jpg',
  },
  'the-barnstormer': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/barnstormer-starring-great-goofini/',
    officialImage: null,
  },
  'many-adventures-of-winnie-the-pooh': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/many-adventures-of-winnie-the-pooh/',
    officialImage: '/images/many-adventures-of-winnie-the-pooh.jpg',
  },
  'under-the-sea-journey-of-the-little-mermaid': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/under-the-sea-journey-of-the-little-mermaid/',
    officialImage: '/images/under-the-sea-journey-of-the-little-mermaid.jpg',
  },
  'space-mountain': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/space-mountain/',
    officialImage: '/images/space-mountain.jpg',
  },
  'buzz-lightyears-space-ranger-spin': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/buzz-lightyear-space-ranger-spin/',
    officialImage: '/images/buzz-lightyears-space-ranger-spin.jpg',
  },
  'tron-lightcycle-run': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/tron-lightcycle-run/',
    officialImage: '/images/tron-lightcycle-run.jpg',
  },
  'tomorrowland-speedway': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/tomorrowland-speedway/',
    officialImage: '/images/tomorrowland-speedway.jpg',
  },

  // Hollywood Studios
  'rise-of-the-resistance': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/star-wars-rise-of-the-resistance/',
    officialImage: '/images/rise-of-the-resistance.jpg',
  },
  'millennium-falcon-smugglers-run': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/millennium-falcon-smugglers-run/',
    officialImage: '/images/millennium-falcon-smugglers-run.jpg',
  },
  'slinky-dog-dash': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/slinky-dog-dash/',
    officialImage: '/images/slinky-dog-dash.jpg',
  },
  'toy-story-mania': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/toy-story-mania/',
    officialImage: '/images/toy-story-mania.jpg',
  },
  'alien-swirling-saucers': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/alien-swirling-saucers/',
    officialImage: '/images/alien-swirling-saucers.jpg',
  },
  'tower-of-terror': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/twilight-zone-tower-of-terror/',
    officialImage: '/images/tower-of-terror.jpg',
  },
  'rock-n-roller-coaster': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/rock-and-roller-coaster-starring-aerosmith/',
    officialImage: null,
  },
  'star-tours': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/star-tours/',
    officialImage: '/images/star-tours.jpg',
  },
  'mickey-minnies-runaway-railway': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/mickey-minnies-runaway-railway/',
    officialImage: null,
  },

  // EPCOT
  'spaceship-earth': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/spaceship-earth/',
    officialImage: '/images/spaceship-earth.jpg',
  },
  'guardians-of-the-galaxy-cosmic-rewind': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/guardians-of-the-galaxy-cosmic-rewind/',
    officialImage: '/images/guardians-of-the-galaxy-cosmic-rewind.jpg',
  },
  'test-track': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/test-track/',
    officialImage: '/images/test-track.jpg',
  },
  'mission-space': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/mission-space/',
    officialImage: '/images/mission-space.jpg',
  },
  'soarin-across-america': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/soarin/',
    officialImage: '/images/soarin-across-america.jpg',
  },
  'living-with-the-land': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/living-with-the-land/',
    officialImage: '/images/living-with-the-land.jpg',
  },
  'frozen-ever-after': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/frozen-ever-after/',
    officialImage: '/images/frozen-ever-after.jpg',
  },
  'remys-ratatouille-adventure': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/remys-ratatouille-adventure/',
    officialImage: '/images/remys-ratatouille-adventure.jpg',
  },
  'journey-into-imagination': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/journey-into-imagination-with-figment/',
    officialImage: '/images/journey-into-imagination.jpg',
  },
  'seas-with-nemo': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/seas-with-nemo-and-friends/',
    officialImage: '/images/seas-with-nemo.jpg',
  },

  // New rides (7)
  'wdw-railroad': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/walt-disney-world-railroad/',
    officialImage: '/images/wdw-railroad.jpg',
  },
  'astro-orbiter': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/astro-orbiter/',
    officialImage: '/images/astro-orbiter.jpg',
  },
  'mad-tea-party': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/mad-tea-party/',
    officialImage: '/images/mad-tea-party.jpg',
  },
  'prince-charming-regal-carrousel': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/prince-charming-regal-carrousel/',
    officialImage: '/images/prince-charming-regal-carrousel.jpg',
  },
  'magic-carpets-of-aladdin': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/magic-carpets-of-aladdin/',
    officialImage: '/images/magic-carpets-of-aladdin.jpg',
  },
  'peoplemover': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/tomorrowland-transit-authority-peoplemover/',
    officialImage: '/images/peoplemover.jpg',
  },
  'gran-fiesta-tour': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/gran-fiesta-tour-starring-three-caballeros/',
    officialImage: '/images/gran-fiesta-tour.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // SHOWS & ENTERTAINMENT (12 + 14 new)
  // ═══════════════════════════════════════════════════════════════

  'philharmagic': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/mickeys-philharmagic/',
    officialImage: '/images/philharmagic.jpg',
  },
  'laugh-floor': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/monsters-inc-laugh-floor/',
    officialImage: '/images/laugh-floor.jpg',
  },
  'country-bears': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/country-bear-jamboree/',
    officialImage: null,
  },
  'frozen-singalong': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/frozen-sing-along-celebration/',
    officialImage: null,
  },
  'indiana-jones': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/indiana-jones-epic-stunt-spectacular/',
    officialImage: '/images/indiana-jones.jpg',
  },
  'happily-ever-after': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/happily-ever-after-fireworks/',
    officialImage: '/images/happily-ever-after.jpg',
  },
  'luminous': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/epcot/luminous-the-symphony-us/',
    officialImage: null,
  },
  'fantasmic': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/fantasmic/',
    officialImage: '/images/fantasmic.jpg',
  },
  'festival-of-fantasy': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/festival-fantasy-parade/',
    officialImage: null,
  },

  // New shows (14)
  'carousel-of-progress': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/walt-disney-carousel-of-progress/',
    officialImage: '/images/carousel-of-progress.jpg',
  },
  'hall-of-presidents': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/hall-of-presidents/',
    officialImage: '/images/hall-of-presidents.jpg',
  },
  'enchanted-tiki-room': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/magic-kingdom/enchanted-tiki-room/',
    officialImage: '/images/enchanted-tiki-room.jpg',
  },
  'friendship-faire': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/mickeys-magical-friendship-faire/',
    officialImage: '/images/friendship-faire.jpg',
  },
  'disney-starlight': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/magic-kingdom/starlight-dream-night-away-parade/',
    officialImage: '/images/disney-starlight.jpg',
  },
  'batb-live-on-stage': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/beauty-and-the-beast-live-on-stage/',
    officialImage: '/images/batb-live-on-stage.jpg',
  },
  'little-mermaid-musical': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/little-mermaid-musical-adventure/',
    officialImage: '/images/little-mermaid-musical.jpg',
  },
  'muppet-vision-3d': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/muppet-vision-3d/',
    officialImage: '/images/muppet-vision-3d.jpg',
  },
  'walt-disney-presents': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/walt-disney-presents/',
    officialImage: '/images/walt-disney-presents.jpg',
  },
  'mickey-shorts-theater': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/hollywood-studios/vacation-fun/',
    officialImage: '/images/mickey-shorts-theater.jpg',
  },
  'wonderful-world-animation': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/hollywood-studios/wonderful-world-of-animation/',
    officialImage: '/images/wonderful-world-animation.jpg',
  },
  'turtle-talk-with-crush': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/turtle-talk-with-crush/',
    officialImage: '/images/turtle-talk-with-crush.jpg',
  },
  'short-film-festival': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/disney-pixar-short-film-festival/',
    officialImage: '/images/short-film-festival.jpg',
  },
  'batb-singalong': {
    officialUrl: 'https://disneyworld.disney.go.com/entertainment/epcot/beauty-and-the-beast-sing-along/',
    officialImage: '/images/batb-singalong.jpg',
  },
  'awesome-planet': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/the-land-awesome-planet/',
    officialImage: '/images/awesome-planet.jpg',
  },
  'american-adventure': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/american-adventure/',
    officialImage: '/images/american-adventure.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // DINING — Magic Kingdom
  // ═══════════════════════════════════════════════════════════════

  'Be Our Guest Restaurant': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/be-our-guest-restaurant/',
    officialImage: '/images/be-our-guest-restaurant.jpg',
  },
  "Cinderella's Royal Table": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/cinderella-royal-table/',
    officialImage: null,
  },
  'The Crystal Palace': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/crystal-palace/',
    officialImage: '/images/the-crystal-palace.jpg',
  },
  'The Plaza Restaurant': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/plaza-restaurant/',
    officialImage: '/images/the-plaza-restaurant.jpg',
  },
  "Cosmic Ray's Starlight Café": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/cosmic-ray-starlight-cafe/',
    officialImage: '/images/cosmic-rays-starlight-cafe.jpg',
  },
  "Pecos Bill's": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/pecos-bill-tall-tale-inn-and-cafe/',
    officialImage: '/images/pecos-bills.jpg',
  },
  'Columbia Harbour House': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/columbia-harbour-house/',
    officialImage: '/images/columbia-harbour-house.jpg',
  },
  'Mickey Waffles': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/sleepy-hollow/',
    officialImage: '/images/mickey-waffles.jpg',
  },
  'Corn Dog Nuggets': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/caseys-corner/',
    officialImage: '/images/corn-dog-nuggets.jpg',
  },
  "LeFou's Brew": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/gastons-tavern/',
    officialImage: '/images/lefous-brew.jpg',
  },
  'The Lunching Pad': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/lunching-pad/',
    officialImage: '/images/the-lunching-pad.jpg',
  },
  'Dole Whip': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/aloha-isle/',
    officialImage: '/images/dole-whip.jpg',
  },

  // --- MK Additional Dining ---
  'Skipper Canteen': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/jungle-navigation-skipper-canteen/',
    officialImage: '/images/skipper-canteen.jpg',
  },
  'Liberty Tree Tavern': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/liberty-tree-tavern/',
    officialImage: null,
  },
  "Tony's Town Square Restaurant": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/tonys-town-square-restaurant/',
    officialImage: null,
  },
  'Diamond Horseshoe': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/diamond-horseshoe/',
    officialImage: null,
  },
  'Pinocchio Village Haus': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/pinocchio-village-haus/',
    officialImage: null,
  },
  'Tortuga Tavern': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/tortuga-tavern/',
    officialImage: '/images/tortuga-tavern.jpg',
  },
  "Friar's Nook": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/friars-nook/',
    officialImage: '/images/friars-nook.jpg',
  },
  'Tomorrowland Terrace': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/tomorrowland-terrace-restaurant/',
    officialImage: '/images/tomorrowland-terrace.jpg',
  },
  'Storybook Treats': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/storybook-treats/',
    officialImage: '/images/storybook-treats.jpg',
  },
  'Golden Oak Outpost': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/magic-kingdom/golden-oak-outpost/',
    officialImage: '/images/golden-oak-outpost.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // DINING — Hollywood Studios
  // ═══════════════════════════════════════════════════════════════

  "50's Prime Time Café": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/50s-prime-time-cafe/',
    officialImage: '/images/50s-prime-time-cafe.jpg',
  },
  "Oga's Cantina": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/ogas-cantina/',
    officialImage: '/images/ogas-cantina.jpg',
  },
  'Hollywood & Vine': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/hollywood-and-vine/',
    officialImage: '/images/hollywood-and-vine.jpg',
  },
  'Sci-Fi Dine-In Theater': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/sci-fi-dine-in-theater/',
    officialImage: '/images/sci-fi-dine-in-theater.jpg',
  },
  'The Hollywood Brown Derby': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/hollywood-brown-derby/',
    officialImage: '/images/the-hollywood-brown-derby.jpg',
  },
  'Ronto Wrap': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/ronto-roasters/',
    officialImage: '/images/ronto-wrap.jpg',
  },
  'Docking Bay 7': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/docking-bay-7-food-and-cargo/',
    officialImage: '/images/docking-bay-7.jpg',
  },
  "Woody's Lunch Box": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/woodys-lunchbox/',
    officialImage: null,
  },
  'Num Num Cookie': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/backlot-express/',
    officialImage: '/images/num-num-cookie.jpg',
  },

  // --- HS Additional Dining ---
  'Roundup Rodeo BBQ': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/roundup-rodeo-bbq/',
    officialImage: '/images/roundup-rodeo-bbq.jpg',
  },
  'ABC Commissary': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/abc-commissary/',
    officialImage: null,
  },
  'BaseLine Tap House': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/baseline-tap-house/',
    officialImage: '/images/baseline-tap-house.jpg',
  },
  "Catalina Eddie's": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/catalina-eddies/',
    officialImage: null,
  },
  'Fairfax Fare': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/fairfax-fare/',
    officialImage: '/images/fairfax-fare.jpg',
  },
  "Rosie's All-American Café": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/rosies-all-american-cafe/',
    officialImage: null,
  },
  'Dockside Diner': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/dockside-diner/',
    officialImage: '/images/dockside-diner.jpg',
  },
  'Hollywood Scoops': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/hollywood-scoops/',
    officialImage: '/images/hollywood-scoops.jpg',
  },
  "Kat Saka's Kettle": {
    officialUrl: 'https://disneyworld.disney.go.com/dining/hollywood-studios/kat-sakas-kettle/',
    officialImage: '/images/kat-sakas-kettle.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // DINING — EPCOT
  // ═══════════════════════════════════════════════════════════════

  'Le Cellier Steakhouse': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/le-cellier-steakhouse/',
    officialImage: '/images/le-cellier-steakhouse.jpg',
  },
  'Space 220': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/space-220/',
    officialImage: '/images/space-220.jpg',
  },
  'Biergarten Restaurant': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/biergarten-restaurant/',
    officialImage: '/images/biergarten-restaurant.jpg',
  },
  'Chefs de France': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/chefs-de-france/',
    officialImage: '/images/chefs-de-france.jpg',
  },
  'San Angel Inn Restaurante': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/san-angel-inn-restaurante/',
    officialImage: '/images/san-angel-inn-restaurante.jpg',
  },
  'The Garden Grill': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/garden-grill-restaurant/',
    officialImage: '/images/the-garden-grill.jpg',
  },
  'Coral Reef Restaurant': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/coral-reef-restaurant/',
    officialImage: '/images/coral-reef-restaurant.jpg',
  },
  'Akershus Royal Banquet Hall': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/akershus-royal-banquet-hall/',
    officialImage: '/images/akershus-royal-banquet-hall.jpg',
  },
  'Teppan Edo': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/teppan-edo/',
    officialImage: '/images/teppan-edo.jpg',
  },
  'Nine Dragons Restaurant': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/nine-dragons-restaurant/',
    officialImage: '/images/nine-dragons-restaurant.jpg',
  },
  'Les Halles Pastries': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/les-halles-boulangerie-patisserie/',
    officialImage: '/images/les-halles-pastries.jpg',
  },
  'Sunshine Seasons': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/sunshine-seasons/',
    officialImage: '/images/sunshine-seasons.jpg',
  },
  'Regal Eagle Smokehouse': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/regal-eagle-smokehouse/',
    officialImage: '/images/regal-eagle-smokehouse.jpg',
  },
  'Tangierine Café': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/tangierine-cafe/',
    officialImage: '/images/tangierine-cafe.jpg',
  },
  'Starbucks (EPCOT)': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/connections-cafe/',
    officialImage: null,
  },
  'School Bread': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/kringla-bakeri-og-kafe/',
    officialImage: '/images/school-bread.jpg',
  },

  // --- EPCOT Additional Dining ---
  'La Hacienda de San Angel': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/hacienda-de-san-angel/',
    officialImage: '/images/la-hacienda-de-san-angel.jpg',
  },
  'La Cantina de San Angel': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/cantina-de-san-angel/',
    officialImage: '/images/la-cantina-de-san-angel.jpg',
  },
  'Choza de Margarita': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/choza-de-margarita/',
    officialImage: '/images/choza-de-margarita.jpg',
  },
  'Tutto Italia Ristorante': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/tutto-italia-ristorante/',
    officialImage: '/images/tutto-italia.jpg',
  },
  'Tutto Gusto Wine Cellar': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/tutto-gusto-wine-cellar/',
    officialImage: '/images/tutto-gusto.jpg',
  },
  'Via Napoli Ristorante e Pizzeria': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/via-napoli/',
    officialImage: '/images/via-napoli.jpg',
  },
  'Rose & Crown Dining Room': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/rose-and-crown-dining-room/',
    officialImage: '/images/rose-and-crown.jpg',
  },
  'La Crêperie de Paris': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/creperie-de-paris/',
    officialImage: '/images/la-creperie-de-paris.jpg',
  },
  'Spice Road Table': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/spice-road-table/',
    officialImage: '/images/spice-road-table.jpg',
  },
  'Block & Hans': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/block-hans/',
    officialImage: '/images/block-and-hans.jpg',
  },
  'Fife & Drum Tavern': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/fife-and-drum-tavern/',
    officialImage: '/images/fife-and-drum.jpg',
  },
  'Shiki-Sai: Sushi Izakaya': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/katsura-grill/',
    officialImage: '/images/shiki-sai.jpg',
  },
  'Club Cool': {
    officialUrl: 'https://disneyworld.disney.go.com/attractions/epcot/club-cool/',
    officialImage: '/images/club-cool.jpg',
  },
  'Joy of Tea': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/epcot/joy-of-tea/',
    officialImage: '/images/joy-of-tea.jpg',
  },
  'Cool Wash': {
    officialUrl: null,
    officialImage: null,
  },

  // ═══════════════════════════════════════════════════════════════
  // DINING — Disney Springs
  // ═══════════════════════════════════════════════════════════════

  'the-boathouse': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/boathouse-restaurant/',
    officialImage: null,
  },
  'art-smiths-homecoming': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/chef-art-smiths-homecomin/',
    officialImage: '/images/art-smiths-homecoming.jpg',
  },
  'morimoto-asia': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/morimoto-asia/',
    officialImage: '/images/morimoto-asia.jpg',
  },
  'jaleo': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/jaleo/',
    officialImage: '/images/jaleo.jpg',
  },
  'wine-bar-george': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/wine-bar-george/',
    officialImage: '/images/wine-bar-george.jpg',
  },
  'the-edison': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/edison/',
    officialImage: '/images/the-edison.jpg',
  },
  't-rex': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/t-rex/',
    officialImage: '/images/t-rex.jpg',
  },
  'gideons-bakehouse': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/gideons-bakehouse/',
    officialImage: '/images/gideons-bakehouse.jpg',
  },
  'earl-of-sandwich': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/earl-of-sandwich/',
    officialImage: '/images/earl-of-sandwich.jpg',
  },

  // --- Disney Springs Additional ---
  'rainforest-cafe': {
    officialUrl: null,
    officialImage: null,
  },
  'pepe-by-jose-andres': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/pepe/',
    officialImage: '/images/pepe-by-jose-andres.jpg',
  },
  'the-ganachery': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/the-ganachery/',
    officialImage: '/images/the-ganachery.jpg',
  },
  'sunshine-churros': {
    officialUrl: null,
    officialImage: null,
  },
  'swirls-on-the-water': {
    officialUrl: 'https://disneyworld.disney.go.com/dining/disney-springs/swirls-on-the-water/',
    officialImage: '/images/swirls-on-the-water.jpg',
  },
  'basket-at-wine-bar-george': {
    officialUrl: null,
    officialImage: null,
  },

  // ═══════════════════════════════════════════════════════════════
  // SHOPS — Park Shops (14)
  // ═══════════════════════════════════════════════════════════════

  // Magic Kingdom
  'emporium': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/magic-kingdom/emporium/',
    officialImage: '/images/emporium.jpg',
  },
  'memento-mori': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/magic-kingdom/memento-mori/',
    officialImage: '/images/memento-mori.jpg',
  },
  'big-top-souvenirs': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/magic-kingdom/big-top-souvenirs/',
    officialImage: '/images/big-top-souvenirs.jpg',
  },
  'frontier-trading-post': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/magic-kingdom/frontier-trading-post/',
    officialImage: '/images/frontier-trading-post.jpg',
  },
  'merchant-of-venus': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/magic-kingdom/merchant-of-venus/',
    officialImage: '/images/merchant-of-venus.jpg',
  },

  // Hollywood Studios
  'tatooine-traders': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/hollywood-studios/tatooine-traders/',
    officialImage: '/images/tatooine-traders.jpg',
  },
  'dok-ondars': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/hollywood-studios/dok-ondars-den-of-antiquities/',
    officialImage: '/images/dok-ondars.jpg',
  },
  'mickeys-of-hollywood': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/hollywood-studios/mickeys-of-hollywood/',
    officialImage: '/images/mickeys-of-hollywood.jpg',
  },
  'tower-hotel-gifts': {
    officialUrl: null,
    officialImage: null,
  },

  // EPCOT
  'creations-shop': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/epcot/creations-shop/',
    officialImage: '/images/creations-shop.jpg',
  },
  'mitsukoshi': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/epcot/mitsukoshi-department-store/',
    officialImage: '/images/mitsukoshi.jpg',
  },
  'northwest-mercantile': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/epcot/trading-post/',
    officialImage: '/images/northwest-mercantile.jpg',
  },
  'la-bottega-italiana': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/epcot/la-bottega-italiana/',
    officialImage: '/images/la-bottega-italiana.jpg',
  },
  'die-weihnachts-ecke': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/epcot/die-weihnachts-ecke/',
    officialImage: '/images/die-weihnachts-ecke.jpg',
  },

  // ═══════════════════════════════════════════════════════════════
  // SHOPS — Disney Springs (75)
  // ═══════════════════════════════════════════════════════════════

  // Disney Merchandise
  'world-of-disney': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/world-of-disney/',
    officialImage: null,
  },
  'pin-traders': {
    officialUrl: 'https://www.disneysprings.com/shopping/pin-traders/',
    officialImage: null,
  },
  'marketplace-co-op': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/marketplace-co-op/',
    officialImage: '/images/marketplace-co-op.jpg',
  },
  'once-upon-a-toy': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/once-upon-a-toy/',
    officialImage: '/images/once-upon-a-toy.jpg',
  },
  'days-of-christmas': {
    officialUrl: 'https://www.disneysprings.com/shopping/days-of-christmas/',
    officialImage: null,
  },
  'disney-ever-after': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/disney-ever-after/',
    officialImage: null,
  },
  'disneystyle': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/disneystyle/',
    officialImage: '/images/disneystyle.jpg',
  },
  'art-of-disney': {
    officialUrl: 'https://www.disneysprings.com/shopping/art-of-disney/',
    officialImage: null,
  },
  'wonderful-world-memories': {
    officialUrl: 'https://www.disneysprings.com/shopping/wonderful-world-memories/',
    officialImage: null,
  },
  'tren-d': {
    officialUrl: 'https://www.disneysprings.com/shopping/tren-d/',
    officialImage: null,
  },
  'crystal-arts': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/crystal-arts/',
    officialImage: null,
  },
  'star-wars-galactic': {
    officialUrl: 'https://www.disneysprings.com/shopping/star-wars-galactic/',
    officialImage: null,
  },
  'super-hero-hq': {
    officialUrl: 'https://www.disneysprings.com/shopping/super-hero-hq/',
    officialImage: null,
  },
  'mickeys-pantry': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/mickeys-pantry/',
    officialImage: null,
  },
  'cirque-boutique': {
    officialUrl: 'https://www.disneysprings.com/shopping/cirque-boutique/',
    officialImage: null,
  },

  // Toys
  'lego-store': {
    officialUrl: 'https://www.disneysprings.com/shopping/lego-store/',
    officialImage: null,
  },
  'build-a-dino': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/build-a-dino/',
    officialImage: '/images/build-a-dino.jpg',
  },
  'dino-store': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/dino-store/',
    officialImage: '/images/dino-store.jpg',
  },
  'rainforest-retail': {
    officialUrl: 'https://www.disneysprings.com/shopping/rainforest-retail/',
    officialImage: null,
  },

  // Fashion
  'zara': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/zara/',
    officialImage: '/images/zara.jpg',
  },
  'uniqlo': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/uniqlo/',
    officialImage: '/images/uniqlo.jpg',
  },
  'anthropologie': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/anthropologie/',
    officialImage: '/images/anthropologie.jpg',
  },
  'free-people': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/free-people/',
    officialImage: '/images/free-people.jpg',
  },
  'lilly-pulitzer': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/lilly-pulitzer/',
    officialImage: '/images/lilly-pulitzer.jpg',
  },
  'tommy-bahama': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/tommy-bahama/',
    officialImage: '/images/tommy-bahama.jpg',
  },
  'vineyard-vines': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/vineyard-vines/',
    officialImage: '/images/vineyard-vines.jpg',
  },
  'lacoste': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/lacoste/',
    officialImage: '/images/lacoste.jpg',
  },
  'levis': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/levis/',
    officialImage: '/images/levis.jpg',
  },
  'lululemon': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/lululemon/',
    officialImage: '/images/lululemon.jpg',
  },
  'fabletics': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/fabletics/',
    officialImage: '/images/fabletics.jpg',
  },
  'columbia': {
    officialUrl: 'https://www.disneysprings.com/shopping/columbia/',
    officialImage: null,
  },
  'ron-jon': {
    officialUrl: 'https://www.disneysprings.com/shopping/ron-jon/',
    officialImage: null,
  },
  'johnny-was': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/johnny-was/',
    officialImage: '/images/johnny-was.jpg',
  },
  'american-threads': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/american-threads/',
    officialImage: '/images/american-threads.jpg',
  },
  'everything-but-water': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/everything-but-water/',
    officialImage: '/images/everything-but-water.jpg',
  },
  'shore': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/shore/',
    officialImage: '/images/shore.jpg',
  },
  'under-armour': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/under-armour/',
    officialImage: '/images/under-armour.jpg',
  },
  'harley-davidson': {
    officialUrl: 'https://www.disneysprings.com/shopping/harley-davidson/',
    officialImage: null,
  },

  // Shoes
  'sperry': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/sperry/',
    officialImage: '/images/sperry.jpg',
  },
  'havaianas': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/havaianas/',
    officialImage: null,
  },
  'fit2run': {
    officialUrl: 'https://www.disneysprings.com/shopping/fit2run/',
    officialImage: null,
  },
  'johnston-murphy': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/johnston-murphy/',
    officialImage: '/images/johnston-murphy.jpg',
  },
  'rothys': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/rothys/',
    officialImage: '/images/rothys.jpg',
  },
  'olukai': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/olukai/',
    officialImage: '/images/olukai.jpg',
  },

  // Jewelry & Accessories
  'pandora': {
    officialUrl: 'https://www.disneysprings.com/shopping/pandora/',
    officialImage: null,
  },
  'kendra-scott': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/kendra-scott/',
    officialImage: '/images/kendra-scott.jpg',
  },
  'na-hoku': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/na-hoku/',
    officialImage: '/images/na-hoku.jpg',
  },
  'luxury-of-time': {
    officialUrl: 'https://www.disneysprings.com/shopping/luxury-of-time/',
    officialImage: null,
  },
  'unode50': {
    officialUrl: 'https://www.disneysprings.com/shopping/unode50/',
    officialImage: null,
  },
  'chapel-hats': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/chapel-hats/',
    officialImage: '/images/chapel-hats.jpg',
  },
  'pura-vida': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/pura-vida/',
    officialImage: '/images/pura-vida.jpg',
  },

  // Beauty & Personal Care
  'basin': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/basin/',
    officialImage: '/images/basin.jpg',
  },
  'sephora': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/sephora/',
    officialImage: '/images/sephora.jpg',
  },
  'mac-cosmetics': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/mac-cosmetics/',
    officialImage: '/images/mac-cosmetics.jpg',
  },
  'loccitane': {
    officialUrl: 'https://www.disneysprings.com/shopping/loccitane/',
    officialImage: null,
  },
  'rinse-bath': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/rinse-bath/',
    officialImage: null,
  },

  // Home, Gifts & Specialty
  'coca-cola-store': {
    officialUrl: 'https://www.disneysprings.com/shopping/coca-cola-store/',
    officialImage: null,
  },
  'mms-store': {
    officialUrl: 'https://www.disneysprings.com/shopping/mms-store/',
    officialImage: null,
  },
  'vera-bradley': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/vera-bradley/',
    officialImage: '/images/vera-bradley.jpg',
  },
  'kate-spade': {
    officialUrl: 'https://www.disneysprings.com/shopping/kate-spade/',
    officialImage: null,
  },
  'coach': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/coach/',
    officialImage: '/images/coach.jpg',
  },
  'sugarboo': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/sugarboo/',
    officialImage: null,
  },
  'lovepop': {
    officialUrl: 'https://www.disneysprings.com/shopping/lovepop/',
    officialImage: null,
  },
  'spice-tea-exchange': {
    officialUrl: 'https://www.disneysprings.com/shopping/spice-tea-exchange/',
    officialImage: null,
  },
  'pop-gallery': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/pop-gallery/',
    officialImage: '/images/pop-gallery.jpg',
  },
  'lefty-store': {
    officialUrl: 'https://www.disneysprings.com/shopping/lefty-store/',
    officialImage: null,
  },
  'sublime-gifts': {
    officialUrl: 'https://www.disneysprings.com/shopping/sublime-gifts/',
    officialImage: null,
  },
  'swings-n-things': {
    officialUrl: 'https://www.disneysprings.com/shopping/swings-n-things/',
    officialImage: null,
  },
  'boathouse-boutique': {
    officialUrl: 'https://www.disneysprings.com/shopping/boathouse-boutique/',
    officialImage: null,
  },
  'shop-for-ireland': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/shop-for-ireland/',
    officialImage: null,
  },
  'planet-hollywood-store': {
    officialUrl: 'https://www.disneysprings.com/shopping/planet-hollywood-store/',
    officialImage: null,
  },
  'hob-gear-shop': {
    officialUrl: 'https://www.disneysprings.com/shopping/hob-gear-shop/',
    officialImage: null,
  },
  'bowes-candles': {
    officialUrl: 'https://www.disneysprings.com/shopping/bowes-candles/',
    officialImage: null,
  },

  // Sunglasses & Eyewear
  'oakley': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/oakley/',
    officialImage: '/images/oakley.jpg',
  },
  'sunglass-hut': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/sunglass-hut/',
    officialImage: '/images/sunglass-hut.jpg',
  },
  'edward-beiner': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/edward-beiner/',
    officialImage: '/images/edward-beiner.jpg',
  },

  // Sports & Socks
  'pele-soccer': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/pele-soccer/',
    officialImage: null,
  },
  'stance': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/stance/',
    officialImage: '/images/stance.jpg',
  },
  'just-fun-socks': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/just-fun-socks/',
    officialImage: '/images/just-fun-socks.jpg',
  },

  // Misc
  'happy-hound': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/happy-hound/',
    officialImage: '/images/happy-hound.jpg',
  },
  'silhouette-portraits': {
    officialUrl: 'https://www.disneysprings.com/shopping/silhouette-portraits/',
    officialImage: null,
  },
  'art-corner': {
    officialUrl: 'https://www.disneysprings.com/shopping/art-corner/',
    officialImage: null,
  },
  'pearl-factory': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/pearl-factory/',
    officialImage: '/images/pearl-factory.jpg',
  },
  'initial-rings': {
    officialUrl: 'https://disneyworld.disney.go.com/shops/disney-springs/initial-rings/',
    officialImage: '/images/initial-rings.jpg',
  },
};

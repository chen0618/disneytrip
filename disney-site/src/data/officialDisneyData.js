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

  // ═══════════════════════════════════════════════════════════════
  // SHOWS & ENTERTAINMENT (12)
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
};

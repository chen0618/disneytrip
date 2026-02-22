export const morningTimeline = [
  { time: '6:45 AM', title: 'Minnie Van Pickup', desc: 'Called to Pop Century' },
  { time: '~7:15 AM', title: 'Arrive at Park', desc: 'Beat the first buses' },
  { time: '~7:45 AM', title: 'Gates Open', desc: 'Disney starts letting guests in' },
  { time: '8:30 AM', title: 'Rides Running!', desc: 'Early Entry begins, lines are short' },
];

export const standardStrategy = {
  badge: 'Standard Approach',
  title: '🚍 Take the Resort Bus',
  description: "Free and convenient, but you'll arrive later than the most eager guests.",
  items: [
    { icon: '🕐', text: 'First buses leave Pop Century ~7:20\u20137:30 AM' },
    { icon: '🚶', text: 'Arrive at park ~7:45\u20138:00 AM' },
    { icon: '👥', text: 'Long lines already forming at security & tapstiles' },
    { icon: '🔄', text: 'People who drove or took rideshare are already ahead of you' },
  ],
};

export const proStrategy = {
  badge: '⭐ Our Strategy',
  title: '🚕 Call a Minnie Van',
  description: "Disney's own ride service (through Lyft). We call one around 6:45\u20136:50 AM to beat the buses!",
  items: [
    { icon: '🚗', text: 'Picked up at Pop Century ~6:50 AM' },
    { icon: '⚡', text: 'Arrive at the park before any buses do' },
    { icon: '🏆', text: 'First in line at security & tapstiles' },
    { icon: '🎮', text: 'Ride 2\u20133 big rides with almost no wait before regular opening!' },
  ],
};

export const coffeeStrategy = {
  title: '☕ The Coffee Split Strategy',
  description: "Our morning hack: as soon as we enter the park, we split up. The dads beeline straight to the closest Starbucks (every park has one near the entrance) while everyone else heads directly to the first big ride. The dads grab coffee for the group, then catch up and hold a spot in the standby line. This way nobody misses out on short early-morning waits AND everyone gets their caffeine fix.",
};

const travelGroup = [
  // Our family
  { name: 'Andrew', role: 'Dad / Trip Planner', emoji: '🧔🏻', family: 'andrew' },
  { name: 'Rosy', role: 'Mom', emoji: '👩🏻', family: 'andrew' },
  { name: 'Luna', role: 'Age 4.5 • ~41–42"', emoji: '👧🏻', isKid: true, family: 'andrew' },
  { name: 'Clara', role: 'Age 2 yr 9 mo • ~34–35"', emoji: '👶🏻', isKid: true, family: 'andrew' },
  // Rosy's parents
  { name: 'Tuc', role: 'Grandpa (Ông Ngoại)', emoji: '👨🏻', family: 'grandparents' },
  { name: 'Oanh', role: 'Grandma (Bà Ngoại)', emoji: '👩🏻', family: 'grandparents' },
  // Rosy's siblings & their partners
  { name: 'Teresa', role: "Rosy's Sister", emoji: '👩🏻', family: 'teresa' },
  { name: 'James', role: "Rosy's Brother", emoji: '👨🏻', family: 'teresa' },
  { name: 'Sandy', role: "Rosy's Sister", emoji: '👩🏻', family: 'sandy' },
  { name: 'Gavin', role: "Sandy's Husband", emoji: '👨🏻', family: 'sandy' },
  { name: 'Paul', role: "Rosy's Brother", emoji: '👨🏻', family: 'paul' },
  { name: 'Kayla', role: "Paul's Girlfriend", emoji: '👩🏻', family: 'paul' },
  // Close friends — Natali & Alex's family
  { name: 'Natali', role: 'Close Friend', emoji: '👩🏻', family: 'natali' },
  { name: 'Alex', role: 'Close Friend', emoji: '👨🏻', family: 'natali' },
  { name: 'Esme', role: 'Kid', emoji: '👧🏻', isKid: true, family: 'natali' },
  { name: 'Eli', role: 'Kid', emoji: '👦🏻', isKid: true, family: 'natali' },
  // Close friends — AJ & Amy's family (AJ is Luna's Godfather)
  { name: 'AJ', role: "Luna's Godfather", emoji: '👨🏻', family: 'aj' },
  { name: 'Amy', role: 'Close Friend', emoji: '👩🏻', family: 'aj' },
  { name: 'Liam', role: 'Kid', emoji: '👦🏻', isKid: true, family: 'aj' },
  { name: 'Asher', role: 'Kid', emoji: '👦🏻', isKid: true, family: 'aj' },
];

export const familyLabels = {
  andrew: 'Us',
  grandparents: 'Grandparents',
  teresa: 'Teresa & James',
  sandy: 'Sandy & Gavin',
  paul: 'Paul & Kayla',
  natali: 'Natali & Alex',
  aj: 'AJ & Amy',
};

export const familyOrder = ['andrew', 'grandparents', 'teresa', 'sandy', 'paul', 'natali', 'aj'];

export default travelGroup;

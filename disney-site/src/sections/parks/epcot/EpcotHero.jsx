import ParkHeroSection from '../shared/ParkHeroSection';

const themeVars = {
  '--hero-gradient': 'linear-gradient(135deg, rgba(180, 150, 0, 0.82) 0%, rgba(255, 215, 0, 0.7) 40%, rgba(255, 230, 80, 0.65) 100%)',
  '--hero-bg-image': "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Spaceship_Earth_2.jpg/960px-Spaceship_Earth_2.jpg')",
  '--hero-accent': 'var(--white)',
  '--hero-text-shadow': '0 2px 8px rgba(0,0,0,0.2)',
  '--hero-tagline-opacity': '0.95',
  '--hero-tagline-max-width': '650px',
};

const stats = [
  { value: '12', label: 'Rides' },
  { value: '11', label: 'Countries' },
  { value: '1', label: 'Park Day' },
];

export default function EpcotHero() {
  return (
    <ParkHeroSection
      id="epcot-hero"
      title="EPCOT"
      tagline="Eat, drink, and ride around the world — where every country is a new adventure."
      stats={stats}
      scrollTo="epcot-food-tour"
      themeVars={themeVars}
    />
  );
}

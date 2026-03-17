import ParkHeroSection from '../shared/ParkHeroSection';

const themeVars = {
  '--hero-gradient': 'linear-gradient(135deg, rgba(120, 100, 220, 0.85) 0%, rgba(162, 155, 254, 0.75) 40%, rgba(180, 170, 255, 0.7) 100%)',
  '--hero-bg-image': "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Hollywood_Tower_Hotel.jpg/960px-Hollywood_Tower_Hotel.jpg')",
};

const sparkles = [
  { left: '8%', top: '25%', dur: '3.2s', delay: '0s' },
  { left: '22%', top: '65%', dur: '2.8s', delay: '0.5s' },
  { left: '42%', top: '35%', dur: '3.5s', delay: '1s' },
  { left: '58%', top: '72%', dur: '2.6s', delay: '0.3s' },
  { left: '72%', top: '20%', dur: '3.1s', delay: '0.8s' },
  { left: '88%', top: '50%', dur: '2.9s', delay: '1.2s' },
  { left: '14%', top: '82%', dur: '3.4s', delay: '0.7s' },
  { left: '62%', top: '12%', dur: '2.7s', delay: '1.5s' },
  { left: '35%', top: '88%', dur: '3s', delay: '0.2s' },
  { left: '78%', top: '42%', dur: '3.3s', delay: '1.1s' },
];

const stats = [
  { value: '9', label: 'Rides' },
  { value: '5', label: 'Themed Lands' },
  { value: '1', label: 'Park Day' },
];

export default function HSHero() {
  return (
    <ParkHeroSection
      id="hs-hero"
      title="Hollywood Studios"
      tagline="Where movies come to life — immersive worlds, epic thrills, and showstopping entertainment."
      stats={stats}
      scrollTo="hs-galaxys-edge"
      themeVars={themeVars}
      sparkles={sparkles}
    />
  );
}

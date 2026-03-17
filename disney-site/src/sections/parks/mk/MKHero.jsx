import ParkHeroSection from '../shared/ParkHeroSection';

const themeVars = {
  '--hero-gradient': 'linear-gradient(135deg, rgba(255, 80, 80, 0.85) 0%, rgba(255, 107, 107, 0.75) 40%, rgba(255, 155, 155, 0.7) 100%)',
  '--hero-bg-image': "url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Walt_Disney_World_Cinderella_Castle_in_2021.jpg/1920px-Walt_Disney_World_Cinderella_Castle_in_2021.jpg')",
};

const stats = [
  { value: '30+', label: 'Attractions' },
  { value: '6', label: 'Themed Lands' },
  { value: '2', label: 'Park Days' },
];

export default function MKHero() {
  return (
    <ParkHeroSection
      id="mk-hero"
      title="Magic Kingdom"
      tagline="The park that started it all — where fairy tales and fireworks come to life."
      stats={stats}
      scrollTo="mk-lands"
      themeVars={themeVars}
    />
  );
}

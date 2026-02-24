import ActiveSectionProvider from '../context/ActiveSectionContext';
import FloatingNav from '../components/FloatingNav/FloatingNav';
import useScrollReveal from '../hooks/useScrollReveal';
import WaveDivider from '../components/WaveDivider';
import ParkMiniMap from '../components/ParkMiniMap/ParkMiniMap';
import { mkNavSections } from '../data/magicKingdomData';
import { mapRides } from '../data/mapRides';
import { parkBoundaries } from '../data/parkBoundaries';

import MKHero from '../sections/parks/mk/MKHero';
import LandsExplorer from '../sections/parks/mk/LandsExplorer';
import MKRides from '../sections/parks/mk/MKRides';
import MKShows from '../sections/parks/mk/MKShows';
import MKDining from '../sections/parks/mk/MKDining';
import HiddenMagic from '../sections/parks/mk/HiddenMagic';
import MKStrategy from '../sections/parks/mk/MKStrategy';
import MKShopping from '../sections/parks/mk/MKShopping';

export default function MagicKingdomPage() {
  useScrollReveal();

  const mkBoundary = parkBoundaries.find((b) => b.id === 'mk');
  const mkRides = mapRides.filter((r) => r.park === 'Magic Kingdom');
  const mkMarkers = mkRides.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    emoji: r.emoji,
    name: r.name,
    id: r.id,
  }));

  return (
    <ActiveSectionProvider>
      <FloatingNav
        sections={mkNavSections}
        extraLinks={[{ to: '/', icon: '🏠', label: 'Back to Home' }]}
      />
      <MKHero />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <LandsExplorer />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <MKRides />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <MKShows />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <MKDining />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <HiddenMagic />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <MKStrategy />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <section id="mk-map" style={{ background: 'var(--bg-alt)', padding: '5rem 2rem' }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <h2>Park Map</h2>
            <p className="subtitle">Explore Magic Kingdom rides and attractions</p>
          </div>
          <ParkMiniMap
            parkId="mk"
            markers={mkMarkers}
            boundary={mkBoundary?.coords}
            center={[28.4195, -81.5812]}
            zoom={16}
            color="#FF6B6B"
          />
        </div>
      </section>
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <MKShopping />
    </ActiveSectionProvider>
  );
}

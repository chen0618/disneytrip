import ActiveSectionProvider from '../context/ActiveSectionContext';
import FloatingNav from '../components/FloatingNav/FloatingNav';
import useScrollReveal from '../hooks/useScrollReveal';
import useActiveSection from '../hooks/useActiveSection';
import WaveDivider from '../components/WaveDivider';
import ParkMiniMap from '../components/ParkMiniMap/ParkMiniMap';
import { hsNavSections } from '../data/hollywoodStudiosData';
import { mapRides } from '../data/mapRides';
import { parkBoundaries } from '../data/parkBoundaries';

import HSHero from '../sections/parks/hs/HSHero';
import GalaxysEdge from '../sections/parks/hs/GalaxysEdge';
import ToyStoryLand from '../sections/parks/hs/ToyStoryLand';
import HSRides from '../sections/parks/hs/HSRides';
import ThrillGuide from '../sections/parks/hs/ThrillGuide';
import HSShows from '../sections/parks/hs/HSShows';
import HSDining from '../sections/parks/hs/HSDining';
import HSStrategy from '../sections/parks/hs/HSStrategy';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/BackToTop/BackToTop';

function HSContent() {
  useScrollReveal();
  useActiveSection();

  const hsBoundary = parkBoundaries.find((b) => b.id === 'hs');
  const hsRides = mapRides.filter((r) => r.park === 'Hollywood Studios');
  const hsMarkers = hsRides.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    emoji: r.emoji,
    name: r.name,
    id: r.id,
  }));

  return (
    <>
      <FloatingNav
        sections={hsNavSections}
        extraLinks={[{ to: '/', icon: '🏠', label: 'Back to Home' }]}
      />
      <HSHero />
      {/* hero (bg-alt via wave) -> Galaxy's Edge (bg-alt) */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <GalaxysEdge />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <ToyStoryLand />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <HSRides />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <ThrillGuide />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <HSShows />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <HSDining />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <HSStrategy />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <section id="hs-map" style={{ background: 'var(--bg)', padding: '5rem 2rem' }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <h2>Park Map</h2>
            <p className="subtitle">Explore Hollywood Studios rides and attractions</p>
          </div>
          <ParkMiniMap
            parkId="hs"
            markers={hsMarkers}
            boundary={hsBoundary?.coords}
            center={[28.3572, -81.5590]}
            zoom={16}
            color="#A29BFE"
          />
        </div>
      </section>
      <Footer variant="park" currentPark="/park/hollywood-studios" />
      <BackToTop />
    </>
  );
}

export default function HollywoodStudiosPage() {
  return (
    <ActiveSectionProvider>
      <HSContent />
    </ActiveSectionProvider>
  );
}

import ActiveSectionProvider from '../context/ActiveSectionContext';
import FloatingNav from '../components/FloatingNav/FloatingNav';
import useScrollReveal from '../hooks/useScrollReveal';
import WaveDivider from '../components/WaveDivider';
import ParkMiniMap from '../components/ParkMiniMap/ParkMiniMap';
import { epcotNavSections } from '../data/epcotData';
import { mapRides } from '../data/mapRides';
import { parkBoundaries } from '../data/parkBoundaries';

import EpcotHero from '../sections/parks/epcot/EpcotHero';
import WorldShowcase from '../sections/parks/epcot/WorldShowcase';
import EpcotRides from '../sections/parks/epcot/EpcotRides';
import FestivalGuide from '../sections/parks/epcot/FestivalGuide';
import CountryGuide from '../sections/parks/epcot/CountryGuide';
import BestForKids from '../sections/parks/epcot/BestForKids';
import EpcotDining from '../sections/parks/epcot/EpcotDining';
import EpcotStrategy from '../sections/parks/epcot/EpcotStrategy';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/BackToTop/BackToTop';

export default function EpcotPage() {
  useScrollReveal();

  const epcotBoundary = parkBoundaries.find((b) => b.id === 'epcot');
  const epcotRides = mapRides.filter((r) => r.park === 'EPCOT');
  const epcotMarkers = epcotRides.map((r) => ({
    lat: r.lat,
    lng: r.lng,
    emoji: r.emoji,
    name: r.name,
    id: r.id,
  }));

  return (
    <ActiveSectionProvider>
      <FloatingNav
        sections={epcotNavSections}
        extraLinks={[{ to: '/', icon: '\uD83C\uDFE0', label: 'Back to Home' }]}
      />
      <EpcotHero />
      {/* hero (bg-alt via wave) -> WorldShowcase (bg-alt) */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <WorldShowcase />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <EpcotRides />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <FestivalGuide />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <CountryGuide />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <BestForKids />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={3} />
      <EpcotDining />
      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={4} />
      <EpcotStrategy />
      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={1} />
      <section id="epcot-map" style={{ background: 'var(--bg)', padding: '5rem 2rem' }}>
        <div className="section-inner">
          <div className="section-header reveal">
            <h2>Park Map</h2>
            <p className="subtitle">Explore EPCOT rides and attractions</p>
          </div>
          <ParkMiniMap
            parkId="epcot"
            markers={epcotMarkers}
            boundary={epcotBoundary?.coords}
            center={[28.3735, -81.5494]}
            zoom={15}
            color="#FFD700"
          />
        </div>
      </section>
      <Footer variant="park" currentPark="/park/epcot" />
      <BackToTop />
    </ActiveSectionProvider>
  );
}

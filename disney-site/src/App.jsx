import ActiveSectionProvider from './context/ActiveSectionContext';
import useScrollReveal from './hooks/useScrollReveal';
import useActiveSection from './hooks/useActiveSection';
import FloatingNav from './components/FloatingNav/FloatingNav';
import Hero from './sections/Hero/Hero';
import Timeline from './sections/Timeline/Timeline';
import DisneySprings from './sections/DisneySprings/DisneySprings';
import Hotel from './sections/Hotel/Hotel';
import Transportation from './sections/Transportation/Transportation';
import MagicKingdom from './sections/MagicKingdom/MagicKingdom';
import HollywoodStudios from './sections/HollywoodStudios/HollywoodStudios';
import Epcot from './sections/Epcot/Epcot';
import RopeDrop from './sections/RopeDrop/RopeDrop';
import LightningLane from './sections/LightningLane/LightningLane';
import PhotoPass from './sections/PhotoPass/PhotoPass';
import DisneySnacks from './sections/DisneySnacks/DisneySnacks';
import HeightGuide from './sections/HeightGuide/HeightGuide';
import ShowsAndFireworks from './sections/ShowsAndFireworks/ShowsAndFireworks';
import Footer from './components/Footer/Footer';

function AppContent() {
  useScrollReveal();
  useActiveSection();

  return (
    <>
      <FloatingNav />
      <Hero />
      <Timeline />
      <Hotel />
      <Transportation />
      <RopeDrop />
      <LightningLane />
      <PhotoPass />
      <DisneySprings />
      <MagicKingdom />
      <HollywoodStudios />
      <Epcot />
      <HeightGuide />
      <ShowsAndFireworks />
      <DisneySnacks />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ActiveSectionProvider>
      <AppContent />
    </ActiveSectionProvider>
  );
}

import ActiveSectionProvider from './context/ActiveSectionContext';
import useScrollReveal from './hooks/useScrollReveal';
import useActiveSection from './hooks/useActiveSection';
import FloatingNav from './components/FloatingNav/FloatingNav';
import Hero from './sections/Hero/Hero';
import Timeline from './sections/Timeline/Timeline';
import BeforeYouGo from './sections/BeforeYouGo/BeforeYouGo';
import Hotel from './sections/Hotel/Hotel';
import Transportation from './sections/Transportation/Transportation';
import RopeDrop from './sections/RopeDrop/RopeDrop';
import LightningLane from './sections/LightningLane/LightningLane';
import PhotoPass from './sections/PhotoPass/PhotoPass';
import Footer from './components/Footer/Footer';

function AppContent() {
  useScrollReveal();
  useActiveSection();

  return (
    <>
      <FloatingNav />
      <Hero />
      <Timeline />
      <BeforeYouGo />
      <Hotel />
      <Transportation />
      <RopeDrop />
      <LightningLane />
      <PhotoPass />
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

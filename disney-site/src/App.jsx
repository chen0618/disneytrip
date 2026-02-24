import ActiveSectionProvider from './context/ActiveSectionContext';
import useScrollReveal from './hooks/useScrollReveal';
import useActiveSection from './hooks/useActiveSection';
import FloatingNav from './components/FloatingNav/FloatingNav';
import Hero from './sections/Hero/Hero';
import Timeline from './sections/Timeline/Timeline';
import BeforeYouGo from './sections/BeforeYouGo/BeforeYouGo';
import WhatsNew from './sections/WhatsNew/WhatsNew';
import Hotel from './sections/Hotel/Hotel';
import Transportation from './sections/Transportation/Transportation';
import RopeDrop from './sections/RopeDrop/RopeDrop';
import LightningLane from './sections/LightningLane/LightningLane';
import PhotoPass from './sections/PhotoPass/PhotoPass';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';

function AppContent() {
  useScrollReveal();
  useActiveSection();

  return (
    <>
      <FloatingNav />
      <Hero />
      <Timeline />
      <BeforeYouGo />
      <WhatsNew />
      <Hotel />
      <Transportation />
      <RopeDrop />
      <LightningLane />
      <PhotoPass />
      <Footer />
      <BackToTop />
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

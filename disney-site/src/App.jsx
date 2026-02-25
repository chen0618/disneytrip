import ActiveSectionProvider from './context/ActiveSectionContext';
import useScrollReveal from './hooks/useScrollReveal';
import useActiveSection from './hooks/useActiveSection';
import FloatingNav from './components/FloatingNav/FloatingNav';
import Hero from './sections/Hero/Hero';
import Timeline from './sections/Timeline/Timeline';
import WhatsNew from './sections/WhatsNew/WhatsNew';
import Hotel from './sections/Hotel/Hotel';
import Transportation from './sections/Transportation/Transportation';
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
      <WhatsNew />
      <Hotel />
      <Transportation />
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

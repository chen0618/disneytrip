import ActiveSectionProvider from '../context/ActiveSectionContext';
import FloatingNav from '../components/FloatingNav/FloatingNav';
import useScrollReveal from '../hooks/useScrollReveal';
import useActiveSection from '../hooks/useActiveSection';
import WaveDivider from '../components/WaveDivider';
import guideNavSections from '../data/guideNavSections';

import BeforeYouGo from '../sections/BeforeYouGo/BeforeYouGo';
import RopeDrop from '../sections/RopeDrop/RopeDrop';
import LightningLane from '../sections/LightningLane/LightningLane';
import PhotoPass from '../sections/PhotoPass/PhotoPass';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/BackToTop/BackToTop';

import styles from './GuidePage.module.css';

function GuideContent() {
  useScrollReveal();
  useActiveSection();

  return (
    <>
      <FloatingNav
        sections={guideNavSections}
        extraLinks={[{ to: '/', icon: '\u{1F3E0}', label: 'Back to Home' }]}
      />

      {/* Hero — gradient bg */}
      <section id="guide-hero" className={styles.hero}>
        <div className={styles.content}>
          <p className={styles.pre}>Walt Disney World 2027</p>
          <h1 className={styles.title}>Planning Guide</h1>
          <p className={styles.subtitle}>
            Everything you need to know before you go — tips, strategies, and park-day essentials
          </p>
        </div>
      </section>

      {/* hero (gradient) -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={2} />
      <BeforeYouGo />

      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={3} />
      <RopeDrop />

      {/* bg-alt -> bg */}
      <WaveDivider position="top" fill="var(--bg)" variant={4} />
      <LightningLane />

      {/* bg -> bg-alt */}
      <WaveDivider position="top" fill="var(--bg-alt)" variant={1} />
      <PhotoPass />

      <Footer variant="park" currentPark="/guide" />
      <BackToTop />
    </>
  );
}

export default function GuidePage() {
  return (
    <ActiveSectionProvider>
      <GuideContent />
    </ActiveSectionProvider>
  );
}

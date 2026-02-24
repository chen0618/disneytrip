import { useEffect, useContext, useRef } from 'react';
import { SetActiveSectionContext } from '../context/ActiveSectionContext';

export default function useActiveSection() {
  const setActiveSection = useContext(SetActiveSectionContext);
  const activeRef = useRef('hero');
  const rafRef = useRef(null);

  useEffect(() => {
    function update() {
      const sections = document.querySelectorAll('section[id]');
      const cutoff = window.innerHeight * 0.3;
      let current = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= cutoff) {
          current = section.id;
        }
      }
      if (current && current !== activeRef.current) {
        activeRef.current = current;
        setActiveSection(current);
      }
      rafRef.current = null;
    }

    function onScroll() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // set initial state
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [setActiveSection]);
}

import { useEffect, useContext } from 'react';
import { SetActiveSectionContext } from '../context/ActiveSectionContext';

export default function useActiveSection() {
  const setActiveSection = useContext(SetActiveSectionContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);
}

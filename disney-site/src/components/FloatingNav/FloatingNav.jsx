import { useContext } from 'react';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import navSections from '../../data/navSections';
import styles from './FloatingNav.module.css';

export default function FloatingNav() {
  const activeSection = useContext(ActiveSectionContext);

  function handleClick(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={styles.nav} aria-label="Page sections">
      {navSections.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.dot} ${activeSection === id ? styles.dotActive : ''}`}
          aria-label={label}
          onClick={() => handleClick(id)}
        >
          <span className={styles.tooltip}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

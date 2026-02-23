import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import navSections from '../../data/navSections';
import styles from './FloatingNav.module.css';

export default function FloatingNav({ sections, extraLinks }) {
  const activeSection = useContext(ActiveSectionContext);
  const sectionList = sections || navSections;

  function handleClick(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={styles.nav} aria-label="Page sections">
      {sectionList.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.dot} ${activeSection === id ? styles.dotActive : ''}`}
          aria-label={label}
          onClick={() => handleClick(id)}
        >
          <span className={styles.tooltip}>{label}</span>
        </button>
      ))}
      {extraLinks?.map(({ to, icon, label }) => (
        <Link key={to} to={to} className={styles.mapLink} aria-label={label}>
          <span className={styles.mapIcon}>{icon}</span>
          <span className={styles.tooltip}>{label}</span>
        </Link>
      ))}
      <Link to="/map" className={styles.mapLink} aria-label="Interactive Map">
        <span className={styles.mapIcon}>🗺️</span>
        <span className={styles.tooltip}>Interactive Map</span>
      </Link>
    </nav>
  );
}

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import useDarkMode from '../../hooks/useDarkMode';
import navSections from '../../data/navSections';
import styles from './FloatingNav.module.css';

export default function FloatingNav({ sections, extraLinks }) {
  const activeSection = useContext(ActiveSectionContext);
  const [dark, toggleDark] = useDarkMode();
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
      <button
        className={styles.mapLink}
        onClick={toggleDark}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className={styles.mapIcon}>{dark ? '☀️' : '🌙'}</span>
        <span className={styles.tooltip}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </nav>
  );
}

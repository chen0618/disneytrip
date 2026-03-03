import { useContext, useState, useCallback, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';
import useDarkMode from '../../hooks/useDarkMode';
import navSections from '../../data/navSections';
import styles from './FloatingNav.module.css';

export default function FloatingNav({ sections, extraLinks }) {
  const activeSection = useContext(ActiveSectionContext);
  const [dark, toggleDark] = useDarkMode();
  const navigate = useNavigate();
  const sectionList = sections || navSections;
  const [touchedId, setTouchedId] = useState(null);
  const navRef = useRef(null);
  const touchedIdRef = useRef(null);

  // Find the closest nav item to a touch Y-coordinate (no dead zones)
  const getClosestItem = useCallback((touchY) => {
    if (!navRef.current) return null;
    const items = navRef.current.querySelectorAll('[data-nav-id]');
    let closest = null;
    let minDist = Infinity;
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const dist = Math.abs(touchY - centerY);
      if (dist < minDist) {
        minDist = dist;
        closest = item.dataset.navId;
      }
    }
    return closest;
  }, []);

  const onTouchStart = useCallback((e) => {
    const id = getClosestItem(e.touches[0].clientY);
    if (id) {
      touchedIdRef.current = id;
      setTouchedId(id);
    }
  }, [getClosestItem]);

  const onTouchMove = useCallback((e) => {
    const id = getClosestItem(e.touches[0].clientY);
    if (id && id !== touchedIdRef.current) {
      touchedIdRef.current = id;
      setTouchedId(id);
    }
  }, [getClosestItem]);

  const onTouchEnd = useCallback(() => {
    const id = touchedIdRef.current;
    if (id === '__map') {
      navigate('/map');
    } else if (id === '__dark') {
      toggleDark();
    } else if (id?.startsWith('__link:')) {
      navigate(id.slice(7));
    } else if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    touchedIdRef.current = null;
    setTouchedId(null);
  }, [navigate, toggleDark]);

  // Desktop mouse-scrub: only on devices with a real hover pointer (not narrow mobile viewports)
  const canHover = useRef(window.matchMedia('(hover: hover) and (min-width: 769px)').matches);
  useEffect(() => {
    const mql = window.matchMedia('(hover: hover) and (min-width: 769px)');
    const handler = (e) => { canHover.current = e.matches; };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!canHover.current) return;
    const id = getClosestItem(e.clientY);
    if (id && id !== touchedIdRef.current) {
      touchedIdRef.current = id;
      setTouchedId(id);
    }
  }, [getClosestItem]);

  const onMouseLeave = useCallback(() => {
    if (!canHover.current) return;
    touchedIdRef.current = null;
    setTouchedId(null);
  }, []);

  function handleClick(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  const isTouching = touchedId !== null;

  return (
    <nav
      className={`${styles.nav} ${isTouching ? styles.navTouching : ''}`}
      aria-label="Page sections"
      ref={navRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {sectionList.map(({ id, label }) => (
        <button
          key={id}
          data-nav-id={id}
          className={`${styles.dot} ${activeSection === id ? styles.dotActive : ''} ${touchedId === id ? styles.itemTouched : ''}`}
          aria-label={label}
          onClick={() => handleClick(id)}
        >
          <span className={styles.tooltip}>{label}</span>
        </button>
      ))}
      {extraLinks?.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          data-nav-id={`__link:${to}`}
          className={`${styles.mapLink} ${touchedId === `__link:${to}` ? styles.itemTouched : ''}`}
          aria-label={label}
        >
          <span className={styles.mapIcon}>{icon}</span>
          <span className={styles.tooltip}>{label}</span>
        </Link>
      ))}
      <Link
        to="/map"
        data-nav-id="__map"
        className={`${styles.mapLink} ${touchedId === '__map' ? styles.itemTouched : ''}`}
        aria-label="Interactive Map"
      >
        <span className={styles.mapIcon}>🗺️</span>
        <span className={styles.tooltip}>Interactive Map</span>
      </Link>
      <button
        data-nav-id="__dark"
        className={`${styles.mapLink} ${touchedId === '__dark' ? styles.itemTouched : ''}`}
        onClick={toggleDark}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className={styles.mapIcon}>{dark ? '☀️' : '🌙'}</span>
        <span className={styles.tooltip}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import WaveDivider from '../WaveDivider';
import styles from './Footer.module.css';

const parkPages = [
  { path: '/park/magic-kingdom', label: 'Magic Kingdom' },
  { path: '/park/hollywood-studios', label: 'Hollywood Studios' },
  { path: '/park/epcot', label: 'EPCOT' },
  { path: '/guide', label: 'Planning Guide' },
];

export default function Footer({ variant, currentPark }) {
  if (variant === 'park') {
    const otherPages = parkPages.filter((p) => p.path !== currentPark);

    return (
      <footer className={styles.footer}>
        <WaveDivider position="top" fill="var(--text)" variant={2} />
        <div className={styles.links}>
          <Link to="/" className={styles.mapCta}>
            🏠 Back to Trip Home
          </Link>
          <div className={styles.secondaryLinks}>
            <Link to="/map" className={styles.link}>Interactive Map</Link>
            {otherPages.map((p) => (
              <Link key={p.path} to={p.path} className={styles.link}>{p.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/map" className={styles.mapCta}>
          🗺️ Explore the Interactive Map
        </Link>
        <div className={styles.secondaryLinks}>
          <Link to="/park/magic-kingdom" className={styles.link}>Magic Kingdom</Link>
          <Link to="/park/hollywood-studios" className={styles.link}>Hollywood Studios</Link>
          <Link to="/park/epcot" className={styles.link}>EPCOT</Link>
          <Link to="/guide" className={styles.link}>Planning Guide</Link>
        </div>
      </div>
    </footer>
  );
}

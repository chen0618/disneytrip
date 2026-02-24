import { Link } from 'react-router-dom';
import WaveDivider from '../../../components/WaveDivider';
import styles from './EpcotHero.module.css';

const sparkles = [
  { left: '10%', top: '20%', dur: '3.2s', delay: '0s' },
  { left: '25%', top: '60%', dur: '2.8s', delay: '0.5s' },
  { left: '40%', top: '30%', dur: '3.5s', delay: '1s' },
  { left: '55%', top: '70%', dur: '2.6s', delay: '0.3s' },
  { left: '70%', top: '18%', dur: '3.1s', delay: '0.8s' },
  { left: '85%', top: '55%', dur: '2.9s', delay: '1.2s' },
  { left: '15%', top: '80%', dur: '3.4s', delay: '0.7s' },
  { left: '60%', top: '15%', dur: '2.7s', delay: '1.5s' },
  { left: '33%', top: '85%', dur: '3s', delay: '0.2s' },
  { left: '80%', top: '40%', dur: '3.3s', delay: '1.1s' },
];

export default function EpcotHero() {
  return (
    <section id="epcot-hero" className={styles.hero}>
      <Link to="/" className={styles.homeLink}>Home</Link>
      <div className={styles.sparkles}>
        {sparkles.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{ left: s.left, top: s.top, '--dur': s.dur, '--delay': s.delay }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.pre}>Walt Disney World</p>
        <h1 className={styles.title}>EPCOT</h1>
        <p className={styles.tagline}>
          Eat, drink, and ride around the world — where every country is a new adventure.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>10</span>
            <span className={styles.statLabel}>Rides</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>11</span>
            <span className={styles.statLabel}>Countries</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Park Day</span>
          </div>
        </div>
      </div>
      <a href="#epcot-food-tour" className={styles.scrollIndicator} aria-label="Scroll to next section">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
      <WaveDivider fill="var(--bg-alt)" variant={1} />
    </section>
  );
}

import { Link } from 'react-router-dom';
import WaveDivider from '../../../components/WaveDivider';
import styles from './HSHero.module.css';

const sparkles = [
  { left: '8%', top: '25%', dur: '3.2s', delay: '0s' },
  { left: '22%', top: '65%', dur: '2.8s', delay: '0.5s' },
  { left: '42%', top: '35%', dur: '3.5s', delay: '1s' },
  { left: '58%', top: '72%', dur: '2.6s', delay: '0.3s' },
  { left: '72%', top: '20%', dur: '3.1s', delay: '0.8s' },
  { left: '88%', top: '50%', dur: '2.9s', delay: '1.2s' },
  { left: '14%', top: '82%', dur: '3.4s', delay: '0.7s' },
  { left: '62%', top: '12%', dur: '2.7s', delay: '1.5s' },
  { left: '35%', top: '88%', dur: '3s', delay: '0.2s' },
  { left: '78%', top: '42%', dur: '3.3s', delay: '1.1s' },
];

export default function HSHero() {
  return (
    <section id="hs-hero" className={styles.hero}>
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
        <h1 className={styles.title}>Hollywood Studios</h1>
        <p className={styles.tagline}>
          Where movies come to life — immersive worlds, epic thrills, and showstopping entertainment.
        </p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>9</span>
            <span className={styles.statLabel}>Rides</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>5</span>
            <span className={styles.statLabel}>Themed Lands</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>1</span>
            <span className={styles.statLabel}>Park Day</span>
          </div>
        </div>
      </div>
      <a href="#hs-galaxys-edge" className={styles.scrollIndicator} aria-label="Scroll to next section">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
      <WaveDivider fill="var(--bg-alt)" variant={1} />
    </section>
  );
}

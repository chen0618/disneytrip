import { Link } from 'react-router-dom';
import WaveDivider from '../../../components/WaveDivider';
import styles from './ParkHeroSection.module.css';

const DEFAULT_SPARKLES = [
  { left: '10%', top: '20%', dur: '3.2s', delay: '0s' },
  { left: '25%', top: '60%', dur: '2.8s', delay: '0.5s' },
  { left: '40%', top: '30%', dur: '3.5s', delay: '1s' },
  { left: '55%', top: '70%', dur: '2.6s', delay: '0.3s' },
  { left: '70%', top: '25%', dur: '3.1s', delay: '0.8s' },
  { left: '85%', top: '55%', dur: '2.9s', delay: '1.2s' },
  { left: '15%', top: '80%', dur: '3.4s', delay: '0.7s' },
  { left: '60%', top: '15%', dur: '2.7s', delay: '1.5s' },
  { left: '35%', top: '85%', dur: '3s', delay: '0.2s' },
  { left: '80%', top: '40%', dur: '3.3s', delay: '1.1s' },
];

export default function ParkHeroSection({ id, title, tagline, stats, scrollTo, themeVars, sparkles }) {
  const sparkleDots = sparkles || DEFAULT_SPARKLES;
  return (
    <section id={id} className={styles.hero} style={themeVars}>
      <Link to="/" className={styles.homeLink}>Home</Link>
      <div className={styles.sparkles}>
        {sparkleDots.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{ left: s.left, top: s.top, '--dur': s.dur, '--delay': s.delay }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.pre}>Walt Disney World</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.tagline}>{tagline}</p>
        <div className={styles.stats}>
          {stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a href={`#${scrollTo}`} className={styles.scrollIndicator} aria-label="Scroll to next section">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
      <WaveDivider fill="var(--bg-alt)" variant={1} />
    </section>
  );
}

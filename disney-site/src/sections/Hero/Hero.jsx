import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import styles from './Hero.module.css';

const sparkles = [
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
  { left: '50%', top: '50%', dur: '2.5s', delay: '0.6s' },
  { left: '5%', top: '45%', dur: '3.6s', delay: '1.3s' },
  { left: '92%', top: '75%', dur: '2.8s', delay: '0.4s' },
  { left: '45%', top: '10%', dur: '3.1s', delay: '0.9s' },
];

function getCountdownText() {
  const tripDate = new Date('2027-01-16T00:00:00');
  const now = new Date();
  const diffMs = tripDate - now;
  if (diffMs <= 0) return 'Trip complete!';
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return <><span className={styles.countNumber}>{days}</span> days until the magic begins!</>;
}

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
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
        <p className={styles.pre}>A Magical Family Trip</p>
        <h1 className={styles.title}>Our Disney Adventure</h1>
        <p className={styles.date}>January 16–23, 2027</p>
        <p className={styles.countdown}>{getCountdownText()}</p>
        <p className={styles.tagline}>
          Everything you need to know about our week at Walt Disney World &mdash; parks, hotels, transportation, and more!
        </p>
        <div className={styles.parkLinks}>
          <Link to="/park/magic-kingdom" className={styles.parkLink} style={{ background: 'var(--coral)' }}>
            🏰 Magic Kingdom
          </Link>
          <Link to="/park/hollywood-studios" className={styles.parkLink} style={{ background: 'var(--purple)' }}>
            🎬 Hollywood Studios
          </Link>
          <Link to="/park/epcot" className={styles.parkLink} style={{ background: 'var(--yellow)', color: 'var(--text)' }}>
            🌍 EPCOT
          </Link>
          <Link to="/guide" className={styles.parkLink} style={{ background: 'var(--mint)' }}>
            📋 Planning Guide
          </Link>
        </div>
      </div>
      <a href="#timeline" className={styles.scrollIndicator} aria-label="Scroll to next section">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
      <WaveDivider fill="var(--bg)" variant={1} />
    </section>
  );
}

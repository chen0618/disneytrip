import { mkStrategy, fireworksGuide } from '../../../data/magicKingdomData';
import styles from './MKStrategy.module.css';

const PERIODS = [
  { key: 'morning', label: 'Morning', emoji: '🌅', color: '#f39c12' },
  { key: 'afternoon', label: 'Afternoon', emoji: '☀️', color: '#e74c3c' },
  { key: 'evening', label: 'Evening', emoji: '🌙', color: '#2c3e50' },
];

export default function MKStrategy() {
  return (
    <section id="mk-strategy" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Our MK Strategy</h2>
          <p className="subtitle">The game plan for conquering Magic Kingdom</p>
        </div>

        <div className={styles.columns}>
          {PERIODS.map(({ key, label, emoji, color }) => (
            <div key={key} className={`${styles.column} reveal`}>
              <div className={styles.columnHeader} style={{ background: color }}>
                <span className={styles.periodEmoji}>{emoji}</span>
                <h3 className={styles.periodLabel}>{label}</h3>
              </div>
              <div className={styles.steps}>
                {mkStrategy[key].map((item, i) => (
                  <div key={i} className={styles.step}>
                    <span className={styles.time}>{item.time}</span>
                    <p className={styles.stepText}>{item.step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fireworks Spots Callout */}
        <div className={`${styles.callout} reveal`}>
          <h3 className={styles.calloutTitle}>Fireworks Viewing Tips</h3>
          <p className={styles.calloutDesc}>{fireworksGuide.tips}</p>
          <div className={styles.spotsRow}>
            {fireworksGuide.bestSpots.map((s) => (
              <div key={s.spot} className={styles.spot}>
                <strong>{s.spot}</strong>
                <p>{s.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

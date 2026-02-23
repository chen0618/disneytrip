import { hsStrategy } from '../../../data/hollywoodStudiosData';
import styles from './HSStrategy.module.css';

const PERIODS = [
  { key: 'morning', label: 'Morning', emoji: '🌅', color: '#7c5cbf' },
  { key: 'afternoon', label: 'Afternoon', emoji: '☀️', color: '#a29bfe' },
  { key: 'evening', label: 'Evening', emoji: '🌙', color: '#2c3e50' },
];

export default function HSStrategy() {
  return (
    <section id="hs-strategy" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Our HS Strategy</h2>
          <p className="subtitle">The game plan for conquering Hollywood Studios on January 19</p>
        </div>

        <div className={styles.columns}>
          {PERIODS.map(({ key, label, emoji, color }) => (
            <div key={key} className={`${styles.column} reveal`}>
              <div className={styles.columnHeader} style={{ background: color }}>
                <span className={styles.periodEmoji}>{emoji}</span>
                <h3 className={styles.periodLabel}>{label}</h3>
              </div>
              <div className={styles.steps}>
                {hsStrategy[key].map((item, i) => (
                  <div key={i} className={styles.step}>
                    <span className={styles.time}>{item.time}</span>
                    <p className={styles.stepText}>{item.step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.callout} reveal`}>
          <h3 className={styles.calloutTitle}>Key Reminders</h3>
          <div className={styles.reminders}>
            <div className={styles.reminder}>
              <strong>Rise of the Resistance</strong>
              <p>This is THE rope drop priority. Head straight there during Early Entry at 7:30 AM.</p>
            </div>
            <div className={styles.reminder}>
              <strong>Mobile Order Lunch</strong>
              <p>Order from Docking Bay 7 or Woody's Lunch Box before 10:30 AM to secure a good pickup window.</p>
            </div>
            <div className={styles.reminder}>
              <strong>Fantasmic! Seats</strong>
              <p>Arrive 45-60 minutes early for good seats, or book a dining package for reserved seating.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

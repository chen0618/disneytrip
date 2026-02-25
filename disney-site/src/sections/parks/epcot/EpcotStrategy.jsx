import { Link } from 'react-router-dom';
import { epcotStrategy } from '../../../data/epcotData';
import styles from './EpcotStrategy.module.css';

const PERIODS = [
  { key: 'morning', label: 'Morning', emoji: '🌅', color: '#b8960a' },
  { key: 'afternoon', label: 'Afternoon', emoji: '\u2600\uFE0F', color: '#d4a50a' },
  { key: 'evening', label: 'Evening', emoji: '🌙', color: '#8b7209' },
];

export default function EpcotStrategy() {
  return (
    <section id="epcot-strategy" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Our EPCOT Strategy</h2>
          <p className="subtitle">The game plan for conquering EPCOT on January 21</p>
          <Link to="/#timeline" className={styles.timelineLink}>See this day on the Trip Timeline &rarr;</Link>
        </div>

        <div className={styles.columns}>
          {PERIODS.map(({ key, label, emoji, color }) => (
            <div key={key} className={`${styles.column} reveal`}>
              <div className={styles.columnHeader} style={{ background: color }}>
                <span className={styles.periodEmoji}>{emoji}</span>
                <h3 className={styles.periodLabel}>{label}</h3>
              </div>
              <div className={styles.steps}>
                {epcotStrategy[key].map((item, i) => (
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
              <strong>Guardians Virtual Queue</strong>
              <p>Opens at 7:00 AM and 1:00 PM. Everyone needs a ticket linked to My Disney Experience. Set an alarm for both windows!</p>
            </div>
            <div className={styles.reminder}>
              <strong>World Showcase Opens Later</strong>
              <p>World Showcase countries open at 11 AM (except Norway and France). Use mornings for Future World rides, afternoons for food touring.</p>
            </div>
            <div className={styles.reminder}>
              <strong>Festival of the Arts</strong>
              <p>Food booths open at 11 AM along the World Showcase promenade. Pace yourselves — share plates to try more!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { kidGuide } from '../../../data/epcotData';
import styles from './BestForKids.module.css';

export default function BestForKids() {
  return (
    <section id="epcot-kids" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Best for Kids</h2>
          <p className="subtitle">EPCOT isn't just for adults! Here's what the little ones will love.</p>
        </div>

        <div className={`${styles.callout} reveal`}>
          <p className={styles.calloutText}>
            Little ones will love the Frozen ride and character meets!{' '}
            Toddlers and preschoolers will enjoy the interactive fountains and Kidcot crafts.
          </p>
        </div>

        <div className={styles.kidGrid}>
          {kidGuide.map((item) => (
            <div key={item.name} className={`${styles.kidCard} reveal`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardEmoji}>{item.emoji}</span>
                <div>
                  <h3 className={styles.cardName}>{item.name}</h3>
                  <span className={styles.ageBadge}>{item.ageGroup}</span>
                </div>
              </div>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

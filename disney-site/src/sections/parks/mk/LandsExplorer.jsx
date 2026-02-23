import { lands } from '../../../data/magicKingdomData';
import styles from './LandsExplorer.module.css';

export default function LandsExplorer() {
  return (
    <section id="mk-lands" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Explore the Lands</h2>
          <p className="subtitle">Six immersive worlds to discover</p>
        </div>
        <div className={styles.grid}>
          {lands.map((land) => (
            <div key={land.id} className={`${styles.card} reveal`} style={{ borderTopColor: land.color }}>
              <div className={styles.emoji}>{land.emoji}</div>
              <h3 className={styles.name}>{land.name}</h3>
              <p className={styles.vibe}>{land.vibe}</p>
              <ul className={styles.attractions}>
                {land.topAttractions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

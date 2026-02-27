import { easterEggs } from '../../../data/magicKingdomData';
import styles from './HiddenMagic.module.css';

export default function HiddenMagic() {
  return (
    <section id="mk-hidden" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Hidden Magic</h2>
          <p className="subtitle">Secrets and surprises most guests walk right past</p>
        </div>

        <div className={styles.grid}>
          {easterEggs.map((egg, i) => (
            <div key={egg.title} className={`${styles.card} reveal`}>
              <div className={styles.number}>{i + 1}</div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.emoji}>{egg.emoji}</span>
                  <h3 className={styles.title}>{egg.title}</h3>
                </div>
                <p className={styles.desc}>{egg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

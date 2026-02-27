import { galaxysEdgeGuide } from '../../../data/hollywoodStudiosData';
import styles from './GalaxysEdge.module.css';

export default function GalaxysEdge() {
  return (
    <section id="hs-galaxys-edge" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Galaxy's Edge</h2>
          <p className="subtitle">Step into the planet Batuu — where Cast Members say "Bright Suns" instead of hello!</p>
        </div>

        <div className={styles.grid}>
          {galaxysEdgeGuide.map((item) => (
            <div key={item.id} className={`${styles.card} reveal`}>
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{item.emoji}</span>
                <h3 className={styles.cardName}>{item.name}</h3>
              </div>
              <p className={styles.desc}>{item.description}</p>
              {item.tip && (
                <p className={styles.tip}>{item.tip}</p>
              )}
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

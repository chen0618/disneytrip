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

        <div className={`${styles.callout} reveal`}>
          <h3 className={styles.calloutTitle}>Batuu Survival Tips</h3>
          <div className={styles.calloutGrid}>
            <div className={styles.calloutItem}>
              <strong>Speak the language</strong>
              <p>"Bright Suns" = hello, "Til the Spire" = goodbye, "Ignite the spark" = may the Force be with you</p>
            </div>
            <div className={styles.calloutItem}>
              <strong>Themed Coke bottles</strong>
              <p>Coca-Cola bottles are shaped like thermal detonators — a fun collectible souvenir!</p>
            </div>
            <div className={styles.calloutItem}>
              <strong>Play Disney Parks app</strong>
              <p>Hack into control panels, translate Aurebesh, and scan cargo crates for interactive experiences</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

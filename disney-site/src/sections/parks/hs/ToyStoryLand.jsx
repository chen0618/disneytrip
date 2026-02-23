import { toyStoryLandGuide } from '../../../data/hollywoodStudiosData';
import styles from './ToyStoryLand.module.css';

export default function ToyStoryLand() {
  return (
    <section id="hs-toy-story" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Toy Story Land</h2>
          <p className="subtitle">You've been shrunk to the size of a toy in Andy's backyard!</p>
        </div>

        <div className={`${styles.kidCallout} reveal`}>
          <span className={styles.kidEmoji}>🧒</span>
          <div>
            <strong>Perfect for our little ones!</strong>
            <p>Everything in Toy Story Land is perfect for Luna & Clara's age! Even Clara at 34" can ride Alien Saucers and Toy Story Mania.</p>
          </div>
        </div>

        <div className={styles.grid}>
          {toyStoryLandGuide.map((item) => (
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

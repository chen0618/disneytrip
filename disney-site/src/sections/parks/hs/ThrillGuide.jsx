import { thrillGuide } from '../../../data/hollywoodStudiosData';
import styles from './ThrillGuide.module.css';

export default function ThrillGuide() {
  return (
    <section id="hs-thrills" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Thrill Guide</h2>
          <p className="subtitle">The big rides — and how to conquer them with kids in tow</p>
        </div>

        <div className={styles.grid}>
          {thrillGuide.map((item) => (
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
          <h3 className={styles.calloutTitle}>Rider Swap — Don't Miss Out!</h3>
          <p className={styles.calloutDesc}>
            Rider Swap means BOTH parents get to ride the big thrill rides without waiting in line twice.
            Parent A rides while Parent B watches the kids. Then Parent B + up to 2 guests ride using the
            Lightning Lane entrance. Ask any Cast Member at the ride entrance to set it up.
          </p>
          <div className={styles.calloutSteps}>
            <div className={styles.calloutStep}>
              <span className={styles.stepNum}>1</span>
              <p>Tell the Cast Member at the entrance you want Rider Swap</p>
            </div>
            <div className={styles.calloutStep}>
              <span className={styles.stepNum}>2</span>
              <p>Parent A rides while Parent B waits with kids</p>
            </div>
            <div className={styles.calloutStep}>
              <span className={styles.stepNum}>3</span>
              <p>Parent B + 2 guests ride via Lightning Lane — no extra wait!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

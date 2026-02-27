import { Link } from 'react-router-dom';
import { mkTips, fireworksGuide } from '../../../data/magicKingdomData';
import styles from './MKStrategy.module.css';

export default function MKStrategy() {
  return (
    <section id="mk-strategy" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Our MK Strategy</h2>
          <p className="subtitle">Tips & tricks for making the most of Magic Kingdom</p>
          <Link to="/#timeline" className={styles.timelineLink}>See this day on the Trip Timeline &rarr;</Link>
        </div>

        <div className={styles.tips}>
          {mkTips.map((tip) => (
            <div key={tip.timeLabel} className={`${styles.tipCard} reveal`}>
              <div className={styles.tipHeader}>
                <span className={styles.tipEmoji}>{tip.emoji}</span>
                <span className={styles.tipTime}>{tip.timeLabel}</span>
              </div>
              <h3 className={styles.tipTitle}>{tip.title}</h3>
              <ul className={styles.tipDetails}>
                {tip.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Nighttime Spectacular Callout */}
        <div className={`${styles.callout} reveal`}>
          <h3 className={styles.calloutTitle}>Nighttime Spectacular Viewing Tips</h3>
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

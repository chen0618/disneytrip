import { Link } from 'react-router-dom';
import { epcotTips } from '../../../data/epcotData';
import styles from './EpcotStrategy.module.css';

export default function EpcotStrategy() {
  return (
    <section id="epcot-strategy" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Our EPCOT Strategy</h2>
          <p className="subtitle">Tips & tricks for making the most of EPCOT</p>
          <Link to="/#timeline" className={styles.timelineLink}>See this day on the Trip Timeline &rarr;</Link>
        </div>

        <div className={styles.tips}>
          {epcotTips.map((tip) => (
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
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import styles from './ParkStrategySection.module.css';

export default function ParkStrategySection({ parkName, sectionId, background, themeVars, heading, tips, children }) {
  return (
    <section id={sectionId} style={{ background, ...themeVars }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>{heading || `Our ${parkName} Strategy`}</h2>
          <p className="subtitle">Tips & tricks for making the most of {parkName}</p>
          <Link to="/#timeline" className={styles.timelineLink}>See this day on the Trip Timeline &rarr;</Link>
        </div>

        <div className={`${styles.tips} ${children ? styles.tipsWithChildren : ''}`}>
          {tips.map((tip) => (
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

        {children}
      </div>
    </section>
  );
}

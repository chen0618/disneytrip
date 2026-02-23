import { festivalGuide } from '../../../data/epcotData';
import styles from './FestivalGuide.module.css';

export default function FestivalGuide() {
  return (
    <section id="epcot-festival" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Festival of the Arts</h2>
          <p className="subtitle">Our trip overlaps with EPCOT's most creative seasonal event!</p>
        </div>

        <div className={`${styles.banner} reveal`}>
          <div className={styles.bannerBadge}>LUCKY US!</div>
          <h3 className={styles.bannerTitle}>{festivalGuide.name}</h3>
          <p className={styles.bannerDates}>{festivalGuide.dates}</p>
          <p className={styles.bannerHighlight}>{festivalGuide.highlight}</p>
        </div>

        <div className={styles.twoCol}>
          <div className={`${styles.boothSection} reveal`}>
            <h3 className={styles.subHeading}>Festival Food Booths</h3>
            <div className={styles.boothList}>
              {festivalGuide.foodBooths.map((booth) => (
                <div key={booth.name} className={styles.boothCard}>
                  <h4 className={styles.boothName}>{booth.name}</h4>
                  <p className={styles.boothDish}>{booth.dish}</p>
                  <p className={styles.boothDesc}>{booth.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.activitySection} reveal`}>
            <h3 className={styles.subHeading}>Activities & Events</h3>
            <ul className={styles.activityList}>
              {festivalGuide.activities.map((activity, i) => (
                <li key={i} className={styles.activityItem}>
                  <span className={styles.activityDot} />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

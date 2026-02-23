import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import { newExperiences, headsUpAlerts } from '../../data/whatsNewInfo';
import styles from './WhatsNew.module.css';

export default function WhatsNew() {
  return (
    <section id="whats-new" className={styles.section}>
      <div className="section-inner">
        <SectionHeader
          title="What's New for 2027"
          subtitle="Rides, restaurants, and changes since you last checked"
        />

        {newExperiences.map((parkGroup) => (
          <div key={parkGroup.park} className={`${styles.parkGroup} reveal`}>
            <h3 className={styles.parkHeader}>
              <span className={styles.parkEmoji}>{parkGroup.parkEmoji}</span>
              {parkGroup.park}
            </h3>
            <div className={styles.itemGrid}>
              {parkGroup.items.map((item) => (
                <div key={item.name} className={styles.itemCard}>
                  <div className={styles.cardTop}>
                    <span className={styles.itemEmoji}>{item.emoji}</span>
                    <span className={`${styles.badge} ${styles[`badge${item.badge.replace(/\s+/g, '')}`] || ''}`}>
                      {item.badge}
                    </span>
                  </div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className={`${styles.headsUp} reveal`}>
          <h3 className={styles.headsUpTitle}>⚠️ Heads Up</h3>
          <div className={styles.alertList}>
            {headsUpAlerts.map((alert) => (
              <div
                key={alert.title}
                className={`${styles.alertCard} ${alert.severity === 'warning' ? styles.alertWarning : styles.alertInfo}`}
              >
                <span className={styles.alertEmoji}>{alert.emoji}</span>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={4} />
    </section>
  );
}

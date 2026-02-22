import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import timelineDays from '../../data/timelineDays';
import styles from './Timeline.module.css';

// Map roles to 3-day mode classes
function getThreeDayClass(index) {
  // Day 1 = travel, Day 2 = only park day, Day 3 = travel back, Day 4-5 = hidden
  const map = ['travelDay', 'onlyDay', 'travelDay', 'hiddenDay', 'hiddenDay'];
  return styles[map[index]] || '';
}

export default function Timeline() {
  const [mode, setMode] = useState('full');
  const [expandedCard, setExpandedCard] = useState(null);

  const isThreeDay = mode === 'three';

  return (
    <section id="timeline" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Our Trip at a Glance" subtitle="5 days of magic, adventure, and family time" />

        <div className={`${styles.toggleBtns} reveal delay-1`}>
          <button
            className={`${styles.toggleBtn} ${!isThreeDay ? styles.toggleBtnActive : ''}`}
            onClick={() => setMode('full')}
          >
            Full Week ✨
          </button>
          <button
            className={`${styles.toggleBtn} ${styles.toggleBtnWarn} ${isThreeDay ? styles.toggleBtnWarnActive : ''}`}
            onClick={() => setMode('three')}
          >
            But What About 3 Days? 🤔
          </button>
        </div>

        <div className={`${styles.cards} reveal delay-2`}>
          {timelineDays.map((day, i) => (
            <div
              key={day.day}
              className={`${styles.card} ${expandedCard === i ? styles.cardExpanded : ''} ${isThreeDay ? getThreeDayClass(i) : ''}`}
              style={{ '--card-color': day.color }}
              onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            >
              <span className={styles.dayBadge} style={{ background: day.color }}>Day {day.day}</span>
              <span className={styles.cardIcon}>{day.icon}</span>
              <h4>{day.title}</h4>
              <p className={styles.cardSub}>{day.subtitle}</p>
              <div className={styles.cardDetails}>
                <p>{day.details}</p>
              </div>
              <div className={styles.cardBorder} style={{ background: day.color }} />
            </div>
          ))}
        </div>

        <div className={`${styles.callout} ${isThreeDay ? styles.calloutVisible : ''}`}>
          <h3>1 park day. That's it. 😬</h3>
          <p>After flights, airport time, bus to the hotel, and settling in... you'd have <strong>ONE day</strong> to experience Disney. The first and last days are almost entirely travel. Is that really enough?</p>
        </div>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={2} />
    </section>
  );
}

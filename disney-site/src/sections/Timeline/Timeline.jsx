import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import timelineDays from '../../data/timelineDays';
import travelGroup, { familyLabels, familyOrder } from '../../data/travelGroup';
import styles from './Timeline.module.css';

// Build family groups in display order
const familyGroups = familyOrder.map(key => ({
  key,
  label: familyLabels[key],
  members: travelGroup.filter(p => p.family === key),
}));

const kidCount = travelGroup.filter(p => p.isKid).length;

export default function Timeline() {
  return (
    <section id="timeline" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Our Trip at a Glance" subtitle="8 days of magic, adventure, and family time" />

        <div className={`${styles.cards} reveal delay-2`}>
          {timelineDays.map((day, i) => (
            <div
              key={day.day}
              className={styles.card}
              style={{ '--card-color': day.color }}
            >
              <span className={styles.dayBadge} style={{ background: day.color }}>{day.date}</span>
              <span className={styles.cardIcon}>{day.icon}</span>
              <h4>{day.title}</h4>
              <p className={styles.cardSub}>{day.subtitle}</p>
              <div className={styles.cardDetails}>
                <p>{day.details}</p>
              </div>
              {day.parkLink && (
                <Link to={day.parkLink} className={styles.parkGuideLink} style={{ color: day.color }}
                  onClick={(e) => e.stopPropagation()}>
                  View Park Guide →
                </Link>
              )}
              <div className={styles.cardBorder} style={{ background: day.color }} />
            </div>
          ))}
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '0.5rem' }}>
          Our Crew — {travelGroup.length} Strong! 🎉
        </h3>
        <p className="reveal" style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          {familyGroups.length} families, {kidCount} kids, 1 epic adventure
        </p>

        <div className={`${styles.familyGrid} reveal`}>
          {familyGroups.map(group => (
            <div key={group.key} className={styles.familyCluster}>
              <span className={styles.familyLabel}>{group.label}</span>
              <div className={styles.familyChips}>
                {group.members.map(person => (
                  <div key={person.name} className={`${styles.groupChip} ${person.isKid ? styles.groupChipKid : ''}`}>
                    <span className={styles.groupEmoji}>{person.emoji}</span>
                    <span className={styles.groupName}>{person.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.crewLegend} reveal`}>
          <span className={styles.legendSwatch} />
          <span className={styles.legendText}>= Kids</span>
        </div>

        <div className={`${styles.splitBlurb} reveal`}>
          <h4>Big Group, Your Own Pace 🏃‍♂️</h4>
          <p>
            We're {travelGroup.length} people — but that doesn't mean we all need to move as one giant herd!
            Split off whenever you want. Different families, different speeds, different must-dos.
            Want to hit a ride while others grab food? Go for it. Need a pool break while the group does another park lap? Do it.
            We'll text, regroup for meals or fireworks, and swap park stories at the end of the day.
            <strong> No guilt, no FOMO — just do what makes your trip great.</strong>
          </p>
        </div>

      </div>
      <WaveDivider fill="var(--bg-alt)" variant={2} />
    </section>
  );
}

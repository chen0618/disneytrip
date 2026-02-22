import SectionHeader from '../../components/SectionHeader/SectionHeader';
import DayTimeline from '../../components/DayTimeline/DayTimeline';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { magicKingdom } from '../../data/attractions';
import { magicKingdomSchedule } from '../../data/parkDaySchedules';
import styles from './MagicKingdom.module.css';

export default function MagicKingdom() {
  return (
    <section id="magic-kingdom" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Days 2 & 5: Magic Kingdom 🏰" subtitle="The Most Magical Place on Earth" />

        <div className={`${styles.intro} reveal`}>
          <p>This is THE Disney park &mdash; Cinderella Castle, Main Street U.S.A., classic rides, character meet-and-greets, and fireworks. Walking toward the castle for the first time is an unforgettable moment. We're going twice because there's so much to do!</p>
        </div>

        <DayTimeline {...magicKingdomSchedule} />

        <div className={styles.grid}>
          {magicKingdom.map((a, i) => (
            <AttractionCard key={a.name} {...a} delay={i + 1} />
          ))}
        </div>

        <Callout variant="kids" title="👶 Traveling with Little Ones (2.5 & 4.5 year olds)">
          Magic Kingdom has the most rides suitable for young kids! And for bigger rides, <strong>Rider Switch</strong> lets one parent ride while the other waits with kids, then swap without waiting in line again. That's one reason we're doing TWO Magic Kingdom days!
        </Callout>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={2} />
    </section>
  );
}

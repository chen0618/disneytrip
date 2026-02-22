import SectionHeader from '../../components/SectionHeader/SectionHeader';
import DayTimeline from '../../components/DayTimeline/DayTimeline';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import Callout from '../../components/Callout/Callout';
import { epcot } from '../../data/attractions';
import { epcotSchedule } from '../../data/parkDaySchedules';
import styles from './Epcot.module.css';

export default function Epcot() {
  return (
    <section id="epcot" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Day 4: EPCOT 🌍" subtitle="Innovation, Adventure & Eating Around the World" />

        <div className={`${styles.intro} reveal`}>
          <p>EPCOT has two halves: the front features world-class rides and technology, and the back &mdash; World Showcase &mdash; takes you around the globe through 11 country pavilions with authentic food, architecture, and culture from each nation.</p>
        </div>

        <DayTimeline {...epcotSchedule} />

        <div className={styles.grid}>
          {epcot.map((a, i) => (
            <AttractionCard key={a.name} {...a} delay={i + 1} />
          ))}
        </div>

        <Callout variant="world" title="🌎 Eating Around the World">
          An EPCOT tradition! Sample food and drinks from each of the 11 countries as you stroll the lagoon: <strong>Mexico, Norway, China, Germany, Italy, USA, Japan, Morocco, France, United Kingdom, Canada</strong>. The pastries at Les Halles in France are some of the best food on Disney property!
        </Callout>
      </div>
    </section>
  );
}

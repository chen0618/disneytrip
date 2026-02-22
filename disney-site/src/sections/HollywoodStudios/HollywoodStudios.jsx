import SectionHeader from '../../components/SectionHeader/SectionHeader';
import DayTimeline from '../../components/DayTimeline/DayTimeline';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { hollywoodStudios } from '../../data/attractions';
import { hollywoodStudiosSchedule } from '../../data/parkDaySchedules';
import styles from './HollywoodStudios.module.css';

export default function HollywoodStudios() {
  return (
    <section id="hollywood-studios" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Day 3: Hollywood Studios 🚀" subtitle="Movies, Star Wars & Toy Story Come to Life" />

        <div className={`${styles.intro} reveal`}>
          <p>Hollywood Studios has been completely transformed by two massive immersive lands: Star Wars: Galaxy's Edge and Toy Story Land. It's like stepping into the movies!</p>
        </div>

        <DayTimeline {...hollywoodStudiosSchedule} />

        <div className={styles.grid}>
          {hollywoodStudios.map((a, i) => (
            <AttractionCard key={a.name} {...a} delay={i + 1} />
          ))}
        </div>

        <Callout variant="highlight" title="🌟 Galaxy's Edge is NEXT LEVEL">
          You literally step onto another planet (Batuu). Cast Members stay in character, Coca-Cola comes in Star Wars containers, and the level of immersive detail is unlike anything at any other theme park in the world.
        </Callout>
      </div>
      <WaveDivider fill="var(--bg)" variant={3} />
    </section>
  );
}

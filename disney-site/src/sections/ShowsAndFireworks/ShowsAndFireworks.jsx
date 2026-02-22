import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { showsOverview, fireworks, parades, stageShows, showStrategy } from '../../data/showsInfo';
import styles from './ShowsAndFireworks.module.css';

export default function ShowsAndFireworks() {
  return (
    <section id="shows-fireworks" className={styles.section}>
      <WaveDivider position="top" fill="var(--bg)" variant={4} />
      <div className="section-inner">
        <SectionHeader title="Shows, Parades & Fireworks 🎆" subtitle="The Entertainment That Makes Disney Unforgettable" />

        <div className={`${styles.intro} reveal`}>
          <p>{showsOverview.description}</p>
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Nighttime Spectaculars</h3>
        <div className={`${styles.eventGrid} reveal`}>
          {fireworks.map(f => (
            <div key={f.name} className={styles.eventCard}>
              <span className={styles.eventIcon}>{f.icon}</span>
              <div className={styles.eventMeta}>{f.park}</div>
              <h4>{f.name}</h4>
              <div className={styles.eventTime}>{f.time}</div>
              <p>{f.tip}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Parades</h3>
        <div className={`${styles.eventGrid} reveal`}>
          {parades.map(p => (
            <div key={p.name} className={styles.eventCard}>
              <span className={styles.eventIcon}>{p.icon}</span>
              <div className={styles.eventMeta}>{p.park}</div>
              <h4>{p.name}</h4>
              <div className={styles.eventTime}>{p.time}</div>
              <p>{p.tip}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Must-See Stage Shows</h3>
        <div className={`${styles.showGrid} reveal`}>
          {stageShows.map(s => (
            <div key={s.name} className={styles.showCard}>
              <span className={styles.showIcon}>{s.icon}</span>
              <div className={styles.showPark}>{s.park}</div>
              <h4>{s.name}</h4>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Strategy Tips</h3>
        <div className={`${styles.strategyList} reveal`}>
          {showStrategy.map(item => (
            <div key={item.title} className={styles.strategyItem}>
              <span className={styles.strategyIcon}>{item.icon}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Callout variant="highlight" title="🎇 Our January 2027 Plan">
          January is a slower time at Disney, but fireworks still happen most nights. We'll plan to watch Happily Ever After at Magic Kingdom on one of our two MK days and catch Luminous at EPCOT on Day 4. For our other MK night, we'll ride during fireworks when lines drop!
        </Callout>
      </div>
      <WaveDivider fill="var(--bg)" variant={3} />
    </section>
  );
}

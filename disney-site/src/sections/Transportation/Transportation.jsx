import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import SkylineRouteMap from './SkylineRouteMap';
import { busInfo, skylinerInfo, airportTransport, infoPills } from '../../data/transportInfo';
import skylinerPhotos from '../../data/skylinerPhotos';
import styles from './Transportation.module.css';

function TransportCard({ info, revealClass }) {
  return (
    <div className={`${styles.card} ${revealClass}`}>
      <h3>{info.title}</h3>
      <p>{info.description}</p>
      <ul className={styles.cardList}>
        {info.items.map((item, i) => (
          <li key={i} className={styles.cardListItem}>
            <span className={styles.liIcon}>{item.icon}</span> {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Transportation() {
  return (
    <section id="transportation" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Getting Around Disney" subtitle="Everything is FREE for Resort Guests! 🎉" />

        <div className={`${styles.intro} reveal`}>
          <p>Staying at a Disney resort means you never need a rental car. Disney provides free transportation everywhere you need to go &mdash; by bus, boat, monorail, or our favorite: the Skyliner gondola!</p>
        </div>

        <div className={styles.grid}>
          <TransportCard info={busInfo} revealClass="reveal-left" />
          <TransportCard info={skylinerInfo} revealClass="reveal-right" />
        </div>

        <div className={`${styles.airportCard} reveal`}>
          <h3>{airportTransport.title}</h3>
          <p>{airportTransport.description}</p>
          <ul className={styles.cardList}>
            {airportTransport.items.map((item, i) => (
              <li key={i} className={styles.cardListItem}>
                <span className={styles.liIcon}>{item.icon}</span> {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.skylinerMap} reveal-scale`}>
          <h3>Skyliner Route from Pop Century</h3>
          <SkylineRouteMap />
        </div>

        <h3 className="reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>The Skyliner Experience</h3>
        <div className={`${styles.photos} reveal`}>
          {skylinerPhotos.map(p => (
            <img key={p.alt} src={p.src} alt={p.alt} loading="lazy" />
          ))}
        </div>

        <div className={`${styles.pills} reveal delay-2`}>
          {infoPills.map((pill, i) => (
            <div key={i} className={styles.pill}>
              <span className={styles.pillIcon}>{pill.icon}</span> {pill.text}
            </div>
          ))}
        </div>
      </div>
      <WaveDivider fill="var(--bg)" variant={5} />
    </section>
  );
}

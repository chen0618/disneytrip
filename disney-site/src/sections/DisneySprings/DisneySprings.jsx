import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import springsVenues from '../../data/springsVenues';
import styles from './DisneySprings.module.css';

export default function DisneySprings() {
  return (
    <section id="disney-springs" className={styles.section}>
      <div className="section-inner">
        <SectionHeader title="Disney Springs" subtitle="Day 1 Destination — Our First Taste of Disney Magic" />

        <div className={`${styles.notAPark} reveal delay-1`}>
          <strong>This is NOT a Theme Park!</strong>
          It's a massive open-air shopping, dining, and entertainment district. No ticket needed &mdash; just walk in and enjoy. Free admission!
        </div>

        <div className={styles.grid}>
          {springsVenues.map((venue, i) => (
            <div key={venue.name} className={`${styles.card} reveal delay-${i + 1}`}>
              <div className={styles.cardImg} style={{ backgroundImage: `url('${venue.image}')` }}>
                <span className={styles.cardEmoji}>{venue.emoji}</span>
              </div>
              <div className={styles.cardBody}>
                <h4>{venue.name}</h4>
                <p>{venue.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={3} />
    </section>
  );
}

import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Callout from '../../components/Callout/Callout';
import WaveDivider from '../../components/WaveDivider';
import { kidProfiles, heightTiers } from '../../data/heightRequirements';
import styles from './HeightGuide.module.css';

export default function HeightGuide() {
  return (
    <section id="height-guide" className={styles.section}>
      <WaveDivider position="top" fill="var(--bg-alt)" variant={5} />
      <div className="section-inner">
        <SectionHeader title="Height Requirements Guide 📏" subtitle="Which Rides Can Our Kids Get On?" />

        <div className={`${styles.intro} reveal`}>
          <p>Disney rides have strict height requirements measured in inches. Here's our complete guide organized by height tier, so we know exactly which rides work for Luna and Clara.</p>
        </div>

        <div className={`${styles.profileGrid} reveal`}>
          {kidProfiles.map(kid => (
            <div key={kid.name} className={styles.profileCard}>
              <h4>{kid.name}</h4>
              <span className={styles.profileHeight}>{kid.height}</span>
              <p className={styles.profileAge}>{kid.age}</p>
              <p className={styles.profileNote}>{kid.note}</p>
            </div>
          ))}
        </div>

        {heightTiers.map(tier => (
          <div key={tier.tier} className={`${styles.tierBlock} reveal`}>
            <div className={styles.tierHeader} style={{ borderLeftColor: tier.color }}>
              <span className={styles.tierEmoji}>{tier.emoji}</span>
              <div>
                <h3>{tier.tier === 'No Height Requirement' ? tier.tier : `${tier.tier} minimum`}</h3>
                <p className={styles.tierNote}>{tier.note}</p>
              </div>
              <div className={styles.tierBadges}>
                <span className={`${styles.badge} ${tier.lunaCanRide ? styles.badgeYes : styles.badgeNo}`}>
                  Luna {tier.lunaCanRide ? '✓' : '✗'}
                </span>
                <span className={`${styles.badge} ${tier.claraCanRide ? styles.badgeYes : styles.badgeNo}`}>
                  Clara {tier.claraCanRide ? '✓' : '✗'}
                </span>
              </div>
            </div>
            <div className={styles.rideList}>
              {tier.rides.map(ride => (
                <div key={ride.name} className={styles.rideItem}>
                  <span className={styles.rideName}>{ride.name}</span>
                  <span className={styles.ridePark}>{ride.park}</span>
                  {ride.note && <span className={styles.rideNote}>{ride.note}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Callout variant="kids" title="💡 Measure Before You Go!">
          Luna was ~39 inches in January 2026. By January 2027 she'll likely be 41–42 inches — right on the edge for 40-inch rides. Measure her close to the trip! If she's borderline, have her wear sneakers with a slightly thicker sole. And remember: Rider Swap means NO parent misses a ride, even if the kids can't go on it.
        </Callout>
      </div>
      <WaveDivider fill="var(--bg-alt)" variant={2} />
    </section>
  );
}

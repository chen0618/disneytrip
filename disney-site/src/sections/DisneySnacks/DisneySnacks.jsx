import SectionHeader from '../../components/SectionHeader/SectionHeader';
import WaveDivider from '../../components/WaveDivider';
import SnackMap from './SnackMap';
import snacks from '../../data/snacks';
import styles from './DisneySnacks.module.css';

export default function DisneySnacks() {
  return (
    <section id="disney-snacks" className={styles.section}>
      <WaveDivider position="top" fill="var(--bg-alt)" variant={2} />
      <div className="section-inner">
        <SectionHeader title="Iconic Disney Snacks 🍭" subtitle="Half the Magic is in the Food" />

        <div className={`${styles.intro} reveal`}>
          <p>Disney World snacks are legendary. From the famous Dole Whip to enormous turkey legs, there are treats you can ONLY get here. Here's our must-try list and exactly where to find each one!</p>
        </div>

        <SnackMap />

        <div className={styles.grid}>
          {snacks.map((s, i) => (
            <div key={s.name} className={`${styles.card} reveal delay-${(i % 6) + 1}`}>
              <div className={styles.cardImg} style={{ backgroundImage: `url('${s.cardImage}')` }}>
                <span className={styles.snackBadge}>{s.price}</span>
              </div>
              <div className={styles.cardBody}>
                <h4>{s.emoji} {s.name}</h4>
                <p>{s.description}</p>
                <p className={styles.snackWhere}>📍 {s.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.boatCallout} reveal`}>
          <div className={styles.boatText}>
            <strong>🚢 Secret Beignet Mission: The Free Boat to Port Orleans</strong>
            <p>You don't need to stay at Port Orleans to eat there! Take the <strong>free Sassagoula River Cruise boat</strong> from Disney Springs directly to Port Orleans French Quarter. The scenic ride takes about <strong>17 minutes</strong> along the river &mdash; it's relaxing and beautiful. Hop off, grab beignets at Scat Cat's Cafe, and boat back. This is one of Disney World's best-kept secrets!</p>
          </div>
          <img
            className={styles.boatImg}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Port_Orleans_French_Quarter_Boats_%285310599822%29.jpg/960px-Port_Orleans_French_Quarter_Boats_%285310599822%29.jpg"
            alt="Port Orleans French Quarter boat dock"
            loading="lazy"
          />
        </div>
      </div>
      <WaveDivider fill="var(--text)" variant={6} />
    </section>
  );
}

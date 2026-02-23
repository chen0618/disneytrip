import { worldShowcaseCountries } from '../../../data/epcotData';
import styles from './WorldShowcase.module.css';

export default function WorldShowcase() {
  return (
    <section id="epcot-food-tour" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>World Showcase Food Tour</h2>
          <p className="subtitle">Eat and drink your way around 11 countries — the ultimate EPCOT experience</p>
        </div>

        <div className={`${styles.passportHeader} reveal`}>
          <div className={styles.passportStamp}>WORLD SHOWCASE PASSPORT</div>
          <p className={styles.passportSub}>Start at Mexico, go clockwise, and collect flavors from every country!</p>
        </div>

        <div className={styles.countryGrid}>
          {worldShowcaseCountries.map((country, i) => (
            <div
              key={country.name}
              className={`${styles.countryCard} reveal`}
              style={{ '--accent': country.color, '--delay-i': `${i * 0.05}s` }}
            >
              <div className={styles.cardTop} style={{ background: country.color }}>
                <span className={styles.flag}>{country.flag}</span>
                <h3 className={styles.countryName}>{country.name}</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.foodItem}>
                  <span className={styles.foodLabel}>Must-Try Food</span>
                  <p>{country.mustTryFood}</p>
                </div>
                <div className={styles.foodItem}>
                  <span className={styles.foodLabel}>Must-Try Drink</span>
                  <p>{country.mustTryDrink}</p>
                </div>
                <div className={styles.foodItem}>
                  <span className={styles.foodLabel}>Kid-Friendly</span>
                  <p>{country.kidFriendlyOption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

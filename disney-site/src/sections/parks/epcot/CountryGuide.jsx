import { worldShowcaseCountries } from '../../../data/epcotData';
import styles from './CountryGuide.module.css';

export default function CountryGuide() {
  return (
    <section id="epcot-countries" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Country-by-Country Guide</h2>
          <p className="subtitle">Walk clockwise from Mexico to Canada — here's what to discover at each pavilion</p>
        </div>

        <div className={styles.walkingPath}>
          {worldShowcaseCountries.map((country, i) => (
            <div
              key={country.name}
              className={`${styles.countrySection} reveal`}
              style={{ '--accent': country.color }}
            >
              <div className={styles.countryHeader}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <span className={styles.flag}>{country.flag}</span>
                <h3 className={styles.countryName}>{country.name}</h3>
              </div>

              <div className={styles.detailGrid}>
                {country.characterMeet && country.characterMeet !== 'None' && (
                  <div className={styles.detailCard}>
                    <span className={styles.detailIcon}>&#x1F44B;</span>
                    <div>
                      <span className={styles.detailLabel}>Character Meet</span>
                      <p>{country.characterMeet}</p>
                    </div>
                  </div>
                )}
                <div className={styles.detailCard}>
                  <span className={styles.detailIcon}>&#x1F6CD;&#xFE0F;</span>
                  <div>
                    <span className={styles.detailLabel}>Unique Shopping</span>
                    <p>{country.uniqueShopping}</p>
                  </div>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailIcon}>&#x2728;</span>
                  <div>
                    <span className={styles.detailLabel}>Hidden Detail</span>
                    <p>{country.hiddenDetail}</p>
                  </div>
                </div>
              </div>

              {i < worldShowcaseCountries.length - 1 && (
                <div className={styles.connector}>
                  <span className={styles.connectorArrow}>&#x2192;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

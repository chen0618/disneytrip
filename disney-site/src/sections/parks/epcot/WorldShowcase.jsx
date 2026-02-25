import { useState, useCallback, useRef, useEffect } from 'react';
import { worldShowcaseCountries } from '../../../data/epcotData';
import styles from './WorldShowcase.module.css';

function FoodThumb({ src, alt, flag, expanded }) {
  const [failed, setFailed] = useState(false);
  const cls = expanded ? styles.foodThumbExpanded : styles.foodThumb;
  const fallbackCls = expanded ? styles.foodThumbFallbackExpanded : styles.foodThumbFallback;

  if (!src || failed) {
    return <span className={fallbackCls}>{flag}</span>;
  }
  return (
    <img
      className={cls}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function useCardVisibility(expandedCard, prevExpandedRef) {
  const cardRefs = useRef({});
  useEffect(() => {
    // Ensure the previously expanded card stays visible when collapsing
    if (prevExpandedRef.current && cardRefs.current[prevExpandedRef.current]) {
      cardRefs.current[prevExpandedRef.current].classList.add('active');
    }
    // Ensure the newly expanded card is visible and scrolled to
    if (expandedCard && cardRefs.current[expandedCard]) {
      const el = cardRefs.current[expandedCard];
      el.classList.add('active');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    prevExpandedRef.current = expandedCard;
  }, [expandedCard, prevExpandedRef]);
  return cardRefs;
}

const foodItems = [
  { key: 'mustTryFood', imgKey: 'mustTryFoodImg', label: 'Must-Try Food' },
  { key: 'mustTryDrink', imgKey: 'mustTryDrinkImg', label: 'Must-Try Drink' },
  { key: 'kidFriendlyOption', imgKey: 'kidFriendlyImg', label: 'Kid-Friendly' },
];

export default function WorldShowcase() {
  const [expandedCard, setExpandedCard] = useState(null);
  const prevExpandedRef = useRef(null);
  const cardRefs = useCardVisibility(expandedCard, prevExpandedRef);

  const toggle = useCallback((name) => {
    setExpandedCard(prev => prev === name ? null : name);
  }, []);

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
          {worldShowcaseCountries.map((country, i) => {
            const isExpanded = expandedCard === country.name;
            return (
              <div
                key={country.name}
                ref={el => { cardRefs.current[country.name] = el; }}
                className={`${styles.countryCard} ${isExpanded ? styles.expanded : ''} reveal`}
                style={{ '--accent': country.color, '--delay-i': `${i * 0.05}s` }}
                role="button"
                tabIndex={0}
                onClick={() => toggle(country.name)}
                onKeyDown={(e) => e.key === 'Enter' && toggle(country.name)}
              >
                <div className={styles.cardTop} style={{ background: country.color }}>
                  <span className={styles.flag}>{country.flag}</span>
                  <h3 className={styles.countryName}>{country.name}</h3>
                  <span className={styles.expandIcon}>{isExpanded ? '✕' : '＋'}</span>
                </div>
                <div className={styles.cardBody}>
                  {foodItems.map(({ key, imgKey, label }) => (
                    <div key={key} className={styles.foodItem}>
                      <span className={styles.foodLabel}>{label}</span>
                      {country[key + 'Items'] ? (
                        <div className={styles.subItemList}>
                          {country[key + 'Items'].map((item) => (
                            <div key={item.name} className={`${styles.foodContent} ${isExpanded ? styles.foodContentExpanded : ''}`}>
                              <FoodThumb
                                src={item.img}
                                alt={item.name}
                                flag={country.flag}
                                expanded={isExpanded}
                              />
                              <p>{item.name}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`${styles.foodContent} ${isExpanded ? styles.foodContentExpanded : ''}`}>
                          <FoodThumb
                            src={country[imgKey]}
                            alt={country[key]}
                            flag={country.flag}
                            expanded={isExpanded}
                          />
                          <p>{country[key]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

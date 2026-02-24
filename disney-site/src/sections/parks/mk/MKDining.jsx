import { useState, useMemo } from 'react';
import snacks from '../../../data/snacks';
import styles from './MKDining.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'quick-service', label: 'Quick Service' },
  { key: 'table-service', label: 'Table Service' },
  { key: 'snack', label: 'Snacks' },
];

const MUST_TRY = [
  { name: 'Dole Whip', emoji: '🍍', note: 'The iconic frozen pineapple treat at Aloha Isle in Adventureland' },
  { name: 'Turkey Leg', emoji: '🍗', note: 'Massive smoked turkey legs — a Disney tradition found near Frontierland' },
  { name: 'The Grey Stuff', emoji: '🍰', note: "Try it at Be Our Guest — 'it's delicious, don't believe me? Ask the dishes!'" },
];

export default function MKDining() {
  const [filter, setFilter] = useState('all');

  const mkDining = useMemo(() => {
    let items = snacks.filter((s) => s.location?.includes('Magic Kingdom'));
    if (filter !== 'all') items = items.filter((s) => s.serviceType === filter);
    return items;
  }, [filter]);

  return (
    <section id="mk-dining" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Dining Guide</h2>
          <p className="subtitle">From iconic snacks to royal feasts</p>
        </div>

        {/* Must-Try Callout */}
        <div className={`${styles.mustTry} reveal`}>
          <h3 className={styles.mustTryTitle}>Must-Try at Magic Kingdom</h3>
          <div className={styles.mustTryGrid}>
            {MUST_TRY.map((item) => (
              <div key={item.name} className={styles.mustTryItem}>
                <span className={styles.mustTryEmoji}>{item.emoji}</span>
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.diningGrid}>
          {mkDining.map((item, i) => (
            <div key={item.name + i} className={styles.diningCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardEmoji}>{item.emoji}</span>
                <div>
                  <h4 className={styles.cardName}>{item.name}</h4>
                  <span className={styles.priceBadge}>{item.price}</span>
                </div>
              </div>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>

        {mkDining.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
            No dining options match this filter.
          </p>
        )}
      </div>
    </section>
  );
}

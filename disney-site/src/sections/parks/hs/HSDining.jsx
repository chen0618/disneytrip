import { useState, useMemo } from 'react';
import snacks from '../../../data/snacks';
import styles from './HSDining.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'quick-service', label: 'Quick Service' },
  { key: 'table-service', label: 'Table Service' },
  { key: 'snack', label: 'Snacks' },
];

const MUST_TRY = [
  { name: 'Ronto Wrap', emoji: '🌯', note: "Grilled sausage in warm pita from Ronto Roasters — the must-eat of Galaxy's Edge" },
  { name: 'Totchos', emoji: '🥔', note: "Loaded tater tot nachos from Woody's Lunch Box — trust us, they're legendary" },
  { name: 'Blue/Green Milk', emoji: '🥛', note: "Frozen plant-based milk from the Milk Stand — weirdly addictive Galaxy's Edge exclusive" },
];

export default function HSDining() {
  const [filter, setFilter] = useState('all');

  const hsDining = useMemo(() => {
    let items = snacks.filter((s) => s.location?.includes('Hollywood Studios'));
    if (filter !== 'all') items = items.filter((s) => s.serviceType === filter);
    return items;
  }, [filter]);

  return (
    <section id="hs-dining" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Dining & Snacks</h2>
          <p className="subtitle">From galactic cantinas to toy-sized lunch boxes</p>
        </div>

        {/* Must-Try Callout */}
        <div className={`${styles.mustTry} reveal`}>
          <h3 className={styles.mustTryTitle}>Must-Try at Hollywood Studios</h3>
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
          {hsDining.map((item, i) => (
            <div key={item.name + i} className={`${styles.diningCard} reveal`}>
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

        {hsDining.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
            No dining options match this filter.
          </p>
        )}
      </div>
    </section>
  );
}

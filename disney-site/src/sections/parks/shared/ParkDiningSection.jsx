import { useState, useMemo } from 'react';
import snacks from '../../../data/snacks';
import styles from './ParkDiningSection.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'quick-service', label: 'Quick Service' },
  { key: 'table-service', label: 'Table Service' },
  { key: 'snack', label: 'Snacks' },
];

export default function ParkDiningSection({ parkName, sectionId, background, themeVars, subtitle, mustTryItems, onSelectItem }) {
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const allDining = useMemo(() => snacks.filter((s) => s.location?.includes(parkName)), [parkName]);
  const dining = useMemo(() => {
    if (filter === 'all') return allDining;
    return allDining.filter((s) => s.serviceType === filter);
  }, [filter, allDining]);

  return (
    <section id={sectionId} className={!isOpen ? styles.sectionCollapsed : ''} style={{ background, ...themeVars }}>
      <div className="section-inner">
        <button className={`${styles.toggle} reveal`} onClick={() => setIsOpen((o) => !o)} aria-expanded={isOpen}>
          <div>
            <h2 className={styles.toggleTitle}>Dining Guide</h2>
            <p className={styles.toggleSub}>{subtitle}</p>
          </div>
          <div className={styles.toggleRight}>
            <span className={styles.count}>{allDining.length} places</span>
            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>&#9662;</span>
          </div>
        </button>

        <div className={`${styles.collapse} ${isOpen ? styles.collapseOpen : ''}`}>
          <div className={styles.collapseInner}>
            {/* Must-Try Callout */}
            <div className={`${styles.mustTry} reveal`}>
              <h3 className={styles.mustTryTitle}>Must-Try at {parkName}</h3>
              <div className={styles.mustTryGrid}>
                {mustTryItems.map((item) => (
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
              {dining.map((item, i) => (
                <div key={item.name + i} className={styles.diningCard} role="button" tabIndex={0} onClick={() => onSelectItem?.({ ...item, type: 'food', park: parkName })} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.({ ...item, type: 'food', park: parkName })}>
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

            {dining.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
                No dining options match this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

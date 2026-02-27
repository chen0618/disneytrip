import { useState, useMemo } from 'react';
import snacks from '../../../data/snacks';
import styles from './EpcotDining.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'quick-service', label: 'Quick Service' },
  { key: 'table-service', label: 'Table Service' },
  { key: 'snack', label: 'Snacks' },
];

const MUST_TRY = [
  { name: 'Le Cellier Steakhouse', emoji: '\uD83E\uDD69', note: 'The #1 rated restaurant at EPCOT. Canadian filet mignon, pretzel bread, and cheddar cheese soup. Book 60 days out!' },
  { name: 'Space 220', emoji: '\uD83D\uDE80', note: 'Dine in a simulated space station 220 miles above Earth! The elevator ride up is half the experience. Book ASAP.' },
  { name: 'Les Halles Boulangerie', emoji: '\uD83E\uDD50', note: "EPCOT's best-kept secret. Authentic French pastries, croissants, and sandwiches at quick-service prices." },
  { name: 'Teppan Edo', emoji: '\uD83D\uDD25', note: 'Teppanyaki-style cooking at your table in Japan. The chef puts on a show — kids will love it!' },
];

export default function EpcotDining({ onSelectItem }) {
  const [filter, setFilter] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const allEpcotDining = useMemo(() => snacks.filter((s) => s.location?.includes('EPCOT')), []);
  const epcotDining = useMemo(() => {
    if (filter === 'all') return allEpcotDining;
    return allEpcotDining.filter((s) => s.serviceType === filter);
  }, [filter, allEpcotDining]);

  return (
    <section id="epcot-dining" className={!isOpen ? styles.sectionCollapsed : ''} style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <button className={`${styles.toggle} reveal`} onClick={() => setIsOpen((o) => !o)} aria-expanded={isOpen}>
          <div>
            <h2 className={styles.toggleTitle}>Dining Guide</h2>
            <p className={styles.toggleSub}>From world-class table service to festival food booths</p>
          </div>
          <div className={styles.toggleRight}>
            <span className={styles.count}>{allEpcotDining.length} places</span>
            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>&#9662;</span>
          </div>
        </button>

        <div className={`${styles.collapse} ${isOpen ? styles.collapseOpen : ''}`}>
          <div className={styles.collapseInner}>
            {/* Must-Try Callout */}
            <div className={`${styles.mustTry} reveal`}>
              <h3 className={styles.mustTryTitle}>Must-Try at EPCOT</h3>
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
              {epcotDining.map((item, i) => (
                <div key={item.name + i} className={styles.diningCard} role="button" tabIndex={0} onClick={() => onSelectItem?.({ ...item, type: 'food', park: 'EPCOT' })} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.({ ...item, type: 'food', park: 'EPCOT' })}>
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

            {epcotDining.length === 0 && (
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

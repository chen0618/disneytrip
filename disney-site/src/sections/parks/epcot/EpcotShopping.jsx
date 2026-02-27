import { useMemo, useState } from 'react';
import { mapShops } from '../../../data/mapShops';
import styles from './EpcotShopping.module.css';

export default function EpcotShopping({ onSelectItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const epcotShops = useMemo(
    () => mapShops.filter((s) => s.park === 'EPCOT'),
    []
  );

  return (
    <section id="epcot-shopping" className={!isOpen ? styles.sectionCollapsed : ''} style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <button className={`${styles.toggle} reveal`} onClick={() => setIsOpen((o) => !o)} aria-expanded={isOpen}>
          <div>
            <h2 className={styles.toggleTitle}>Shopping</h2>
            <p className={styles.toggleSub}>Where to find the best souvenirs and gifts</p>
          </div>
          <div className={styles.toggleRight}>
            <span className={styles.count}>{epcotShops.length} shops</span>
            <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>&#9662;</span>
          </div>
        </button>

        <div className={`${styles.collapse} ${isOpen ? styles.collapseOpen : ''}`}>
          <div className={styles.collapseInner}>
            <div className={styles.shopGrid}>
              {epcotShops.map((shop) => (
                <div key={shop.id} className={`${styles.shopCard} reveal`} role="button" tabIndex={0} onClick={() => onSelectItem?.({ ...shop, type: 'shop' })} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.({ ...shop, type: 'shop' })}>
                  <div className={styles.shopHeader}>
                    <span className={styles.shopEmoji}>{shop.emoji}</span>
                    <h3 className={styles.shopName}>{shop.name}</h3>
                  </div>
                  <p className={styles.shopDesc}>{shop.description}</p>
                  {shop.tip && <p className={styles.shopTip}>{shop.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

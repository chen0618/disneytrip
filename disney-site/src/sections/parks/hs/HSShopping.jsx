import { useMemo } from 'react';
import { mapShops } from '../../../data/mapShops';
import styles from './HSShopping.module.css';

export default function HSShopping() {
  const hsShops = useMemo(
    () => mapShops.filter((s) => s.park === 'Hollywood Studios'),
    []
  );

  return (
    <section id="hs-shopping" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Shopping</h2>
          <p className="subtitle">Where to find the best souvenirs and gifts</p>
        </div>

        <div className={styles.shopGrid}>
          {hsShops.map((shop) => (
            <div key={shop.id} className={`${styles.shopCard} reveal`}>
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
    </section>
  );
}

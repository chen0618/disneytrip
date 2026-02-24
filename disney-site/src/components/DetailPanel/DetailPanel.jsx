import styles from './DetailPanel.module.css';

function parkTagClass(park) {
  if (!park) return '';
  const p = park.toLowerCase();
  if (p.includes('magic kingdom')) return styles.mk;
  if (p.includes('hollywood')) return styles.hs;
  if (p.includes('epcot')) return styles.epcot;
  if (p.includes('springs')) return styles.springs;
  return '';
}

function parkLabel(park) {
  if (!park) return null;
  const p = park.toLowerCase();
  if (p.includes('magic kingdom')) return 'Magic Kingdom';
  if (p.includes('hollywood')) return 'Hollywood Studios';
  if (p.includes('epcot')) return 'EPCOT';
  if (p.includes('springs')) return 'Disney Springs';
  return park;
}

export default function DetailPanel({ item, onClose }) {
  const isOpen = item != null;
  const type = item?.type;

  // Shows, fireworks, parades have no image — use emoji hero instead
  const showTypes = ['show', 'fireworks', 'parade'];
  const isShowType = showTypes.includes(type);
  const imgSrc = item?.image || item?.cardImage || null;

  // Determine park string
  const park = item?.park || (type === 'venue' ? 'Disney Springs' : null);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        {item && (
          <>
            {/* Close button */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              &times;
            </button>

            {/* Mobile drag handle */}
            <div className={styles.dragHandle}>
              <div className={styles.dragHandleBar} />
            </div>

            {/* Hero area */}
            {isShowType ? (
              <div className={styles.emojiHero}>{item.emoji}</div>
            ) : imgSrc ? (
              <img className={styles.image} src={imgSrc} alt={item.name} />
            ) : null}

            {/* Content */}
            <div className={styles.content}>
              {/* Name */}
              <h3 className={styles.name}>
                {!isShowType && item.emoji && (
                  <span className={styles.nameEmoji}>{item.emoji}</span>
                )}
                {item.name}
              </h3>

              {/* Tags */}
              <div className={styles.tags}>
                {park && (
                  <span className={`${styles.parkTag} ${parkTagClass(park)}`}>
                    {parkLabel(park)}
                  </span>
                )}
                {item.land && (
                  <span className={styles.landTag}>{item.land}</span>
                )}
                {item.location && !park && (
                  <span className={styles.landTag}>{item.location}</span>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className={styles.description}>{item.description}</p>
              )}

              {/* Badges */}
              {type === 'ride' && (
                <div className={styles.badges}>
                  {item.heightReq && (
                    <span className={styles.heightBadge}>
                      📏 {item.heightReq}
                    </span>
                  )}
                  {item.lightningLane && (
                    <span className={styles.llBadge}>Lightning Lane ⚡</span>
                  )}
                </div>
              )}

              {/* Food price + service type badge */}
              {(type === 'food' || type === 'venue') && (item.price || item.serviceType) && (
                <div className={styles.badges}>
                  {item.serviceType === 'table-service' && (
                    <span className={styles.serviceTypeBadge} style={{ background: '#6C5CE7', color: 'white' }}>🍽️ Table Service</span>
                  )}
                  {item.serviceType === 'quick-service' && (
                    <span className={styles.serviceTypeBadge} style={{ background: '#00B894', color: 'white' }}>🍔 Quick Service</span>
                  )}
                  {item.serviceType === 'snack' && (
                    <span className={styles.serviceTypeBadge} style={{ background: '#FDCB6E', color: '#2d3436' }}>🍦 Snack</span>
                  )}
                  {item.price && <span className={styles.priceBadge}>{item.price}</span>}
                </div>
              )}

              {/* Show/fireworks/parade time badge */}
              {isShowType && item.time && (
                <div className={styles.badges}>
                  <span className={styles.timeBadge}>🕐 {item.time}</span>
                </div>
              )}

              {/* Tip */}
              {item.tip && (
                <div className={styles.tip}>💡 {item.tip}</div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

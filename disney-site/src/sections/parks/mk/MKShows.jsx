import { useMemo } from 'react';
import { mapShows } from '../../../data/mapShows';
import { fireworksGuide } from '../../../data/magicKingdomData';
import styles from './MKShows.module.css';

const TYPE_COLORS = {
  show: { bg: '#fce4ec', color: '#c2185b', label: 'Stage Show' },
  fireworks: { bg: '#fff8e1', color: '#f57f17', label: 'Nighttime Spectacular' },
  parade: { bg: '#f3e5f5', color: '#7b1fa2', label: 'Parade' },
};

export default function MKShows({ onSelectItem }) {
  const mkShows = useMemo(
    () => mapShows.filter((s) => s.park === 'Magic Kingdom'),
    []
  );

  return (
    <section id="mk-shows" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Shows & Fireworks</h2>
          <p className="subtitle">Entertainment that brings the magic to life</p>
        </div>

        <div className={styles.showGrid}>
          {mkShows.map((show) => {
            const typeStyle = TYPE_COLORS[show.type] || TYPE_COLORS.show;
            return (
              <div key={show.id} className={`${styles.showCard} reveal`} role="button" tabIndex={0} onClick={() => onSelectItem?.(show)} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(show)}>
                <div className={styles.showHeader}>
                  <span className={styles.showEmoji}>{show.emoji}</span>
                  <div>
                    <h3 className={styles.showName}>{show.name}</h3>
                    <span
                      className={styles.typeBadge}
                      style={{ background: typeStyle.bg, color: typeStyle.color }}
                    >
                      {typeStyle.label}
                    </span>
                  </div>
                </div>
                <p className={styles.showDesc}>{show.description}</p>
                {show.tip && <p className={styles.showTip}>{show.tip}</p>}
              </div>
            );
          })}
        </div>

        {/* Fireworks Guide */}
        <div className={`${styles.fireworksGuide} reveal`}>
          <h3 className={styles.fwTitle}>{fireworksGuide.name}</h3>
          <div className={styles.fwMeta}>
            <span>{fireworksGuide.time}</span>
            <span>{fireworksGuide.duration}</span>
          </div>
          <p className={styles.fwTip}>{fireworksGuide.tips}</p>

          <h4 className={styles.spotsTitle}>Best Viewing Spots</h4>
          <div className={styles.spotsGrid}>
            {fireworksGuide.bestSpots.map((s) => (
              <div key={s.spot} className={styles.spotCard}>
                <h4 className={styles.spotName}>{s.spot}</h4>
                <p className={styles.spotTip}>{s.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

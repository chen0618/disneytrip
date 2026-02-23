import { useMemo } from 'react';
import { mapShows } from '../../../data/mapShows';
import styles from './HSShows.module.css';

const TYPE_COLORS = {
  show: { bg: '#f0eefe', color: '#6c63ff', label: 'Stage Show' },
  fireworks: { bg: '#fff8e1', color: '#f57f17', label: 'Nighttime Spectacular' },
  parade: { bg: '#f3e5f5', color: '#7b1fa2', label: 'Parade' },
};

export default function HSShows() {
  const hsShows = useMemo(
    () => mapShows.filter((s) => s.park === 'Hollywood Studios'),
    []
  );

  const fantasmic = hsShows.find((s) => s.id === 'fantasmic');
  const stageShows = hsShows.filter((s) => s.type === 'show');

  return (
    <section id="hs-shows" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Shows & Entertainment</h2>
          <p className="subtitle">World-class live entertainment and nighttime spectaculars</p>
        </div>

        <div className={styles.showGrid}>
          {stageShows.map((show) => {
            const typeStyle = TYPE_COLORS[show.type] || TYPE_COLORS.show;
            return (
              <div key={show.id} className={`${styles.showCard} reveal`}>
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

        {/* Fantasmic Guide */}
        {fantasmic && (
          <div className={`${styles.fantasmicGuide} reveal`}>
            <h3 className={styles.fTitle}>Fantasmic!</h3>
            <p className={styles.fSubtitle}>The ultimate nighttime spectacular</p>
            <p className={styles.fDesc}>{fantasmic.description}</p>
            {fantasmic.tip && <p className={styles.fTip}>{fantasmic.tip}</p>}

            <h4 className={styles.tipsTitle}>Viewing Tips</h4>
            <div className={styles.tipsGrid}>
              <div className={styles.tipCard}>
                <strong>Arrive early</strong>
                <p>Get to the amphitheater 45-60 minutes before showtime for the best seats</p>
              </div>
              <div className={styles.tipCard}>
                <strong>Center section</strong>
                <p>Middle seats give the best view of projections on the water screens</p>
              </div>
              <div className={styles.tipCard}>
                <strong>Dining package</strong>
                <p>Book a Fantasmic! dining package for guaranteed reserved seating — worth it!</p>
              </div>
              <div className={styles.tipCard}>
                <strong>Exit strategy</strong>
                <p>Stay seated after the show ends — the crowds thin out in 10-15 minutes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

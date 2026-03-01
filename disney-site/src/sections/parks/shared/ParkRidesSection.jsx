import { useState, useMemo } from 'react';
import { mapRides } from '../../../data/mapRides';
import styles from './ParkRidesSection.module.css';

const VIEW_MODES = [
  { key: 'land', label: 'By Land' },
  { key: 'height', label: 'By Height' },
];

export default function ParkRidesSection({ parkName, sectionId, background, themeVars, callouts, onSelectItem }) {
  const [viewMode, setViewMode] = useState('land');

  const rides = useMemo(
    () => mapRides.filter((r) => r.park === parkName),
    [parkName],
  );

  const grouped = useMemo(() => {
    if (viewMode === 'land') {
      const map = {};
      rides.forEach((r) => {
        if (!map[r.land]) map[r.land] = [];
        map[r.land].push(r);
      });
      return Object.entries(map);
    }
    const withReq = rides.filter((r) => r.heightReqInches > 0);
    const noReq = rides.filter((r) => r.heightReqInches === 0);
    const tierMap = {};
    withReq.forEach((r) => {
      const label = r.heightReq;
      if (!tierMap[label]) tierMap[label] = { inches: r.heightReqInches, rides: [] };
      tierMap[label].rides.push(r);
    });
    const sorted = Object.entries(tierMap)
      .sort(([, a], [, b]) => b.inches - a.inches)
      .map(([label, { rides: groupRides }]) => [label, groupRides]);
    if (noReq.length) sorted.push(['No Requirement', noReq]);
    return sorted;
  }, [rides, viewMode]);

  return (
    <section id={sectionId} style={{ background, ...themeVars }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Rides & Attractions</h2>
          <p className="subtitle">Every ride at {parkName}, filtered for our crew</p>
        </div>

        {callouts && callouts.length > 0 && (
          <div className={styles.callouts}>
            {callouts.map((c) => (
              <div key={c.name} className={`${styles.callout} reveal`}>
                <span className={styles.calloutEmoji}>{c.emoji}</span>
                <div>
                  <strong className={styles.calloutName}>{c.name}</strong>
                  <p className={styles.calloutTip}>{c.tip}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.filters}>
          {VIEW_MODES.map((m) => (
            <button
              key={m.key}
              className={`${styles.filterBtn} ${viewMode === m.key ? styles.active : ''}`}
              onClick={() => setViewMode(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {grouped.map(([group, groupRides]) => (
          <div key={group} className={styles.landGroup}>
            <h3 className={styles.landTitle}>{group}</h3>
            <div className={styles.rideGrid}>
              {groupRides.map((ride) => (
                <div key={ride.id} className={styles.rideCard} role="button" tabIndex={0} onClick={() => onSelectItem?.(ride)} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(ride)}>
                  <div className={styles.rideHeader}>
                    <span className={styles.rideEmoji}>{ride.emoji}</span>
                    <h4 className={styles.rideName}>{ride.name}</h4>
                  </div>
                  <div className={styles.badges}>
                    <span
                      className={styles.badge}
                      style={{ background: 'var(--badge-bg, #e8e8e8)', color: 'var(--text)' }}
                    >
                      {ride.heightReq || 'Any Height'}
                    </span>
                    {ride.lightningLane && (
                      <span className={styles.llBadge}>Lightning Lane</span>
                    )}
                  </div>
                  <p className={styles.rideDesc}>{ride.description}</p>
                  {ride.tip && <p className={styles.rideTip}>{ride.tip}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

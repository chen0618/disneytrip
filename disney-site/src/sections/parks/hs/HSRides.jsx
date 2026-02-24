import { useState, useMemo } from 'react';
import { mapRides } from '../../../data/mapRides';
import styles from './HSRides.module.css';

const FILTERS = [
  { key: 'all', label: 'All Rides' },
  { key: 'luna', label: 'Luna Can Ride' },
  { key: 'clara', label: 'Clara Can Ride' },
];

export default function HSRides() {
  const [filter, setFilter] = useState('all');

  const hsRides = useMemo(() => {
    let rides = mapRides.filter((r) => r.park === 'Hollywood Studios');
    if (filter === 'luna') rides = rides.filter((r) => r.lunaCanRide);
    if (filter === 'clara') rides = rides.filter((r) => r.claraCanRide);
    return rides;
  }, [filter]);

  // Group by land
  const grouped = useMemo(() => {
    const map = {};
    hsRides.forEach((r) => {
      if (!map[r.land]) map[r.land] = [];
      map[r.land].push(r);
    });
    return Object.entries(map);
  }, [hsRides]);

  return (
    <section id="hs-rides" style={{ background: 'var(--bg-alt)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Rides & Attractions</h2>
          <p className="subtitle">Every ride at Hollywood Studios, filtered for our crew</p>
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

        {grouped.map(([land, rides]) => (
          <div key={land} className={styles.landGroup}>
            <h3 className={styles.landTitle}>{land}</h3>
            <div className={styles.rideGrid}>
              {rides.map((ride) => (
                <div key={ride.id} className={styles.rideCard}>
                  <div className={styles.rideHeader}>
                    <span className={styles.rideEmoji}>{ride.emoji}</span>
                    <h4 className={styles.rideName}>{ride.name}</h4>
                  </div>
                  <div className={styles.badges}>
                    {ride.heightReq && (
                      <span
                        className={styles.badge}
                        style={{
                          background: ride.claraCanRide ? '#d4edda' : '#f8d7da',
                          color: ride.claraCanRide ? '#155724' : '#721c24',
                        }}
                      >
                        {ride.heightReq}
                      </span>
                    )}
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

        {hsRides.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
            No rides match this filter.
          </p>
        )}
      </div>
    </section>
  );
}

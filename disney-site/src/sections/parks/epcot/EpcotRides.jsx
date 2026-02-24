import { useState, useMemo } from 'react';
import { mapRides } from '../../../data/mapRides';
import styles from './EpcotRides.module.css';

const FILTERS = [
  { key: 'all', label: 'All Rides' },
  { key: 'luna', label: 'Luna Can Ride' },
  { key: 'clara', label: 'Clara Can Ride' },
];

const CALLOUTS = [
  {
    name: 'Guardians of the Galaxy: Cosmic Rewind',
    emoji: '\uD83C\uDFB6',
    tip: 'Virtual Queue ONLY \u2014 no standby line! Join at 7:00 AM sharp from your phone, or try again at 1:00 PM. Everyone in your party must have a valid park ticket and reservation linked to My Disney Experience. Set an alarm!',
  },
  {
    name: 'Test Track',
    emoji: '\uD83C\uDFC1',
    tip: 'Design your own car in the pre-show area before the ride! Your car gets scored on speed, efficiency, and more. Kids LOVE the design phase even if they can\'t ride (40" min).',
  },
  {
    name: 'Frozen Ever After',
    emoji: '\u2744\uFE0F',
    tip: 'Rope drop priority #1! Lines hit 60+ minutes by mid-morning. During Early Entry (7:30 AM), you can walk on in under 10 minutes. No height requirement \u2014 perfect for Luna AND Clara.',
  },
];

export default function EpcotRides() {
  const [filter, setFilter] = useState('all');

  const epcotRides = useMemo(() => {
    let rides = mapRides.filter((r) => r.park === 'EPCOT');
    if (filter === 'luna') rides = rides.filter((r) => r.lunaCanRide);
    if (filter === 'clara') rides = rides.filter((r) => r.claraCanRide);
    return rides;
  }, [filter]);

  const grouped = useMemo(() => {
    const map = {};
    epcotRides.forEach((r) => {
      if (!map[r.land]) map[r.land] = [];
      map[r.land].push(r);
    });
    return Object.entries(map);
  }, [epcotRides]);

  return (
    <section id="epcot-rides" style={{ background: 'var(--bg)' }}>
      <div className="section-inner">
        <div className="section-header reveal">
          <h2>Rides & Attractions</h2>
          <p className="subtitle">Every ride at EPCOT, filtered for our crew</p>
        </div>

        {/* Feature Callouts */}
        <div className={styles.callouts}>
          {CALLOUTS.map((c) => (
            <div key={c.name} className={`${styles.callout} reveal`}>
              <span className={styles.calloutEmoji}>{c.emoji}</span>
              <div>
                <strong className={styles.calloutName}>{c.name}</strong>
                <p className={styles.calloutTip}>{c.tip}</p>
              </div>
            </div>
          ))}
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

        {epcotRides.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-light)', marginTop: '2rem' }}>
            No rides match this filter.
          </p>
        )}
      </div>
    </section>
  );
}

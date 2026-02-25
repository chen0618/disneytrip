import { useState, useMemo } from 'react';
import { mapRides } from '../../../data/mapRides';
import styles from './EpcotRides.module.css';

const VIEW_MODES = [
  { key: 'land', label: 'By Land' },
  { key: 'height', label: 'By Height' },
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
    tip: 'Design your own car in the pre-show area before the ride! Your car gets scored on speed, efficiency, and more. Kids LOVE the design phase even if they can\'t ride (40" height requirement).',
  },
  {
    name: 'Frozen Ever After',
    emoji: '\u2744\uFE0F',
    tip: 'Rope drop priority #1! Lines hit 60+ minutes by mid-morning. During Early Entry (7:30 AM), you can walk on in under 10 minutes. No height requirement \u2014 perfect for the whole family.',
  },
];

export default function EpcotRides({ onSelectItem }) {
  const [viewMode, setViewMode] = useState('land');

  const epcotRides = useMemo(
    () => mapRides.filter((r) => r.park === 'EPCOT'),
    [],
  );

  const grouped = useMemo(() => {
    if (viewMode === 'land') {
      const map = {};
      epcotRides.forEach((r) => {
        if (!map[r.land]) map[r.land] = [];
        map[r.land].push(r);
      });
      return Object.entries(map);
    }
    const withReq = epcotRides.filter((r) => r.heightReqInches > 0);
    const noReq = epcotRides.filter((r) => r.heightReqInches === 0);
    const tierMap = {};
    withReq.forEach((r) => {
      const label = r.heightReq;
      if (!tierMap[label]) tierMap[label] = { inches: r.heightReqInches, rides: [] };
      tierMap[label].rides.push(r);
    });
    const sorted = Object.entries(tierMap)
      .sort(([, a], [, b]) => b.inches - a.inches)
      .map(([label, { rides }]) => [label, rides]);
    if (noReq.length) sorted.push(['No Requirement', noReq]);
    return sorted;
  }, [epcotRides, viewMode]);

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

        {grouped.map(([group, rides]) => (
          <div key={group} className={styles.landGroup}>
            <h3 className={styles.landTitle}>{group}</h3>
            <div className={styles.rideGrid}>
              {rides.map((ride) => (
                <div key={ride.id} className={styles.rideCard} role="button" tabIndex={0} onClick={() => onSelectItem?.(ride)} onKeyDown={(e) => e.key === 'Enter' && onSelectItem?.(ride)}>
                  <div className={styles.rideHeader}>
                    <span className={styles.rideEmoji}>{ride.emoji}</span>
                    <h4 className={styles.rideName}>{ride.name}</h4>
                  </div>
                  <div className={styles.badges}>
                    <span
                      className={styles.badge}
                      style={{ background: '#e8e8e8', color: '#333' }}
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

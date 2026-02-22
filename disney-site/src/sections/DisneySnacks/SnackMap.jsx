import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../styles/leaflet-overrides.css';
import snacks from '../../data/snacks';
import mapParks from '../../data/mapParks';
import { boatCoords, busRoutes, skylinerRoutes } from '../../data/busRoutes';
import { parkBoundaries } from '../../data/parkBoundaries';
import { mapShows } from '../../data/mapShows';

const DISNEY_CENTER = [28.385, -81.564];

function emojiIcon(emoji, cls = '') {
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker ${cls}">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

function parkIcon(label, cls) {
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker park-marker ${cls}">${label}</div>`,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -28],
  });
}

const showTypeColors = {
  show: '#E84393',
  fireworks: '#FDCB6E',
  parade: '#6C5CE7',
};

function showIcon(emoji, type) {
  const color = showTypeColors[type] || '#E84393';
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker show-marker" style="border-color:${color};box-shadow:0 2px 8px ${color}80;">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

function snackPopupHtml(s) {
  return `<div class="snack-popup">
    ${s.image ? `<img class="popup-img" src="${s.image}" alt="${s.name}" loading="lazy"/>` : ''}
    <h4>${s.emoji} ${s.name}</h4><p>${s.description}</p>
    <div class="popup-location">📍 ${s.location}</div>
    <span class="popup-price">${s.price}</span>
  </div>`;
}

// Imperative MarkerCluster layer added via useMap
function SnackClusterLayer({ visible }) {
  const map = useMap();
  const clusterRef = useRef(null);

  useEffect(() => {
    const cluster = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction(c) {
        return L.divIcon({
          className: '',
          html: `<div class="emoji-marker" style="background:#1E90FF;color:white;font-weight:800;font-size:15px;border-color:#1E90FF;">${c.getChildCount()}</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      },
    });

    snacks.forEach(s => {
      const marker = L.marker([s.lat, s.lng], { icon: emojiIcon(s.emoji) })
        .bindPopup(snackPopupHtml(s), { maxWidth: 280 });
      cluster.addLayer(marker);
    });

    clusterRef.current = cluster;
    if (visible) map.addLayer(cluster);

    return () => {
      map.removeLayer(cluster);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!clusterRef.current) return;
    if (visible && !map.hasLayer(clusterRef.current)) {
      map.addLayer(clusterRef.current);
    } else if (!visible && map.hasLayer(clusterRef.current)) {
      map.removeLayer(clusterRef.current);
    }
  }, [visible, map]);

  return null;
}

// Animated marker that bounces along coordinates
function AnimatedMarker({ coords, icon, interval, popup }) {
  const [index, setIndex] = useState(0);
  const forwardRef = useRef(true);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => {
        if (forwardRef.current) {
          if (prev >= coords.length - 1) {
            forwardRef.current = false;
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            forwardRef.current = true;
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, interval);
    return () => clearInterval(id);
  }, [coords.length, interval]);

  return (
    <Marker position={coords[index]} icon={icon} zIndexOffset={2000}>
      {popup && <Popup>{popup}</Popup>}
    </Marker>
  );
}

// Fly map to a boundary's bounds
function FlyToBoundary({ target, onDone }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    const bounds = L.latLngBounds(target.coords);
    map.flyToBounds(bounds, { padding: [40, 40], maxZoom: 15, duration: 0.8 });
    onDone();
  }, [target, map, onDone]);
  return null;
}

// Lazy map resize when it comes into view
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { map.invalidateSize(); obs.disconnect(); }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [map]);
  return null;
}

const boatIcon = L.divIcon({
  className: '',
  html: '<div class="boat-marker">🚢</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function busIconColored(color) {
  return L.divIcon({
    className: '',
    html: `<div class="bus-marker" style="background:${color};border-color:${color};box-shadow:0 2px 10px ${color}80;">🚌</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function skylinerIconColored(color) {
  return L.divIcon({
    className: '',
    html: `<div class="skyliner-marker" style="background:${color};border-color:${color};box-shadow:0 2px 10px ${color}80;">🚡</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

// Legend entries for each transport mode
const busLegend = [
  { color: '#FF6B6B', label: 'Magic Kingdom' },
  { color: '#FFD700', label: 'EPCOT' },
  { color: '#4ECDC4', label: 'Hollywood Studios' },
  { color: '#A29BFE', label: 'Disney Springs' },
];

const skylinerLegend = [
  { color: '#FF6B35', label: 'Pop Century → Caribbean Beach' },
  { color: '#9B59B6', label: 'Caribbean Beach → EPCOT' },
  { color: '#2ECC71', label: 'Caribbean Beach → Hollywood Studios' },
];

const boatLegend = [
  { color: '#1E90FF', label: 'Sassagoula River Cruise' },
];

const showsLegend = [
  { color: '#E84393', label: 'Stage Shows' },
  { color: '#FDCB6E', label: 'Fireworks' },
  { color: '#6C5CE7', label: 'Parades' },
];

export default function SnackMap({ fullPage = false }) {
  const [layer, setLayer] = useState('all');
  const [transportMode, setTransportMode] = useState('bus');
  const [showMode, setShowMode] = useState('all');
  const [visibleBoundaries, setVisibleBoundaries] = useState(new Set());
  const [flyTarget, setFlyTarget] = useState(null);
  const showFood = layer === 'all' || layer === 'food';
  const showTransport = layer === 'all' || layer === 'transport';
  const showShows = layer === 'all' || layer === 'shows';
  // In "Show All" mode, display all transport; in "Transport" mode, respect sub-toggle
  const showBus = showTransport && (layer === 'all' || transportMode === 'bus' || transportMode === 'all');
  const showSkyliner = showTransport && (layer === 'all' || transportMode === 'skyliner' || transportMode === 'all');
  const showBoat = showTransport && (layer === 'all' || transportMode === 'boat' || transportMode === 'all');
  // Show type filtering
  const visibleShowTypes = showShows
    ? (layer === 'all' || showMode === 'all'
      ? ['show', 'fireworks', 'parade']
      : [showMode])
    : [];

  function toggleBoundary(id) {
    setVisibleBoundaries(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setFlyTarget(parkBoundaries.find(b => b.id === id));
      }
      return next;
    });
  }

  const clearFlyTarget = useRef(() => setFlyTarget(null));
  clearFlyTarget.current = () => setFlyTarget(null);

  // Build legend based on active layers
  const transportLegendItems = showTransport
    ? (layer === 'all' || transportMode === 'all'
      ? [...busLegend, ...skylinerLegend, ...boatLegend]
      : transportMode === 'bus' ? busLegend
      : transportMode === 'skyliner' ? skylinerLegend
      : transportMode === 'boat' ? boatLegend
      : [...busLegend, ...skylinerLegend, ...boatLegend])
    : [];
  const showLegendItems = showShows
    ? (layer === 'all' || showMode === 'all'
      ? showsLegend
      : showsLegend.filter(l => l.label.toLowerCase().includes(showMode)))
    : [];
  const activeLegend = [...transportLegendItems, ...showLegendItems];

  return (
    <div className={`snack-map-container ${fullPage ? 'snack-map-fullpage' : 'reveal-scale'}`}>
      {!fullPage && (
        <>
          <h3>Where to Find the Best Snacks</h3>
          <p className="map-hint" style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1rem' }}>
            Pinch to zoom &bull; Tap pins for details &bull; Watch the animations!
          </p>
        </>
      )}
      <div className="map-toggle-bar">
        <button className={`map-toggle-btn ${layer === 'all' ? 'active' : ''}`} onClick={() => setLayer('all')}>Show All</button>
        <button className={`map-toggle-btn ${layer === 'food' ? 'active' : ''}`} onClick={() => setLayer('food')}>🍽️ Snacks</button>
        <button className={`map-toggle-btn ${layer === 'transport' ? 'active' : ''}`} onClick={() => setLayer('transport')}>🚌 Transportation</button>
        <button className={`map-toggle-btn ${layer === 'shows' ? 'active' : ''}`} onClick={() => setLayer('shows')}>🎭 Shows & Events</button>
      </div>

      {/* Transport sub-toggles (only when Transport is the active filter) */}
      {layer === 'transport' && (
        <div className="map-toggle-bar sub-toggle">
          <button className={`map-toggle-btn sub ${transportMode === 'all' ? 'active' : ''}`} onClick={() => setTransportMode('all')}>All Transport</button>
          <button className={`map-toggle-btn sub ${transportMode === 'bus' ? 'active' : ''}`} onClick={() => setTransportMode('bus')}>🚌 Bus Routes</button>
          <button className={`map-toggle-btn sub ${transportMode === 'skyliner' ? 'active' : ''}`} onClick={() => setTransportMode('skyliner')}>🚡 Skyliner</button>
          <button className={`map-toggle-btn sub ${transportMode === 'boat' ? 'active' : ''}`} onClick={() => setTransportMode('boat')}>🚢 River Boat</button>
        </div>
      )}

      {/* Shows sub-toggles (only when Shows is the active filter) */}
      {layer === 'shows' && (
        <div className="map-toggle-bar sub-toggle">
          <button className={`map-toggle-btn sub show-sub ${showMode === 'all' ? 'active' : ''}`} onClick={() => setShowMode('all')}>All Events</button>
          <button className={`map-toggle-btn sub show-sub ${showMode === 'show' ? 'active' : ''}`} onClick={() => setShowMode('show')}>🎵 Stage Shows</button>
          <button className={`map-toggle-btn sub show-sub ${showMode === 'fireworks' ? 'active' : ''}`} onClick={() => setShowMode('fireworks')}>🎆 Fireworks</button>
          <button className={`map-toggle-btn sub show-sub ${showMode === 'parade' ? 'active' : ''}`} onClick={() => setShowMode('parade')}>🎪 Parades</button>
        </div>
      )}

      <div className="map-toggle-bar boundary-sub">
        <span className="boundary-label">📐 Boundaries</span>
        <button
          className="map-toggle-btn sub boundary-overview"
          onClick={() => setFlyTarget({ coords: parkBoundaries.flatMap(b => b.coords) })}
        >🗺️ Overview</button>
        {parkBoundaries.map(b => (
          <button
            key={b.id}
            className={`map-toggle-btn sub ${visibleBoundaries.has(b.id) ? 'active' : ''}`}
            style={visibleBoundaries.has(b.id)
              ? { background: b.color, borderColor: b.color, color: b.color === '#FFD700' ? '#2D3436' : 'white' }
              : { borderColor: b.color, color: b.color }}
            onClick={() => toggleBoundary(b.id)}
          >{b.name}</button>
        ))}
      </div>

      <div className="map-legend">
        {activeLegend.map(l => (
          <span key={l.label} className="legend-item">
            <span className="legend-line" style={{ background: l.color }} /> {l.label}
          </span>
        ))}
      </div>

      <MapContainer
        center={DISNEY_CENTER}
        zoom={13}
        minZoom={12}
        maxZoom={18}
        scrollWheelZoom={fullPage}
        style={{ width: '100%', height: fullPage ? '100%' : 500, borderRadius: fullPage ? 0 : 'var(--radius-sm)', zIndex: 1, flex: fullPage ? 1 : undefined }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
        />
        <MapResizer />
        <FlyToBoundary target={flyTarget} onDone={clearFlyTarget.current} />

        {/* Park markers (always visible) */}
        {mapParks.map(p => (
          <Marker key={p.label} position={[p.lat, p.lng]} icon={parkIcon(p.label, p.cls)} zIndexOffset={1000}>
            <Popup><b>{p.name}</b><br />{p.desc}</Popup>
          </Marker>
        ))}

        {/* Boundary overlays */}
        {parkBoundaries.map(b =>
          visibleBoundaries.has(b.id) && (
            <Polygon
              key={b.id}
              positions={b.coords}
              pathOptions={{ color: b.color, weight: 2, opacity: 0.8, fillColor: b.color, fillOpacity: 0.15 }}
            >
              <Popup><b>{b.name}</b><br />Boundary outline</Popup>
            </Polygon>
          )
        )}

        {/* Snack markers (clustered) */}
        <SnackClusterLayer visible={showFood} />

        {/* River Boat route */}
        {showBoat && (
          <>
            <Polyline
              positions={boatCoords}
              pathOptions={{ color: '#1E90FF', weight: 4, opacity: 0.7, dashArray: '10,8', className: 'boat-route-animated' }}
            />
            <AnimatedMarker
              coords={boatCoords}
              icon={boatIcon}
              interval={800}
              popup={<><b>Free Boat Ride!</b><br />Sassagoula River Cruise<br />Disney Springs → Port Orleans FQ<br />~17 min each way</>}
            />
          </>
        )}

        {/* Bus routes */}
        {showBus && (
          <>
            {busRoutes.map((r, i) => (
              <Polyline
                key={i}
                positions={r.coords}
                pathOptions={{ color: r.color, weight: 4, opacity: 0.8, dashArray: '8,6', className: 'bus-route-animated' }}
              />
            ))}
            {busRoutes.map((r, i) => (
              <AnimatedMarker
                key={`bus-${i}`}
                coords={r.coords}
                icon={busIconColored(r.color)}
                interval={600}
                popup={<><b>🚌 Disney Bus</b><br />{r.label}<br />{r.time}</>}
              />
            ))}
          </>
        )}

        {/* Skyliner routes */}
        {showSkyliner && (
          <>
            {skylinerRoutes.map((r, i) => (
              <Polyline
                key={`sky-line-${i}`}
                positions={r.coords}
                pathOptions={{ color: r.color, weight: 4, opacity: 0.8, dashArray: '12,6', className: 'skyliner-route-animated' }}
              />
            ))}
            {skylinerRoutes.map((r, i) => (
              <AnimatedMarker
                key={`sky-${i}`}
                coords={r.coords}
                icon={skylinerIconColored(r.color)}
                interval={700}
                popup={<><b>🚡 Disney Skyliner</b><br />{r.label}<br />{r.time}</>}
              />
            ))}
          </>
        )}
        {/* Shows & Events markers */}
        {visibleShowTypes.length > 0 && mapShows
          .filter(s => visibleShowTypes.includes(s.type))
          .map(s => (
            <Marker key={s.id} position={[s.lat, s.lng]} icon={showIcon(s.emoji, s.type)} zIndexOffset={1500}>
              <Popup>
                <div className="snack-popup">
                  <h4>{s.emoji} {s.name}</h4>
                  <p>{s.description}</p>
                  <div className="popup-location">📍 {s.park}</div>
                  {s.time && <span className="popup-price">{s.time}</span>}
                  {s.tip && <p style={{ fontSize: '0.78rem', color: '#636e72', marginTop: '6px', fontStyle: 'italic' }}>{s.tip}</p>}
                </div>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../styles/leaflet-overrides.css';
import snacks from '../../data/snacks';
import { mapRides } from '../../data/mapRides';
import springsVenues from '../../data/springsVenues';
import mapParks from '../../data/mapParks';
import { boatCoords, busRoutes, skylinerRoutes } from '../../data/busRoutes';
import { parkBoundaries } from '../../data/parkBoundaries';
import { mapShows } from '../../data/mapShows';

const DISNEY_CENTER = [28.385, -81.564];

const parkColors = {
  'Magic Kingdom': '#FF6B6B',
  'Hollywood Studios': '#4ECDC4',
  'EPCOT': '#FFD700',
};

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

function rideIcon(emoji, park) {
  const color = parkColors[park] || '#1E90FF';
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker ride-marker" style="border-color:${color};box-shadow:0 2px 8px ${color}80;">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function venueIcon(emoji) {
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker" style="border-color:#1E90FF;box-shadow:0 2px 8px rgba(30,144,255,0.5);">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Determine park from snack location string
function snackPark(location) {
  if (location.includes('Magic Kingdom')) return 'Magic Kingdom';
  if (location.includes('EPCOT')) return 'EPCOT';
  if (location.includes('Hollywood Studios')) return 'Hollywood Studios';
  return 'other';
}

// Imperative MarkerCluster layer for food items (snacks + venues)
function FoodClusterLayer({ visible, foodParkFilter, onSelectItem }) {
  const map = useMap();
  const clusterRef = useRef(null);
  const prevFilterRef = useRef(null);

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

    clusterRef.current = cluster;
    if (visible) map.addLayer(cluster);

    return () => {
      map.removeLayer(cluster);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Rebuild markers when filter changes
  useEffect(() => {
    if (!clusterRef.current) return;
    const cluster = clusterRef.current;
    cluster.clearLayers();

    // Filter and add snack markers
    const filteredSnacks = foodParkFilter === 'all'
      ? snacks
      : snacks.filter(s => {
          const park = snackPark(s.location);
          if (foodParkFilter === 'Disney Springs') return park === 'other';
          return park === foodParkFilter;
        });

    filteredSnacks.forEach(s => {
      const marker = L.marker([s.lat, s.lng], { icon: emojiIcon(s.emoji) });
      marker.on('click', () => onSelectItem({ ...s, type: 'food' }));
      cluster.addLayer(marker);
    });

    // Filter and add venue markers (Disney Springs)
    if (foodParkFilter === 'all' || foodParkFilter === 'Disney Springs') {
      springsVenues.forEach(v => {
        const marker = L.marker([v.lat, v.lng], { icon: venueIcon(v.emoji) });
        marker.on('click', () => onSelectItem({ ...v, type: 'venue' }));
        cluster.addLayer(marker);
      });
    }

    prevFilterRef.current = foodParkFilter;
  }, [foodParkFilter, onSelectItem]);

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

const ridesLegend = [
  { color: '#FF6B6B', label: 'Magic Kingdom' },
  { color: '#4ECDC4', label: 'Hollywood Studios' },
  { color: '#FFD700', label: 'EPCOT' },
];

export default function InteractiveMap({ onSelectItem }) {
  const [layer, setLayer] = useState('rides');
  const [transportMode, setTransportMode] = useState('bus');
  const [showMode, setShowMode] = useState('all');
  const [rideParkFilter, setRideParkFilter] = useState('all');
  const [heightFilter, setHeightFilter] = useState(null);
  const [foodParkFilter, setFoodParkFilter] = useState('all');
  const [visibleBoundaries, setVisibleBoundaries] = useState(new Set());
  const [flyTarget, setFlyTarget] = useState(null);

  const showFood = layer === 'food';
  const showTransport = layer === 'transport';
  const showShows = layer === 'shows';
  const showRides = layer === 'rides';

  const showBus = showTransport && (transportMode === 'bus' || transportMode === 'all');
  const showSkyliner = showTransport && (transportMode === 'skyliner' || transportMode === 'all');
  const showBoat = showTransport && (transportMode === 'boat' || transportMode === 'all');

  const visibleShowTypes = showShows
    ? (showMode === 'all' ? ['show', 'fireworks', 'parade'] : [showMode])
    : [];

  // Filter rides
  const filteredRides = showRides
    ? mapRides.filter(r => {
        if (rideParkFilter !== 'all') {
          if (rideParkFilter === 'MK' && r.park !== 'Magic Kingdom') return false;
          if (rideParkFilter === 'HS' && r.park !== 'Hollywood Studios') return false;
          if (rideParkFilter === 'EPCOT' && r.park !== 'EPCOT') return false;
        }
        if (heightFilter === 'luna' && !r.lunaCanRide) return false;
        if (heightFilter === 'clara' && !r.claraCanRide) return false;
        return true;
      })
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

  // Build legend based on active layer
  let activeLegend = [];
  if (layer === 'rides') {
    activeLegend = ridesLegend;
  } else if (layer === 'shows') {
    activeLegend = showMode === 'all'
      ? showsLegend
      : showsLegend.filter(l => l.label.toLowerCase().includes(showMode));
  } else if (layer === 'transport') {
    activeLegend = transportMode === 'all'
      ? [...busLegend, ...skylinerLegend, ...boatLegend]
      : transportMode === 'bus' ? busLegend
      : transportMode === 'skyliner' ? skylinerLegend
      : transportMode === 'boat' ? boatLegend
      : [...busLegend, ...skylinerLegend, ...boatLegend];
  }

  // Stable callback ref for FoodClusterLayer
  const onSelectItemRef = useRef(onSelectItem);
  onSelectItemRef.current = onSelectItem;
  const stableOnSelectItem = useRef((item) => onSelectItemRef.current(item));

  return (
    <div className="snack-map-container snack-map-fullpage">
      <div className="map-toggle-bar">
        <button className={`map-toggle-btn ${layer === 'rides' ? 'active' : ''}`} onClick={() => setLayer('rides')}>🎢 Rides</button>
        <button className={`map-toggle-btn ${layer === 'food' ? 'active' : ''}`} onClick={() => setLayer('food')}>🍽️ Food & Dining</button>
        <button className={`map-toggle-btn ${layer === 'shows' ? 'active' : ''}`} onClick={() => setLayer('shows')}>🎭 Shows & Events</button>
        <button className={`map-toggle-btn ${layer === 'transport' ? 'active' : ''}`} onClick={() => setLayer('transport')}>🚌 Transportation</button>
      </div>

      {/* Rides sub-filters */}
      {layer === 'rides' && (
        <>
          <div className="map-toggle-bar sub-toggle">
            <button className={`map-toggle-btn sub ride-sub ${rideParkFilter === 'all' ? 'active' : ''}`} onClick={() => setRideParkFilter('all')}>All Parks</button>
            <button className={`map-toggle-btn sub ride-sub ${rideParkFilter === 'MK' ? 'active' : ''}`} onClick={() => setRideParkFilter('MK')}>MK</button>
            <button className={`map-toggle-btn sub ride-sub ${rideParkFilter === 'HS' ? 'active' : ''}`} onClick={() => setRideParkFilter('HS')}>HS</button>
            <button className={`map-toggle-btn sub ride-sub ${rideParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => setRideParkFilter('EPCOT')}>EPCOT</button>
          </div>
          <div className="map-toggle-bar sub-toggle">
            <button className={`map-toggle-btn sub ride-sub ${heightFilter === 'luna' ? 'active' : ''}`} onClick={() => setHeightFilter(heightFilter === 'luna' ? null : 'luna')}>Luna can ride</button>
            <button className={`map-toggle-btn sub ride-sub ${heightFilter === 'clara' ? 'active' : ''}`} onClick={() => setHeightFilter(heightFilter === 'clara' ? null : 'clara')}>Clara can ride</button>
          </div>
        </>
      )}

      {/* Food sub-filters */}
      {layer === 'food' && (
        <div className="map-toggle-bar sub-toggle">
          <button className={`map-toggle-btn sub ${foodParkFilter === 'all' ? 'active' : ''}`} onClick={() => setFoodParkFilter('all')}>All</button>
          <button className={`map-toggle-btn sub ${foodParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => setFoodParkFilter('Magic Kingdom')}>MK</button>
          <button className={`map-toggle-btn sub ${foodParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => setFoodParkFilter('EPCOT')}>EPCOT</button>
          <button className={`map-toggle-btn sub ${foodParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => setFoodParkFilter('Hollywood Studios')}>HS</button>
          <button className={`map-toggle-btn sub ${foodParkFilter === 'Disney Springs' ? 'active' : ''}`} onClick={() => setFoodParkFilter('Disney Springs')}>Disney Springs</button>
        </div>
      )}

      {/* Transport sub-toggles */}
      {layer === 'transport' && (
        <div className="map-toggle-bar sub-toggle">
          <button className={`map-toggle-btn sub ${transportMode === 'all' ? 'active' : ''}`} onClick={() => setTransportMode('all')}>All Transport</button>
          <button className={`map-toggle-btn sub ${transportMode === 'bus' ? 'active' : ''}`} onClick={() => setTransportMode('bus')}>🚌 Bus Routes</button>
          <button className={`map-toggle-btn sub ${transportMode === 'skyliner' ? 'active' : ''}`} onClick={() => setTransportMode('skyliner')}>🚡 Skyliner</button>
          <button className={`map-toggle-btn sub ${transportMode === 'boat' ? 'active' : ''}`} onClick={() => setTransportMode('boat')}>🚢 River Boat</button>
        </div>
      )}

      {/* Shows sub-toggles */}
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
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
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

        {/* Ride markers */}
        {showRides && filteredRides.map(r => (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={rideIcon(r.emoji, r.park)}
            zIndexOffset={1500}
            eventHandlers={{ click: () => onSelectItem(r) }}
          />
        ))}

        {/* Food markers (clustered snacks + venues) */}
        <FoodClusterLayer
          visible={showFood}
          foodParkFilter={foodParkFilter}
          onSelectItem={stableOnSelectItem.current}
        />

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
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={showIcon(s.emoji, s.type)}
              zIndexOffset={1500}
              eventHandlers={{ click: () => onSelectItem(s) }}
            />
          ))
        }
      </MapContainer>
    </div>
  );
}

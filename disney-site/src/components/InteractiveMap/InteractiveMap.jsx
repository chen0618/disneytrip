import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import '../../styles/leaflet-overrides.css';
import { enrichItem } from '../../utils/enrichItem';
import emojiIcon from '../../utils/emojiIcon';
import snacks from '../../data/snacks';
import { mapRides } from '../../data/mapRides';
import springsVenues from '../../data/springsVenues';
import mapParks from '../../data/mapParks';
import { boatCoords, busRoutes, skylinerRoutes } from '../../data/busRoutes';
import { parkBoundaries } from '../../data/parkBoundaries';
import { mapShows } from '../../data/mapShows';
import { mapShops } from '../../data/mapShops';
import { mapPhotoSpots } from '../../data/mapPhotoSpots';

const DISNEY_CENTER = [28.385, -81.564];
const UNIVERSAL_IDS = ['usf', 'ioa', 'epic'];
const disneyBounds = L.latLngBounds(
  parkBoundaries.filter(b => !UNIVERSAL_IDS.includes(b.id)).flatMap(b => b.coords)
);

// Pre-compute transport bounds from route coordinates
const busBounds = L.latLngBounds(busRoutes.flatMap(r => r.coords));
const skylinerBounds = L.latLngBounds(skylinerRoutes.flatMap(r => r.coords));
const boatBounds = L.latLngBounds(boatCoords);
const allTransportBounds = L.latLngBounds([
  ...busRoutes.flatMap(r => r.coords),
  ...skylinerRoutes.flatMap(r => r.coords),
  ...boatCoords,
]);

const parkColors = {
  'Magic Kingdom': '#FF6B6B',
  'Hollywood Studios': '#A29BFE',
  'EPCOT': '#FFD700',
};

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

function rideIcon(emoji, park, closed) {
  const color = parkColors[park] || '#1E90FF';
  const closedStyle = closed ? 'opacity:0.5;filter:grayscale(1);' : '';
  const closedLabel = closed ? '<span style="position:absolute;top:-6px;right:-6px;background:#e74c3c;color:#fff;border-radius:50%;width:16px;height:16px;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700;">X</span>' : '';
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker ride-marker" style="border-color:${color};box-shadow:0 2px 8px ${color}80;${closedStyle}position:relative;">${emoji}${closedLabel}</div>`,
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

const PHOTO_COLORS = { landmark: '#00CEC9', 'hidden-gem': '#E84393' };

const photoIconLandmark = L.divIcon({
  className: '',
  html: `<div class="emoji-marker photo-marker" style="border-color:${PHOTO_COLORS.landmark};box-shadow:0 2px 8px ${PHOTO_COLORS.landmark}80;">📸</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});
const photoIconHiddenGem = L.divIcon({
  className: '',
  html: `<div class="emoji-marker photo-marker" style="border-color:${PHOTO_COLORS['hidden-gem']};box-shadow:0 2px 8px ${PHOTO_COLORS['hidden-gem']}80;">✨</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Determine park from snack location string
function snackPark(location) {
  if (location.includes('Magic Kingdom')) return 'Magic Kingdom';
  if (location.includes('EPCOT')) return 'EPCOT';
  if (location.includes('Hollywood Studios')) return 'Hollywood Studios';
  return 'other';
}

// Imperative MarkerCluster layer for food items (snacks + venues)
function FoodClusterLayer({ visible, foodParkFilter, foodServiceFilter, onSelectItem }) {
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
    const filteredSnacks = snacks.filter(s => {
      // Park filter
      if (foodParkFilter !== 'all') {
        const park = snackPark(s.location);
        if (foodParkFilter === 'Disney Springs' && park !== 'other') return false;
        if (foodParkFilter !== 'Disney Springs' && park !== foodParkFilter) return false;
      }
      // Service type filter
      if (foodServiceFilter !== 'all' && s.serviceType !== foodServiceFilter) return false;
      return true;
    });

    filteredSnacks.forEach(s => {
      const marker = L.marker([s.lat, s.lng], { icon: emojiIcon(s.emoji) });
      marker.on('click', () => onSelectItem({ ...s, type: 'food' }));
      cluster.addLayer(marker);
    });

    // Filter and add venue markers (Disney Springs)
    if (foodParkFilter === 'all' || foodParkFilter === 'Disney Springs') {
      const filteredVenues = foodServiceFilter === 'all'
        ? springsVenues
        : springsVenues.filter(v => v.serviceType === foodServiceFilter);
      filteredVenues.forEach(v => {
        const marker = L.marker([v.lat, v.lng], { icon: venueIcon(v.emoji) });
        marker.on('click', () => onSelectItem({ ...v, type: 'venue' }));
        cluster.addLayer(marker);
      });
    }

    prevFilterRef.current = foodParkFilter;
  }, [foodParkFilter, foodServiceFilter, onSelectItem]);

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

// Imperative MarkerCluster layer for shopping items
function ShoppingClusterLayer({ visible, shopParkFilter, onSelectItem }) {
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
          html: `<div class="emoji-marker" style="background:#E67E22;color:white;font-weight:800;font-size:15px;border-color:#E67E22;">${c.getChildCount()}</div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });
      },
    });
    clusterRef.current = cluster;
    if (visible) map.addLayer(cluster);
    return () => { map.removeLayer(cluster); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!clusterRef.current) return;
    const cluster = clusterRef.current;
    cluster.clearLayers();

    const filtered = shopParkFilter === 'all'
      ? mapShops
      : mapShops.filter(s => s.park === shopParkFilter);

    filtered.forEach(s => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="emoji-marker" style="border-color:#E67E22;box-shadow:0 2px 8px rgba(230,126,34,0.5);">${s.emoji}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const marker = L.marker([s.lat, s.lng], { icon });
      marker.on('click', () => onSelectItem({ ...s, type: 'shop' }));
      cluster.addLayer(marker);
    });
  }, [shopParkFilter, onSelectItem]);

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

// Smoothly animated marker — uses requestAnimationFrame + Leaflet setLatLng directly
function AnimatedMarker({ coords, icon, speed = 0.03, popup }) {
  const map = useMap();
  const markerRef = useRef(null);
  const animRef = useRef(null);
  const progressRef = useRef(0);
  const forwardRef = useRef(true);

  useEffect(() => {
    if (coords.length < 2) return;

    const marker = L.marker(coords[0], { icon, zIndexOffset: 2000 }).addTo(map);
    if (popup) marker.bindPopup(popup);
    markerRef.current = marker;

    let lastTime = 0;

    function lerp(a, b, t) {
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }

    function animate(time) {
      if (!lastTime) lastTime = time;
      const dt = (time - lastTime) / 1000; // seconds
      lastTime = time;

      // Advance progress along the path
      const step = speed * dt * 60; // normalize so speed feels same at any fps
      if (forwardRef.current) {
        progressRef.current += step;
        if (progressRef.current >= coords.length - 1) {
          progressRef.current = coords.length - 1;
          forwardRef.current = false;
        }
      } else {
        progressRef.current -= step;
        if (progressRef.current <= 0) {
          progressRef.current = 0;
          forwardRef.current = true;
        }
      }

      const segIndex = Math.floor(progressRef.current);
      const t = progressRef.current - segIndex;
      const from = coords[Math.min(segIndex, coords.length - 1)];
      const to = coords[Math.min(segIndex + 1, coords.length - 1)];
      const pos = lerp(from, to, t);

      marker.setLatLng(pos);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      map.removeLayer(marker);
    };
  }, [map, coords, icon, speed, popup]);

  return null;
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


// Set initial bounds to Disney parks only (excludes Universal)
function SetInitialBounds() {
  const map = useMap();
  useEffect(() => {
    if (disneyBounds.isValid()) {
      map.fitBounds(disneyBounds, { padding: [40, 40], maxZoom: 15 });
    }
  }, [map]);
  return null;
}

// Fly to transport bounds when layer/mode changes
function FlyToTransportBounds({ active, mode }) {
  const map = useMap();
  const prevRef = useRef({ active: false, mode: 'all' });

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = { active, mode };

    if (!active) return;
    // Only fly when transport layer is freshly activated or mode changes
    if (!prev.active || prev.mode !== mode) {
      const bounds = mode === 'bus' ? busBounds
        : mode === 'skyliner' ? skylinerBounds
        : mode === 'boat' ? boatBounds
        : allTransportBounds;
      // paddingTopLeft/paddingBottomRight account for overlay controls at top (~90px)
      const fitOpts = mode === 'bus'
        ? { paddingTopLeft: [5, 90], paddingBottomRight: [5, 10], maxZoom: 16, duration: 0.8 }
        : { padding: [60, 60], maxZoom: 16, duration: 0.8 };
      map.flyToBounds(bounds, fitOpts);
    }
  }, [active, mode, map]);

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


export default function InteractiveMap({ onSelectItem }) {
  const [layer, setLayer] = useState('rides');
  const [transportMode, setTransportMode] = useState('all');
  const [showMode, setShowMode] = useState('all');
  const [rideParkFilter, setRideParkFilter] = useState('all');
  const [foodParkFilter, setFoodParkFilter] = useState('all');
  const [foodServiceFilter, setFoodServiceFilter] = useState('all');
  const [shopParkFilter, setShopParkFilter] = useState('all');
  const [showParkFilter, setShowParkFilter] = useState('all');
  const [photoParkFilter, setPhotoParkFilter] = useState('all');
  const [transportParkNav, setTransportParkNav] = useState('all');
  const [flyTarget, setFlyTarget] = useState(null);

  const showFood = layer === 'food';
  const showTransport = layer === 'transport';
  const showShows = layer === 'shows';
  const showRides = layer === 'rides';
  const showShopping = layer === 'shopping';
  const showPhotos = layer === 'photos';

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
        return true;
      })
    : [];

  function flyToBoundary(id) {
    setFlyTarget(parkBoundaries.find(b => b.id === id));
  }

  function flyToOverview() {
    setFlyTarget({ coords: parkBoundaries.filter(b => !UNIVERSAL_IDS.includes(b.id)).flatMap(b => b.coords) });
  }


  // Park chip helpers: filter + fly (only fly if the filter actually changes)
  const PARK_BOUNDARY_MAP = { MK: 'mk', HS: 'hs', EPCOT: 'epcot', 'Magic Kingdom': 'mk', 'Hollywood Studios': 'hs', 'Disney Springs': 'ds' };

  function selectRidePark(val) {
    if (val === rideParkFilter) return;
    setRideParkFilter(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }
  function selectFoodPark(val) {
    if (val === foodParkFilter) return;
    setFoodParkFilter(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }
  function selectShopPark(val) {
    if (val === shopParkFilter) return;
    setShopParkFilter(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }
  function selectPhotoPark(val) {
    if (val === photoParkFilter) return;
    setPhotoParkFilter(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }
  function selectShowPark(val) {
    if (val === showParkFilter) return;
    setShowParkFilter(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }
  function selectTransportPark(val) {
    if (val === transportParkNav) return;
    setTransportParkNav(val);
    if (val === 'all') flyToOverview(); else flyToBoundary(PARK_BOUNDARY_MAP[val]);
  }

  const clearFlyTarget = useRef(() => setFlyTarget(null));
  clearFlyTarget.current = () => setFlyTarget(null);


  // Stable callback ref for FoodClusterLayer
  const onSelectItemRef = useRef(onSelectItem);
  onSelectItemRef.current = onSelectItem;
  const stableOnSelectItem = useRef((item) => onSelectItemRef.current(enrichItem(item)));

  return (
    <div className="snack-map-container snack-map-fullpage">
      {/* ─── Overlay Controls ─── */}
      <div className="map-overlay-controls">
        {/* Row 1: Back link + layer tabs + Go To toggle */}
        <div className="map-ctrl-row map-ctrl-primary">
          <Link to="/" className="map-back-link">← Back</Link>
          <div className="map-layer-tabs">
            <button className={`map-tab ${layer === 'rides' ? 'active' : ''}`} onClick={() => setLayer('rides')}><span className="tab-emoji">🎢 </span>Rides</button>
            <button className={`map-tab ${layer === 'food' ? 'active' : ''}`} onClick={() => setLayer('food')}><span className="tab-emoji">🍽️ </span>Food</button>
            <button className={`map-tab ${layer === 'shows' ? 'active' : ''}`} onClick={() => setLayer('shows')}><span className="tab-emoji">🎭 </span>Shows</button>
            <button className={`map-tab ${layer === 'shopping' ? 'active' : ''}`} onClick={() => setLayer('shopping')}><span className="tab-emoji">🛍️ </span>Shops</button>
            <button className={`map-tab ${layer === 'transport' ? 'active' : ''}`} onClick={() => setLayer('transport')}><span className="tab-emoji">🚌 </span>Transport</button>
            <button className={`map-tab ${layer === 'photos' ? 'active' : ''}`} onClick={() => setLayer('photos')}><span className="tab-emoji">📸 </span>Photos</button>
          </div>
        </div>

        {/* Row 2: Park filters (with fly-to) + type sub-filters */}
        <div className="map-ctrl-row map-ctrl-sub">
          {layer === 'rides' && (<>
            <button className={`map-chip ride-chip ${rideParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectRidePark('all')}>All</button>
            <button className={`map-chip ride-chip ${rideParkFilter === 'MK' ? 'active' : ''}`} onClick={() => selectRidePark('MK')}>MK</button>
            <button className={`map-chip ride-chip ${rideParkFilter === 'HS' ? 'active' : ''}`} onClick={() => selectRidePark('HS')}>HS</button>
            <button className={`map-chip ride-chip ${rideParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectRidePark('EPCOT')}>EPCOT</button>
          </>)}
          {layer === 'food' && (<>
            <button className={`map-chip ${foodParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectFoodPark('all')}>All</button>
            <button className={`map-chip ${foodParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectFoodPark('Magic Kingdom')}>MK</button>
            <button className={`map-chip ${foodParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectFoodPark('EPCOT')}>EPCOT</button>
            <button className={`map-chip ${foodParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectFoodPark('Hollywood Studios')}>HS</button>
            <button className={`map-chip ${foodParkFilter === 'Disney Springs' ? 'active' : ''}`} onClick={() => selectFoodPark('Disney Springs')}>DS</button>
            <span className="chip-sep">|</span>
            <button className={`map-chip ${foodServiceFilter === 'all' ? 'active' : ''}`} onClick={() => setFoodServiceFilter('all')}>All</button>
            <button className={`map-chip ${foodServiceFilter === 'table-service' ? 'active' : ''}`} onClick={() => setFoodServiceFilter('table-service')}>🍽️ Sit-Down</button>
            <button className={`map-chip ${foodServiceFilter === 'quick-service' ? 'active' : ''}`} onClick={() => setFoodServiceFilter('quick-service')}>🍔 Quick</button>
            <button className={`map-chip ${foodServiceFilter === 'snack' ? 'active' : ''}`} onClick={() => setFoodServiceFilter('snack')}>🍦 Snack</button>
          </>)}
          {layer === 'shopping' && (<>
            <button className={`map-chip ${shopParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectShopPark('all')}>All</button>
            <button className={`map-chip ${shopParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectShopPark('Magic Kingdom')}>MK</button>
            <button className={`map-chip ${shopParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectShopPark('Hollywood Studios')}>HS</button>
            <button className={`map-chip ${shopParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectShopPark('EPCOT')}>EPCOT</button>
            <button className={`map-chip ${shopParkFilter === 'Disney Springs' ? 'active' : ''}`} onClick={() => selectShopPark('Disney Springs')}>DS</button>
          </>)}
          {layer === 'transport' && (<>
            <button className={`map-chip ${transportParkNav === 'all' ? 'active' : ''}`} onClick={() => selectTransportPark('all')}>All</button>
            <button className={`map-chip ${transportParkNav === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectTransportPark('Magic Kingdom')}>MK</button>
            <button className={`map-chip ${transportParkNav === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectTransportPark('Hollywood Studios')}>HS</button>
            <button className={`map-chip ${transportParkNav === 'EPCOT' ? 'active' : ''}`} onClick={() => selectTransportPark('EPCOT')}>EPCOT</button>
            <button className={`map-chip ${transportParkNav === 'Disney Springs' ? 'active' : ''}`} onClick={() => selectTransportPark('Disney Springs')}>DS</button>
            <span className="chip-sep">|</span>
            <button className={`map-chip ${transportMode === 'all' ? 'active' : ''}`} onClick={() => setTransportMode('all')}>All</button>
            <button className={`map-chip ${transportMode === 'bus' ? 'active' : ''}`} onClick={() => setTransportMode('bus')}>🚌 Bus</button>
            <button className={`map-chip ${transportMode === 'skyliner' ? 'active' : ''}`} onClick={() => setTransportMode('skyliner')}>🚡 Skyliner</button>
            <button className={`map-chip ${transportMode === 'boat' ? 'active' : ''}`} onClick={() => setTransportMode('boat')}>🚢 Boat</button>
          </>)}
          {layer === 'shows' && (<>
            <button className={`map-chip show-chip ${showParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectShowPark('all')}>All</button>
            <button className={`map-chip show-chip ${showParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectShowPark('Magic Kingdom')}>MK</button>
            <button className={`map-chip show-chip ${showParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectShowPark('Hollywood Studios')}>HS</button>
            <button className={`map-chip show-chip ${showParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectShowPark('EPCOT')}>EPCOT</button>
            <button className={`map-chip show-chip ${showParkFilter === 'Disney Springs' ? 'active' : ''}`} onClick={() => selectShowPark('Disney Springs')}>DS</button>
            <span className="chip-sep">|</span>
            <button className={`map-chip show-chip ${showMode === 'all' ? 'active' : ''}`} onClick={() => setShowMode('all')}>All</button>
            <button className={`map-chip show-chip ${showMode === 'show' ? 'active' : ''}`} onClick={() => setShowMode('show')}>🎵 Stage</button>
            <button className={`map-chip show-chip ${showMode === 'fireworks' ? 'active' : ''}`} onClick={() => setShowMode('fireworks')}>🎆 Fireworks</button>
            <button className={`map-chip show-chip ${showMode === 'parade' ? 'active' : ''}`} onClick={() => setShowMode('parade')}>🎪 Parades</button>
          </>)}
          {layer === 'photos' && (<>
            <button className={`map-chip photo-chip ${photoParkFilter === 'all' ? 'active' : ''}`} onClick={() => selectPhotoPark('all')}>All</button>
            <button className={`map-chip photo-chip ${photoParkFilter === 'Magic Kingdom' ? 'active' : ''}`} onClick={() => selectPhotoPark('Magic Kingdom')}>MK</button>
            <button className={`map-chip photo-chip ${photoParkFilter === 'Hollywood Studios' ? 'active' : ''}`} onClick={() => selectPhotoPark('Hollywood Studios')}>HS</button>
            <button className={`map-chip photo-chip ${photoParkFilter === 'EPCOT' ? 'active' : ''}`} onClick={() => selectPhotoPark('EPCOT')}>EPCOT</button>
          </>)}
          <span className="chip-sep">|</span>
          <button className="map-chip map-home-btn" onClick={() => flyToBoundary('pc')}>🏠 Hotel</button>
        </div>
      </div>

      <MapContainer
        center={DISNEY_CENTER}
        zoom={13}
        minZoom={12}
        maxZoom={23}
        zoomSnap={0.25}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxNativeZoom={19}
          maxZoom={23}
        />
        <MapResizer />
        <SetInitialBounds />
        <FlyToBoundary target={flyTarget} onDone={clearFlyTarget.current} />
        <FlyToTransportBounds active={showTransport} mode={transportMode} />

        {/* Park markers (always visible) */}
        {mapParks.map(p => (
          <Marker
            key={p.label}
            position={[p.lat, p.lng]}
            icon={parkIcon(p.label, p.cls)}
            zIndexOffset={1000}
            eventHandlers={{ click: () => flyToBoundary(p.cls) }}
          />
        ))}

        {/* Boundary overlays (always visible) */}
        {parkBoundaries.map(b => (
          <Polygon
            key={b.id}
            positions={b.coords}
            pathOptions={{ color: b.color, weight: 2, opacity: 0.8, fillColor: b.color, fillOpacity: 0.15 }}
          >
            <Popup><b>{b.name}</b><br />Boundary outline</Popup>
          </Polygon>
        ))}

        {/* Ride markers */}
        {showRides && filteredRides.map(r => (
          <Marker
            key={r.id}
            position={[r.lat, r.lng]}
            icon={rideIcon(r.emoji, r.park, r.closed)}
            zIndexOffset={1500}
            eventHandlers={{ click: () => onSelectItem(enrichItem(r)) }}
          />
        ))}

        {/* Food markers (clustered snacks + venues) */}
        <FoodClusterLayer
          visible={showFood}
          foodParkFilter={foodParkFilter}
          foodServiceFilter={foodServiceFilter}
          onSelectItem={stableOnSelectItem.current}
        />
        <ShoppingClusterLayer
          visible={showShopping}
          shopParkFilter={shopParkFilter}
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
              speed={0.02}
              popup="<b>Free Boat Ride!</b><br/>Sassagoula River Cruise<br/>Disney Springs → Port Orleans FQ<br/>~17 min each way"
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
                speed={0.04}
                popup={`<b>🚌 Disney Bus</b><br/>${r.label}<br/>${r.time}`}
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
                speed={0.035}
                popup={`<b>🚡 Disney Skyliner</b><br/>${r.label}<br/>${r.time}`}
              />
            ))}
          </>
        )}

        {/* Shows & Events markers */}
        {visibleShowTypes.length > 0 && mapShows
          .filter(s => visibleShowTypes.includes(s.type))
          .filter(s => showParkFilter === 'all' || s.park === showParkFilter)
          .map(s => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={showIcon(s.emoji, s.type)}
              zIndexOffset={1500}
              eventHandlers={{ click: () => onSelectItem(enrichItem(s)) }}
            />
          ))
        }
        {/* Photo Spot markers */}
        {showPhotos && mapPhotoSpots
          .filter(s => photoParkFilter === 'all' || s.park === photoParkFilter)
          .map(s => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={s.category === 'hidden-gem' ? photoIconHiddenGem : photoIconLandmark}
              zIndexOffset={1500}
              eventHandlers={{ click: () => onSelectItem(enrichItem(s)) }}
            />
          ))
        }
      </MapContainer>
    </div>
  );
}

import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/leaflet-overrides.css';
import styles from './ParkMiniMap.module.css';

function emojiIcon(emoji, cls = '') {
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker ${cls}">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

export default function ParkMiniMap({ parkId, markers = [], boundary = [], center, zoom = 15, color = '#FF6B6B', onMarkerClick }) {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxNativeZoom={19}
          maxZoom={23}
        />
        {boundary.length > 0 && (
          <Polygon
            positions={boundary}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.1, weight: 2 }}
          />
        )}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={emojiIcon(marker.emoji)}
            eventHandlers={onMarkerClick ? {
              click: () => onMarkerClick(marker.id),
            } : {}}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

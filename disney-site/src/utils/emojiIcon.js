import L from 'leaflet';

export default function emojiIcon(emoji, cls = '') {
  return L.divIcon({
    className: '',
    html: `<div class="emoji-marker ${cls}">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import InteractiveMap from '../components/InteractiveMap/InteractiveMap';
import DetailPanel from '../components/DetailPanel/DetailPanel';
import '../styles/leaflet-overrides.css';
import styles from './MapPage.module.css';

export default function MapPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Back to Trip Guide</Link>
        <h1>Interactive Disney Map</h1>
        <p>Rides, food, shows, transportation, and more</p>
      </header>
      <div className={styles.mapWrap}>
        <InteractiveMap onSelectItem={setSelectedItem} />
      </div>
      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

import { useState } from 'react';
import InteractiveMap from '../components/InteractiveMap/InteractiveMap';
import DetailPanel from '../components/DetailPanel/DetailPanel';
import '../styles/leaflet-overrides.css';
import styles from './MapPage.module.css';

export default function MapPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className={styles.page}>
      <InteractiveMap onSelectItem={setSelectedItem} />
      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

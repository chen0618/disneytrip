import { Link } from 'react-router-dom';
import SnackMap from '../sections/DisneySnacks/SnackMap';
import '../styles/leaflet-overrides.css';
import styles from './MapPage.module.css';

export default function MapPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>← Back to Trip Guide</Link>
        <h1>Interactive Disney Map</h1>
        <p>Snacks, transportation routes, boundaries, and more</p>
      </header>
      <div className={styles.mapWrap}>
        <SnackMap fullPage />
      </div>
    </div>
  );
}

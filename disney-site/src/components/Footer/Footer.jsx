import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link to="/map" className={styles.mapCta}>
        🗺️ Explore the Interactive Map →
      </Link>
    </footer>
  );
}

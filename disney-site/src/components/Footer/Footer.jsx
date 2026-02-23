import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/map" className={styles.mapCta}>
          🗺️ Explore the Interactive Map
        </Link>
        <div className={styles.secondaryLinks}>
          <a href="#before-you-go" className={styles.link}>Before You Go Checklist</a>
        </div>
      </div>
    </footer>
  );
}

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Made with <span className={styles.heart}>&hearts;</span> for our family's magical adventure</p>
      <p className={styles.sub}>Images courtesy of Wikimedia Commons contributors. All Disney parks, resorts, and attractions are property of The Walt Disney Company.</p>
    </footer>
  );
}

import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.castle}>
        <div className={styles.orbitRing}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        🏰
      </div>
      <p className={styles.text}>Sprinkling pixie dust...</p>
    </div>
  );
}

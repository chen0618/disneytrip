import styles from './Callout.module.css';

export default function Callout({ variant = 'kids', title, children }) {
  return (
    <div className={`${styles.callout} ${styles[variant]} reveal`}>
      <strong>{title}</strong>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

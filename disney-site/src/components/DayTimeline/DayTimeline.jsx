import styles from './DayTimeline.module.css';

export default function DayTimeline({ morning, afternoon, evening }) {
  return (
    <div className={`${styles.timeline} reveal`}>
      <div className={`${styles.period} ${styles.morning}`}>
        <h4>🌕 Morning</h4>
        <p>{morning}</p>
      </div>
      <div className={`${styles.period} ${styles.afternoon}`}>
        <h4>☀️ Afternoon</h4>
        <p>{afternoon}</p>
      </div>
      <div className={`${styles.period} ${styles.evening}`}>
        <h4>🌙 Evening</h4>
        <p>{evening}</p>
      </div>
    </div>
  );
}

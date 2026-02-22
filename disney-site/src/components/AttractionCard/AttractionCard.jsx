import styles from './AttractionCard.module.css';

export default function AttractionCard({ name, description, image, delay = 1 }) {
  return (
    <div className={`${styles.card} reveal delay-${delay}`}>
      <div className={styles.img} style={{ backgroundImage: `url('${image}')` }} />
      <div className={styles.body}>
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

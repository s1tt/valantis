import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <article className={styles.card}>
      <p className={styles['skeleton-box']} />
      <p className={`${styles.id} ${styles['skeleton-box']}`} />
      <p className={styles['skeleton-box']} />
      <p className={`${styles.price} ${styles['skeleton-box']}`} />
    </article>
  );
};

export default SkeletonCard;

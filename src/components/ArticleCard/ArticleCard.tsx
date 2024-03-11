import { Article } from '../../types/aticle';
import { NO_NAME_TITLE } from '../../utils/constants';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <article className={styles.card}>
      <p>Бренд: {article.brand || NO_NAME_TITLE}</p>
      <p className={styles.id}>ID: {article.id}</p>
      <p className={styles.title}>{article.product}</p>
      <p className={styles.price}>
        {article.price.toLocaleString('ru-RU', {
          style: 'currency',
          currency: 'RUB'
        })}
      </p>
    </article>
  );
};

export default ArticleCard;

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getArticleData } from '../../api/articles';
import { ARTICLES_LIMIT } from '../../utils/constants';
import ArticleCard from '../ArticleCard/ArticleCard';
import SkeletonCard from '../ui/SkeletonCard/SkeletonCard';
import styles from './ArticleList.module.css';

interface ArticleListProps {
  articleIds: string[];
  setIsButtonsDisabled: (isFetching: boolean) => void;
  isButtonsDisabled: boolean;
}

const ArticleList = ({
  articleIds,
  setIsButtonsDisabled,
  isButtonsDisabled
}: ArticleListProps) => {
  const [page, setPage] = useState(0);

  const {
    data: articleData,
    refetch: refetchArticleData,
    isFetching: isArticleDataFetching
  } = useQuery({
    queryKey: ['articleData', articleIds],
    queryFn: () =>
      getArticleData(
        articleIds.slice(page * ARTICLES_LIMIT, ARTICLES_LIMIT * (page + 1))
      )
  });

  useEffect(() => {
    setPage(0);
  }, [articleIds]);

  useEffect(() => {
    setIsButtonsDisabled(isArticleDataFetching);
  }, [isArticleDataFetching, setIsButtonsDisabled]);

  useEffect(() => {
    refetchArticleData();
  }, [page, refetchArticleData]);

  const handlePageClick = (e: { selected: number }) => {
    setPage(e.selected);
  };

  return (
    <section className={styles.section}>
      {!isArticleDataFetching && !articleData?.length && <p>Nothing found</p>}
      <ul className={styles.list}>
        {isArticleDataFetching &&
          new Array(ARTICLES_LIMIT).fill(0).map((_, index) => (
            <li key={index}>
              <SkeletonCard />
            </li>
          ))}
        {!isArticleDataFetching &&
          articleData &&
          articleData.map(article => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
      </ul>
      <ReactPaginate
        forcePage={page}
        className={`${styles.pagination} ${
          isButtonsDisabled ? styles.disabled : ''
        }`}
        activeLinkClassName={styles.active}
        previousLinkClassName={styles.previous}
        nextLinkClassName={styles.next}
        disabledClassName={styles.disabled}
        breakLinkClassName={styles.breakLink}
        onPageChange={handlePageClick}
        pageLinkClassName={styles.page}
        pageCount={Math.ceil(articleIds.length / ARTICLES_LIMIT)}
        renderOnZeroPageCount={null}
      />
    </section>
  );
};

export default ArticleList;

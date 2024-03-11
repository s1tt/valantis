import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './App.module.css';
import { getArticleIds } from './api/articles';
import ArticleList from './components/ArticleList/ArticleList';
import Filters from './components/FilterSection/FilterSection';

function App() {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const { data: articleIds, refetch: refetchArticleIdsWithoutProps } = useQuery(
    {
      queryKey: ['articleIds'],
      queryFn: getArticleIds
    }
  );

  return (
    <main className={styles.main}>
      <Filters
        refetchArticleIdsWithoutProps={refetchArticleIdsWithoutProps}
        isButtonsDisabled={isButtonsDisabled}
      />
      {articleIds && (
        <ArticleList
          articleIds={articleIds}
          setIsButtonsDisabled={setIsButtonsDisabled}
          isButtonsDisabled={isButtonsDisabled}
        />
      )}
    </main>
  );
}

export default App;

import { Article } from '../types/aticle';
import { BASE_URL } from '../utils/constants';
import { getAuthString } from '../utils/getAuthString';

type getArticleIdsResponse = { result: Article['id'][] };
type getArticleDataResponse = { result: Article[] };
type getFilterTitlesResponse = { result: string[] };
type getFilterValuesResponse = { result: string[] };

export const getArticleIds = async () => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getAuthString()
    },
    body: JSON.stringify({
      action: 'get_ids',
      params: { offset: 0 }
    })
  });
  if (res.ok) {
    const { result }: getArticleIdsResponse = await res.json();
    return Array.from(new Set(result));
  } else {
    const errorText = await res.text();
    console.error('Error:', errorText);
    throw Error(errorText);
  }
};

export const getArticleData = async (ids: Article['id'][]) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getAuthString()
    },
    body: JSON.stringify({
      action: 'get_items',
      params: { ids: ids }
    })
  });
  if (res.ok) {
    const { result }: getArticleDataResponse = await res.json();
    return result.reduce((accumulator: Article[], currentArticle: Article) => {
      const index = accumulator.findIndex(
        article => article.id === currentArticle.id
      );
      if (index === -1) {
        accumulator.push(currentArticle);
      }
      return accumulator;
    }, []);
  } else {
    const errorText = await res.text();
    console.error('Error:', errorText);
    throw Error(errorText);
  }
};

export const getFilterTitles = async (field?: string) => {
  const params = field ? { field } : undefined;
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getAuthString()
    },
    body: JSON.stringify({
      action: 'get_fields',
      params
    })
  });

  if (res.ok) {
    const { result }: getFilterTitlesResponse = await res.json();
    return result;
  } else {
    const errorText = await res.text();
    console.error('Error:', errorText);
    throw Error(errorText);
  }
};

export const getFilterValues = async (field: string) => {
  if (field === 'product') return;

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getAuthString()
    },
    body: JSON.stringify({
      action: 'get_fields',
      params: { field }
    })
  });

  if (res.ok) {
    const { result }: getFilterValuesResponse = await res.json();
    return Array.from(new Set(result)).sort((a: unknown, b: unknown) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      } else {
        return 0;
      }
    });
  } else {
    const errorText = await res.text();
    console.error('Error:', errorText);
    throw new Error(errorText);
  }
};

export const getFilteredArticleIds = async (params: {
  [filter: string]: string | number | null;
}) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': getAuthString()
    },
    body: JSON.stringify({
      action: 'filter',
      params
    })
  });
  if (res.ok) {
    const { result } = await res.json();
    return Array.from(new Set(result));
  } else {
    const errorText = await res.text();
    console.error('Error:', errorText);
    throw Error(errorText);
  }
};

import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value: string | number, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string | number>('');
  const timerRef = useRef<number | undefined>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};

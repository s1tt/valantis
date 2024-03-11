import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  getFilterTitles,
  getFilterValues,
  getFilteredArticleIds
} from '../../api/articles';
import { useDebounce } from '../../hooks/useDebounce';
import { NO_NAME_TITLE } from '../../utils/constants';
import Button from '../ui/Button/Button';
import CheckboxButton from '../ui/CheckboxButton/CheckboxButton';
import Input from '../ui/Input/Input';
import Option from '../ui/Select/Option/Option';
import Select from '../ui/Select/Select';
import styles from './FilterSection.module.css';

interface FiltersProps {
  refetchArticleIdsWithoutProps: () => void;
  isButtonsDisabled: boolean;
}

const FilterSection = ({
  refetchArticleIdsWithoutProps,
  isButtonsDisabled
}: FiltersProps) => {
  const [selectedFilterTitle, setSelectedFilterTitle] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string | number>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(filterValue);

  //input focus
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isButtonsDisabled]);

  //get brand/price/product
  const { data: fetchedFilterTitles } = useQuery({
    queryKey: ['fetchedFilterTitles'],
    queryFn: () => getFilterTitles()
  });

  //get values brand/price/product
  const { data: fetchedFilterValues, refetch: refetchFilterValues } = useQuery({
    queryKey: ['fetchedFilterValues', selectedFilterTitle],
    queryFn: () => getFilterValues(selectedFilterTitle),
    enabled: false
  });

  //getIds after select filter
  const { refetch: refetchArticleIds } = useQuery({
    queryKey: ['articleIds'],
    queryFn: () =>
      getFilteredArticleIds({
        [selectedFilterTitle]:
          filterValue === NO_NAME_TITLE ? null : filterValue
      }),
    enabled: false
  });

  //refetch ids if filter selected
  useEffect(() => {
    if (debouncedValue) {
      refetchArticleIds();
    }
  }, [debouncedValue, refetchArticleIds]);

  const onFilterTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) return;
    setSelectedFilterTitle(e.target.value);
    setFilterValue('');
  };

  const filterValueSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value;
    const asNumber = Number(filterValue);
    const newValue = isNaN(asNumber) ? filterValue : asNumber;
    setFilterValue(newValue);
  };

  const filterValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilterValue(e.target.value);
  };

  const clearFiltersHandler = () => {
    setSelectedFilterTitle('');
    setFilterValue('');
    refetchArticleIdsWithoutProps();
  };

  return (
    <form className={styles.section} onSubmit={e => e.preventDefault()}>
      <div className={styles.buttons}>
        <div className={styles.filterButtons}>
          {fetchedFilterTitles?.map(filterTitle => (
            <CheckboxButton
              disabled={isButtonsDisabled}
              key={filterTitle}
              label={filterTitle}
              id={filterTitle}
              value={filterTitle}
              onChange={onFilterTitleChangeHandler}
              checked={filterTitle === selectedFilterTitle}
            />
          ))}
        </div>
        <div>
          {selectedFilterTitle && (
            <Button onClick={clearFiltersHandler} disabled={isButtonsDisabled}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {selectedFilterTitle && selectedFilterTitle !== 'product' && (
        <Select
          disabled={isButtonsDisabled}
          name={selectedFilterTitle}
          id={selectedFilterTitle}
          onChange={filterValueSelectHandler}
          onClick={() => refetchFilterValues()}
          defaultValue='none'
        >
          <Option value='none' defaultChecked disabled>
            Select anything
          </Option>
          {fetchedFilterValues?.map(filterValue => (
            <Option key={filterValue} value={filterValue}>
              {filterValue || NO_NAME_TITLE}
            </Option>
          ))}
        </Select>
      )}

      {selectedFilterTitle && selectedFilterTitle === 'product' && (
        <Input
          disabled={isButtonsDisabled}
          type='text'
          id='searchValue'
          ref={inputRef}
          value={filterValue}
          onChange={filterValueInputHandler}
          placeholder='Enter product name'
        />
      )}
    </form>
  );
};

export default FilterSection;

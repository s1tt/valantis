import { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({ children, ...props }: SelectProps) => {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  );
};

export default Select;

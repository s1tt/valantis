import { OptionHTMLAttributes } from 'react';
import styles from './Option.module.css';

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

const Option = ({ children, ...props }: OptionProps) => {
  return (
    <option className={styles.option} {...props}>
      {children}
    </option>
  );
};

export default Option;

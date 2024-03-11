import { ChangeEvent, InputHTMLAttributes } from 'react';
import styles from './CheckboxButton.module.css';

interface CheckboxButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxButton = ({ label, ...props }: CheckboxButtonProps) => {
  return (
    <>
      <input
        className={styles.input}
        type='checkbox'
        name='id'
        // id='id'
        {...props}
      />
      <label htmlFor={props.id} className={styles.label}>
        {label}
      </label>
    </>
  );
};

export default CheckboxButton;

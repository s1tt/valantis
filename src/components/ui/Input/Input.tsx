import { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <>
      <label htmlFor={props.id}></label>
      <input className={styles.input} ref={ref} {...props} />
    </>
  );
});

export default Input;

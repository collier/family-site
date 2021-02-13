import { forwardRef } from 'react';
import cx from 'classnames';

type InputProps = {
  type: 'number' | 'text' | 'email' | 'date' | 'time';
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hasError?: boolean;
};

type NumberInput = InputProps & {
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
  inputMode?: 'numeric' | 'decimal';
};

type Props = InputProps | NumberInput;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type, name, hasError, ...props }, ref) => (
    <input
      type={type}
      name={name}
      ref={ref}
      className={cx('shadow-sm block w-full sm:text-sm rounded-md', {
        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': hasError,
        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !hasError,
      })}
      {...props}
    />
  )
);

export default Input;

import { forwardRef } from 'react';
import cx from 'classnames';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  hasError?: boolean;
  inputMode?: 'numeric' | 'decimal';
};

const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    { name, defaultValue, placeholder, step, min, max, inputMode, hasError },
    ref
  ) => (
    <input
      type="number"
      name={name}
      className={cx('shadow-sm block w-full sm:text-sm rounded-md', {
        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': hasError,
        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !hasError,
      })}
      placeholder={placeholder}
      defaultValue={defaultValue}
      step={step}
      min={min}
      max={max}
      ref={ref}
      inputMode={inputMode}
    />
  )
);

export default NumberInput;

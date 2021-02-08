import { forwardRef } from 'react';
import cx from 'classnames';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hasError?: boolean;
};

const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ name, defaultValue, placeholder, hasError }, ref) => (
    <input
      type="date"
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cx('shadow-sm block w-full sm:text-sm rounded-md', {
        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500': hasError,
        'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !hasError,
      })}
      ref={ref}
    />
  )
);

export default DateInput;

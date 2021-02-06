import { forwardRef } from 'react';

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
};

const TimeInput = forwardRef<HTMLInputElement, Props>(({ name, defaultValue, placeholder }, ref) => (
  <input
    type="time"
    name={name}
    placeholder={placeholder}
    defaultValue={defaultValue}
    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
    ref={ref}
  />
));

export default TimeInput;

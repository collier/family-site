import cx from 'classnames';
import { PropsWithChildren, MouseEvent } from 'react';

type Props = PropsWithChildren<{
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}>;

export default function Button({ variant = 'primary', size = 'md', children, onClick }: Props) {
  const btnClass = cx(
    'inline-flex items-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    {
      'px-2.5 py-1.5 text-xs rounded': size === 'xs',
      'px-3 py-2 text-sm rounded-md': size === 'sm',
      'px-4 py-2 text-sm rounded-md': size === 'md',
      'px-4 py-2 text-base rounded-md': size === 'lg',
      'px-6 py-3 text-base rounded-md': size === 'xl',
      'border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800':
        variant === 'primary',
      'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300':
        variant === 'secondary',
      'border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 active:bg-indigo-100': variant === 'white',
    }
  );
  return (
    <button type="button" className={btnClass} onClick={onClick}>
      {children}
    </button>
  );
}

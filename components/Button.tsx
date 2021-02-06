import { PropsWithChildren, MouseEvent } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';

type SharedProps = PropsWithChildren<{
  variant?: 'primary' | 'danger' | 'secondary' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>;

type LinkProps = SharedProps & {
  role: 'link';
  href: string;
};

type ButtonProps = SharedProps & {
  role?: 'button';
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (event: MouseEvent) => void;
};

type Props = LinkProps | ButtonProps;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: Props) {
  const btnClass = cx(
    'inline-flex w-full sm:w-auto items-center justify-center border font-medium disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    {
      'px-2.5 py-1.5 text-xs rounded': size === 'xs',
      'px-3 py-2 text-sm rounded-md': size === 'sm',
      'px-4 py-2 text-sm rounded-md': size === 'md',
      'px-4 py-2 text-base rounded-md': size === 'lg',
      'px-6 py-3 text-base rounded-md': size === 'xl',
      'border-transparent shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800':
        variant === 'primary',
      'border-transparent shadow-sm text-white bg-red-500 hover:bg-red-600 active:bg-red-700':
        variant === 'danger',
      'border-transparent text-indigo-700 bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300':
        variant === 'secondary',
      'border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 active:bg-indigo-100':
        variant === 'white',
    }
  );
  if (props.role === 'link') {
    return (
      <Link href={props.href}>
        <a type="button" className={btnClass}>
          {children}
        </a>
      </Link>
    );
  } else {
    const { loading, onClick, type, disabled } = props;
    let isDisabled = disabled;
    if (!isDisabled) {
      isDisabled = loading ? loading : false;
    }
    return (
      <button
        type={type}
        className={btnClass}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children} {loading && <LoadingSpinner className="ml-2" />}
      </button>
    );
  }
}

import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  color?: 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
}>;

export default function Badge({ color = 'gray', children }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      {children}
    </span>
  );
}

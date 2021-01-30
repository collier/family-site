import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  name: string;
}>;

export default function SelectInput({ name, children }: Props) {
  return (
    <select
      name={name}
      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {children}
    </select>
  );
}

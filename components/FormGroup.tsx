import { PropsWithChildren } from 'react';
import cx from 'classnames';

type Props = PropsWithChildren<{
  label: string;
  className?: string;
}>;

export default function FormGroup({ className, label, children }: Props) {
  return (
    <div className={cx(className, 'mb-4')}>
      <label className="block text-sm font-bold">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

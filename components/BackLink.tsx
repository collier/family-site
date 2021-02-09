import Link from 'next/link';
import ChevronLeft from '@/components/icons/ChevronLeft';

type Props = {
  href: string;
  text: string;
};

export default function BackLink({ href, text }: Props) {
  return (
    <Link href={href}>
      <a className="group inline-flex mt-2 -ml-3 space-x-0.5 text-lg font-medium text-indigo-700 hover:text-indigo-800">
        <ChevronLeft className="h-7 w-7 text-indigo-700 group-hover:text-indigo-800" />
        <span>{text}</span>
      </a>
    </Link>
  );
}

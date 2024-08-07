import Link from 'next/link';

export default function ButtonNavBar({ children, href, target }) {
  return (
    <Link href={href || '/'} target={target ? '_blank' : '_self'} className="underlineEffect text-base">
      {children}
    </Link>
  );
}

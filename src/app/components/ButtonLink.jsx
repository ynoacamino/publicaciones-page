import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function ButtonLink({
  children, className, path, color,
}) {
  return (
    <Link href={path}>
      <Button color={color} className={className}>
        {children}
      </Button>
    </Link>
  );
}

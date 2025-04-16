import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

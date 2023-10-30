'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ButtonLink({
  children, className, path, color,
}) {
  const router = useRouter();
  return (
    <Button color={color} className={className} onPress={() => router.push(path)}>
      {children}
    </Button>
  );
}

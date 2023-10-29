'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function ButtonLink({ children, className, path }) {
  const router = useRouter();
  return (
    <Button className={className} onPress={() => router.push(path)}>
      {children}
    </Button>
  );
}

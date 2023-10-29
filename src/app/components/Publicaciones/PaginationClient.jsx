'use client';

import { Pagination } from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';

export default function PaginationClient({ pages, params }) {
  const router = useRouter();
  const path = usePathname();
  console.log(path);
  return (
    <div className="w-full flex justify-center items-center">
      <Pagination
        total={pages}
        page={Number(params.page)}
        onChange={(e) => router.push(path.substring(0, 35) + e)}
      />
    </div>
  );
}

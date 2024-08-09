'use client';

import { usePathname } from 'next/navigation';
import { PaginationItem } from '@nextui-org/react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function PaginationClient({ pages, params }) {
  const path = usePathname();
  return (
    <div className="w-full flex justify-center items-center my-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem isDisabled={Number(params.page) <= 1}>
            <PaginationPrevious href={`${path.slice(0, path)}${Number(params.page) - 1}`} />
          </PaginationItem>
          {
            Array
              .from({ length: Number(3) })
              .map((_, i) => {
                if (Number(params.page) <= 3) return i;
                if (Number(params.page) >= Number(pages) - 1) return Number(pages) - 3 + i;
                return Number(params.page) - 2 + i;
              })
              .map((i) => (
                <PaginationItem key={crypto.randomUUID()}>
                  <PaginationLink
                    href={`${path.slice(0, path)}${i + 1}`}
                    isActive={i === Number(params.page) - 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
          }
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem isDisabled={Number(params.page) >= Number(pages)}>
            <PaginationNext href={`${path.slice(0, path)}${Number(params.page) + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

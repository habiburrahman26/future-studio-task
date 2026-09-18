'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ArrowIcon from '@/components/ui/arrow-icon';

type PaginationProps = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function Pagination({ total, page, limit, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const firstResult = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const lastResult = Math.min(currentPage * limit, total);

  if (totalPages <= 1) return null;

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  const visiblePages =
    totalPages <= 5
      ? pageNumbers
      : currentPage <= 3
        ? [1, 2, 3, 'ellipsis', totalPages]
        : currentPage >= totalPages - 2
          ? [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
          : [1, 'ellipsis', currentPage, 'ellipsis-end', totalPages];

  const goToPage = (targetPage: number) => {
    if (
      targetPage >= 1 &&
      targetPage <= totalPages &&
      targetPage !== currentPage
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(targetPage));
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: true });
      });
    }
  };

  return (
    <div
      aria-label="Pagination"
      className="flex flex-col items-center gap-3 py-2"
    >
      <p className="text-xs text-muted">
        Showing {firstResult}-{lastResult} of {total} products
      </p>
      <div
        className={`flex items-center gap-1.5 rounded-full bg-surface px-2 py-2 shadow-border transition-opacity ${
          isPending ? 'opacity-60' : ''
        }`}
      >
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={currentPage === 1 || isPending}
          onClick={() => goToPage(currentPage - 1)}
          className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-fg disabled:pointer-events-none disabled:opacity-35"
        >
          <ArrowIcon direction="left" />
        </button>

        <div className="flex items-center gap-1" aria-live="polite">
          {visiblePages.map((pageNumber, index) =>
            typeof pageNumber === 'string' ? (
              <span
                key={`${pageNumber}-${index}`}
                aria-hidden="true"
                className="flex size-10 items-center justify-center text-sm text-subtle"
              >
                …
              </span>
            ) : (
              <button
                key={pageNumber}
                type="button"
                aria-current={pageNumber === currentPage ? 'page' : undefined}
                aria-label={`Go to page ${pageNumber}`}
                disabled={isPending}
                onClick={() => goToPage(pageNumber)}
                className={`flex size-10 items-center justify-center rounded-[14px] text-sm font-semibold transition-colors disabled:pointer-events-none ${
                  pageNumber === currentPage
                    ? 'bg-primary text-primary-fg shadow-border'
                    : 'text-fg hover:bg-paper'
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          aria-label="Go to next page"
          disabled={currentPage === totalPages || isPending}
          onClick={() => goToPage(currentPage + 1)}
          className="flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-fg disabled:pointer-events-none disabled:opacity-35"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

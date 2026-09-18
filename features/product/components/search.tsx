'use client';

import { SubmitEvent, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');

  const submitSearch = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set('search', trimmedQuery);
    } else {
      params.delete('search');
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={submitSearch}
      role="search"
      className="mb-3 md:mb-6 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border/80 bg-surface p-1.5 shadow-border transition-shadow focus-within:shadow-border-hover"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <svg
          aria-hidden="true"
          className="size-5 shrink-0 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path strokeLinecap="round" d="m16 16 4.5 4.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-fg outline-none placeholder:text-subtle"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper hover:text-fg"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              &times;
            </span>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-fg transition-colors bg-primary hover:bg-ok focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Search
      </button>
    </form>
  );
}

export default Search;

'use client';

import { useState } from 'react';
import { useEffect, useRef } from 'react';
import ProductFilter from './product-filter';

function FilterModal() {
  const [showModal, setShowModal] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showModal) return;

    const triggerElement = triggerRef.current;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
      triggerElement?.focus();
    };
  }, [showModal]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={showModal}
        aria-controls="product-filter-dialog"
        onClick={() => setShowModal((prevState) => !prevState)}
        className="flex items-center justify-center gap-1 lg:hidden p-4 text-sm font-medium bg-bg border-2 border-border rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="size-4"
        >
          <path d="M10 5H3" />
          <path d="M12 19H3" />
          <path d="M14 3v4" />
          <path d="M16 17v4" />
          <path d="M21 12h-9" />
          <path d="M21 19h-5" />
          <path d="M21 5h-7" />
          <path d="M8 10v4" />
          <path d="M8 12H3" />
        </svg>
        Filters
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-fg/40"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowModal(false);
          }}
        >
          <div
            id="product-filter-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Product filters"
            className="absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-xl bg-surface p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close filters"
                onClick={() => setShowModal(false)}
                className="flex size-10 items-center justify-center rounded-md border border-border transition-colors hover:bg-paper focus:outline-none focus:ring-2 focus:ring-paper"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <ProductFilter />
          </div>
        </div>
      )}
    </>
  );
}

export default FilterModal;

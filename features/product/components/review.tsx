'use client';

import { useState } from 'react';
import StarIcon from '@/components/ui/star-icon';
import { Review as ReviewType } from '../types';

type ReviewProps = {
  reviews: ReviewType[];
};

function Review({ reviews }: ReviewProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;

  return (
    <section className="mt-12">
      <h3 className="text-2xl">Reviews</h3>
      <p className="text-sm text-muted">
        Average {averageRating.toFixed(1)} from {reviews.length} featured notes
      </p>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {visibleReviews.map((review, i) => (
          <li
            key={`${review.author}-${i}`}
            className="rounded-2xl border border-border/70 bg-white/55 p-5 transition-colors hover:bg-surface"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-paper font-display text-lg text-primary">
                  {review.author.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{review.author}</p>
                  <p className="mt-0.5 text-xs text-muted">Verified customer</p>
                </div>
              </div>
              <span className="flex h-6 shrink-0 items-center justify-center gap-1 rounded-full bg-paper px-2.5 text-xs font-semibold leading-none text-primary">
                <StarIcon className="size-3.5 shrink-0" />
                {review.rating.toFixed(1)}
              </span>
            </div>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-fg">
              {review.comment}
            </p>
            <p className="mt-5 text-xs text-subtle">
              {new Date(review.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </li>
        ))}
      </ul>
      {reviews.length > 4 && !showAllReviews && (
        <button
          type="button"
          onClick={() => setShowAllReviews(true)}
          className="mt-6 rounded-full border border-border/70 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface"
        >
          Show more reviews
        </button>
      )}
    </section>
  );
}

export default Review;

"use client";

import * as React from "react";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { truncateText } from "@/lib/utils";
import type { GoogleReview } from "@/lib/google-places";

interface ReviewsCarouselProps {
  reviews: GoogleReview[];
  rating: number;
  totalRatings: number;
}

export function ReviewsCarousel({
  reviews,
  rating,
  totalRatings,
}: ReviewsCarouselProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  if (reviews.length === 0) {
    return null;
  }

  const doubledReviews = [...reviews, ...reviews];

  return (
    <section className="bg-white py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            What Our <span className="text-brand-primary">Clients Say</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(rating)
                      ? "fill-brand-secondary text-brand-secondary"
                      : "fill-slate-200 text-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-brand-muted">
              {rating.toFixed(1)} · {totalRatings} reviews
            </span>
          </div>
        </div>

        <div
          className="relative mt-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`flex gap-6 ${isPaused ? "" : "animate-marquee"}`}
            style={{ width: "max-content" }}
          >
            {doubledReviews.map((review, index) => (
              <Card
                key={`${review.authorName}-${index}`}
                className="w-[320px] shrink-0 p-6 sm:w-[380px]"
              >
                <Quote className="h-8 w-8 text-brand-primary/20" />
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  {truncateText(review.text, 180)}
                </p>
                <div className="mt-4 flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-brand-secondary text-brand-secondary"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">
                      {review.authorName}
                    </p>
                    <p className="text-xs text-brand-muted">
                      {review.relativeTime}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-sm text-brand-muted">Powered by</span>
          <span className="font-display text-sm font-semibold text-brand-dark">
            Google
          </span>
        </div>
      </div>
    </section>
  );
}
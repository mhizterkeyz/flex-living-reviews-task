"use client";

import { Review } from "@/types/review";
import {
  formatDateTime,
  formatCategoryName,
  calculateAverageCategoryRating,
} from "@/lib/reviews";

interface ReviewCardProps {
  review: Review;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ReviewCard({ review, onApprove, onReject }: ReviewCardProps) {
  const isApproved = review.approved === true;
  const isRejected = review.approved === false;

  const averageCategoryRating = calculateAverageCategoryRating(
    review.categories
  );

  // Event handlers
  const handleApprove = () => onApprove(review.id);
  const handleReject = () => onReject(review.id);

  const handleApproveMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = "white";
  };

  const handleApproveMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = "rgb(5, 150, 105)";
  };

  return (
    <div
      className={`rounded-lg p-6 transition-all duration-200 ${
        isApproved
          ? "bg-emerald-50/50 shadow-[0_2px_8px_0_rgb(16_185_129_/0.15)]"
          : isRejected
          ? "bg-red-50/50 shadow-[0_2px_8px_0_rgb(239_68_68_/0.15)]"
          : "bg-white shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)] hover:shadow-[0_4px_16px_0_rgb(0_0_0_/0.12)]"
      }`}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">
              {review.guestName}
            </h3>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              {review.channel}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {review.reviewType.replace(/-/g, " ")}
            </span>
          </div>
          <p className="mt-2.5 text-sm font-medium text-gray-600">
            {review.listingName}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-gray-700">
            {review.text}
          </p>

          {review.categories.length > 0 && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Category Ratings
              </p>
              <div className="flex flex-wrap gap-2.5">
                {review.categories.map((cat) => (
                  <div
                    key={cat.category}
                    className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 border border-gray-100"
                  >
                    <span className="text-xs font-medium capitalize text-gray-600">
                      {formatCategoryName(cat.category)}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {cat.rating}/10
                    </span>
                  </div>
                ))}
              </div>
              {averageCategoryRating && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Average:</span>{" "}
                  {averageCategoryRating.toFixed(1)}/10
                </p>
              )}
            </div>
          )}

          <div className="mt-5 flex items-center gap-5 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <span>{formatDateTime(review.submittedAt)}</span>
            {review.rating !== null && (
              <span className="font-semibold text-gray-700">
                Overall: {review.rating}/10
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 shrink-0">
          {isApproved ? (
            <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-center text-sm font-semibold text-emerald-700">
              Approved
            </span>
          ) : isRejected ? (
            <span className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-center text-sm font-semibold text-amber-700">
              Rejected
            </span>
          ) : (
            <>
              <button
                onClick={handleApprove}
                style={{
                  color: "rgb(5, 150, 105)",
                }}
                className="rounded-lg border-2 border-emerald-600 bg-white px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:bg-emerald-600 hover:shadow-sm active:scale-[0.98] cursor-pointer"
                onMouseEnter={handleApproveMouseEnter}
                onMouseLeave={handleApproveMouseLeave}
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className="rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] cursor-pointer"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

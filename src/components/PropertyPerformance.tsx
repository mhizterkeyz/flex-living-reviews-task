import { Review } from "@/types/review";
import { calculateAverageRating } from "@/lib/reviews";

interface PropertyPerformanceProps {
  property: string;
  reviews: Review[];
}

export function PropertyPerformance({
  property,
  reviews,
}: PropertyPerformanceProps) {
  const averageRating = calculateAverageRating(reviews);
  const approvedCount = reviews.filter((r) => r.approved === true).length;
  const pendingCount = reviews.filter((r) => r.approved === undefined).length;

  return (
    <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)] transition-all duration-200 hover:shadow-[0_4px_16px_0_rgb(0_0_0_/0.12)]">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-900">
            {property}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Reviews
              </p>
              <p className="mt-1.5 text-2xl font-semibold text-gray-900">
                {reviews.length}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Avg Rating
              </p>
              <p className="mt-1.5 text-2xl font-semibold text-gray-900">
                {averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Approved
              </p>
              <p className="mt-1.5 text-2xl font-semibold text-emerald-600">
                {approvedCount}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Pending
              </p>
              <p className="mt-1.5 text-2xl font-semibold text-amber-600">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


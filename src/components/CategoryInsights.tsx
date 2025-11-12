"use client";

import { useMemo } from "react";
import { Review } from "@/types/review";
import { calculateCategoryAverages, formatCategoryName } from "@/lib/reviews";

interface CategoryInsightsProps {
  reviews: Review[];
}

export function CategoryInsights({ reviews }: CategoryInsightsProps) {
  const categoryAverages = useMemo(
    () => calculateCategoryAverages(reviews),
    [reviews]
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    reviews.forEach((review) => {
      review.categories.forEach((cat) => {
        counts.set(cat.category, (counts.get(cat.category) || 0) + 1);
      });
    });
    return counts;
  }, [reviews]);

  return (
    <div className="mt-12 rounded-lg bg-white p-8 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Category Insights
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Average ratings across review categories
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {["cleanliness", "communication", "respect_house_rules"].map(
          (category) => {
            const avgRating = categoryAverages[category] || 0;
            const count = categoryCounts.get(category) || 0;

            return (
              <div
                key={category}
                className="rounded-lg bg-gray-50 p-5 border border-gray-100"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {formatCategoryName(category)}
                </h3>
                <p className="mt-3 text-3xl font-semibold text-gray-900">
                  {avgRating > 0 ? avgRating.toFixed(1) : "N/A"}
                </p>
                <p className="mt-1.5 text-sm text-gray-600">
                  Based on {count} rating{count !== 1 ? "s" : ""}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

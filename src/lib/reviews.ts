import { Review, ReviewsResponse } from "@/types/review";

export async function fetchReviews(): Promise<Review[]> {
  try {
    const response = await fetch("/api/reviews/hostaway");
    const data: ReviewsResponse = await response.json();

    if (!data.ok || !data.reviews) {
      throw new Error(data.error || "Failed to fetch reviews");
    }

    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export function calculateAverageRating(reviews: Review[]): number {
  const ratings = reviews
    .map((r) => r.rating)
    .filter((r): r is number => r !== null);

  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
}

export function calculateCategoryAverages(reviews: Review[]) {
  const categoryMap = new Map<string, number[]>();

  reviews.forEach((review) => {
    review.categories.forEach((cat) => {
      if (!categoryMap.has(cat.category)) {
        categoryMap.set(cat.category, []);
      }
      categoryMap.get(cat.category)!.push(cat.rating);
    });
  });

  const averages: Record<string, number> = {};
  categoryMap.forEach((ratings, category) => {
    averages[category] =
      ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  });

  return averages;
}

export function groupByProperty(reviews: Review[]) {
  const grouped = new Map<string, Review[]>();

  reviews.forEach((review) => {
    const property = review.listingName;
    if (!grouped.has(property)) {
      grouped.set(property, []);
    }
    grouped.get(property)!.push(review);
  });

  return Array.from(grouped.entries()).map(([property, reviews]) => ({
    property,
    reviews,
    averageRating: calculateAverageRating(reviews),
    totalReviews: reviews.length,
  }));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatCategoryName(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function calculateAverageCategoryRating(
  categories: { category: string; rating: number }[]
): number | null {
  if (categories.length === 0) return null;
  return (
    categories.reduce((sum, cat) => sum + cat.rating, 0) / categories.length
  );
}

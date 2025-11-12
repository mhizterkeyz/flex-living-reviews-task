import { Review } from "@/types/review";
import { getPropertyById } from "@/lib/properties";

// Import mock data directly
const MOCK_REVIEWS = {
  status: "success",
  result: [
    {
      id: 7453,
      type: "host-to-guest",
      status: "published",
      rating: null,
      publicReview:
        "Shane and family are wonderful! Would definitely host again :)",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 10 },
        { category: "respect_house_rules", rating: 10 },
      ],
      submittedAt: "2020-08-21 22:45:14",
      guestName: "Shane Finkelstein",
      listingName: "2B N1 A - 29 Shoreditch Heights",
    },
    {
      id: 7454,
      type: "guest-to-host",
      status: "published",
      rating: 9,
      publicReview:
        "Amazing stay! The apartment was spotless and the location was perfect. The host was very responsive and helpful throughout our stay.",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 9 },
        { category: "respect_house_rules", rating: 8 },
      ],
      submittedAt: "2024-01-15 14:30:00",
      guestName: "Emma Thompson",
      listingName: "2B N1 A - 29 Shoreditch Heights",
    },
    {
      id: 7455,
      type: "guest-to-host",
      status: "published",
      rating: 7,
      publicReview:
        "Good value for money. The place was clean but could use some updates. Communication was prompt.",
      reviewCategory: [
        { category: "cleanliness", rating: 8 },
        { category: "communication", rating: 7 },
        { category: "respect_house_rules", rating: 6 },
      ],
      submittedAt: "2024-01-20 10:15:00",
      guestName: "Michael Chen",
      listingName: "Studio Loft - Canary Wharf",
    },
    {
      id: 7457,
      type: "guest-to-host",
      status: "published",
      rating: 10,
      publicReview:
        "Absolutely perfect! This was our best Airbnb experience. The host went above and beyond. Highly recommend!",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 10 },
        { category: "respect_house_rules", rating: 10 },
      ],
      submittedAt: "2024-02-10 09:20:00",
      guestName: "David Martinez",
      listingName: "3BR Family Home - Notting Hill",
    },
    {
      id: 7461,
      type: "guest-to-host",
      status: "published",
      rating: 9,
      publicReview:
        "Fantastic stay! The apartment exceeded our expectations. Beautiful decor and everything we needed was provided.",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 9 },
        { category: "respect_house_rules", rating: 8 },
      ],
      submittedAt: "2024-03-01 10:00:00",
      guestName: "Robert Taylor",
      listingName: "2B N1 A - 29 Shoreditch Heights",
    },
  ],
};

// Map of review IDs to approved status (in a real app, this would be in a database)
const APPROVED_REVIEW_IDS = new Set([
  "7454", // Emma Thompson - 2B N1 A
  "7461", // Robert Taylor - 2B N1 A
  "7457", // David Martinez - 3BR Family Home
]);

// Fetch all reviews and filter by property and approved status
export async function getApprovedReviewsForProperty(
  propertyId: string
): Promise<Review[]> {
  try {
    // Get property by ID to find the listing name
    const property = await getPropertyById(propertyId);
    if (!property) {
      return [];
    }

    const payload = MOCK_REVIEWS;
    const normalized = payload.result.map((r) => ({
      id: String(r.id),
      listingName: r.listingName,
      guestName: r.guestName,
      reviewType: r.type,
      rating: r.rating ?? null,
      text: r.publicReview,
      categories: r.reviewCategory ?? [],
      submittedAt: new Date(r.submittedAt).toISOString(),
      status: r.status,
      channel: "hostaway",
      approved: APPROVED_REVIEW_IDS.has(String(r.id)),
    }));

    // Filter by property listing name and only return approved reviews
    const approvedReviews = normalized.filter(
      (review: Review) =>
        review.listingName === property.name && review.approved === true
    );

    return approvedReviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

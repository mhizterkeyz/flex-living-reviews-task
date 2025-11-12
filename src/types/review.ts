export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: string;
  listingName: string;
  guestName: string;
  reviewType: string;
  rating: number | null;
  text: string;
  categories: ReviewCategory[];
  submittedAt: string;
  status: string;
  channel: string;
  approved?: boolean; // For dashboard management
}

export interface ReviewsResponse {
  ok: boolean;
  reviews: Review[];
  error?: string;
}

export type SortField = "submittedAt" | "rating" | "listingName" | "guestName";
export type SortDirection = "asc" | "desc";
export type FilterStatus = "all" | "approved" | "pending" | "rejected";

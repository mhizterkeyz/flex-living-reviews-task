import { NextResponse } from "next/server";

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
      id: 7456,
      type: "host-to-guest",
      status: "published",
      rating: null,
      publicReview:
        "Excellent guests! Very respectful and left the place in perfect condition.",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 9 },
        { category: "respect_house_rules", rating: 10 },
      ],
      submittedAt: "2024-02-01 16:45:00",
      guestName: "Sarah Johnson",
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
      id: 7458,
      type: "guest-to-host",
      status: "published",
      rating: 6,
      publicReview:
        "The location is great, but we had some issues with the heating. The host did try to help but it took a while to resolve.",
      reviewCategory: [
        { category: "cleanliness", rating: 7 },
        { category: "communication", rating: 5 },
        { category: "respect_house_rules", rating: 6 },
      ],
      submittedAt: "2024-02-15 11:30:00",
      guestName: "Lisa Anderson",
      listingName: "3BR Family Home - Notting Hill",
    },
    {
      id: 7459,
      type: "host-to-guest",
      status: "published",
      rating: null,
      publicReview:
        "Great guests, very clean and quiet. Would welcome them back anytime!",
      reviewCategory: [
        { category: "cleanliness", rating: 9 },
        { category: "communication", rating: 8 },
        { category: "respect_house_rules", rating: 9 },
      ],
      submittedAt: "2024-02-18 13:00:00",
      guestName: "James Wilson",
      listingName: "2B N1 A - 29 Shoreditch Heights",
    },
    {
      id: 7460,
      type: "guest-to-host",
      status: "published",
      rating: 8,
      publicReview:
        "Lovely apartment with great amenities. The host provided excellent local recommendations. Only minor issue was the WiFi speed.",
      reviewCategory: [
        { category: "cleanliness", rating: 9 },
        { category: "communication", rating: 8 },
        { category: "respect_house_rules", rating: 7 },
      ],
      submittedAt: "2024-02-22 15:45:00",
      guestName: "Rachel Green",
      listingName: "Studio Loft - Canary Wharf",
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
    {
      id: 7462,
      type: "host-to-guest",
      status: "published",
      rating: null,
      publicReview:
        "Perfect guests! Very respectful and left everything in great condition. Communication was excellent.",
      reviewCategory: [
        { category: "cleanliness", rating: 10 },
        { category: "communication", rating: 10 },
        { category: "respect_house_rules", rating: 10 },
      ],
      submittedAt: "2024-03-05 14:20:00",
      guestName: "Amanda Brown",
      listingName: "3BR Family Home - Notting Hill",
    },
  ],
};

export async function GET() {
  try {
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
    }));

    return NextResponse.json({ ok: true, reviews: normalized });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 }
    );
  }
}

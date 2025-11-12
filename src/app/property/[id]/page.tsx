import { notFound } from "next/navigation";
import Image from "next/image";
import { getPropertyById } from "@/lib/properties";
import { getApprovedReviewsForProperty } from "@/lib/propertyReviews";
import { PublicReviewCard } from "@/components/PublicReviewCard";
import { BookingWidget } from "@/components/BookingWidget";
import { PropertyHeader } from "@/components/PropertyHeader";
import { calculateAverageRating } from "@/lib/reviews";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  const reviews = await getApprovedReviewsForProperty(id);
  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="min-h-screen bg-[#fffdf6]">
      {/* Header */}
      <PropertyHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Full Width Image Gallery */}
        <div className="mb-8 grid grid-cols-4 gap-2">
          <div className="col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={property.images[0] || "/api/placeholder/800/600"}
                alt={property.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-2 gap-2">
            {property.images.slice(1, 3).map((image, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-lg">
                <Image
                  src={image || "/api/placeholder/400/300"}
                  alt={`${property.name} ${idx + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {property.images.length > 3 && (
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={property.images[3] || "/api/placeholder/400/300"}
                  alt={`${property.name} 4`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 cursor-pointer">
                    View all photos
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Property Title & Stats - Full Width */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {property.name} - The Flex London
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-700">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                {property.guests} Guests
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-sm font-medium">
                {property.bedrooms} Bedrooms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M8 6l4-4 4 4m0 0v4"
                />
              </svg>
              <span className="text-sm font-medium">
                {property.bathrooms} Bathrooms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <span className="text-sm font-medium">{property.beds} beds</span>
            </div>
          </div>
        </div>

        {/* Content Grid with Booking Widget */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Property */}
            <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                About this property
              </h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                {property.description}
              </p>
              <a
                href="#"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                Read more
              </a>
            </div>

            {/* Guest Reviews Section */}
            {reviews.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                      Guest Reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      {averageRating > 0 && (
                        <>
                          <div className="flex items-center gap-1">
                            <svg
                              className="h-6 w-6 text-emerald-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-lg font-semibold text-gray-900">
                              {averageRating.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-gray-500">·</span>
                        </>
                      )}
                      <span className="text-gray-600">
                        {reviews.length}{" "}
                        {reviews.length === 1 ? "review" : "reviews"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <PublicReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Amenities
                </h2>
                <a
                  href="#"
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  View all amenities
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {property.amenities.slice(0, 9).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Policies */}
            <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Stay Policies
              </h2>

              {/* Check-in & Check-out */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Check-in & Check-out
                </h3>
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="text-base font-semibold text-gray-900">
                      {property.checkIn}
                    </p>
                  </div>
                  <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="text-base font-semibold text-gray-900">
                      {property.checkOut}
                    </p>
                  </div>
                </div>
              </div>

              {/* House Rules */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  House Rules
                </h3>
                <div className="space-y-2">
                  {property.houseRules.noSmoking && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">No smoking</span>
                    </div>
                  )}
                  {property.houseRules.noPets && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">No pets</span>
                    </div>
                  )}
                  {property.houseRules.noParties && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">
                        No parties or events
                      </span>
                    </div>
                  )}
                  {property.houseRules.securityDeposit && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">
                        Security deposit required
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Cancellation Policy
                </h3>
                <ul className="space-y-2">
                  {property.cancellationPolicy.map((policy, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                      <span className="text-sm text-gray-700">{policy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location */}
            <div className="rounded-lg bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Location
              </h2>
              <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-gray-200">
                {/* Map placeholder - in a real app, this would be an embedded map */}
                <div className="flex h-full items-center justify-center text-gray-500">
                  <p>Map view of {property.location}</p>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                Browse more monthly apartment rentals in London
              </a>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-[rgb(40_78_76)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
            {/* Join The Flex */}
            <div>
              <h3 className="mb-2 font-semibold text-white">Join The Flex</h3>
              <p className="mb-4 text-sm text-white/90">
                Sign up now and stay up to date on our latest news and exclusive
                deals including 5% off your first stay!
              </p>
              <form className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <div className="flex gap-2">
                  <div className="flex shrink-0 items-center rounded-md border border-white/20 bg-white/10 px-2 py-2">
                    <span className="mr-1.5 text-sm">🇬🇧</span>
                    <span className="text-sm text-white">+44</span>
                    <svg
                      className="ml-1.5 h-3.5 w-3.5 text-white/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[rgb(40_78_76)] transition-colors hover:bg-white/90 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      color: "rgb(40 78 76)",
                      transform: "rotate(90deg)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span style={{ color: "rgb(40 78 76)" }}>Subscribe</span>
                </button>
              </form>
            </div>

            {/* The Flex */}
            <div>
              <h3 className="mb-4 font-semibold text-white">The Flex</h3>
              <p className="mb-4 text-sm text-white/90">
                Professional property management services for landlords,
                flexible corporate lets for businesses and quality
                accommodations for short-term and long-term guests.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Locations</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    LONDON
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    PARIS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    ALGIERS
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
              <div className="mb-3 flex items-center gap-2 text-sm text-white/90">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span>Support Numbers</span>
              </div>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <span>🇬🇧</span>
                  <span>United Kingdom +44 77 2374 5646</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🇩🇿</span>
                  <span>Algeria +33 7 57 59 22 41</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🇫🇷</span>
                  <span>France +33 6 44 64 57 17</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/90">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@theflex.global"
                  className="hover:text-white cursor-pointer"
                >
                  info@theflex.global
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>© 2025 The Flex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

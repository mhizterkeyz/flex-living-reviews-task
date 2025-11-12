"use client";

import { useState } from "react";

export function BookingWidget() {
  const [dates, setDates] = useState("Nov 20 - Nov 28");
  const [guests, setGuests] = useState("1 guests");

  return (
    <div className="sticky top-24">
      {/* Dark Green Header */}
      <div
        className="rounded-t-lg bg-[rgb(40_78_76)] p-6"
        style={{ color: "white" }}
      >
        <h2 className="mb-1 text-2xl font-bold" style={{ color: "white" }}>
          Book Your Stay
        </h2>
        <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
          Select dates to see prices.
        </p>
      </div>

      {/* White Content Box */}
      <div className="rounded-b-lg border border-gray-200 bg-white p-6 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
        {/* Date and Guest Selection */}
        <div className="mb-4 space-y-3">
          <div className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 cursor-pointer transition-colors hover:border-gray-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">{dates}</span>
              </div>
              <svg
                className="h-4 w-4 text-gray-400"
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
          </div>
          <div className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 cursor-pointer transition-colors hover:border-gray-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium">{guests}</span>
              </div>
              <svg
                className="h-4 w-4 text-gray-400"
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
          </div>
        </div>

        {/* Booking Summary */}
        <div className="mb-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Check-in</span>
            <span className="font-medium text-gray-900">Nov 20</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check-out</span>
            <span className="font-medium text-gray-900">Nov 28</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Guests</span>
            <span className="font-medium text-gray-900">{guests}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Price per night (8 nights)</span>
            <span className="font-medium text-gray-900">£1,319</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-emerald-700">
                10% length of stay discount
              </span>
            </div>
            <span className="font-medium text-emerald-700">-£132</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cleaning fee</span>
            <span className="font-medium text-gray-900">£100</span>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="mb-4 border-t border-gray-200 pt-4">
          <a
            href="#"
            className="mb-2 block text-sm text-emerald-600 underline hover:text-emerald-700 cursor-pointer"
          >
            Have a coupon?
          </a>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="mb-6 border-t border-gray-200 pt-4">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-lg font-semibold text-gray-900">total</span>
            <span className="text-2xl font-bold text-gray-900">£1,287</span>
          </div>
          <p className="text-sm text-emerald-600">You saved £132</p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgb(40_78_76)] px-6 py-3 text-base font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-sm active:scale-[0.98] cursor-pointer"
            style={{ color: "white" }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "white" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span style={{ color: "white" }}>Book Now</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] cursor-pointer"
          >
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Send Inquiry
          </button>
        </div>

        {/* Confirmation Text */}
        <p className="mt-4 flex items-center gap-2 text-xs text-gray-600">
          <svg
            className="h-4 w-4 text-emerald-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Instant booking confirmation
        </p>
      </div>
    </div>
  );
}

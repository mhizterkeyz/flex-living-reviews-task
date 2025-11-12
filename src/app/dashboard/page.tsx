"use client";

import { StatsCard } from "@/components/StatsCard";
import { ReviewCard } from "@/components/ReviewCard";
import { PropertyPerformance } from "@/components/PropertyPerformance";
import { DashboardFilters } from "@/components/DashboardFilters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CategoryInsights } from "@/components/CategoryInsights";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const {
    loading,
    reviews,
    stats,
    propertyPerformance,
    filteredAndSortedReviews,
    properties,
    channels,
    sortField,
    sortDirection,
    filterStatus,
    filterChannel,
    filterProperty,
    selectedPropertyView,
    hasActiveFilters,
    setSortField,
    setSortDirection,
    setFilterStatus,
    setFilterChannel,
    setFilterProperty,
    handleApprove,
    handleReject,
    clearAllFilters,
    handleViewAll,
    handleSelectProperty,
  } = useDashboard();

  if (loading) {
    return <LoadingSpinner message="Loading reviews..." />;
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Review Management Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Manage and analyze guest reviews across all properties
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            title="Total Reviews"
            value={stats.totalReviews}
            subtitle="All time"
          />
          <StatsCard
            title="Approved"
            value={stats.approvedReviews}
            subtitle={`${
              stats.totalReviews > 0
                ? Math.round((stats.approvedReviews / stats.totalReviews) * 100)
                : 0
            }% of total`}
          />
          <StatsCard
            title="Pending"
            value={stats.pendingReviews}
            subtitle="Awaiting review"
          />
          <StatsCard
            title="Avg Rating"
            value={
              stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "N/A"
            }
            subtitle="Out of 10"
          />
          <StatsCard
            title="Properties"
            value={stats.totalProperties}
            subtitle="Active listings"
          />
        </div>

        {/* Property Performance Section */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                Property Performance
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Review metrics by property
              </p>
            </div>
            <button
              onClick={handleViewAll}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                selectedPropertyView === null
                  ? "text-emerald-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {propertyPerformance
              .slice(0, 6)
              .map(({ property, reviews: propertyReviews }) => (
                <button
                  key={property}
                  onClick={handleSelectProperty(property)}
                  className="text-left transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <PropertyPerformance
                    property={property}
                    reviews={propertyReviews}
                  />
                </button>
              ))}
          </div>
          {propertyPerformance.length > 6 && (
            <p className="mt-4 text-center text-sm text-gray-600">
              Showing top 6 properties. Use filters to see more.
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <DashboardFilters
            sortField={sortField}
            sortDirection={sortDirection}
            filterStatus={filterStatus}
            filterChannel={filterChannel}
            filterProperty={filterProperty}
            properties={properties}
            channels={channels}
            onSortChange={setSortField}
            onSortDirectionChange={setSortDirection}
            onFilterStatusChange={setFilterStatus}
            onFilterChannelChange={setFilterChannel}
            onFilterPropertyChange={setFilterProperty}
          />
        </div>

        {/* Reviews List */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Reviews
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {filteredAndSortedReviews.length} review
              {filteredAndSortedReviews.length !== 1 ? "s" : ""} found
            </p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filteredAndSortedReviews.length === 0 ? (
          <div className="rounded-lg bg-white p-16 text-center shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
            <p className="text-gray-600">
              No reviews match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredAndSortedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}

        {/* Category Insights */}
        {reviews.length > 0 && <CategoryInsights reviews={reviews} />}
      </div>
    </div>
  );
}

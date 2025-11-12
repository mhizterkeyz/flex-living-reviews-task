import { useState, useEffect, useMemo } from "react";
import { Review, SortField, SortDirection, FilterStatus } from "@/types/review";
import {
  fetchReviews,
  calculateAverageRating,
  groupByProperty,
} from "@/lib/reviews";

export function useDashboard() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("submittedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterChannel, setFilterChannel] = useState<string>("all");
  const [filterProperty, setFilterProperty] = useState<string>("all");
  const [selectedPropertyView, setSelectedPropertyView] = useState<
    string | null
  >(null);

  // Load reviews on mount
  useEffect(() => {
    async function loadReviews() {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data);
      setLoading(false);
    }
    loadReviews();
  }, []);

  // Sync selectedPropertyView with filterProperty when filter changes via dropdown
  useEffect(() => {
    if (filterProperty === "all") {
      setSelectedPropertyView(null);
    } else {
      setSelectedPropertyView(filterProperty);
    }
  }, [filterProperty]);

  // Get unique values for filters
  const properties = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.listingName))).sort();
  }, [reviews]);

  const channels = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.channel))).sort();
  }, [reviews]);

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = [...reviews];

    // Apply status filter
    if (filterStatus === "approved") {
      filtered = filtered.filter((r) => r.approved === true);
    } else if (filterStatus === "pending") {
      filtered = filtered.filter((r) => r.approved === undefined);
    } else if (filterStatus === "rejected") {
      filtered = filtered.filter((r) => r.approved === false);
    }

    // Apply channel filter
    if (filterChannel !== "all") {
      filtered = filtered.filter((r) => r.channel === filterChannel);
    }

    // Apply property filter
    if (filterProperty !== "all") {
      filtered = filtered.filter((r) => r.listingName === filterProperty);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number | null;
      let bValue: string | number | null;

      switch (sortField) {
        case "submittedAt":
          aValue = new Date(a.submittedAt).getTime();
          bValue = new Date(b.submittedAt).getTime();
          break;
        case "rating":
          aValue = a.rating ?? 0;
          bValue = b.rating ?? 0;
          break;
        case "listingName":
          aValue = a.listingName.toLowerCase();
          bValue = b.listingName.toLowerCase();
          break;
        case "guestName":
          aValue = a.guestName.toLowerCase();
          bValue = b.guestName.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [
    reviews,
    filterStatus,
    filterChannel,
    filterProperty,
    sortField,
    sortDirection,
  ]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalReviews = reviews.length;
    const approvedReviews = reviews.filter((r) => r.approved === true).length;
    const pendingReviews = reviews.filter(
      (r) => r.approved === undefined
    ).length;
    const averageRating = calculateAverageRating(reviews);
    const propertyGroups = groupByProperty(reviews);

    return {
      totalReviews,
      approvedReviews,
      pendingReviews,
      averageRating,
      totalProperties: propertyGroups.length,
    };
  }, [reviews]);

  // Property performance data
  const propertyPerformance = useMemo(() => {
    return groupByProperty(reviews).sort(
      (a, b) => b.totalReviews - a.totalReviews
    );
  }, [reviews]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filterStatus !== "all" ||
      filterChannel !== "all" ||
      filterProperty !== "all"
    );
  }, [filterStatus, filterChannel, filterProperty]);

  // Actions
  const handleApprove = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: true } : r))
    );
  };

  const handleReject = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved: false } : r))
    );
  };

  const clearAllFilters = () => {
    setFilterStatus("all");
    setFilterChannel("all");
    setFilterProperty("all");
    setSelectedPropertyView(null);
  };

  const selectProperty = (property: string) => {
    if (property === "" || property === null) {
      setSelectedPropertyView(null);
      setFilterProperty("all");
      return;
    }
    const newProperty = selectedPropertyView === property ? null : property;
    setSelectedPropertyView(newProperty);
    setFilterProperty(newProperty || "all");
  };

  const handleViewAll = () => selectProperty("");

  const handleSelectProperty = (property: string) => () => {
    selectProperty(property);
  };

  return {
    // State
    reviews,
    loading,
    sortField,
    sortDirection,
    filterStatus,
    filterChannel,
    filterProperty,
    selectedPropertyView,
    // Computed values
    properties,
    channels,
    filteredAndSortedReviews,
    stats,
    propertyPerformance,
    hasActiveFilters,
    // Actions
    setSortField,
    setSortDirection,
    setFilterStatus,
    setFilterChannel,
    setFilterProperty,
    handleApprove,
    handleReject,
    clearAllFilters,
    selectProperty,
    handleViewAll,
    handleSelectProperty,
  };
}

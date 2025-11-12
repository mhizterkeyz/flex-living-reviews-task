"use client";

import { SortField, SortDirection, FilterStatus } from "@/types/review";
import { CustomSelect } from "./CustomSelect";

interface DashboardFiltersProps {
  sortField: SortField;
  sortDirection: SortDirection;
  filterStatus: FilterStatus;
  filterChannel: string;
  filterProperty: string;
  properties: string[];
  channels: string[];
  onSortChange: (field: SortField) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  onFilterStatusChange: (status: FilterStatus) => void;
  onFilterChannelChange: (channel: string) => void;
  onFilterPropertyChange: (property: string) => void;
}

export function DashboardFilters({
  sortField,
  sortDirection,
  filterStatus,
  filterChannel,
  filterProperty,
  properties,
  channels,
  onSortChange,
  onSortDirectionChange,
  onFilterStatusChange,
  onFilterChannelChange,
  onFilterPropertyChange,
}: DashboardFiltersProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-[0_2px_8px_0_rgb(0_0_0_/0.08)]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Status Filter */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Status
          </label>
          <CustomSelect
            options={[
              { value: "all", label: "All" },
              { value: "approved", label: "Approved" },
              { value: "pending", label: "Pending" },
              { value: "rejected", label: "Rejected" },
            ]}
            value={filterStatus}
            onChange={(value) => onFilterStatusChange(value as FilterStatus)}
            placeholder="All"
          />
        </div>

        {/* Channel Filter */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Channel
          </label>
          <CustomSelect
            options={[
              { value: "all", label: "All Channels" },
              ...channels.map((channel) => ({
                value: channel,
                label: channel,
              })),
            ]}
            value={filterChannel}
            onChange={onFilterChannelChange}
            placeholder="All Channels"
            searchable={channels.length > 3}
          />
        </div>

        {/* Property Filter */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Property
          </label>
          <CustomSelect
            options={[
              { value: "all", label: "All Properties" },
              ...properties.map((property) => ({
                value: property,
                label: property,
              })),
            ]}
            value={filterProperty}
            onChange={onFilterPropertyChange}
            placeholder="All Properties"
            searchable={properties.length > 3}
          />
        </div>

        {/* Sort Field */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Sort By
          </label>
          <CustomSelect
            options={[
              { value: "submittedAt", label: "Date" },
              { value: "rating", label: "Rating" },
              { value: "listingName", label: "Property" },
              { value: "guestName", label: "Guest" },
            ]}
            value={sortField}
            onChange={(value) => onSortChange(value as SortField)}
            placeholder="Date"
          />
        </div>

        {/* Sort Direction */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-600">
            Direction
          </label>
          <CustomSelect
            options={[
              { value: "desc", label: "Descending" },
              { value: "asc", label: "Ascending" },
            ]}
            value={sortDirection}
            onChange={(value) =>
              onSortDirectionChange(value as SortDirection)
            }
            placeholder="Descending"
          />
        </div>
      </div>
    </div>
  );
}


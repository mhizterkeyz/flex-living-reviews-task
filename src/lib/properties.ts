// Helper to convert listing name to URL-friendly slug
export function slugifyPropertyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper to decode property slug back to listing name
export function deslugifyPropertyName(slug: string): string {
  // Handle URL-encoded spaces and hyphens
  const decoded = decodeURIComponent(slug);
  // Replace hyphens with spaces, but preserve actual spaces
  return decoded.replace(/-/g, " ");
}

// Mock property data - in a real app, this would come from a database
export interface Property {
  id: string;
  name: string;
  location: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
  description: string;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  houseRules: {
    noSmoking: boolean;
    noPets: boolean;
    noParties: boolean;
    securityDeposit: boolean;
  };
  cancellationPolicy: string[];
  images: string[];
}

const MOCK_PROPERTIES: Record<string, Property> = {
  "1": {
    id: "1",
    name: "2B N1 A - 29 Shoreditch Heights",
    location: "Shoreditch, London",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 3,
    description:
      "Elegant & Modern 2 Bed Flat in Chiswick - The Flex London. This beautifully designed apartment offers a perfect blend of comfort and style, located in the heart of one of London's most vibrant neighborhoods. The space features contemporary furnishings, a fully equipped kitchen, and a cozy living area perfect for relaxing after a day exploring the city.",
    amenities: [
      "Cable TV",
      "Internet",
      "Wireless",
      "Kitchen",
      "Heating",
      "Smoke Detector",
      "Washing Machine",
      "Hair Dryer",
      "Carbon Monoxide Detector",
      "WiFi",
      "TV",
      "Refrigerator",
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    houseRules: {
      noSmoking: true,
      noPets: true,
      noParties: true,
      securityDeposit: true,
    },
    cancellationPolicy: [
      "Free cancellation for 48 hours after booking",
      "50% refund for cancellations made at least 7 days before check-in",
      "No refund for cancellations made less than 7 days before check-in",
    ],
    images: ["/ppty_1.jpeg", "/ppty_2.jpeg", "/ppty_3.jpeg"],
  },
  "2": {
    id: "2",
    name: "Studio Loft - Canary Wharf",
    location: "Canary Wharf, London",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    description:
      "Modern studio loft in the heart of Canary Wharf. Perfect for business travelers or couples looking for a stylish base in London's financial district. Features floor-to-ceiling windows, modern amenities, and easy access to public transport.",
    amenities: [
      "WiFi",
      "TV",
      "Kitchen",
      "Heating",
      "Air Conditioning",
      "Washing Machine",
      "Hair Dryer",
      "Smoke Detector",
    ],
    checkIn: "14:00",
    checkOut: "10:00",
    houseRules: {
      noSmoking: true,
      noPets: false,
      noParties: true,
      securityDeposit: true,
    },
    cancellationPolicy: [
      "Free cancellation for 48 hours after booking",
      "50% refund for cancellations made at least 7 days before check-in",
    ],
    images: ["/ppty_2.jpeg", "/ppty_1.jpeg", "/ppty_3.jpeg", "/ppty_2.jpeg"],
  },
  "3": {
    id: "3",
    name: "3BR Family Home - Notting Hill",
    location: "Notting Hill, London",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    beds: 4,
    description:
      "Spacious family home in the charming Notting Hill neighborhood. This beautiful Victorian property has been thoughtfully renovated to provide modern comfort while maintaining its original character. Perfect for families or groups looking for a home away from home.",
    amenities: [
      "WiFi",
      "TV",
      "Kitchen",
      "Heating",
      "Washing Machine",
      "Dishwasher",
      "Hair Dryer",
      "Garden",
      "Parking",
      "Smoke Detector",
      "Carbon Monoxide Detector",
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    houseRules: {
      noSmoking: true,
      noPets: false,
      noParties: true,
      securityDeposit: true,
    },
    cancellationPolicy: [
      "Free cancellation for 48 hours after booking",
      "50% refund for cancellations made at least 14 days before check-in",
      "No refund for cancellations made less than 14 days before check-in",
    ],
    images: [
      "/ppty_3.jpeg",
      "/ppty_1.jpeg",
      "/ppty_2.jpeg",
      "/ppty_1.jpeg",
      "/ppty_3.jpeg",
      "/ppty_2.jpeg",
    ],
  },
};

export async function getPropertyById(id: string): Promise<Property | null> {
  // In a real app, this would fetch from a database
  const property = MOCK_PROPERTIES[id];
  return property || null;
}

// Helper to get property ID from listing name (for reviews API)
export function getPropertyIdByListingName(listingName: string): string | null {
  const property = Object.values(MOCK_PROPERTIES).find(
    (p) => p.name === listingName
  );
  return property?.id || null;
}

export async function getAllProperties(): Promise<Property[]> {
  return Object.values(MOCK_PROPERTIES);
}

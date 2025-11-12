# Flex Living Reviews Dashboard

A comprehensive reviews management system for Flex Living properties, built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: 19.2.0
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── reviews/
│   │   │   └── hostaway/route.ts    # Hostaway reviews API endpoint
│   │   └── properties/
│   │       └── [id]/reviews/route.ts # Property-specific reviews endpoint
│   ├── dashboard/
│   │   └── page.tsx                  # Manager dashboard
│   └── property/
│       └── [id]/page.tsx             # Public property page with reviews
├── components/                        # Reusable UI components
├── hooks/
│   └── useDashboard.ts               # Dashboard business logic
├── lib/                              # Utility functions
│   ├── properties.ts                 # Property data and utilities
│   ├── propertyReviews.ts            # Review filtering logic
│   └── reviews.ts                    # Review calculations
└── types/
    └── review.ts                     # TypeScript interfaces
```

## Key Features

### 1. Hostaway Integration (Mocked)

**API Route**: `GET /api/reviews/hostaway`

- Normalizes Hostaway review data into a consistent format
- Handles various review types (guest-to-host, host-to-guest)
- Parses category ratings and dates
- Returns structured JSON response

**Response Format**:

```json
{
  "ok": true,
  "reviews": [
    {
      "id": "7454",
      "listingName": "2B N1 A - 29 Shoreditch Heights",
      "guestName": "Emma Thompson",
      "reviewType": "guest-to-host",
      "rating": 9,
      "text": "Amazing stay!...",
      "categories": [
        { "category": "cleanliness", "rating": 10 },
        { "category": "communication", "rating": 9 }
      ],
      "submittedAt": "2024-01-15T14:30:00.000Z",
      "status": "published",
      "channel": "hostaway"
    }
  ]
}
```

### 2. Manager Dashboard

**Route**: `/dashboard`

**Features**:

- **Per-Property Performance**: Visual cards showing review counts, average ratings, and trends per property
- **Advanced Filtering**: Filter by status (all/approved/pending/rejected), channel, and property
- **Flexible Sorting**: Sort by date, rating, property name, or guest name (ascending/descending)
- **Review Management**: Approve or reject reviews with visual feedback
- **Category Insights**: Average ratings across cleanliness, communication, and house rules
- **Statistics Overview**: Total reviews, approved count, pending count, average rating, and property count
- **Trend Detection**: Visual indicators for property performance trends

**Design Decisions**:

- Clean, modern UI matching Flex Living brand colors
- Light mode enforced for consistent experience
- Custom select inputs matching Flex Living design
- Responsive layout with mobile-first approach
- Hover states and transitions for better UX

### 3. Public Property Page

**Route**: `/property/[id]`

**Features**:

- Replicates Flex Living property details layout
- Sticky header that changes color on scroll
- Full-width image gallery
- Sticky booking widget
- **Approved Reviews Section**: Displays only reviews approved by managers
- Property amenities, policies, and location information
- Responsive design matching Flex Living aesthetic

**Review Display**:

- Shows guest name, rating, and review text
- Displays category ratings (cleanliness, communication, house rules)
- Formatted dates and star ratings
- Only approved reviews are visible to the public

## API Behaviors

### Review Normalization

The system normalizes Hostaway review data to handle:

- Missing ratings (null values)
- Different review types (guest-to-host vs host-to-guest)
- Category ratings array
- Date string parsing to ISO format
- Channel identification (currently all "hostaway")

### Review Approval System

**Current Implementation**:

- Dashboard approve/reject actions update client-side state with immediate visual feedback
- Public property page uses a predefined set of approved review IDs for demonstration
- This separation allows the dashboard to showcase the full approval workflow while keeping the demo lightweight

**Approved Reviews** (pre-configured in `src/lib/propertyReviews.ts`):

- Review ID: 7454 (Emma Thompson - 2B N1 A)
- Review ID: 7461 (Robert Taylor - 2B N1 A)
- Review ID: 7457 (David Martinez - 3BR Family Home)

**Note**: In a production environment, approvals would be persisted via API routes to a database (PostgreSQL, MongoDB, etc.) with proper authentication and authorization. The current implementation prioritizes demonstrating the UI/UX and business logic without the overhead of database setup and API persistence layers.

### Property Lookup

Properties are identified by numeric IDs (1, 2, 3) rather than slugs. The system:

- Maps property IDs to listing names
- Filters reviews by matching listing names
- Handles missing properties gracefully (returns 404)

## Google Reviews Exploration

### Findings

**Integration Feasibility**: ✅ Possible but requires additional setup

**Options**:

1. **Google Places API**:

   - Requires Google Cloud Platform account
   - Needs API key and billing enabled
   - Can fetch reviews for business locations
   - Rate limits apply (varies by plan)

2. **Google My Business API**:

   - Requires business verification
   - More complex authentication (OAuth 2.0)
   - Better for businesses managing their own listings

3. **Third-Party Services**:
   - Services like ReviewPush, Podium, or Birdeye
   - Handle API complexity and provide unified interface
   - Usually require subscription

**Implementation Considerations**:

- **Authentication**: Google APIs require OAuth 2.0 or API key authentication
- **Rate Limits**: Free tier has strict limits (1,000 requests/day for Places API)
- **Data Structure**: Google reviews have different structure than Hostaway (rating scale, categories, etc.)
- **Normalization**: Would need to map Google review format to our `Review` interface
- **Caching**: Reviews don't change frequently, so caching would be important
- **Cost**: Places API charges per request after free tier

**Recommended Approach** (if implementing):

1. Create `/api/reviews/google` endpoint
2. Use Google Places API with API key
3. Normalize Google review data to match `Review` interface
4. Add "google" as a channel option in dashboard filters
5. Implement caching (e.g., Next.js revalidation) to reduce API calls
6. Handle rate limiting gracefully

**Current Status**: Not implemented due to:

- Requires Google Cloud Platform setup
- API key management and security considerations
- Additional complexity for a demo/mock scenario
- Focus on core Hostaway integration first

## Local Setup Instructions

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Access the Application**:

   - Dashboard: http://localhost:3000/dashboard
   - Property Pages: http://localhost:3000/property/1, /property/2, /property/3

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Design Decisions

### Color Scheme

- **Primary Green**: `rgb(40, 78, 76)` - Flex Living brand color
- **Accent Green**: `rgb(5, 150, 105)` - Interactive elements
- **Background**: `#fafafa` (dashboard), `#fffdf6` (property pages)
- **Cards**: White with subtle shadows

### Component Architecture

- **Separation of Concerns**: Business logic in hooks (`useDashboard`), UI in components
- **Reusability**: Components like `ReviewCard`, `StatsCard`, `CustomSelect` are reusable
- **Type Safety**: Full TypeScript coverage with interfaces for all data structures

### State Management

- **Client State**: React hooks (`useState`, `useMemo`) for dashboard
- **Server State**: Direct function imports for server components (no fetch overhead)
- **No External Libraries**: Pure React for simplicity

### Performance Optimizations

- **Memoization**: `useMemo` for expensive calculations (filtering, sorting, stats)
- **Server Components**: Property page uses server components for better performance
- **Image Optimization**: Next.js `Image` component for optimized images

## Demo Limitations & Design Decisions

This implementation prioritizes demonstrating core functionality, clean architecture, and excellent UX within a constrained timeline. Several production-ready features were intentionally simplified to keep the demo focused and maintainable:

### Review Approval Persistence

**Current State**: Dashboard approve/reject actions update client-side state only. The public property page uses a predefined set of approved reviews.

**Why**: To demonstrate the complete approval workflow and UI without requiring database setup, API persistence routes, and state management complexity. The approval logic is fully implemented and functional—it simply needs to be connected to a persistence layer.

**Production Implementation** (straightforward):

- Add `POST /api/reviews/[id]/approve` and `POST /api/reviews/[id]/reject` routes
- Store approval status in database (e.g., `reviews` table with `approved` boolean column)
- Update `getApprovedReviewsForProperty` to query database instead of hardcoded set
- Add optimistic UI updates with error handling

**Estimated Effort**: 2-3 hours for full implementation with database.

### Google Reviews Integration

**Current State**: Documented exploration findings, but not implemented.

**Why**: Focused on delivering a polished Hostaway integration first. Google Reviews would require additional API setup, authentication, and normalization logic that would extend the scope significantly.

**Production Implementation**: See "Google Reviews Exploration" section above for detailed approach.

### Other Simplifications

- **Mock Data**: Uses provided Hostaway JSON structure instead of live API calls (API route structure is production-ready)
- **No Authentication**: Dashboard is publicly accessible (would add NextAuth.js or similar in production)
- **No Real-time Updates**: Manual refresh required (would add WebSocket/polling in production)

These decisions allow the demo to showcase:

- ✅ Clean, maintainable code architecture
- ✅ Comprehensive feature set (filtering, sorting, insights)
- ✅ Polished UI matching Flex Living brand
- ✅ Production-ready API route structure
- ✅ Type-safe TypeScript implementation

All of these can be extended to production with minimal refactoring.

## Future Enhancements

1. **Persistence Layer**: Database integration for review approvals (PostgreSQL/MongoDB)
2. **Google Reviews**: Implement Google Places API integration
3. **Authentication**: Add manager login/authorization (NextAuth.js)
4. **Real-time Updates**: WebSocket or polling for new reviews
5. **Export**: CSV/PDF export of reviews
6. **Analytics**: More detailed trend analysis and charts
7. **Bulk Actions**: Approve/reject multiple reviews at once
8. **Search**: Full-text search across review content
9. **Notifications**: Alert managers of new reviews

## Notes

- All review data is currently mocked using the provided Hostaway JSON structure
- Property images are stored in the `public` folder
- The system is designed to be easily extended with real API integrations
- All routes are server-rendered for optimal SEO and performance
- Code structure follows Next.js 16 App Router best practices

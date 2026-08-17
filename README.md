# NrityaRasa — Dance Performance Booking Platform

A production-ready dance performance booking website built with Next.js, TypeScript, PostgreSQL, and Prisma.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM 5
- **Database:** PostgreSQL
- **Auth:** JWT-based admin authentication (jose) with timing-safe credential comparison
- **Validation:** Zod + React Hook Form
- **UI:** Custom component library with Tailwind CSS
- **Font:** Casko Luxury Demo (Nirmana Visual)

## Installation

```bash
git clone <repo-url>
cd dancebooking
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Secret key for JWT signing (required in production) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `NEXT_PUBLIC_SITE_URL` | Site URL (e.g., `http://localhost:3000`) |

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Or use migrations
npx prisma migrate dev --name init
```

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin Access

Navigate to `/admin/login` and sign in with the credentials from your `.env` file (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Adding Images

Place images in the appropriate directories:

```
public/images/
  banner.jpg            — Hero banner & about section
  styles/               — Dance style cards
    classical.jpg
    semi-classical.jpg
    western.jpg
    mass.jpg
```

## Adding Videos

Place video files in:

```
public/videos/
  classical.mp4
  wedding.mp4
  western.mp4
  group.mp4
```

Videos auto-play muted and loop in the carousel section. Intersection Observer ensures only visible videos play.

## Changing Brand Information

Edit `src/config/site.ts` to update:

- Brand name (currently "NrityaRasa")
- Contact information (name, phone, address)
- Statistics
- Navigation items
- Occasion types
- Dance styles

## Project Structure

```
src/
  app/
    page.tsx                          # Home page
    book/page.tsx                     # Booking page
    admin/login/page.tsx              # Admin login
    admin/page.tsx                    # Dashboard with stats
    admin/bookings/page.tsx           # Bookings list with search/filter
    admin/bookings/[id]/page.tsx      # Booking detail + status update
    api/
      bookings/route.ts               # Create booking (public)
      auth/login/route.ts             # Admin login
      auth/logout/route.ts            # Admin logout
      admin/bookings/route.ts         # List bookings (admin)
      admin/bookings/[id]/route.ts    # Get/update/delete booking
  components/
    ui/                               # Reusable UI primitives
    admin/                            # Admin panel components
    hero.tsx                          # Full-width cinematic hero
    navbar.tsx                        # Transparent sticky navbar
    booking-form.tsx                  # Validated booking form
    dance-styles.tsx                  # Dance style cards with images
    video-carousel.tsx                # Auto-playing video carousel
    about-section.tsx                 # About with banner image
    dance-story.tsx                   # Dance description section
    occasions.tsx                     # Occasion type cards
    cta.tsx                           # Call to action
    footer.tsx                        # Footer with contact
  config/site.ts                      # Central configuration
  lib/auth.ts                         # JWT auth + timing-safe compare
  lib/db.ts                           # Prisma singleton
  lib/validations.ts                  # Zod schemas
  lib/utils.ts                        # cn() utility
  middleware.ts                       # Admin route protection
prisma/
  schema.prisma                       # Booking model + enum
  seed.ts                             # Seed script
```

## Deployment (Vercel)

```bash
# 1. Push to GitHub
git add . && git commit -m "Initial deploy" && git push

# 2. Import on vercel.com
# 3. Set environment variables in Vercel dashboard
# 4. Add PostgreSQL database (Vercel Postgres / Neon / Supabase)
# 5. Deploy
```

## Docker (Local Development)

```bash
# Start PostgreSQL
docker compose up -d db

# Push schema
npx prisma db push

# Start app
npm run dev
```

## Security

- Admin routes protected server-side via JWT middleware
- Timing-safe credential comparison (prevents timing attacks)
- AUTH_SECRET required in production
- All API inputs validated with Zod
- Duplicate booking prevention (5-minute window)
- HttpOnly cookies for admin sessions

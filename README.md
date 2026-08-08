# Zayan Travels — Visa Agency Website

A production-ready visa agency website built with Next.js 16, TypeScript, Prisma, and Tailwind CSS. Features a public marketing site, admin dashboard with full CRUD for services, Google Maps reviews integration, and contact form with email delivery.

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.3 (App Router, Turbopack) |
| Language | TypeScript 5.x (strict mode) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion v12 |
| Auth | NextAuth.js v5 (credentials provider for admin) |
| Database | PostgreSQL via Prisma ORM v6 |
| File Upload | Uploadthing v7 (service images) |
| Form Handling | React Hook Form v8 + Zod v4 |
| State | Zustand v5 (client state) + React Query v5 (server state) |
| Email | Resend SDK (contact form) |
| Maps/Reviews | Google Places API (New) — Place Details |
| Deployment | Vercel (Edge-compatible) |

## 📁 Project Structure

```
zayan-travels/
├── app/
│   ├── (site)/                      # Public routes group
│   │   ├── page.tsx                 # Landing page (hero, features, reviews, CTA)
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx        # Public services listing
│   │   ├── contact/page.tsx
│   │   └── layout.tsx               # Shared navbar + footer
│   ├── (admin)/                     # Admin routes group
│   │   ├── dashboard/page.tsx
│   │   ├── dashboard/services/page.tsx   # CRUD for services
│   │   ├── dashboard/services/new/page.tsx
│   │   ├── dashboard/services/[id]/edit/page.tsx
│   │   └── layout.tsx               # Auth-protected layout
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── services/route.ts        # GET all, POST new
│   │   ├── services/[id]/route.ts   # GET one, PATCH, DELETE
│   │   ├── contact/route.ts         # Send email via Resend
│   │   └── reviews/route.ts         # Proxy Google Places API
│   ├── globals.css
│   └── layout.tsx                   # Root layout
├── components/
│   ├── site/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ReviewsCarousel.tsx      # Google Maps reviews
│   │   ├── AboutSection.tsx
│   │   └── ContactForm.tsx
│   ├── admin/
│   │   ├── ServiceForm.tsx
│   │   ├── ServiceTable.tsx
│   │   └── Sidebar.tsx
│   └── ui/                          # Shared primitives (Button, Input, Card, Badge, Modal)
├── lib/
│   ├── prisma.ts                    # Prisma client singleton
│   ├── auth.ts                      # NextAuth config
│   ├── env.ts                       # Lazy env validation with Zod
│   ├── validations/
│   │   ├── service.schema.ts        # Zod schema
│   │   └── contact.schema.ts
│   ├── google-places.ts             # Google Places API helper
│   └── utils.ts                     # cn(), formatDate(), etc.
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── proxy.ts                         # Edge middleware (dashboard auth protection)
├── tests/
├── next.config.ts
├── tailwind.config.ts
└── .env.local.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- PostgreSQL database (local or cloud like Neon, Supabase)
- npm or pnpm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/xnafi/zayan_travels.git
cd zayan-travels
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth secret (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Base URL (e.g., `http://localhost:3000`) |
| `GOOGLE_PLACES_API_KEY` | Google Places API (New) key |
| `GOOGLE_PLACE_ID` | Your agency's Google Maps Place ID |
| `UPLOADTHING_SECRET` | Uploadthing secret key |
| `UPLOADTHING_APP_ID` | Uploadthing app ID |
| `RESEND_API_KEY` | Resend API key for email |
| `CONTACT_EMAIL` | Inbox for contact form submissions |

4. **Set up the database**

```bash
npm run db:migrate   # Run migrations
npm run db:seed      # Create default admin user
```

5. **Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🗄️ Database Schema

Two main models:

- **Service** — visa service listings with title, slug, description, rich content, icon, image, featured/published flags, and display order.
- **AdminUser** — authenticated admin accounts with bcrypt-hashed passwords.

## 🔐 Admin Dashboard

Login at `/login` with the seeded admin credentials.

Features:

- **Dashboard overview** — stats cards (total services, published, drafts) and quick actions
- **Services CRUD** — full list, create, edit, delete with confirmation
  - Title auto-generates slug
  - Icon picker from Lucide preset list
  - Uploadthing image upload
  - Featured and published toggles
  - Display order control

All mutations use optimistic updates via React Query.

## 🌍 Public Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, features, services preview, Google reviews carousel, CTA banner |
| `/about` | Agency story, team, stats |
| `/services` | Dynamic grid of published services from DB |
| `/contact` | Contact form with Zod validation + Resend email delivery |

## 📡 API Routes

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/services` | Public | All published services |
| POST | `/api/services` | Admin | Create service |
| GET | `/api/services/[id]` | Admin | Single service |
| PATCH | `/api/services/[id]` | Admin | Update service |
| DELETE | `/api/services/[id]` | Admin | Delete service |
| POST | `/api/contact` | Public | Send contact email (rate-limited) |
| GET | `/api/reviews` | Public | Cached Google reviews (6h revalidation) |

All responses use a consistent `{ success, data, error }` shape.

## 🎨 Design System

**Brand Palette**

```css
--brand-primary: #1B4FD8;      /* Deep royal blue — trust, authority */
--brand-secondary: #F59E0B;    /* Warm amber — energy, optimism */
--brand-dark: #0F172A;         /* Near-black slate */
--brand-surface: #F8FAFC;      /* Off-white background */
--brand-muted: #64748B;        /* Secondary text */
```

**Typography**

- Display: Plus Jakarta Sans (bold headings)
- Body: Inter (readable paragraphs)

## 🧪 Testing

```bash
npm test          # Run Vitest suite
npm run test:watch
npm run test:coverage
```

Coverage thresholds: lines 70%, functions 70%, branches 60%.

## 🛠️ Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Prisma generate + production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript check (`tsc --noEmit`) |
| `npm test` | Run Vitest tests |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed default admin user |
| `npm run db:studio` | Open Prisma Studio |

## 🔄 CI/CD

GitHub Actions workflows included:

- **ci.yml** — lint, type-check, tests (with PostgreSQL service), build on every PR/push
- **preview.yml** — Vercel preview deployment per PR
- **deploy.yml** — production deploy on merge to `main` with DB migrations + notifications
- **release.yml** — semantic versioning with changelog generation

Required GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DATABASE_URL_CI`, `DATABASE_URL_PREVIEW`, `DATABASE_URL_PROD`, `NEXTAUTH_SECRET`, `GOOGLE_PLACES_API_KEY`, `UPLOADTHING_SECRET`, `RESEND_API_KEY`, `SLACK_WEBHOOK_URL`.

## 🚀 Deployment

1. Push to GitHub — CI runs automatically.
2. Merge to `main` — deploys to Vercel production.
3. Set all env vars in Vercel project settings.
4. Vercel build command: `prisma generate && next build`

## 📝 License

Private project — all rights reserved.
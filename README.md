<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://placehold.co/1200x475/0f5c39/FFFFFF?text=Verdana+Botanical+Luxury+Plants+%26+Care" />
</div>

# Verdana — Botanical Luxury Plants & Care 


<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178c8?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields-64072B?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-F08018?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-000000?style=for-the-badge&logo=threefont&logoColor=white)](https://threejs.org/)
[![jsPDF](https://img.shields.io/badge/jsPDF-Field_Guide-EA332C?style=for-the-badge)](https://github.com/parallax/jsPDF)

</div>

---

## Overview

**Verdana** is a full-stack, expert-curated e-commerce platform that reimagines how rare indoor plants are discovered, purchased, delivered, and cared for. Built as a unified web application that marries a luxury retail experience with a living botanical care ecosystem, Verdana lets customers browse an expert-curated catalog of rare houseplants, place orders through a multi-step checkout with dynamic promo codes, track real-time shipment status through a five-stage climate-controlled delivery pipeline, diagnose plant health issues with an expert botanical doctor, and receive ongoing care guidance from **Vera** — a conversational plant-care expert.

The application ships as a single TypeScript monorepo (frontend + backend) powered by Vite's dev server in development and a unified Express host in production. Behind the scenes, a rich backend layer orchestrates in-memory data stores seeded with realistic order/review fixtures, a dynamic promo-code engine that generates cryptographically-diverse unique codes, server-side catalog filtering and sorting, expert botanical diagnosis with a deterministic rules-based fallback, conversational chat, newsletter subscriptions that mint bespoke discount codes, regional delivery waitlists, and an in-app ticket dispatch system for support, press, and career inquiries — all routed through a first-class internal address layer (`careers@verdanaplants.com`, `press@verdanaplants.com`, `care@verdanaplants.com`) that sidesteps traditional DNS/SMTP limitations entirely.

> **Live App:** [https://verdana-210250377863.us-central1.run.app/]  https://verdana-botanical-luxury-plants-care.ai.studio

---

## The Problem & What Verdana Solves

Buying rare houseplants online has historically been a gamble. Customers face three persistent pain points that no single platform has solved end-to-end:

| **The Problem** | **What It Costs The Customer** | **How Verdana Solves It** |
|---|---|---|
| **Plants arrive damaged** — flimsy cardboard boxes, loose soil, bruised foliage, and no climate control during transit mean up to 30% of shipped plants suffer stress or death within the first week. | Lost money on replacements, frustration, and mistrust of online plant retailers forever. | Every order is processed through a certified botanical triage, sealed in compostable coconut-coir packaging with molded-pulp shock absorbers, and shipped via zero-emission electric cargo vehicles with real-time chamber monitoring. A **30-day health guarantee** backs every specimen. |
| **No care support after purchase** — traditional retailers hand off the plant and vanish. Customers are left Googling blurry forum posts, over/under-watering, and watching their investment wither. | Plant death after delivery, wasted money, and no recourse. | Verdana continues the relationship post-purchase with an expert **Plant Doctor** diagnostic tool (backed by a horticulture rules engine) and **"Vera,"** a 24/7 conversational plant-care assistant. A downloadable **6-page PDF field guide** provides offline reference. |
| **Impersonal, generic e-commerce** — cookie-cutter Shopify stores with stock photos and no botanical expertise. Discount codes feel fake and expire uselessly. | Trust erosion, generic experiences, and coupon fatigue. | Every newsletter subscriber and visitor receives a **bespoke, non-repetitive promo code** generated on-the-fly by the Dynamic Botanical Promo Code Engine. The site features a fully interactive **3D "Plant Planet"** visualization, custom cursor, parallax depth effects, and scroll-triggered reveals. |

---

## What I Built (Features)

Every bullet below follows the pattern: **Developed X, using Y, resulting in Z.**

### Core Commerce & Catalog

- **Developed a server-side plant catalog with real-time filtering, search, and multi-field sorting, using an Express-backed API (`/api/plants`) that queries an in-memory curated plant dataset, resulting in instant category, care-level, light, keyword, and price-sort browsing with zero frontend round-trips for filter changes.**
- **Developed a multi-step checkout flow with live price calculation, dynamic discount application, and tax/shipping logic, using a React state machine (shipping → payment → success) backed by the `/api/orders` POST endpoint, resulting in real-time promo-code-aware totals that update as the user types with free shipping over $75 and NY/NJ local-metro 1-day delivery routing.**
- **Developed a dynamic botanical promo code engine that generates structurally-diverse, non-repetitive discount codes, using 10+ generation archetypes (botanical species, Brooklyn nursery batches, constellation myth codes, vintage apothecary labels, etc.) with randomized discount percentages (15%/20%), resulting in every subscriber receiving a unique code that never looks like a duplicate — e.g. `MONSTERA-47`, `BK-NURSERY-3841`, `CONSTELLATION-ORION-07`.**
- **Developed a resilient promo code validator with a permissive fallback, using a three-tier lookup (exact match → hyphen-insensitive match → universal fallback for any 3+ character code), resulting in zero "invalid code" dead-ends — even ad-hoc codes like `SPRING20` or `RARE-GIFT` are gracefully honored.**
- **Developed a sliding cart drawer with localStorage persistence and quantity controls, using a custom `useCart` hook backed by localStorage (survives page refreshes), resulting in a frictionless mini-checkout experience where cart state is never lost even if the tab closes.**

### Plant Care

- **Developed an expert Plant Doctor diagnostic clinic that analyzes plant symptoms and environment with personalized recommendations, using the `/api/doctor/diagnose` endpoint with a JSON-structured diagnostic schema, resulting in botanical diagnoses including confidence scores, severity levels, probable causes, immediate actions, recovery plans, and tailored watering/light advice.**
- **Developed a deterministic expert-rules fallback engine for the Plant Doctor that activates when the primary diagnostic service is unavailable, using a symptom-matching rules tree (overwatering detection, humidity stress, pest infestation, light burn) with curated recovery plans, resulting in reliable botanical guidance that remains available even without external service configuration.**
- **Developed "Vera" — a 24/7 conversational plant-care assistant in the floating chat widget, using the `/api/chat` endpoint with a Brooklyn-botanist personality system instruction and conversation history, resulting in expert-level responses to questions about light, watering, pest troubleshooting, and plant selection — with a high-quality canned fallback when the primary service is unavailable.**
- **Developed a downloadable 6-page official Verdana Botanical Care Field Guide & Handbook PDF, using jsPDF with custom typography, forest-green/amber color palette, botanical crest, and structured content (cover, plant hardiness zones, watering calendars, pest ID, propagation protocols, glossary), resulting in a print-ready, branded care reference that downloads instantly from the PDF viewer modal.**

### Order Tracking & Logistics

- **Developed an order tracking system with a five-stage delivery pipeline visualization (Placed → Botanist Health Triage → Eco-Cushion Encapsulation → Climate-Controlled Transit → White-Glove Delivery), using the `/api/orders/:orderId` GET endpoint with a hierarchical lookup and graceful fallback, resulting in customers never seeing a blank or error screen — even unknown tracking numbers dynamically generate a realistic botanical consignment.**
- **Developed universal order lookup that accepts order ID or tracking number interchangeably, using a cascading search across the orders map, tracking numbers, and registered user histories, resulting in a frictionless tracking experience where customers can paste either `VRD-8291402` or `VRD-TRK-771920` and get the same result.**
- **Developed delivery drop-off instruction submission, using a dedicated POST endpoint (`/api/orders/:orderId/instructions`) that persists instructions to the order record, resulting in real-time delivery note updates sent directly to the climate courier.**

### Community & Engagement

- **Developed a newsletter subscription flow that mints a unique promo code per subscriber at the moment of signup, using the `/api/subscribe` endpoint wired to the dynamic promo code generator, resulting in every email capture converting to an immediate, personalized discount that feels bespoke rather than generic.**
- **Developed a community stats dashboard showing delivery volume, health-arrival rate, average rating, active regions, and grower partners, using the `/api/stats` GET endpoint seeded with realistic metrics, resulting in social-proof numbers (12,400+ plants delivered, 98.4% healthy arrival rate, 4.9★ average) that build instant trust.**
- **Developed a product review system with verified purchase badges and seeded testimonials, using POST `/api/plants/:id/reviews` to accept new reviews and pre-seeding every plant with two botanist-verified 5-star reviews, resulting in rich social proof that appears immediately on every product page.**


### Support, Careers & Communications

- **Developed a multi-department in-app support ticket system (Plant Health, Billing, Press, General) with ticket ID generation and lookup, using POST `/api/support/contact` and GET `/api/support/tickets/:ticketId`, resulting in verified ticket confirmations (`VRD-CARE-XXXXXX`) with 100% in-app delivery and no reliance on external SMTP.**
- **Developed a press inquiry dispatch system with dedicated routing and ticket tracking, using POST `/api/press/inquire` (alias: `press@verdanaplants.com`), resulting in media relations teams receiving structured inquiries with auto-generated `VRD-PRESS-XXXXXX` ticket IDs.**
- **Developed a career application portal with resume/portfolio upload simulation, using POST `/api/careers/apply` and GET `/api/careers/applications/:ticketId`, resulting in candidates receiving `VRD-CAREER-XXXXXX` confirmation tickets and the People & Culture team getting structured application records.**
- **Developed a DNS diagnostic & email routing explanation system that tests in-app dispatch endpoints and explains why external SMTP (Outlook, Gmail, Apple Mail) fails for verdanaplants.com, using GET `/api/system/email-dns-status` and a client-side test harness, resulting in transparent communication about why all Verdana communications are handled through the built-in portal rather than external email clients.**

### User Experience & Interactivity

- **Developed an interactive 3D "Plant Planet" living ecosystem visualization using Three.js, rendering a deep-emerald icosphere globe with a translucent topographic wireframe, dual-tone orbital delivery rings, and glowing botanical grower-node markers with pulsating amber auras, resulting in a mesmerizing central hero element that responds to mouse drag for rotation and pointer movement for parallax.**
- **Developed a custom desktop cursor with smooth-follow behavior that enhances the luxury feel of the interface, using a React component that tracks mouse position with requestAnimationFrame interpolation, resulting in a tactile, premium pointer experience that signals craftsmanship.**
- **Developed a parallax depth-layered Hero section with mouse-responsive floating orbs and an architectural botanical grid SVG, using CSS transforms driven by mouse position and `data-depth` attributes, resulting in a cinematic, dimensional entry experience that grounds visitors in the Verdana brand.**
- **Developed scroll-triggered reveal animations across all page sections, using a custom `useScrollReveal` hook backed by IntersectionObserver with a polling refresh interval for dynamically-injected content, resulting in staggered, natural-feeling entrance animations (`.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`) that guide the user's eye through the narrative.**
- **Developed lazy-loaded code splitting for the heavy 3D PlantPlanet component, using React's `Suspense` with a custom loading shell, resulting in fast initial page loads where the 3D globe only loads when it scrolls into view.**

### Data & Persistence

- **Developed localStorage-based client state persistence for cart, user profile, and wishlist, using a custom `useCart` hook and React's useState initializers with try/catch JSON.parse guards, resulting in a stateful experience that survives full page reloads and browser restarts with zero server-side session management.**
- **Developed in-memory data seeding with realistic order fixtures, plant reviews, and community stats, using server-startup seeding in Express, resulting in a fully populated demo environment with 4 pre-seeded orders (Brooklyn, Manhattan, Jersey City, Boston), 2 reviews per plant, and 12,400+ plants delivered already in the stats.**


---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 19.0.1 | Component-based UI with hooks, suspense, and lazy loading |
| **Build Tool** | Vite | 8.3.0 | Lightning-fast bundler, HMR, and dev server |
| **Language** | TypeScript | 5.7+ | Type-safe full-stack development (strict configs) |
| **Styling** | Tailwind CSS | 4.3.3 | Utility-first CSS with custom design tokens |
| **UI Icons** | Lucide React | 0.546 | Icon library for all interface elements |
| **Animations** | Motion (Framer Motion) | 12.23 | Declarative animation primitives |
| **3D Graphics** | Three.js | 0.186 | Interactive Plant Planet globe visualization |
| **Backend** | Express | 4.21 | Unified API + static serving in production |
| **Server Runtime** | tsx | 4.21 | TypeScript execution without compilation step |
| **PDF Generation** | jsPDF | 4.2.1 | 6-page botanical care field guide PDF export |
| **State Management** | React Context + localStorage | — | Cart, user, and wishlist persistence |
| **HTTP Client** | Native Fetch API | — | All API communication (no external HTTP libs) |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser / Client                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  React 19    │  │  Tailwind 4  │  │   Three.js   │          │
│  │  Components  │  │  CSS Layers  │  │  Plant Globe │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                 │
│         └─────────────────┼──────────────────┘                 │
│                           │                                    │
│                   ┌───────▼───────┐                            │
│                   │  useCart Hook │                            │
│                   │  useScrollReveal│                          │
│                   └───────┬───────┘                            │
│                           │                                    │
│           ┌───────────────┼───────────────┐                    │
│           │      Fetch API (JSON)                           │
│           └───────────────┼───────────────┘                    │
│                           │                                    │
└───────────────────────────┼────────────────────────────────────┘
                            │              Express / Vite
┌───────────────────────────┼────────────────────────────────────┐
│         Server (server.ts via tsx)                            │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  API Endpoints                                          │  │
│  │  • /api/health      • /api/plants       • /api/stats   │  │
│  │  • /api/orders      • /api/doctor/diagnose  • /api/chat │  │
│  │  • /api/subscribe   • /api/promo/validate • /api/auth  │  │
│  │  • /api/wishlist    • /api/support     • /api/careers  │  │
│  │  • /api/press       • /api/waitlist/regional           │  │
│  │  • /api/system/email-dns-status                        │  │
│  └────────────────────────────────────┬────────────────────┘  │
│                                       │                        │
│  ┌────────────────────────────────────▼────────────────────┐  │
│  │  In-Memory Data Stores                                  │  │
│  │  • plants[] (curated catalog)                           │  │
│  │  • orders Map (seeded + dynamic)                         │  │
│  │  • reviews Map (seeded testimonials)                     │  │
│  │  • users Map (profiles, orders, wishlists)               │  │
│  │  • subscribers Set                                       │  │
│  │  • activePromoCodes Map (dynamic engine)                 │  │
│  │  • careerApplications[]                                  │  │
│  └────────────────────────────────────┬────────────────────┘  │
│                                       │                        │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Static Assets (Production)                             │  │
│  │  • Vite-built dist/ (React bundle, CSS, assets)          │  │
│  └─────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```


---

## API Endpoint Reference

### Plant Catalog

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check with uptime, catalog size, active orders, and AI readiness status. |
| `GET` | `/api/plants` | Catalog listing. Supports query params: `category`, `care`, `light`, `search`, `sortBy` (`price_asc`, `price_desc`, `rating`, `reviews`). |
| `GET` | `/api/plants/:id` | Single plant detail with full profile (scientific name, care metrics, origin, pet safety). |
| `GET` | `/api/plants/:id/reviews` | List all reviews for a specific plant. |
| `POST` | `/api/plants/:id/reviews` | Submit a new verified review (`author`, `rating`, `title`, `comment`). |

### Orders & Delivery

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/orders` | Place a new order. Accepts `customer` (name, email, address, city, state, zip), `items` (plantId, quantity), and optional `couponCode`. Returns the created order with tracking number and estimated delivery. |
| `GET` | `/api/orders/:orderId` | Track an order by order ID or tracking number. Features cascading lookup (orders map → tracking numbers → user histories → dynamic fallback generation). |
| `POST` | `/api/orders/:orderId/instructions` | Submit delivery drop-off instructions. Persists to the order record. |

### AI Care & Support

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/doctor/diagnose` | Plant health diagnosis using expert botanical analysis. Accepts `plantName`, `symptoms[]`, `environment` (light, wateringFrequency, humidity), and `customNotes`. Returns diagnosis, confidence, severity, probable causes, immediate action, recovery plan, watering/light advice. Falls back to expert rules engine when the primary diagnostic service is unavailable. |
| `POST` | `/api/chat` | Conversational assistant "Vera." Accepts `message` and `history[]`. Returns a personalized reply. Falls back to a curated response when the primary service is unavailable. |

### Marketing & Engagement

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/subscribe` | Newsletter signup. Generates a unique, non-repetitive promo code via the Dynamic Botanical Promo Code Engine. Returns the code, discount percent, label, and expiry. |
| `POST` | `/api/promo/validate` | Validates a promo code. Three-tier lookup: exact match → hyphen-insensitive match → universal permissive fallback. |
| `POST` | `/api/waitlist/regional` | Regional delivery waitlist signup. Accepts `email` and `zip`. Returns waitlist position and total count. |
| `GET` | `/api/stats` | Community statistics: plants delivered, healthy arrival rate, average rating, active regions, grower partners. |

### User Accounts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user account. Auto-seeds with 2 favorite plant IDs. |
| `POST` | `/api/auth/login` | Login or auto-create account for seamless demo experiences. |
| `POST` | `/api/wishlist/toggle` | Add/remove a plant from a user's wishlist. Returns updated `savedPlantIds` array. |

### Support, Press & Careers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/support/contact` | Submit a support ticket. Auto-generates `VRD-CARE-XXXXXX` ticket ID. Supports departments (Plant Health & Botanist Care default). |
| `GET` | `/api/support/tickets/:ticketId` | Look up a support ticket by ID. |
| `POST` | `/api/press/inquire` | Submit a press/media inquiry (alias: `press@verdanaplants.com`). Generates `VRD-PRESS-XXXXXX` ticket. |
| `POST` | `/api/careers/apply` | Submit a career application. Generates `VRD-CAREER-XXXXXX` ticket. Accepts name, email, phone, jobTitle, jobId, department, portfolioUrl, experience, coverLetter, resumeFileName. |
| `GET` | `/api/careers/applications/:ticketId` | Look up a career application by ticket ID. |
| `GET` | `/api/system/email-dns-status` | DNS & email routing diagnostic. Explains why external SMTP fails for verdanaplants.com and confirms in-app delivery is active. |


---

## Project Structure

```
verdana-botanical-luxury-plants-care/
│
├──  README.md                          # This file — the project's story
├──  metadata.json                       # AI Studio app manifest (name, description, capabilities)
├──  package.json                        # Dependencies, scripts, project config
├──  .env.example                        # Environment variable template (APP_URL)
├──   tsconfig.json                       # TypeScript compiler config (ES2022, React JSX, path aliases)
├──  vite.config.ts                       # Vite config with React + Tailwind plugins, HMR disabled for sandbox
├──   server.ts                          # Unified Express + Vite backend (API + static serving)
│
├── src/                                  # Frontend source code
│   ├── main.tsx                          # React entry point — creates root and renders <App />
│   ├── index.css                         # 24KB of global styles, Tailwind directives, custom CSS vars
│   ├── App.tsx                           # Root component — manages all modal state, routing, and event dispatch
│   ├── data/                             # Static data & content
│   │   └── plants.ts                     # Curated plant catalog (11 rare species), categories, testimonials
│   ├── types/                            # TypeScript type definitions
│   │   └── index.ts                      # Plant, CartItem, Review, Order, UserProfile, DiagnosticResult, etc.
│   ├── hooks/                            # Custom React hooks
│   │   ├── useCart.ts                    # Cart state with localStorage persistence + quantity controls
│   │   └── useScrollReveal.ts            # IntersectionObserver-based scroll-triggered animations
│   ├── utils/                            # Utility modules
│   │   └── generateBotanicalPdf.ts       # 38KB jsPDF module generating the 6-page care field guide
│   └── components/                       # 26 React components (the full UI)
│       ├── Cursor.tsx                    # Custom desktop cursor with smooth-follow
│       ├── AnnouncementBar.tsx           # Top promotional banner
│       ├── Navbar.tsx                    # Sticky navigation with cart/wishlist/account counters
│       ├── Hero.tsx                      # Parallax depth Hero with mouse-responsive floating orbs
│       ├── PlantPlanet.tsx               # 3D Three.js interactive globe (lazy-loaded via Suspense)
│       ├── FeaturedPlants.tsx            # Plant catalog grid with filtering & sorting
│       ├── PlantDetailModal.tsx          # Product quick-view modal with care metrics
│       ├── PlantDoctorModal.tsx          # AI diagnostic clinic form + results viewer
│       ├── OrderTrackerModal.tsx         # 5-stage delivery tracker with sample order pills
│       ├── Journey.tsx                   # Brand origin story
│       ├── HowItWorks.tsx                # 3-step process: Pick → Pack → Deliver
│       ├── About.tsx                     # Brand manifesto & ethos
│       ├── Features.tsx                  # Feature highlights grid
│       ├── CareGuide.tsx                 # Care resources section with PDF guide CTA
│       ├── Testimonials.tsx              # Customer testimonials carousel
│       ├── Ethics.tsx                    # B-Corp & sustainability commitments
│       ├── Regions.tsx                   # Delivery coverage map (NY/NJ/CT/MA/RI/PA/DE/MD/DC)
│       ├── Careers.tsx                   # Career opportunities + team showcase
│       ├── Press.tsx                     # Press mentions + media kit
│       ├── Policies.tsx                  # Shipping, returns, 30-day guarantee policies
│       ├── Footer.tsx                    # Site map footer with department links
│       ├── Cart.tsx                      # Sliding cart drawer with promo code input
│       ├── Checkout.tsx                  # Multi-step checkout (shipping → payment → success)
│       ├── Chatbot.tsx                   # Floating "Vera" AI assistant widget
│       ├── AuthModal.tsx                 # Login/register drawer with localStorage persistence
│       ├── SupportModal.tsx              # Support ticket submission form
│       ├── PdfViewerModal.tsx            # Care guide PDF viewer with download
│       ├── CareerApplicationModal.tsx    # Career application form with job details
│       ├── DnsDiagnosticModal.tsx        # DNS/email routing diagnostic test harness
│       └── Icon.tsx                      # Icon registry wrapping Lucide React components
│
└── .gitignore                            # Ignores node_modules, build, dist, .env*, coverage, .vercel
```


### Curated Plant Catalog

The catalog (11 rare indoor plants) is defined in `src/data/plants.ts` with full botanical profiles:

| Plant | Scientific Name | Category | Care Level | Price | Badge |
|-------|----------------|----------|------------|-------|-------|
| Monstera Deliciosa | *Monstera deliciosa* | Tropical | Easy | $48 | Bestseller |
| Fiddle Leaf Fig | *Ficus lyrata* | Statement | Medium | $72 | Editor's Pick |
| Sansevieria Laurentii | *Dracaena trifasciata* | Air Purifying | Easy | $32 | Air Purifier |
| Bird of Paradise | *Strelitzia nicolai* | Statement | Medium | $94 | Rare Find |
| Golden Pothos | *Epipremnum aureum* | Hanging | Easy | $22 | Beginner |
| Peace Lily | *Spathiphyllum wallisii* | Flowering | Easy | $36 | — |
| ZZ Plant | *Zamioculcas zamiifolia* | Structural | Easy | $38 | Low Light |
| Calathea Orbifolia | *Goeppertia orbifolia* | Foliage | Expert | $54 | New Arrival |
| Pink Princess Philodendron | *Philodendron erubescens* | Tropical | Medium | $68 | Collector |
| String of Pearls | *Curio rowleyanus* | Hanging | Medium | $28 | Succulent |
| Alocasia "Polly" | *Alocasia x amazonica* | Foliage | Expert | $42 | Sculptural |
| Cast Iron Plant | *Aspidistra elatior* | Air Purifying | Easy | $46 | Pet Friendly |

### Supported Delivery Regions

NY, NJ, CT, MA, RI, PA, DE, MD, DC — the Northeast Corridor with climate-controlled transit corridors, 28 grower partners, and 100% carbon-neutral delivery.


---

## Getting Started

### Prerequisites

- **Node.js** 18+ (tested with LTS)
- **Bun** or **npm** (package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhurghamCreation/Verdana.git
   cd Verdana
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local`:
   ```env
   APP_URL="http://localhost:3000"
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at **http://localhost:3000**


---

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Starts the unified Express + Vite dev server with TypeScript via `tsx`. HMR is disabled for sandbox iframe compatibility. |
| **Build** | `npm run build` | Bundles the React frontend with Vite into `dist/` for production deployment. |
| **Production Start** | `npm start` | Runs `tsx server.ts` serving both the API and static `dist/` assets. |
| **Preview** | `npm run preview` | Starts a Vite preview server to preview the production build locally. |
| **Clean** | `npm run clean` | Removes `dist/` and `server.js` build artifacts. |
| **Type Check** | `npm run lint` | Runs `tsc --noEmit` to verify TypeScript types without emitting output. |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_URL` | Recommended | The canonical URL where the app is hosted. |
| `PORT` | Optional | Server port (defaults to `3000`). |
| `NODE_ENV` | Optional | Set to `production` to enable static file serving from `dist/` instead of Vite middleware. |


---

## Deployment

This project can be deployed to any Node.js-compatible hosting platform.

1. **Vercel / Render / Railway** — Push to the `main` branch and configure the build command (`npm run build`) and start command (`npm start`).

2. **Docker** — The unified `server.ts` handles both API and static serving, making containerization straightforward:
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:20-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/server.ts ./
   COPY package*.json ./
   RUN npm ci --omit=dev
   EXPOSE 3000
   CMD ["node", "server.js"]
   ```

---

## License

This project is proprietary to **Verdana Plants LLC** — a certified B-Corporation based in Brooklyn, New York. All botanical curation, care protocols, packaging innovations, and brand assets are trademarked.

 **Verdana Plants LLC** · est. 2019 · Brooklyn, NY · Certified B-Corp · Zero-Plastic Greenhouse Standard · 100% Carbon-Neutral Transit

---

<div align="center">
  <sub>Made with 🌿 By Dhurgham Alsaadi · Shipped in compostable packaging</sub>
</div>

---

### Quick Links

- **[View Live App on AI Studio](https://ai.studio/apps/5cf81ab1-8728-4151-856f-54bc55257f9d)**
- **[API Endpoint Reference](#api-endpoint-reference)**
- **[Project Structure](#project-structure)**
- **[Tech Stack](#tech-stack)**
- **[Getting Started](#getting-started)**

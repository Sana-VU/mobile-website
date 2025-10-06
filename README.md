# PakJobs – Curated Jobs for Pakistan

A production-ready Next.js 15 application for curating verified job opportunities across Pakistan. Admins can manage content via a secure dashboard backed by MongoDB Atlas.

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn-inspired components, Framer Motion animations
- **Database:** MongoDB Atlas via Mongoose models
- **Auth:** next-auth (Credentials provider)
- **Validation:** zod + react-hook-form
- **Content:** Markdown/MDX, RSS, sitemap

## Getting Started
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and populate values
3. Run the dev server: `npm run dev`

## Production Setup
1. `npm run build`
2. `npm run start`

## Seeding & Admin Creation
- Seed demo data: `npm run seed`
- Create an admin: `npm run admin -- --email admin@example.com --password Strong#Pass1`

## Scripts
- `npm run dev` – Development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run Next.js lint
- `npm run seed` – Seed MongoDB with demo companies & jobs
- `npm run admin` – Create an admin user

## License
MIT

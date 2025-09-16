# WhatMobile Project Summary & Directory

## Overview

This is a modern mobile-first web app built with Next.js, Tailwind CSS, shadcn/ui, Prisma, and Sanity. It provides phone comparison, brand browsing, blog, and admin features. The design uses Zinc as the neutral base and Blue (#2563EB) as the primary accent, with Inter font and full dark mode support.

### Key Features

- **Mobile-first UI:** Responsive layouts, sticky top/bottom navigation, hero section, cards, and smooth animations.
- **Phone Comparison:** Compare devices, specs, and prices from multiple vendors.
- **Brand & Blog:** Browse brands and read latest posts.
- **Admin Area:** Protected CRUD screens for managing phones, brands, posts, etc.
- **PWA & SEO:** Offline support, install prompt, dynamic sitemaps, and structured data for search engines.
- **Sanity CMS:** Schemas for phones, brands, posts, reviews, authors.
- **Prisma DB:** Relational data for phones, vendors, prices, etc.

## Directory Structure

```
whatmobile/
├── .env.local                # Environment variables (Sanity projectId/dataset, etc.)
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind CSS config (Zinc/Blue theme)
├── package.json               # Project dependencies
├── prisma/                    # Prisma DB schema & seed
│   ├── schema.prisma
│   └── seed.ts
├── sanity/                    # Sanity CMS schemas
│   └── schemas/
│       ├── author.js
│       ├── index.js
│       ├── page.js
│       ├── phone.js
│       ├── portableText.js
│       ├── post.js
│       └── review.js
├── src/
│   ├── app/
│   │   ├── layout.tsx        # App layout
│   │   ├── page.tsx          # Homepage (hero, cards, nav)
│   │   ├── globals.css       # Global styles, Inter font
│   │   ├── (site)/           # Main site routes (phones, brands, blog, etc.)
│   │   ├── (admin)/          # Admin area
│   ├── components/
│   │   ├── ui/               # shadcn/ui components (Navbar, BottomNav, Button, etc.)
│   │   ├── phones/           # Phone list, card, filters
│   │   ├── layout/           # Layout components
│   │   ├── compare/          # Compare page components
│   ├── lib/
│   │   ├── db.ts             # Prisma DB client
│   │   ├── sanity.ts         # Sanity client config
│   │   ├── auth-options.ts   # NextAuth config
│   │   ├── utils.ts          # Utility functions
│   │   ├── sitemap-data.ts   # Sitemap helpers
│   ├── types/
│   │   ├── models.ts         # TypeScript models
│   │   ├── environment.d.ts  # Type definitions
├── public/                    # Static assets
├── README.md                  # Next.js default readme
└── PROJECT_SUMMARY.md         # This handover summary
```

## Setup Instructions

1. Install dependencies: `npm install`
2. Add your Sanity projectId/dataset to `.env.local`
3. Run Prisma seed: `npx ts-node prisma/seed.ts`
4. Start dev server: `npm run dev`

## Handover Notes

- All major features are implemented and ready for further extension.
- For Sanity integration, update `.env.local` with your credentials.
- For deployment, see Next.js and Vercel docs.
- For design tokens, see `tailwind.config.ts` and `globals.css`.

---

For any questions, see the code comments or reach out to the project owner.

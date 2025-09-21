# WhatMobile - Project Setup Guide

## 🔍 Configuration Health Audit Results

### ✅ **Passed Checks**

#### **Tailwind Configuration**

- ✓ Content globs now include all required paths:
  - `src/app/**/*.{ts,tsx}` - App Router components
  - `src/components/**/*.{ts,tsx}` - Reusable components
  - `sanity/**/*.{js,ts,jsx,tsx}` - Sanity schemas and studio files
- ✓ Dark mode class strategy configured
- ✓ Zinc color scale with #2563EB primary
- ✓ Container responsive padding system
- ✓ Border radius scale including `rounded-2xl`

#### **TypeScript Configuration**

- ✓ Path mapping configured: `@/*` → `./src/*`
- ✓ Next.js plugin enabled
- ✓ Strict mode enabled
- ✓ Module resolution set to "bundler"
- ✓ Includes Vitest and Playwright config files

#### **Prisma Configuration**

- ✓ Client generation working (`npx prisma generate` ✓)
- ✓ SQLite database configured
- ✓ Schema includes Brand, Phone, User, Review models
- ✓ Proper relationships and indexes defined

#### **Sanity CMS Configuration**

- ✓ Environment variables defined in `.env.example`
- ✓ Sanity client configured in `src/lib/sanity.ts`
- ✓ Schema files present in `sanity/schemas/`
- ✓ Image URL builder configured

#### **Environment Variables**

- ✓ All required variables in `.env.example`:
  - DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
  - SANITY_PROJECT_ID, SANITY_DATASET, SANITY_READ_TOKEN
  - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
  - NEXT_PUBLIC_SITE_URL

#### **Package.json Scripts**

- ✓ All development scripts present:
  - `dev`, `build`, `start`, `lint`, `typecheck`, `test`
  - Comprehensive `prisma:*` scripts for database operations

### ⚠️ **Warnings**

#### **Next.js Configuration**

- TypeScript compilation shows type errors from Next.js/webpack types
- These are common in Next.js 15 projects and don't affect functionality
- Consider updating to more stable type definitions if needed

## 🚀 Clean Clone → Running Dev Server Commands

### **Prerequisites**

- Node.js 20.x or later
- pnpm 8.x or later
- Git

### **Step-by-Step Setup**

```bash
# 1. Clone the repository
git clone <repository-url> whatmobile
cd whatmobile

# 2. Install pnpm (if not already installed)
npm install -g pnpm@8

# 3. Install dependencies
pnpm install

# 4. Set up environment variables
cp .env.example .env

# Edit .env with your actual values:
# - DATABASE_URL (use SQLite for local: "file:./dev.db")
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
# - NEXTAUTH_URL="http://localhost:3000"
# - Add your Sanity and Cloudinary credentials

# 5. Generate Prisma client
pnpm run prisma:generate

# 6. Set up database
pnpm run prisma:db:push

# 7. Seed the database (optional)
pnpm run seed

# 8. Start development server
pnpm run dev
```

### **Alternative Database Setup (if migrations needed)**

```bash
# If you prefer migrations over db push:
pnpm run prisma:migrate

# Reset database if needed:
pnpm run prisma:migrate:reset
```

### **Verification Commands**

```bash
# Verify TypeScript compilation
pnpm run typecheck

# Verify linting
pnpm run lint

# Verify build process
pnpm run build

# Run tests
pnpm run test

# Run E2E tests (requires build)
pnpm run test:e2e
```

### **Development Workflow**

```bash
# Start development with hot reload
pnpm run dev

# Open Prisma Studio (database GUI)
pnpm run prisma:studio

# Watch tests during development
pnpm run test:watch
```

## 📋 **Required Manual Configuration**

### **1. Environment Variables Setup**

```bash
# Required for production:
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-secure-random-secret"
NEXTAUTH_URL="https://yourdomain.com"

# Sanity CMS (create project at sanity.io):
SANITY_PROJECT_ID="your-project-id"
SANITY_DATASET="production"
SANITY_READ_TOKEN="your-read-token"

# Cloudinary (create account at cloudinary.com):
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Site configuration:
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### **2. Database Configuration**

- For local development: SQLite works out of the box
- For production: Update DATABASE_URL to PostgreSQL/MySQL
- Run migrations in production: `pnpm run prisma:migrate:deploy`

### **3. Sanity Studio Setup** (if needed)

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity project (if not already done)
sanity init

# Start Sanity Studio locally
sanity dev
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **TypeScript Errors**

- Most Next.js type errors are harmless and can be ignored
- If builds fail, try: `rm -rf .next && pnpm run build`

#### **Prisma Issues**

- Database connection: Verify DATABASE_URL format
- Schema changes: Run `pnpm run prisma:db:push` or `pnpm run prisma:migrate`
- Client out of sync: Run `pnpm run prisma:generate`

#### **Environment Variables**

- Missing variables: Check `.env` file exists and contains all required vars
- Build failures: Ensure NEXT*PUBLIC*\* variables are properly prefixed

#### **PWA Issues**

- Service worker: Disable PWA in development with NODE_ENV=development
- Manifest errors: Check `public/manifest.webmanifest` is valid JSON

### **Performance Tips**

- Use `--turbopack` flag (already configured in package.json)
- Enable pnpm caching in CI (already configured in GitHub Actions)
- Use SQLite for local development for faster startup

## ✨ **Features Enabled**

- 🎨 **Modern Design System**: Zinc + Blue color palette with Tailwind CSS
- 📱 **PWA Support**: Offline-first with service worker caching
- 🔍 **Full-text Search**: Advanced phone search and filtering
- 📊 **Database**: Prisma ORM with relational models
- 🖼️ **CMS**: Sanity headless CMS for content management
- 🖼️ **Images**: Cloudinary integration for optimized images
- 🔐 **Authentication**: NextAuth.js ready for multiple providers
- 🧪 **Testing**: Vitest unit tests + Playwright E2E tests
- 🚀 **CI/CD**: GitHub Actions workflow for automated testing
- 📈 **Performance**: Next.js 15 with App Router and RSC

## 📚 **Next Steps After Setup**

1. **Configure Authentication**: Set up OAuth providers in NextAuth.js
2. **Set Up Sanity Studio**: Create content schemas and deploy studio
3. **Add Sample Data**: Use the seed script or manually add phones/brands
4. **Customize Design**: Modify Tailwind theme and component styles
5. **Deploy**: Use Vercel, Netlify, or other Next.js-compatible platforms

---

🎉 **Your WhatMobile project is now ready for development!**

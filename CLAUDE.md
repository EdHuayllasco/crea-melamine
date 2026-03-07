# Melamine-app - Crea Melamine

## Project Overview
Website for "Crea Melamine", a local melamine furniture business in Lima, Peru.
Custom and standard furniture: kitchens, closets/wardrobes, office furniture.
Contact: creamelamine@gmail.com | +51 994 080 979, +51 956 167 469

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database/Auth**: Supabase
- **Deployment**: Vercel
- **Package Manager**: npm

## Project Structure
```
src/
  app/             # Next.js App Router pages
    (public)/      # Public-facing pages (home, gallery, contact)
    admin/         # Admin dashboard (future)
    layout.tsx
    page.tsx
  components/
    ui/            # shadcn/ui base components
    sections/      # Page sections (Hero, Services, Gallery, etc.)
    layout/        # Header, Footer, Navigation
  lib/
    supabase/      # Supabase client and utilities
    utils.ts       # General utilities
  types/           # TypeScript type definitions
  constants/       # Static data, content strings
public/
  images/          # Optimized images
```

## Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run format` - Format with Prettier

## Conventions
- Language: Spanish for all user-facing content, English for code (variable names, comments)
- Components: One component per file, PascalCase naming
- Use `cn()` utility for conditional classNames (from shadcn)
- Images: Use next/image with proper alt text in Spanish
- All pages must be responsive (mobile-first)
- Use semantic HTML elements
- Keep components small and focused
- Prefer server components; use "use client" only when needed

## Git
- Conventional commits in English: feat:, fix:, chore:, style:, refactor:
- Branch naming: feature/*, fix/*, chore/*

## Do NOT
- Add console.log statements in production code
- Use `any` type - always define proper types
- Commit .env files or secrets
- Use inline styles - use Tailwind classes
- Create unnecessary abstractions for one-time code

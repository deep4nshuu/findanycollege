# findAnyCollege

A college discovery MVP built with Next.js, TypeScript, Tailwind CSS,
PostgreSQL, and Prisma.

## Features

- Live college search using CollegeDB
- PostgreSQL cache for searched colleges
- College profile route with overview
- Nested college sections for courses, fees, placements, admissions,
  cut-offs, and reviews
- Responsive homepage with predictor and comparison entry points

## Current data coverage

College identity and location are fetched from CollegeDB.
Additional course, fee, placement, and cutoff data will be added from
verified official sources.

## Run locally

npm install
npx prisma generate
npm run dev
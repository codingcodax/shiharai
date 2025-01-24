# Shiharai - Subscription Tracker and Manager

## Overview

Shiharai is a responsive pwa designed to simplify subscription management. Track, organize, and manage all your subscriptions in one place with ease.

## Features

- [ ] Dashboard with the monthly spending and latest renewals.
- [ ] Search and filter subscriptions.
- [ ] Create subscriptions.
- [ ] Manage categories and payment methods.
- [ ] See latest notifications.
- [ ] Multi-currency support.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Backend**: [tRPC](https://trpc.io/), [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **UI Components**: Kosori UI
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with Google login

## Installation

### Prerequisites

- Node.js (v22 preferred)
- Package manager (pnpm preferred)
- Supabase account

### Setup

1. Clone the repository:

   ```bash
   gh repo clone codingcodax/shiharai
   ```

2. Install dependencies:

   ```bash
   pnpm i
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   AUTH_SECRET=your-auth-secret
   AUTH_GITHUB_ID=your-github-id
   AUTH_GITHUB_SECRET=your-github-secret
   DATABASE_URL=your-supabase-database-url
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000` in your browser.

## Database Schema

The database schema is designed using PostgreSQL (via Supabase) and includes tables for users, plans, subscriptions, categories, and notifications. See the detailed schema in [`db/schema/*`](/src/server/db/schema/).

## API (tRPC)

Shiharai's API is built with tRPC, providing seamless type-safe communication between frontend and backend. The API consists of routers for:

- **Auth Router**: User authentication and profile management
- **Subscription Router**: CRUD operations for subscriptions
- **Plan Router**: Plan information and upgrades
- **Notification Router**: Manage and retrieve reminders

## Deployment

Shiharai is designed to be deployed on platforms like [Vercel](https://vercel.com/). For deployment:

1. Push your code to a GitHub repository.
2. Link the repository to Vercel.
3. Configure the environment variables in the Vercel dashboard.
4. Deploy the app.

## License

This project is licensed under the Apache License 2.0. See the [`LICENSE`](./LICENCE) file for more details.

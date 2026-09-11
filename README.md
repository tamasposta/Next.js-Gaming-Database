# Gaming Database

A full-stack game discovery and personal game library application. The frontend uses Next.js and the IGDB API for game data; a separate Laravel API handles accounts, profiles, favorites, wishlists, and play status.

## Features

- Browse, search, filter, and sort games sourced from IGDB.
- View game details, trailers, genres, platforms, developers, publishers, related games, and time-to-beat data.
- Create an account and sign in with Laravel Sanctum cookie-based authentication.
- Maintain a profile with name, address, date of birth, and favorite genres.
- Add or remove games from Favorites using the star controls on cards and game detail pages.
- Add or remove games from a Wishlist using the heart controls.
- Track a game's playing status with start and completion dates.
- Open dedicated My Favorites and My Wishlist pages.
- Add a future game's release date to Google Calendar through a prefilled calendar link.
- Responsive navigation that switches to a mobile menu below the `lg` breakpoint.

## Architecture

```text
Next.js frontend (this repository)       http://localhost:3000
        |
        | IGDB game data, server-side only
        v
IGDB API

Next.js frontend
        |
        | Sanctum cookies and JSON API
        v
Laravel API (separate Gaming-Database-API project)       http://localhost:8000
        |
        v
MySQL
```

The Laravel backend is intentionally a separate project. During local development, keep it beside this repository:

```text
Frontend projektek/
  Next.js-Gaming-Database/
  Gaming-Database-API/
```

## Tech Stack

- Next.js 14 and React 18
- TypeScript
- Tailwind CSS and DaisyUI
- IGDB API and Twitch OAuth client credentials
- Laravel 13, Laravel Sanctum, and MySQL

## Prerequisites

- Node.js 20 or newer
- npm
- PHP 8.3 or newer
- Composer
- MySQL 8 or compatible MariaDB server
- Twitch developer credentials for the [IGDB API](https://api-docs.igdb.com/)

## Frontend Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/your-username/Next.js-Gaming-Database.git
   cd Next.js-Gaming-Database
   npm install
   ```

2. Create `.env.local` in the project root. You can use `.env.example` and `.env.local.example` as references.

   ```env
   IGDB_CLIENT_ID=your_twitch_client_id
   IGDB_CLIENT_SECRET=your_twitch_client_secret
   NEXT_PUBLIC_LARAVEL_API_URL=http://localhost:8000
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Laravel API Setup

Set up the separate `Gaming-Database-API` Laravel project before using authentication or personal-library features.

1. Configure its `.env` file for MySQL:

   ```env
   APP_URL=http://localhost:8000

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=gaming_database
   DB_USERNAME=your_mysql_user
   DB_PASSWORD=your_mysql_password

   SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
   SESSION_DOMAIN=null
   ```

2. Create the database, then run migrations:

   ```bash
   php artisan migrate
   ```

3. Start the API:

   ```bash
   php artisan serve --host=localhost --port=8000
   ```

The frontend expects the API to permit credentialed CORS requests from `http://localhost:3000` and `http://127.0.0.1:3000`.

## Available Scripts

```bash
npm run dev       # Start the Next.js development server
npm run build     # Create a production build
npm run start     # Start the production server after building
npx tsc --noEmit  # Run TypeScript type checking
```

## Notes

- IGDB credentials are server-only and must never be exposed with a `NEXT_PUBLIC_` prefix.
- The Google Calendar integration is a standard event-creation link; it does not store Google credentials or access a user's calendar directly.
- Do not commit `.env.local` or Laravel `.env` files. They contain environment-specific configuration and may contain secrets.

## Screenshots

![Gaming Database desktop](https://github.com/tamasposta/Next.js-Gaming-Database/assets/134706837/39b9800f-58db-4d59-b7bc-cd8c515c1d4d)

![Gaming Database mobile](https://github.com/tamasposta/Next.js-Gaming-Database/assets/134706837/1cb9534e-b225-45e2-b3a0-de1a5fcf9b22)


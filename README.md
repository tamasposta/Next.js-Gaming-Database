# Video Game Database App

![Video Game Database](https://img.shields.io/badge/Video%20Game%20Database-Next.js-blue.svg)
![Tailwind](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-green.svg)
![Prettier](https://img.shields.io/badge/Code%20Formatter-Prettier-orange.svg)
![Typescript](https://img.shields.io/badge/Language-Typescript-blue.svg)

## Description

Video Game Database App is a Next.js-based application that provides comprehensive information on video games using the IGDB API. This project was developed to practice and deepen my understanding of the Next.js framework, along with utilizing Tailwind CSS, Prettier, and TypeScript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Screenshots](#screenshots)

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/videogame-database-app.git
   ```
2. Navigate to the project directory
   ```bash
   cd videogame-database-app
   ```
3. Install the dependencies
   ```bash
   npm install
   ```

## Usage

1. Create Twitch developer credentials for [IGDB](https://api-docs.igdb.com/#account-creation).
2. Create a `.env.local` file in the root directory and add your credentials:
   ```plaintext
   IGDB_CLIENT_ID=your_client_id
   IGDB_CLIENT_SECRET=your_client_secret
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## Features

- **Dynamic Hero Banner**: Automatically fetches and showcases background artwork of the most popular game from IGDB.
- **Search & All Games Page**: Search games by query and filter by Genre, Release Year, and Platform (PlayStation, Xbox, Nintendo, PC).
- **Sorting Options**: Sort game results by Name (A-Z), Release Date, or Metacritic score.
- **Rich Game Details Page**:
  - Detailed overview, summary, platform support, and PC system requirements.
  - Interactive **User Rating Progress Bar** with percentage score and color-coded labels (*Exceptional, Recommended, Meh, Skip*).
  - Estimated **Time to Beat** (*normally*) in hours.
  - Developer and Publisher information with website links.
  - Embedded YouTube **Trailer Video Player**.
  - **Related Games & Franchise**: Browse other games in the same franchise, DLCs/expansions, and similar game recommendations.
- **Responsive Design**: Mobile-friendly layout styled with Tailwind CSS.

## Technologies Used

- **Next.js**: The React Framework for Production
- **Tailwind CSS**: Utility-first CSS framework
- **Prettier**: Code formatter
- **Typescript**: Typed JavaScript at Any Scale

## Contributing

Contributions are welcome! Please fork this repository and create a pull request with your changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request


## Acknowledgements

- [IGDB](https://igdb.com/) for providing the video game data
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prettier](https://prettier.io/) for code formatting
- [Typescript](https://www.typescriptlang.org/) for the language

## Screenshots

![Gaming-database-pc](https://github.com/tamasposta/Next.js-Gaming-Database/assets/134706837/39b9800f-58db-4d59-b7bc-cd8c515c1d4d)

![Gaming-database-mobile-tablet](https://github.com/tamasposta/Next.js-Gaming-Database/assets/134706837/1cb9534e-b225-45e2-b3a0-de1a5fcf9b22)


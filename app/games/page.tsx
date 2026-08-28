import AllGames from "../components/all-games";
import { getFilteredGames, getGenres, getPlatforms } from "../utils/requests";
import type { AllGamesPageProps } from "../types/all-games-page-props.types";

export default async function GamesPage({ searchParams }: AllGamesPageProps) {
  const genre = searchParams?.genre;
  const year = searchParams?.year;
  const platform = searchParams?.platform;

  const [games, genres, platforms] = await Promise.all([
    getFilteredGames({ genre, year, platform }),
    getGenres(),
    getPlatforms(),
  ]);

  return (
    <AllGames
      games={games}
      genres={genres}
      platforms={platforms}
      selectedGenre={genre}
      selectedYear={year}
      selectedPlatform={platform}
    />
  );
}

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "./card";
import { sortingFunctions } from "../utils/sorting";
import type { Game, HandleSortingParams } from "../types/games.types";
import type { FilterOption } from "../utils/requests";

type AllGamesProps = {
  games: Game[];
  genres: FilterOption[];
  platforms: FilterOption[];
  selectedGenre?: string;
  selectedYear?: string;
  selectedPlatform?: string;
};

export default function AllGames({
  games,
  genres,
  platforms,
  selectedGenre = "",
  selectedYear = "",
  selectedPlatform = "",
}: AllGamesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [order, setOrder] = useState<string>("ASC");

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    router.push(pathname);
  };

  const { sorting, sortingNum, sortingDate } = sortingFunctions;

  const handleSorting = ({ sortingFunction, col }: HandleSortingParams) => {
    sortingFunction(filteredGames, order, setFilteredGames, setOrder, col);
  };

  const currentYear = new Date().getUTCFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) =>
    String(currentYear - i)
  );

  const hasActiveFilters = Boolean(selectedGenre || selectedYear || selectedPlatform);

  return (
    <div className="flex flex-col items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10 sm:my-20 w-full gap-8">
      {/* Header */}
      <div className="w-full flex flex-col gap-2 items-start">
        <h1 className="text-3xl text-primary font-bold">All Games</h1>
        <h2 className="text-xl border-b-2 border-neutral-content pb-4 w-full text-secondary">
          Browse and filter video games from IGDB
        </h2>
      </div>

      {/* Filter Bar */}
      <div className="w-full bg-base-200 p-4 sm:p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-primary">Filters</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
          {/* Genre Dropdown */}
          <div className="flex flex-col gap-1">
            <label htmlFor="genre-select" className="text-sm font-medium text-base-content">
              Genre
            </label>
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => handleFilterChange("genre", e.target.value)}
              className="select select-bordered select-primary w-full bg-base-100 text-base-content"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Dropdown */}
          <div className="flex flex-col gap-1">
            <label htmlFor="year-select" className="text-sm font-medium text-base-content">
              Release Year
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="select select-bordered select-primary w-full bg-base-100 text-base-content"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Dropdown */}
          <div className="flex flex-col gap-1">
            <label htmlFor="platform-select" className="text-sm font-medium text-base-content">
              Platform
            </label>
            <select
              id="platform-select"
              value={selectedPlatform}
              onChange={(e) => handleFilterChange("platform", e.target.value)}
              className="select select-bordered select-primary w-full bg-base-100 text-base-content"
            >
              <option value="">All Platforms</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <div className="flex items-center">
              <button
                onClick={handleResetFilters}
                className="btn btn-neutral w-full sm:w-auto"
              >
                Reset Filters
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sorting controls */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-secondary">Sort by:</span>
          <button
            onClick={() => setFilteredGames(games)}
            className="btn btn-neutral btn-sm"
          >
            Default
          </button>
          <button
            onClick={() => handleSorting({ sortingFunction: sorting, col: "name" })}
            className="btn btn-outline btn-sm"
          >
            Name (A-Z)
          </button>
          <button
            onClick={() =>
              handleSorting({ sortingFunction: sortingDate, col: "released" })
            }
            className="btn btn-outline btn-sm"
          >
            Release Date
          </button>
          <button
            onClick={() =>
              handleSorting({ sortingFunction: sortingNum, col: "metacritic" })
            }
            className="btn btn-outline btn-sm"
          >
            Metacritic Score
          </button>
        </div>

        <div className="text-sm text-base-content opacity-75">
          Showing <span className="font-semibold text-primary">{filteredGames.length}</span> games
        </div>
      </div>

      {/* Games Grid or Empty State */}
      {filteredGames && filteredGames.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {filteredGames.map(
            ({ id, name, background_image, metacritic, released, slug }: Game) => (
              <Card
                key={id}
                id={id}
                name={name}
                background_image={background_image}
                metacritic={metacritic}
                released={released}
                slug={slug}
              />
            )
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-12 bg-base-200 rounded-xl gap-4 my-8">
          <p className="text-xl text-center text-secondary">
            No games found matching your selected filters.
          </p>
          <button onClick={handleResetFilters} className="btn btn-primary">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

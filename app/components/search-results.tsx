"use client";
import Card from "./card";
import { sortingFunctions } from "../utils/sorting";
import type { Game, SearchResultsProps } from "../types/games.types";
import useSearchResults from "../hooks/use-search-results";

export default function SearchResults({
  games,
  searchText,
}: SearchResultsProps) {
  const { sorting, sortingNum, sortingDate } = sortingFunctions;
  const { filteredGames, setFilteredGames, handleSorting } = useSearchResults({
    games,
    searchText,
  });

  return (
    <div className="flex flex-col items-center my-10 sm:my-20 mx-10 max-sm:mx-0">
      <h1 className="text-3xl text-primary mb-2">Top Search Results for</h1>
      <h2 className="text-xl text-secondary mb-10">&quot;{searchText}&quot;</h2>
      <h3>Sort by:</h3>
      <button
        onClick={() => setFilteredGames(games)}
        className="btn btn-neutral sm:btn-sm btn-xs pointer mt-2"
      >
        Default
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
      <div className="flex flex-wrap py-5 gap-3 mx-5 ">
        <button
          onClick={() =>
            handleSorting({ sortingFunction: sorting, col: "name" })
          }
          className="btn btn-outline sm:btn-sm btn-xs pointer focus:btn-secondary"
        >
          Name (A-Z)
        </button>
        <button
          onClick={() =>
            handleSorting({ sortingFunction: sortingDate, col: "released" })
          }
          className="btn btn-outline sm:btn-sm btn-xs pointer focus:btn-secondary"
        >
          Release Date
        </button>
        <button
          onClick={() =>
            handleSorting({ sortingFunction: sortingNum, col: "metacritic" })
          }
          className="btn btn-outline sm:btn-sm btn-xs pointer focus:btn-secondary"
        >
          Metacritic Score
        </button>
      </div>
      <div>
        <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr mx-10 max-sm:mx-0">
          {filteredGames &&
            filteredGames.map(
              ({
                id,
                name,
                background_image,
                metacritic,
                released,
                slug,
              }: Game) => (
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
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { Collection, RelatedGame } from "../../types/game-details.types";

type RelatedGamesProps = {
  collection?: Collection | null;
  similarGames?: RelatedGame[];
  dlcsAndExpansions?: RelatedGame[];
};

export default function RelatedGames({
  collection,
  similarGames,
  dlcsAndExpansions,
}: RelatedGamesProps) {
  const hasCollection = collection && collection.games && collection.games.length > 0;
  const hasDlcs = dlcsAndExpansions && dlcsAndExpansions.length > 0;
  const hasSimilar = similarGames && similarGames.length > 0;

  if (!hasCollection && !hasDlcs && !hasSimilar) {
    return null;
  }

  return (
    <div className="py-8 flex flex-col gap-10 border-t border-neutral/30 mt-6">
      <h2 className="text-3xl text-primary">Related Games</h2>

      {/* Franchise / Series Games */}
      {hasCollection && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-secondary font-semibold">
            Franchise: <span className="text-base-content">{collection.name}</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collection.games.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group flex flex-col bg-base-200 rounded-xl overflow-hidden hover:scale-105 transition-all duration-200 hover:outline hover:outline-2 hover:outline-neutral-content shadow-md hover:shadow-xl border border-neutral/40"
              >
                {game.coverImage ? (
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    className="w-full object-cover aspect-[5/7]"
                  />
                ) : (
                  <div className="w-full h-44 bg-neutral flex items-center justify-center text-xs text-center p-2 text-base-content opacity-70">
                    No Cover
                  </div>
                )}
                <div className="p-3 flex items-center justify-center flex-1">
                  <span className="text-xs font-semibold text-center text-base-content group-hover:text-primary transition line-clamp-2">
                    {game.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* DLCs and Expansions */}
      {hasDlcs && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-secondary font-semibold">
            DLCs & Expansions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {dlcsAndExpansions.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group flex flex-col bg-base-200 rounded-xl overflow-hidden hover:scale-105 hover:outline hover:outline-2 hover:outline-neutral-content transition-all duration-200 shadow-md hover:shadow-xl border border-neutral/40"
              >
                {game.coverImage ? (
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    className="w-full object-cover aspect-[5/7]"
                  />
                ) : (
                  <div className="w-full h-44 bg-neutral flex items-center justify-center text-xs text-center p-2 text-base-content opacity-70">
                    No Cover
                  </div>
                )}
                <div className="p-3 flex items-center justify-center flex-1">
                  <span className="text-xs font-semibold text-center text-base-content group-hover:text-primary transition line-clamp-2">
                    {game.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Similar Games */}
      {hasSimilar && (
        <div className="flex flex-col gap-4">
          <h3 className="text-xl text-secondary font-semibold">
            Similar Games You Might Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {similarGames.map((game) => (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group flex flex-col bg-neutral rounded-xl overflow-hidden hover:scale-105 transition-all duration-200 hover:outline hover:outline-2 hover:outline-neutral-content shadow-md hover:shadow-xl border border-neutral/40"
              >
                {game.coverImage ? (
                  <img
                    src={game.coverImage}
                    alt={game.name}
                    className="w-full object-cover aspect-[5/7]"
                  />
                ) : (
                  <div className="w-full h-44 bg-neutral flex items-center justify-center text-xs text-center p-2 text-base-content opacity-70">
                    No Cover
                  </div>
                )}
                <div className="p-3 flex items-center justify-center flex-1">
                  <span className="text-xs font-semibold text-center text-base-content group-hover:text-primary transition line-clamp-2">
                    {game.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import Image from "next/image";
import type { GameDetails } from "../../types/game-details.types";
import GameLibraryActions from "./game-library-actions";

export default function GameMainInfo({
  name,
  released,
  released_iso,
  metacritic,
  game_time_to_beats,
  id,
  slug,
  background_image,
}: GameDetails) {
  return (
    <div className="flex flex-col pb-10 flex-wrap gap-2">
      <div className="flex flex-col lg:flex-row justify-between">
        <div>
        <h1 className="text-4xl text-primary pb-2 max-md:text-3xl">{name}</h1>
        {released ? (
          <h2 className="text-xl text-secondary">Release date: {released}</h2>
        ) : (
          <h2 className="text-xl">TBA</h2>
        )}
        </div>
        <GameLibraryActions
          game={{
            id,
            name,
            slug,
            coverImage: background_image,
            releaseDate: released_iso,
          }}
        />
      </div>
      <div>
        <div className="flex flex-row pb-2">
          <Image
            className="h-5 mr-2"
            src="/images/Metacritic.svg"
            width="20"
            height="20"
            alt="Metacritic"
          />
          {metacritic == null ? (
            <h3 className="text-sm">
              <strong>Metacritic score:</strong> N/A
            </h3>
          ) : (
            <h3 className="text-sm">
              <strong>Metacritic score:</strong> {metacritic}
            </h3>
          )}
        </div>
        <div className="flex flex-row pb-2">
          <Image
            className="h-5 mr-2"
            src="/images/clock.svg"
            width="20"
            height="20"
            alt="Time to beat"
          />
          {!game_time_to_beats || game_time_to_beats === 0 ? (
            <h3 className="text-sm">
              <strong>Time to beat:</strong> ≈ No data yet
            </h3>
          ) : (
            <h3 className="text-sm">
              <strong>Time to beat:</strong> ≈ {game_time_to_beats} hours
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

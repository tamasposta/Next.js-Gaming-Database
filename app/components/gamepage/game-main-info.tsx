import Image from "next/image";
import { GameDetails } from "../../types/game-details.types";

export default function GameMainInfo({
  name,
  released,
  metacritic,
  playtime,
}: GameDetails) {
  return (
    <div className="flex flex-row pb-10 justify-between flex-wrap gap-2">
      <div>
        <h1 className="text-4xl text-primary pb-2 max-md:text-3xl">{name}</h1>
        {released ? (
          <h2 className="text-xl text-secondary">Release date: {released}</h2>
        ) : (
          <h2 className="text-xl">TBA</h2>
        )}
        {/* TODO: After backend is done these 2 divs will be implemented. */}
        <div className="flex flex-row items-center pt-2">
          <Image
            className="pr-2 cursor-pointer"
            alt="Add to favorite"
            src="/star-none.svg"
            width="30"
            height="30"
          />
          <p>(Add to favorite)</p>
        </div>
        {/* <div className="flex flex-row items-end">
                    <Image className='pr-2 cursor-pointer' alt="Remove from favorite" src="/star.svg" width="30" height="30" />
                    <p>(Remove from favorite)</p>
                </div> */}
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
            alt="Metacritic"
          />
          {playtime == 0 ? (
            <h3 className="text-sm">
              <strong>Playtime:</strong> ≈ No data yet
            </h3>
          ) : (
            <h3 className="text-sm">
              <strong>Playtime:</strong> ≈ {playtime} hours
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

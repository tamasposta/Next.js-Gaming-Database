import type { GameDetails } from "../../types/game-details.types";

export default function GameMainImages({
  background_image,
}: GameDetails) {
  return (
    <div className="pb-10">
      <img
        className="max-w-full h-auto rounded-t-md"
        src={background_image}
        alt="Game cover"
      />
    </div>
  );
}

import { GameDetails } from "../../types/game-details.types";

export default function GameMainImages({
  background_image,
  background_image_additional,
}: GameDetails) {
  return (
    <div className="flex flex-nowrap pb-10 gap-4 max-sm:flex-wrap">
      <div
        className="w-full lg:h-[400px] sm:h-[200px] max-sm:h-[300px] bg-cover bg-center rounded-t-md"
        style={{ backgroundImage: `url(${background_image})` }}
      ></div>
      <div
        className="w-full lg:h-[400px] sm:h-[200px] max-sm:h-[300px] bg-cover bg-center rounded-t-md"
        style={{
          backgroundImage: `url(${background_image_additional})`,
        }}
      ></div>
    </div>
  );
}

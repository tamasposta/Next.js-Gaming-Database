import { getGameDetails, getGameScreenshots } from "../../utils/requests";
import Gallery from "../../components/gamepage/gallery";
import GameMainImages from "../../components/gamepage/game-main-images";
import GameMainInfo from "../../components/gamepage/game-main-info";
import GameDetails from "../../components/gamepage/game-details";
import Rating from "../../components/gamepage/rating";
import RelatedGames from "../../components/gamepage/related-games";
import type { PageProps } from "../../types/page-props.types";

export default async function GameDetailsPage({ params }: PageProps) {
  const slug = params.slug || "stalker-2";
  const gameDetails = await getGameDetails(slug);
  const screenshots = await getGameScreenshots(slug);

  if (!gameDetails) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl">Game not found</h1>
        <p>Sorry, we couldn&apos;t load the game details.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10">
      <GameMainInfo
        name={gameDetails.name}
        released={gameDetails.released}
        metacritic={gameDetails.metacritic}
        game_time_to_beats={gameDetails.game_time_to_beats}
        platforms={[]}
        description={""}
      />
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="w-full md:w-1/2 lg:w-[30%]">
          <GameMainImages
            background_image={gameDetails.background_image}
            background_image_additional={gameDetails.background_image_additional}
            platforms={[]}
            description={""}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[70%]">
          <GameDetails
            description={gameDetails.description}
            platforms={gameDetails.platforms}
            website={gameDetails.website}
            genres={gameDetails.genres}
            companies={gameDetails.companies}
            videos={gameDetails.videos}
            collection={gameDetails.collection}
          />
        </div>
      </div>
      <Rating
        rating={gameDetails.rating}
        ratings={gameDetails.ratings}
        platforms={[]}
        description={""}
      />
      <Gallery images={screenshots} />
      <RelatedGames
        collection={gameDetails.collection}
        similarGames={gameDetails.similarGames}
        dlcsAndExpansions={gameDetails.dlcsAndExpansions}
      />
    </div>
  );
}

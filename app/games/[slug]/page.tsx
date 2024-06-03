import { getGameDetails } from "../../utils/requests";
import Gallery from "../../components/gamepage/gallery";
import GameMainImages from "../../components/gamepage/game-main-images";
import GameMainInfo from "../../components/gamepage/game-main-info";
import GameDetails from "../../components/gamepage/game-details";
import Rating from "../../components/gamepage/rating";
import type { PageProps } from "../../types/page-props.types";

export default async function GameDetailsPage({ params }: PageProps) {
  const gameDetails = await getGameDetails(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10">
      <GameMainInfo
        name={gameDetails.name}
        released={gameDetails.released}
        metacritic={gameDetails.metacritic}
        playtime={gameDetails.playtime}
        platforms={[]}
        description={""}
      />
      <GameMainImages
        background_image={gameDetails.background_image}
        background_image_additional={gameDetails.background_image_additional}
        platforms={[]}
        description={""}
      />
      <GameDetails
        description={gameDetails.description}
        platforms={gameDetails.platforms}
        website={gameDetails.website}
      />
      <Rating
        rating={gameDetails.rating}
        ratings={gameDetails.ratings}
        platforms={[]}
        description={""}
      />
      <Gallery slug={gameDetails.slug} />
    </div>
  );
}

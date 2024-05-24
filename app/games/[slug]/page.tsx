import { getGameDetails } from "../../utils/requests";
import Gallery from "../../components/gamepage/gallery";
import GameMainImages from "../../components/gamepage/game-main-images";
import GameMainInfo from "../../components/gamepage/game-main-info";
import GameDetails from "../../components/gamepage/game-details";
import Rating from "../../components/gamepage/rating";

export default async function GameDetailsPage({ params }: any) {
  const gameDetails = await getGameDetails(params.slug);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10">
      <GameMainInfo
        name={gameDetails.name}
        released={gameDetails.released}
        metacritic={gameDetails.metacritic}
        playtime={gameDetails.playtime}
      />
      <GameMainImages
        background_image={gameDetails.background_image}
        background_image_additional={gameDetails.background_image_additional}
      />
      <GameDetails
        description={gameDetails.description}
        platforms={gameDetails.platforms}
        website={gameDetails.website}
      />
      <Rating rating={gameDetails.rating} ratings={gameDetails.ratings} />
      <Gallery slug={gameDetails.slug} />
    </div>
  );
}

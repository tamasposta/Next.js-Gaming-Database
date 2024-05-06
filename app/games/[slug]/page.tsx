import { getGameDetails } from '../../utils/requests';
import Gallery from '../../components/gamepage/Gallery';
import GameMainImages from '../../components/gamepage/GameMainImages';
import GameMainInfo from '../../components/gamepage/GameMainInfo';
import GameDetails from '../../components/gamepage/GameDetails';
import { Game, GameDetailsPageProps } from '../../types/GameDetails.types';

export default async function GameDetailsPage({ params }) {

  const gameDetails = await getGameDetails(params.slug);

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10'>
      <GameMainInfo gameDetails={gameDetails} />
      <GameMainImages gameDetails={gameDetails} />
      <GameDetails gameDetails={gameDetails} />
      <Gallery slug={gameDetails.slug} />
    </div>
  )
}

// ITT SEM JÓK MÉG A TÍPUSOK
import { getGameDetails } from '../../utils/requests';
import Gallery from '../../components/gamepage/Gallery';
import GameMainImages from '../../components/gamepage/GameMainImages';
import GameMainInfo from '../../components/gamepage/GameMainInfo';
import GameDetails from '../../components/gamepage/GameDetails';
import Rating from '../../components/gamepage/Rating';

export default async function GameDetailsPage({ params }: any) {

  const gameDetails = await getGameDetails(params.slug);

  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10'>
      <GameMainInfo gameDetails={gameDetails} />
      <GameMainImages gameDetails={gameDetails} />
      <GameDetails gameDetails={gameDetails} />
      <Rating gameDetails={gameDetails} />
      <Gallery slug={gameDetails.slug} />
    </div>
  )
}
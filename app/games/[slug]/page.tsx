'use client'
import { getGameDetails } from '../../utils/requests';
import Gallery from '../../components/gamepage/Gallery';
import GameMainImages from '../../components/gamepage/GameMainImages';
import GameMainInfo from '../../components/gamepage/GameMainInfo';
import GameDetails from '../../components/gamepage/GameDetails';

export default async function GameDetailsPage({ params }) {

  const gameDetails = await getGameDetails(params.slug);

  return (
    <div className='p-20 max-md:p-5 max-md:py-10'>
      <GameMainInfo gameDetails={gameDetails} />
      <GameMainImages gameDetails={gameDetails} />
      <GameDetails gameDetails={gameDetails} />
      <Gallery slug={gameDetails.slug} />
    </div>
  )
}
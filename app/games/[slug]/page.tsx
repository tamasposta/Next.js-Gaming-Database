import { getTrendingGames } from '../../utils/requests';

export default async function GameDetailsPage({params}) {

  const gameDetails = await getTrendingGames(params.slug);

  return (
    <div>
      <p>{gameDetails.name}</p>
      <p>{params.slug}</p>
      <p>{params.name}</p>
    </div>
  )
}

//ez nem működik
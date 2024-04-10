import Card from "./components/Card";
import { getTrendingGames } from "./utils/requests";

export default async function HomePage() {

  const games = await getTrendingGames();

  return (
    <>
      <div className="flex flex-col items-center my-20 mx-10 max-sm:mx-0">
        <h1 className="text-2xl mb-10">Trending Games</h1>
        <div>
          <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
            {games.map(game => {
              return <Card game={game} />
            })}
          </div>
        </div>
        </div>
      </>
      );
}

import Card from "./components/Card";
import { getGames } from "./utils/requests";

export default async function HomePage() {

  const games = await getGames();

  return (
    <>
      <div className="flex flex-col items-center my-10 sm:my-20 mx-10 max-sm:mx-0">
        <h1 className="text-3xl text-primary mb-2">Trending Games</h1>
        <h2 className="text-xl text-secondary mb-10">Games in 2024</h2>
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

import Card from "./components/Card";
import { getGames } from "./utils/requests";
import { Game } from "./types/Games.types";

export default async function HomePage() {

  const games: Game[] = await getGames();

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10">
        <h1 className="text-3xl text-primary mb-2">Trending Games</h1>
        <h2 className="text-xl text-secondary mb-10">Popular games in 2024</h2>
        <div>
          <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-5 items-start auto-rows-fr">
            {games.map((game: Game) => {
              return <Card game={game} />
            })}
          </div>
        </div>
      </div>
    </>
  );
}

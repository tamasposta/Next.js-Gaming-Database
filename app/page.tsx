import Card from "./components/card";
import { getGames } from "./utils/requests";
import { Game } from "./types/games.types";

export const dynamic = "force-static";

export default async function HomePage() {
  const games: Game[] = await getGames();

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10">
        <h1 className="text-3xl text-primary mb-2">Trending Games</h1>
        <h2 className="text-xl text-secondary mb-10">Popular games in 2024</h2>
        <div>
          <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
            {games &&
              games.map(
                ({
                  id,
                  name,
                  background_image,
                  metacritic,
                  released,
                  slug,
                }: Game) => (
                  <Card
                    key={id}
                    id={id}
                    name={name}
                    background_image={background_image}
                    metacritic={metacritic}
                    released={released}
                    slug={slug}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

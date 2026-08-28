import Card from "./components/card";
import { getGames, getBannerGame } from "./utils/requests";
import { Game } from "./types/games.types";
import Banner from "./components/banner";
import Link from "next/link";

export default async function HomePage() {
  const [gamesData, bannerGame] = await Promise.all([
    getGames(),
    getBannerGame(),
  ]);

  const games: Game[] = gamesData ?? [];
  const currentYear = new Date().getUTCFullYear();
  const loadedYear =
    games.find((game) => /^\d{4}-\d{2}-\d{2}$/.test(game.released))?.released.slice(0, 4) ||
    String(currentYear);

  return (
    <>
      <Banner
        imageUrl={bannerGame?.imageUrl}
        title={bannerGame?.name}
        slug={bannerGame?.slug}
      />
      <div className="flex flex-col items-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 sm:my-20 max-sm:my-10 gap-8">
        <p className="text-center">
                    Welcome to Gaming Database, your ultimate destination for exploring the world of video games.
                    Stay up-to-date with the latest releases, read reviews, and find your next favorite game. Whether you're a casual gamer or a hardcore enthusiast, Gaming Database has something for everyone.
                </p>
        <div className="w-full flex flex-col gap-2 items-start">
        <h1 className="text-3xl text-primary">Trending Games</h1>
        <h2 className="text-xl border-b-2 border-neutral-content pb-4">Popular games in {loadedYear}</h2>
        </div>
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
        <Link
          href="/games"
          className="btn btn-outline btn-secondary btn-m mt-4"
        >
          See all games
        </Link>
      </div>
    </>
  );
}

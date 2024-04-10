import { platform } from "os";
import Card from "./components/Card";
import { getTrendingGames } from "./utils/requests";

export default async function HomePage() {

const games = await getTrendingGames();

  return (
    <>
      <div className="flex flex-col items-center my-10">
      <h1 className="text-2xl mb-10">Trending Games</h1>
        <Card game={games}/>
      </div>
    </>
  );
}

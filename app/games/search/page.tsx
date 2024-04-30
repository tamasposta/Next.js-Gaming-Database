import Card from '../../components/Card';
import { getSearchedGames } from '../../utils/requests';

async function SearchPage({ params }: any) {
  const searchText = params.search;
  const games = await getSearchedGames(searchText)

  return (
    <>
    <div className="flex flex-col items-center my-20 mx-10 max-sm:mx-0  max-md:p-5 max-md:py-10">
      <h1 className="text-3xl text-primary mb-10">Search Results</h1>
      <div>
        <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
          {games.map(game => {
            return <Card game={game} />
          })}
        </div>
      </div>
    </div>
  </>
  )
}

export default SearchPage
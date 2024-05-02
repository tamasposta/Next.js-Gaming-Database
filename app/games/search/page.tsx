import SearchResults from '../../components/SearchResults';
import { getSearchedGames } from '../../utils/requests';

async function SearchPage({ searchParams }: any) {
  const searchText = searchParams.query;
  const games = await getSearchedGames(searchText)

  return (
    <SearchResults searchText={searchText} games={games} />
  )
}

export default SearchPage
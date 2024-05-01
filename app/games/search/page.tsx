import SearchResults from '../../components/SearchResults';
import { getSearchedGames } from '../../utils/requests';

async function SearchPage({ searchParams }: any) {
  const searchText = searchParams.search;
  const games = await getSearchedGames(searchText)

  return (
    <SearchResults searchText={searchText} games={games}></SearchResults>
  )
}

export default SearchPage
import SearchResults from '../../components/SearchResults';
import { getSearchedGames } from '../../utils/requests';

type SearchPageProps = {
  searchParams: {
    query: string
  }
};

async function SearchPage({ searchParams }: SearchPageProps) {
  const searchText = searchParams.query;
  const games = await getSearchedGames(searchText)

  return (
    <SearchResults searchText={searchText} games={games} />
  )
}

export default SearchPage
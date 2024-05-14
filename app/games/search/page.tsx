import SearchResults from '../../components/SearchResults';
import { getSearchedGames } from '../../utils/requests';

type SearchPageProps = {
  searchParams: {
    query: string
  }
};

export default async function SearchPage({ searchParams }: SearchPageProps) {

  const games = await getSearchedGames(searchParams.query);

  return (
    <>
      {games && (<SearchResults games={games} searchText={searchParams.query} />)}
    </>
  )
}
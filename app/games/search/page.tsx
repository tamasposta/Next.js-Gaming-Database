import SearchResults from "../../components/search-results";
import { getSearchedGames } from "../../utils/requests";
import { SearchPageProps } from "../../types/search-page-props.types";

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const games = await getSearchedGames(searchParams.query);

  return (
    <>
      {games && <SearchResults games={games} searchText={searchParams.query} />}
    </>
  );
}

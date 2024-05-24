export type Game = {
  id: number;
  name: string;
  background_image: string;
  metacritic: number | null;
  released: string;
  slug: string;
};

export type SearchResultsProps = {
  games: Game[];
  searchText: string;
};

export type HandleSortingParams = {
  sortingFunction: (
    games: any[],
    order: string,
    setFilteredGames: Function,
    setOrder: Function,
    col: string
  ) => void;
  col: string;
};

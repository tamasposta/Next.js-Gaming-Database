import { SortingGame, SortingNum } from "../types/games.types";

export const sortingFunctions = {
  sorting: (
    games: SortingGame[],
    order: string,
    setFilteredGames: Function,
    setOrder: Function,
    col: string
  ) => {
    if (order === "ASC") {
      const sorted = [...games].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setFilteredGames(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...games].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setFilteredGames(sorted);
      setOrder("ASC");
    }
  },

  sortingNum: (
    games: SortingNum[],
    order: string,
    setFilteredGames: Function,
    setOrder: Function,
    col: string
  ) => {
    if (order === "ASC") {
      const sorted = [...games].sort((a, b) => a[col] - b[col]);
      setFilteredGames(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...games].sort((a, b) => b[col] - a[col]);
      setFilteredGames(sorted);
      setOrder("ASC");
    }
  },

  sortingDate: (
    games: SortingNum[],
    order: string,
    setFilteredGames: Function,
    setOrder: Function,
    col: string
  ) => {
    if (order === "ASC") {
      const sorted = [...games].sort((a, b) =>
        new Date(a[col]) > new Date(b[col]) ? 1 : -1
      );
      setFilteredGames(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...games].sort((a, b) =>
        new Date(a[col]) < new Date(b[col]) ? 1 : -1
      );
      setFilteredGames(sorted);
      setOrder("ASC");
    }
  },
};

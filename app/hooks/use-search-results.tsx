"use client";
import { useState, useEffect, useCallback } from "react";
import { Game, HandleSortingParams } from "../types/games.types";

export default function useSearchResults({ games, searchText }) {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [order, setOrder] = useState<string>("ASC");

  useEffect(() => {
    const filterGames = () => {
      const filtered = games.filter(({ name }: Game) =>
        name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredGames(filtered);
    };
    filterGames();
  }, [games, searchText]);

  const handleSorting = useCallback(
    ({ sortingFunction, col }: HandleSortingParams) => {
      sortingFunction(games, order, setFilteredGames, setOrder, col);
    },
    [games, order]
  );

  return { filteredGames, setFilteredGames, handleSorting };
}

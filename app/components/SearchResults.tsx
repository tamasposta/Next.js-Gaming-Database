'use client'
import { useCallback, useEffect, useState } from "react";
import Card from "./Card";
import { sortingFunctions } from "../utils/sorting";

export default function SearchResults({ games, searchText }: any) {
    const [filteredGames, setFilteredGames] = useState<any[]>(games);
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        const filterGames = () => {
            const filtered = games.filter((game: any) =>
                game.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredGames(filtered);
        };
        filterGames();
    }, [games, searchText]);

    const { sorting, sortingNum, sortingDate } = sortingFunctions;

    const handleSorting = useCallback((sortingFunction: Function, col: string) => {
        sortingFunction(games, order, setFilteredGames, setOrder, col);
    }, [games, order]);

    return (
        <div className="flex flex-col items-center my-10 sm:my-20 mx-10 max-sm:mx-0">
            <h1 className="text-3xl text-primary mb-2">Top Search Results for</h1>
            <h2 className="text-xl text-secondary mb-10" >"{searchText}"</h2>
            <h3>Sort by:</h3>
                <button onClick={() => setFilteredGames(games)} className="btn btn-neutral sm:btn-sm btn-xs pointer mt-2">
                    Default
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            <div className="flex flex-wrap py-5 gap-3 mx-5 ">
                <button onClick={() => handleSorting(sorting, "name")} className="btn btn-outline sm:btn-sm btn-xs pointer">
                    Name (A-Z)
                </button>
                <button onClick={() => handleSorting(sortingDate, "released")} className="btn btn-outline sm:btn-sm btn-xs pointer">
                    Release Date
                </button>
                <button onClick={() => handleSorting(sortingNum, "metacritic")} className="btn btn-outline sm:btn-sm btn-xs pointer">
                    Metacritic Score
                </button>
            </div>
            <div>
                <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr mx-10 max-sm:mx-0">
                    {filteredGames.map(game => {
                        return <Card key={game.id} game={game} />
                    })}
                </div>
            </div>
        </div>
    )
}
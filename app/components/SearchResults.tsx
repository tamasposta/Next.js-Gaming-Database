'use client'
import { useEffect, useState } from "react"
import Card from "./Card";

function SearchResults({ searchText, games }: any) {
    const [filteredGames, setFilteredGames] = useState(games);

    useEffect(() => {
        setFilteredGames(games)
    }, [games]);

    const filterGames = (filter: any) => {
        let sortedGames = [];
        switch (filter) {
            case "released":
                sortedGames = [...games].sort((a, b) => new Date(b.released) - new Date(a.released));
                break;
            case "metacritic":
                sortedGames = [...games].sort((a, b) => b.metacritic - a.metacritic);
                break;
            case "rating":
                sortedGames = [...games].sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }
        setFilteredGames(sortedGames)
    }

    return (
        <div className="flex flex-col items-center my-10 sm:my-20 mx-10 max-sm:mx-0">
            <h1 className="text-3xl text-primary mb-2">Top Search Results for</h1>
            <h2 className="text-xl text-secondary mb-10" >"{searchText}"</h2>
            <select onChange={(e) => filterGames(e.target.value)} className="select select-accent w-full max-w-xs mb-10">
                <option disabled selected>Sort By</option>
                <option value="released">Release date</option>
                <option value="metacritic">Metacritic score</option>
                <option value="rating">Popularity</option>
            </select>
            <div>
                <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
                    {filteredGames.map(game => {
                        return <Card key={game.id} game={game} />
                    })}
                </div>
            </div>
        </div>

    )
}

export default SearchResults

// ITT SEM JÓK A TÍPUSOK
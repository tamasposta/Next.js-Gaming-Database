import Card from "./Card";

export default function SearchResults({ games, searchText }: any) {
    // const [filteredGames, setFilteredGames] = useState<any[]>([]);
    // console.log(filteredGames)

    // const filterGames = useCallback((filter: any) => {
    //     console.log(filter)
    //     let sortedGames = [];
    //     switch (filter) {
    //         case "released":
    //             sortedGames = [...games].sort((a, b) => new Date(b.released) - new Date(a.released));
    //             setFilteredGames(sortedGames);
    //         case "metacritic":
    //             sortedGames = [...games].sort((a, b) => b.metacritic - a.metacritic);
    //             setFilteredGames(sortedGames);
    //         case "rating":
    //             sortedGames = [...games].sort((a, b) => b.rating - a.rating);
    //             setFilteredGames(sortedGames);
    //         default:
    //             setFilteredGames(games);
    //     }
    // }, []);

    // useCallback függvények, useMemo változók optimalizálására

    return (
        <div className="flex flex-col items-center my-10 sm:my-20 mx-10 max-sm:mx-0">
            <h1 className="text-3xl text-primary mb-2">Top Search Results for</h1>
            <h2 className="text-xl text-secondary mb-10" >"{searchText}"</h2>
            {/* <select onChange={(e) => filterGames(e.target.value)} className="select select-accent w-full max-w-xs mb-10">
                <option disabled value="">Sort By</option>
                <option value="released">Release date</option>
                <option value="metacritic">Metacritic score</option>
                <option value="rating">Popularity</option>
            </select> */}
            <div>
                <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
                    {games.map(game => {
                        return <Card key={game.id} game={game} />
                    })}
                </div>
            </div>
        </div>

    )
}
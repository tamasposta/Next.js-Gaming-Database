export default function GameMainInfo({gameDetails}) {
    return (
        <div className='flex flex-row pb-10 justify-between flex-wrap gap-2'>
            <div>
                <h1 className='text-4xl text-primary pb-2 max-md:text-3xl'>{gameDetails.name}</h1>
                {gameDetails.released
                    ? (<h2 className='text-xl text-secondary'>Release date: {gameDetails.released}</h2>)
                    : (<h2 className='text-xl'>TBA</h2>)
                }
            </div>
            <div>
                <div className='flex flex-row pb-2'>
                    <img className="h-5 mr-2" src="/images/Metacritic.svg" alt="Metacritic" />
                    <h3 className="text-sm"><strong>Metacritic score:</strong> {gameDetails.metacritic}</h3>
                </div>
                <div className='flex flex-row pb-2'>
                    <img className="h-5 mr-2" src="/images/clock.svg" alt="Metacritic" />
                    <h3><strong>Playtime:</strong> ≈ {gameDetails.playtime} hours</h3>
                </div>
            </div>
        </div>

    )
}
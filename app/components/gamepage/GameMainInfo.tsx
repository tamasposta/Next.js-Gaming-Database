import Image from "next/image"
import { GameDetailsPageProps } from "../../types/GameDetails.types"

export default function GameMainInfo({gameDetails}: GameDetailsPageProps) {
    return (
        <div className='flex flex-row pb-10 justify-between flex-wrap gap-2'>
            <div>
                <h1 className='text-4xl text-primary pb-2 max-md:text-3xl'>{gameDetails.name}</h1>
                {gameDetails.released
                    ? (<h2 className='text-xl text-secondary'>Release date: {gameDetails.released}</h2>)
                    : (<h2 className='text-xl'>TBA</h2>)
                }
                <div className="flex flex-row items-center pt-2">
                    <Image className='pr-2 cursor-pointer' alt="Add to favorite" src="/star-none.svg" width="30" height="30" />
                    <p>(Add to favorite)</p>
                </div>
                {/* <div className="flex flex-row items-end">
                    <Image className='pr-2 cursor-pointer' alt="Remove from favorite" src="/star.svg" width="30" height="30" />
                    <p>(Remove from favorite)</p>
                </div> */}
            </div>
            <div>
                <div className='flex flex-row pb-2'>
                    <Image className="h-5 mr-2" src="/images/Metacritic.svg" width="20" height="20" alt="Metacritic" />
                    {gameDetails.metacritic == null
                        ? <h3 className="text-sm"><strong>Metacritic score:</strong> N/A</h3>
                        : <h3 className="text-sm"><strong>Metacritic score:</strong> {gameDetails.metacritic}</h3>

                    }
                </div>
                <div className='flex flex-row pb-2'>
                    <Image className="h-5 mr-2" src="/images/clock.svg" width="20" height="20" alt="Metacritic" />
                    {gameDetails.playtime == 0
                        ? <h3 className="text-sm"><strong>Playtime:</strong> ≈ No data yet</h3>
                        : <h3 className="text-sm"><strong>Playtime:</strong> ≈ {gameDetails.playtime} hours</h3>
                    }
                </div>
            </div>
        </div>

    )
}
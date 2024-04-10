import Link from 'next/link';
import { getTrendingGames } from '../utils/requests';

export default async function Card({ game }) {

    const games = await getTrendingGames();

    return (
        <div>
            <Link href={"/games/" + game.slug}>
                <div className="grid grid-cols:1 sm:grid-cols:2 md:grid-cols-3 lg:grid-cols-4 auto-cols-max gap-6 items-start auto-rows-fr">
                    {games.map(game => {
                        return <div className="bg-neutral rounded-md hover:outline hover:outline-2">
                            <div className="w-full h-[180px] bg-cover bg-center rounded-t-md" style={{ backgroundImage: `url(${game.background_image})` }}></div>
                            <div className='flex flex-col pb-3 items-center gap-3'>
                                <div className='flex justify-center p-2 w-full bg-base-content'>
                                    <h2 className="text-lg font-semibold text-center text-neutral">{game.name}</h2>
                                </div>
                                <div className='flex flex-row'>
                                    <img className="w-[20px] mr-2" src="/images/Metacritic.svg" alt="Metacritic" />
                                    <h3 className="text-sm">Metacritic score: {game.metacritic}</h3>
                                </div>
                                <h4 className="text-sm">Release date: {game.released}</h4>
                                <p>{game.slug}</p>
                                <button className='btn btn-outline btn-primary btn-sm'>See details</button>
                            </div>
                        </div>
                    })}
                </div>
            </Link >
        </div >
    )
}
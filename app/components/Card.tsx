import Link from 'next/link';

export default async function Card({ game }) {

    return (
        <div className="bg-neutral rounded-md hover:outline hover:outline-2">
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
                <Link href={`/games/${game.slug}`}>
                    <button className='btn btn-outline btn-primary btn-sm'>See details</button>
                </Link>
            </div>
        </div>
    )
}
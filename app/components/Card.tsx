'use client'
import Link from 'next/link';
import { GamesProps } from '../types/Games.types';
import Image from 'next/image';

export default function Card({ game }: GamesProps) {

    return (
        <div className="bg-neutral rounded-md hover:outline hover:outline-2 hover:outline-neutral-content outline outline-neutral sm:w-[280px] h-full">
            <div className="w-full h-[180px] max-sm:h-[220px] bg-cover bg-center rounded-t-md" style={{ backgroundImage: `url(${game.background_image})` }}></div>
            <div className='flex flex-col pb-3 items-center gap-3'>
                <div className='flex justify-center p-2 w-full bg-base-200 max-sm:min-w-[90vw]'>
                    <h2
                        className="text-base font-semibold text-center"
                        title={game.name}
                    >
                        {game.name.length > 24
                            ? game.name.slice(0, 24) + "..."
                            : game.name
                        }
                    </h2>
                </div>
                <div className='flex flex-row'>
                    <Image className="w-[20px] mr-2" src="/images/Metacritic.svg" width="20" height="20" alt="Metacritic" />
                    {game.metacritic == null
                        ? <h3 className="text-sm">Metacritic score: N/A</h3>
                        : <h3 className="text-sm">Metacritic score: {game.metacritic}</h3>
                    }
                </div>
                <h4 className="text-sm">Release date: {game.released}</h4>
                <Link href={`/games/${game.slug}`}>
                    <button className='btn btn-outline btn-primary btn-sm'>See details</button>
                </Link>
            </div>
        </div>
    )
}
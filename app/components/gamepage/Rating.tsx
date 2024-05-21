import { GameDetailsPageProps } from '../../types/GameDetails.types'

type RatingColors = {
    exceptional: string;
    recommended: string;
    meh: string;
    skip: string;
}

export default function Rating({ gameDetails }: GameDetailsPageProps) {

    const ratingColors = {
        exceptional: '#00cdb8',
        recommended: '#7480ff',
        meh: '#ffbe00',
        skip: '#ff5861',
    };

    return (
        <div className='py-10'>
            <h3 className='text-2xl text-secondary'>Rating: <span className='text-xl text-primary'>{gameDetails.rating}/5</span></h3>
            {gameDetails.ratings.map((rating: any, index: number) => {
                const color = ratingColors[rating.title] || 'white';
                return <div className='pt-3' key={index}>
                    <p><span style={{ color }}>{(rating.title).toUpperCase()}: </span><strong>{rating.count}</strong></p>
                </div>
            })}
            <div className='flex flex-row flex-nowrap mt-2'>
            {gameDetails.ratings.map((rating: any, index: number) => {
                const background = ratingColors[rating.title] || 'white';
                return <div key={index} style={{ width: `${rating.percent}%` }}>
                    <button className='btn btn-primary border-0 rounded-none btn-sm text-xs w-full' style={{ background }}>{Math.round(rating.percent)}%</button>
                </div>
            })}
            </div>
        </div>
    )
}

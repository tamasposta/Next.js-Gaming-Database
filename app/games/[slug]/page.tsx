import { getGameDetails } from '../../utils/requests';
import cheerio from 'cheerio';

export default async function GameDetailsPage({ params }) {

  const gameDetails = await getGameDetails(params.slug);

  const htmlString = gameDetails.description;
  const $ = cheerio.load(htmlString);
  $('p:contains("Español")').remove();
  const modifiedHtmlString = $('body').html();

  console.log('System req:', gameDetails.platforms[0].requirements.minimum)

  return (
    <div className='p-20 max-md:p-5 max-md:py-10'>
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
      <div className='flex flex-nowrap pb-10 gap-4 max-sm:flex-wrap'>
        <div className='w-full sm:w-1/2'>
          <img className='w-full' src={gameDetails.background_image} alt={gameDetails.name} />
        </div>
        <div className='w-full sm:w-1/2'>
        <img className='w-full' src={gameDetails.background_image_additional} alt={gameDetails.name} />
        </div>
      </div>
      <div className='text-justify' dangerouslySetInnerHTML={{__html: modifiedHtmlString}} />
      <div className='grid grid-cols-12 max-lg:grid-cols-8 max-md:grid-cols-4 pt-10'>{gameDetails.platforms.map(platform => {
        const platformIcon = `/images/platform-icons/${platform.platform.slug}.svg`;
        return <div>
          <img className="w-14" src={platformIcon} alt={platform.platform.name} />
        </div>
      })}
      </div>
      <div className='pt-10'>
        <h2 className='text-2xl text-secondary'>System requirements: </h2>
        <p className='text-justify'>{gameDetails.platforms[0].requirements.minimum}</p>
      </div>
    </div>
  )
}
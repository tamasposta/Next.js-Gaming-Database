import cheerio from 'cheerio';
import { GameDetailsPageProps } from '../../types/GameDetails.types';
import Image from 'next/image';

// type PlatformTypes = {
//     slug: string;
//     name: string;
// }

// type SystemRequirements = {
//     minimum: string;
//     recommended: string;
// };

// type Platform = {
//     id: string;
//     platform: PlatformTypes[];
//     requirements: SystemRequirements | null;
// };

// type GameDetails = {
//     description: string;
//     platforms: Platform[];
//     website: string;
// };

export default function GameDescription({ gameDetails }: GameDetailsPageProps) {
    const htmlString = gameDetails.description;
    const $ = cheerio.load(htmlString);
    $('p:contains("Español")').remove();
    const modifiedGameDescription = $('body').html();

    const isPlatformPc = gameDetails.platforms && gameDetails.platforms.find((platform) => platform.name = "PC");
    const pcPlatform = gameDetails.platforms.find(platform => platform.platform.name === "PC");
    const reqMinimum = pcPlatform?.requirements?.minimum;
    const reqRecommended = pcPlatform?.requirements?.recommended;

    return (
        <div className='flex flex-nowrap pb-10 gap-4 max-md:flex-wrap'>
            <div className='text-justify md:w-1/2' dangerouslySetInnerHTML={{ __html: modifiedGameDescription }}></div>
            <div className='md:w-1/2'>
                <h2 className='text-2xl text-secondary'>Platforms: </h2>
                <div className='grid grid-cols-6 max-lg:grid-cols-8 max-md:grid-cols-3 pt-5'>
                    {gameDetails.platforms.map((platform: any) => {
                        const platformIcon = `/images/platform-icons/${platform.platform.slug}.svg`;
                        return <div key={platform.id}>
                            <Image
                                className="w-14"
                                src={platformIcon}
                                alt={platform.platform.name}
                                title={platform.platform.name}
                                width="200"
                                height="200"
                            />
                        </div>
                    })}
                </div>
                <div>
                    <h2 className='text-2xl text-secondary pt-10'>System requirements: </h2>
                    {isPlatformPc
                        ? (
                            <>
                                {!reqMinimum && !reqRecommended && <div>No system requirements data.</div>}
                                {reqMinimum && <div className='text-justify'>{reqMinimum}</div>}
                                {reqRecommended && <div className='text-justify pt-5'>{reqRecommended}</div>}
                            </>
                        )
                        : (
                            <div>No system requirements data.</div>
                        )}
                    {gameDetails.website.length > 0 && (
                        <div className='pt-10'>
                            <h3 className='text-2xl text-secondary'>Website:</h3>
                            <a className='underline' href={gameDetails.website} target="_blank">{gameDetails.website}</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

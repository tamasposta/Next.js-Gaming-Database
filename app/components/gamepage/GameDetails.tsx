import cheerio from 'cheerio';

export default function GameDescription({ gameDetails }) {
    const htmlString = gameDetails.description;
    const $ = cheerio.load(htmlString);
    $('p:contains("Español")').remove();
    const modifiedGameDescription = $('body').html();

    const isPlatformPc = gameDetails.platforms && gameDetails.platforms.find((platform: any) => platform.name = "PC");
    const reqMinimum = gameDetails.platforms.find((platform: any) => platform.name === "PC").requirements.minimum;
    const reqRecommended = gameDetails.platforms.find((platform: any) => platform.name === "PC").requirements.recommended;

    return (
        <div className='flex flex-nowrap pb-10 gap-4 max-md:flex-wrap'>
            <div className='text-justify md:w-1/2' dangerouslySetInnerHTML={{ __html: modifiedGameDescription }} />
            <div className='md:w-1/2'>
                <h2 className='text-2xl text-secondary'>Platforms: </h2>
                <div className='grid grid-cols-6 max-lg:grid-cols-8 max-md:grid-cols-3 pt-5'>{gameDetails.platforms.map((platform: any) => {
                    const platformIcon = `/images/platform-icons/${platform.platform.slug}.svg`;
                    return <div>
                        <img
                            className="w-14"
                            src={platformIcon}
                            alt={platform.platform.name}
                            title={platform.platform.name}
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
                </div>
                {gameDetails.website.length > 0 && (
                    <div className='pt-10'>
                        <h3 className='text-2xl text-secondary'>Website:</h3>
                        <a className='underline' href={gameDetails.website} target="_blank">{gameDetails.website}</a>
                    </div>
                )}
            </div>
        </div>
    )
}

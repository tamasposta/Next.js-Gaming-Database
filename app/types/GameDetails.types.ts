type Platform = {
    id: number;
    slug: string;
    name: string;
}

type Requirements = {
    minimum: string;
    recommended: string;
}

type Rating = {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export type Game = {
    name?: string,
    slug: string;
    metacritic?: number,
    released?: string,
    playtime?: number,
    description?: string;
    website?: string | undefined;
    background_image?: string,
    background_image_additional?: string,
    platforms?: {
        name: string | undefined;
        platform: Platform | undefined;
        requirements: Requirements | undefined;
    }[] | undefined;
    ratings?: Rating[] | undefined;

}

export type GameDetailsPageProps = {
    gameDetails: Game,
}
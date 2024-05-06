type Platform = {
    id: number;
    slug: string;
    name: string;
}

type Requirements = {
    minimum: string;
    recommended: string;
}

export type Game = {
    name?: string,
    slug?: string;
    metacritic?: number,
    released?: string,
    playtime?: number,
    description?: string;
    website?: string;
    background_image?: string,
    background_image_additional?: string,
    platforms?: {
        name: string;
        platform: Platform;
        requirements: Requirements;
    }[];
}

export type GameDetailsPageProps = {
    gameDetails: Game
}
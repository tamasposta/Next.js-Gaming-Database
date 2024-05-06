export type Game = {
    name: string,
    background_image: string,
    metacritic: number,
    released: string,
    slug: string
}

export type GamesProps = {
    game: Game,
}
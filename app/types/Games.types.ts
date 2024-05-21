export type Game = {
    id: number,
    name: string,
    background_image: string,
    metacritic: number | null,
    released: string,
    slug: string
}

export type GamesProps = {
    game: Game,
}
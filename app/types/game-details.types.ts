type Platform = {
  id: number;
  slug: string;
  name: string;
};

type Requirements = {
  minimum: string;
  recommended: string;
};

export type Rating = {
  id?: number;
  title?: string;
  count?: number;
  percent?: number | undefined;
};

export type Game = {
  name?: string;
  slug?: string;
  metacritic?: number;
  released?: string;
  playtime?: number;
  description?: string;
  website?: string | undefined;
  background_image?: string;
  background_image_additional?: string;
  platforms?:
    | {
        name: string | undefined;
        platform: Platform | undefined;
        requirements: Requirements | undefined;
      }[]
    | undefined;
  ratings?: Rating[] | undefined;
  rating?: number;
};

export type GameDetailsPageProps = {
  gameDetails: Game;
};

export type RatingColors = {
  exceptional: string;
  recommended: string;
  meh: string;
  skip: string;
};

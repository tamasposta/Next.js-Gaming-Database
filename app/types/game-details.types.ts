export type Platform = {
  id: number;
  slug: string;
  name: string;
};

export type Platforms = {
  name?: string;
  platform?: Platform;
  requirements?: Requirements;
};

type Requirements = {
  minimum: string;
  recommended: string;
};

export type Rating = {
  id?: number;
  title?: string;
  count?: number;
  percent?: number;
};

export type GameDetails = {
  name?: string;
  slug?: string;
  metacritic?: number;
  released?: string;
  playtime?: number;
  description?: string;
  website?: string;
  background_image?: string;
  background_image_additional?: string;
  platforms: Platforms[];
  ratings?: Rating[];
  rating?: number;
};

export type GameDetailsPageProps = {
  gameDetails: GameDetails;
};

export type RatingColors = {
  exceptional: string;
  recommended: string;
  meh: string;
  skip: string;
};

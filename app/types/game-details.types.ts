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

export type Requirements = {
  minimum: string;
  recommended: string;
};

export type Rating = {
  id?: number;
  title: string;
  count?: number;
  percent: number;
};

export type GameDetails = {
  name?: string;
  slug?: string;
  metacritic?: number | null;
  released?: string;
  playtime?: number;
  description?: string | Buffer;
  website?: string;
  background_image?: string;
  background_image_additional?: string;
  platforms: Platforms[];
  ratings?: Rating[];
  rating?: number;
};

export type Gallery = {
  images: {
    image: string;
    original: string;
    thumbnail: string;
  }[] | null;
};

export type GameDetailsPageProps = {
  gameDetails: GameDetails;
};

export type RatingColors = {
  exceptional: string;
  recommended: string;
  meh: string;
  skip: string;
  [key: string]: string | undefined;
};

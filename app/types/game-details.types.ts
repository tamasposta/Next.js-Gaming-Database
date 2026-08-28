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

export type Genre = {
  id: number;
  name: string;
  slug: string;
};

export type Company = {
  id: number;
  name: string;
  isDeveloper: boolean;
  isPublisher: boolean;
  website?: string;
};

export type Video = {
  id: number;
  name?: string;
  videoId: string;
};

export type RelatedGame = {
  id: number;
  name: string;
  slug: string;
  coverImage?: string;
};

export type Collection = {
  name: string;
  games: RelatedGame[];
};

export type GameDetails = {
  name?: string;
  slug?: string;
  metacritic?: number | null;
  released?: string;
  game_time_to_beats?: number | null;
  description?: string | Buffer;
  website?: string;
  background_image?: string;
  background_image_additional?: string;
  platforms: Platforms[];
  ratings?: Rating[];
  rating?: number;
  genres?: Genre[];
  companies?: Company[];
  videos?: Video[];
  collection?: Collection | null;
  similarGames?: RelatedGame[];
  dlcsAndExpansions?: RelatedGame[];
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

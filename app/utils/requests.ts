import "server-only";

import { cache } from "react";

const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
const IGDB_CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET;
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const IGDB_BASE_URL = "https://api.igdb.com/v4";

type IgdbImage = {
  image_id?: string;
  url?: string;
};

type IgdbPlatform = {
  id: number;
  name: string;
  slug: string;
};

type IgdbWebsite = {
  url?: string;
};

type IgdbGenre = {
  id: number;
  name: string;
  slug: string;
};

type IgdbVideo = {
  id: number;
  name?: string;
  video_id: string;
};

type IgdbCompany = {
  id: number;
  name: string;
  websites?: IgdbWebsite[];
};

type IgdbInvolvedCompany = {
  id: number;
  company?: IgdbCompany;
  developer?: boolean;
  publisher?: boolean;
};

type IgdbRelatedGame = {
  id: number;
  name: string;
  slug: string;
  cover?: IgdbImage;
};

type IgdbCollection = {
  id: number;
  name: string;
  games?: IgdbRelatedGame[];
};

type IgdbTimeToBeat = {
  normally?: number;
};

type IgdbGame = {
  id: number;
  name: string;
  slug: string;
  total_rating?: number;
  total_rating_count?: number;
  first_release_date?: number;
  summary?: string;
  cover?: IgdbImage;
  artworks?: IgdbImage[];
  screenshots?: IgdbImage[];
  platforms?: IgdbPlatform[];
  websites?: IgdbWebsite[];
  genres?: IgdbGenre[];
  videos?: IgdbVideo[];
  involved_companies?: IgdbInvolvedCompany[];
  collection?: IgdbCollection;
  similar_games?: IgdbRelatedGame[];
  dlcs?: IgdbRelatedGame[];
  expansions?: IgdbRelatedGame[];
  remakes?: IgdbRelatedGame[];
  remasters?: IgdbRelatedGame[];
  game_time_to_beats?: IgdbTimeToBeat;
};

type IgdbTokenResponse = {
  access_token: string;
};

const escapeQuery = (value: string) => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const toIsoDate = (timestamp?: number) => {
  if (!timestamp) {
    return "TBA";
  }

  return new Date(timestamp * 1000).toISOString().split("T")[0];
};

const toFivePointRating = (rating?: number) => {
  if (!rating) {
    return 0;
  }

  return Number((rating / 20).toFixed(1));
};

const buildImageUrl = (imageId?: string, size = "cover_big_2x") => {
  if (!imageId) {
    return "";
  }

  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
};

const getYearUnixRange = (year: number) => {
  const start = Math.floor(Date.UTC(year, 0, 1) / 1000);
  const end = Math.floor(Date.UTC(year + 1, 0, 1) / 1000);

  return { start, end };
};

const getGamesForYear = async (year: number) => {
  const { start, end } = getYearUnixRange(year);

  return igdbRequest<IgdbGame>(
    "games",
    [
      "fields name,slug,cover.image_id,total_rating,total_rating_count,first_release_date;",
      `where version_parent = null & cover != null & first_release_date >= ${start} & first_release_date < ${end};`,
      "sort total_rating_count desc;",
      "limit 8;",
    ].join(" ")
  );
};

const mapPlatformSlug = (platform?: IgdbPlatform) => {
  const name = platform?.name?.toLowerCase() || "";
  const slug = platform?.slug?.toLowerCase() || "";

  if (name.includes("playstation vita")) return "ps-vita";
  if (name.includes("playstation 5")) return "playstation5";
  if (name.includes("playstation 4")) return "playstation4";
  if (name.includes("playstation 3")) return "playstation3";
  if (name.includes("playstation 2")) return "playstation2";
  if (name.includes("playstation")) return "playstation";
  if (name.includes("xbox series")) return "xbox-series-x";
  if (name.includes("xbox one")) return "xbox-one";
  if (name.includes("xbox 360")) return "xbox360";
  if (name.includes("xbox") || slug.includes("xbox")) return "xbox";
  if (name.includes("nintendo switch")) return "nintendo-switch";
  if (name.includes("nintendo")) return "nintendo";
  if (name.includes("android")) return "android";
  if (name.includes("ios") || name.includes("iphone") || name.includes("ipad")) return "ios";
  if (name.includes("linux")) return "linux";
  if (name.includes("mac") || slug === "mac") return "macOS";
  if (name.includes("web") || slug.includes("browser")) return "web";
  if (name.includes("pc") || name.includes("windows") || slug === "win") return "pc";

  return platform?.slug || platform?.name || "unknown-platform";
};

const mapGame = (game: IgdbGame) => ({
  id: game.id,
  name: game.name,
  slug: game.slug,
  background_image: buildImageUrl(game.cover?.image_id, "cover_big_2x"),
  metacritic: game.total_rating ? Math.round(game.total_rating) : null,
  released: toIsoDate(game.first_release_date),
});

const mapGameDetails = (game: IgdbGame, game_time_to_beats: number = 0) => {
  const coverImage =
    buildImageUrl(game.cover?.image_id, "cover_big_2x");

  const genres =
    game.genres?.map((g) => ({
      id: g.id,
      name: g.name,
      slug: g.slug,
    })) || [];

  const companies =
    game.involved_companies
      ?.filter((ic) => ic.company?.name)
      .map((ic) => ({
        id: ic.company!.id,
        name: ic.company!.name,
        isDeveloper: !!ic.developer,
        isPublisher: !!ic.publisher,
        website: ic.company!.websites?.find(({ url }) => !!url)?.url || "",
      })) || [];

  const videos =
    game.videos
      ?.filter((v) => v.video_id)
      .map((v) => ({
        id: v.id,
        name: v.name,
        videoId: v.video_id,
      })) || [];

  const collection = game.collection
    ? {
        name: game.collection.name,
        games:
          game.collection.games
            ?.filter((g) => g.slug && g.slug !== game.slug)
            .map((g) => ({
              id: g.id,
              name: g.name,
              slug: g.slug,
              coverImage: buildImageUrl(g.cover?.image_id, "cover_big_2x"),
            })) || [],
      }
    : null;

  const similarGames =
    game.similar_games
      ?.filter((g) => g.slug && g.slug !== game.slug)
      .map((g) => ({
        id: g.id,
        name: g.name,
        slug: g.slug,
        coverImage: buildImageUrl(g.cover?.image_id, "cover_big_2x"),
      })) || [];

  const dlcsAndExpansionsMap = new Map<number, { id: number; name: string; slug: string; coverImage: string }>();
  [
    ...(game.dlcs || []),
    ...(game.expansions || []),
    ...(game.remakes || []),
    ...(game.remasters || []),
  ].forEach((g) => {
    if (g.slug && g.slug !== game.slug && !dlcsAndExpansionsMap.has(g.id)) {
      dlcsAndExpansionsMap.set(g.id, {
        id: g.id,
        name: g.name,
        slug: g.slug,
        coverImage: buildImageUrl(g.cover?.image_id, "cover_big_2x"),
      });
    }
  });

  return {
    name: game.name,
    slug: game.slug,
    metacritic: game.total_rating ? Math.round(game.total_rating) : null,
    released: toIsoDate(game.first_release_date),
    game_time_to_beats,
    description: game.summary || "No description available.",
    website: game.websites?.find(({ url }) => !!url)?.url || "",
    background_image: coverImage,
    background_image_additional: "",
    platforms:
      game.platforms?.map((platform) => ({
        platform: {
          id: platform.id,
          name: platform.name,
          slug: mapPlatformSlug(platform),
        },
      })) || [],
    ratings: undefined,
    rating: toFivePointRating(game.total_rating),
    genres,
    companies,
    videos,
    collection,
    similarGames,
    dlcsAndExpansions: Array.from(dlcsAndExpansionsMap.values()),
  };
};

const mapScreenshots = (screenshots?: IgdbImage[]) =>
  screenshots?.map(({ image_id }) => {
    const original = buildImageUrl(image_id, "screenshot_huge");
    return {
      image: original,
      original,
      thumbnail: buildImageUrl(image_id, "screenshot_med"),
    };
  }) || null;

const getAccessToken = cache(async () => {
  if (!IGDB_CLIENT_ID || !IGDB_CLIENT_SECRET) {
    console.error(
      "IGDB credentials are missing. Set IGDB_CLIENT_ID and IGDB_CLIENT_SECRET."
    );
    return null;
  }

  const query = new URLSearchParams({
    client_id: IGDB_CLIENT_ID,
    client_secret: IGDB_CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  const res = await fetch(`${TWITCH_TOKEN_URL}?${query.toString()}`, {
    method: "POST",
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    console.error(`Twitch token request failed (${res.status}).`);
    return null;
  }

  const data: IgdbTokenResponse = await res.json();
  return data.access_token;
});

const igdbRequest = async <T>(endpoint: string, query: string): Promise<T[] | null> => {
  const token = await getAccessToken();

  if (!token || !IGDB_CLIENT_ID) {
    return null;
  }

  const res = await fetch(`${IGDB_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": IGDB_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "text/plain",
    },
    body: query,
    next: { revalidate: 60 * 30 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`IGDB request failed (${res.status}):`, errorText);
    return null;
  }

  return (await res.json()) as T[];
};

export const getGames = async () => {
  try {
    const currentYear = new Date().getUTCFullYear();

    for (let offset = 0; offset <= 5; offset++) {
      const year = currentYear - offset;
      const data = await getGamesForYear(year);

      if (data?.length) {
        return data.map(mapGame);
      }
    }

    // Final fallback to avoid an empty homepage if recent-year windows return no results.
    const fallbackData = await igdbRequest<IgdbGame>(
      "games",
      [
        "fields name,slug,cover.image_id,total_rating,total_rating_count,first_release_date;",
        "where version_parent = null & cover != null;",
        "sort total_rating_count desc;",
        "limit 24;",
      ].join(" ")
    );

    return fallbackData?.map(mapGame) ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSearchedGames = async (query: string) => {
  try {
    const data = await igdbRequest<IgdbGame>(
      "games",
      [
        `search "${escapeQuery(query)}";`,
        "fields name,slug,cover.image_id,total_rating,total_rating_count,first_release_date;",
        "where version_parent = null & cover != null;",
        "limit 36;",
      ].join(" ")
    );
    return data?.map(mapGame) ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGameDetails = async (slug: string) => {
  try {
    const data = await igdbRequest<IgdbGame>(
      "games",
      [
        "fields name,slug,total_rating,total_rating_count,first_release_date,summary,websites.url,cover.image_id,cover.url,platforms.name,platforms.slug,genres.name,genres.slug,videos.video_id,videos.name,involved_companies.developer,involved_companies.publisher,involved_companies.company.name,involved_companies.company.websites.url,collection.name,collection.games.name,collection.games.slug,collection.games.cover.image_id,similar_games.name,similar_games.slug,similar_games.cover.image_id,dlcs.name,dlcs.slug,dlcs.cover.image_id,expansions.name,expansions.slug,expansions.cover.image_id,remakes.name,remakes.slug,remakes.cover.image_id,remasters.name,remasters.slug,remasters.cover.image_id;",
        `where slug = "${escapeQuery(slug)}";`,
        "limit 1;",
      ].join(" ")
    );

    if (!data?.length) {
      return null;
    }

    const game = data[0];
    let beatsSeconds = 0;

    try {
      const beatData = await igdbRequest<IgdbTimeToBeat>(
        "game_time_to_beats",
        `fields normally; where game_id = ${game.id}; limit 1;`
      );
      if (beatData?.length && beatData[0].normally) {
        beatsSeconds = beatData[0].normally;
      }
    } catch (e) {
      console.error("Error fetching game_time_to_beats:", e);
    }

    const timeToBeats = beatsSeconds > 0 ? Math.round(beatsSeconds / 3600) : 0;

    return mapGameDetails(game, timeToBeats);
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

export const getBannerGame = async () => {
  try {
    const currentYear = new Date().getUTCFullYear();
    const { start } = getYearUnixRange(currentYear - 1);

    const data = await igdbRequest<IgdbGame>(
      "games",
      [
        "fields name,slug,screenshots.image_id,artworks.image_id,cover.image_id;",
        `where version_parent = null & first_release_date >= ${start} & (screenshots != null | artworks != null);`,
        "sort total_rating_count desc;",
        "limit 1;",
      ].join(" ")
    );

    if (!data?.length) {
      return null;
    }

    const game = data[0];
    const imageId =
      game.screenshots?.[0]?.image_id ||
      game.artworks?.[0]?.image_id ||
      game.cover?.image_id;

    if (!imageId) {
      return null;
    }

    return {
      name: game.name,
      slug: game.slug,
      imageUrl: buildImageUrl(imageId, "screenshot_huge_2x"),
    };
  } catch (error) {
    console.error("Error fetching banner game:", error);
    return null;
  }
};

export const getGameScreenshots = async (slug: string) => {
  try {
    const data = await igdbRequest<IgdbGame>(
      "games",
      [
        "fields screenshots.image_id;",
        `where slug = "${escapeQuery(slug)}";`,
        "limit 1;",
      ].join(" ")
    );

    if (!data?.length) {
      return null;
    }

    return mapScreenshots(data[0].screenshots);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export type FilterOption = {
  id: number;
  name: string;
  slug: string;
};

export const getGenres = cache(async (): Promise<FilterOption[]> => {
  try {
    const data = await igdbRequest<FilterOption>(
      "genres",
      "fields name,slug; sort name asc; limit 50;"
    );
    return data ?? [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
});

export const getPlatforms = cache(async (): Promise<FilterOption[]> => {
  return [
    { id: 1, name: "PlayStation", slug: "playstation" },
    { id: 2, name: "Xbox", slug: "xbox" },
    { id: 3, name: "Nintendo", slug: "nintendo" },
    { id: 4, name: "PC", slug: "pc" },
  ];
});

export const getFilteredGames = async ({
  genre,
  year,
  platform,
}: {
  genre?: string;
  year?: string;
  platform?: string;
}) => {
  try {
    const conditions: string[] = ["version_parent = null", "cover != null"];

    if (genre) {
      if (/^\d+$/.test(genre)) {
        conditions.push(`genres = (${genre})`);
      } else {
        conditions.push(`genres.slug = "${escapeQuery(genre)}"`);
      }
    }

    if (platform) {
      if (platform === "playstation") {
        conditions.push('(platforms.name ~ *"PlayStation"* | platforms.name ~ *"PS"*)');
      } else if (platform === "xbox") {
        conditions.push('(platforms.name ~ *"Xbox"*)');
      } else if (platform === "nintendo") {
        conditions.push('(platforms.name ~ *"Nintendo"* | platforms.name ~ *"Wii"* | platforms.name ~ *"Switch"*)');
      } else if (platform === "pc") {
        conditions.push('(platforms.name ~ *"PC"* | platforms.name ~ *"Windows"* | platforms.slug = "win" | platforms.slug = "mac" | platforms.slug = "linux")');
      } else if (/^\d+$/.test(platform)) {
        conditions.push(`platforms = (${platform})`);
      } else {
        conditions.push(`platforms.slug = "${escapeQuery(platform)}"`);
      }
    }

    if (year && /^\d{4}$/.test(year)) {
      const yearNum = parseInt(year, 10);
      const { start, end } = getYearUnixRange(yearNum);
      conditions.push(`first_release_date >= ${start} & first_release_date < ${end}`);
    }

    const whereClause = conditions.join(" & ");

    const data = await igdbRequest<IgdbGame>(
      "games",
      [
        "fields name,slug,cover.image_id,total_rating,total_rating_count,first_release_date;",
        `where ${whereClause};`,
        "sort total_rating_count desc;",
        "limit 48;",
      ].join(" ")
    );

    return data?.map(mapGame) ?? [];
  } catch (error) {
    console.error("Error fetching filtered games:", error);
    return [];
  }
};

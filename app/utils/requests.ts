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
      "limit 24;",
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

const mapGameDetails = (game: IgdbGame) => {
  const coverImage =
    buildImageUrl(game.cover?.image_id, "cover_big_2x");

  return {
    name: game.name,
    slug: game.slug,
    metacritic: game.total_rating ? Math.round(game.total_rating) : null,
    released: toIsoDate(game.first_release_date),
    playtime: 0,
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
        "fields name,slug,total_rating,total_rating_count,first_release_date,summary,websites.url,cover.image_id,cover.url,platforms.name,platforms.slug;",
        `where slug = "${escapeQuery(slug)}";`,
        "limit 1;",
      ].join(" ")
    );
    if (!data?.length) {
      return null;
    }

    return mapGameDetails(data[0]);
  } catch (error) {
    console.error("Error fetching game details:", error);
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

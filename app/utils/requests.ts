const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY ||
  process.env.RAWG_API_KEY ||
  process.env.API_KEY;
const RAWG_BASE_URL = "https://api.rawg.io/api";

const fetchRawg = async (url: string) => {
  if (!API_KEY) {
    console.error(
      "RAWG API key is missing. Set NEXT_PUBLIC_API_KEY (or RAWG_API_KEY/API_KEY)."
    );
    return null;
  }

  const res = await fetch(url);
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!isJson) {
    console.error(
      `RAWG returned non-JSON response (${res.status}). Content-Type: ${contentType || "unknown"}`
    );
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    console.error(`RAWG request failed (${res.status}):`, data);
    return null;
  }

  return data;
};

export const getGames = async () => {
  try {
    const data = await fetchRawg(
      `${RAWG_BASE_URL}/games?key=${API_KEY}&genres=action&ordering=-added&page_size=24&dates=2024-01-01,2024-12-31`
    );
    return data?.results ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSearchedGames = async (query: string) => {
  try {
    const data = await fetchRawg(
      `${RAWG_BASE_URL}/games?key=${API_KEY}&search=${query}&page_size=36`
    );
    return data?.results ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGameDetails = async (slug: string) => {
  try {
    const data = await fetchRawg(
      `${RAWG_BASE_URL}/games/${slug}?key=${API_KEY}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

export const getGameScreenshots = async (slug: string) => {
  try {
    const data = await fetchRawg(
      `${RAWG_BASE_URL}/games/${slug}/screenshots?key=${API_KEY}`
    );
    return data?.results ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

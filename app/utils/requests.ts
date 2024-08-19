const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getGames = async () => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&genres=action&ordering=-added&page_size=24&dates=2024-01-01,2024-12-31`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSearchedGames = async (query: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=36`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGameDetails = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}?key=${API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGameScreenshots = async (slug: string) => {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

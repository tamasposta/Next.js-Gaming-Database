const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getGames = async (slug: string) => {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

export const getGameDetails = async (slug: string) => {
    const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);
    const data = await res.json();
    return data;
}
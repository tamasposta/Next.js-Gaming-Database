const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getTrendingGames = async () => {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

// ez még nem jó
export const getGames = async (query) => {
    const res = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

// ez még nem jó
export const getGameDetails = async (slug: string) => {
    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}

// ez még nem jó
export const getSimilarGames = async (id) => {
    const res = await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
    const data = await res.json();
    return data.results;
}
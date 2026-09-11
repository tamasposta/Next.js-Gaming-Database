"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LaravelApiError, laravelApi } from "../lib/laravel-api";
import { googleCalendarReleaseUrl } from "../lib/google-calendar";
import { useAuth } from "./auth-provider";

type LibraryGame = {
  id: number;
  game_slug: string;
  game_name: string;
  cover_image: string | null;
  release_date?: string | null;
};

type GameLibraryPageProps = {
  title: string;
  endpoint: "/favorites" | "/wishlist";
  emptyMessage: string;
};

export default function GameLibraryPage({ title, endpoint, emptyMessage }: GameLibraryPageProps) {
  const { isLoading, user } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState<LibraryGame[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
      return;
    }

    if (!user) return;

    let isCurrent = true;
    async function loadGames() {
      setIsLoadingGames(true);
      try {
        const response = await laravelApi<{ data: LibraryGame[] }>(endpoint);
        if (isCurrent) setGames(response.data);
      } catch (caught) {
        if (isCurrent) setError(caught instanceof LaravelApiError ? caught.message : "Unable to load your games.");
      } finally {
        if (isCurrent) setIsLoadingGames(false);
      }
    }

    void loadGames();
    return () => {
      isCurrent = false;
    };
  }, [endpoint, isLoading, router, user]);

  async function removeGame(id: number) {
    setError(null);
    setRemovingId(id);
    try {
      await laravelApi(`${endpoint}/${id}`, { method: "DELETE" });
      setGames((currentGames) => currentGames.filter((game) => game.id !== id));
    } catch (caught) {
      setError(caught instanceof LaravelApiError ? caught.message : "Unable to remove this game.");
    } finally {
      setRemovingId(null);
    }
  }

  if (isLoading || !user) return <div className="py-24 text-center">Loading your library...</div>;

  return (
    <section className="mx-auto my-12 w-full max-w-7xl px-4">
      <h1 className="text-3xl font-semibold text-primary">{title}</h1>
      {error && <p role="alert" className="mt-4 text-sm text-error">{error}</p>}
      {isLoadingGames ? (
        <p className="mt-8 text-base-content/70">Loading games...</p>
      ) : games.length ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {games.map((game) => (
            <article key={game.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral/40 bg-base-200 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl hover:outline hover:outline-2 hover:outline-neutral-content">
              <button
                type="button"
                aria-label={`Remove ${game.game_name}`}
                className="btn btn-circle btn-sm absolute right-2 top-2 z-10 border-0 bg-base-100/90 text-base-content hover:bg-error hover:text-error-content"
                disabled={removingId === game.id}
                onClick={() => void removeGame(game.id)}
              >
                X
              </button>
              <Link href={`/games/${game.game_slug}`} className="flex h-full flex-col">
                {game.cover_image ? (
                  <img src={game.cover_image} alt={game.game_name} className="aspect-[5/7] w-full object-cover" />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-neutral p-2 text-center text-xs text-base-content/70">No Cover</div>
                )}
                <div className="flex flex-1 items-center justify-center p-3">
                  <span className="line-clamp-2 text-center text-xs font-semibold text-base-content transition group-hover:text-primary">{game.game_name}</span>
                </div>
              </Link>
              {endpoint === "/wishlist" && googleCalendarReleaseUrl(game.game_name, game.release_date) && (
                <a
                  href={googleCalendarReleaseUrl(game.game_name, game.release_date) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-xs mx-2 mb-2"
                >
                  Google Calendar
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-base-content/70">{emptyMessage}</p>
      )}
    </section>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LaravelApiError, laravelApi } from "../../lib/laravel-api";
import { googleCalendarReleaseUrl } from "../../lib/google-calendar";
import { useAuth } from "../auth-provider";

type LibraryItem = {
  id: number;
  game_id: number;
  started_at?: string | null;
  finished_at?: string | null;
  status?: "playing" | "completed" | "abandoned";
};

type GameLibraryActionsProps = {
  game: {
    id?: number;
    name?: string;
    slug?: string;
    coverImage?: string;
    releaseDate?: string;
  };
};

const currentDate = () => new Date().toISOString().slice(0, 10);
const dateInputValue = (date?: string | null) => date?.slice(0, 10) ?? "";

export default function GameLibraryActions({ game }: GameLibraryActionsProps) {
  const { isLoading, user } = useAuth();
  const [favorite, setFavorite] = useState<LibraryItem | null>(null);
  const [wishlistItem, setWishlistItem] = useState<LibraryItem | null>(null);
  const [playedGame, setPlayedGame] = useState<LibraryItem | null>(null);
  const [startedAt, setStartedAt] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSaveGame = Boolean(game.id && game.name && game.slug);
  const gamePayload = {
    game_id: game.id,
    game_name: game.name,
    game_slug: game.slug,
    cover_image: game.coverImage || null,
  };

  useEffect(() => {
    if (!user || !game.id) {
      setFavorite(null);
      setWishlistItem(null);
      setPlayedGame(null);
      return;
    }

    let isCurrent = true;

    async function loadLibrary() {
      try {
        const [favorites, wishlist, playedGames] = await Promise.all([
          laravelApi<{ data: LibraryItem[] }>("/favorites"),
          laravelApi<{ data: LibraryItem[] }>("/wishlist"),
          laravelApi<{ data: LibraryItem[] }>("/played-games"),
        ]);

        if (!isCurrent) return;
        setFavorite(favorites.data.find((item) => item.game_id === game.id) ?? null);
        setWishlistItem(wishlist.data.find((item) => item.game_id === game.id) ?? null);
        const existingPlayedGame = playedGames.data.find((item) => item.game_id === game.id) ?? null;
        setPlayedGame(existingPlayedGame);
        setStartedAt(dateInputValue(existingPlayedGame?.started_at));
        setFinishedAt(dateInputValue(existingPlayedGame?.finished_at));
      } catch {
        if (isCurrent) setError("Unable to load your game library.");
      }
    }

    void loadLibrary();

    return () => {
      isCurrent = false;
    };
  }, [game.id, user]);

  async function save(action: () => Promise<void>) {
    setError(null);
    setIsSaving(true);

    try {
      await action();
    } catch (caught) {
      setError(caught instanceof LaravelApiError ? caught.message : "Unable to update your game library.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading || !canSaveGame) return null;

  if (!user) {
    return <Link href="/login" className="btn btn-primary btn-sm mt-3">Login to save this game</Link>;
  }

  const releaseDate = game.releaseDate && /^\d{4}-\d{2}-\d{2}$/.test(game.releaseDate) ? game.releaseDate : null;
  const calendarUrl = googleCalendarReleaseUrl(game.name ?? "Game", releaseDate);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2 lg:justify-end">
        <button
          type="button"
          className={`btn btn-sm ${favorite ? "btn-warning" : "btn-outline btn-warning"}`}
          disabled={isSaving}
          onClick={() => void save(async () => {
            if (favorite) {
              await laravelApi(`/favorites/${favorite.id}`, { method: "DELETE" });
              setFavorite(null);
              return;
            }
            const response = await laravelApi<{ data: LibraryItem }>("/favorites", {
              method: "POST",
              body: JSON.stringify(gamePayload),
            });
            setFavorite(response.data);
          })}
        >
          ★ {favorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <button
          type="button"
          className={`btn btn-sm ${wishlistItem ? "btn-accent" : "btn-outline btn-accent"}`}
          disabled={isSaving}
          onClick={() => void save(async () => {
            if (wishlistItem) {
              await laravelApi(`/wishlist/${wishlistItem.id}`, { method: "DELETE" });
              setWishlistItem(null);
              return;
            }
            const response = await laravelApi<{ data: LibraryItem }>("/wishlist", {
              method: "POST",
              body: JSON.stringify({ ...gamePayload, release_date: releaseDate }),
            });
            setWishlistItem(response.data);
          })}
        >
         ❤︎⁠ {wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
        </button>
        {calendarUrl && (
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-secondary btn-sm"
          >
            🗓 Add release to Google Calendar
          </a>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="form-control">
          <span className="label-text">Started playing</span>
          <input type="date" className="input input-bordered input-sm" value={startedAt} onChange={(event) => setStartedAt(event.target.value)} />
        </label>
        <label className="form-control">
          <span className="label-text">Finished playing</span>
          <input type="date" className="input input-bordered input-sm" value={finishedAt} min={startedAt || undefined} onChange={(event) => setFinishedAt(event.target.value)} />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={isSaving}
          onClick={() => void save(async () => {
            const payload = {
              ...gamePayload,
              started_at: startedAt || currentDate(),
              finished_at: finishedAt || null,
              status: finishedAt ? "completed" : "playing",
            };
            const response = playedGame
              ? await laravelApi<{ data: LibraryItem }>(`/played-games/${playedGame.id}`, { method: "PATCH", body: JSON.stringify(payload) })
              : await laravelApi<{ data: LibraryItem }>("/played-games", { method: "POST", body: JSON.stringify(payload) });
            setPlayedGame(response.data);
            setStartedAt(dateInputValue(response.data.started_at) || payload.started_at);
            setFinishedAt(dateInputValue(response.data.finished_at) || payload.finished_at || "");
          })}
        >
          ▶ {playedGame ? "Save play status" : "Start playing"}
        </button>
        {playedGame && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            disabled={isSaving}
            onClick={() => void save(async () => {
              await laravelApi(`/played-games/${playedGame.id}`, { method: "DELETE" });
              setPlayedGame(null);
              setStartedAt("");
              setFinishedAt("");
            })}
          >
           ▉ Remove play status
          </button>
        )}
        {playedGame?.status && <span className="text-sm text-base-content/70">Status: {playedGame.status}</span>}
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-error">{error}</p>}
    </div>
  );
}
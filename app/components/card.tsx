"use client";
import Link from "next/link";
import type { Game } from "../types/games.types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LaravelApiError, laravelApi } from "../lib/laravel-api";
import { useAuth } from "./auth-provider";

type Favorite = {
  id: number;
  game_id: number;
};

type WishlistItem = {
  id: number;
  game_id: number;
};

export default function Card({
  id,
  name,
  metacritic,
  released,
  released_iso,
  slug,
  background_image,
}: Game) {
  const { isLoading, user } = useAuth();
  const [favorite, setFavorite] = useState<Favorite | null>(null);
  const [wishlistItem, setWishlistItem] = useState<WishlistItem | null>(null);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorite(null);
      setWishlistItem(null);
      return;
    }

    let isCurrent = true;
    Promise.all([
      laravelApi<{ data: Favorite[] }>("/favorites"),
      laravelApi<{ data: WishlistItem[] }>("/wishlist"),
    ])
      .then(([favorites, wishlist]) => {
        if (!isCurrent) return;
        setFavorite(favorites.data.find((item) => item.game_id === id) ?? null);
        setWishlistItem(wishlist.data.find((item) => item.game_id === id) ?? null);
      })
      .catch(() => {
        if (!isCurrent) return;
        setFavorite(null);
        setWishlistItem(null);
      });

    return () => {
      isCurrent = false;
    };
  }, [id, user]);

  async function toggleFavorite() {
    if (!user || isUpdatingFavorite) return;

    setIsUpdatingFavorite(true);
    try {
      if (favorite) {
        await laravelApi(`/favorites/${favorite.id}`, { method: "DELETE" });
        setFavorite(null);
      } else {
        const response = await laravelApi<{ data: Favorite }>("/favorites", {
          method: "POST",
          body: JSON.stringify({
            game_id: id,
            game_slug: slug,
            game_name: name,
            cover_image: background_image || null,
          }),
        });
        setFavorite(response.data);
      }
    } catch (error) {
      if (!(error instanceof LaravelApiError)) {
        console.error("Unable to update favorite.", error);
      }
    } finally {
      setIsUpdatingFavorite(false);
    }
  }

  async function toggleWishlist() {
    if (!user || isUpdatingWishlist) return;

    setIsUpdatingWishlist(true);
    try {
      if (wishlistItem) {
        await laravelApi(`/wishlist/${wishlistItem.id}`, { method: "DELETE" });
        setWishlistItem(null);
      } else {
        const releaseDate = /^\d{4}-\d{2}-\d{2}$/.test(released_iso) ? released_iso : null;
        const response = await laravelApi<{ data: WishlistItem }>("/wishlist", {
          method: "POST",
          body: JSON.stringify({
            game_id: id,
            game_slug: slug,
            game_name: name,
            cover_image: background_image || null,
            release_date: releaseDate,
          }),
        });
        setWishlistItem(response.data);
      }
    } catch (error) {
      if (!(error instanceof LaravelApiError)) {
        console.error("Unable to update wishlist.", error);
      }
    } finally {
      setIsUpdatingWishlist(false);
    }
  }

  return (
    <div className="bg-neutral rounded-md hover:scale-105 transition-all duration-200 hover:outline hover:outline-2 hover:outline-neutral-content sm:w-[280px] h-full">
      <Link href={`/games/${slug}`}>
      <div
        className="w-full aspect-[5/7] bg-cover bg-center rounded-t-md"
        style={{ backgroundImage: `url(${background_image})` }}
      ></div>
      </Link>
      <div className="flex flex-col pb-3 items-center gap-3">
        <div className="flex items-center justify-between gap-2 p-2 w-full bg-base-200 max-sm:min-w-[90vw]">
          {isLoading ? <span className="h-[22px] w-[22px]" /> : user ? (
            <button
              type="button"
              className="shrink-0"
              title={favorite ? "Remove from favorites" : "Add to favorites"}
              aria-label={favorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
              disabled={isUpdatingFavorite}
              onClick={() => void toggleFavorite()}
            >
              <Image
                className="cursor-pointer"
                alt=""
                src={favorite ? "/star.svg" : "/star-none.svg"}
                width="22"
                height="22"
              />
            </button>
          ) : (
            <Link href="/login" title="Login to add favorites" aria-label={`Login to add ${name} to favorites`} className="shrink-0">
              <Image className="cursor-pointer" alt="" src="/star-none.svg" width="22" height="22" />
            </Link>
          )}
          <Link href={`/games/${slug}`} className="flex-1">
            <h2
              className="text-base font-semibold text-center"
              title={name}
            >
              {name.length > 20 ? name.slice(0, 20) + "..." : name}
            </h2>
          </Link>
          {isLoading ? <span className="h-[22px] w-[22px]" /> : user ? (
            <button
              type="button"
              className="shrink-0"
              title={wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
              aria-label={wishlistItem ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
              disabled={isUpdatingWishlist}
              onClick={() => void toggleWishlist()}
            >
              <Image
                className="cursor-pointer"
                alt=""
                src={wishlistItem ? "/heart.svg" : "/heart-none.svg"}
                width="22"
                height="22"
              />
            </button>
          ) : (
            <Link href="/login" title="Login to add games to your wishlist" aria-label={`Login to add ${name} to your wishlist`} className="shrink-0">
              <Image className="cursor-pointer" alt="" src="/heart-none.svg" width="30" height="30" />
            </Link>
          )}
        </div>
        <div className="flex flex-row">
          <Image
            className="w-[20px] mr-2"
            src="/images/Metacritic.svg"
            width="20"
            height="20"
            alt="Metacritic"
          />
          {metacritic == null ? (
            <h3 className="text-sm">Metacritic score: N/A</h3>
          ) : (
            <h3 className="text-sm">Metacritic score: {metacritic}</h3>
          )}
        </div>
        <h4 className="text-sm">Release date: {released}</h4>
      </div>
    </div>
  );
}

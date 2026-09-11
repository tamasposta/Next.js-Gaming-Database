"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LaravelApiError, laravelApi } from "../lib/laravel-api";
import { useAuth } from "../components/auth-provider";

type Genre = {
  id: number;
  name: string;
  slug: string;
};

export default function ProfilePage() {
  const { isLoading, refreshUser, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [isSavingGenres, setIsSavingGenres] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, router, user]);

  useEffect(() => {
    if (!user) return;
    setFavoriteGenres(user.favorite_genres ?? []);
    fetch("/api/genres")
      .then((response) => response.json())
      .then((response: { data: Genre[] }) => setGenres(response.data ?? []))
      .catch(() => setError("Unable to load game genres."));
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setMessage(null);
    setError(null);
    setIsSaving(true);

    try {
      await laravelApi("/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: String(formData.get("name")),
          first_name: String(formData.get("first_name")) || null,
          last_name: String(formData.get("last_name")) || null,
          email: String(formData.get("email")),
          address: String(formData.get("address")) || null,
          birth_date: String(formData.get("birth_date")) || null,
          favorite_genres: favoriteGenres,
        }),
      });
      await refreshUser();
      setMessage("Profile saved.");
    } catch (caught) {
      setError(caught instanceof LaravelApiError ? caught.message : "Unable to save your profile.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleGenre(genreName: string) {
    const nextGenres = favoriteGenres.includes(genreName)
      ? favoriteGenres.filter((name) => name !== genreName)
      : [...favoriteGenres, genreName];

    setError(null);
    setFavoriteGenres(nextGenres);
    setIsSavingGenres(true);

    try {
      await laravelApi("/profile", {
        method: "PUT",
        body: JSON.stringify({ favorite_genres: nextGenres }),
      });
      await refreshUser();
    } catch (caught) {
      setFavoriteGenres(favoriteGenres);
      setError(caught instanceof LaravelApiError ? caught.message : "Unable to save your favorite genres.");
    } finally {
      setIsSavingGenres(false);
    }
  }

  if (isLoading || !user) return <div className="py-24 text-center">Loading profile...</div>;

  return (
    <section className="mx-auto my-12 w-full max-w-3xl px-4">
      <div className="rounded-lg border border-base-300 bg-base-200 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-primary">Your profile</h1>
        <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="form-control sm:col-span-2"><span className="label-text">Display name</span><input name="name" defaultValue={user.name} className="input input-bordered w-full" required /></label>
          <label className="form-control"><span className="label-text">First name</span><input name="first_name" defaultValue={user.first_name ?? ""} className="input input-bordered w-full" /></label>
          <label className="form-control"><span className="label-text">Last name</span><input name="last_name" defaultValue={user.last_name ?? ""} className="input input-bordered w-full" /></label>
          <label className="form-control sm:col-span-2"><span className="label-text">Email</span><input name="email" type="email" defaultValue={user.email} className="input input-bordered w-full" required /></label>
          <label className="form-control sm:col-span-2"><span className="label-text">Address</span><input name="address" defaultValue={user.address ?? ""} className="input input-bordered w-full" /></label>
          <label className="form-control sm:col-span-2"><span className="label-text">Birth date</span><input name="birth_date" type="date" defaultValue={user.birth_date?.slice(0, 10) ?? ""} className="input input-bordered w-full" /></label>
          <div className="form-control sm:col-span-2">
            <span className="label-text mb-2">Favorite genres</span>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => {
                const isSelected = favoriteGenres.includes(genre.name);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    className={`btn btn-outline btn-primary btn-sm rounded-full transition ${isSelected ? "bg-primary !text-primary-content hover:bg-primary hover:!text-neutral" : ""}`}
                    disabled={isSavingGenres}
                    onClick={() => void toggleGenre(genre.name)}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>
          {error && <div role="alert" className="alert alert-error sm:col-span-2"><span>{error}</span></div>}
          {message && <div role="status" className="alert alert-success sm:col-span-2"><span>{message}</span></div>}
          <button type="submit" className="btn btn-primary sm:col-span-2" disabled={isSaving}>{isSaving ? "Saving..." : "Save profile"}</button>
        </form>
      </div>
    </section>
  );
}
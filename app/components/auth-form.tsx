"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LaravelApiError } from "../lib/laravel-api";
import { useAuth } from "./auth-provider";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    setIsSubmitting(true);

    try {
      const email = String(formData.get("email"));
      const password = String(formData.get("password"));
      if (isRegister) {
        await register(String(formData.get("name")), email, password, String(formData.get("password_confirmation")));
      } else {
        await login(email, password, formData.get("remember") === "on");
      }
      router.replace("/profile");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof LaravelApiError ? caught.message : "Unable to connect to the API.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto my-16 w-full max-w-md px-4">
      <div className="rounded-lg border border-base-300 bg-base-200 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold text-primary">{isRegister ? "Create account" : "Welcome back"}</h1>
        <p className="mt-2 text-sm text-base-content/70">{isRegister ? "Save your game library and preferences." : "Sign in to manage your game library."}</p>
        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          {isRegister && <label className="form-control"><span className="label-text">Name</span><input name="name" className="input input-bordered w-full" required /></label>}
          <label className="form-control"><span className="label-text">Email</span><input name="email" type="email" className="input input-bordered w-full" required /></label>
          <label className="form-control"><span className="label-text">Password</span><input name="password" type="password" minLength={8} className="input input-bordered w-full" required /></label>
          {isRegister && <label className="form-control"><span className="label-text">Confirm password</span><input name="password_confirmation" type="password" minLength={8} className="input input-bordered w-full" required /></label>}
          {!isRegister && <label className="label cursor-pointer justify-start gap-3"><input name="remember" type="checkbox" className="checkbox checkbox-primary checkbox-sm" /><span className="label-text">Remember me</span></label>}
          {error && <div role="alert" className="alert alert-error text-sm"><span>{error}</span></div>}
          <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : isRegister ? "Create account" : "Login"}</button>
        </form>
        <p className="mt-6 text-center text-sm">{isRegister ? "Already have an account?" : "New here?"} <Link className="link link-primary" href={isRegister ? "/login" : "/register"}>{isRegister ? "Login" : "Create an account"}</Link></p>
      </div>
    </section>
  );
}
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializeCsrf, laravelApi, User } from "../lib/laravel-api";

type AuthContextValue = {
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await laravelApi<{ user: User }>("/user");
      setUser(response.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    void refreshUser().finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string, remember: boolean) => {
    await initializeCsrf();
    const response = await laravelApi<{ user: User }>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password, remember }),
    });
    setUser(response.user);
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    await initializeCsrf();
    const response = await laravelApi<{ user: User }>("/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, password_confirmation: passwordConfirmation }),
    });
    setUser(response.user);
  };

  const logout = async () => {
    await initializeCsrf();
    await laravelApi<void>("/logout", { method: "POST" });
    setUser(null);
  };

  return <AuthContext.Provider value={{ isLoading, user, login, register, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
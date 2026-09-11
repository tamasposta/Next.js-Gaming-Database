const apiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL ?? "http://localhost:8000";

export type User = {
  id: number;
  name: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  address: string | null;
  birth_date: string | null;
  favorite_genres: string[] | null;
};

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class LaravelApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: Record<string, string[]>
  ) {
    super(message);
  }
}

const csrfToken = () => {
  const cookie = document.cookie.split("; ").find((item) => item.startsWith("XSRF-TOKEN="));
  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
};

export async function initializeCsrf(): Promise<void> {
  await fetch(`${apiUrl}/sanctum/csrf-cookie`, { credentials: "include" });
}

export async function laravelApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const method = options.method?.toUpperCase() ?? "GET";
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    await initializeCsrf();
  }

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  if (options.body) {
    headers.set("Content-Type", "application/json");
  }

  const token = csrfToken();
  if (token) {
    headers.set("X-XSRF-TOKEN", token);
  }

  const response = await fetch(`${apiUrl}/api${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = (await response.json()) as T & ApiErrorBody;
  if (!response.ok) {
    throw new LaravelApiError(body.message ?? "Request failed.", response.status, body.errors);
  }

  return body;
}
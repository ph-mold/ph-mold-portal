import { getAccessToken } from "./electron/authPref";

export const fetcher = async <T>(
  url: string,
  options?: RequestInit & { cacheType?: "no-store" | "force-cache" | "default" }
): Promise<T | undefined> => {
  const cache = options?.cacheType ?? "no-store";
  const headers = new Headers(options?.headers || {});
  const accessToken = await getAccessToken();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    cache,
    credentials: "include", // web에서 refresh cookie 포함, desktop은 무시됨
  });

  if (!res.ok) {
    throw new Error("Fetch failed");
  }

  const text = await res.text();
  try {
    return text ? JSON.parse(text) : undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    throw new Error("Invalid JSON response");
  }
};

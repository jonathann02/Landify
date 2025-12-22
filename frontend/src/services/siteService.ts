import { API_BASE_URL } from "../config/api";

export interface SiteSummary {
  id: string;
  userId: string;
  name: string;
  slug: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("landify_token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

   const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => ({})) : null;

   if (!res.ok) {
    const message = (data && (data.message || data.error)) || res.statusText || "Request failed";
    throw new Error(message);
  }

  return data as T;
}

export function getSites(): Promise<SiteSummary[]> {
  return apiFetch<SiteSummary[]>("/sites");
}

export function getSiteById(id: string): Promise<SiteSummary> {

    return apiFetch<SiteSummary>(`/sites/${id}`);
}
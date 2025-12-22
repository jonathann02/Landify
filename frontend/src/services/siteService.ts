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

export interface CreateSitePayload {
    name: string; 
}


const USE_MOCK_SITES = true; 

let mockSites: SiteSummary[] = [
    {
        id: crypto.randomUUID(),
        userId: "mock-user",
        name: "min första sajt", 
        slug: null, 
        isPublished: false, 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: crypto.randomUUID(),
        userId: "mock-user",
        name: "landify kampanj",
        slug: "landify-kampanj",
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("landify_token");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
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

export async function getSites(): Promise<SiteSummary[]> {
  if (USE_MOCK_SITES) return mockSites;
  return apiFetch<SiteSummary[]>("/sites");
}

export async function createSite(payload: CreateSitePayload): Promise<SiteSummary> {
    if (USE_MOCK_SITES) {
        const now = new Date().toISOString();
        const created: SiteSummary = {
            id: crypto.randomUUID(),
            userId: "mock-user",
            name: payload.name,
            slug: null,
            isPublished: false,
            createdAt: now,
            updatedAt: now,
        };
        mockSites = [created, ...mockSites]; 
        return created;
    }
    return apiFetch<SiteSummary>("/sites", {
    method: "POST",
    body: JSON.stringify(payload),
    });
}
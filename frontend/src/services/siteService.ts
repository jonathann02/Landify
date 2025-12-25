import { API_BASE_URL } from "../config/api";
import type { Section } from "./sectionService";
import type { SectionDto } from "./sectionService";
import { mapSectionDto } from "./sectionService";

export interface SiteSummary {
  id: string;
  userId: string;
  name: string;
  slug: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Site = SiteSummary; 

export interface SiteWithSections extends SiteSummary {
    sections: Section[]; 
}

export interface CreateSitePayload {
    name: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const token = localStorage.getItem("landify_token"); 
    const headers: Record<string, string> = {
        Accept: "application/json", 
        ...(init?.headers as Record<string, string>),
    }; 

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (init?.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers,
    });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const text = isJson ? await response.text() : "";
  const data = isJson && text ? JSON.parse(text) : undefined;

    if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      response.statusText ||
      "Request failed";
    throw new Error(message);
  }

     return data as T;
}

export async function getSites(): Promise<SiteSummary[]> {
  return apiFetch<SiteSummary[]>("/sites");
}

export async function createSite(payload: CreateSitePayload): Promise<Site> {
  return apiFetch<Site>("/sites", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSiteById(id: string): Promise<SiteWithSections> {
  const raw = await apiFetch<SiteSummary & { sections?: SectionDto[] | null }>(`/sites/${id}`);
  return {
    ...raw,
    sections: (raw.sections ?? []).map(mapSectionDto),
  };
}

export async function getPublicSiteBySlug(slug: string): Promise<SiteWithSections> {
  const raw = await apiFetch<SiteSummary & { sections: SectionDto[] }>(`/public/sites/${slug}`);
  return {
    ...raw,
    sections: (raw.sections ?? []).map(mapSectionDto).sort((a, b) => a.sortOrder - b.sortOrder),
  };
}

export async function publishSite(id: string): Promise<SiteWithSections> {
  const raw = await apiFetch<SiteSummary & { sections?: SectionDto[] | null }>(`/sites/${id}/publish`, {
    method: "POST",
  });
  return {
    ...raw,
    sections: (raw.sections ?? []).map(mapSectionDto),
  };
}

export async function deleteSite(id: string): Promise<void> {
  await apiFetch<void>(`/sites/${id}`, {
    method: "DELETE",
  });
}
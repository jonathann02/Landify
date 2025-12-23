import { API_BASE_URL } from "../config/api";
import {
  SECTION_DEFINITIONS,
} from "../sections/sectionTypes";
import type { SectionContent, SectionType } from "../sections/sectionTypes";

export interface SectionDto {
    id: string; 
    siteId: string;
    type: string; 
    sortOrder: number; 
    contentJson: string; 
    createdAt: string;
    updatedAt: string; 
}

export interface Section extends SectionDto {
  type: SectionType | string;
  content: SectionContent | null;
}

export interface NewSectionPayload {
  type: SectionType | string;
  sortOrder: number;
  content?: SectionContent;
  contentJson?: string;
}

export interface UpdateSectionPayload {
  type: SectionType | string;
  sortOrder: number;
  content?: SectionContent;
  contentJson?: string;
}

type SortOrderMap = Record<string, number>;

export const parseContent = (dto: SectionDto): SectionContent | null => {
  try {
    const parsed = dto.contentJson ? JSON.parse(dto.contentJson) : null;
    const type = dto.type as SectionType;
    if (!parsed) return null; 
    return { type, content: parsed } as SectionContent;
  } catch {
    return null;
  }
};

export const mapSectionDto = (dto: SectionDto): Section => ({
  ...dto,
  type: dto.type as SectionType | string,
  content: parseContent(dto),
});

const serializeContent = (
  payload: { content?: SectionContent; contentJson?: string; type?: SectionType | string },
) => {
  if (payload.contentJson) return payload.contentJson;
  if (payload.content) return JSON.stringify(payload.content.content ?? payload.content);

  const definition =
    payload.type && SECTION_DEFINITIONS[payload.type as SectionType]
      ? SECTION_DEFINITIONS[payload.type as SectionType]
      : SECTION_DEFINITIONS.hero;

  return JSON.stringify(definition.defaultContent);
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("landify_token");
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
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

export async function getSections(siteId: string): Promise<Section[]> {
  const dtos = await apiFetch<SectionDto[]>(`/sites/${siteId}/sections`);
  return dtos.map(mapSectionDto);
}

export async function createSection(
  siteId: string,
  payload: NewSectionPayload,
): Promise<Section> {
  const contentJson = serializeContent(payload);
  const dto = await apiFetch<SectionDto>(`/sites/${siteId}/sections`, {
    method: "POST",
    body: JSON.stringify({
      type: payload.type,
      sortOrder: payload.sortOrder,
      contentJson: contentJson || JSON.stringify(SECTION_DEFINITIONS.hero.defaultContent),
    }),
  });
  return mapSectionDto(dto);
}

export async function updateSection(
  siteId: string,
  sectionId: string,
  payload: UpdateSectionPayload,
): Promise<Section> {
  const contentJson = serializeContent(payload);
  const dto = await apiFetch<SectionDto>(`/sites/${siteId}/sections/${sectionId}`, {
    method: "PUT",
    body: JSON.stringify({
      type: payload.type,
      sortOrder: payload.sortOrder,
      contentJson: contentJson || "",
    }),
  });
  return mapSectionDto(dto);
}

export async function deleteSection(siteId: string, sectionId: string): Promise<void> {
  await apiFetch<void>(`/sites/${siteId}/sections/${sectionId}`, {
    method: "DELETE",
  });
}

export async function reorderSections(siteId: string, orderedIds: string[]): Promise<void> {
  const sortOrders: SortOrderMap = orderedIds.reduce<SortOrderMap>((acc, id, index) => {
    acc[id] = index;
    return acc;
  }, {});

  await apiFetch<void>(`/sites/${siteId}/sections/reorder`, {
    method: "PUT",
    body: JSON.stringify({ sortOrders }),
  });
}
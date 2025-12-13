import { en } from "./en";
import { sv } from "./sv";

export type Language = "en" | "sv";

export const translations = { en, sv };

export type TranslationKey = keyof typeof en;

export function translate(lang: Language, key: TranslationKey): string {
  const dict = translations[lang] ?? en;
  return (dict as any)[key] ?? (en as any)[key] ?? key;
}
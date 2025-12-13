import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Language } from "./index";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LANGUAGE_STORAGE_KEY = "landify_lang";
const DEFAULT_LANGUAGE: Language = "en";

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "en" || stored === "sv") {
      setLanguageState(stored);
      return;
    }

    const browserLang = (navigator.language ?? "").toLowerCase();
    if (browserLang.startsWith("sv")) {
      setLanguageState("sv");
      localStorage.setItem(LANGUAGE_STORAGE_KEY, "sv");
    } else {
      setLanguageState("en");
      localStorage.setItem(LANGUAGE_STORAGE_KEY, "en");
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: handleSetLanguage,
    }),
    [language, handleSetLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
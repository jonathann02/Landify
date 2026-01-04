import {
  type PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

import type { Language } from "./index";
import { LanguageContext, type LanguageContextValue } from "./LanguageContext"; 

const LANGUAGE_STORAGE_KEY = "landify_lang";
const DEFAULT_LANGUAGE: Language = "en";

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return DEFAULT_LANGUAGE;
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (stored === "en" || stored === "sv") ? stored : DEFAULT_LANGUAGE;
  });

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
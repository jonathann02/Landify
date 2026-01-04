import { translate, type TranslationKey } from ".";
import { useLanguage } from "./LanguageContext.ts"; 

export function useTranslation() {
  const { language } = useLanguage();
  return {
    t: (key: TranslationKey) => translate(language, key),
    language,
  };
}
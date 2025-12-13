import { useLanguage } from "../i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={
          language === "en"
            ? "font-semibold text-white underline underline-offset-4"
            : "opacity-70 transition hover:opacity-100"
        }
      >
        EN
      </button>
      <span className="text-white/40">/</span>
      <button
        type="button"
        onClick={() => setLanguage("sv")}
        className={
          language === "sv"
            ? "font-semibold text-white underline underline-offset-4"
            : "opacity-70 transition hover:opacity-100"
        }
      >
        SV
      </button>
    </div>
  );
}
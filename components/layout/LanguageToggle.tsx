"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/components/ui/cn";

const LANGUAGES = [
  { locale: "en", flag: "🇺🇸", label: "English" },
  { locale: "he", flag: "🇮🇱", label: "עברית" },
] as const;

export function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.locale}
          onClick={() => setLocale(lang.locale)}
          aria-label={`Switch to ${lang.label}`}
          title={lang.label}
          className={cn(
            "flex items-center gap-1.5 rounded-xl px-3 py-2.5 sm:py-1.5 text-sm font-bold transition-all duration-200",
            locale === lang.locale
              ? "bg-white text-indigo-700 shadow-sm shadow-indigo-100 scale-105"
              : "text-indigo-400 hover:text-indigo-600"
          )}
        >
          <span className="text-base leading-none">{lang.flag}</span>
          <span className="hidden sm:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/types/content";
import en from "@/i18n/en.json";
import he from "@/i18n/he.json";

const translations = { en, he } as const;

type TranslationKeys = typeof en;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("life_lang") as Locale | null;
    if (saved === "en" || saved === "he") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "he" ? "rtl" : "ltr";
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("life_lang", next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "he" ? "rtl" : "ltr";
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    const raw = getNestedValue(
      translations[locale] as unknown as Record<string, unknown>,
      key
    );
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (str, [k, v]) => str.replace(`{${k}}`, String(v)),
      raw
    );
  };

  return (
    <I18nContext.Provider
      value={{ locale, setLocale, t, dir: locale === "he" ? "rtl" : "ltr" }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function useBilingual() {
  const { locale } = useI18n();
  return function pick<T extends { en: string; he: string }>(obj: T): string {
    return obj[locale];
  };
}

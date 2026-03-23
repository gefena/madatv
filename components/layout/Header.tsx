"use client";

import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-indigo-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-200">
            <span className="text-xl">🔬</span>
          </div>
          <div>
            <div className="text-lg font-black leading-none tracking-tight group-hover:text-purple-600 transition-colors">
              <span className="text-indigo-700">Mada</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">TV</span>
            </div>
            <div className="text-xs font-semibold text-indigo-400 hidden sm:block">
              {t("madatv.tagline")}
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-indigo-500 hover:text-purple-600 transition-colors"
          >
            <span>📺</span>
            {t("madatv.allSeries")}
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}

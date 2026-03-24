"use client";

import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";
import { MadaTVLogo } from "./MadaTVLogo";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-indigo-100 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="shrink-0 drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-xl transition-all duration-200">
            <MadaTVLogo size={40} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg font-black tracking-tight text-indigo-700 group-hover:text-indigo-900 transition-colors">Mada</span>
              <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">TV</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm">
                4Kids
              </span>
            </div>
            <div className="text-xs font-semibold text-indigo-400 hidden sm:block mt-0.5">
              {t("madatv.tagline")}
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 rounded-2xl border-2 border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-200"
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

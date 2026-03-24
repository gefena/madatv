"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useBilingual } from "@/lib/i18n";
import type { SeriesMeta } from "@/lib/series";
import { cn } from "@/components/ui/cn";

export default function MadaTVHome() {
  const { t } = useI18n();
  const pick = useBilingual();
  const [series, setSeries] = useState<SeriesMeta[]>([]);

  useEffect(() => {
    import("@/lib/series").then(({ getAllSeries }) => {
      getAllSeries().then(setSeries);
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 sm:py-16 px-4">
        {/* Animated blobs */}
        <div className="absolute top-10 left-10 h-40 w-40 sm:h-72 sm:w-72 rounded-full bg-purple-200 opacity-40 blur-3xl animate-blob" />
        <div className="absolute top-20 right-20 h-32 w-32 sm:h-56 sm:w-56 rounded-full bg-pink-200 opacity-40 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/3 h-36 w-36 sm:h-64 sm:w-64 rounded-full bg-indigo-200 opacity-40 blur-3xl animate-blob animation-delay-4000" />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Bouncing science emojis */}
          <div className="mb-4 flex justify-center gap-2 sm:gap-3 text-3xl sm:text-4xl">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>🔬</span>
            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>🧬</span>
            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>🚀</span>
            <span className="animate-bounce" style={{ animationDelay: "450ms" }}>⚗️</span>
            <span className="animate-bounce" style={{ animationDelay: "600ms" }}>🌍</span>
          </div>

          {/* MadaTV logo text */}
          <h1 className="text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span>
              <span className="text-indigo-800">Mada</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">TV</span>
            </span>
            <span className="text-lg sm:text-xl font-black px-3 py-1 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md">
              4Kids
            </span>
          </h1>
          <p className="mt-3 text-lg font-black text-indigo-600 sm:text-xl md:text-2xl">
            {t("madatv.tagline")}
          </p>
          <p className="mt-2 text-sm font-semibold text-indigo-400 max-w-xs sm:max-w-md mx-auto">
            {t("madatv.subtitle")}
          </p>
        </div>
      </div>

      {/* Series section */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-black text-indigo-800 mb-6">
          📺 {t("madatv.chooseSeries")}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {series.map((s) => (
            <SeriesCard key={s.id} series={s} pick={pick} t={t} />
          ))}

          {/* Coming soon placeholder */}
          <ComingSoonCard t={t} />
        </div>
      </div>
    </div>
  );
}

function SeriesCard({
  series,
  pick,
  t,
}: {
  series: SeriesMeta;
  pick: (b: { en: string; he: string }) => string;
  t: (key: string) => string;
}) {
  return (
    <Link
      href={`/series/${series.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
    >
      {/* Cinematic image area */}
      <div className="relative aspect-[4/3] sm:aspect-video overflow-hidden">
        <Image
          src={series.thumbnail}
          alt={pick(series.title)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Series colour tint */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", series.gradient)} />
        {/* Bottom fade for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl scale-90 group-hover:scale-100 transition-transform duration-200">
            <svg className="h-7 w-7 ms-1 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Bottom-left: emoji + title overlay */}
        <div className="absolute bottom-0 start-0 end-0 p-4">
          <div className="flex items-end gap-2">
            <span className="text-4xl drop-shadow-lg leading-none">{series.emoji}</span>
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md truncate">
                {pick(series.title)}
              </p>
              <p className="text-xs text-white/60 italic truncate">{series.originalTitle}</p>
            </div>
          </div>
        </div>

        {/* Top-right badges */}
        <div className="absolute top-3 end-3 flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm">
            {series.episodeCount} {t("madatv.episodes")}
          </span>
          {series.ageRange && (
            <span className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 text-xs font-black text-white">
              👶 {series.ageRange}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {pick(series.description)}
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm font-black text-indigo-500 group-hover:text-indigo-700 transition-colors">
          <span>{t("madatv.watchSeries")}</span>
          <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", series.gradient)} />
    </Link>
  );
}

function ComingSoonCard({ t }: { t: (key: string) => string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-10 text-center min-h-[320px]">
      <div className="text-4xl mb-3">🚧</div>
      <p className="font-black text-indigo-400 text-base">{t("madatv.comingSoon")}</p>
      <p className="mt-1 text-xs font-semibold text-indigo-300">{t("madatv.moreSeries")}</p>
    </div>
  );
}

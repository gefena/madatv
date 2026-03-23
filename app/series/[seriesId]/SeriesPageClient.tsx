"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n, useBilingual } from "@/lib/i18n";
import { EpisodeGrid } from "@/components/home/EpisodeGrid";
import type { EpisodeListItem } from "@/types/content";
import type { SeriesMeta } from "@/lib/series";
import { cn } from "@/components/ui/cn";

interface Props {
  seriesId: string;
}

export default function SeriesPageClient({ seriesId }: Props) {
  const { t } = useI18n();
  const pick = useBilingual();
  const [episodes, setEpisodes] = useState<EpisodeListItem[]>([]);
  const [series, setSeries] = useState<SeriesMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      import("@/lib/series").then(({ getSeries }) => getSeries(seriesId)),
      import("@/lib/content").then(({ getAllEpisodeListItems }) => getAllEpisodeListItems()),
    ]).then(([s, items]) => {
      setSeries(s);
      setEpisodes(items);
      setLoading(false);
    });
  }, [seriesId]);

  return (
    <div>
      {/* Series hero */}
      <div className={cn(
        "relative overflow-hidden py-8 sm:py-12 px-4",
        "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      )}>
        <div className="absolute top-8 left-8 h-56 w-56 rounded-full bg-purple-200 opacity-40 blur-3xl animate-blob" />
        <div className="absolute bottom-8 right-8 h-48 w-48 rounded-full bg-pink-200 opacity-40 blur-3xl animate-blob animation-delay-2000" />

        <div className="relative mx-auto max-w-4xl">
          {/* Back to MadaTV */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-indigo-600 transition-colors mb-6"
          >
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            MadaTV
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {series && (
              <div className={cn(
                "flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-lg",
                `bg-gradient-to-br ${series.gradient}`
              )}>
                {series.emoji}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-black text-indigo-800 sm:text-4xl md:text-5xl leading-tight">
                {series ? pick(series.title) : ""}
              </h1>
              {series && (
                <p className="text-sm font-semibold text-indigo-400 italic mt-1">
                  {series.originalTitle}
                </p>
              )}
            </div>
          </div>

          {series && (
            <p className="mt-4 text-base font-semibold text-indigo-600 max-w-xl">
              {pick(series.description)}
            </p>
          )}

          {/* Badges */}
          {series && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-black text-indigo-700 shadow-md border-2 border-indigo-100">
                🎥 {series.episodeCount} {t("madatv.episodes")}
              </span>
              {series.ageRange && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-black text-purple-700 shadow-md border-2 border-purple-100">
                  👶 {t("madatv.ages")} {series.ageRange}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Episodes */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-white shadow-card overflow-hidden animate-pulse">
                <div className="aspect-video bg-indigo-100" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-indigo-100 rounded-full w-3/4" />
                  <div className="h-3 bg-indigo-50 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EpisodeGrid episodes={episodes} seriesId={seriesId} />
        )}
      </div>
    </div>
  );
}

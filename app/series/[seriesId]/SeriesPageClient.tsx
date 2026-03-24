"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n, useBilingual } from "@/lib/i18n";
import { EpisodeGrid } from "@/components/home/EpisodeGrid";
import { SERIES_BG_IMAGES } from "@/lib/episodeImages";
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

  const posterSrc = SERIES_BG_IMAGES[seriesId] ?? series?.thumbnail;

  return (
    <div>
      {/* Series hero — poster background */}
      <div className="relative overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-[360px]">
        {/* Poster image */}
        {posterSrc && (
          <Image
            src={posterSrc}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        )}
        {/* Series colour tint */}
        {series && (
          <div className={cn("absolute inset-0 opacity-50 bg-gradient-to-br", series.gradient)} />
        )}
        {/* Dark gradient — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-12">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-white/70 hover:text-white transition-colors mb-6"
          >
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            MadaTV 4Kids
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {series && (
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl text-2xl sm:text-3xl shrink-0 bg-white/20 backdrop-blur-sm border border-white/30">
                {series.emoji}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl lg:text-5xl leading-tight drop-shadow-lg">
                {series ? pick(series.title) : ""}
              </h1>
              {series && (
                <p className="text-sm font-semibold text-white/60 italic mt-1">
                  {series.originalTitle}
                </p>
              )}
            </div>
          </div>

          {series && (
            <p className="mt-4 text-sm sm:text-base font-semibold text-white/80 max-w-xl">
              {pick(series.description)}
            </p>
          )}

          {series && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 text-xs sm:text-sm font-black text-white">
                🎥 {series.episodeCount} {t("madatv.episodes")}
              </span>
              {series.ageRange && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 text-xs sm:text-sm font-black text-white">
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
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
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

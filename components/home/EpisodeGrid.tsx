"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { getWatchedCount } from "@/lib/progress";
import { EpisodeCard } from "./EpisodeCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SERIES_BG_IMAGES } from "@/lib/episodeImages";
import type { EpisodeListItem } from "@/types/content";

interface EpisodeGridProps {
  episodes: EpisodeListItem[];
  seriesId: string;
}

export function EpisodeGrid({ episodes, seriesId }: EpisodeGridProps) {
  const { t } = useI18n();
  const [watchedCount, setWatchedCount] = useState(0);
  const seriesImage = SERIES_BG_IMAGES[seriesId];

  useEffect(() => {
    setWatchedCount(getWatchedCount(episodes.map((e) => e.id)));
  }, [episodes]);

  const percent = episodes.length > 0 ? (watchedCount / episodes.length) * 100 : 0;

  return (
    <div>
      {/* Progress card */}
      {watchedCount > 0 && (
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sm:p-5 text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center justify-between mb-3 gap-2">
            <div className="min-w-0">
              <p className="font-black text-base">🏆 {t("home.progress")}</p>
              <p className="text-sm text-indigo-200 mt-0.5 font-semibold">
                {t("home.episodesWatched", { count: watchedCount, total: episodes.length })}
              </p>
            </div>
            <span className="text-2xl sm:text-3xl font-black shrink-0">{Math.round(percent)}%</span>
          </div>
          <ProgressBar value={percent} className="h-3" color="rainbow" />
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} seriesId={seriesId} seriesImage={seriesImage} />
        ))}
      </div>
    </div>
  );
}

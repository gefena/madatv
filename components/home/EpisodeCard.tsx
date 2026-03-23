"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n, useBilingual } from "@/lib/i18n";
import { getEpisodeProgress } from "@/lib/progress";
import { SERIES_BG_IMAGES } from "@/lib/episodeImages";
import { getEpisodeColor } from "@/lib/episodeColors";
import { cn } from "@/components/ui/cn";
import type { EpisodeListItem } from "@/types/content";

interface EpisodeCardProps {
  episode: EpisodeListItem;
  seriesId: string;
  seriesImage?: string;
}

export function EpisodeCard({ episode, seriesId, seriesImage }: EpisodeCardProps) {
  const { t } = useI18n();
  const pick = useBilingual();
  const [watched, setWatched] = useState(false);
  const [score, setScore] = useState<{ score: number; total: number } | null>(null);
  const color = getEpisodeColor(episode.id);

  useEffect(() => {
    const progress = getEpisodeProgress(episode.id);
    setWatched(progress.watched);
    if (progress.quizScore !== undefined && progress.quizTotal !== undefined) {
      setScore({ score: progress.quizScore, total: progress.quizTotal });
    }
  }, [episode.id]);

  return (
    <Link
      href={`/series/${seriesId}/episode/${episode.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300",
        "hover:shadow-card-hover hover:-translate-y-2",
        color.glow
      )}
    >
      {/* Image header with series background + large episode emoji */}
      <div className={cn("relative overflow-hidden", "aspect-video")}>
        {/* Series background image */}
        {(seriesImage ?? SERIES_BG_IMAGES[seriesId]) ? (
          <Image
            src={seriesImage ?? SERIES_BG_IMAGES[seriesId]}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", color.gradient)} />
        )}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Color tint overlay */}
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", color.gradient)} />

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-xl",
            "scale-90 group-hover:scale-100 transition-transform duration-200"
          )}>
            <svg className={cn("h-5 w-5 ms-0.5", color.text)} fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Episode number badge */}
        <div className="absolute top-2.5 start-2.5">
          <span className={cn(
            "rounded-xl px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm shadow",
            `bg-gradient-to-r ${color.gradient}`
          )}>
            {episode.episodeNumber}
          </span>
        </div>

        {/* Watched badge */}
        {watched && (
          <div className="absolute top-3 end-3">
            <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-black text-white shadow-lg">
              ✓ {t("episode.watched")}
            </span>
          </div>
        )}

        {/* Duration bottom */}
        <div className="absolute bottom-3 end-3">
          <span className="rounded-lg bg-black/50 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
            {t("episode.minutes", { count: episode.durationMinutes })}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4 pb-5">
        <div className="flex items-start gap-2.5 mb-1">
          <span className="text-3xl leading-none shrink-0 mt-0.5">{color.emoji}</span>
          <h3 className={cn(
            "font-black text-sm sm:text-base leading-snug text-gray-800 transition-colors group-hover:transition-colors",
            `group-hover:${color.text}`
          )}>
            {pick(episode.title)}
          </h3>
        </div>
        <p className="mt-0.5 text-xs font-semibold text-gray-400">
          {episode.title[pick(episode.title) === episode.title.en ? "he" : "en"]}
        </p>

        {/* Score + progress indicator */}
        <div className="mt-3 flex items-center gap-2">
          {score ? (
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black",
              score.score / score.total >= 0.8
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            )}>
              {score.score / score.total >= 0.8 ? "⭐" : "📝"} {score.score}/{score.total}
            </span>
          ) : watched ? (
            <span className="text-xs font-bold text-emerald-500">
              🎉 {t("quiz.startQuiz")}!
            </span>
          ) : null}
        </div>
      </div>

      {/* Bottom color bar */}
      <div className={cn("h-1.5 w-full bg-gradient-to-r", color.gradient)} />
    </Link>
  );
}

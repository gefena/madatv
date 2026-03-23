"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n, useBilingual } from "@/lib/i18n";
import { markWatched, getEpisodeProgress } from "@/lib/progress";
import { VideoPlayer } from "@/components/episode/VideoPlayer";
import { EpisodeIntro } from "@/components/episode/EpisodeIntro";
import { TriviaQuiz } from "@/components/episode/TriviaQuiz";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getEpisodeColor } from "@/lib/episodeColors";
import { cn } from "@/components/ui/cn";
import type { Episode } from "@/types/content";

interface Props {
  slug: string;
}

export default function EpisodePageClient({ slug }: Props) {
  const { t } = useI18n();
  const pick = useBilingual();

  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    if (!slug) return;
    import("@/lib/content").then(({ getEpisode }) => {
      getEpisode(slug).then((ep) => {
        setEpisode(ep);
        setLoading(false);
        if (ep) {
          const progress = getEpisodeProgress(ep.id);
          setWatched(progress.watched);
        }
      });
    });
  }, [slug]);

  const handleWatched = () => {
    if (episode) {
      markWatched(episode.id);
      setWatched(true);
    }
  };

  const color = episode ? getEpisodeColor(episode.id) : getEpisodeColor("");

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 space-y-4 animate-pulse">
        <div className="h-4 bg-indigo-100 rounded-full w-24" />
        <div className="aspect-video bg-indigo-100 rounded-3xl" />
        <div className="h-6 bg-indigo-100 rounded-full w-1/2" />
        <div className="h-40 bg-indigo-50 rounded-3xl" />
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-indigo-400 font-bold">Episode not found.</p>
        <Link href="/" className="mt-4 inline-block text-indigo-600 font-black hover:underline">
          {t("episode.backToAll")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-400 hover:text-indigo-600 transition-colors"
      >
        <svg
          className="h-4 w-4 rtl:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        {t("episode.backToAll")}
      </Link>

      {/* Episode header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={cn("rounded-2xl px-3 py-1 text-sm font-black text-white bg-gradient-to-r", color.gradient)}>
              {color.emoji} {t("episode.episode")} {episode.episodeNumber}
            </span>
            <Badge variant="outline">
              ⏱ {t("episode.minutes", { count: episode.durationMinutes })}
            </Badge>
            {watched && (
              <Badge variant="success">
                ✅ {t("episode.watched")}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">
            {pick(episode.title)}
          </h1>
          <p className="mt-1 text-base text-slate-500">
            {episode.title[pick(episode.title) === episode.title.en ? "he" : "en"]}
          </p>
        </div>
        {!watched && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleWatched}
            className="shrink-0"
          >
            {t("episode.markWatched")}
          </Button>
        )}
      </div>

      {/* Video Player */}
      <VideoPlayer
        youtubeId={episode.youtubeId}
        videoSources={episode.videoSources}
        episodeId={episode.id}
        onWatched={() => setWatched(true)}
      />

      {/* Intro + Terminology */}
      <EpisodeIntro episode={episode} />

      {/* Trivia Quiz */}
      <TriviaQuiz episode={episode} initialWatched={watched} />
    </div>
  );
}

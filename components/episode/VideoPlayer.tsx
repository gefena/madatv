"use client";

import { useRef, useState } from "react";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { useI18n } from "@/lib/i18n";
import { markWatched } from "@/lib/progress";
import { Button } from "@/components/ui/Button";

interface VideoPlayerProps {
  youtubeId: string;
  videoSources?: string[];
  episodeId: string;
  onWatched?: () => void;
}

export function VideoPlayer({ youtubeId, videoSources, episodeId, onWatched }: VideoPlayerProps) {
  const { t } = useI18n();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [showWatchedPrompt, setShowWatchedPrompt] = useState(false);

  // Build ordered list of IDs to try: primary first, then fallbacks (deduped)
  const allSources = videoSources && videoSources.length > 0
    ? Array.from(new Set([youtubeId, ...videoSources]))
    : [youtubeId];

  const [sourceIndex, setSourceIndex] = useState(0);
  const currentId = allSources[sourceIndex];

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
      origin: typeof window !== "undefined" ? window.location.origin : "",
    },
  };

  const handleStateChange = (event: { data: number }) => {
    // YouTube player state: 0 = ended
    if (event.data === 0) {
      setShowWatchedPrompt(true);
    }
  };

  const handleError = () => {
    // Try next source if available
    if (sourceIndex < allSources.length - 1) {
      setSourceIndex((i) => i + 1);
    }
  };

  const handleMarkWatched = () => {
    markWatched(episodeId);
    setShowWatchedPrompt(false);
    onWatched?.();
  };

  return (
    <div className="relative w-full">
      {/* 16:9 responsive wrapper */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <YouTube
          key={currentId}
          videoId={currentId}
          opts={opts}
          onStateChange={handleStateChange}
          onError={handleError}
          onReady={(e) => { playerRef.current = e.target; }}
          className="absolute inset-0 w-full h-full"
          iframeClassName="w-full h-full"
        />
      </div>

      {/* Watch completion prompt */}
      {showWatchedPrompt && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
          <p className="text-sm text-emerald-400">
            🎉 {t("episode.watched")}! {t("quiz.subtitle")}
          </p>
          <Button variant="success" size="sm" onClick={handleMarkWatched}>
            {t("episode.markWatched")}
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useI18n, useBilingual } from "@/lib/i18n";
import { TerminologyList } from "./TerminologyList";
import type { Episode } from "@/types/content";

interface EpisodeIntroProps {
  episode: Episode;
}

export function EpisodeIntro({ episode }: EpisodeIntroProps) {
  const { t } = useI18n();
  const pick = useBilingual();

  return (
    <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 sm:p-6 shadow-card">
      <h2 className="flex items-center gap-2 text-lg font-black text-indigo-800 mb-4">
        <span className="text-xl">📖</span>
        {t("episode.intro")}
      </h2>

      <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Summary */}
        <div>
          <p className="text-sm font-semibold text-gray-600 leading-relaxed whitespace-pre-line">
            {pick(episode.summary)}
          </p>
        </div>

        {/* Terminology */}
        <div>
          <TerminologyList terms={episode.terminology} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useI18n, useBilingual } from "@/lib/i18n";
import { cn } from "@/components/ui/cn";
import type { Term } from "@/types/content";

interface TermCardProps {
  term: Term;
  index: number;
}

const CARD_COLORS = [
  "border-violet-200 bg-violet-50 hover:border-violet-300",
  "border-pink-200 bg-pink-50 hover:border-pink-300",
  "border-blue-200 bg-blue-50 hover:border-blue-300",
  "border-emerald-200 bg-emerald-50 hover:border-emerald-300",
  "border-amber-200 bg-amber-50 hover:border-amber-300",
  "border-cyan-200 bg-cyan-50 hover:border-cyan-300",
];

function TermCard({ term, index }: TermCardProps) {
  const [open, setOpen] = useState(false);
  const { locale } = useI18n();
  const pick = useBilingual();
  const colorClass = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn(
        "w-full text-start rounded-2xl border-2 transition-all duration-200 overflow-hidden",
        colorClass
      )}
    >
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm text-sm font-black text-gray-600">
            {index + 1}
          </span>
          <div className="text-start">
            <p className="text-sm font-black text-gray-800">{pick(term.term)}</p>
            <p className="text-xs font-semibold text-gray-400">
              {term.term[locale === "en" ? "he" : "en"]}
            </p>
          </div>
        </div>
        <svg
          className={cn("h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ms-2", open && "rotate-180")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <div className="border-t-2 border-white/60 px-3 pb-3 pt-2.5 text-start">
          <p className="text-sm font-semibold text-gray-700 leading-relaxed">{pick(term.definition)}</p>
          <p className="mt-2 text-xs font-semibold text-gray-400 leading-relaxed">
            {term.definition[locale === "en" ? "he" : "en"]}
          </p>
        </div>
      )}
    </button>
  );
}

interface TerminologyListProps {
  terms: Term[];
}

export function TerminologyList({ terms }: TerminologyListProps) {
  const { t } = useI18n();

  return (
    <div>
      <h3 className="flex items-center gap-2 text-base font-black text-indigo-800 mb-3">
        <span>🔤</span>
        {t("episode.terminology")}
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-black text-indigo-600">
          {t("episode.termCount", { count: terms.length })}
        </span>
      </h3>
      <div className="flex flex-col gap-2">
        {terms.map((term, i) => (
          <TermCard key={term.id} term={term} index={i} />
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { SERIES_IDS } from "@/lib/series";
import { getSeriesEpisodeSlugs, getEpisode } from "@/lib/content";
import EpisodePageClient from "./EpisodePageClient";

export function generateStaticParams() {
  const params = [];
  for (const seriesId of SERIES_IDS) {
    for (const slug of getSeriesEpisodeSlugs(seriesId)) {
      params.push({ seriesId, slug });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ seriesId: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisode(slug);
  if (!episode) return {};
  const title = episode.title.en;
  const description = episode.summary.en.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title: `${title} — MadaTV`,
      description,
      images: [{ url: episode.thumbnail, width: 1280, height: 720 }],
    },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { seriesId, slug } = await params;
  return <EpisodePageClient seriesId={seriesId} slug={slug} />;
}

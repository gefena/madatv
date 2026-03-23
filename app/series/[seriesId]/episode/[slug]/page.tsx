import { SERIES_IDS } from "@/lib/series";
import { EPISODE_SLUGS } from "@/lib/content";
import EpisodePageClient from "./EpisodePageClient";

export function generateStaticParams() {
  const params = [];
  for (const seriesId of SERIES_IDS) {
    for (const slug of EPISODE_SLUGS) {
      params.push({ seriesId, slug });
    }
  }
  return params;
}

interface Props {
  params: Promise<{ seriesId: string; slug: string }>;
}

export default async function EpisodePage({ params }: Props) {
  const { seriesId, slug } = await params;
  return <EpisodePageClient seriesId={seriesId} slug={slug} />;
}

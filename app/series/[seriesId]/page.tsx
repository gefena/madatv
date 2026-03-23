import type { Metadata } from "next";
import { SERIES_IDS, getSeries } from "@/lib/series";
import SeriesPageClient from "./SeriesPageClient";

export function generateStaticParams() {
  return SERIES_IDS.map((seriesId) => ({ seriesId }));
}

interface Props {
  params: Promise<{ seriesId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seriesId } = await params;
  const series = await getSeries(seriesId);
  if (!series) return {};
  const title = series.title.en;
  const description = series.description.en;
  return {
    title,
    description,
    openGraph: {
      title: `${title} — MadaTV`,
      description,
      images: [{ url: series.thumbnail, width: 1280, height: 720 }],
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { seriesId } = await params;
  return <SeriesPageClient seriesId={seriesId} />;
}

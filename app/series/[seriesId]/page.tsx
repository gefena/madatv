import { SERIES_IDS } from "@/lib/series";
import SeriesPageClient from "./SeriesPageClient";

export function generateStaticParams() {
  return SERIES_IDS.map((seriesId) => ({ seriesId }));
}

interface Props {
  params: Promise<{ seriesId: string }>;
}

export default async function SeriesPage({ params }: Props) {
  const { seriesId } = await params;
  return <SeriesPageClient seriesId={seriesId} />;
}

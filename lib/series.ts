export interface SeriesMeta {
  id: string;
  title: { en: string; he: string };
  originalTitle: string;
  description: { en: string; he: string };
  episodeCount: number;
  thumbnail: string;
  emoji: string;
  gradient: string;
  badgeColor: string;
  year?: string;
  ageRange?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const seriesModules: Record<string, () => Promise<{ default: any }>> = {
  life: () => import("@/content/series/life.json"),
};

export const SERIES_IDS = Object.keys(seriesModules);

export async function getAllSeries(): Promise<SeriesMeta[]> {
  const results: SeriesMeta[] = [];
  for (const id of SERIES_IDS) {
    const mod = await seriesModules[id]();
    results.push(mod.default as SeriesMeta);
  }
  return results;
}

export async function getSeries(id: string): Promise<SeriesMeta | null> {
  const loader = seriesModules[id];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default as SeriesMeta;
  } catch {
    return null;
  }
}

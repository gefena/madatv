import type { Episode, EpisodeListItem } from "@/types/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EpisodeLoader = Record<string, () => Promise<{ default: any }>>;

const LIFE_EPISODES: EpisodeLoader = {
  "01-the-cell":              () => import("@/content/episodes/01-the-cell.json"),
  "02-birth":                 () => import("@/content/episodes/02-birth.json"),
  "03-the-body-guards":       () => import("@/content/episodes/03-the-body-guards.json"),
  "04-bone-marrow":           () => import("@/content/episodes/04-bone-marrow.json"),
  "05-blood-vessels":         () => import("@/content/episodes/05-blood-vessels.json"),
  "06-blood-platelets":       () => import("@/content/episodes/06-blood-platelets.json"),
  "07-the-heart":             () => import("@/content/episodes/07-the-heart.json"),
  "08-breathing":             () => import("@/content/episodes/08-breathing.json"),
  "09-the-brain":             () => import("@/content/episodes/09-the-brain.json"),
  "10-the-neurons":           () => import("@/content/episodes/10-the-neurons.json"),
  "11-the-eye":               () => import("@/content/episodes/11-the-eye.json"),
  "12-the-ear":               () => import("@/content/episodes/12-the-ear.json"),
  "13-the-skin":              () => import("@/content/episodes/13-the-skin.json"),
  "14-mouth-and-teeth":       () => import("@/content/episodes/14-mouth-and-teeth.json"),
  "15-digestion":             () => import("@/content/episodes/15-digestion.json"),
  "16-the-liver":             () => import("@/content/episodes/16-the-liver.json"),
  "17-the-kidneys":           () => import("@/content/episodes/17-the-kidneys.json"),
  "18-the-lymphatic-system":  () => import("@/content/episodes/18-the-lymphatic-system.json"),
  "19-bones-and-skeleton":    () => import("@/content/episodes/19-bones-and-skeleton.json"),
  "20-muscles-and-fat":       () => import("@/content/episodes/20-muscles-and-fat.json"),
  "21-fight-against-toxins":  () => import("@/content/episodes/21-fight-against-toxins.json"),
  "22-the-immune-system":     () => import("@/content/episodes/22-the-immune-system.json"),
  "23-the-hormones":          () => import("@/content/episodes/23-the-hormones.json"),
  "24-the-chain-of-life":     () => import("@/content/episodes/24-the-chain-of-life.json"),
  "25-repairs":               () => import("@/content/episodes/25-repairs.json"),
  "26-life-goes-on":          () => import("@/content/episodes/26-life-goes-on.json"),
};

const DISCOVERERS_EPISODES: EpisodeLoader = {
  "d01-the-chinese":          () => import("@/content/episodes/d01-the-chinese.json"),
  "d02-archimedes":           () => import("@/content/episodes/d02-archimedes.json"),
  "d03-hero-of-alexandria":   () => import("@/content/episodes/d03-hero-of-alexandria.json"),
  "d04-measuring-time":       () => import("@/content/episodes/d04-measuring-time.json"),
  "d05-henry-the-navigator":  () => import("@/content/episodes/d05-henry-the-navigator.json"),
  "d06-gutenberg":            () => import("@/content/episodes/d06-gutenberg.json"),
  "d07-da-vinci":             () => import("@/content/episodes/d07-da-vinci.json"),
  "d08-the-doctors":          () => import("@/content/episodes/d08-the-doctors.json"),
  "d09-galileo":              () => import("@/content/episodes/d09-galileo.json"),
  "d10-newton":               () => import("@/content/episodes/d10-newton.json"),
  "d11-buffon":               () => import("@/content/episodes/d11-buffon.json"),
  "d12-lavoisier":            () => import("@/content/episodes/d12-lavoisier.json"),
  "d13-stephenson":           () => import("@/content/episodes/d13-stephenson.json"),
  "d14-faraday":              () => import("@/content/episodes/d14-faraday.json"),
  "d15-darwin":               () => import("@/content/episodes/d15-darwin.json"),
  "d16-mendel":               () => import("@/content/episodes/d16-mendel.json"),
  "d17-pasteur":              () => import("@/content/episodes/d17-pasteur.json"),
  "d18-edison":               () => import("@/content/episodes/d18-edison.json"),
  "d19-marconi":              () => import("@/content/episodes/d19-marconi.json"),
  "d20-ford":                 () => import("@/content/episodes/d20-ford.json"),
  "d21-aviation":             () => import("@/content/episodes/d21-aviation.json"),
  "d22-marie-curie":          () => import("@/content/episodes/d22-marie-curie.json"),
  "d23-einstein":             () => import("@/content/episodes/d23-einstein.json"),
  "d24-lorenz":               () => import("@/content/episodes/d24-lorenz.json"),
  "d25-armstrong":            () => import("@/content/episodes/d25-armstrong.json"),
  "d26-tomorrow":             () => import("@/content/episodes/d26-tomorrow.json"),
};

const SERIES_EPISODES: Record<string, EpisodeLoader> = {
  life: LIFE_EPISODES,
  discoverers: DISCOVERERS_EPISODES,
};

// All slugs across all series (used for static generation)
export const EPISODE_SLUGS = Object.values(SERIES_EPISODES).flatMap(Object.keys);

export function getSeriesEpisodeSlugs(seriesId: string): string[] {
  return Object.keys(SERIES_EPISODES[seriesId] ?? {});
}

async function loadEpisode(slug: string, seriesId?: string): Promise<Episode | null> {
  // If seriesId given, look only in that series; otherwise search all
  const loaders = seriesId
    ? (SERIES_EPISODES[seriesId] ? [SERIES_EPISODES[seriesId]] : [])
    : Object.values(SERIES_EPISODES);

  for (const map of loaders) {
    const loader = map[slug];
    if (loader) {
      try {
        const mod = await loader();
        return mod.default as unknown as Episode;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export async function getEpisode(slug: string, seriesId?: string): Promise<Episode | null> {
  return loadEpisode(slug, seriesId);
}

export async function getSeriesEpisodes(seriesId: string): Promise<EpisodeListItem[]> {
  const slugs = getSeriesEpisodeSlugs(seriesId);
  const episodes = await Promise.all(slugs.map((slug) => loadEpisode(slug, seriesId)));
  return episodes
    .filter((ep): ep is Episode => ep !== null)
    .sort((a, b) => a.episodeNumber - b.episodeNumber)
    .map((ep) => ({
      id: ep.id,
      episodeNumber: ep.episodeNumber,
      youtubeId: ep.youtubeId,
      title: ep.title,
      thumbnail: ep.thumbnail,
      durationMinutes: ep.durationMinutes,
    }));
}

/** @deprecated use getSeriesEpisodes(seriesId) */
export async function getAllEpisodeListItems(): Promise<EpisodeListItem[]> {
  return getSeriesEpisodes("life");
}

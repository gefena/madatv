import type { Episode, EpisodeListItem } from "@/types/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const episodeModules: Record<string, () => Promise<{ default: any }>> = {
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

export const EPISODE_SLUGS = Object.keys(episodeModules);

export async function getEpisode(slug: string): Promise<Episode | null> {
  const loader = episodeModules[slug];
  if (!loader) return null;
  try {
    const mod = await loader();
    return mod.default as unknown as Episode;
  } catch {
    return null;
  }
}

export async function getAllEpisodeListItems(): Promise<EpisodeListItem[]> {
  const items: EpisodeListItem[] = [];
  for (const slug of EPISODE_SLUGS) {
    const ep = await getEpisode(slug);
    if (!ep) continue;
    items.push({
      id: ep.id,
      episodeNumber: ep.episodeNumber,
      youtubeId: ep.youtubeId,
      title: ep.title,
      thumbnail: ep.thumbnail,
      durationMinutes: ep.durationMinutes,
    });
  }
  return items.sort((a, b) => a.episodeNumber - b.episodeNumber);
}

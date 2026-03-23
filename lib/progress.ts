import type { ProgressStore, EpisodeProgress } from "@/types/content";

const STORAGE_KEY = "life_series_progress";

function getStore(): ProgressStore {
  if (typeof window === "undefined") return { episodes: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { episodes: {} };
  } catch {
    return { episodes: {} };
  }
}

function saveStore(store: ProgressStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getProgress(): ProgressStore {
  return getStore();
}

export function getEpisodeProgress(episodeId: string): EpisodeProgress {
  return getStore().episodes[episodeId] ?? { watched: false };
}

export function markWatched(episodeId: string) {
  const store = getStore();
  store.episodes[episodeId] = {
    ...store.episodes[episodeId],
    watched: true,
  };
  store.lastVisited = episodeId;
  saveStore(store);
}

export function saveQuizScore(
  episodeId: string,
  score: number,
  total: number,
  answers: Record<string, "a" | "b" | "c" | "d">
) {
  const store = getStore();
  const existing = store.episodes[episodeId] ?? { watched: false };
  // Only save if it's a new best score
  if (existing.quizScore === undefined || score > existing.quizScore) {
    store.episodes[episodeId] = {
      ...existing,
      quizScore: score,
      quizTotal: total,
      quizCompletedAt: new Date().toISOString(),
      answers,
    };
    saveStore(store);
  }
}

export function getWatchedCount(episodeIds: string[]): number {
  const store = getStore();
  return episodeIds.filter((id) => store.episodes[id]?.watched).length;
}

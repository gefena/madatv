export interface BilingualText {
  en: string;
  he: string;
}

export interface Term {
  id: string;
  term: BilingualText;
  definition: BilingualText;
  category?: string;
}

export interface TriviaChoice {
  id: "a" | "b" | "c" | "d";
  text: BilingualText;
}

export interface TriviaQuestion {
  id: string;
  question: BilingualText;
  choices: TriviaChoice[];
  correctChoice: "a" | "b" | "c" | "d";
  explanation: BilingualText;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  youtubeId: string;
  videoSources?: string[]; // all known IDs for this episode, primary first
  title: BilingualText;
  summary: BilingualText;
  thumbnail: string;
  durationMinutes: number;
  topics: string[];
  terminology: Term[];
  trivia: TriviaQuestion[];
}

export interface EpisodeListItem {
  id: string;
  episodeNumber: number;
  youtubeId: string;
  title: BilingualText;
  thumbnail: string;
  durationMinutes: number;
}

export type Locale = "en" | "he";

export interface QuizAnswer {
  questionId: string;
  chosen: "a" | "b" | "c" | "d";
  correct: boolean;
}

export interface EpisodeProgress {
  watched: boolean;
  quizScore?: number;
  quizTotal?: number;
  quizCompletedAt?: string;
  answers?: Record<string, "a" | "b" | "c" | "d">;
}

export interface ProgressStore {
  episodes: Record<string, EpisodeProgress>;
  lastVisited?: string;
}

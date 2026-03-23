"use client";

import { useState, useEffect } from "react";
import { useI18n, useBilingual } from "@/lib/i18n";
import { getEpisodeProgress, saveQuizScore, markWatched } from "@/lib/progress";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/components/ui/cn";
import type { TriviaQuestion, Episode } from "@/types/content";

type QuizState = "locked" | "idle" | "active" | "reviewing";

interface TriviaQuizProps {
  episode: Episode;
  initialWatched?: boolean;
}

const CHOICE_COLORS = {
  a: { base: "border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100",   letter: "bg-blue-100 text-blue-700 border-blue-300",   correct: "border-emerald-400 bg-emerald-50", wrong: "border-red-300 bg-red-50" },
  b: { base: "border-purple-200 bg-purple-50 hover:border-purple-400 hover:bg-purple-100", letter: "bg-purple-100 text-purple-700 border-purple-300", correct: "border-emerald-400 bg-emerald-50", wrong: "border-red-300 bg-red-50" },
  c: { base: "border-pink-200 bg-pink-50 hover:border-pink-400 hover:bg-pink-100",   letter: "bg-pink-100 text-pink-700 border-pink-300",   correct: "border-emerald-400 bg-emerald-50", wrong: "border-red-300 bg-red-50" },
  d: { base: "border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100", letter: "bg-amber-100 text-amber-700 border-amber-300", correct: "border-emerald-400 bg-emerald-50", wrong: "border-red-300 bg-red-50" },
} as const;

export function TriviaQuiz({ episode, initialWatched = false }: TriviaQuizProps) {
  const { t } = useI18n();
  const pick = useBilingual();

  const [quizState, setQuizState] = useState<QuizState>("locked");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [selectedAnswer, setSelectedAnswer] = useState<"a" | "b" | "c" | "d" | null>(null);
  const [isWatched, setIsWatched] = useState(initialWatched);

  useEffect(() => {
    const progress = getEpisodeProgress(episode.id);
    if (progress.watched) { setIsWatched(true); setQuizState("idle"); }
  }, [episode.id]);

  useEffect(() => {
    if (isWatched && quizState === "locked") setQuizState("idle");
  }, [isWatched, quizState]);

  const questions = episode.trivia;
  const currentQuestion: TriviaQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleStartQuiz = () => {
    setCurrentIndex(0); setAnswers({}); setSelectedAnswer(null); setQuizState("active");
  };

  const handleSelectAnswer = (choice: "a" | "b" | "c" | "d") => {
    if (selectedAnswer) return;
    setSelectedAnswer(choice);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);
    if (isLastQuestion) {
      const score = questions.reduce((acc, q) => acc + (newAnswers[q.id] === q.correctChoice ? 1 : 0), 0);
      saveQuizScore(episode.id, score, questions.length, newAnswers);
      setQuizState("reviewing");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
  };

  const finalScore = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctChoice ? 1 : 0), 0);
  const scorePercent = (finalScore / questions.length) * 100;
  const grade = scorePercent >= 80 ? t("quiz.grade.excellent") : scorePercent >= 60 ? t("quiz.grade.good") : t("quiz.grade.keepWatching");
  const gradeEmoji = scorePercent >= 80 ? "🏆" : scorePercent >= 60 ? "🌟" : "💪";

  // ---- LOCKED ----
  if (quizState === "locked") {
    return (
      <div className="rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-5 sm:p-8 text-center">
        <div className="text-5xl mb-3">🔒</div>
        <h3 className="text-lg font-black text-indigo-700 mb-1">{t("quiz.lockedTitle")}</h3>
        <p className="text-sm font-semibold text-indigo-400 mb-5">{t("quiz.lockedDesc")}</p>
        <Button variant="ghost" size="sm" onClick={() => { markWatched(episode.id); setIsWatched(true); setQuizState("idle"); }}>
          🔓 {t("quiz.unlockQuiz")}
        </Button>
      </div>
    );
  }

  // ---- IDLE ----
  if (quizState === "idle") {
    return (
      <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 sm:p-6 shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="text-4xl sm:text-5xl">🧩</div>
          <div className="flex-1">
            <h3 className="font-black text-indigo-800 text-base sm:text-lg">{t("quiz.title")}</h3>
            <p className="text-sm font-semibold text-gray-500 mt-0.5">{t("quiz.subtitle")}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
                🎯 {questions.length} {t("quiz.title")}
              </span>
            </div>
          </div>
          <Button onClick={handleStartQuiz} size="lg" className="w-full sm:w-auto">
            🚀 {t("quiz.startQuiz")}
          </Button>
        </div>
      </div>
    );
  }

  // ---- ACTIVE ----
  if (quizState === "active") {
    const progressPercent = (currentIndex / questions.length) * 100;
    const isCorrect = selectedAnswer === currentQuestion.correctChoice;

    return (
      <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 sm:p-6 shadow-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="rounded-2xl bg-indigo-100 px-3 py-1.5 text-sm font-black text-indigo-700">
            ❓ {t("quiz.question", { current: currentIndex + 1, total: questions.length })}
          </span>
          <span className="text-sm font-black text-indigo-400">{Math.round(progressPercent)}%</span>
        </div>
        <ProgressBar value={progressPercent} className="h-2.5 mb-5" color="indigo" />

        {/* Question */}
        <p className="text-sm sm:text-base font-black text-gray-800 mb-5 leading-relaxed">
          {pick(currentQuestion.question)}
        </p>

        {/* Choices */}
        <div className="grid gap-3 sm:grid-cols-2">
          {currentQuestion.choices.map((choice) => {
            const c = CHOICE_COLORS[choice.id];
            const isSelected = selectedAnswer === choice.id;
            const isThisCorrect = choice.id === currentQuestion.correctChoice;
            const showResult = selectedAnswer !== null;

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectAnswer(choice.id)}
                disabled={!!selectedAnswer}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 p-3.5 text-start transition-all duration-200 font-semibold",
                  !showResult && c.base,
                  showResult && isThisCorrect && "border-emerald-400 bg-emerald-50",
                  showResult && isSelected && !isThisCorrect && "border-red-300 bg-red-50",
                  showResult && !isSelected && !isThisCorrect && "opacity-40",
                )}
              >
                <span className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 text-sm font-black uppercase",
                  !showResult && c.letter,
                  showResult && isThisCorrect && "border-emerald-500 bg-emerald-100 text-emerald-700",
                  showResult && isSelected && !isThisCorrect && "border-red-400 bg-red-100 text-red-600",
                )}>
                  {showResult && isThisCorrect ? "✓" : showResult && isSelected && !isThisCorrect ? "✗" : choice.id.toUpperCase()}
                </span>
                <span className="text-xs sm:text-sm text-gray-800 break-words">{pick(choice.text)}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback + Next */}
        {selectedAnswer && (
          <div className="mt-5 space-y-3">
            <div className={cn(
              "rounded-2xl border-2 p-4",
              isCorrect ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
            )}>
              <p className="text-sm font-black mb-1">
                {isCorrect ? "✅ " + t("quiz.correct") : "❌ " + t("quiz.incorrect")}
              </p>
              <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                {pick(currentQuestion.explanation)}
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {isLastQuestion ? "🏁 " + t("quiz.seeResults") : t("quiz.nextQuestion") + " →"}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- REVIEWING ----
  return (
    <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 sm:p-6 shadow-card">
      {/* Big score */}
      <div className="text-center mb-6">
        <div className="text-4xl sm:text-6xl mb-2">{gradeEmoji}</div>
        <div className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 sm:border-4 border-indigo-200 bg-indigo-50 mb-3">
          <span className="text-xl font-black text-indigo-700">{finalScore}/{questions.length}</span>
        </div>
        <p className="text-lg sm:text-xl font-black text-indigo-800">{grade}</p>
        <ProgressBar
          value={scorePercent}
          className="mt-3 h-3 max-w-xs mx-auto"
          color={scorePercent >= 80 ? "emerald" : "indigo"}
        />
      </div>

      {/* Per-question review */}
      <div className="space-y-2 mb-5">
        {questions.map((q, i) => {
          const correct = answers[q.id] === q.correctChoice;
          return (
            <div key={q.id} className={cn(
              "flex items-center gap-3 rounded-2xl border-2 p-3",
              correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
            )}>
              <span className="text-lg">{correct ? "✅" : "❌"}</span>
              <p className="text-xs font-bold text-gray-700 flex-1">{pick(q.question)}</p>
              <span className="text-xs font-black text-gray-400 shrink-0">Q{i + 1}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={handleStartQuiz}>🔄 {t("quiz.retake")}</Button>
      </div>
    </div>
  );
}

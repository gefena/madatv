import { cn } from "./cn";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  color?: "indigo" | "emerald" | "violet" | "rainbow";
}

export function ProgressBar({ value, className, color = "indigo" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full bg-indigo-100 rounded-full overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", {
          "bg-gradient-to-r from-indigo-400 to-purple-500": color === "indigo",
          "bg-gradient-to-r from-emerald-400 to-green-500": color === "emerald",
          "bg-gradient-to-r from-violet-400 to-purple-500": color === "violet",
          "bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400": color === "rainbow",
        })}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

import { cn } from "./cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "cyan" | "violet" | "outline" | "warning";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold",
        {
          "bg-indigo-100 text-indigo-700": variant === "default",
          "bg-emerald-100 text-emerald-700": variant === "success",
          "bg-cyan-100 text-cyan-700": variant === "cyan",
          "bg-violet-100 text-violet-700": variant === "violet",
          "border-2 border-indigo-200 text-indigo-600": variant === "outline",
          "bg-amber-100 text-amber-700": variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}

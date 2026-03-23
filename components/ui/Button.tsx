import { cn } from "./cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "success" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
        {
          "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5": variant === "primary",
          "bg-indigo-100 hover:bg-indigo-200 text-indigo-700": variant === "secondary",
          "hover:bg-indigo-50 text-indigo-500 hover:text-indigo-700": variant === "ghost",
          "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white shadow-lg shadow-emerald-200 hover:-translate-y-0.5": variant === "success",
          "border-2 border-indigo-200 hover:border-indigo-400 text-indigo-600 hover:bg-indigo-50": variant === "outline",
          "bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-lg shadow-red-200": variant === "danger",
        },
        {
          "text-xs px-3 py-2 sm:py-1.5": size === "sm",
          "text-sm px-5 py-2.5": size === "md",
          "text-base px-7 py-3.5": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

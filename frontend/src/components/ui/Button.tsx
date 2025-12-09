import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-indigo-500 text-slate-950 shadow-sm hover:bg-indigo-400",
        variant === "ghost" &&
          "border border-slate-700 bg-slate-900/60 text-slate-100 hover:border-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

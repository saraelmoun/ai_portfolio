"use client";

import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

export default function ShimmerButton({
  children,
  href = "#",
  className = "",
}: ShimmerButtonProps) {
  return (
    <a href={href} className={`group relative inline-flex ${className}`}>
      {/* Spinning conic gradient border — emerald */}
      <div className="absolute -inset-[1px] rounded-full bg-[conic-gradient(from_90deg_at_50%_50%,#6ee7b7_0%,#065f46_50%,#6ee7b7_100%)] animate-[spin_3s_linear_infinite] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Inner button */}
      <div className="relative h-12 w-full rounded-full bg-[#030712] backdrop-blur-3xl flex items-center justify-center gap-2 px-8 text-sm font-medium text-emerald-100 font-mono">
        {children}
      </div>
    </a>
  );
}

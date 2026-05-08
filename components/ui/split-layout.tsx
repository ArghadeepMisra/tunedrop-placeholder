import { type ReactNode } from "react";

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
  className?: string;
}

export default function SplitLayout({
  left,
  right,
  reverse = false,
  className = "",
}: SplitLayoutProps) {
  const first = reverse ? right : left;
  const second = reverse ? left : right;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-[4fr_8fr] items-center gap-8 ${className}`}>
      <div className={`${reverse ? "w-full" : "max-w-xl"}`}>{first}</div>
      <div className={`${reverse ? "max-w-xl" : "w-full"}`}>{second}</div>
    </div>
  );
}

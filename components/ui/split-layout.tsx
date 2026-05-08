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
    <div className={`grid grid-cols-1 md:grid-cols-2 items-center gap-12 ${className}`}>
      <div className="flex flex-col items-center text-center md:text-left md:items-start">{first}</div>
      <div className="flex flex-col items-center">{second}</div>
    </div>
  );
}

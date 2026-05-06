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
  const orderClass = reverse
    ? "flex-col md:flex-row-reverse"
    : "flex-col md:flex-row";

  return (
    <div
      className={`flex ${orderClass} items-center gap-16 ${className}`}
    >
      <div className="flex-1 max-w-xl">{left}</div>
      <div className="flex-1 flex justify-center">{right}</div>
    </div>
  );
}

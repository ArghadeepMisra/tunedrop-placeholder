import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Section({
  children,
  className = "",
  as: Component = "section",
}: SectionProps) {
  const Tag = Component as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`py-28 px-6 md:px-12 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </Tag>
  );
}

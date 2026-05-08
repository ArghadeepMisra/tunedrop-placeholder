"use client";

import { useRef, useState, type ReactNode } from "react";

export default function TiltBox({ children, className = "", defaultRotateY = 0 }: { children: ReactNode; className?: string; defaultRotateY?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateY, setRotateY] = useState(defaultRotateY);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    setRotateY(cx * 16);
  };

  const handleMouseLeave = () => setRotateY(defaultRotateY);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        className={className}
        style={{
          transform: `rotateY(${rotateY}deg)`,
          transition: "transform 0.08s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  );
}

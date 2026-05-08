"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const dismiss = () => {
      setExiting(true);
    };

    // Safety timeout — always dismiss after 4s
    timerRef.current = setTimeout(dismiss, 4000);

    if (document.readyState === "complete") {
      setTimeout(dismiss, 300);
      return () => clearTimeout(timerRef.current);
    }

    window.addEventListener("load", () => setTimeout(dismiss, 300));

    return () => clearTimeout(timerRef.current);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 transition-opacity duration-500 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      onTransitionEnd={() => {
        if (exiting) setDismissed(true);
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Tunedrop
        </span>

        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-brand animate-ping-slow"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

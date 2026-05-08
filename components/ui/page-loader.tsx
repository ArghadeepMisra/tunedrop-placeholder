"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dismiss = () => setLoading(false);

    // Safety timeout — always dismiss after 3s even if load never fires
    const safety = setTimeout(dismiss, 3000);

    if (document.readyState === "complete") {
      // Page already loaded — brief delay for paint
      setTimeout(dismiss, 200);
      return () => clearTimeout(safety);
    }

    window.addEventListener("load", () => setTimeout(dismiss, 200));
    return () => {
      clearTimeout(safety);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950">
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

"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Articles page error:", error);
  return (
    <main className="bg-neutral-950 text-white w-full min-h-screen">
      <header className="px-6 md:px-12 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-brand transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-24 pb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          Something went wrong.
        </h1>
        <p className="text-lg text-white/50 mb-8">
          We couldn&apos;t load the articles right now. The backend may be unreachable.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-brand/30 bg-white/5 backdrop-blur-sm text-white hover:bg-brand/10 hover:border-brand/50 hover:shadow-[0_0_30px_rgba(24,119,242,0.3)] transition-all duration-150"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

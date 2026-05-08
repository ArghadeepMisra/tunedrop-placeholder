import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ArticlesLoading() {
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

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <div className="h-14 w-96 rounded-lg bg-white/5 animate-pulse mb-4" />
        <div className="h-6 w-72 rounded-lg bg-white/5 animate-pulse mb-12" />

        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
            >
              <div className="flex gap-2 mb-4">
                <div className="h-5 w-16 rounded-full bg-white/10 animate-pulse" />
                <div className="h-5 w-20 rounded-full bg-white/10 animate-pulse" />
              </div>
              <div className="h-7 w-64 rounded bg-white/10 animate-pulse mb-3" />
              <div className="h-5 w-full rounded bg-white/10 animate-pulse mb-2" />
              <div className="h-5 w-3/4 rounded bg-white/10 animate-pulse mb-6" />
              <div className="flex gap-4">
                <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

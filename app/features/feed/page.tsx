import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Users, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Dynamic Feed | Tunedrop",
  description:
    "A social feed for music. See playlists and songs from people you follow, blended with trending picks from across Tunedrop.",
};

export default function FeedFeaturePage() {
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

      <div className="max-w-3xl mx-auto px-6 md:px-12 pt-8 pb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-8">
          Dynamic Feed
        </h1>

        <p className="text-lg text-white/50 leading-relaxed mb-12">
          Tunedrop&apos;s feed combines content from people you follow with trending
          picks from the wider community. It refreshes continuously so there&apos;s
          always something new to discover without scrolling past stale posts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Follow Creators",
              body: "Curate your feed by following tastemakers, artists, and friends who share music you love.",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Trending Picks",
              body: "Discover what's resonating across the platform — popular playlists and tracks surfaced by the community.",
            },
            {
              icon: <RefreshCw className="w-6 h-6" />,
              title: "Always Fresh",
              body: "The feed re-ranks regularly. No dead scroll. Every visit surfaces something worth hearing.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-brand/15 flex items-center justify-center mb-4 text-brand-light">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-white/30 text-sm">
            The feed will be the first thing you see when you open Tunedrop.
            Personalized, music-first, and built for discovery.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-white/30 text-sm">
          <span>© 2026 Tunedrop</span>
          <Link href="/" className="hover:text-brand transition-colors">
            tunedrop.org
          </Link>
        </div>
      </div>
    </main>
  );
}

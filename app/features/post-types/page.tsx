import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, List, Music, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Post Types | Tunedrop",
  description:
    "Three ways to post on Tunedrop. Share a full playlist, drop a single track with a preview, or post an image.",
};

const postTypes = [
  {
    icon: <List className="w-5 h-5" />,
    title: "Playlist",
    tagline: "Share a full playlist",
    body: "Curate a sequence of tracks with a cover image, title, and description. Listeners can preview each song and save the whole playlist to their library. Perfect for mixtapes, mood boards, and curated collections.",
  },
  {
    icon: <Music className="w-5 h-5" />,
    title: "Song",
    tagline: "Drop a single track, 30-second preview included",
    body: "Post one track with an auto-generated 30-second clip. Followers can hear the highlight instantly and save it to their library in one tap. Ideal for sharing what you're listening to right now.",
  },
  {
    icon: <ImageIcon className="w-5 h-5" />,
    title: "Image",
    tagline: "Post album art, your setup, or a concert photo",
    body: "Share a visual moment from your music life. Vinyl shots, desk setups, festival photos — anything that tells the story behind the sound. Images sit naturally alongside playlists and songs in the feed.",
  },
];

export default function PostTypesFeaturePage() {
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
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Post Types
        </h1>
        <p className="text-lg text-white/50 leading-relaxed mb-12">
          Three formats, one feed. Every post type is designed to feel native to a music-first
          social experience.
        </p>

        <div className="flex flex-col gap-6 mb-16">
          {postTypes.map((pt) => (
            <div
              key={pt.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
            >
              <div className="w-10 h-10 rounded-lg bg-brand/15 flex items-center justify-center mb-3 text-brand-light">
                {pt.icon}
              </div>
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-xl font-bold text-white">{pt.title}</h3>
                <span className="text-sm text-white/30">{pt.tagline}</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xl">{pt.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
          <p className="text-white/30 text-sm">
            Each post type gets its own layout treatment in the feed — so a playlist
            card feels different from a song card, but the feed stays visually cohesive.
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

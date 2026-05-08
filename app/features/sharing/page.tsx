import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Link Previews | Tunedrop",
  description:
    "Every Tunedrop link renders a rich preview on WhatsApp, Twitter, Discord, and iMessage. Your music makes a first impression before anyone even taps.",
};

const platforms = [
  {
    name: "WhatsApp",
    body: "Rich card with cover art, playlist title, song count, and creator name. Tapping the link opens the full post in Tunedrop.",
  },
  {
    name: "iMessage",
    body: "Inline preview with artwork, title, and a play button. Recipients can preview the content without leaving the conversation.",
  },
  {
    name: "Twitter / X",
    body: "Large summary card with cover image, title, description, and a direct link. Stands out in the timeline alongside other media.",
  },
  {
    name: "Discord",
    body: "Embed with thumbnail, title, and metadata. Clean preview that fits naturally in chat channels and DMs.",
  },
];

export default function SharingFeaturePage() {
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
          Link Previews
        </h1>

        <p className="text-lg text-white/50 leading-relaxed mb-12">
          Every playlist, song, and post on Tunedrop gets a unique URL. When you
          share that link on messaging apps or social platforms, it renders a rich
          preview — cover art, title, and creator name — so your music makes an
          impression before anyone taps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="text-white font-semibold mb-2">{p.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 p-6 rounded-2xl border border-brand/10 bg-brand/[0.03]">
          <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand-light shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white/60 text-sm leading-relaxed">
              Links are powered by Open Graph meta tags. When you post, Tunedrop
              auto-generates the metadata so every platform displays your content
              correctly — no manual setup needed.
            </p>
          </div>
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

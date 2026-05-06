"use client";

import { Heart, MessageCircle, Share2, Music } from "lucide-react";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";

function PlaylistCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-brand/20 bg-white/5 backdrop-blur-sm p-5 w-full max-w-sm">
      {/* gradient glow border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/10 via-transparent to-brand-darker/10 pointer-events-none" />

      {/* Cover art placeholder */}
      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-brand-dark via-brand to-brand-darker mb-4 flex items-center justify-center">
        <Music className="w-16 h-16 text-white/30" />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="font-bold text-white text-lg leading-tight">Chill Night</p>
          <p className="text-white/40 text-sm mt-0.5">by @mira · 12 songs</p>
        </div>
        <span className="text-xs bg-brand/20 text-brand-light border border-brand/30 rounded-full px-2 py-0.5 font-medium mt-1">
          Playlist
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 mt-4 text-white/40">
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm"
          aria-label="Like playlist"
        >
          <Heart className="w-4 h-4" /> 148
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm"
          aria-label="Comment on playlist"
        >
          <MessageCircle className="w-4 h-4" /> 23
        </button>
        <button
          className="flex items-center gap-1.5 hover:text-brand transition-colors text-sm ml-auto"
          aria-label="Share playlist"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Feed() {
  return (
    <Section>
      <SplitLayout
        left={
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Your feed, but for{" "}
              <span className="text-brand">sharing music.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              See playlists and songs from people you follow, blended with
              trending picks from across Tunedrop.{" "}
              <span className="text-white/80">Dynamic Feed</span> keeps it fresh
              so you always have something new to discover.
            </p>
          </ScrollReveal>
        }
        right={
          <ScrollReveal animation="fadeUpLarge" delay={0.15} duration={0.7}>
            <PlaylistCard />
          </ScrollReveal>
        }
      />
    </Section>
  );
}

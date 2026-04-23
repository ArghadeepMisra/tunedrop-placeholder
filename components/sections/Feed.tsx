"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Music } from "lucide-react";

function PlaylistCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1877F2]/20 bg-white/5 backdrop-blur-sm p-5 w-full max-w-sm">
      {/* gradient glow border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1877F2]/10 via-transparent to-[#0D47A1]/10 pointer-events-none" />

      {/* Cover art placeholder */}
      <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-[#1565C0] via-[#1877F2] to-[#0D47A1] mb-4 flex items-center justify-center">
        <Music className="w-16 h-16 text-white/30" />
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <p className="font-bold text-white text-lg leading-tight">Chill Night</p>
          <p className="text-white/40 text-sm mt-0.5">by @mira · 12 songs</p>

        </div>
        <span className="text-xs bg-[#1877F2]/20 text-[#60A5FA] border border-[#1877F2]/30 rounded-full px-2 py-0.5 font-medium mt-1">
          Playlist
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 mt-4 text-white/40">
        <button className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors text-sm">
          <Heart className="w-4 h-4" /> 148
        </button>
        <button className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors text-sm">
          <MessageCircle className="w-4 h-4" /> 23
        </button>
        <button className="flex items-center gap-1.5 hover:text-[#1877F2] transition-colors text-sm ml-auto">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Feed() {
  return (
    <section className="py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Left text */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Your feed, but for{" "}
            <span className="text-[#1877F2]">sharing music.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            See playlists and songs from people you follow, blended with
            trending picks from across Tunedrop.{" "}
            <span className="text-white/80">Dynamic Feed</span> keeps it fresh
            so you always have something new to discover.
          </p>
        </motion.div>

        {/* Right card */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <PlaylistCard />
        </motion.div>
      </div>
    </section>
  );
}

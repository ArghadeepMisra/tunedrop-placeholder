"use client";

import { motion } from "framer-motion";
import { List, Music, Image as ImageIcon } from "lucide-react";

type PostCardProps = {
  icon: React.ReactNode;
  label: string;
  title: string;
  sub: string;
  badge?: string;
  delay?: number;
};

function PostCard({ icon, label, title, sub, badge, delay = 0 }: PostCardProps) {
  return (
    <motion.div
      className="flex items-center gap-4 rounded-2xl border border-[#1877F2]/15 bg-white/[0.03] backdrop-blur-sm p-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1565C0]/60 to-[#0D47A1]/60 flex items-center justify-center shrink-0">
        <span className="text-[#60A5FA]">{icon}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-[#1877F2] font-medium uppercase tracking-widest">
            {label}
          </span>
          {badge && (
            <span className="text-[10px] bg-[#1877F2]/20 text-[#60A5FA] border border-[#1877F2]/30 rounded-full px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>
        <p className="text-white font-semibold text-sm truncate">{title}</p>
        <p className="text-white/40 text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function PostTypes() {
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
            Playlists. Songs.{" "}
            <span className="text-[#1877F2]">Vibes.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Three ways to post. Share a full playlist, drop a single track with
            a 30-second preview, or post an image: album art, your setup, a
            concert photo. Every post feels right at home in the feed.
          </p>
        </motion.div>

        {/* Right cards */}
        <div className="flex-1 flex flex-col gap-4 w-full max-w-sm">
          <PostCard
            icon={<List className="w-6 h-6" />}
            label="Playlist"
            title="Late Night Lo-fi"
            sub="18 songs · 1h 12m"
            delay={0}
          />
          <PostCard
            icon={<Music className="w-6 h-6" />}
            label="Song"
            title="Nuvole Bianche"
            sub="3:55 · Ludovico Einaudi"
            badge="30s preview"
            delay={0.1}
          />
          <PostCard
            icon={<ImageIcon className="w-6 h-6" />}
            label="Image"
            title="Current setup 🎧"
            sub="4:3 · by @jordyn"
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

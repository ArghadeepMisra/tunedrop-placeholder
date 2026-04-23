"use client";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

type Platform = {
  name: string;
  color: string;
  ring: string;
  label: string;
  href: string;
};

const platforms: Platform[] = [
  {
    name: "Spotify",
    color: "from-green-500 to-green-700",
    ring: "bg-green-500/30",
    label: "Daft Punk on Spotify",
    href: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi",
  },
  {
    name: "Apple Music",
    color: "from-pink-500 to-rose-700",
    ring: "bg-pink-500/30",
    label: "Daft Punk on Apple Music",
    href: "https://music.apple.com/us/artist/daft-punk/5468295",
  },
  {
    name: "YouTube Music",
    color: "from-red-500 to-red-700",
    ring: "bg-red-500/30",
    label: "Daft Punk on YouTube Music",
    href: "https://music.youtube.com/search?q=daft+punk",
  },
];

function PlatformPill({ platform }: { platform: Platform }) {
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5 cursor-pointer group"
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Ripple ring */}
      <span
        className={`absolute inset-0 rounded-2xl ${platform.ring} opacity-0 group-hover:opacity-100 animate-ping-slow`}
      />

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shrink-0`}
      >
        <Music className="w-5 h-5 text-white" />
      </div>

      <div>
        <p className="text-white font-semibold text-sm">{platform.name}</p>
        <p className="text-white/40 text-xs">{platform.label}</p>
      </div>

      {/* Arrow */}
      <span className="ml-auto text-white/20 group-hover:text-[#1877F2] transition-colors text-lg">
        →
      </span>
    </motion.a>
  );
}

export default function StreamingApps() {
  return (
    <section className="py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Text */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            One tap to your{" "}
            <span className="text-[#1877F2]">library.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Found something you love in the feed? One tap sends it straight to
            Spotify, Apple Music, or YouTube Music. Tunedrop connects the social
            layer to wherever you actually listen.
          </p>
        </motion.div>

        {/* Platforms */}
        <motion.div
          className="flex-1 flex flex-col gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {platforms.map((p) => (
            <PlatformPill key={p.name} platform={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

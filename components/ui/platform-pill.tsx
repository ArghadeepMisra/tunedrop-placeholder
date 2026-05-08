"use client";

import { Music } from "lucide-react";
import { motion } from "framer-motion";
import { type Platform } from "@/lib/constants";

const PILL_TRANSITION = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function PlatformPill({ platform }: { platform: Platform }) {
  return (
    <motion.a
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/10 bg-white/5 cursor-pointer group shadow-[0_0_30px_rgba(24,119,242,0.1)]"
      whileHover={{ scale: 1.04 }}
      transition={PILL_TRANSITION}
    >
      <span
        className={`absolute inset-0 rounded-2xl ${platform.ring} opacity-0 group-hover:opacity-100 animate-ping-slow`}
      />
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shrink-0`}
      >
        <Music className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-white font-semibold text-sm">{platform.name}</p>
        <p className="text-white/40 text-xs">{platform.label}</p>
      </div>
      <span className="ml-auto text-white/20 group-hover:text-brand transition-colors text-lg">
        →
      </span>
    </motion.a>
  );
}

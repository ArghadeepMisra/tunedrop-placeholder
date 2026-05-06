"use client";

import { Music } from "lucide-react";
import { motion } from "framer-motion";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { platforms, type Platform } from "@/lib/constants";

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
      <span className="ml-auto text-white/20 group-hover:text-brand transition-colors text-lg">
        →
      </span>
    </motion.a>
  );
}

export default function StreamingApps() {
  return (
    <Section>
      <SplitLayout
        left={
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              One tap to your{" "}
              <span className="text-brand">library.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Found something you love in the feed? One tap sends it straight to
              Spotify, Apple Music, or YouTube Music. Tunedrop connects the social
              layer to wherever you actually listen.
            </p>
          </ScrollReveal>
        }
        right={
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              {platforms.map((p) => (
                <PlatformPill key={p.name} platform={p} />
              ))}
            </div>
          </ScrollReveal>
        }
      />
    </Section>
  );
}

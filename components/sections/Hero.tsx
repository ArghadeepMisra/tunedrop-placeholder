"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { globeConfig, arcData } from "@/lib/globe-data";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

export default function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Globe — full-bleed background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-end pr-0 pointer-events-none">
          <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-brand/12 blur-[100px] translate-x-1/4" />
        </div>

        {/* Canvas */}
        <div className="absolute inset-0">
          <World globeConfig={globeConfig} data={arcData} />
        </div>

        {/* Left fade — protects text legibility */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
      </motion.div>

      {/* Nav */}
      <nav className="relative z-10 px-6 md:px-12 py-6">
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Tunedrop
        </span>
      </nav>

      {/* Text overlay — left aligned, sits over the globe */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 pb-16 md:pb-24">
        <motion.div
          className="flex flex-col gap-6 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Share the music{" "}
            <span className="text-brand drop-shadow-[0_0_32px_rgba(24,119,242,0.6)] hover:drop-shadow-[0_0_48px_rgba(24,119,242,0.9)] transition-all duration-500 cursor-default">
              you want the world to listen.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            A social feed for music only.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="/articles"
              className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-brand/30 bg-white/5 backdrop-blur-sm text-white text-lg font-semibold overflow-hidden group hover:border-brand/50 hover:shadow-[0_0_40px_rgba(24,119,242,0.35)] hover:text-brand-light transition-all duration-300"
            >
              {/* Animated ripple ring */}
              <span className="absolute inset-0 rounded-full border border-brand/40 opacity-0 group-hover:opacity-100 animate-ping-slow" />

              <span className="relative">Read Articles Till Release</span>
              <span className="relative text-white/40 group-hover:text-brand-light transition-colors">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

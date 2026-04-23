"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";


export default function FinalCTA() {
  return (
    <section className="py-32 px-6 md:px-12">
      {/* CTA block */}
      <motion.div
        className="max-w-3xl mx-auto flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white relative z-20">
          Drop in.
        </h2>

        {/* Sparkles strip with subtext overlaid */}
        <div className="w-[40rem] max-w-full h-40 relative mt-8">
          {/* Gradient lines */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-[#1877F2] to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-[#60A5FA] to-transparent h-px w-1/4" />

          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial mask to feather edges */}
          <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />

          {/* Subtext sitting on top of the stars */}
          <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-semibold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] z-20 pointer-events-none">
            Coming soon to tunedrop.org.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="mt-24 border-t border-white/8" />

      {/* Footer */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-white/30 text-sm">
        <span>© 2026 Tunedrop</span>
      </div>
    </section>
  );
}

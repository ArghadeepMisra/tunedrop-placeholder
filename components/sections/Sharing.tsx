"use client";

import { motion } from "framer-motion";
import { Link } from "lucide-react";

function WhatsAppBubble() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {/* Chat header */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1877F2] to-[#1565C0] flex items-center justify-center text-xs font-bold text-white">
          M
        </div>
        <span className="text-white/50 text-sm">mira sent a link</span>
      </div>

      {/* WhatsApp bubble */}
      <div className="bg-[#1f2c34] rounded-2xl rounded-tl-sm overflow-hidden w-full shadow-xl">
        {/* Rich preview thumbnail */}
        <div className="w-full h-36 bg-gradient-to-br from-[#1565C0] via-[#1877F2] to-[#0D47A1] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative text-center">
            <div className="text-3xl mb-1">🎵</div>
            <p className="text-white/80 text-xs font-medium">Chill Night</p>
          </div>
        </div>

        {/* Link preview meta */}
        <div className="px-4 py-3 bg-[#182229]">
          <div className="flex items-center gap-1 text-[#1877F2] text-[10px] mb-1.5">
            <Link className="w-2.5 h-2.5" />
            tunedrop.org
          </div>
          <p className="text-white text-sm font-semibold leading-snug">
            Chill Night · 12 songs
          </p>
          <p className="text-white/40 text-xs mt-1">
            curated by @mira · Tunedrop
          </p>
        </div>

        {/* Timestamp */}
        <div className="px-4 py-3 bg-[#1f2c34]">
          <p className="text-white/25 text-[10px] text-right">11:42 PM ✓✓</p>
        </div>
      </div>
    </div>
  );
}

export default function Sharing() {
  return (
    <section className="py-28 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
        {/* Text */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Share anywhere.{" "}
            <span className="text-[#1877F2]">Look good everywhere.</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed">
            Every Tunedrop link renders a rich preview on WhatsApp, Twitter,
            Discord, and iMessage: cover art, title, creator name. Your music
            makes a first impression before anyone even taps.
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <WhatsAppBubble />
        </motion.div>
      </div>
    </section>
  );
}

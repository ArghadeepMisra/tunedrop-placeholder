"use client";

import { useMemo } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import Section from "@/components/ui/section";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function FinalCTA() {
  // Reduce sparkles density on mobile for performance
  const particleDensity = useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return 600;
    }
    return 1200;
  }, []);

  return (
    <Section className="py-32">
      {/* CTA block */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white relative z-20">
            Drop in.
          </h2>

          {/* Sparkles strip with subtext overlaid */}
          <div className="w-[40rem] max-w-full h-40 relative mt-8">
            {/* Gradient lines */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-brand to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-brand to-transparent h-px w-3/4" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-brand-light to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-brand-light to-transparent h-px w-1/4" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={particleDensity}
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
        </div>
      </ScrollReveal>

      {/* Divider */}
      <div className="mt-24 border-t border-white/10" />

      {/* Footer */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-white/30 text-sm">
        <span>© 2026 Tunedrop</span>
      </div>
    </Section>
  );
}

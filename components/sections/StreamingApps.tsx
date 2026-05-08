import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TiltBox from "@/components/ui/tilt-box";
import PlatformPill from "@/components/ui/platform-pill";
import { platforms } from "@/lib/constants";

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
            <TiltBox defaultRotateY={-10}>
              <div className="flex flex-col gap-3 w-full max-w-md">
                {platforms.map((p) => (
                  <PlatformPill key={p.name} platform={p} />
                ))}
                <p className="text-green-400 text-xs text-center mt-4 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all">Click to Open App</p>
              </div>
            </TiltBox>
          </ScrollReveal>
        }
      />
    </Section>
  );
}

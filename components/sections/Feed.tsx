import Link from "next/link";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import PlaylistCard from "@/components/ui/playlist-card";
import TiltBox from "@/components/ui/tilt-box";

export default function Feed() {
  return (
    <Section>
      <SplitLayout
        left={
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Your feed, but for{" "}
              <span className="text-brand">sharing music.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              See playlists and songs from people you follow, blended with
              trending picks from across Tunedrop.{" "}
              <span className="text-white/80">Dynamic Feed</span> keeps it fresh
              so you always have something new to discover.
            </p>
          </ScrollReveal>
        }
        right={
          <ScrollReveal animation="fadeUpLarge" delay={0.15} duration={0.7}>
            <Link href="/features/feed" className="block group">
              <TiltBox defaultRotateY={-10}>
                <div className="w-full max-w-md">
                  <PlaylistCard />
                  <p className="text-green-400 text-xs text-center mt-4 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all">click to view</p>
                </div>
              </TiltBox>
            </Link>
          </ScrollReveal>
        }
      />
    </Section>
  );
}

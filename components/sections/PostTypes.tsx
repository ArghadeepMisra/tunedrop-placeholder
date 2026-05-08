import Link from "next/link";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import PostCard from "@/components/ui/post-card";
import TiltBox from "@/components/ui/tilt-box";
import { postCards } from "@/lib/constants";

export default function PostTypes() {
  return (
    <Section>
      <SplitLayout
        left={
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Playlists. Songs.{" "}
              <span className="text-brand">Vibes.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Three ways to post. Share a full playlist, drop a single track with
              a 30-second preview, or post an image: album art, your setup, a
              concert photo. Every post feels right at home in the feed.
            </p>
          </ScrollReveal>
        }
        right={
          <ScrollReveal delay={0.15}>
            <TiltBox defaultRotateY={-10}>
              <div className="flex flex-col gap-3 w-full max-w-lg">
                {postCards.map((card) => (
                  <Link key={card.title} href="/features/post-types" className="block group">
                    <PostCard
                      iconKey={card.iconKey}
                      label={card.label}
                      title={card.title}
                      sub={card.sub}
                      badge={card.badge}
                      delay={card.delay}
                    />
                  </Link>
                ))}
                <p className="text-green-400 text-xs text-center mt-4 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all">click to view</p>
              </div>
            </TiltBox>
          </ScrollReveal>
        }
      />
    </Section>
  );
}

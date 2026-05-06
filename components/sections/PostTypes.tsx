"use client";

import { motion } from "framer-motion";
import { List, Music, Image as ImageIcon } from "lucide-react";
import { type ReactNode } from "react";
import Section from "@/components/ui/section";
import SplitLayout from "@/components/ui/split-layout";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { postCards } from "@/lib/constants";

const iconMap: Record<string, ReactNode> = {
  List: <List className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Image: <ImageIcon className="w-6 h-6" />,
};

type PostCardProps = {
  iconKey: string;
  label: string;
  title: string;
  sub: string;
  badge?: string;
  delay?: number;
};

function PostCard({ iconKey, label, title, sub, badge, delay = 0 }: PostCardProps) {
  return (
    <motion.div
      className="flex items-center gap-4 rounded-2xl border border-brand/15 bg-white/[0.03] backdrop-blur-sm p-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-dark/60 to-brand-darker/60 flex items-center justify-center shrink-0">
        <span className="text-brand-light">{iconMap[iconKey]}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs text-brand font-medium uppercase tracking-widest">
            {label}
          </span>
          {badge && (
            <span className="text-[10px] bg-brand/20 text-brand-light border border-brand/30 rounded-full px-1.5 py-0.5">
              {badge}
            </span>
          )}
        </div>
        <p className="text-white font-semibold text-sm truncate">{title}</p>
        <p className="text-white/40 text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

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
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {postCards.map((card) => (
              <PostCard
                key={card.title}
                iconKey={card.iconKey}
                label={card.label}
                title={card.title}
                sub={card.sub}
                badge={card.badge}
                delay={card.delay}
              />
            ))}
          </div>
        }
      />
    </Section>
  );
}

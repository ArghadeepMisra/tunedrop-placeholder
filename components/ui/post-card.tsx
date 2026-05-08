"use client";

import { motion } from "framer-motion";
import { List, Music, Image as ImageIcon } from "lucide-react";
import { type ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  List: <List className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Image: <ImageIcon className="w-6 h-6" />,
};

const MOTION_INITIAL = { opacity: 0, y: 20 };
const MOTION_VISIBLE = { opacity: 1, y: 0 };
const MOTION_HOVER = { scale: 1.02 };
const MOTION_VIEWPORT = { once: true };

export type PostCardProps = {
  iconKey: string;
  label: string;
  title: string;
  sub: string;
  badge?: string;
  delay?: number;
  className?: string;
};

export default function PostCard({ iconKey, label, title, sub, badge, delay = 0, className = "" }: PostCardProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 rounded-2xl border border-brand/15 bg-white/[0.03] backdrop-blur-sm p-4 w-full shadow-[0_0_30px_rgba(24,119,242,0.1)] ${className}`}
      initial={MOTION_INITIAL}
      whileInView={MOTION_VISIBLE}
      transition={{ duration: 0.2, delay, ease: "easeOut" }}
      whileHover={MOTION_HOVER}
      viewport={MOTION_VIEWPORT}
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

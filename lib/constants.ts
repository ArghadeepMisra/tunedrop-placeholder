import { List, Music, Image as ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

// Color tokens (synced with globals.css theme)
export const colors = {
  brand: "#1877F2",
  brandLight: "#60A5FA",
  brandDark: "#1565C0",
  brandDarker: "#0D47A1",
} as const;

// Streaming platforms data
export type Platform = {
  name: string;
  color: string;
  ring: string;
  label: string;
  href: string;
};

export const platforms: Platform[] = [
  {
    name: "Spotify",
    color: "from-green-500 to-green-700",
    ring: "bg-green-500/30",
    label: "Daft Punk on Spotify",
    href: "https://open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi",
  },
  {
    name: "Apple Music",
    color: "from-pink-500 to-rose-700",
    ring: "bg-pink-500/30",
    label: "Daft Punk on Apple Music",
    href: "https://music.apple.com/us/artist/daft-punk/5468295",
  },
  {
    name: "YouTube Music",
    color: "from-red-500 to-red-700",
    ring: "bg-red-500/30",
    label: "Daft Punk on YouTube Music",
    href: "https://music.youtube.com/search?q=daft+punk",
  },
];

// Post card data
export type PostCardData = {
  icon: ReactNode;
  label: string;
  title: string;
  sub: string;
  badge?: string;
  delay?: number;
};

export const postCards: PostCardData[] = [
  {
    icon: "List",
    label: "Playlist",
    title: "Late Night Lo-fi",
    sub: "18 songs · 1h 12m",
    delay: 0,
  },
  {
    icon: "Music",
    label: "Song",
    title: "Nuvole Bianche",
    sub: "3:55 · Ludovico Einaudi",
    badge: "30s preview",
    delay: 0.1,
  },
  {
    icon: "Image",
    label: "Image",
    title: "Current setup 🎧",
    sub: "4:3 · by @jordyn",
    delay: 0.2,
  },
];

// Icon map for post cards (to avoid passing ReactNodes in data)
export const postCardIcons: Record<string, ReactNode> = {
  List: <List className="w-6 h-6" />,
  Music: <Music className="w-6 h-6" />,
  Image: <ImageIcon className="w-6 h-6" />,
};

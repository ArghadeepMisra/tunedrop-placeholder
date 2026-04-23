import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tunedrop.org"),
  title: "Tunedrop — Share the music you love",
  description:
    "A social feed for your playlists. Post songs, follow friends, and discover music. Coming soon to tunedrop.org.",
  openGraph: {
    title: "Tunedrop — Share the music you love",
    description:
      "A social feed for your playlists. Post songs, follow friends, and discover music.",
    url: "https://tunedrop.org",
    siteName: "Tunedrop",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunedrop — Share the music you love",
    description:
      "A social feed for your playlists. Post songs, follow friends, and discover music.",
    site: "@tunedrop",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-neutral-950 text-white min-h-screen">{children}</body>
    </html>
  );
}

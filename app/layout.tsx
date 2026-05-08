import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tunedrop.org"),
  title: "Tunedrop | Share the music you love",
  description:
    "A social feed for your playlists. Post songs, follow friends, and discover music. Coming soon to tunedrop.org.",
  openGraph: {
    title: "Tunedrop | Share the music you love",
    description:
      "A social feed for your playlists. Post songs, follow friends, and discover music.",
    url: "https://tunedrop.org",
    siteName: "Tunedrop",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tunedrop.org/og.png",
        width: 1200,
        height: 630,
        alt: "Tunedrop — Share the music you love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tunedrop | Share the music you love",
    description:
      "A social feed for your playlists. Post songs, follow friends, and discover music.",
    site: "@tunedrop",
    images: ["https://tunedrop.org/og.png"],
  },
  robots: {
    index: true,
    follow: true,
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

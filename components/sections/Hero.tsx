"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import EmailCapture from "@/components/ui/EmailCapture";
import type { GlobeConfig, Position } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#1a0533",
  showAtmosphere: true,
  atmosphereColor: "#a855f7",
  atmosphereAltitude: 0.1,
  emissive: "#1a0533",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(168,85,247,0.4)",
  ambientLight: "#bbbbff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#a855f7",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const arcData: Position[] = [
  { order: 1, startLat: 28.6, startLng: 77.2, endLat: 51.5, endLng: -0.1, arcAlt: 0.3, color: "#a855f7" },
  { order: 2, startLat: 40.7, startLng: -74.0, endLat: 48.8, endLng: 2.35, arcAlt: 0.3, color: "#c084fc" },
  { order: 3, startLat: -33.9, startLng: 18.4, endLat: 35.7, endLng: 139.7, arcAlt: 0.5, color: "#7c3aed" },
  { order: 4, startLat: 1.3, startLng: 103.8, endLat: 37.8, endLng: -122.4, arcAlt: 0.5, color: "#a855f7" },
  { order: 5, startLat: 55.8, startLng: 37.6, endLat: 40.7, endLng: -74.0, arcAlt: 0.4, color: "#c084fc" },
  { order: 6, startLat: -23.5, startLng: -46.6, endLat: 52.4, endLng: 13.4, arcAlt: 0.4, color: "#7c3aed" },
  { order: 7, startLat: 48.8, startLng: 2.35, endLat: -33.9, endLng: 151.2, arcAlt: 0.5, color: "#a855f7" },
  { order: 8, startLat: 35.7, startLng: 139.7, endLat: 28.6, endLng: 77.2, arcAlt: 0.3, color: "#c084fc" },
  { order: 9, startLat: 19.4, startLng: -99.1, endLat: 1.3, endLng: 103.8, arcAlt: 0.4, color: "#7c3aed" },
  { order: 10, startLat: 59.9, startLng: 10.7, endLat: -23.5, endLng: -46.6, arcAlt: 0.5, color: "#a855f7" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Nav */}
      <nav className="relative z-10 px-6 md:px-12 py-6">
        <span className="text-xl font-bold tracking-tight text-white">
          Tunedrop
        </span>
      </nav>

      {/* Hero content */}
      <div className="flex-1 flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 pb-16 md:pb-0">
        {/* Left */}
        <motion.div
          className="flex-1 flex flex-col gap-6 max-w-xl z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Share the music{" "}
            <span className="text-purple-400">you love.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            A social feed for your playlists.{" "}
            <span className="text-white/80">Coming soon to tunedrop.org.</span>
          </p>
          <EmailCapture />
        </motion.div>

        {/* Right — Globe */}
        <motion.div
          className="w-full md:flex-1 h-[380px] md:h-[600px] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <World globeConfig={globeConfig} data={arcData} />
        </motion.div>
      </div>
    </section>
  );
}

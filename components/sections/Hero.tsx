"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { GlobeConfig, Position } from "@/components/ui/globe";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false }
);

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#0e2460",
  showAtmosphere: true,
  atmosphereColor: "#1877F2",
  atmosphereAltitude: 0.25,
  emissive: "#0e2460",
  emissiveIntensity: 0.376,
  shininess: 0.9,
  polygonColor: "rgba(24,119,242,0.80)",
  ambientLight: "#bbccff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#1877F2",
  arcTime: 600,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const arcData: Position[] = [
  { order: 1,  startLat: 28.6,  startLng: 77.2,   endLat: 51.5,  endLng: -0.1,   arcAlt: 0.3, color: "#1877F2" },
  { order: 2,  startLat: 40.7,  startLng: -74.0,  endLat: 48.8,  endLng: 2.35,   arcAlt: 0.3, color: "#60A5FA" },
  { order: 3,  startLat: -33.9, startLng: 18.4,   endLat: 35.7,  endLng: 139.7,  arcAlt: 0.5, color: "#1565C0" },
  { order: 4,  startLat: 1.3,   startLng: 103.8,  endLat: 37.8,  endLng: -122.4, arcAlt: 0.5, color: "#1877F2" },
  { order: 5,  startLat: 55.8,  startLng: 37.6,   endLat: 40.7,  endLng: -74.0,  arcAlt: 0.4, color: "#60A5FA" },
  { order: 6,  startLat: -23.5, startLng: -46.6,  endLat: 52.4,  endLng: 13.4,   arcAlt: 0.4, color: "#1565C0" },
  { order: 7,  startLat: 48.8,  startLng: 2.35,   endLat: -33.9, endLng: 151.2,  arcAlt: 0.5, color: "#1877F2" },
  { order: 8,  startLat: 35.7,  startLng: 139.7,  endLat: 28.6,  endLng: 77.2,   arcAlt: 0.3, color: "#60A5FA" },
  { order: 9,  startLat: 19.4,  startLng: -99.1,  endLat: 1.3,   endLng: 103.8,  arcAlt: 0.4, color: "#1565C0" },
  { order: 10, startLat: 59.9,  startLng: 10.7,   endLat: -23.5, endLng: -46.6,  arcAlt: 0.5, color: "#1877F2" },
  { order: 11, startLat: 25.2,  startLng: 55.3,   endLat: 48.8,  endLng: 2.35,   arcAlt: 0.4, color: "#60A5FA" },
  { order: 12, startLat: 51.5,  startLng: -0.1,   endLat: 19.4,  endLng: -99.1,  arcAlt: 0.3, color: "#1877F2" },
  { order: 13, startLat: -34.6, startLng: -58.4,  endLat: 40.7,  endLng: -74.0,  arcAlt: 0.3, color: "#1565C0" },
  { order: 14, startLat: 31.2,  startLng: 121.5,  endLat: 55.8,  endLng: 37.6,   arcAlt: 0.4, color: "#1877F2" },
  { order: 15, startLat: 6.5,   startLng: 3.4,    endLat: 51.5,  endLng: -0.1,   arcAlt: 0.5, color: "#60A5FA" },
  { order: 16, startLat: 52.4,  startLng: 13.4,   endLat: 37.8,  endLng: -122.4, arcAlt: 0.4, color: "#1565C0" },
  { order: 17, startLat: 1.3,   startLng: 103.8,  endLat: 25.2,  endLng: 55.3,   arcAlt: 0.3, color: "#1877F2" },
  { order: 18, startLat: -33.9, startLng: 151.2,  endLat: 35.7,  endLng: 139.7,  arcAlt: 0.2, color: "#60A5FA" },
  { order: 19, startLat: 48.8,  startLng: 2.35,   endLat: 31.2,  endLng: 121.5,  arcAlt: 0.5, color: "#1877F2" },
  { order: 20, startLat: 40.7,  startLng: -74.0,  endLat: -23.5, endLng: -46.6,  arcAlt: 0.3, color: "#1565C0" },
  { order: 21, startLat: 59.9,  startLng: 10.7,   endLat: 6.5,   endLng: 3.4,    arcAlt: 0.5, color: "#60A5FA" },
  { order: 22, startLat: 37.8,  startLng: -122.4, endLat: -33.9, endLng: 18.4,   arcAlt: 0.5, color: "#1877F2" },
  { order: 23, startLat: 28.6,  startLng: 77.2,   endLat: 6.5,   endLng: 3.4,    arcAlt: 0.4, color: "#1565C0" },
  { order: 24, startLat: 35.7,  startLng: 139.7,  endLat: -34.6, endLng: -58.4,  arcAlt: 0.6, color: "#60A5FA" },
  { order: 25, startLat: 25.2,  startLng: 55.3,   endLat: 31.2,  endLng: 121.5,  arcAlt: 0.3, color: "#1877F2" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Globe — full-bleed background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-end pr-0 pointer-events-none">
          <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-[#1877F2]/12 blur-[100px] translate-x-1/4" />
        </div>

        {/* Canvas */}
        <div className="absolute inset-0">
          <World globeConfig={globeConfig} data={arcData} />
        </div>

        {/* Left fade — protects text legibility */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
      </motion.div>

      {/* Nav */}
      <nav className="relative z-10 px-6 md:px-12 py-6">
        <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Tunedrop
        </span>
      </nav>

      {/* Text overlay — left aligned, sits over the globe */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 pb-16 md:pb-24">
        <motion.div
          className="flex flex-col gap-6 max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Share the music{" "}
            <span className="text-[#1877F2] drop-shadow-[0_0_32px_rgba(24,119,242,0.6)] hover:drop-shadow-[0_0_48px_rgba(24,119,242,0.9)] transition-all duration-500 cursor-default">
              you want the world to listen.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed">
            A social feed for music only.
          </p>
        </motion.div>
      </div>

    </section>
  );
}

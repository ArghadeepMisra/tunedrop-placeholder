"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Object3D } from "three";
import ThreeGlobe from "three-globe";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type WorldProps = {
  globeConfig: GlobeConfig;
  data: Position[];
};

export function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

function GlobeObject({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const [isReady, setIsReady] = useState(false);
  useThree(); // ensure context is available

  const defaults = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotateSpeed: 1,
    ...globeConfig,
  };

  useEffect(() => {
    const globe = new ThreeGlobe();
    globeRef.current = globe;

    const mat = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    mat.color = new Color(defaults.globeColor);
    mat.emissive = new Color(defaults.emissive);
    mat.emissiveIntensity = defaults.emissiveIntensity;
    mat.shininess = defaults.shininess;

    globe
      .showAtmosphere(defaults.showAtmosphere)
      .atmosphereColor(defaults.atmosphereColor)
      .atmosphereAltitude(defaults.atmosphereAltitude)
      .hexPolygonsData((countries as { features: object[] }).features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showGlobe(true)
      .showGraticules(false)
      .hexPolygonColor(() => defaults.polygonColor);

    const p = (d: object) => d as Position;

    globe
      .arcsData(data)
      .arcStartLat((d: object) => p(d).startLat)
      .arcStartLng((d: object) => p(d).startLng)
      .arcEndLat((d: object) => p(d).endLat)
      .arcEndLng((d: object) => p(d).endLng)
      .arcColor((d: object) => p(d).color)
      .arcAltitude((d: object) => p(d).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
      .arcDashLength(defaults.arcLength)
      .arcDashInitialGap((d: object) => p(d).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => defaults.arcTime);

    globe
      .pointsData(data)
      .pointColor((d: object) => p(d).color)
      .pointsMerge(true)
      .pointAltitude(0.07)
      .pointRadius(2);

    globe
      .ringsData([])
      .ringColor(() => (t: number) => `rgba(168,85,247,${1 - t})`)
      .ringMaxRadius(defaults.maxRings)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod((defaults.arcTime * defaults.arcLength) / defaults.rings);

    // Disable frustum culling on all children so Three.js never calls
    // computeBoundingSphere() on hex polygon geometry that isn't ready yet.
    globe.traverse((obj: Object3D) => {
      obj.frustumCulled = false;
    });

    // Defer mount by two frames — gives three-globe time to finish filling
    // its internal BufferGeometry position attributes from the GeoJSON data.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        globe.traverse((obj: Object3D) => {
          obj.frustumCulled = false;
        });
        setIsReady(true);
      });
      return raf2;
    });

    return () => cancelAnimationFrame(raf1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
  });

  if (!isReady || !globeRef.current) return null;
  return <primitive object={globeRef.current} />;
}

export function World(props: WorldProps) {
  const { globeConfig } = props;
  const scene = new Scene();

  return (
    <Canvas scene={scene} camera={{ position: [0, 0, 2.5], fov: 50 }}>
      <ambientLight
        color={globeConfig.ambientLight ?? "#bbbbff"}
        intensity={0.6}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={[-400, 100, 400]}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={[-200, 500, 200]}
      />
      <pointLight
        color={globeConfig.pointLight ?? "#ffffff"}
        position={[-200, 500, 200]}
        intensity={0.8}
      />
      <GlobeObject {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={1.2}
        maxDistance={2.5}
        autoRotate={globeConfig.autoRotate}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
      />
    </Canvas>
  );
}

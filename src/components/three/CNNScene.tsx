"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FeatureMap({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      <primitive
        object={
          new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(...size)),
            new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
          )
        }
      />
    </group>
  );
}

function Connection({
  from,
  to,
}: {
  from: [number, number, number];
  to: [number, number, number];
}) {
  const obj = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...from),
      new THREE.Vector3(...to),
    ]);
    return new THREE.Line(
      g,
      new THREE.LineBasicMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.1 })
    );
  }, [from, to]);
  return <primitive object={obj} />;
}

function Particle({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.elapsedTime * 0.3 + delay) % 4) / 4;
      ref.current.position.x = THREE.MathUtils.lerp(-3.2, 3.3, t);
      ref.current.position.y = Math.sin(t * Math.PI * 2) * 0.2;
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(t * Math.PI) * 0.6;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.15) * 0.12 + pointer.x * 0.1;
      group.current.rotation.x = 0.08 + pointer.y * 0.05;
    }
  });

  const layers: {
    pos: [number, number, number];
    size: [number, number, number];
    color: string;
  }[] = [
    { pos: [-3.2, 0, 0], size: [0.06, 1.5, 1.5], color: "#3b82f6" },
    { pos: [-2, 0, 0], size: [0.1, 1.3, 1.3], color: "#8b5cf6" },
    { pos: [-0.9, 0, 0], size: [0.15, 1.0, 1.0], color: "#a855f7" },
    { pos: [0.1, 0, 0], size: [0.22, 0.75, 0.75], color: "#c084fc" },
    { pos: [1.1, 0, 0], size: [0.3, 0.5, 0.5], color: "#d946ef" },
    { pos: [2.2, 0, 0], size: [0.6, 0.3, 0.3], color: "#ec4899" },
    { pos: [3.3, 0, 0], size: [0.35, 0.18, 0.18], color: "#10b981" },
  ];

  return (
    <group ref={group}>
      {layers.map((l, i) => (
        <FeatureMap key={i} position={l.pos} size={l.size} color={l.color} />
      ))}
      {layers.slice(0, -1).map((l, i) => (
        <Connection
          key={`c-${i}`}
          from={[l.pos[0] + l.size[0] / 2, 0, 0]}
          to={[layers[i + 1].pos[0] - layers[i + 1].size[0] / 2, 0, 0]}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Particle key={i} delay={i} />
      ))}
    </group>
  );
}

export default function CNNScene() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.4} />
        <Scene />
      </Canvas>
    </div>
  );
}

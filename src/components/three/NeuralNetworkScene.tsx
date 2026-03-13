"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Trail } from "@react-three/drei";
import * as THREE from "three";

// Generate neural network node positions in layers
function generateNetwork() {
  const layers = [4, 6, 8, 6, 4, 2];
  const nodes: { pos: THREE.Vector3; layer: number; index: number }[] = [];
  const connections: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];

  const layerSpacing = 2.2;
  const startX = -((layers.length - 1) * layerSpacing) / 2;

  layers.forEach((count, layerIdx) => {
    const startY = -((count - 1) * 0.9) / 2;
    for (let i = 0; i < count; i++) {
      nodes.push({
        pos: new THREE.Vector3(
          startX + layerIdx * layerSpacing,
          startY + i * 0.9,
          (Math.random() - 0.5) * 1.5
        ),
        layer: layerIdx,
        index: i,
      });
    }
  });

  // Create connections between adjacent layers
  let prevStart = 0;
  let prevCount = layers[0];
  for (let l = 1; l < layers.length; l++) {
    const currStart = prevStart + prevCount;
    const currCount = layers[l];
    for (let i = 0; i < prevCount; i++) {
      for (let j = 0; j < currCount; j++) {
        if (Math.random() > 0.3) {
          connections.push({
            from: nodes[prevStart + i].pos,
            to: nodes[currStart + j].pos,
          });
        }
      }
    }
    prevStart = currStart;
    prevCount = currCount;
  }

  return { nodes, connections };
}

function Neuron({
  position,
  layer,
  totalLayers,
}: {
  position: THREE.Vector3;
  layer: number;
  totalLayers: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const t = layer / (totalLayers - 1);
  const color = new THREE.Color().setHSL(0.75 - t * 0.3, 0.8, 0.6);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(
        0.8 + Math.sin(clock.elapsedTime * 2 + layer * 0.5) * 0.2
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      {/* Glow */}
      <mesh position={position}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

function Connection({
  from,
  to,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
}) {
  const lineObj = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([from, to]);
    const m = new THREE.LineBasicMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.06 });
    return new THREE.Line(g, m);
  }, [from, to]);

  return <primitive object={lineObj} />;
}

function DataPulse({
  from,
  to,
  delay,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.elapsedTime + delay) % 3) / 3;
      ref.current.position.lerpVectors(from, to, t);
      ref.current.scale.setScalar(Math.sin(t * Math.PI) * 1.2);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0} />
    </mesh>
  );
}

function NetworkScene() {
  const { nodes, connections } = useMemo(() => generateNetwork(), []);
  const groupRef = useRef<THREE.Group>(null);
  const totalLayers = 6;

  // Select random connections for data pulses
  const pulses = useMemo(() => {
    const selected = [];
    for (let i = 0; i < 20; i++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      if (conn) selected.push({ ...conn, delay: Math.random() * 3 });
    }
    return selected;
  }, [connections]);

  useFrame(({ clock, pointer }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.15 + pointer.x * 0.1;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05 + pointer.y * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <Connection key={`c-${i}`} from={conn.from} to={conn.to} />
      ))}
      {nodes.map((node, i) => (
        <Neuron
          key={`n-${i}`}
          position={node.pos}
          layer={node.layer}
          totalLayers={totalLayers}
        />
      ))}
      {pulses.map((pulse, i) => (
        <DataPulse
          key={`p-${i}`}
          from={pulse.from}
          to={pulse.to}
          delay={pulse.delay}
        />
      ))}
    </group>
  );
}

export default function NeuralNetworkScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NetworkScene />
      </Canvas>
    </div>
  );
}

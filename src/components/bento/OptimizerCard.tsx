"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Center of the loss landscape (the minimum)
const cx = 200;
const cy = 200;

// Generate elliptical contour rings for the loss surface
function contourEllipse(
  rx: number,
  ry: number,
  angle: number
): string {
  // Rotated ellipse as SVG path
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const points: string[] = [];
  for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2;
    const x = rx * Math.cos(t);
    const y = ry * Math.sin(t);
    const px = cx + x * cos - y * sin;
    const py = cy + x * sin + y * cos;
    points.push(`${i === 0 ? "M" : "L"} ${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return points.join(" ") + " Z";
}

// Pre-computed contour rings (from large to small)
const contours = [
  { rx: 160, ry: 100, opacity: 0.04 },
  { rx: 135, ry: 82, opacity: 0.05 },
  { rx: 110, ry: 65, opacity: 0.06 },
  { rx: 88, ry: 50, opacity: 0.07 },
  { rx: 68, ry: 38, opacity: 0.09 },
  { rx: 50, ry: 27, opacity: 0.11 },
  { rx: 34, ry: 18, opacity: 0.14 },
  { rx: 20, ry: 10, opacity: 0.18 },
  { rx: 10, ry: 5, opacity: 0.22 },
];

const tilt = -0.4; // rotation angle for the ellipses

// Optimizer trajectories — step-by-step coordinates toward minimum
// GD: large sweeping arcs, oscillates along the steep direction
const gdSteps: [number, number][] = [
  [60, 60],
  [72, 100],
  [100, 155],
  [130, 190],
  [155, 210],
  [168, 220],
  [180, 215],
  [188, 208],
  [194, 204],
  [197, 202],
  [199, 201],
  [200, 200],
];

// SGD: noisy, zigzags, but eventually gets there
const sgdSteps: [number, number][] = [
  [55, 75],
  [80, 50],
  [65, 105],
  [100, 80],
  [88, 130],
  [120, 110],
  [110, 155],
  [145, 140],
  [135, 170],
  [165, 160],
  [155, 182],
  [178, 175],
  [172, 190],
  [188, 185],
  [185, 195],
  [195, 193],
  [198, 198],
  [200, 200],
];

// Adam: smooth, efficient, direct-ish
const adamSteps: [number, number][] = [
  [50, 55],
  [78, 82],
  [108, 112],
  [135, 140],
  [156, 160],
  [172, 175],
  [184, 185],
  [192, 192],
  [196, 196],
  [199, 199],
  [200, 200],
];

function stepsToPath(steps: [number, number][]): string {
  return steps
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
}

// Animated dot that follows the path step by step
function AnimatedDot({
  steps,
  color,
  delay,
  isVisible,
}: {
  steps: [number, number][];
  color: string;
  delay: number;
  isVisible: boolean;
}) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setStepIdx(0);
    const startDelay = setTimeout(() => {
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        if (idx >= steps.length) {
          clearInterval(interval);
          return;
        }
        setStepIdx(idx);
      }, 250);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startDelay);
  }, [isVisible, steps.length, delay]);

  if (!isVisible) return null;
  const [x, y] = steps[Math.min(stepIdx, steps.length - 1)];

  return (
    <>
      {/* Glow */}
      <motion.circle
        cx={x}
        cy={y}
        r={8}
        fill={color}
        opacity={0.2}
        animate={{ cx: x, cy: y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* Dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={4}
        fill={color}
        animate={{ cx: x, cy: y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* Step markers */}
      {steps.slice(0, stepIdx + 1).map(([sx, sy], i) => (
        <circle
          key={i}
          cx={sx}
          cy={sy}
          r={1.5}
          fill={color}
          opacity={0.4}
        />
      ))}
    </>
  );
}

export default function OptimizerCard() {
  const [isVisible, setIsVisible] = useState(false);
  const [replay, setReplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setIsVisible(false);
    setReplay((r) => r + 1);
    setTimeout(() => setIsVisible(true), 100);
  };

  return (
    <div
      ref={ref}
      className="relative h-full rounded-2xl overflow-hidden border-beam group"
    >
      <div className="relative z-[2] h-full p-5 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
              Optimisation
            </span>
          </div>
          <button
            onClick={handleReplay}
            className="text-[9px] font-mono text-gray-600 hover:text-gray-300 transition-colors"
          >
            ↻ Replay
          </button>
        </div>
        <h3 className="text-base font-bold text-white mb-0.5">
          Loss Landscape
        </h3>
        <p className="text-[10px] text-gray-500 mb-3">
          Trajectoire vers le minimum
        </p>

        {/* Contour map + trajectories */}
        <div className="flex-1 relative">
          <svg
            key={replay}
            viewBox="0 0 400 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="trajGlow">
                <feGaussianBlur stdDeviation="2" />
              </filter>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Contour rings */}
            {contours.map((c, i) => (
              <motion.path
                key={i}
                d={contourEllipse(c.rx, c.ry, tilt)}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth={0.8}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: c.opacity } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              />
            ))}

            {/* Center glow */}
            <circle cx={cx} cy={cy} r={30} fill="url(#centerGlow)" />

            {/* Minimum marker */}
            <motion.circle
              cx={cx}
              cy={cy}
              r={3}
              fill="#a855f7"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isVisible
                  ? { opacity: 0.8, scale: 1 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{ delay: 0.5 }}
            />
            <motion.text
              x={cx + 8}
              y={cy - 8}
              fill="#a855f7"
              fontSize="10"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.6 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              min
            </motion.text>

            {/* GD trajectory — glow layer */}
            <motion.path
              d={stepsToPath(gdSteps)}
              fill="none"
              stroke="#f97316"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#trajGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 0.25 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 3, delay: 0.3 }}
            />
            {/* GD trajectory */}
            <motion.path
              d={stepsToPath(gdSteps)}
              fill="none"
              stroke="#f97316"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 0.8 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 3, delay: 0.3 }}
            />

            {/* SGD trajectory — glow */}
            <motion.path
              d={stepsToPath(sgdSteps)}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#trajGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 0.2 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 4.5, delay: 0.6 }}
            />
            {/* SGD trajectory */}
            <motion.path
              d={stepsToPath(sgdSteps)}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 0.8 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 4.5, delay: 0.6 }}
            />

            {/* Adam trajectory — glow */}
            <motion.path
              d={stepsToPath(adamSteps)}
              fill="none"
              stroke="#a855f7"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#trajGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 0.3 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 2.5, delay: 1 }}
            />
            {/* Adam trajectory */}
            <motion.path
              d={stepsToPath(adamSteps)}
              fill="none"
              stroke="#a855f7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isVisible
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 2.5, delay: 1 }}
            />

            {/* Animated dots */}
            <AnimatedDot
              steps={gdSteps}
              color="#f97316"
              delay={300}
              isVisible={isVisible}
            />
            <AnimatedDot
              steps={sgdSteps}
              color="#06b6d4"
              delay={600}
              isVisible={isVisible}
            />
            <AnimatedDot
              steps={adamSteps}
              color="#a855f7"
              delay={1000}
              isVisible={isVisible}
            />

            {/* Start labels */}
            <motion.text
              x={45}
              y={52}
              fill="#f97316"
              fontSize="9"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              GD
            </motion.text>
            <motion.text
              x={40}
              y={72}
              fill="#06b6d4"
              fontSize="9"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              SGD
            </motion.text>
            <motion.text
              x={35}
              y={50}
              fill="#a855f7"
              fontSize="9"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              Adam
            </motion.text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-3">
            {[
              { name: "Adam", color: "#a855f7", steps: adamSteps.length },
              { name: "GD", color: "#f97316", steps: gdSteps.length },
              { name: "SGD", color: "#06b6d4", steps: sgdSteps.length },
            ].map((opt) => (
              <div key={opt.name} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
                <span className="text-[9px] text-gray-400 font-mono">
                  {opt.name}
                </span>
                <span className="text-[8px] text-gray-600">
                  {opt.steps} steps
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

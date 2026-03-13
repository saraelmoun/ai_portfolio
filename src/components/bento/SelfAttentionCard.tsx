"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Different attention head patterns — each shows which token attends to which
const attentionHeads = [
  {
    name: "Head 1 — Syntaxique",
    color: "#a855f7",
    tokens: ["Le", "chat", "noir", "dort", "sur", "le", "tapis"],
    // [fromIdx, toIdx, weight]
    connections: [
      [1, 2, 0.9],  // chat ← noir (adjective modifies noun)
      [1, 3, 0.6],  // chat ← dort (subject-verb)
      [3, 1, 0.85], // dort ← chat (verb attends to subject)
      [6, 4, 0.7],  // tapis ← sur (preposition)
      [3, 4, 0.5],  // dort ← sur
      [0, 1, 0.4],  // Le ← chat
      [5, 6, 0.45], // le ← tapis
    ] as [number, number, number][],
  },
  {
    name: "Head 2 — Positionnelle",
    color: "#06b6d4",
    tokens: ["Le", "chat", "noir", "dort", "sur", "le", "tapis"],
    connections: [
      [0, 1, 0.9],
      [1, 2, 0.85],
      [2, 3, 0.8],
      [3, 4, 0.75],
      [4, 5, 0.7],
      [5, 6, 0.65],
      [0, 2, 0.3],
      [1, 3, 0.25],
    ] as [number, number, number][],
  },
  {
    name: "Head 3 — Sémantique",
    color: "#ec4899",
    tokens: ["Le", "chat", "noir", "dort", "sur", "le", "tapis"],
    connections: [
      [1, 6, 0.85], // chat ↔ tapis (entity-location)
      [6, 1, 0.8],
      [3, 6, 0.7],  // dort ↔ tapis (action-location)
      [1, 3, 0.65], // chat ↔ dort (entity-action)
      [2, 1, 0.9],  // noir ↔ chat (attribute-entity)
      [4, 6, 0.6],  // sur ↔ tapis
      [4, 3, 0.4],
    ] as [number, number, number][],
  },
];

function AttentionArc({
  x1,
  x2,
  weight,
  color,
  index,
  active,
}: {
  x1: number;
  x2: number;
  weight: number;
  color: string;
  index: number;
  active: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const dist = Math.abs(x2 - x1);
  // Arc height proportional to distance
  const arcHeight = Math.max(25, dist * 0.45);
  const path = `M ${x1} 0 Q ${midX} ${-arcHeight} ${x2} 0`;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        active
          ? { pathLength: 1, opacity: weight * 0.7, strokeWidth: weight * 3 + 0.5 }
          : { pathLength: 0, opacity: 0, strokeWidth: 0 }
      }
      transition={{
        pathLength: { duration: 0.8, delay: index * 0.08, ease: "easeOut" },
        opacity: { duration: 0.5, delay: index * 0.08 },
        strokeWidth: { duration: 0.3 },
      }}
    />
  );
}

function AttentionArcGlow({
  x1,
  x2,
  weight,
  color,
  index,
  active,
}: {
  x1: number;
  x2: number;
  weight: number;
  color: string;
  index: number;
  active: boolean;
}) {
  const midX = (x1 + x2) / 2;
  const dist = Math.abs(x2 - x1);
  const arcHeight = Math.max(25, dist * 0.45);
  const path = `M ${x1} 0 Q ${midX} ${-arcHeight} ${x2} 0`;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      filter="url(#glow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={
        active
          ? { pathLength: 1, opacity: weight * 0.3, strokeWidth: weight * 6 }
          : { pathLength: 0, opacity: 0, strokeWidth: 0 }
      }
      transition={{
        pathLength: { duration: 0.8, delay: index * 0.08, ease: "easeOut" },
        opacity: { duration: 0.5, delay: index * 0.08 },
      }}
    />
  );
}

export default function SelfAttentionCard() {
  const [activeHead, setActiveHead] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-cycle through heads
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveHead((prev) => (prev + 1) % attentionHeads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const head = attentionHeads[activeHead];
  const tokenCount = head.tokens.length;
  // Spacing between tokens
  const svgWidth = 420;
  const padding = 30;
  const tokenSpacing = (svgWidth - padding * 2) / (tokenCount - 1);

  const getX = (idx: number) => padding + idx * tokenSpacing;

  return (
    <div
      ref={containerRef}
      className="relative h-full rounded-2xl overflow-hidden border-beam group"
    >
      <div className="relative z-[2] h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Visualisation
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Self-Attention</h3>
          </div>

          {/* Attention score formula */}
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-gray-500">
              Attention(Q,K,V) = softmax(
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              QK<sup>T</sup>
            </span>
            <span className="text-[10px] font-mono text-gray-500">/</span>
            <span className="text-[10px] font-mono text-emerald-300">√d</span>
            <span className="text-[10px] font-mono text-gray-500">)V</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Chaque token &quot;regarde&quot; les autres — les arcs montrent
          l&apos;intensité de l&apos;attention entre les mots
        </p>

        {/* Head selector tabs */}
        <div className="flex gap-2 mb-5">
          {attentionHeads.map((h, i) => (
            <button
              key={h.name}
              onClick={() => {
                setActiveHead(i);
                setIsAutoPlay(false);
              }}
              className={`text-[10px] font-mono px-3 py-1.5 rounded-full transition-all duration-300 ${
                i === activeHead
                  ? "text-white border"
                  : "text-gray-500 border border-transparent hover:text-gray-300"
              }`}
              style={
                i === activeHead
                  ? { borderColor: h.color + "60", backgroundColor: h.color + "15" }
                  : {}
              }
            >
              {h.name}
            </button>
          ))}
        </div>

        {/* Visualization area */}
        <div className="flex-1 flex flex-col justify-end relative">
          {/* SVG arcs */}
          <svg
            viewBox={`0 -100 ${svgWidth} 110`}
            className="w-full"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glow layer (behind) */}
            <AnimatePresence mode="wait">
              <g key={`glow-${activeHead}`}>
                {head.connections.map(([from, to, weight], i) => (
                  <AttentionArcGlow
                    key={`${activeHead}-glow-${i}`}
                    x1={getX(from)}
                    x2={getX(to)}
                    weight={weight}
                    color={head.color}
                    index={i}
                    active={true}
                  />
                ))}
              </g>
            </AnimatePresence>

            {/* Sharp arcs (front) */}
            <AnimatePresence mode="wait">
              <g key={`arcs-${activeHead}`}>
                {head.connections.map(([from, to, weight], i) => (
                  <AttentionArc
                    key={`${activeHead}-arc-${i}`}
                    x1={getX(from)}
                    x2={getX(to)}
                    weight={weight}
                    color={head.color}
                    index={i}
                    active={true}
                  />
                ))}
              </g>
            </AnimatePresence>
          </svg>

          {/* Tokens row */}
          <div
            className="flex justify-between relative"
            style={{ paddingLeft: padding - 10, paddingRight: padding - 10 }}
          >
            {head.tokens.map((token, i) => {
              // Calculate how much this token is attended to
              const totalWeight = head.connections
                .filter(([, to]) => to === i)
                .reduce((sum, [, , w]) => sum + w, 0);
              const maxWeight = Math.max(
                ...head.connections.map(([, , w]) => w)
              );
              const intensity = totalWeight / (maxWeight * 2);

              return (
                <motion.div
                  key={`${activeHead}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  {/* Token dot */}
                  <motion.div
                    animate={{
                      boxShadow: `0 0 ${8 + intensity * 20}px ${head.color}${Math.round(intensity * 80 + 20).toString(16).padStart(2, "0")}`,
                    }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: head.color }}
                  />
                  {/* Token text */}
                  <span
                    className="text-xs font-mono transition-colors duration-500"
                    style={{
                      color:
                        intensity > 0.3
                          ? "white"
                          : "rgb(107, 114, 128)",
                    }}
                  >
                    {token}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom legend */}
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-transparent" style={{ backgroundColor: head.color }} />
            <span className="text-[9px] text-gray-500">Fort</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-[1px] rounded-full opacity-40" style={{ backgroundColor: head.color }} />
            <span className="text-[9px] text-gray-500">Faible</span>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="text-[9px] font-mono text-gray-600 hover:text-gray-400 transition-colors"
            >
              {isAutoPlay ? "⏸ Auto" : "▶ Auto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

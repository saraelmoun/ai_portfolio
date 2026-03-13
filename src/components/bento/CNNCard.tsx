"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Stylized 8x8 input "image" — a simple shape (like a digit or object outline)
// Values 0-1 representing grayscale intensity
const inputImage = [
  [0, 0, 0, 0.1, 0.1, 0, 0, 0],
  [0, 0, 0.3, 0.8, 0.8, 0.3, 0, 0],
  [0, 0.2, 0.9, 0.5, 0.5, 0.9, 0.2, 0],
  [0, 0.4, 1.0, 0.2, 0.2, 1.0, 0.4, 0],
  [0, 0.4, 1.0, 0.9, 0.9, 1.0, 0.4, 0],
  [0, 0.2, 0.9, 1.0, 1.0, 0.9, 0.2, 0],
  [0, 0, 0.3, 0.8, 0.8, 0.3, 0, 0],
  [0, 0, 0, 0.1, 0.1, 0, 0, 0],
];

// Edge-detection result (simulated Conv1 output)
const edgeMap = [
  [0, 0, 0.5, 0.8, 0.5, 0],
  [0, 0.7, 0.3, 0, 0.3, 0.7],
  [0.4, 0.9, 0, 0, 0, 0.9],
  [0.4, 0.9, 0.6, 0.6, 0, 0.9],
  [0, 0.7, 0.9, 0.9, 0.7, 0],
  [0, 0, 0.5, 0.5, 0, 0],
];

// Higher-level features (simulated Conv2 output)
const featureMap = [
  [0.2, 0.8, 0.8, 0.2],
  [0.7, 0.3, 0.3, 0.7],
  [0.7, 0.9, 0.9, 0.7],
  [0.2, 0.7, 0.7, 0.2],
];

// Convolution kernel 3x3
const kernel = [
  [-1, -1, -1],
  [-1, 8, -1],
  [-1, -1, -1],
];

// Pixel grid component
function PixelGrid({
  data,
  cellSize,
  color,
  highlightArea,
  label,
  delay = 0,
}: {
  data: number[][];
  cellSize: number;
  color: string;
  highlightArea?: { row: number; col: number; size: number };
  label: string;
  delay?: number;
}) {
  const rows = data.length;
  const cols = data[0].length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-1.5"
    >
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: "1px",
          background: "rgba(255,255,255,0.03)",
          padding: "1px",
        }}
      >
        {data.flat().map((val, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const isHighlighted =
            highlightArea &&
            row >= highlightArea.row &&
            row < highlightArea.row + highlightArea.size &&
            col >= highlightArea.col &&
            col < highlightArea.col + highlightArea.size;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + i * 0.008 }}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color,
                opacity: val * 0.9 + 0.05,
                boxShadow:
                  isHighlighted
                    ? `0 0 6px ${color}, inset 0 0 4px rgba(255,255,255,0.3)`
                    : val > 0.7
                      ? `0 0 ${val * 4}px ${color}40`
                      : "none",
                border: isHighlighted ? "1px solid rgba(255,255,255,0.5)" : "none",
              }}
            />
          );
        })}
      </div>
      <span className="text-[9px] font-mono text-gray-500">{label}</span>
    </motion.div>
  );
}

// Animated scanning kernel overlay
function ScanningKernel({
  gridCols,
  gridRows,
  cellSize,
  color,
}: {
  gridCols: number;
  gridRows: number;
  cellSize: number;
  color: string;
}) {
  const [pos, setPos] = useState({ row: 0, col: 0 });

  useEffect(() => {
    const maxCol = gridCols - 3;
    const maxRow = gridRows - 3;
    let row = 0;
    let col = 0;

    const interval = setInterval(() => {
      col++;
      if (col > maxCol) {
        col = 0;
        row++;
        if (row > maxRow) row = 0;
      }
      setPos({ row, col });
    }, 400);

    return () => clearInterval(interval);
  }, [gridCols, gridRows]);

  const x = pos.col * (cellSize + 1) + 1;
  const y = pos.row * (cellSize + 1) + 1;
  const size = 3 * cellSize + 2;

  return (
    <>
      {/* Scanning box */}
      <motion.div
        animate={{ left: x, top: y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute rounded-sm pointer-events-none"
        style={{
          width: size,
          height: size,
          border: `2px solid ${color}`,
          boxShadow: `0 0 12px ${color}60, inset 0 0 8px ${color}20`,
        }}
      />
      {/* Scan line glow */}
      <motion.div
        animate={{ left: x, top: y }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute rounded-sm pointer-events-none"
        style={{
          width: size,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          filter: "blur(2px)",
        }}
      />
    </>
  );
}

// Arrow between stages
function StageArrow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-0.5 self-center mx-1 md:mx-2"
    >
      <div className="w-6 md:w-10 h-[1px] bg-gradient-to-r from-emerald-500/30 to-emerald-500/60 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-emerald-500/60 border-y-[3px] border-y-transparent" />
      </div>
    </motion.div>
  );
}

// Kernel matrix display
function KernelDisplay({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex flex-col items-center gap-1"
    >
      <div className="text-[8px] font-mono text-yellow-400/70 mb-0.5">
        Filtre 3×3, stride=1
      </div>
      <div
        className="rounded-md overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 18px)",
          gridTemplateRows: "repeat(3, 18px)",
          gap: "1px",
          padding: "1px",
          background: "rgba(234, 179, 8, 0.1)",
          border: "1px solid rgba(234, 179, 8, 0.2)",
        }}
      >
        {kernel.flat().map((val, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              width: 18,
              height: 18,
              backgroundColor:
                val > 0
                  ? `rgba(234, 179, 8, ${val / 10})`
                  : `rgba(100, 116, 139, ${Math.abs(val) * 0.15})`,
              fontSize: 7,
              fontFamily: "monospace",
              color: val > 0 ? "#fbbf24" : "#64748b",
            }}
          >
            {val}
          </div>
        ))}
      </div>
      <div className="text-[7px] text-gray-600 font-mono">Laplacien</div>
    </motion.div>
  );
}

// Classification output bar chart
function ClassificationOutput({ delay = 0 }: { delay?: number }) {
  const classes = [
    { name: "circle", prob: 0.92 },
    { name: "square", prob: 0.04 },
    { name: "triangle", prob: 0.03 },
    { name: "line", prob: 0.01 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-1.5 self-center"
    >
      <div className="text-[9px] font-mono text-gray-500 text-center mb-1">
        Flatten → FC → Softmax
      </div>
      {classes.map((c, i) => (
        <div key={c.name} className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-gray-500 w-12 text-right">
            {c.name}
          </span>
          <div className="w-16 h-2.5 rounded-full bg-white/[0.03] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${c.prob * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + i * 0.15 }}
              className="h-full rounded-full"
              style={{
                background:
                  i === 0
                    ? "linear-gradient(90deg, #a855f7, #06b6d4)"
                    : "rgba(107, 114, 128, 0.3)",
                boxShadow:
                  i === 0 ? "0 0 8px rgba(168, 85, 247, 0.4)" : "none",
              }}
            />
          </div>
          <span
            className="text-[8px] font-mono"
            style={{
              color: i === 0 ? "#a855f7" : "#4b5563",
            }}
          >
            {(c.prob * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function CNNCard() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Deep Learning
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Convolutional Neural Network
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-gray-500">
              Y(i,j) = &sum;
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              X(i+m, j+n)
            </span>
            <span className="text-[10px] font-mono text-gray-500">
              &middot; K(m,n)
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-5">
          Produit de convolution discret : le filtre glisse sur l&apos;input avec
          stride=1, chaque position produit une activation de la feature map
        </p>

        {/* Pipeline visualization */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {/* Stage 1: Input Image */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <PixelGrid
                  data={inputImage}
                  cellSize={14}
                  color="#3b82f6"
                  label="Input (H×W×1)"
                  delay={0}
                />
                <ScanningKernel
                  gridCols={8}
                  gridRows={8}
                  cellSize={14}
                  color="#eab308"
                />
              </div>
            </div>

            <StageArrow delay={0.3} />

            {/* Kernel */}
            <KernelDisplay delay={0.4} />

            <StageArrow delay={0.5} />

            {/* Stage 2: Conv1 — Edge features */}
            <PixelGrid
              data={edgeMap}
              cellSize={14}
              color="#8b5cf6"
              label="Conv1 + ReLU (6×6)"
              delay={0.6}
            />

            <StageArrow delay={0.8} />

            {/* Stage 3: Conv2 — Higher features + Pool */}
            <PixelGrid
              data={featureMap}
              cellSize={16}
              color="#ec4899"
              label="Conv2 + MaxPool (4×4)"
              delay={0.9}
            />

            <StageArrow delay={1.1} />

            {/* Stage 4: Classification */}
            <ClassificationOutput delay={1.2} />
          </div>
        </div>

        {/* Bottom legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.04]">
          {[
            { label: "Input tensor", color: "#3b82f6" },
            { label: "Conv + ReLU", color: "#eab308" },
            { label: "Feature map", color: "#8b5cf6" },
            { label: "MaxPool 2×2", color: "#ec4899" },
            { label: "FC + Softmax", color: "#06b6d4" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[8px] text-gray-500 font-mono">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Training epochs — the generated image gets progressively better
// Each epoch is an 8x8 grid of intensity values
const epochs: number[][][] = [
  // Epoch 0: pure noise
  Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => Math.random() * 0.5)
  ),
  // Epoch 1: vague structure
  [
    [0.1, 0.1, 0.2, 0.3, 0.3, 0.2, 0.1, 0.1],
    [0.1, 0.2, 0.3, 0.2, 0.2, 0.3, 0.2, 0.1],
    [0.2, 0.4, 0.2, 0.1, 0.1, 0.2, 0.4, 0.2],
    [0.2, 0.3, 0.2, 0.1, 0.1, 0.2, 0.3, 0.2],
    [0.2, 0.3, 0.3, 0.2, 0.2, 0.3, 0.3, 0.2],
    [0.1, 0.3, 0.4, 0.3, 0.3, 0.4, 0.3, 0.1],
    [0.1, 0.2, 0.3, 0.3, 0.3, 0.3, 0.2, 0.1],
    [0.0, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.0],
  ],
  // Epoch 2: clearer shape
  [
    [0.0, 0.0, 0.1, 0.3, 0.3, 0.1, 0.0, 0.0],
    [0.0, 0.1, 0.4, 0.6, 0.6, 0.4, 0.1, 0.0],
    [0.1, 0.5, 0.7, 0.3, 0.3, 0.7, 0.5, 0.1],
    [0.1, 0.4, 0.5, 0.2, 0.2, 0.5, 0.4, 0.1],
    [0.1, 0.4, 0.7, 0.6, 0.6, 0.7, 0.4, 0.1],
    [0.1, 0.3, 0.6, 0.8, 0.8, 0.6, 0.3, 0.1],
    [0.0, 0.1, 0.3, 0.5, 0.5, 0.3, 0.1, 0.0],
    [0.0, 0.0, 0.1, 0.2, 0.2, 0.1, 0.0, 0.0],
  ],
  // Epoch 3: nearly converged — sharp
  [
    [0.0, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.3, 0.8, 0.8, 0.3, 0.0, 0.0],
    [0.0, 0.2, 0.9, 0.5, 0.5, 0.9, 0.2, 0.0],
    [0.0, 0.4, 1.0, 0.2, 0.2, 1.0, 0.4, 0.0],
    [0.0, 0.4, 1.0, 0.9, 0.9, 1.0, 0.4, 0.0],
    [0.0, 0.2, 0.9, 1.0, 1.0, 0.9, 0.2, 0.0],
    [0.0, 0.0, 0.3, 0.8, 0.8, 0.3, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0],
  ],
];

// The real image that D sees (the target)
const realImage = epochs[3];

// D(x) and D(G(z)) scores per epoch
const dScores = [
  { dReal: 0.95, dFake: 0.08 }, // epoch 0: D easily spots fakes
  { dReal: 0.88, dFake: 0.25 }, // epoch 1: G getting slightly better
  { dReal: 0.78, dFake: 0.42 }, // epoch 2: harder for D
  { dReal: 0.55, dFake: 0.48 }, // epoch 3: near equilibrium
];

// Latent noise vector z — random values displayed as colored bars
function NoiseVector({ epoch }: { epoch: number }) {
  // Regenerate noise per epoch for visual variety
  const noise = useMemo(
    () => Array.from({ length: 16 }, () => Math.random()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [epoch]
  );

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="text-[9px] font-mono text-gray-500">z ~ N(0, I)</div>
      <div className="flex gap-[2px]">
        {noise.map((val, i) => (
          <motion.div
            key={`${epoch}-${i}`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            className="rounded-sm origin-bottom"
            style={{
              width: 4,
              height: Math.max(8, val * 32),
              background: `hsl(${260 + val * 60}, 70%, ${40 + val * 30}%)`,
              opacity: 0.6 + val * 0.4,
            }}
          />
        ))}
      </div>
      <div className="text-[7px] text-gray-600 font-mono">dim=16</div>
    </div>
  );
}

// Pixel grid for generated or real images
function MiniGrid({
  data,
  color,
  label,
  sublabel,
  animate = true,
}: {
  data: number[][];
  color: string;
  label: string;
  sublabel?: string;
  animate?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-lg overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(8, 12px)`,
          gridTemplateRows: `repeat(8, 12px)`,
          gap: "1px",
          padding: "1px",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {data.flat().map((val, i) => (
          <motion.div
            key={i}
            initial={animate ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            transition={animate ? { delay: i * 0.005 } : undefined}
            style={{
              width: 12,
              height: 12,
              backgroundColor: color,
              opacity: val * 0.9 + 0.05,
              boxShadow:
                val > 0.7 ? `0 0 ${val * 3}px ${color}40` : "none",
            }}
          />
        ))}
      </div>
      <span className="text-[9px] font-mono text-gray-500">{label}</span>
      {sublabel && (
        <span className="text-[7px] font-mono text-gray-600">{sublabel}</span>
      )}
    </div>
  );
}

// Network block (G or D)
function NetworkBlock({
  label,
  sublabel,
  color,
  icon,
}: {
  label: string;
  sublabel: string;
  color: string;
  icon: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl self-center"
      style={{
        background: `${color}10`,
        border: `1px solid ${color}25`,
      }}
    >
      <span className="text-base">{icon}</span>
      <span
        className="text-[10px] font-bold font-mono"
        style={{ color }}
      >
        {label}
      </span>
      <span className="text-[7px] text-gray-600 font-mono">{sublabel}</span>
    </div>
  );
}

// Arrow
function Arrow({ color = "#8b5cf6" }: { color?: string }) {
  return (
    <div className="flex items-center self-center mx-1">
      <div
        className="w-5 md:w-8 h-[1px]"
        style={{ backgroundColor: color, opacity: 0.3 }}
      />
      <div
        className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[4px]"
        style={{ borderLeftColor: color, opacity: 0.5 }}
      />
    </div>
  );
}

// D score bar
function ScoreBar({
  label,
  value,
  color,
  targetLabel,
}: {
  label: string;
  value: number;
  color: string;
  targetLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[8px] font-mono text-gray-500 w-10 text-right">
        {label}
      </span>
      <div className="w-20 h-3 rounded-full bg-white/[0.03] overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, type: "spring" }}
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
        {/* Equilibrium line at 0.5 */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10" />
      </div>
      <span className="text-[8px] font-mono" style={{ color }}>
        {(value * 100).toFixed(0)}%
      </span>
      <span className="text-[7px] text-gray-600 font-mono">
        {targetLabel}
      </span>
    </div>
  );
}

export default function GANCard() {
  const [epoch, setEpoch] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(() => {
      setEpoch((prev) => (prev + 1) % epochs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isAuto]);

  const generated = epochs[epoch];
  const scores = dScores[epoch];

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Generative AI
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Generative Adversarial Network
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-gray-500">
              min
            </span>
            <span className="text-[9px] font-mono text-emerald-400">
              G
            </span>
            <span className="text-[9px] font-mono text-gray-500">
              max
            </span>
            <span className="text-[9px] font-mono text-red-400">
              D
            </span>
            <span className="text-[9px] font-mono text-gray-500">
              E[log D(x)] + E[log(1 &minus; D(G(z)))]
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Jeu minimax : G apprend à générer des échantillons réalistes à
          partir de bruit, D apprend à distinguer le réel du généré.
          L&apos;équilibre de Nash est atteint quand D(G(z)) → 0.5
        </p>

        {/* Epoch selector */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[9px] text-gray-500 font-mono">Epoch :</span>
          {epochs.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setEpoch(i);
                setIsAuto(false);
              }}
              className={`w-7 h-7 rounded-lg text-[10px] font-mono transition-all duration-300 ${
                i === epoch
                  ? "bg-pink-500/15 border border-pink-500/30 text-pink-300"
                  : "text-gray-600 border border-transparent hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {i}
            </button>
          ))}
          <button
            onClick={() => setIsAuto(!isAuto)}
            className="ml-auto text-[9px] font-mono text-gray-600 hover:text-gray-400 transition-colors"
          >
            {isAuto ? "⏸ Auto" : "▶ Auto"}
          </button>
        </div>

        {/* Main pipeline */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center overflow-x-auto pb-2">
            {/* z noise */}
            <NoiseVector epoch={epoch} />

            <Arrow color="#10b981" />

            {/* Generator */}
            <NetworkBlock
              label="G(z)"
              sublabel="Generator"
              color="#10b981"
              icon="🏗"
            />

            <Arrow color="#10b981" />

            {/* Generated image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={epoch}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MiniGrid
                  data={generated}
                  color="#10b981"
                  label="G(z)"
                  sublabel={`Epoch ${epoch}`}
                />
              </motion.div>
            </AnimatePresence>

            <Arrow color="#ef4444" />

            {/* Discriminator */}
            <div className="flex flex-col items-center gap-3 self-center">
              <NetworkBlock
                label="D(·)"
                sublabel="Discriminator"
                color="#ef4444"
                icon="🔍"
              />
              {/* D scores */}
              <div className="flex flex-col gap-1.5">
                <ScoreBar
                  label="D(x)"
                  value={scores.dReal}
                  color="#3b82f6"
                  targetLabel="→ 1 (réel)"
                />
                <ScoreBar
                  label="D(G(z))"
                  value={scores.dFake}
                  color="#10b981"
                  targetLabel="→ 0.5 (Nash)"
                />
              </div>
            </div>

            {/* Separator + Real data */}
            <div className="flex flex-col items-center gap-2 ml-4 pl-4 border-l border-white/[0.06]">
              <div className="text-[8px] font-mono text-gray-600 mb-1">
                Distribution réelle p_data
              </div>
              <MiniGrid
                data={realImage}
                color="#3b82f6"
                label="x ~ p_data"
                animate={false}
              />
            </div>
          </div>
        </div>

        {/* Bottom: training dynamic explanation */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              G minimise log(1 &minus; D(G(z)))
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              D maximise log D(x) + log(1 &minus; D(G(z)))
            </span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              Équilibre : p_g = p_data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

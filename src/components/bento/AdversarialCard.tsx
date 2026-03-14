"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Original image: a clear circle (same as CNN card target)
const originalImage = [
  [0.0, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.3, 0.8, 0.8, 0.3, 0.0, 0.0],
  [0.0, 0.2, 0.9, 0.5, 0.5, 0.9, 0.2, 0.0],
  [0.0, 0.4, 1.0, 0.2, 0.2, 1.0, 0.4, 0.0],
  [0.0, 0.4, 1.0, 0.9, 0.9, 1.0, 0.4, 0.0],
  [0.0, 0.2, 0.9, 1.0, 1.0, 0.9, 0.2, 0.0],
  [0.0, 0.0, 0.3, 0.8, 0.8, 0.3, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.1, 0.1, 0.0, 0.0, 0.0],
];

// Perturbation: sign of the gradient (FGSM) — exaggerated for visibility
// In reality this is nearly invisible; we show it amplified
const perturbation = [
  [0.02, -0.03, 0.05, -0.04, 0.03, -0.05, 0.02, -0.01],
  [-0.04, 0.06, -0.03, 0.07, -0.06, 0.04, -0.05, 0.03],
  [0.05, -0.07, 0.08, -0.06, 0.05, -0.08, 0.06, -0.04],
  [-0.03, 0.05, -0.09, 0.07, -0.07, 0.09, -0.05, 0.03],
  [0.04, -0.06, 0.07, -0.08, 0.08, -0.07, 0.06, -0.04],
  [-0.05, 0.08, -0.06, 0.05, -0.05, 0.06, -0.08, 0.05],
  [0.03, -0.04, 0.05, -0.07, 0.07, -0.05, 0.04, -0.03],
  [-0.02, 0.03, -0.04, 0.03, -0.03, 0.04, -0.03, 0.02],
];

// Adversarial image: original + epsilon * sign(gradient)
const epsilon = 0.15;
const adversarialImage = originalImage.map((row, i) =>
  row.map((val, j) => Math.max(0, Math.min(1, val + epsilon * Math.sign(perturbation[i][j]))))
);

// Confidence scores
const originalScores = [
  { label: "circle", value: 0.97, correct: true },
  { label: "square", value: 0.02, correct: false },
  { label: "triangle", value: 0.01, correct: false },
];
const adversarialScores = [
  { label: "circle", value: 0.08, correct: true },
  { label: "square", value: 0.71, correct: false },
  { label: "triangle", value: 0.21, correct: false },
];

function PixelGrid({
  data,
  color,
  showPerturbation = false,
}: {
  data: number[][];
  color: string;
  showPerturbation?: boolean;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 9px)",
        gridTemplateRows: "repeat(8, 9px)",
        gap: "1px",
        padding: "1px",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {data.flat().map((val, i) => {
        const pertVal = showPerturbation
          ? perturbation[Math.floor(i / 8)][i % 8]
          : 0;
        const bgColor = showPerturbation
          ? pertVal > 0
            ? `rgba(239, 68, 68, ${Math.abs(pertVal) * 8})`
            : `rgba(59, 130, 246, ${Math.abs(pertVal) * 8})`
          : color;

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.004 }}
            style={{
              width: 9,
              height: 9,
              backgroundColor: bgColor,
              opacity: showPerturbation ? 1 : val * 0.9 + 0.05,
              boxShadow:
                !showPerturbation && val > 0.7
                  ? `0 0 ${val * 3}px ${color}40`
                  : showPerturbation && Math.abs(pertVal) > 0.05
                    ? `0 0 4px ${pertVal > 0 ? "rgba(239,68,68,0.4)" : "rgba(59,130,246,0.4)"}`
                    : "none",
            }}
          />
        );
      })}
    </div>
  );
}

function ConfidenceBars({
  scores,
  attacked = false,
}: {
  scores: typeof originalScores;
  attacked?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {scores.map((s, i) => {
        const isWrong = attacked && !s.correct && s.value > 0.5;
        const isDropped = attacked && s.correct && s.value < 0.2;
        const barColor = isWrong
          ? "#ef4444"
          : isDropped
            ? "#6b7280"
            : s.correct
              ? "#10b981"
              : "#6b728040";

        return (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-[8px] font-mono text-gray-500 w-12 text-right">
              {s.label}
            </span>
            <div className="w-16 h-2.5 rounded-full bg-white/[0.03] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${s.value * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{
                  background: barColor,
                  boxShadow: isWrong ? `0 0 8px ${barColor}60` : "none",
                }}
              />
            </div>
            <span
              className="text-[8px] font-mono"
              style={{ color: barColor }}
            >
              {(s.value * 100).toFixed(0)}%
            </span>
            {isWrong && (
              <span className="text-[8px] text-red-400 font-mono">✗</span>
            )}
            {!attacked && s.correct && s.value > 0.5 && (
              <span className="text-[8px] text-emerald-400 font-mono">✓</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Operator({ symbol, label }: { symbol: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 self-center mx-1 md:mx-2">
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
        <span className="text-xs md:text-sm text-gray-300 font-mono">{symbol}</span>
      </div>
      <span className="text-[7px] text-gray-600 font-mono">{label}</span>
    </div>
  );
}

export default function AdversarialCard() {
  const [phase, setPhase] = useState<"before" | "attack" | "after">("before");
  const [isAuto, setIsAuto] = useState(true);

  useEffect(() => {
    if (!isAuto) return;
    const phases: ("before" | "attack" | "after")[] = [
      "before",
      "attack",
      "after",
    ];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setPhase(phases[idx]);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAuto]);

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Robustesse
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Adversarial Attack — FGSM
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[9px] font-mono text-gray-500">
              x
            </span>
            <span className="text-[9px] font-mono text-red-400">
              _adv
            </span>
            <span className="text-[9px] font-mono text-gray-500">
              = x + &epsilon; &middot; sign(
            </span>
            <span className="text-[9px] font-mono text-emerald-400">
              &nabla;
            </span>
            <span className="text-[9px] font-mono text-gray-500">
              _x J(&theta;, x, y))
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          FGSM (Goodfellow et al., 2014) : une perturbation imperceptible
          le long du gradient de la loss suffit à tromper le classificateur.
          L&apos;attaque exploite la linéarité des couches en haute dimension.
        </p>

        {/* Phase selector */}
        <div className="flex items-center gap-2 mb-5">
          {(
            [
              { key: "before", label: "Original" },
              { key: "attack", label: "Perturbation" },
              { key: "after", label: "Adversarial" },
            ] as const
          ).map((p) => (
            <button
              key={p.key}
              onClick={() => {
                setPhase(p.key);
                setIsAuto(false);
              }}
              className={`text-[10px] font-mono px-3 py-1.5 rounded-full transition-all duration-300 ${
                phase === p.key
                  ? p.key === "after"
                    ? "bg-red-500/15 border border-red-500/30 text-red-300"
                    : p.key === "attack"
                      ? "bg-yellow-500/15 border border-yellow-500/30 text-yellow-300"
                      : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                  : "text-gray-500 border border-transparent hover:text-gray-300"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setIsAuto(!isAuto)}
            className="ml-auto text-[9px] font-mono text-gray-600 hover:text-gray-400 transition-colors"
          >
            {isAuto ? "⏸ Auto" : "▶ Auto"}
          </button>
        </div>

        {/* Main visualization */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="flex items-center flex-wrap md:flex-nowrap justify-center gap-y-3">
            {/* Original image */}
            <div className="flex flex-col items-center gap-2">
              <PixelGrid data={originalImage} color="#3b82f6" />
              <span className="text-[9px] font-mono text-gray-500">x (input)</span>
              <AnimatePresence mode="wait">
                {phase === "before" && (
                  <motion.div
                    key="scores-original"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <ConfidenceBars scores={originalScores} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Operator symbol="+" label={`ε=${epsilon}`} />

            {/* Perturbation */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  opacity: phase === "attack" || phase === "after" ? 1 : 0.3,
                  scale: phase === "attack" ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <PixelGrid
                  data={perturbation.map((r) => r.map(Math.abs))}
                  color="#eab308"
                  showPerturbation={true}
                />
              </motion.div>
              <span className="text-[9px] font-mono text-gray-500">
                ε · sign(∇_x J)
              </span>
              <AnimatePresence mode="wait">
                {phase === "attack" && (
                  <motion.div
                    key="perturbation-info"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex flex-col items-center gap-1 mt-1"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm bg-red-500/60" />
                        <span className="text-[7px] text-gray-500 font-mono">+ε</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-sm bg-blue-500/60" />
                        <span className="text-[7px] text-gray-500 font-mono">−ε</span>
                      </div>
                    </div>
                    <span className="text-[7px] text-yellow-500/70 font-mono">
                      ||δ||_∞ = {epsilon}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Operator symbol="=" label="x_adv" />

            {/* Adversarial image */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  opacity: phase === "after" ? 1 : 0.4,
                  scale: phase === "after" ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <PixelGrid data={adversarialImage} color={phase === "after" ? "#ef4444" : "#3b82f6"} />
                {phase === "after" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <span className="text-[8px] text-white font-bold">!</span>
                  </motion.div>
                )}
              </motion.div>
              <span className="text-[9px] font-mono text-gray-500">
                x_adv
              </span>
              <AnimatePresence mode="wait">
                {phase === "after" && (
                  <motion.div
                    key="scores-adversarial"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <ConfidenceBars scores={adversarialScores} attacked={true} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Comparison sidebar */}
            <AnimatePresence>
              {phase === "after" && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="ml-2 md:ml-4 pl-2 md:pl-4 border-l border-white/[0.06] self-center hidden md:block"
                >
                  <div className="flex flex-col gap-2">
                    <div className="text-[9px] font-mono text-red-400 font-bold">
                      Misclassification
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-emerald-400">
                        circle 97%
                      </span>
                      <span className="text-[9px] text-gray-500">→</span>
                      <span className="text-[9px] font-mono text-red-400">
                        square 71%
                      </span>
                    </div>
                    <div className="text-[8px] text-gray-600 font-mono leading-relaxed max-w-[120px]">
                      Perturbation L∞ = {epsilon}
                      <br />
                      imperceptible à l&apos;œil
                      <br />
                      mais catastrophique
                      <br />
                      pour le modèle
                    </div>
                    <div className="flex flex-col gap-1 mt-1 pt-1 border-t border-white/[0.04]">
                      <span className="text-[7px] text-gray-500 font-mono">
                        Défenses :
                      </span>
                      <span className="text-[7px] text-gray-600 font-mono">
                        • Adversarial Training
                      </span>
                      <span className="text-[7px] text-gray-600 font-mono">
                        • Certified Robustness
                      </span>
                      <span className="text-[7px] text-gray-600 font-mono">
                        • Input Preprocessing
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center gap-3 flex-wrap mt-3 pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              x ~ p_data (correct)
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              δ = ε · sign(∇_x J(θ, x, y))
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[8px] text-gray-500 font-mono">
              x_adv = x + δ (misclassifié)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

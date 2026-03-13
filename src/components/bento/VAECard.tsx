"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Latent space samples — 2D projections
const withoutKL = [
  // Cluster 0 — far top-left
  { x: -3.5, y: 3.0, c: 0 },
  { x: -3.1, y: 3.4, c: 0 },
  { x: -3.8, y: 2.7, c: 0 },
  { x: -2.9, y: 3.2, c: 0 },
  { x: -3.3, y: 2.9, c: 0 },
  // Cluster 1 — far right
  { x: 4.2, y: -0.8, c: 1 },
  { x: 4.6, y: -0.4, c: 1 },
  { x: 3.9, y: -1.2, c: 1 },
  { x: 4.4, y: -0.6, c: 1 },
  { x: 4.0, y: -1.0, c: 1 },
  // Cluster 2 — far bottom
  { x: -0.3, y: -4.0, c: 2 },
  { x: 0.1, y: -3.6, c: 2 },
  { x: -0.6, y: -4.3, c: 2 },
  { x: 0.2, y: -3.9, c: 2 },
  { x: -0.4, y: -4.1, c: 2 },
];

const withKL = [
  // Cluster 0 — near center-left
  { x: -1.0, y: 0.7, c: 0 },
  { x: -0.6, y: 1.1, c: 0 },
  { x: -1.2, y: 0.4, c: 0 },
  { x: -0.8, y: 0.9, c: 0 },
  { x: -1.1, y: 0.6, c: 0 },
  // Cluster 1 — near center-right
  { x: 0.8, y: -0.2, c: 1 },
  { x: 1.1, y: 0.2, c: 1 },
  { x: 0.6, y: -0.5, c: 1 },
  { x: 1.0, y: 0.0, c: 1 },
  { x: 0.9, y: -0.3, c: 1 },
  // Cluster 2 — near center-bottom
  { x: -0.1, y: -0.9, c: 2 },
  { x: 0.2, y: -0.6, c: 2 },
  { x: -0.3, y: -1.2, c: 2 },
  { x: 0.1, y: -0.8, c: 2 },
  { x: -0.2, y: -1.0, c: 2 },
];

const colors = ["#34d399", "#fbbf24", "#f472b6"];

export default function VAECard() {
  const [regularized, setRegularized] = useState(false);
  const [sampledPoint, setSampledPoint] = useState<{ x: number; y: number } | null>(null);
  const [showSample, setShowSample] = useState(false);

  // Auto-toggle
  useEffect(() => {
    const timer = setInterval(() => setRegularized((p) => !p), 5000);
    return () => clearInterval(timer);
  }, []);

  // Periodic sampling (only when regularized)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!regularized) return;
      const u1 = Math.random(), u2 = Math.random();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.7;
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2) * 0.7;
      setSampledPoint({ x: z1, y: z2 });
      setShowSample(true);
      setTimeout(() => setShowSample(false), 2000);
    }, 3500);
    return () => clearInterval(timer);
  }, [regularized]);

  const pts = regularized ? withKL : withoutKL;
  const toSvgX = (v: number) => 50 + v * 8;
  const toSvgY = (v: number) => 50 - v * 8;

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-4 md:p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Generative Model
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Variational Autoencoder
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[10px] font-mono text-gray-500">
              ELBO = E[log p(x|z)] &minus;{" "}
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              D<sub>KL</sub>(q(z|x) ‖ N(0,I))
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex-1 flex flex-col md:flex-row gap-5 min-h-0">
          {/* LEFT — Architecture pipeline (vertical) */}
          <div className="md:w-[40%] flex flex-col gap-4">
            {/* Pipeline */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 flex-1 flex flex-col justify-center">
              <PipelineStep
                label="Input"
                content="x"
                sub={null}
                delay={0}
              />
              <VerticalArrow />
              <PipelineStep
                label="Encoder"
                content="q(z|x) → μ, σ²"
                sub="Réseau de neurones"
                delay={0.1}
                accent
              />
              <VerticalArrow />
              <PipelineStep
                label="Reparameterization"
                content="z = μ + σ ⊙ ε"
                sub="ε ~ N(0, I)"
                delay={0.2}
                highlight
              />
              <VerticalArrow />
              <PipelineStep
                label="Decoder"
                content="p(x̂|z)"
                sub="Reconstruction"
                delay={0.3}
                accent
              />
              <VerticalArrow />
              <PipelineStep
                label="Output"
                content="x̂ ≈ x"
                sub={null}
                delay={0.4}
              />
            </div>

            {/* KL insight */}
            <div className="rounded-xl bg-emerald-500/[0.04] border border-emerald-500/10 p-3">
              <div className="text-[9px] font-mono text-emerald-400 font-semibold mb-1.5">
                Pourquoi la contrainte KL ?
              </div>
              <div className="text-[8px] text-gray-400 leading-relaxed">
                On force{" "}
                <span className="text-yellow-300">q(z|x)</span>
                {" "}≈{" "}
                <span className="text-emerald-300">N(0, I)</span>
                {" "}pour que l&apos;espace latent soit{" "}
                <span className="text-white font-medium">continu</span> et{" "}
                <span className="text-white font-medium">régulier</span>.
                On peut alors sampler z ~ N(0, I) et décoder pour{" "}
                <span className="text-emerald-300">générer de nouvelles données</span>.
              </div>
            </div>
          </div>

          {/* RIGHT — Latent space */}
          <div className="md:w-[60%] flex flex-col gap-3">
            {/* Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                Espace latent z ∈ ℝ²
              </span>
              <button
                onClick={() => setRegularized((p) => !p)}
                className="text-[9px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white transition-colors"
              >
                {regularized ? "✓ avec D_KL" : "✗ sans D_KL"}
              </button>
            </div>

            {/* Latent space SVG */}
            <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/[0.06] relative overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid */}
                {[-4, -2, 0, 2, 4].map((v) => (
                  <g key={v}>
                    <line
                      x1={toSvgX(v)} y1={2} x2={toSvgX(v)} y2={98}
                      stroke="white"
                      strokeOpacity={v === 0 ? 0.12 : 0.04}
                      strokeWidth={0.3}
                    />
                    <line
                      x1={2} y1={toSvgY(v)} x2={98} y2={toSvgY(v)}
                      stroke="white"
                      strokeOpacity={v === 0 ? 0.12 : 0.04}
                      strokeWidth={0.3}
                    />
                  </g>
                ))}

                {/* N(0,I) contours — only when regularized */}
                {regularized &&
                  [1, 2, 3].map((r) => (
                    <motion.circle
                      key={r}
                      cx={50} cy={50} r={r * 8}
                      fill="none"
                      stroke="#34d399"
                      strokeWidth={0.5}
                      strokeOpacity={0.15 / r}
                      strokeDasharray="2 1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: r * 0.1 }}
                    />
                  ))}

                {/* "Holes" label when NOT regularized */}
                {!regularized && (
                  <>
                    <motion.text
                      x={50} y={50}
                      textAnchor="middle"
                      className="text-[5px]"
                      fill="#ef4444"
                      fillOpacity={0.4}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      zones vides
                    </motion.text>
                    <motion.text
                      x={50} y={55}
                      textAnchor="middle"
                      className="text-[4px]"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      ↓ sampling impossible ici
                    </motion.text>
                  </>
                )}

                {/* Data points */}
                {pts.map((pt, i) => (
                  <motion.circle
                    key={`${regularized ? "r" : "u"}-${i}`}
                    r={2.2}
                    fill={colors[pt.c]}
                    fillOpacity={0.75}
                    initial={{ cx: 50, cy: 50, opacity: 0 }}
                    animate={{
                      cx: toSvgX(pt.x),
                      cy: toSvgY(pt.y),
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.03,
                      type: "spring",
                      stiffness: 120,
                    }}
                  />
                ))}

                {/* Sampled point */}
                {showSample && sampledPoint && regularized && (
                  <motion.g>
                    <motion.circle
                      cx={toSvgX(sampledPoint.x)}
                      cy={toSvgY(sampledPoint.y)}
                      fill="#fbbf24"
                      initial={{ r: 0, opacity: 0 }}
                      animate={{ r: 2.5, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.circle
                      cx={toSvgX(sampledPoint.x)}
                      cy={toSvgY(sampledPoint.y)}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth={0.8}
                      initial={{ r: 2, opacity: 1 }}
                      animate={{ r: 8, opacity: 0 }}
                      transition={{ duration: 1.2 }}
                    />
                    <motion.text
                      x={toSvgX(sampledPoint.x) + 5}
                      y={toSvgY(sampledPoint.y) - 4}
                      className="text-[4px]"
                      fill="#fbbf24"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 2 }}
                    >
                      z ~ N(0,I) → decode(z)
                    </motion.text>
                  </motion.g>
                )}

                {/* Axis labels */}
                <text x={95} y={53} className="text-[4px]" fill="white" fillOpacity={0.15}>z₁</text>
                <text x={48} y={5} className="text-[4px]" fill="white" fillOpacity={0.15}>z₂</text>
              </svg>

              {/* Status badge */}
              <div className="absolute top-2 left-2">
                <motion.div
                  key={regularized ? "reg" : "unreg"}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-[8px] font-mono font-semibold px-2 py-0.5 rounded ${
                    regularized
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {regularized
                    ? "Continu — on peut sampler partout"
                    : "Discontinu — trous entre clusters"}
                </motion.div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 left-2 flex items-center gap-3">
                {["Classe A", "Classe B", "Classe C"].map((l, i) => (
                  <div key={l} className="flex items-center gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: colors[i] }}
                    />
                    <span className="text-[6px] font-mono text-gray-500">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: the key takeaway */}
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 flex items-start gap-3">
              {/* Mini distribution merge visual */}
              <svg viewBox="0 0 50 30" className="w-14 h-8 flex-shrink-0">
                <motion.path
                  d="M3,27 Q12,27 17,18 Q22,5 25,2 Q28,5 33,18 Q38,27 47,27"
                  fill="none" stroke="#34d399" strokeWidth="1.2" strokeOpacity={0.6}
                />
                <motion.path
                  animate={
                    regularized
                      ? { d: "M3,27 Q12,27 17,19 Q22,7 25,3 Q28,7 33,19 Q38,27 47,27" }
                      : { d: "M3,27 Q8,27 12,22 Q15,10 18,6 Q21,10 25,22 Q28,27 47,27" }
                  }
                  transition={{ duration: 1 }}
                  fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeOpacity={0.5}
                  strokeDasharray="2 1.5"
                />
                <text x="40" y="8" className="text-[4px]" fill="#34d399" fillOpacity={0.7}>p(z)</text>
                <text x="2" y="8" className="text-[4px]" fill="#fbbf24" fillOpacity={0.7}>q(z|x)</text>
              </svg>
              <div>
                <div className="text-[9px] font-mono text-white font-medium">
                  D<sub className="text-emerald-400">KL</sub>(q(z|x) ‖ N(0,I)) → 0
                </div>
                <div className="text-[7px] text-gray-500 mt-0.5">
                  Les deux distributions se superposent → espace latent structuré pour le sampling
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer reference */}
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/[0.04]">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[8px] text-gray-500 font-mono">
            Kingma & Welling, &ldquo;Auto-Encoding Variational Bayes&rdquo;, 2013
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Pipeline step ── */
function PipelineStep({
  label,
  content,
  sub,
  delay,
  accent = false,
  highlight = false,
}: {
  label: string;
  content: string;
  sub: string | null;
  delay: number;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
        highlight
          ? "bg-yellow-500/[0.06] border border-yellow-500/15"
          : accent
          ? "bg-emerald-500/[0.06] border border-emerald-500/15"
          : "bg-white/[0.02] border border-white/[0.05]"
      }`}
    >
      <div className="text-[8px] font-mono text-gray-500 w-20 flex-shrink-0 uppercase tracking-wider">
        {label}
      </div>
      <div className="flex-1">
        <div
          className={`text-[10px] font-mono font-semibold ${
            highlight
              ? "text-yellow-300"
              : accent
              ? "text-emerald-300"
              : "text-white"
          }`}
        >
          {content}
        </div>
        {sub && (
          <div className="text-[7px] text-gray-500 mt-0.5">{sub}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Vertical arrow ── */
function VerticalArrow() {
  return (
    <div className="flex justify-center py-0.5">
      <div className="w-[1px] h-3 bg-gradient-to-b from-emerald-500/30 to-emerald-500/60 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[3px] border-t-emerald-500/60 border-x-[2px] border-x-transparent" />
      </div>
    </div>
  );
}

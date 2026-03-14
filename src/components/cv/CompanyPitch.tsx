"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════
   TYPING EFFECT
   ═══════════════════════════════════════════ */
function TypeWriter({
  text,
  delay = 0,
  speed = 40,
  className = "",
  onDone,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onDone]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-blue-400 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════════════ */
function CountUp({ target, suffix = "", duration = 2000, delay = 0 }: {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <>{value}{suffix}</>;
}

/* ═══════════════════════════════════════════
   ANIMATED ICON COMPONENT
   ═══════════════════════════════════════════ */
function AnimatedIcon({ type }: { type: string }) {
  const base = "transition-all duration-500";
  if (type === "nlp") {
    // Attention mechanism: tokens on left connect to tokens on right with weighted colored lines
    const tokens = ["Je", "suis", "IA"];
    const colors = [
      ["rgba(59,130,246,0.8)", "rgba(139,92,246,0.3)", "rgba(6,182,212,0.15)"],
      ["rgba(139,92,246,0.2)", "rgba(59,130,246,0.7)", "rgba(139,92,246,0.5)"],
      ["rgba(6,182,212,0.1)", "rgba(6,182,212,0.4)", "rgba(59,130,246,0.9)"],
    ];
    return (
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg width="80" height="72" viewBox="0 0 80 72" className={`${base} group-hover:scale-110`}>
          {/* Attention lines — from left tokens to right tokens */}
          {tokens.map((_, li) =>
            tokens.map((_, ri) => (
              <line
                key={`${li}-${ri}`}
                x1="22" y1={14 + li * 22}
                x2="58" y2={14 + ri * 22}
                stroke={colors[li][ri]}
                strokeWidth={li === ri ? 2.5 : 1}
                className={`transition-all duration-700 ${li === ri ? "group-hover:opacity-100 opacity-60" : "group-hover:opacity-70 opacity-20"}`}
              />
            ))
          )}
          {/* Left token dots */}
          {tokens.map((t, i) => (
            <g key={`l${i}`}>
              <circle cx="18" cy={14 + i * 22} r="6" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"} className="opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <text x="18" y={14 + i * 22 + 1} textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" dominantBaseline="middle">{t}</text>
            </g>
          ))}
          {/* Right token dots */}
          {tokens.map((t, i) => (
            <g key={`r${i}`}>
              <circle cx="62" cy={14 + i * 22} r="6" fill={i === 0 ? "#3b82f6" : i === 1 ? "#8b5cf6" : "#06b6d4"} className="opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <text x="62" y={14 + i * 22 + 1} textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" dominantBaseline="middle">{t}</text>
            </g>
          ))}
        </svg>
        {/* Glow on hover */}
        <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/5 blur-xl transition-all duration-700" />
      </div>
    );
  }
  if (type === "prediction") return (
    <div className="relative w-16 h-16 flex items-center justify-center overflow-hidden">
      <svg width="56" height="40" viewBox="0 0 56 40" className={`${base} group-hover:scale-110`}>
        <polyline points="2,35 12,28 22,30 32,15 42,10 52,4" stroke="#3b82f6" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="[stroke-dasharray:100] [stroke-dashoffset:100] group-hover:[stroke-dashoffset:0] transition-all duration-1000" />
        <circle cx="32" cy="15" r="3" fill="#3b82f6" className="opacity-0 group-hover:opacity-80 transition-opacity duration-500 delay-300" />
        <circle cx="52" cy="4" r="2.5" fill="#60a5fa" className="animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
      </svg>
      <div className="absolute bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </div>
  );
  if (type === "vision") return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className={`absolute w-14 h-9 rounded-[50%] border-2 border-blue-500/30 ${base} group-hover:border-blue-400/60 group-hover:scale-110`} />
      <div className={`absolute w-8 h-8 rounded-full border border-blue-500/40 ${base} group-hover:scale-90 group-hover:border-blue-400/70`} />
      <div className="absolute w-4 h-4 rounded-full bg-blue-500/70 shadow-[0_0_20px_rgba(59,130,246,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-shadow duration-500" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white/80 top-[45%] left-[52%]" />
      <div className={`absolute w-[70px] h-[70px] rounded-full border border-blue-400/10 ${base} animate-[spin_12s_linear_infinite]`}>
        <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-blue-400/40 -translate-x-1/2" />
      </div>
    </div>
  );
  if (type === "tendances") return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute w-12 h-12 rounded-full border border-blue-500/15 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute w-8 h-8 rounded-full border border-blue-500/25 animate-ping" style={{ animationDuration: "2.5s" }} />
      <div className="absolute w-4 h-4 rounded-full border border-blue-500/40 animate-ping" style={{ animationDuration: "2s" }} />
      <div className="absolute w-3 h-3 rounded-full bg-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
    </div>
  );
  // automatisation
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className={`absolute w-10 h-10 border-2 border-blue-500/30 border-dashed rounded-full animate-[spin_6s_linear_infinite] ${base} group-hover:border-blue-400/60`} />
      <div className={`absolute w-6 h-6 border border-cyan-500/40 rounded-md animate-[spin_4s_linear_infinite_reverse] ${base} group-hover:border-cyan-400/70`} />
      <div className="absolute w-2 h-2 rounded-full bg-blue-400/80 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
      <div className="absolute w-1 h-1 rounded-full bg-cyan-400/60 top-1 right-4 animate-pulse" />
      <div className="absolute w-1 h-1 rounded-full bg-blue-400/50 bottom-2 left-3 animate-pulse" style={{ animationDelay: "1s" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   FLIP CARD — 3D CARD THAT FLIPS ON HOVER
   ═══════════════════════════════════════════ */
function FlipCard({
  front,
  back,
  iconType,
  delay = 0,
}: {
  front: string;
  back: string;
  iconType: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group h-[200px] cursor-pointer"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl border border-gray-800/40 bg-gradient-to-b from-[#0a1020] to-[#060b18] flex flex-col items-center justify-center gap-3 p-6"
          style={{ backfaceVisibility: "hidden" }}
        >
          <AnimatedIcon type={iconType} />
          <p className="text-white/90 text-sm font-bold tracking-wide text-center mt-1">
            {front}
          </p>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-40 group-hover:opacity-70 transition-opacity">
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
              <path d="M2 4h16M14 1l4 3-4 3" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl border border-blue-500/25 bg-gradient-to-br from-[#0a1228] via-[#0c1530] to-[#0e1a3a] flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          <p className="text-gray-300 text-[13px] leading-relaxed text-center">
            {back}
          </p>
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-blue-500/40 animate-pulse" />
          <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-cyan-500/30 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ESCAPING BUTTON
   ═══════════════════════════════════════════ */
function EscapingButton({ onClick, label }: { onClick: () => void; label: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [escapes, setEscapes] = useState(0);
  const [surrendered, setSurrendered] = useState(false);
  const max = 2;

  const onEnter = useCallback(() => {
    if (surrendered || escapes >= max) return;
    const next = escapes + 1;
    const range = 200 + next * 80;
    setOffset({
      x: (Math.random() - 0.5) * range,
      y: (Math.random() - 0.5) * range * 0.5,
    });
    setEscapes(next);
  }, [surrendered, escapes]);

  useEffect(() => {
    if (escapes >= max && !surrendered) {
      const t = setTimeout(() => {
        setOffset({ x: 0, y: 0 });
        setSurrendered(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [escapes, surrendered]);

  const messages = ["", "Pas si vite...", "Bon... vous m'avez eue."];

  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.button
        onClick={surrendered ? onClick : undefined}
        onMouseEnter={onEnter}
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: "spring", stiffness: 600, damping: 15 }}
        className={`px-10 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${
          surrendered
            ? "bg-white text-[#0a1628] hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
            : "bg-white/80 text-[#0a1628]/70 cursor-default"
        }`}
      >
        {label}
      </motion.button>
      <AnimatePresence mode="wait">
        {escapes > 0 && (
          <motion.p
            key={escapes}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-8 text-blue-400/50 text-xs font-mono whitespace-nowrap"
          >
            {messages[Math.min(escapes, messages.length - 1)]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DYNAMIC BACKGROUND — MOUSE-FOLLOWING + STEP-AWARE
   ═══════════════════════════════════════════ */
const stepAmbience = [
  // Step 0 — Minimal, single faint center pulse
  { orb1: "bg-blue-950/10", orb2: "bg-indigo-950/5", particleColor: "bg-blue-400/10" },
  // Step 1 — Warmer, more presence
  { orb1: "bg-blue-900/12", orb2: "bg-cyan-900/8", particleColor: "bg-blue-400/20" },
  // Step 2 — Full immersion, richer
  { orb1: "bg-blue-800/10", orb2: "bg-violet-900/8", particleColor: "bg-blue-300/25" },
];

// Stable random positions generated once
const particlePositions = Array.from({ length: 40 }, (_, i) => ({
  left: ((i * 2654435761) % 100),
  top: ((i * 340573321) % 100),
  duration: 5 + (i % 6),
  delay: (i % 8) * 0.7,
  size: i % 5 === 0 ? 2 : 1,
}));

function DynamicBackground({ step }: { step: number }) {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ambience = stepAmbience[step] || stepAmbience[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Mouse-following spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-1000 ease-out opacity-60"
        style={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)`,
        }}
      />

      {/* Ambient orbs — shift with step */}
      <div className={`absolute top-[20%] left-[25%] w-[500px] h-[500px] ${ambience.orb1} rounded-full blur-3xl transition-all duration-[2000ms]`}
        style={{ animation: "drift1 12s ease-in-out infinite" }} />
      <div className={`absolute bottom-[15%] right-[20%] w-[450px] h-[450px] ${ambience.orb2} rounded-full blur-3xl transition-all duration-[2000ms]`}
        style={{ animation: "drift2 15s ease-in-out infinite" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />

      {/* Floating particles */}
      {particlePositions.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${ambience.particleColor} transition-colors duration-[2000ms]`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          33% { transform: translateY(-15px) translateX(8px); opacity: 0.5; }
          66% { transform: translateY(-5px) translateX(-5px); opacity: 0.3; }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -20px); }
          66% { transform: translate(-20px, 15px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-25px, 20px); }
          66% { transform: translate(15px, -25px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SOLUTION CARDS DATA
   ═══════════════════════════════════════════ */
const solutions = [
  {
    front: "NLP & Sentiment",
    back: "J'ai fine-tune des Transformers et manipule les mecanismes d'attention au quotidien — mon master a Telecom Paris est centre dessus.",
    iconType: "nlp",
  },
  {
    front: "Prediction & Pricing",
    back: "Chez Renault, j'ai modelise le marche automobile europeen avec des series temporelles et des signaux NLP comme variables exogenes.",
    iconType: "prediction",
  },
  {
    front: "Vision & Fraude",
    back: "2e place Kaggle en classification de sons (50 classes) — j'ai concu l'architecture Deep Learning from scratch.",
    iconType: "vision",
  },
  {
    front: "Detection de tendances",
    back: "Chez Orange, j'ai construit les pipelines data pour capter les signaux faibles et piloter les decisions metiers en temps reel.",
    iconType: "tendances",
  },
  {
    front: "Automatisation IA",
    back: "J'ai deploye un pipeline MLOps E2E — ingestion, monitoring, CI/CD/CT. En production, pas en prototype.",
    iconType: "automatisation",
  },
];

/* ═══════════════════════════════════════════
   STEP 1 — CINEMATIC 3D SCENE
   ═══════════════════════════════════════════ */
function Step1Scene({ onNext }: { onNext: () => void }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setFlipped(true), 1800),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 4600),
      setTimeout(() => setPhase(4), 5800),
      setTimeout(() => setPhase(5), 6600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: hh } = window;
      setTilt({
        x: ((e.clientY - hh / 2) / hh) * -6,
        y: ((e.clientX - w / 2) / w) * 6,
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const words = ["Conseil", "Delivery", "Solutions"];

  return (
    <motion.div
      key="s1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={sceneRef}
        className="w-full max-w-4xl mx-auto px-6"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* ── ACT 1: The flip — "du code" → "de l'impact" ── */}
        <div className="text-center mb-20" style={{ transformStyle: "preserve-3d" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 1 ? { opacity: 0.4, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-base md:text-lg text-gray-600 mb-5 tracking-[0.3em] uppercase font-light"
            style={{ transform: "translateZ(15px)" }}
          >
            Vous ne vendez pas
          </motion.p>

          <div className="relative inline-block h-[70px] md:h-[110px]" style={{ perspective: "900px" }}>
            <div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateX(180deg)" : "rotateX(0deg)",
                transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={phase >= 1 ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-5xl md:text-8xl font-black text-gray-700/80 tracking-tighter select-none"
                >
                  du code.
                </motion.span>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
              >
                <span className="text-5xl md:text-8xl font-black tracking-tighter relative">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    de l&apos;impact.
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-cyan-400/15 to-blue-500/25 blur-3xl -z-10 animate-pulse" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── ACT 2: Three words — staggered 3D entrance, just the words ── */}
        <div className="flex justify-center items-end gap-8 md:gap-16 mb-20" style={{ transformStyle: "preserve-3d" }}>
          {words.map((word, i) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 100, rotateX: 40, scale: 0.7 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : {}}
              transition={{
                delay: i * 0.3,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
              style={{ transform: `translateZ(${20 + i * 25}px)` }}
            >
              {/* Vertical accent line above */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={phase >= 2 ? { scaleY: 1 } : {}}
                transition={{ delay: i * 0.3 + 0.6, duration: 0.5, ease: "easeOut" as const }}
                className="mx-auto mb-3 w-[1px] h-8 origin-bottom"
                style={{
                  background: i === 0 ? "rgba(59,130,246,0.4)" : i === 1 ? "rgba(6,182,212,0.4)" : "rgba(139,92,246,0.4)",
                }}
              />
              <p className="text-3xl md:text-5xl font-black tracking-tight text-white text-center">
                {word}
                <span style={{ color: i === 0 ? "#3b82f6" : i === 1 ? "#06b6d4" : "#8b5cf6" }}>.</span>
              </p>
              {/* Glow under each word */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full blur-xl opacity-30"
                style={{
                  background: i === 0 ? "#3b82f6" : i === 1 ? "#06b6d4" : "#8b5cf6",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── ACT 3: The line that connects — horizontal rule ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 h-[1px] w-full max-w-lg origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ transform: "translateZ(30px)" }}
        />

        {/* ── ACT 4: Personal statement — punchy ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" as const }}
          className="text-center mb-16"
          style={{ transform: "translateZ(40px)" }}
        >
          <p className="text-2xl md:text-4xl font-light text-white/80 leading-relaxed">
            En <span className="font-black text-white">3 ans</span> chez Orange,
          </p>
          <p className="text-2xl md:text-4xl font-light text-white/80">
            c&apos;est exactement ce que j&apos;ai fait.
          </p>
        </motion.div>

        {/* ── ACT 5: CTA ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 5 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
          className="text-center"
          style={{ transform: "translateZ(60px)" }}
        >
          <button onClick={onNext} className="group relative inline-block">
            <span className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700" />
            <span className="relative inline-flex items-center gap-4 px-14 py-5 rounded-full border border-white/10 bg-white/[0.03] group-hover:border-blue-400/25 group-hover:bg-white/[0.06] transition-all duration-500">
              <span className="text-white text-lg font-semibold tracking-wide">
                Pourquoi moi ?
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-blue-400">
                  <path d="M5 11h12M13 7l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   PAGE TRANSITIONS
   ═══════════════════════════════════════════ */
const page = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function CompanyPitch({ onContinue }: { onContinue: () => void }) {
  const [step, setStep] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [line2, setLine2] = useState(false);

  return (
    <div className="min-h-screen bg-[#040610] text-white selection:bg-blue-500/30">
      <DynamicBackground step={step} />

      <AnimatePresence mode="wait">

        {/* ═══════ STEP 0 — CINEMATIC INTRO ═══════ */}
        {step === 0 && (
          <motion.div
            key="s0"
            variants={page}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
                <TypeWriter
                  text="Bonjour, LittleBigCode."
                  speed={55}
                  delay={500}
                  onDone={() => setTimeout(() => setTypingDone(true), 800)}
                  className="bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent"
                />
              </h1>

              <AnimatePresence>
                {typingDone && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-gray-500 text-lg md:text-xl mb-4">
                      <TypeWriter
                        text="J'ai quelque chose a vous montrer."
                        speed={35}
                        delay={200}
                        onDone={() => setTimeout(() => setLine2(true), 600)}
                      />
                    </p>

                    {line2 && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        onClick={() => setStep(1)}
                        className="mt-6 group relative"
                      >
                        <span className="text-blue-400/70 text-sm font-mono tracking-widest uppercase hover:text-blue-300 transition-colors duration-300">
                          Entrez
                        </span>
                        <span className="block h-px w-0 group-hover:w-full bg-blue-400/50 transition-all duration-500 mt-1" />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ═══════ STEP 1 — CINEMATIC 3D SCENE ═══════ */}
        {step === 1 && <Step1Scene onNext={() => setStep(2)} />}

        {/* ═══════ STEP 2 — SOLUTIONS + PROOF ═══════ */}
        {step === 2 && (
          <motion.div
            key="s2"
            variants={page}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative z-10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-2 tracking-tight"
            >

              Vos domaines.
              <br />
              Mon terrain de{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">jeu</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-500 text-sm mb-12 flex items-center gap-2"
            >
              <span className="inline-block w-4 h-px bg-gray-700" />
              Survolez une carte pour la retourner
              <span className="inline-block w-4 h-px bg-gray-700" />
            </motion.p>

            {/* Flip cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 w-full max-w-4xl">
              {solutions.map((sol, i) => (
                <FlipCard
                  key={sol.front}
                  front={sol.front}
                  back={sol.back}
                  iconType={sol.iconType}
                  delay={0.8 + i * 0.1}
                />
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-10 mb-14"
            >
              {[
                { n: 3, suffix: " ans", label: "chez Orange" },
                { n: 2, suffix: "", label: "podiums Kaggle" },
                { n: 1, suffix: "", label: "pipeline MLOps E2E" },
                { n: 0, suffix: "", label: "notebook en prod", special: true },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-3xl font-bold ${stat.special ? "text-red-400/60" : "text-white"}`}>
                    <CountUp target={stat.n} suffix={stat.suffix} delay={1800 + i * 200} duration={1500} />
                  </p>
                  <p className="text-gray-600 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Closing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="text-center mb-12"
            >
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
                La question n&apos;est pas si je suis prete.
              </p>
              <p className="text-white text-lg md:text-xl font-bold mt-2">
                C&apos;est quand est-ce qu&apos;on commence.
              </p>
            </motion.div>

            {/* Escaping CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <EscapingButton onClick={onContinue} label="Decouvrir mon CV" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

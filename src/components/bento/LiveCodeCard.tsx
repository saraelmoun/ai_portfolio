"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeSnippets = [
  {
    label: "Self-Healing Pipeline",
    lines: [
      [
        { text: "def", color: "#c084fc" },
        { text: " auto_heal", color: "#fbbf24" },
        { text: "(pipeline):", color: "#94a3b8" },
      ],
      [
        { text: "    ", color: "" },
        { text: "try", color: "#c084fc" },
        { text: ":", color: "#94a3b8" },
      ],
      [
        { text: "        pipeline", color: "#94a3b8" },
        { text: ".", color: "#94a3b8" },
        { text: "run", color: "#fbbf24" },
        { text: "()", color: "#94a3b8" },
      ],
      [
        { text: "    ", color: "" },
        { text: "except", color: "#c084fc" },
        { text: " DataDriftError:", color: "#fb923c" },
      ],
      [
        { text: "        pipeline", color: "#94a3b8" },
        { text: ".", color: "#94a3b8" },
        { text: "retrain", color: "#22d3ee" },
        { text: "(", color: "#94a3b8" },
        { text: "auto", color: "#fb923c" },
        { text: "=", color: "#94a3b8" },
        { text: "True", color: "#a3e635" },
        { text: ")", color: "#94a3b8" },
      ],
      [
        { text: "        ", color: "" },
        { text: "log", color: "#fbbf24" },
        { text: "(", color: "#94a3b8" },
        { text: '"Model retrained successfully"', color: "#a3e635" },
        { text: ")", color: "#94a3b8" },
      ],
    ],
  },
  {
    label: "Feature Engineering",
    lines: [
      [
        { text: "features", color: "#94a3b8" },
        { text: " = ", color: "#94a3b8" },
        { text: "engineer", color: "#fbbf24" },
        { text: "(", color: "#94a3b8" },
      ],
      [
        { text: "    df", color: "#fb923c" },
        { text: ",", color: "#94a3b8" },
      ],
      [
        { text: "    transformers", color: "#fb923c" },
        { text: "=[", color: "#94a3b8" },
        { text: "PCA", color: "#22d3ee" },
        { text: "(),", color: "#94a3b8" },
        { text: " Scaler", color: "#22d3ee" },
        { text: "()],", color: "#94a3b8" },
      ],
      [
        { text: "    target", color: "#fb923c" },
        { text: "=", color: "#94a3b8" },
        { text: '"price"', color: "#a3e635" },
        { text: ",", color: "#94a3b8" },
      ],
      [
        { text: "    auto_select", color: "#fb923c" },
        { text: "=", color: "#94a3b8" },
        { text: "True", color: "#a3e635" },
      ],
      [
        { text: ")", color: "#94a3b8" },
      ],
    ],
  },
];

export default function LiveCodeCard() {
  const [activeSnippet, setActiveSnippet] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const snippet = codeSnippets[activeSnippet];

  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6 h-full">
          {/* Left: info */}
          <div className="md:w-1/3 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                Live
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Code Snippet
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Pipelines auto-réparables, feature engineering automatisé.
              Du code qui se maintient lui-même.
            </p>

            {/* Snippet selector */}
            <div className="flex flex-col gap-2">
              {codeSnippets.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActiveSnippet(i)}
                  className={`text-left text-xs px-3 py-2 rounded-lg transition-all duration-200 font-mono ${
                    i === activeSnippet
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                      : "text-gray-500 hover:text-gray-300 border border-transparent"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: code display */}
          <div className="md:w-2/3 flex-1">
            <div className="code-window neon-reflection rounded-xl h-full overflow-hidden relative">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[10px] text-gray-500 font-mono ml-2">
                  {snippet.label.toLowerCase().replace(/ /g, "_")}.py
                </span>
              </div>

              {/* Code */}
              <div className="p-4 font-mono text-xs md:text-sm leading-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSnippet}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {snippet.lines.map((tokens, lineIdx) => (
                      <motion.div
                        key={lineIdx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: lineIdx * 0.08 }}
                        className="flex"
                      >
                        <span className="w-6 text-right mr-4 text-gray-600 select-none">
                          {lineIdx + 1}
                        </span>
                        <span>
                          {tokens.map((token, tIdx) => (
                            <span key={tIdx} style={{ color: token.color }}>
                              {token.text}
                            </span>
                          ))}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

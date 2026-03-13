"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const codeLines = [
  { indent: 0, tokens: [
    { text: "import", color: "#c084fc" },
    { text: " torch", color: "#f9a8d4" },
  ]},
  { indent: 0, tokens: [
    { text: "from", color: "#c084fc" },
    { text: " transformers ", color: "#f9a8d4" },
    { text: "import", color: "#c084fc" },
    { text: " AutoModel", color: "#fb923c" },
  ]},
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [
    { text: "class", color: "#c084fc" },
    { text: " Predictor", color: "#22d3ee" },
    { text: "(", color: "#94a3b8" },
    { text: "nn.Module", color: "#fb923c" },
    { text: "):", color: "#94a3b8" },
  ]},
  { indent: 1, tokens: [
    { text: "def", color: "#c084fc" },
    { text: " __init__", color: "#fbbf24" },
    { text: "(", color: "#94a3b8" },
    { text: "self", color: "#f472b6" },
    { text: ",", color: "#94a3b8" },
    { text: " config", color: "#fb923c" },
    { text: "):", color: "#94a3b8" },
  ]},
  { indent: 2, tokens: [
    { text: "super", color: "#fbbf24" },
    { text: "().__init__()", color: "#94a3b8" },
  ]},
  { indent: 2, tokens: [
    { text: "self", color: "#f472b6" },
    { text: ".encoder = ", color: "#94a3b8" },
    { text: "AutoModel", color: "#fb923c" },
    { text: ".from_pretrained(", color: "#94a3b8" },
  ]},
  { indent: 3, tokens: [
    { text: '"bert-base"', color: "#a3e635" },
    { text: ")", color: "#94a3b8" },
  ]},
  { indent: 2, tokens: [
    { text: "self", color: "#f472b6" },
    { text: ".head = ", color: "#94a3b8" },
    { text: "nn", color: "#fb923c" },
    { text: ".Linear(", color: "#94a3b8" },
    { text: "768", color: "#c084fc" },
    { text: ",", color: "#94a3b8" },
    { text: " 1", color: "#c084fc" },
    { text: ")", color: "#94a3b8" },
  ]},
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [
    { text: "def", color: "#c084fc" },
    { text: " forward", color: "#fbbf24" },
    { text: "(", color: "#94a3b8" },
    { text: "self", color: "#f472b6" },
    { text: ",", color: "#94a3b8" },
    { text: " x", color: "#fb923c" },
    { text: "):", color: "#94a3b8" },
  ]},
  { indent: 2, tokens: [
    { text: "h", color: "#94a3b8" },
    { text: " = ", color: "#94a3b8" },
    { text: "self", color: "#f472b6" },
    { text: ".encoder(x)", color: "#94a3b8" },
  ]},
  { indent: 2, tokens: [
    { text: "return", color: "#c084fc" },
    { text: " self", color: "#f472b6" },
    { text: ".head(h)", color: "#94a3b8" },
  ]},
];

export default function CodeWindowCard() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) return prev;
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full group" style={{ perspective: "1000px" }}>
      <motion.div
        whileHover={{ rotateY: -2, rotateX: 2, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <div className="code-window neon-reflection rounded-2xl h-full overflow-hidden relative">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-500 font-mono">
                predictor.py
              </span>
            </div>
          </div>

          {/* Code content */}
          <div className="p-4 md:p-5 font-mono text-xs md:text-sm leading-6 overflow-hidden">
            {codeLines.map((line, lineIdx) => (
              <motion.div
                key={lineIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  lineIdx < visibleLines
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.3 }}
                className="flex"
              >
                {/* Line number */}
                <span className="w-8 text-right mr-4 text-gray-600 select-none flex-shrink-0">
                  {lineIdx + 1}
                </span>
                {/* Indentation + tokens */}
                <span>
                  {"  ".repeat(line.indent)}
                  {line.tokens.map((token, tIdx) => (
                    <span key={tIdx} style={{ color: token.color }}>
                      {token.text}
                    </span>
                  ))}
                  {lineIdx === visibleLines - 1 && (
                    <span className="cursor-blink text-emerald-400 ml-0.5">
                      |
                    </span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Shadow underneath to make it "float" */}
      <div className="absolute -bottom-3 left-[10%] right-[10%] h-6 bg-emerald-500/10 blur-xl rounded-full" />
    </div>
  );
}

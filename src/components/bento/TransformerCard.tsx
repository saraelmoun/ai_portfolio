"use client";

import { motion } from "framer-motion";

export default function TransformerCard() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Architecture
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">
          Transformer
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Attention Is All You Need
        </p>

        {/* Transformer Diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            {/* Input */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-3"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-emerald-400 font-mono">
                  Input Embedding
                </span>
              </div>
            </motion.div>

            {/* Arrow down */}
            <div className="flex justify-center mb-2">
              <div className="w-px h-4 bg-gradient-to-b from-emerald-500/40 to-purple-500/40 flow-pulse-1" />
            </div>

            {/* Positional Encoding */}
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/15">
                <span className="text-[10px] text-purple-300 font-mono">
                  + Positional Encoding
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <div className="w-px h-4 bg-gradient-to-b from-purple-500/40 to-cyan-500/40 flow-pulse-2" />
            </div>

            {/* Encoder block */}
            <div className="relative rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/5 border border-purple-500/15 p-3 mb-3">
              <div className="text-[10px] text-gray-500 font-mono mb-2 text-center">
                ENCODER x N
              </div>

              {/* Multi-Head Attention */}
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-2 mb-2">
                <div className="flex items-center justify-center gap-3">
                  {["Q", "K", "V"].map((label, i) => (
                    <motion.div
                      key={label}
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                      className="w-6 h-6 rounded-md bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-purple-300">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-1.5">
                  <span className="text-[9px] text-purple-400 font-mono">
                    Multi-Head Attention
                  </span>
                </div>
              </div>

              {/* FFN */}
              <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/15 px-3 py-1.5 text-center">
                <span className="text-[9px] text-cyan-400 font-mono">
                  Feed Forward Network
                </span>
              </div>

              {/* Add & Norm indicators */}
              <div className="absolute -right-1 top-1/3 w-4 flex flex-col items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500/15 border border-yellow-500/20 flex items-center justify-center">
                  <span className="text-[6px] text-yellow-400">+</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <div className="w-px h-4 bg-gradient-to-b from-cyan-500/40 to-pink-500/40 flow-pulse-3" />
            </div>

            {/* Decoder block */}
            <div className="rounded-xl bg-gradient-to-br from-pink-500/10 to-orange-500/5 border border-pink-500/15 p-3 mb-3">
              <div className="text-[10px] text-gray-500 font-mono mb-2 text-center">
                DECODER x N
              </div>
              <div className="rounded-lg bg-pink-500/10 border border-pink-500/20 px-3 py-1.5 mb-2 text-center">
                <span className="text-[9px] text-pink-400 font-mono">
                  Masked Multi-Head Attention
                </span>
              </div>
              <div className="rounded-lg bg-orange-500/10 border border-orange-500/15 px-3 py-1.5 text-center">
                <span className="text-[9px] text-orange-400 font-mono">
                  Cross-Attention + FFN
                </span>
              </div>
            </div>

            <div className="flex justify-center mb-2">
              <div className="w-px h-4 bg-gradient-to-b from-pink-500/40 to-emerald-500/40 flow-pulse-4" />
            </div>

            {/* Output */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-emerald-400 font-mono">
                  Output Probabilities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

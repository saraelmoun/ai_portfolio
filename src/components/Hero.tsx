"use client";

import { motion } from "framer-motion";
import Spotlight from "./ui/Spotlight";
import TextGenerateEffect from "./ui/TextGenerateEffect";
import ShimmerButton from "./ui/ShimmerButton";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-clip scanline">
      {/* ========== BACKGROUND LAYERS ========== */}

      {/* Grid with radial mask — green tint */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
        }}
      />

      {/* Animated spotlights — emerald palette */}
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="#065f46"
      />
      <Spotlight
        className="top-10 left-full h-[80vh] w-[50vw]"
        fill="#10b981"
      />
      <Spotlight
        className="top-28 left-80 h-[80vh] w-[50vw]"
        fill="#064e3b"
      />

      {/* Deep ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.02] rounded-full blur-[200px]" />

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center pb-20 pt-36">
        {/* Terminal prompt */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-emerald-500 font-mono text-xs">$</span>
          <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-center text-emerald-400/60 font-mono">
            data_science &bull; ml &bull; deep_learning
          </span>
          <span className="cursor-blink text-emerald-400 font-mono text-xs">
            _
          </span>
        </motion.div>

        {/* Main heading with text generate effect */}
        <TextGenerateEffect
          words="Transformer les Données en Intelligence Décisionnelle"
          className="text-center text-[36px] md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-center md:tracking-wider mb-8 mt-6 text-sm md:text-base lg:text-lg text-gray-400 max-w-xl leading-relaxed font-mono"
        >
          Je suis{" "}
          <span className="text-emerald-300 font-medium">
            Sara El Mountasser
          </span>
          , je conçois des modèles prédictifs et des pipelines de données qui
          transforment la complexité en clarté.
        </motion.p>

        {/* CTA Button with spinning border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <ShimmerButton href="#about" className="md:w-60">
            ./explore --work
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </ShimmerButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 border-2 border-emerald-900/40 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1.5 bg-emerald-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function ProfileCard() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 md:p-8 flex flex-col justify-between">
        {/* Top badge */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-300 font-mono">
              Disponible
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Sara El Mountasser
          </h3>
          <p className="text-lg text-emerald-300 font-medium mb-4">
            Data Scientist & Analyste
          </p>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md">
            Passionnée par le Machine Learning et l&apos;analyse de données.
            Je transforme des données complexes en insights actionnables
            et en modèles prédictifs performants.
          </p>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-6 mt-6">
          {[
            { label: "Python", sub: "Expert" },
            { label: "ML", sub: "Deep Learning" },
            { label: "Data", sub: "Analytics" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-sm font-semibold text-white">
                {item.label}
              </div>
              <div className="text-xs text-gray-500">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

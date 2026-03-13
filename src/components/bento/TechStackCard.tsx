"use client";

import { motion } from "framer-motion";
import {
  SiPytorch,
  SiDocker,
  SiGitlab,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

const techStack = [
  {
    icon: SiPytorch,
    name: "PyTorch",
    color: "#EE4C2C",
    glow: "rgba(238, 76, 44, 0.3)",
  },
  {
    icon: SiDocker,
    name: "Docker",
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.3)",
  },
  {
    icon: FaRobot,
    name: "HuggingFace",
    color: "#FFD21E",
    glow: "rgba(255, 210, 30, 0.3)",
  },
  {
    icon: SiGitlab,
    name: "GitLab CI/CD",
    color: "#FC6D26",
    glow: "rgba(252, 109, 38, 0.3)",
  },
];

export default function TechStackCard() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden border-beam group">
      <div className="relative z-[2] h-full p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Stack
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-1">Tech Stack</h3>
        <p className="text-xs text-gray-500 mb-6">Outils de prédilection</p>

        <div className="flex-1 grid grid-cols-2 gap-3 content-center">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                scale: 1.08,
                boxShadow: `0 0 25px ${tech.glow}`,
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer transition-colors hover:border-white/10 icon-glow"
            >
              <tech.icon
                className="text-2xl"
                style={{ color: tech.color }}
              />
              <span className="text-[10px] text-gray-400 font-mono text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

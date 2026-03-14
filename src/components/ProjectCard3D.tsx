"use client";

import { useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay } from "react-icons/fi";

interface ProjectCard3DProps {
  title: string;
  description: string;
  tags: string[];
  color: string;
  youtubeUrl: string;
  youtubeUrl2?: string;
  youtubeLabel?: string;
  youtubeLabel2?: string;
  SceneComponent: ComponentType<{ active?: boolean }>;
  index: number;
}

export default function ProjectCard3D({
  title,
  description,
  tags,
  color,
  youtubeUrl,
  youtubeUrl2,
  youtubeLabel,
  youtubeLabel2,
  SceneComponent,
  index,
}: ProjectCard3DProps) {
  const [hovered, setHovered] = useState(false);
  const hasTwo = !!youtubeUrl2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...(!hasTwo && {
        onClick: () => window.open(youtubeUrl, "_blank"),
      })}
      className="group relative rounded-2xl bg-[#0a1120] border border-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden glow-hover cursor-pointer"
    >
      {/* 3D Scene area */}
      <div className={`relative h-48 bg-gradient-to-br ${color} overflow-hidden`}>
        <div className="hidden md:block absolute inset-0">
          <SceneComponent active={hovered} />
        </div>

        {/* Play overlay */}
        <AnimatePresence>
          {hovered && !hasTwo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="play-overlay w-14 h-14 rounded-full flex items-center justify-center">
                <FiPlay className="text-emerald-400 text-2xl ml-1" />
              </div>
            </motion.div>
          )}
          {hovered && hasTwo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(youtubeUrl, "_blank");
                }}
                className="play-overlay px-4 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200"
              >
                <FiPlay className="text-emerald-400 text-sm" />
                <span className="text-emerald-300 text-xs font-mono">
                  {youtubeLabel || "Video 1"}
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(youtubeUrl2, "_blank");
                }}
                className="play-overlay px-4 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-500/20 hover:border-emerald-400/60 hover:scale-105 transition-all duration-200"
              >
                <FiPlay className="text-emerald-400 text-sm" />
                <span className="text-emerald-300 text-xs font-mono">
                  {youtubeLabel2 || "Video 2"}
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

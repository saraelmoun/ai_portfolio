"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
}

export default function TextGenerateEffect({
  words,
  className = "",
}: TextGenerateEffectProps) {
  const [mounted, setMounted] = useState(false);
  const wordArray = words.split(" ");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      <AnimatePresence>
        {mounted &&
          wordArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.08,
                ease: "easeOut",
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}

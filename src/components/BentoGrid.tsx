"use client";

import { motion } from "framer-motion";
import CodeWindowCard from "./bento/CodeWindowCard";
import TechStackCard from "./bento/TechStackCard";
import OptimizerCard from "./bento/OptimizerCard";
import LiveCodeCard from "./bento/LiveCodeCard";
import ProfileCard from "./bento/ProfileCard";
import SelfAttentionCard from "./bento/SelfAttentionCard";
import CNNCard from "./bento/CNNCard";
import GANCard from "./bento/GANCard";
import VAECard from "./bento/VAECard";
import AdversarialCard from "./bento/AdversarialCard";

export default function BentoGrid() {
  return (
    <section id="about" className="py-24 relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-400/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 font-mono text-sm mb-2 tracking-wider">
            MON UNIVERS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Ce qui me <span className="gradient-text">définit</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Row 1: Profile (2 cols) + Code Window (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 lg:col-span-2 row-span-2"
          >
            <ProfileCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 lg:col-span-2 row-span-2"
          >
            <CodeWindowCard />
          </motion.div>

          {/* Row 2: Self-Attention (2 cols) + Tech Stack (1 col) + Optimizer (1 col) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2 row-span-2"
          >
            <SelfAttentionCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 lg:col-span-1 row-span-2"
          >
            <OptimizerCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 lg:col-span-1 row-span-2"
          >
            <TechStackCard />
          </motion.div>

          {/* Row 3: CNN (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-3 lg:col-span-4 row-span-1"
          >
            <CNNCard />
          </motion.div>

          {/* Row 4: GAN (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-3 lg:col-span-4 row-span-1"
          >
            <GANCard />
          </motion.div>

          {/* Row 5: VAE (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:col-span-3 lg:col-span-4 row-span-1"
          >
            <VAECard />
          </motion.div>

          {/* Row 6: Adversarial Attack (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="md:col-span-3 lg:col-span-4 row-span-1"
          >
            <AdversarialCard />
          </motion.div>

          {/* Row 6: Live Code (full width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-3 lg:col-span-4 row-span-1"
          >
            <LiveCodeCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

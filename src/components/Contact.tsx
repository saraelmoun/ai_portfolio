"use client";

import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiArrowUpRight } from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-emerald-400 font-mono text-sm mb-2">
            $ contact --init
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto font-mono text-sm leading-relaxed">
            Vous avez un projet data en tête ou souhaitez simplement échanger ?
            N&apos;hésitez pas à me contacter, je serai ravie de discuter avec
            vous.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="mailto:sara.elmountasser@email.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-medium font-mono transition-all duration-200 glow-hover"
          >
            <FiMail />
            Me contacter
            <FiArrowUpRight className="text-sm" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: FiGithub, href: "https://github.com/", label: "GitHub" },
            { icon: FiLinkedin, href: "https://linkedin.com/", label: "LinkedIn" },
            { icon: FiMail, href: "mailto:sara.elmountasser@email.com", label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#0a1120] border border-emerald-900/30 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
              aria-label={social.label}
            >
              <social.icon className="text-xl" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

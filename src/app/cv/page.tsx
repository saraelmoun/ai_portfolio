"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const CVPreview = dynamic(() => import("@/components/cv/CVPreview"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 font-mono text-sm">
          Generation du CV...
        </p>
      </div>
    </div>
  ),
});

const CompanyPitch = dynamic(() => import("@/components/cv/CompanyPitch"), {
  ssr: false,
});

type Step = "input" | "pitch" | "cv";

function isKnownPitchCompany(name: string): boolean {
  return name.toLowerCase().replace(/\s+/g, "") === "littlebigcode";
}

export default function CVPage() {
  const [company, setCompany] = useState("");
  const [step, setStep] = useState<Step>("input");

  if (step === "pitch") {
    return <CompanyPitch onContinue={() => setStep("cv")} />;
  }

  if (step === "cv") {
    return <CVPreview company={company} onBack={() => setStep("input")} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-colors font-mono text-sm"
      >
        <FiArrowLeft />
        Retour au portfolio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md text-center relative z-10"
      >
        {/* Terminal-style header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block mb-4"
          >
            <span className="font-mono text-xs text-emerald-500/60 tracking-widest uppercase">
              ~/sara/cv
            </span>
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 font-mono">
            Quel est le nom de{" "}
            <span className="text-emerald-400">votre entreprise</span> ?
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Mon CV s&apos;adapte a vos couleurs.
          </p>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!company.trim()) return;
            if (isKnownPitchCompany(company)) {
              setStep("pitch");
            } else {
              setStep("cv");
            }
          }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Nom de l'entreprise..."
              autoFocus
              className="w-full px-5 py-3.5 bg-[#0a1120] border border-emerald-900/40 rounded-xl text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-200"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            type="submit"
            disabled={!company.trim()}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-mono text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
          >
            Voir mon CV
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}

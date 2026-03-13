"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "Prédiction d'immatriculations",
    description:
      "Modèle de Machine Learning pour prédire les immatriculations automobiles en Allemagne à partir de données historiques et de variables économiques.",
    tags: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    color: "from-emerald-500/20 to-emerald-900/20",
  },
  {
    title: "Analyse de données exploratoire",
    description:
      "Analyse approfondie d'un jeu de données complexe avec visualisations interactives et extraction d'insights clés pour la prise de décision.",
    tags: ["Python", "Seaborn", "Jupyter", "Statistiques"],
    color: "from-emerald-600/20 to-teal-500/20",
  },
  {
    title: "Dashboard de visualisation",
    description:
      "Tableau de bord interactif pour la visualisation de KPIs et le suivi de métriques en temps réel avec filtres dynamiques.",
    tags: ["Tableau", "SQL", "Data Viz", "KPIs"],
    color: "from-teal-500/20 to-emerald-500/20",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 font-mono text-sm mb-2">
            $ ls ./projects
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Projets <span className="gradient-text">récents</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-2xl bg-[#0a1120] border border-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden glow-hover"
            >
              {/* Gradient header */}
              <div
                className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <FiExternalLink className="text-white text-xl" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="text-gray-500 hover:text-emerald-400 transition-colors">
                    <FiGithub className="text-lg" />
                  </button>
                  <button className="text-gray-500 hover:text-emerald-400 transition-colors">
                    <FiExternalLink className="text-lg" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

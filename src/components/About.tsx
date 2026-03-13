"use client";

import { motion } from "framer-motion";
import {
  FaPython,
  FaDatabase,
  FaChartBar,
  FaBrain,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiJupyter,
} from "react-icons/si";

const skills = [
  { icon: FaPython, name: "Python" },
  { icon: SiPandas, name: "Pandas" },
  { icon: SiScikitlearn, name: "Scikit-learn" },
  { icon: SiTensorflow, name: "TensorFlow" },
  { icon: FaDatabase, name: "SQL" },
  { icon: FaChartBar, name: "Statistiques" },
  { icon: FaChartBar, name: "Tableau" },
  { icon: SiJupyter, name: "Jupyter" },
  { icon: FaBrain, name: "Machine Learning" },
  { icon: FaGitAlt, name: "Git" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 font-mono text-sm mb-2">
            Qui suis-je
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            À propos de <span className="gradient-text">moi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Passionnée par la <span className="text-white">Data Science</span> et
                l&apos;analyse de données, je m&apos;intéresse à la manière dont les
                données peuvent révéler des tendances cachées et guider la prise
                de décision.
              </p>
              <p>
                Mon expertise couvre le{" "}
                <span className="text-white">Machine Learning</span>, l&apos;analyse
                statistique, la visualisation de données et le traitement de
                jeux de données complexes.
              </p>
              <p>
                Je suis toujours à la recherche de nouveaux défis où je peux
                appliquer mes compétences analytiques pour résoudre des
                problèmes concrets.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { value: "5+", label: "Projets" },
                { value: "3+", label: "Technos" },
                { value: "100%", label: "Passion" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-[#0c1033] border border-[#1e2456]"
                >
                  <div className="text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#0c1033] border border-[#1e2456] hover:border-purple-500/30 transition-colors duration-200 glow-hover"
              >
                <skill.icon className="text-purple-400 text-xl flex-shrink-0" />
                <span className="text-sm text-gray-300">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

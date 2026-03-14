"use client";

import { type ComponentType } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ProjectCard3D from "./ProjectCard3D";

const SkiScene = dynamic(() => import("./three/SkiScene"), { ssr: false });
const CloudScene = dynamic(() => import("./three/CloudScene"), { ssr: false });
const DataPipelineScene = dynamic(() => import("./three/DataPipelineScene"), {
  ssr: false,
});

interface Project {
  title: string;
  description: string;
  tags: string[];
  color: string;
  youtubeUrl: string;
  youtubeUrl2?: string;
  youtubeLabel?: string;
  youtubeLabel2?: string;
  Scene: ComponentType<{ active?: boolean }>;
}

const projects: Project[] = [
  {
    title: "Smart Ski — IA Generative",
    description:
      "Systeme IoT intelligent pour le ski connecte. Video publicitaire entierement generee par IA avec montage et post-production.",
    tags: ["IoT", "IA Generative", "Video", "Montage"],
    color: "from-emerald-500/20 to-emerald-900/20",
    youtubeUrl: "https://www.youtube.com/watch?v=Qo_xWdkQ8S4",
    Scene: SkiScene,
  },
  {
    title: "Deploiement Streamlit sur AWS",
    description:
      "Infrastructure cloud complete pour le deploiement d'une application Streamlit sur AWS. Presentation de l'architecture et demo du site.",
    tags: ["AWS", "Streamlit", "Docker", "Cloud"],
    color: "from-purple-500/20 to-cyan-900/20",
    youtubeUrl: "https://www.youtube.com/watch?v=ZSbMLyYD2fY&t=11s",
    youtubeUrl2: "https://www.youtube.com/watch?v=U75tm8i_87c&t=9s",
    youtubeLabel: "Architecture",
    youtubeLabel2: "Demo",
    Scene: CloudScene,
  },
  {
    title: "Data Lake — Pipeline Kestra",
    description:
      "Pipeline de donnees orchestree avec Kestra pour alimenter un Data Lake. Presentation des flows, dashboards et enjeux du projet.",
    tags: ["Kestra", "Data Lake", "SQL", "Dashboard"],
    color: "from-cyan-500/20 to-emerald-900/20",
    youtubeUrl: "https://www.youtube.com/watch?v=5myx9gVpkNc&t=25s",
    Scene: DataPipelineScene,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
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
            Projets <span className="gradient-text">recents</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard3D
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              color={project.color}
              youtubeUrl={project.youtubeUrl}
              youtubeUrl2={project.youtubeUrl2}
              youtubeLabel={project.youtubeLabel}
              youtubeLabel2={project.youtubeLabel2}
              SceneComponent={project.Scene}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

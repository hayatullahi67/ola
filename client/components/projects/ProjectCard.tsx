import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@shared/api";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4 }}
      className="group block overflow-hidden rounded-xl border bg-card shadow-sm"
    >
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.imageBase64} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base">{project.title}</h3>
          <ExternalLink className="size-4 text-muted-foreground" />
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
      </div>
    </motion.a>
  );
}

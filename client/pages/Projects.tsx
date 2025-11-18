import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/firestore";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Projects() {
  const { data: projects, isLoading } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="container py-16">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="font-display text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Projects
        </motion.h1>
        <motion.p
          className="mt-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Selected work showcasing clean UI, speed, and scalability.
        </motion.p>
      </motion.div>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center text-muted-foreground"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <div className="size-8 border-2 border-muted-foreground border-t-primary rounded-full" />
          </motion.div>
          <p className="mt-4">Loading...</p>
        </motion.div>
      ) : projects && projects.length > 0 ? (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              layout
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No projects yet. Check back soon.
        </motion.p>
      )}
    </section>
  );
}

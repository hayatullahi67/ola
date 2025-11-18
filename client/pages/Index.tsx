import { motion } from "framer-motion";
import Background from "@/components/site/Background";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2, Zap, Shield, BarChart3, Layers, Rocket } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/firestore";
import ProjectCard from "@/components/projects/ProjectCard";

export default function Index() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const { data: projects } = useQuery({ queryKey: ["projects-home"], queryFn: fetchProjects });
  const top = (projects || []).slice(0, 3);

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

  const skills = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Vue.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Supabase", category: "Backend" },
    { name: "Firebase", category: "Backend" },
  ];

  const services = [
    {
      icon: Code2,
      title: "Full Stack Development",
      description: "Build complete web applications from beautiful UIs to robust APIs. Custom solutions tailored to your business needs with modern best practices.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Ship fast, load faster. Code-splitting, lazy loading, caching strategies, and production-ready optimizations that improve core web vitals.",
    },
    {
      icon: Rocket,
      title: "API & Integration",
      description: "Design RESTful APIs, integrate third-party services (Stripe, Auth0, Zapier), real-time features, and complex backend workflows.",
    },
  ];

  const values = [
    {
      icon: BarChart3,
      title: "Business Growth",
      description: "Focus on metrics that matter. Analytics, conversion optimization, and features that drive revenue and user engagement.",
    },
    {
      icon: Shield,
      title: "Quality & Reliability",
      description: "Type-safe code, comprehensive testing, error monitoring, and CI/CD pipelines. Zero surprises in production.",
    },
    {
      icon: Layers,
      title: "Scalable Architecture",
      description: "Future-proof systems that grow with your business. Clean code, design systems, and infrastructure ready for scale.",
    },
  ];

  return (
    <section className="relative overflow-hidden" ref={containerRef}>
      <Background />
      <div className="container relative py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-sm font-medium text-muted-foreground tracking-widest uppercase"
            >
              React Full Stack Developer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="mt-3 font-display text-4xl leading-tight sm:text-5xl md:text-6xl font-extrabold"
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 animate-pulse">Olawale Oladimeji</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-prose"
            >
              I build beautiful, performant, and scalable web applications. Full stack expertise in React, TypeScript, Node.js, and modern cloud services. I help startups and enterprises ship faster with clean code, intuitive UX, and fluid animations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="shadow-soft hover:shadow-lg transition-shadow duration-300"><Link to="/contact">Hire Me</Link></Button>
              <Button asChild variant="outline" size="lg" className="hover:bg-card transition-all duration-300"><Link to="/projects">View Projects</Link></Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            style={{ y }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto aspect-square w-64 sm:w-80 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 p-1 shadow-soft"
            >
              <div className="h-full w-full rounded-[calc(theme(borderRadius.3xl)-4px)] bg-background/70 backdrop-blur flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center relative z-10">
                  <p className="text-sm text-muted-foreground">Currently available for</p>
                  <p className="font-display text-2xl sm:text-3xl font-bold">Remote Contracts</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mt-20">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Tech Stack</h3>
          <motion.div className="grid grid-cols-2 gap-3 md:grid-cols-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  hover: { duration: 0.3 },
                  y: {
                    duration: 3 + idx * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="group relative rounded-lg border border-border bg-gradient-to-br from-card/50 to-card/30 hover:from-card/80 hover:to-card/50 backdrop-blur-sm p-4 transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <p className="font-medium text-sm">{skill.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{skill.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mt-24">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">What I Do</h2>
            <p className="mt-2 text-muted-foreground">Comprehensive full-stack solutions for modern web applications</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-block"
                    >
                      <Icon className="size-8 text-primary mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mt-24">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">How I Add Value</h2>
            <p className="mt-2 text-muted-foreground">Strategic approach to development that drives real business results</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 hover:border-primary/50 transition-all hover:shadow-xl cursor-pointer overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        rotate: [0, -5, 5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-block"
                    >
                      <Icon className="size-8 text-primary mb-4" />
                    </motion.div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="mt-24">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl font-bold">Featured Projects</h2>
              <p className="mt-2 text-muted-foreground">Recent work showcasing clean UI, speed, and scalability</p>
            </div>
            <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <Link to="/projects" className="text-sm text-primary hover:underline font-medium">View all →</Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {top.map((p, idx) => (
              <motion.div
                key={p.id}
                variants={itemVariants}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
            {top.length === 0 && <p className="text-muted-foreground col-span-3 text-center py-8">No projects yet.</p>}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

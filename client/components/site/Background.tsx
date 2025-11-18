import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-transparent" />
      <motion.div
        className="absolute -top-20 -left-20 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsl(260 90% 60% / 0.5), transparent)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-10 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsl(200 90% 60% / 0.5), transparent)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, hsl(160 80% 55% / 0.45), transparent)" }}
        animate={{ x: [0, 15, -25, 0], y: [0, -25, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

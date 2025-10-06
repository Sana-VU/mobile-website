"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-accent-gradient p-10 text-white shadow-soft"
    >
      {children}
    </motion.section>
  );
}

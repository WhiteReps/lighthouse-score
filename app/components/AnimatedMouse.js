"use client";

import { motion } from "framer-motion";

export default function AnimatedMouse() {
  return (
    <div className="absolute bottom-16">
      <motion.div
        className="mouse w-8 h-12 border-2 border-white rounded-full flex justify-center items-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      />
    </div>
  );
}

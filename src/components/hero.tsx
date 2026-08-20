"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full"
      >
        <Image
          src="/images/dance-banner-1.png"
          alt="Dance banner"
          width={1920}
          height={600}
          priority
          sizes="100vw"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}

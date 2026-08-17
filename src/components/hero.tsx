"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative h-[70vh] min-h-[500px] w-full overflow-hidden sm:h-[75vh] lg:h-[85vh]">
      {/* Background image */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/banner.jpg"
          alt="Indian classical dancer performing Bharatanatyam in traditional costume"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% 30%" }}
        />
      </motion.div>

      {/* Gradient overlay — top-left for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, transparent 55%), linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 45%)",
        }}
      />

      {/* Text content — top-left */}
      <div
        className="absolute z-10 flex flex-col gap-2 sm:gap-3"
        style={{
          left: "clamp(20px, 5vw, 80px)",
          top: "clamp(90px, 14vh, 160px)",
        }}
      >
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-[2rem] leading-[1.1] font-normal tracking-[0.02em] text-white sm:text-[clamp(2.2rem,4.5vw,4.5rem)]"
          style={{ fontFamily: "'Casko Luxury Demo', Georgia, serif" }}
        >
          Let Dance Tell
          <br />
          Your Story
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="max-w-[380px] text-[0.8rem] font-normal leading-[1.7] text-white/80 sm:text-[0.9rem] sm:max-w-[420px]"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Beautiful performances for moments worth remembering.
        </motion.p>
      </div>
    </section>
  );
}

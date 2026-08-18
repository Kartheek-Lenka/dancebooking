"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="hero" className="relative h-[70vh] min-h-[420px] w-full overflow-hidden sm:h-[75vh] lg:h-[85vh]">
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

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, transparent 55%), linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 45%)",
        }}
      />

      {/* Text content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-xl">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl leading-[1.1] font-normal tracking-[0.02em] text-white sm:text-4xl lg:text-5xl xl:text-6xl"
            style={{ fontFamily: "'Casko Luxury Demo', Georgia, serif" }}
          >
            Learn Dance,
            <br />
            Your Way
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="mt-3 max-w-[320px] text-sm font-normal leading-[1.7] text-white/80 sm:mt-4 sm:text-base sm:max-w-[420px]"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Book a slot for a personal Zoom class — or home sessions after we
            connect online first.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="hero" className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/dance-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            More than a dance.
            <br />
            <span className="text-gold">A memory for life.</span>
          </h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-xl text-lg text-white/85 drop-shadow sm:text-xl"
          >
            Escape the ordinary. Bring the WOW.
          </motion.p>

          <motion.a
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            href="/book"
            className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-black shadow-lg transition-all hover:bg-gold/90 hover:shadow-xl"
          >
            Book Your Slot
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

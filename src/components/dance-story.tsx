"use client";

import { motion } from "framer-motion";

export function DanceStory() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
            <svg
              className="h-8 w-8 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-warm-dark sm:text-4xl">
            Let Dance Become Part of Your Story
          </h2>
          <p className="mt-6 text-lg text-warm-text/60 leading-relaxed">
            Every celebration has a story. Dance adds emotion, energy and
            unforgettable moments to that story. From graceful classical
            performances to energetic group acts, our performances are designed
            to make your occasion truly special.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

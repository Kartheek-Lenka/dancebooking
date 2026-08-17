"use client";

import { motion } from "framer-motion";

const occasions = [
  { name: "Weddings", icon: "♥" },
  { name: "Engagements", icon: "✦" },
  { name: "Birthdays", icon: "★" },
  { name: "Anniversaries", icon: "♠" },
  { name: "Corporate Events", icon: "◆" },
  { name: "College Events", icon: "●" },
  { name: "Festivals", icon: "✿" },
  { name: "Cultural Celebrations", icon: "❀" },
];

export function Occasions() {
  return (
    <section className="py-20 lg:py-28 bg-cream/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-warm-dark sm:text-4xl"
          >
            Perfect for Every Occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-warm-text/60"
          >
            From intimate gatherings to grand celebrations, our performances
            add magic to every event.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {occasions.map((occasion, i) => (
            <motion.div
              key={occasion.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-cream bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md cursor-default"
            >
              <span className="text-2xl text-gold group-hover:text-gold-dark transition-colors">
                {occasion.icon}
              </span>
              <p className="mt-3 text-sm font-medium text-warm-dark">
                {occasion.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

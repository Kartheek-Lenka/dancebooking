"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const styles = [
  {
    title: "Classical",
    description:
      "Elegant Bharatanatyam-inspired performances rooted in tradition, expression and storytelling.",
    image: "/images/styles/classical.jpg",
    alt: "Classical Bharatanatyam dance performance",
  },
  {
    title: "Semi Classical",
    description:
      "A beautiful combination of classical expressions and contemporary presentation.",
    image: "/images/styles/semi-classical.jpg",
    alt: "Semi classical dance performance",
  },
  {
    title: "Western",
    description:
      "Energetic modern dance performances for celebrations and entertainment.",
    image: "/images/styles/western.jpg",
    alt: "Western dance performance",
  },
  {
    title: "Mass / Group",
    description:
      "High-energy group performances designed to create excitement and memorable moments.",
    image: "/images/styles/mass.jpg",
    alt: "Mass group dance performance",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export function DanceStyles() {
  return (
    <section id="performances" className="py-20 lg:py-28 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-warm-dark sm:text-4xl"
          >
            Our Performance Styles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-warm-text/60"
          >
            Choose from a range of dance styles that perfectly match the mood
            and energy of your celebration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {styles.map((style, i) => (
            <motion.div
              key={style.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group cursor-pointer flex"
            >
              <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-xl w-full">
                <div className="relative w-full h-[320px] sm:h-[280px] lg:h-[300px] overflow-hidden flex-shrink-0">
                  <Image
                    src={style.image}
                    alt={style.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold text-warm-dark">
                    {style.title}
                  </h3>
                  <p className="mt-2 text-sm text-warm-text/60 leading-relaxed">
                    {style.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-cream/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/side-banner.jpg"
                alt="Indian classical dancer in traditional Bharatanatyam costume"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-2xl bg-gold/20 -z-10" />
            <div className="absolute -top-6 -left-6 h-16 w-16 rounded-xl bg-maroon/10 -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-warm-dark sm:text-4xl">
              About Our Performances
            </h2>
            <p className="text-lg text-warm-text/70 leading-relaxed">
              We believe dance is more than a performance. It is an emotion, a
              celebration and a memory that stays with you. Every movement tells
              a story, every rhythm creates a moment, and every performance
              becomes a treasured memory.
            </p>
            <p className="text-warm-text/60 leading-relaxed">
              With years of experience in classical and contemporary dance
              forms, we craft performances that are tailored to the unique
              spirit of your celebration.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div>
                <p className="text-2xl font-bold text-maroon">
                  {siteConfig.statistics.performances}
                </p>
                <p className="text-sm text-warm-text/60">Performances</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-maroon">
                  {siteConfig.statistics.events}
                </p>
                <p className="text-sm text-warm-text/60">Events</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-maroon">
                  {siteConfig.statistics.danceStyles}
                </p>
                <p className="text-sm text-warm-text/60">Dance Styles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

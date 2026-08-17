"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-maroon">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Have a Celebration Coming Up?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Let&apos;s make it unforgettable with a performance created for
            your special moment.
          </p>
          <div className="mt-8">
            <Link href="/book">
              <Button
                size="lg"
                variant="gold"
                className="text-base"
              >
                Book a Performance
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

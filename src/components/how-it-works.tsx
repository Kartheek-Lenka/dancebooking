"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Video, Home } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a slot",
    description:
      "Share your preferred date, time, and the song you’d like to learn. A ₹500 booking fee holds your slot.",
  },
  {
    icon: Video,
    title: "Connect on Zoom",
    description:
      "We’ll meet online first — to confirm details, understand your goals, and plan how we start.",
  },
  {
    icon: Home,
    title: "Learn your way",
    description:
      "Continue with live Zoom classes, or if you’d rather learn at home, we arrange home service after that first Zoom call.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-warm-dark sm:text-4xl"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-warm-text/60"
          >
            Every booking starts with a Zoom conversation. Online classes begin
            there. Home sessions follow once we&apos;ve aligned on the details.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white p-8 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <step.icon className="h-6 w-6 text-gold" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Step {i + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-warm-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-text/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

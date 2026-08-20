"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BookingSuccess() {
  return (
    <div className="py-8 text-center">
      {/* Animated checkmark */}
      <div className="relative mx-auto mb-6 h-28 w-28">
        {/* Rings */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="absolute inset-0 rounded-full border-4 border-emerald-200"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-2 rounded-full border-4 border-emerald-300"
        />
        {/* Circle fill */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute inset-4 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          {/* Checkmark */}
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="h-10 w-10 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 13l4 4L19 7"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            />
          </motion.svg>
        </motion.div>

        {/* Sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 8)],
              y: [0, -20 - i * 10],
            }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-gold"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-warm-dark">
          Booking Confirmed!
        </h3>
        <p className="mt-3 text-warm-text/60 leading-relaxed max-w-md mx-auto">
          Your slot has been booked and payment received. We&apos;ll reach out
          on your email and phone with the Zoom meeting link and class details.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.1 }}
        className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4"
      >
        <p className="text-sm text-emerald-800">
          <span className="font-semibold">What&apos;s next?</span> Check your
          email for the booking confirmation and Zoom link. See you on the dance
          floor!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.3 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Link href="/">
          <Button variant="outline" size="lg">
            Back to Home
          </Button>
        </Link>
        <Button
          size="lg"
          onClick={() => window.location.reload()}
        >
          Book Another Slot
        </Button>
      </motion.div>
    </div>
  );
}

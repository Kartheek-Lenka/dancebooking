"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BOOKING_FEE_INR, paymentConfig } from "@/config/site";
import { Smartphone, Copy, CheckCircle2, Loader2 } from "lucide-react";

interface PaymentStepProps {
  bookingId: string;
  onPaymentConfirmed: () => void;
}

export function PaymentStep({ bookingId, onPaymentConfirmed }: PaymentStepProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phonepeUrl = `upi://pay?pa=${encodeURIComponent(paymentConfig.phonepeNumber)}&pn=${encodeURIComponent(paymentConfig.phonepeName)}&am=${BOOKING_FEE_INR}&cu=INR&tn=${encodeURIComponent("NrityaRasa Dance Booking Fee")}`;

  async function handleConfirmPayment() {
    setIsConfirming(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/${bookingId}/payment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentStatus: "PAID",
          paymentMethod: "PHONEPE",
        }),
      });

      if (!response.ok) {
        setError("Failed to confirm payment. Please try again.");
        return;
      }

      onPaymentConfirmed();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  }

  function copyNumber() {
    navigator.clipboard.writeText(paymentConfig.phonepeNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5f259f]/10">
          <Smartphone className="h-8 w-8 text-[#5f259f]" />
        </div>
        <h3 className="text-xl font-bold text-warm-dark">
          Complete Payment
        </h3>
        <p className="mt-2 text-sm text-warm-text/60">
          Pay ₹{BOOKING_FEE_INR} via PhonePe to confirm your booking
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mx-auto max-w-sm"
      >
        <div className="rounded-2xl border-2 border-dashed border-[#5f259f]/30 bg-[#5f259f]/5 p-6">
          <div className="text-center space-y-4">
            <p className="text-xs font-medium text-[#5f259f] uppercase tracking-wider">
              PhonePe QR Code
            </p>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-xl bg-white border border-gray-200">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(phonepeUrl)}&bgcolor=ffffff&color=5f259f`}
                alt="PhonePe QR Code"
                className="h-44 w-44"
              />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-warm-dark">
                Or pay to this number
              </p>
              <div className="flex items-center justify-center gap-2">
                <code className="rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-[#5f259f] border border-gray-200">
                  {paymentConfig.phonepeNumber}
                </code>
                <button
                  onClick={copyNumber}
                  className="rounded-lg p-1.5 text-warm-text/50 hover:bg-white hover:text-[#5f259f] transition-colors"
                  aria-label="Copy number"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-warm-text/50">
                {paymentConfig.phonepeName}
              </p>
            </div>

            <div className="rounded-lg bg-white border border-gray-200 px-4 py-2">
              <p className="text-xs text-warm-text/50">Amount to pay</p>
              <p className="text-2xl font-bold text-[#5f259f]">
                ₹{BOOKING_FEE_INR}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-3"
      >
        <ol className="space-y-2 text-sm text-warm-text/70">
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[10px] font-bold text-maroon">
              1
            </span>
            Open PhonePe app on your phone
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[10px] font-bold text-maroon">
              2
            </span>
            Scan the QR code or use the number above
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[10px] font-bold text-maroon">
              3
            </span>
            Pay ₹{BOOKING_FEE_INR} and come back here
          </li>
          <li className="flex items-start gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon/10 text-[10px] font-bold text-maroon">
              4
            </span>
            Click &quot;I&apos;ve Paid&quot; below to confirm
          </li>
        </ol>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Button
          onClick={handleConfirmPayment}
          loading={isConfirming}
          disabled={isConfirming}
          size="lg"
          variant="gold"
          className="w-full"
        >
          {isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            "I've Paid — Confirm Booking"
          )}
        </Button>

        <p className="text-center text-xs text-warm-text/40">
          Your booking will be confirmed after payment verification
        </p>
      </motion.div>
    </div>
  );
}

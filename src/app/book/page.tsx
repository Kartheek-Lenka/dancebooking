import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";
import { BOOKING_FEE_INR } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Slot",
  description:
    "Book a dance learning slot. We’ll connect on Zoom — for online classes, or to plan a home session.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-warm-dark sm:text-4xl">
              Book a Slot
            </h1>
            <p className="mt-4 text-lg text-warm-text/60">
              Share your song preference and how you&apos;d like to learn.
              We&apos;ll connect on Zoom to confirm your class — online, or a
              home session after we discuss the details. Booking fee: ₹
              {BOOKING_FEE_INR}.
            </p>
          </div>
          <div className="rounded-2xl border border-cream bg-white p-6 shadow-sm sm:p-8">
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

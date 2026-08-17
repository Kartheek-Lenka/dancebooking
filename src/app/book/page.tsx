import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Performance",
  description:
    "Book beautiful dance performances for your special occasion. Fill out the form to request a booking.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-warm-dark sm:text-4xl">
              Bring Dance to Your Celebration
            </h1>
            <p className="mt-4 text-lg text-warm-text/60">
              Tell us about your occasion and we&apos;ll help create the
              perfect performance.
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

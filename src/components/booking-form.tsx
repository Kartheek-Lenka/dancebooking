"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      occasionType: "",
      danceStyle: "",
      email: "",
      phone: "",
      performanceDate: "",
      performanceType: "",
      message: "",
    },
  });

  async function onSubmit(data: BookingFormData) {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.error || "Something went wrong. Please try again."
        );
        return;
      }

      setIsSuccess(true);
      reset();
    } catch {
      setServerError(
        "Unable to connect. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-semibold text-warm-dark">
          Booking Request Received!
        </h3>
        <p className="mt-2 text-warm-text/60">
          Thank you! We&apos;ll get in touch with you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <Input
        label="Full Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Occasion Type"
          placeholder="Select occasion"
          error={errors.occasionType?.message}
          options={siteConfig.occasionTypes.map((o) => ({
            value: o,
            label: o,
          }))}
          {...register("occasionType")}
        />

        <Select
          label="Dance Style"
          placeholder="Select dance style"
          error={errors.danceStyle?.message}
          options={siteConfig.danceStyles.map((s) => ({
            value: s,
            label: s,
          }))}
          {...register("danceStyle")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Performance Date"
          type="date"
          error={errors.performanceDate?.message}
          {...register("performanceDate")}
        />

        <Select
          label="Performance Type"
          placeholder="Select type"
          error={errors.performanceType?.message}
          options={siteConfig.performanceTypes.map((t) => ({
            value: t,
            label: t,
          }))}
          {...register("performanceType")}
        />
      </div>

      <Textarea
        label="Additional Message (Optional)"
        placeholder="Tell us anything else about your event..."
        {...register("message")}
      />

      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Request Booking"}
      </Button>
    </form>
  );
}

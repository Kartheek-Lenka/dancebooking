"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import { BOOKING_FEE_INR, siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Video, Home } from "lucide-react";
import { SongPicker } from "@/components/song-picker";
import type { SongIndustry } from "@/lib/songs";

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      slotDate: "",
      preferredTime: undefined,
      lessonMode: undefined,
      songIndustry: undefined,
      songPreference: "",
      songAlbum: "",
      address: "",
      message: "",
    },
  });

  const lessonMode = watch("lessonMode");

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
          Slot request received
        </h3>
        <p className="mt-2 text-warm-text/60">
          Thank you! We&apos;ll connect with you on Zoom to confirm your slot
          and the ₹{BOOKING_FEE_INR} booking fee.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Book another slot
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

      <div>
        <p className="mb-2 block text-sm font-medium text-warm-dark">
          How would you like to learn?
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {siteConfig.lessonModes.map((mode) => {
            const selected = lessonMode === mode.value;
            const Icon = mode.value === "ONLINE" ? Video : Home;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() =>
                  setValue("lessonMode", mode.value, { shouldValidate: true })
                }
                className={`rounded-xl border p-4 text-left transition-colors ${
                  selected
                    ? "border-gold bg-gold/5 ring-1 ring-gold"
                    : "border-cream bg-white hover:border-gold/40"
                }`}
              >
                <span className="flex items-center gap-2 font-medium text-warm-dark">
                  <Icon className="h-4 w-4 text-gold" />
                  {mode.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-warm-text/60">
                  {mode.description}
                </span>
              </button>
            );
          })}
        </div>
        {errors.lessonMode && (
          <p className="mt-1.5 text-sm text-red-500">
            {errors.lessonMode.message}
          </p>
        )}
      </div>

      {lessonMode === "HOME_SERVICE" && (
        <div className="space-y-2">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Home service is currently available only in Bengaluru.
          </div>
          <Textarea
            label="Address"
            placeholder="House / street, area, Bengaluru, Karnataka"
            error={errors.address?.message}
            {...register("address")}
          />
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Preferred slot date"
          type="date"
          error={errors.slotDate?.message}
          {...register("slotDate")}
        />

        <Select
          label="Preferred time"
          placeholder="Select time of day"
          error={errors.preferredTime?.message}
          options={siteConfig.preferredTimes.map((t) => ({
            value: t,
            label: t,
          }))}
          {...register("preferredTime")}
        />
      </div>

      <SongPicker
        industry={watch("songIndustry")}
        songName={watch("songPreference")}
        songAlbum={watch("songAlbum")}
        onIndustryChange={(value: SongIndustry) =>
          setValue("songIndustry", value, { shouldValidate: true })
        }
        onSongChange={({ name, album }) => {
          setValue("songPreference", name, { shouldValidate: true });
          setValue("songAlbum", album ?? "", { shouldValidate: false });
        }}
        industryError={errors.songIndustry?.message}
        songError={errors.songPreference?.message}
      />

      <Textarea
        label="Anything else? (Optional)"
        placeholder="Tell us about your dance background, goals, or questions..."
        {...register("message")}
      />

      <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-gold/5 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-warm-dark">Booking fee</p>
          <p className="text-xs text-warm-text/60">
            Confirmed when we connect on Zoom
          </p>
        </div>
        <p className="text-lg font-semibold text-maroon">₹{BOOKING_FEE_INR}</p>
      </div>

      <Button
        type="submit"
        size="lg"
        loading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Book a Slot"}
      </Button>
    </form>
  );
}

import { z } from "zod";
import { BOOKING_FEE_INR } from "@/config/site";
import { songIndustries } from "@/lib/songs";

export const lessonModes = ["ONLINE", "HOME_SERVICE"] as const;
export const preferredTimes = ["Morning", "Afternoon", "Evening"] as const;
const bengaluruMatchers = [
  "bengaluru",
  "bangalore",
  "bengalooru",
  "b'lore",
];

export const bookingSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(
        /^[6-9]\d{9}$/,
        "Please enter a valid 10-digit Indian mobile number"
      ),
    slotDate: z
      .string()
      .min(1, "Please select a preferred slot date")
      .refine((date) => {
        const selected = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      }, "Slot date cannot be in the past"),
    preferredTime: z.enum(preferredTimes, {
      message: "Please select a preferred time",
    }),
    lessonMode: z.enum(lessonModes, {
      message: "Please choose online Zoom or home service",
    }),
    songIndustry: z.enum(songIndustries, {
      message: "Please choose Bollywood or Tollywood",
    }),
    songPreference: z
      .string()
      .min(2, "Please share at least one song you'd like to learn")
      .max(1000, "Song names must be less than 1000 characters"),
    songAlbum: z.string().max(500).optional(),
    address: z.string().max(300, "Address must be less than 300 characters").optional(),
    message: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.lessonMode === "HOME_SERVICE") {
      const address = data.address?.trim() ?? "";
      if (address.length < 8) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message: "Please enter your address so we can plan the home visit",
        });
        return;
      }

      const addressLower = address.toLowerCase();
      const isBengaluru = bengaluruMatchers.some((matcher) =>
        addressLower.includes(matcher)
      );
      if (!isBengaluru) {
        ctx.addIssue({
          code: "custom",
          path: ["address"],
          message:
            "Home service is currently available only in Bengaluru (Bangalore).",
        });
      }
    }
  });

export type BookingFormData = z.infer<typeof bookingSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export { BOOKING_FEE_INR };

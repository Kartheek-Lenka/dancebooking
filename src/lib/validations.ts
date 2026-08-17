import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  occasionType: z.string().min(1, "Please select an occasion type"),
  danceStyle: z.string().min(1, "Please select a dance style"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number"
    ),
  performanceDate: z
    .string()
    .min(1, "Please select a performance date")
    .refine((date) => {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Performance date cannot be in the past"),
  performanceType: z.string().min(1, "Please select a performance type"),
  message: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

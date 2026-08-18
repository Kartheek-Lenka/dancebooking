export const BOOKING_FEE_INR = 500;

export const siteConfig = {
  brandName: "NrityaRasa",
  tagline: "Beautiful Dance Performances for Every Occasion",
  description:
    "Book a slot to learn dance in a personal Zoom class. Prefer in-person? We connect on Zoom first to discuss details, then arrange a home session.",
  contact: {
    name: "Shiyoni Sagar Sisinty",
    phone: "+91 8523862893",
    address: "Bengaluru, Karnataka",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  bookingFee: BOOKING_FEE_INR,
  statistics: {
    bookingFee: "₹500",
    modes: "2",
    format: "1:1",
  },
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  lessonModes: [
    {
      value: "ONLINE",
      label: "Online Zoom class",
      description:
        "Learn live on Zoom from wherever you are. We’ll send the meeting link after your slot is confirmed.",
    },
    {
      value: "HOME_SERVICE",
      label: "Home service",
      description:
        "Prefer in-person? We’ll first connect on Zoom to discuss details. Home service is currently available only in Bengaluru.",
    },
  ],
  preferredTimes: ["Morning", "Afternoon", "Evening"],
  songIndustries: [
    { value: "BOLLYWOOD", label: "Bollywood", subtitle: "Hindi songs" },
    { value: "TOLLYWOOD", label: "Tollywood", subtitle: "Telugu songs" },
  ],
} as const;

export const siteConfig = {
  brandName: "NrityaRasa",
  tagline: "Beautiful Dance Performances for Every Occasion",
  description:
    "Book beautiful classical, semi-classical, western and group dance performances for weddings, celebrations, events and special occasions.",
  contact: {
    name: "Shiyoni Sagar Sisinty",
    phone: "+91 8523862893",
    address: "Bengaluru, Karnataka",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  statistics: {
    performances: "100+",
    events: "20+",
    danceStyles: "4",
  },
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Performances", href: "#performances" },
    { label: "Contact", href: "#contact" },
  ],
  occasionTypes: [
    "Wedding",
    "Engagement",
    "Reception",
    "Birthday",
    "Anniversary",
    "Corporate Event",
    "College Event",
    "School Event",
    "Cultural Event",
    "Festival",
    "Private Celebration",
    "Other",
  ],
  danceStyles: ["Classical", "Semi Classical", "Western", "Mass / Group"],
  performanceTypes: ["Solo Performance", "Group Performance"],
} as const;

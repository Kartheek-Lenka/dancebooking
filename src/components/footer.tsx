"use client";

import { siteConfig } from "@/config/site";
import { Phone, MapPin, User } from "lucide-react";

const footerNav = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Performances", href: "#performances" },
  { label: "Contact", href: "#contact" },
];

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Footer() {
  return (
    <footer id="contact" className="bg-warm-dark text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-xl font-bold text-white tracking-wide"
              style={{ fontFamily: "'Casko Luxury Demo', Georgia, serif" }}
            >
              {siteConfig.brandName}
            </h3>
            <p className="text-sm leading-relaxed">
              Beautiful dance performances that make your special occasions
              unforgettable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(item.href);
                    }}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 flex-shrink-0" />
                {siteConfig.contact.name}
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

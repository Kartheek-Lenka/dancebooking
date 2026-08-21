"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

function scrollToHash(hash: string) {
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function NavLink({
  href,
  onClick,
  className,
  children,
}: {
  href: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (href.startsWith("#")) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (pathname !== "/") {
        window.location.href = "/" + href;
      } else {
        scrollToHash(href);
      }
      onClick?.();
    };

    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-warm-dark shadow-md"
          : "bg-warm-dark/90"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            className="text-2xl font-bold text-white tracking-wide"
            style={{ fontFamily: "'Righteous', Georgia, serif" }}
          >
            {siteConfig.brandName}
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {siteConfig.navigation.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-gold transition-colors"
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="/book">
              <Button size="sm" className="bg-gold text-white hover:bg-gold-dark border-none">
                Book a Slot
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-warm-dark shadow-xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-5">
                  <span
                    className="text-xl font-bold text-white tracking-wide"
                    style={{ fontFamily: "'Righteous', Georgia, serif" }}
                  >
                    {siteConfig.brandName}
                  </span>
                  <button
                    onClick={closeMobile}
                    className="p-2 text-white/70"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 space-y-1 px-4">
                  {siteConfig.navigation.map((item) => (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      onClick={closeMobile}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 hover:text-gold transition-colors"
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <div className="border-t border-white/10 px-6 py-5">
                  <Link href="/book" onClick={closeMobile}>
                    <Button className="w-full bg-gold text-white hover:bg-gold-dark border-none">
                      Book a Slot
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartDrawer } from "./CartDrawer";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-border/30" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" aria-label="ORIGEN home" className="block">
          <OrigenLogo />
        </Link>
        <nav className="flex items-center gap-6 md:gap-10 text-[0.72rem] tracking-[0.22em] uppercase">
          <Link to="/" hash="products" className="text-foreground/80 hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/the-ritual" className="text-foreground/80 hover:text-primary transition-colors">
            The Ritual
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </Link>
          <CartDrawer />
        </nav>
      </div>
    </header>
  );
}

const GOLD = "#C9A96E";

function OrigenLogo() {
  return (
    <div className="flex items-center" style={{ gap: 12 }}>
      {/* Sunrise symbol — 32x32 viewBox */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Baseline */}
        <line x1="2" y1="22" x2="30" y2="22" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        {/* Open semicircle arc sitting on baseline (top half only) */}
        <path d="M 5 22 A 11 11 0 0 1 27 22" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Three rays radiating upward from above center */}
        <line x1="16" y1="14" x2="16" y2="6" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <line x1="13" y1="14.5" x2="9" y2="8" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <line x1="19" y1="14.5" x2="23" y2="8" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        {/* Solid sun circle on baseline */}
        <circle cx="16" cy="22" r="2.2" fill={GOLD} />
      </svg>
      {/* Wordmark — hidden on mobile */}
      <span
        className="hidden md:inline-block serif"
        style={{
          color: GOLD,
          fontWeight: 400,
          fontSize: "18px",
          letterSpacing: "0.3em",
          lineHeight: 1,
        }}
      >
        ORIGEN
      </span>
    </div>
  );
}
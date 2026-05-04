import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { useLanguageStore } from "@/stores/languageStore";
import { useCurrencyStore } from "@/stores/currencyStore";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguageStore();
  const { fetchRates } = useCurrencyStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

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
        <nav className="flex items-center gap-4 md:gap-6 text-[0.72rem] tracking-[0.22em] uppercase flex-wrap justify-end">
          <Link to="/" hash="products" className="text-foreground/80 hover:text-primary transition-colors">
            {t.nav.shop}
          </Link>
          <Link to="/the-ritual" className="text-foreground/80 hover:text-primary transition-colors">
            {t.nav.ritual}
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
            {t.nav.about}
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
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <line x1="2" y1="22" x2="30" y2="22" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <path d="M 5 22 A 11 11 0 0 1 27 22" stroke={GOLD} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <line x1="16" y1="14" x2="16" y2="6" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <line x1="13" y1="14.5" x2="9" y2="8" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <line x1="19" y1="14.5" x2="23" y2="8" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
        <circle cx="16" cy="22" r="2.2" fill={GOLD} />
      </svg>
      <span
        className="hidden md:inline-block serif"
        style={{ color: GOLD, fontWeight: 400, fontSize: "18px", letterSpacing: "0.3em", lineHeight: 1 }}
      >
        ORIGEN
      </span>
    </div>
  );
}

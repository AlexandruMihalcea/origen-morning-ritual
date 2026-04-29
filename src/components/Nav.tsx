import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 flex items-center justify-between backdrop-blur-sm">
        <Link
          to="/"
          className="serif text-xl tracking-[0.3em] text-foreground"
          style={{ fontWeight: 500 }}
        >
          ORIGEN
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
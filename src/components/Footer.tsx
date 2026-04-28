import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="serif text-2xl tracking-[0.3em]">ORIGEN</div>
          <p className="mt-3 text-sm text-muted-foreground italic serif">
            Back to basics. Fly higher.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-[0.72rem] tracking-[0.22em] uppercase md:justify-center">
          <Link to="/" hash="products" className="hover:text-primary transition-colors">Shop</Link>
          <Link to="/the-ritual" className="hover:text-primary transition-colors">The Ritual</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <a href="mailto:hello@origen.co" className="hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="text-xs text-muted-foreground md:text-right">
          © 2026 ORIGEN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
import { Link } from "@tanstack/react-router";
import { useLanguageStore } from "@/stores/languageStore";

export function Footer() {
  const { t } = useLanguageStore();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid gap-10 md:grid-cols-3 items-start">
        <div>
          <div className="serif text-2xl tracking-[0.3em]">ORIGEN</div>
          <p className="mt-3 text-sm text-muted-foreground italic serif">{t.footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[0.72rem] tracking-[0.22em] uppercase md:justify-center">
          <Link to="/" hash="products" className="hover:text-primary transition-colors">{t.footer.shop}</Link>
          <Link to="/the-ritual" className="hover:text-primary transition-colors">{t.footer.ritual}</Link>
          <Link to="/about" className="hover:text-primary transition-colors">{t.footer.about}</Link>
          <a href="mailto:hello@origen.co" className="hover:text-primary transition-colors">{t.footer.contact}</a>
          <Link to="/terms" className="hover:text-primary transition-colors">{t.footer.terms}</Link>
          <Link to="/refund-policy" className="hover:text-primary transition-colors">{t.footer.refund}</Link>
        </nav>
        <div className="text-xs text-muted-foreground md:text-right">{t.footer.copyright}</div>
      </div>
    </footer>
  );
}

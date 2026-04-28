import { Link } from "@tanstack/react-router";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";

export type ProductInfo = {
  step: string;
  label: string;
  name: string;
  tagline: string;
  intro: string;
  benefits: { title: string; body: string }[];
  shopifyUrl: string;
};

export function ProductPage({ p }: { p: ProductInfo }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-32 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link to="/" hash="products" className="text-xs tracking-[0.22em] uppercase text-muted-foreground hover:text-primary transition-colors">
              ← Back to the kit
            </Link>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <Reveal>
              <div className="aspect-[4/5] bg-card rounded-sm relative overflow-hidden grain border border-border/40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="serif text-[8rem] md:text-[12rem] text-primary/20 leading-none">
                      {p.step}
                    </div>
                    <div className="eyebrow mt-4">{p.label}</div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
                  }}
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <span className="eyebrow">Step {p.step} — {p.label}</span>
              <h1 className="serif mt-4 text-5xl md:text-7xl leading-[1.05]">{p.name}</h1>
              <p className="serif italic text-2xl text-primary mt-4">{p.tagline}</p>
              <p className="mt-8 text-lg leading-[1.8] text-foreground/85">{p.intro}</p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href={p.shopifyUrl} className="btn-gold">Add to ritual <span>→</span></a>
                <Link to="/the-ritual" className="btn-gold" style={{ borderColor: "color-mix(in oklab, var(--primary) 40%, transparent)" }}>
                  Read the ritual
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="gold-divider my-24" />

          <div className="grid md:grid-cols-3 gap-10">
            {p.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 120}>
                <h3 className="serif text-2xl text-primary">{b.title}</h3>
                <p className="mt-4 text-foreground/80 leading-[1.8]">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
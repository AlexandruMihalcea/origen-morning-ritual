import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { RitualBundle } from "../components/RitualBundle";
import { useLanguageStore } from "@/stores/languageStore";
import { subscribeEmail } from "@/lib/shopify";
import matHero from "@/assets/mat-hero.jpg";
import rollerHero from "@/assets/roller-hero.jpg";
import oilHero from "@/assets/oil-hero.jpg";
import heroVideo from "@/assets/hero-video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORIGEN — Back to basics. Fly higher." },
      { name: "description", content: "A twenty-minute morning ritual. Pressure. Cold. Nourish. Three tools that change the baseline of the day." },
      { property: "og:title", content: "ORIGEN — Back to basics. Fly higher." },
      { property: "og:description", content: "Twenty minutes. Three tools. One ritual." },
    ],
  }),
  component: Index,
});

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguageStore();

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const y = window.scrollY;
      ref.current.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      ref.current.style.opacity = String(Math.max(0, 1 - y / 600));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grain">
      <video autoPlay muted loop playsInline src={heroVideo} className="absolute inset-0 w-full h-full object-cover z-0" />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, oklch(0.16 0.005 90 / 0.55) 0%, oklch(0.16 0.005 90 / 0.3) 50%, oklch(0.16 0.005 90 / 0.7) 100%)" }}
      />
      <div ref={ref} className="relative z-10 px-6 md:px-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow">{t.hero.eyebrow}</span>
        </Reveal>
        <Reveal delay={250}>
          <h1 className="serif mt-8 text-[2.75rem] sm:text-6xl md:text-[5rem] leading-[1.02] max-w-4xl">
            {t.hero.headline}
            <br />
            <span className="italic text-primary">{t.hero.headlineItalic}</span>
          </h1>
        </Reveal>
        <Reveal delay={550}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-foreground/75 leading-[1.7]">{t.hero.body}</p>
        </Reveal>
        <Reveal delay={800}>
          <div className="mt-12">
            <Link to="/the-ritual" className="btn-gold">
              {t.hero.cta} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.4em] uppercase text-foreground/40">
        {t.hero.scroll}
      </div>
    </section>
  );
}

function ProblemSection() {
  const { t } = useLanguageStore();
  return (
    <section className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <Reveal>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-foreground/90">{t.problem.line1}</p>
        </Reveal>
        <Reveal delay={150}>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-foreground/60 italic">{t.problem.line2}</p>
        </Reveal>
        <Reveal delay={300}>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-primary">{t.problem.line3}</p>
        </Reveal>
      </div>
    </section>
  );
}

function RitualSection() {
  const { t } = useLanguageStore();
  return (
    <section id="ritual" className="py-32 md:py-44 px-6 md:px-10 bg-card/40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t.ritual.eyebrow}</span>
          <p className="serif mt-8 text-2xl md:text-3xl leading-[1.5] text-foreground/85 italic">{t.ritual.tagline}</p>
        </Reveal>

        <div className="mt-24 grid md:grid-cols-3 gap-12 md:gap-10">
          {t.ritual.steps.map((s, i) => (
            <Reveal key={s.label} delay={i * 150}>
              <div className="relative pl-2">
                <div className="serif text-7xl md:text-8xl text-primary/15 leading-none select-none absolute -top-6 -left-2">
                  0{i + 1}
                </div>
                <div className="relative pt-12">
                  <div className="eyebrow">Step {i + 1} — {s.label}</div>
                  <p className="mt-6 text-foreground/80 leading-[1.8]">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-24 text-center">
          <p className="serif text-xl md:text-2xl text-foreground/85 italic">{t.ritual.closing}</p>
          <div className="mt-10">
            <Link to="/" hash="products" className="btn-gold">
              {t.ritual.cta} <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { t } = useLanguageStore();

  const products = [
    { ...t.products.mat, to: "/the-mat" as const, n: "01", image: matHero,
      bg: "radial-gradient(ellipse at 30% 40%, oklch(0.32 0.06 150 / 0.95), oklch(0.14 0.02 150) 70%)" },
    { ...t.products.roller, to: "/the-roller" as const, n: "02", image: rollerHero as string | null,
      bg: "radial-gradient(ellipse at 70% 50%, oklch(0.40 0.04 235 / 0.9), oklch(0.16 0.02 240) 70%)" },
    { ...t.products.oil, to: "/the-oil" as const, n: "03", image: oilHero as string | null,
      bg: "radial-gradient(ellipse at 40% 60%, oklch(0.45 0.10 60 / 0.92), oklch(0.18 0.04 50) 70%)" },
  ];

  return (
    <section id="products" className="py-32 md:py-44 px-6 md:px-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">{t.products.eyebrow}</span>
          <p className="serif mt-8 text-2xl md:text-3xl leading-[1.5] text-foreground/85 italic">{t.products.tagline}</p>
        </Reveal>

        <div className="mt-24 flex flex-col">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <Link
                to={p.to}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                className={`group flex flex-row items-center min-h-[160px] border-t border-border/30 ${
                  i === products.length - 1 ? "border-b" : ""
                } transition-colors duration-[400ms] hover:border-primary/50 ${hovered === i ? "border-primary/50" : ""}`}
              >
                <div className="flex-none w-16 pl-4 md:pl-6">
                  <div className="serif text-primary/20 leading-none" style={{ fontSize: "4rem" }}>{p.n}</div>
                </div>
                <div className="flex-1 px-6 md:px-10 py-6">
                  <div className="eyebrow">{p.label}</div>
                  <h3 className="serif mt-3 text-3xl leading-[1.05] tracking-tight transition-colors group-hover:text-primary">{p.name}</h3>
                  <p className="serif italic text-primary text-lg mt-2">{p.tagline}</p>
                  <p className="hidden md:block mt-3 text-sm text-foreground/70 leading-[1.7] line-clamp-2 max-w-2xl">{p.body}</p>
                </div>
                <div
                  className="overflow-hidden flex-none"
                  style={{
                    width: hovered === i ? "16rem" : "0rem",
                    transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="block" style={{ width: "16rem", aspectRatio: "3 / 2", objectFit: "cover" }} />
                  ) : (
                    <div className="bg-card grain" style={{ width: "16rem", aspectRatio: "3 / 2", background: p.bg }} />
                  )}
                </div>
                <div
                  className="flex-none w-12 md:w-16 flex justify-center text-primary text-2xl"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "translateX(0)" : "translateX(-8px)",
                    transition: "opacity 400ms ease, transform 400ms ease",
                  }}
                >
                  →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const { t } = useLanguageStore();
  return (
    <section className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="bg-card border border-border/50 p-10 md:p-16 text-center grain relative">
            <span className="eyebrow">{t.story.eyebrow}</span>
            <div className="mt-8 space-y-6 text-foreground/85 leading-[1.9] text-lg">
              <p className="serif text-2xl md:text-3xl text-foreground italic">{t.story.headline}</p>
              <p>{t.story.body1}</p>
              <p>{t.story.body2}</p>
              <p className="text-foreground/70 italic">{t.story.body3}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EmailSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useLanguageStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(false);
    const { success } = await subscribeEmail(email);
    setLoading(false);
    if (success) {
      setDone(true);
    } else {
      setError(true);
    }
  };

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10 relative grain"
      style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 22%, var(--background)) 0%, var(--background) 100%)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="serif text-4xl md:text-6xl">{t.email.headline}</h2>
          <p className="mt-6 text-foreground/80 text-lg">{t.email.body}</p>
        </Reveal>
        <Reveal delay={200}>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.email.placeholder}
              disabled={done || loading}
              className="flex-1 bg-transparent border border-primary/50 px-5 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm tracking-wider disabled:opacity-50"
            />
            <button type="submit" className="btn-gold justify-center" disabled={done || loading}>
              {loading ? "..." : done ? t.email.success : t.email.cta}
            </button>
          </form>
          {error && (
            <p className="mt-3 text-sm text-destructive">{t.email.error}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <Hero />
      <div className="gold-divider mx-auto max-w-5xl" />
      <ProblemSection />
      <div className="gold-divider mx-auto max-w-5xl" />
      <RitualSection />
      <div className="gold-divider mx-auto max-w-5xl" />
      <ProductsSection />
      <div className="gold-divider mx-auto max-w-5xl" />
      <RitualBundle />
      <div className="gold-divider mx-auto max-w-5xl" />
      <StorySection />
      <EmailSection />
      <Footer />
    </div>
  );
}

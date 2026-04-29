import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
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

const products = [
  {
    n: "01",
    label: "Pressure",
    name: "The Mat",
    tagline: "Pressure that grounds.",
    body:
      "Lie down. Let go. The mat's 8,820 acupressure points release tension held in the back, neck, and shoulders — activating the nervous system and flooding the body with endorphins. Ten minutes is enough to feel the shift.",
    to: "/the-mat" as const,
    handle: "acupressure-mat-sensi-massage-mat-pillow-set-applicator-for-neck-foot",
    bg: "radial-gradient(ellipse at 30% 40%, oklch(0.32 0.06 150 / 0.95), oklch(0.14 0.02 150) 70%)",
    image: matHero,
  },
  {
    n: "02",
    label: "Cold",
    name: "The Roller",
    tagline: "Cold that sharpens.",
    body:
      "Roll. Reduce. Reset. Cold therapy reduces morning puffiness, calms inflammation, and signals the brain to wake — without the crash that follows stimulants. The simplest tool in the ritual. Often the most addictive.",
    to: "/the-roller" as const,
    handle: "anti-ageing-treatment-for-face-and-neck-ecotools-jade-jade-set-2",
    bg: "radial-gradient(ellipse at 70% 50%, oklch(0.40 0.04 235 / 0.9), oklch(0.16 0.02 240) 70%)",
    image: rollerHero as string | null,
  },
  {
    n: "03",
    label: "Nourish",
    name: "The Oil",
    tagline: "Nourishment that protects.",
    body:
      "The skin is warm from the mat, activated from the roller. Applied now, it absorbs completely. Cold-pressed botanical oil that nourishes, protects, and seals — the ritual's final act.",
    to: "/the-oil" as const,
    handle: "facial-oil-la-provencale-bio-30-ml",
    bg: "radial-gradient(ellipse at 40% 60%, oklch(0.45 0.10 60 / 0.92), oklch(0.18 0.04 50) 70%)",
    image: oilHero as string | null,
  },
];

const ritualSteps = [
  {
    n: "01",
    label: "Pressure",
    body:
      "Lie on the mat. Let the points do the work. Tension releases. The nervous system resets. You arrive in your body before the day asks anything of you.",
  },
  {
    n: "02",
    label: "Cold",
    body:
      "The roller signals the body to wake — naturally, cleanly. Inflammation down. Mind sharp. No caffeine required.",
  },
  {
    n: "03",
    label: "Nourish",
    body:
      "While the skin is warm and open, the oil absorbs completely. Nourishment that protects and seals — the ritual's final act.",
  },
];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
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
      <video
        autoPlay
        muted
        loop
        playsInline
        src={heroVideo}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.16 0.005 90 / 0.55) 0%, oklch(0.16 0.005 90 / 0.3) 50%, oklch(0.16 0.005 90 / 0.7) 100%)",
        }}
      />
      <div ref={ref} className="relative z-10 px-6 md:px-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow">Morning ritual</span>
        </Reveal>
        <Reveal delay={250}>
          <h1 className="serif mt-8 text-[2.75rem] sm:text-6xl md:text-[5rem] leading-[1.02] max-w-4xl">
            Before the world starts,
            <br />
            <span className="italic text-primary">this is yours.</span>
          </h1>
        </Reveal>
        <Reveal delay={550}>
          <p className="mt-10 max-w-xl text-lg md:text-xl text-foreground/75 leading-[1.7]">
            Twenty minutes. Three tools. One ritual that changes the baseline for everything that follows.
          </p>
        </Reveal>
        <Reveal delay={800}>
          <div className="mt-12">
            <Link to="/the-ritual" className="btn-gold">
              Begin the ritual <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.4em] uppercase text-foreground/40">
        Scroll
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <Reveal>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-foreground/90">
            Most mornings are stolen before they begin.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-foreground/60 italic">
            Phone first. Notifications. Obligations. Cortisol before coffee.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p className="serif text-2xl md:text-4xl leading-[1.4] text-primary">
            ORIGEN gives the morning back.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function RitualSection() {
  return (
    <section id="ritual" className="py-32 md:py-44 px-6 md:px-10 bg-card/40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">The Ritual</span>
          <p className="serif mt-8 text-2xl md:text-3xl leading-[1.5] text-foreground/85 italic">
            Not a routine. Not a hack. A return to what the body already knows.
          </p>
        </Reveal>

        <div className="mt-24 grid md:grid-cols-3 gap-12 md:gap-10">
          {ritualSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 150}>
              <div className="relative pl-2">
                <div className="serif text-7xl md:text-8xl text-primary/15 leading-none select-none absolute -top-6 -left-2">
                  {s.n}
                </div>
                <div className="relative pt-12">
                  <div className="eyebrow">Step {s.n.replace("0", "")} — {s.label}</div>
                  <p className="mt-6 text-foreground/80 leading-[1.8]">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500} className="mt-24 text-center">
          <p className="serif text-xl md:text-2xl text-foreground/85 italic">
            Three steps. Twenty minutes. A completely different day.
          </p>
          <div className="mt-10">
            <Link to="/" hash="products" className="btn-gold">
              Shop the ritual <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProductsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="products" className="py-32 md:py-44 px-6 md:px-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="eyebrow">The Kit</span>
          <p className="serif mt-8 text-2xl md:text-3xl leading-[1.5] text-foreground/85 italic">
            Each product works alone. Together, they are ORIGEN.
          </p>
        </Reveal>

        <div className="mt-24 flex flex-col">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <ProductRow
                copy={p}
                isHovered={hovered === i}
                isLast={i === products.length - 1}
                onEnter={() => setHovered(i)}
                onLeave={() => setHovered((h) => (h === i ? null : h))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRow({
  copy,
  isHovered,
  isLast,
  onEnter,
  onLeave,
}: {
  copy: (typeof products)[number];
  isHovered: boolean;
  isLast: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <Link
      to={copy.to}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group flex flex-row items-center min-h-[160px] border-t border-border/30 ${
        isLast ? "border-b" : ""
      } transition-colors duration-[400ms] hover:border-primary/50 ${
        isHovered ? "border-primary/50" : ""
      }`}
    >
      {/* Number */}
      <div className="flex-none w-16 pl-4 md:pl-6">
        <div
          className="serif text-primary/20 leading-none"
          style={{ fontSize: "4rem" }}
        >
          {copy.n}
        </div>
      </div>

      {/* Middle */}
      <div className="flex-1 px-6 md:px-10 py-6">
        <div className="eyebrow">{copy.label}</div>
        <h3 className="serif mt-3 text-3xl leading-[1.05] tracking-tight transition-colors group-hover:text-primary">
          {copy.name}
        </h3>
        <p className="serif italic text-primary text-lg mt-2">{copy.tagline}</p>
        <p className="hidden md:block mt-3 text-sm text-foreground/70 leading-[1.7] line-clamp-2 max-w-2xl">
          {copy.body}
        </p>
      </div>

      {/* Image reveal panel */}
      <div
        className="overflow-hidden flex-none"
        style={{
          width: isHovered ? "16rem" : "0rem",
          transition: "width 600ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {copy.image ? (
          <img
            src={copy.image}
            alt={copy.name}
            className="block"
            style={{ width: "16rem", aspectRatio: "3 / 2", objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-card grain"
            style={{
              width: "16rem",
              aspectRatio: "3 / 2",
              background: `radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--primary) 30%, transparent) 0%, var(--card) 70%), ${copy.bg}`,
            }}
          />
        )}
      </div>

      {/* Arrow */}
      <div
        className="flex-none w-12 md:w-16 flex justify-center text-primary text-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 400ms ease, transform 400ms ease",
        }}
      >
        →
      </div>
    </Link>
  );
}

function StorySection() {
  return (
    <section className="py-32 md:py-44 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="bg-card border border-border/50 p-10 md:p-16 text-center grain relative">
            <span className="eyebrow">Our story</span>
            <div className="mt-8 space-y-6 text-foreground/85 leading-[1.9] text-lg">
              <p className="serif text-2xl md:text-3xl text-foreground italic">
                ORIGEN started with one question: why does the morning feel like something to survive?
              </p>
              <p>
                We looked at what the body actually needs — not a supplement stack, not a cold plunge facility,
                not an hour of complicated breathwork. Three things. Pressure to release what sleep couldn't.
                Cold to wake what needs waking. Nourishment to seal and protect.
              </p>
              <p>
                That's ORIGEN. Back to the basics that work. The twenty minutes before the world asks anything
                of you.
              </p>
              <p className="text-foreground/70 italic">
                We built this for people who take their mornings seriously — not because they have to, but
                because they've learned what it costs not to.
              </p>
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
  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10 relative grain"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--primary) 22%, var(--background)) 0%, var(--background) 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="serif text-4xl md:text-6xl">Join the ritual.</h2>
          <p className="mt-6 text-foreground/80 text-lg">
            Early access. First order discount. Nothing else.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-primary/50 px-5 py-4 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary transition-colors text-sm tracking-wider"
            />
            <button type="submit" className="btn-gold justify-center">
              {done ? "Welcome ✓" : "I'm in"}
            </button>
          </form>
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
      <StorySection />
      <EmailSection />
      <Footer />
    </div>
  );
}

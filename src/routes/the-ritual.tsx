import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/the-ritual")({
  head: () => ({
    meta: [
      { title: "The Ritual — ORIGEN" },
      { name: "description", content: "Twenty minutes. Three tools. Pressure → Cold → Nourish. The morning ritual that changes everything that follows." },
      { property: "og:title", content: "The Ritual — ORIGEN" },
      { property: "og:description", content: "Pressure. Cold. Nourish. Twenty minutes." },
    ],
  }),
  component: RitualPage,
});

const steps = [
  {
    n: "01",
    label: "Pressure",
    time: "10 minutes",
    body:
      "Lie on the acupressure mat. Pillow under the neck. The 8,820 points stimulate pressure receptors across the back and neck, triggering the release of endorphins and oxytocin. Cortisol drops. The nervous system shifts from sympathetic to parasympathetic. You don't need to do anything. That's the point.",
  },
  {
    n: "02",
    label: "Cold",
    time: "3 minutes",
    body:
      "Take the roller. Start at the forehead, move outward and down. Cold therapy triggers vasoconstriction — blood vessels narrow, then dilate. Inflammation reduces. Puffiness disappears. The alertness that follows is earned, not borrowed.",
  },
  {
    n: "03",
    label: "Nourish",
    time: "2 minutes",
    body:
      "Warm the oil between your palms. Press into the face, neck, and décolletage. The skin is at its most receptive — warm from the mat, circulation activated from the roller. This is when it absorbs deepest. Two minutes. The ritual's seal.",
  },
];

function RitualPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32">
        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="eyebrow">The Ritual</span>
              <h1 className="serif mt-6 text-5xl md:text-8xl leading-[1.0]">The Ritual</h1>
            </Reveal>
            <Reveal delay={200} className="mt-12 max-w-2xl text-lg md:text-xl leading-[1.8] text-foreground/85">
              Twenty minutes. That's all this takes. Not a morning routine you'll abandon in two weeks. Three
              tools. A sequence that works with the body's own systems. Done before your first coffee.
            </Reveal>
          </div>
        </section>

        <div className="gold-divider my-24 mx-auto max-w-5xl" />

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow">Why the morning</span>
              <p className="mt-8 text-lg md:text-xl leading-[1.8] text-foreground/85">
                The morning is the only part of the day that is entirely yours — before the inbox, the
                obligations, the decisions start accumulating. What you do with those first twenty minutes sets
                the physiological and mental baseline for everything that follows. Most people hand it to their
                phone. ORIGEN is the alternative.
              </p>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider my-24 mx-auto max-w-5xl" />

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-5xl space-y-24">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
                  <div className="serif text-[7rem] md:text-[10rem] leading-none text-primary/15 select-none">
                    {s.n}
                  </div>
                  <div className="md:pt-8">
                    <div className="flex items-baseline gap-4">
                      <span className="eyebrow">Step {s.n.replace("0", "")}</span>
                      <span className="text-xs text-muted-foreground tracking-widest uppercase">{s.time}</span>
                    </div>
                    <h2 className="serif text-4xl md:text-6xl mt-4">{s.label}</h2>
                    <p className="mt-6 text-lg leading-[1.8] text-foreground/80 max-w-xl">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="gold-divider my-24 mx-auto max-w-5xl" />

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow">The Sequence</span>
              <h3 className="serif mt-6 text-3xl md:text-5xl leading-[1.2]">
                Pressure <span className="text-primary">→</span> Cold{" "}
                <span className="text-primary">→</span> Nourish
              </h3>
              <p className="mt-8 text-lg leading-[1.8] text-foreground/80">
                In that order. The mat opens the body. The roller activates it. The oil restores and protects
                it. Twenty minutes. Then the day is yours.
              </p>
              <div className="mt-12">
                <Link to="/" hash="products" className="btn-gold">
                  Shop the full ritual <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
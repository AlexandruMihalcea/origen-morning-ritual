import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { useLanguageStore } from "@/stores/languageStore";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/the-ritual")({
  head: () =>
    seoMeta({
      title: "The Morning Ritual — 3 Steps to Sovereignty | ORIGEN",
      description:
        "Pressure. Cold. Nourish. The complete ORIGEN morning ritual explained — why it works and how to make it yours.",
      path: "/the-ritual",
    }),
  component: RitualPage,
});

function RitualPage() {
  const { t } = useLanguageStore();
  const r = t.ritualPage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32">
        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="eyebrow">{r.eyebrow}</span>
              <h1 className="serif mt-6 text-5xl md:text-8xl leading-[1.0]">{r.headline}</h1>
            </Reveal>
            <Reveal delay={200} className="mt-12 max-w-2xl text-lg md:text-xl leading-[1.8] text-foreground/85">
              {r.intro}
            </Reveal>
          </div>
        </section>

        <div className="gold-divider my-24 mx-auto max-w-5xl" />

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow">{r.whyEyebrow}</span>
              <p className="mt-8 text-lg md:text-xl leading-[1.8] text-foreground/85">{r.whyBody}</p>
            </Reveal>
          </div>
        </section>

        <div className="gold-divider my-24 mx-auto max-w-5xl" />

        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-5xl space-y-24">
            {r.steps.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
                  <div className="serif text-[7rem] md:text-[10rem] leading-none text-primary/15 select-none">
                    0{i + 1}
                  </div>
                  <div className="md:pt-8">
                    <div className="flex items-baseline gap-4">
                      <span className="eyebrow">Step {i + 1}</span>
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
              <span className="eyebrow">{r.sequenceEyebrow}</span>
              <h3 className="serif mt-6 text-3xl md:text-5xl leading-[1.2]">
                {r.sequenceHeadline.split('→').map((part, i, arr) => (
                  <span key={i}>
                    {part.trim()}
                    {i < arr.length - 1 && <span className="text-primary"> → </span>}
                  </span>
                ))}
              </h3>
              <p className="mt-8 text-lg leading-[1.8] text-foreground/80">{r.sequenceBody}</p>
              <div className="mt-12">
                <Link to="/" hash="products" className="btn-gold">
                  {r.sequenceCta} <span>→</span>
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

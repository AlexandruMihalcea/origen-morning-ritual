import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { useLanguageStore } from "@/stores/languageStore";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seoMeta({
      title: "About ORIGEN — Back to Basics. Fly Higher.",
      description:
        "ORIGEN is a morning wellness brand built on one belief: the most powerful rituals are the simplest ones. Meet the brand.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLanguageStore();
  const a = t.aboutPage;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="eyebrow">{a.eyebrow}</span>
            <h1 className="serif mt-6 text-5xl md:text-7xl leading-[1.05]">{a.headline}</h1>
          </Reveal>

          <Reveal delay={150} className="mt-16 space-y-8 text-lg md:text-xl leading-[1.8] text-foreground/85">
            <p>{a.body1}</p>
            <p>{a.body2}</p>
            <p>{a.body3}</p>

            <div className="gold-divider my-12" />

            <p>{a.body4}</p>
            <p className="serif text-2xl md:text-3xl text-primary italic pt-6">{a.tagline}</p>
          </Reveal>

          <Reveal delay={300} className="mt-16">
            <Link to="/the-ritual" className="btn-gold">
              {a.cta} <span>→</span>
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}

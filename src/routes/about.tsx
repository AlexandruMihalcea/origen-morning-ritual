import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ORIGEN" },
      { name: "description", content: "ORIGEN went back to basics. Pressure. Cold. Nourishment. The morning before the noise." },
      { property: "og:title", content: "About — ORIGEN" },
      { property: "og:description", content: "Back to basics. Fly higher." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="pt-40 pb-32 px-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="eyebrow">Origin</span>
            <h1 className="serif mt-6 text-5xl md:text-7xl leading-[1.05]">About ORIGEN</h1>
          </Reveal>

          <Reveal delay={150} className="mt-16 space-y-8 text-lg md:text-xl leading-[1.8] text-foreground/85">
            <p>
              Most wellness brands sell you complexity. More supplements. More steps. More things to track,
              optimise, and eventually abandon.
            </p>
            <p>
              ORIGEN is the opposite. We went back to the basics — the three things the body responds to that
              have always worked. Pressure. Cold. Nourishment. Applied in sequence, every morning, before the
              world starts.
            </p>
            <p>That's it.</p>

            <div className="gold-divider my-12" />

            <p>
              The name is intentional. <em className="serif text-primary">Origen</em> — origin, in Spanish and
              Italian. The place before the noise started. The version of you that exists before the cortisol,
              the screen time, the decisions.
            </p>
            <p className="serif text-2xl md:text-3xl text-primary italic pt-6">
              Twenty minutes every morning. Back to basics. Fly higher.
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-16">
            <Link to="/the-ritual" className="btn-gold">
              Read the ritual <span>→</span>
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
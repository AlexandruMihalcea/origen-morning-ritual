import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { RitualBundle } from "../components/RitualBundle";

export const Route = createFileRoute("/the-ritual-bundle")({
  head: () => ({
    meta: [
      { title: "The Ritual Bundle — ORIGEN" },
      { name: "description", content: "The full ORIGEN morning ritual — The Mat, The Roller, The Oil. All three steps, one package." },
      { property: "og:title", content: "The Ritual Bundle — ORIGEN" },
      { property: "og:description", content: "Pressure. Cold. Nourish. The complete morning ritual." },
    ],
  }),
  component: BundlePage,
});

function BundlePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <RitualBundle variant="page" />
      <Footer />
    </div>
  );
}
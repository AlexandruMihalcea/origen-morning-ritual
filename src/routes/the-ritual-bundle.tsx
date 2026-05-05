import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { RitualBundle } from "../components/RitualBundle";
import { seoMeta, jsonLdScript, SITE_URL } from "@/lib/seo";
import matHero from "@/assets/mat-hero.jpg";

export const Route = createFileRoute("/the-ritual-bundle")({
  head: () => {
    const seo = seoMeta({
      title: "The Ritual Bundle — All 3 Products | ORIGEN",
      description:
        "The complete ORIGEN morning ritual kit. The Mat, The Roller, and The Oil — all three steps in one bundle. £108. Ships worldwide.",
      path: "/the-ritual-bundle",
      image: matHero,
      type: "product",
    });
    return {
      ...seo,
      scripts: [
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "The ORIGEN Ritual Bundle — Mat, Roller & Oil",
          description:
            "The complete ORIGEN morning ritual kit. Acupressure mat, jade facial roller, and bio facial oil — all three steps in one bundle.",
          image: `${SITE_URL}${matHero}`,
          brand: { "@type": "Brand", name: "ORIGEN" },
          offers: {
            "@type": "Offer",
            price: "108.00",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/the-ritual-bundle`,
          },
        }),
      ],
    };
  },
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
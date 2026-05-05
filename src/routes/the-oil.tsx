import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import oilHero from "@/assets/oil-hero.jpg";
import oilVideo from "@/assets/oil-video.mp4";
import oilLifestyle from "@/assets/oil-lifestyle.jpg";
import { seoMeta, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/the-oil")({
  head: () => {
    const seo = seoMeta({
      title: "Bio Facial Oil — Organic Olive Oil Serum | Step 3 — Nourish | ORIGEN",
      description:
        "Certified organic bio facial oil by La Provençale. The final step of the ORIGEN morning ritual. 30ml. Absorbs fast. Luminous finish.",
      path: "/the-oil",
      image: oilHero as string,
      type: "product",
    });
    return {
      ...seo,
      scripts: [
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "The ORIGEN Oil — Bio Facial Oil 30ml",
          description:
            "Certified organic bio facial oil by La Provençale. Absorbs fast. Luminous finish.",
          image: `${SITE_URL}${oilHero as string}`,
          brand: { "@type": "Brand", name: "ORIGEN" },
          offers: {
            "@type": "Offer",
            price: "32.00",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/the-oil`,
          },
        }),
      ],
    };
  },
  component: OilPage,
});

function OilPage() {
  const { t } = useLanguageStore();
  return (
    <ProductPage
      p={{
        step: "03",
        label: t.products.oil.label,
        name: t.products.oil.name,
        tagline: t.products.oil.tagline,
        intro: t.oilPage.intro,
        benefits: t.oilPage.benefits as { title: string; body: string }[],
        handle: "facial-oil-la-provencale-bio-30-ml",
        heroImage: oilHero as string,
        heroVideo: oilVideo,
        lifestyleImage: oilLifestyle,
      }}
    />
  );
}

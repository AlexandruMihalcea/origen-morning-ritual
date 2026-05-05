import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import matHero from "@/assets/mat-hero.jpg";
import matVideo from "@/assets/mat-video.mp4";
import matLifestyle from "@/assets/mat-lifestyle.jpg";
import { seoMeta, jsonLdScript, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/the-mat")({
  head: () => {
    const seo = seoMeta({
      title: "Acupressure Mat & Pillow Set | Step 1 — Pressure | ORIGEN",
      description:
        "Wake the body before the day begins. The ORIGEN Mat — acupressure mat and neck pillow for muscle release, circulation, and morning activation.",
      path: "/the-mat",
      image: matHero,
      type: "product",
    });
    return {
      ...seo,
      scripts: [
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "The ORIGEN Mat — Acupressure Mat & Pillow Set",
          description:
            "Acupressure mat and neck pillow for muscle release, circulation, and morning activation.",
          image: `${SITE_URL}${matHero}`,
          brand: { "@type": "Brand", name: "ORIGEN" },
          offers: {
            "@type": "Offer",
            price: "42.00",
            priceCurrency: "GBP",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/the-mat`,
          },
        }),
      ],
    };
  },
  component: MatPage,
});

function MatPage() {
  const { t } = useLanguageStore();
  return (
    <ProductPage
      p={{
        step: "01",
        label: t.products.mat.label,
        name: t.products.mat.name,
        tagline: t.products.mat.tagline,
        intro: t.matPage.intro,
        benefits: t.matPage.benefits as { title: string; body: string }[],
        handle: "acupressure-mat-sensi-massage-mat-pillow-set-applicator-for-neck-foot",
        heroImage: matHero,
        heroVideo: matVideo,
        lifestyleImage: matLifestyle,
      }}
    />
  );
}

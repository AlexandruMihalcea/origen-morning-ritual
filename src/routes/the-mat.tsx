import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import matHero from "@/assets/mat-hero.jpg";
import matVideo from "@/assets/mat-video.mp4";
import matLifestyle from "@/assets/mat-lifestyle.jpg";

export const Route = createFileRoute("/the-mat")({
  head: () => ({
    meta: [
      { title: "The Mat — ORIGEN" },
      { name: "description", content: "Pressure that grounds. 8,820 acupressure points to release tension and reset the nervous system." },
      { property: "og:title", content: "The Mat — ORIGEN" },
      { property: "og:description", content: "Pressure that grounds." },
    ],
  }),
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

import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import oilHero from "@/assets/oil-hero.jpg";
import oilVideo from "@/assets/oil-video.mp4";
import oilLifestyle from "@/assets/oil-lifestyle.jpg";

export const Route = createFileRoute("/the-oil")({
  head: () => ({
    meta: [
      { title: "The Oil — ORIGEN" },
      { name: "description", content: "Nourishment that protects. Cold-pressed botanical facial oil — the ritual's final act." },
      { property: "og:title", content: "The Oil — ORIGEN" },
      { property: "og:description", content: "Nourishment that protects." },
    ],
  }),
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

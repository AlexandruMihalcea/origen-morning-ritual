import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import oilHero from "@/assets/oil-hero.jpg";
import oilVideo from "@/assets/oil-video.mp4";
import oilLifestyle from "@/assets/oil-lifestyle.jpg";

export const Route = createFileRoute("/the-oil")({
  head: () => ({
    meta: [
      { title: "The Oil — ORIGEN" },
      { name: "description", content: "Nourishment that protects. Cold-pressed botanical oil, applied when the skin is most receptive." },
      { property: "og:title", content: "The Oil — ORIGEN" },
      { property: "og:description", content: "Nourishment that protects." },
    ],
  }),
  component: () => (
    <ProductPage
      p={{
        step: "03",
        label: "Nourish",
        name: "The Oil",
        tagline: "Nourishment that protects.",
        intro:
          "The skin is warm from the mat, activated from the roller. Applied now, it absorbs completely. Cold-pressed botanical oil that nourishes, protects, and seals — the ritual's final act.",
        benefits: [
          { title: "Cold-pressed botanicals", body: "A short list of ingredients, each chosen for what it does. Nothing for marketing. Nothing for filler." },
          { title: "Deepest absorption", body: "Applied at the moment the skin is most receptive — warm, open, circulation activated. Two minutes is enough." },
          { title: "The seal", body: "Locks in everything the ritual created. The morning's work, protected through the rest of the day." },
        ],
        handle: "facial-oil-la-provencale-bio-30-ml",
        heroImage: oilHero,
        heroVideo: oilVideo,
        lifestyleImage: oilLifestyle,
      }}
    />
  ),
});
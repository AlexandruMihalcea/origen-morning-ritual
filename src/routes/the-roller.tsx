import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "../components/ProductPage";
import { useLanguageStore } from "@/stores/languageStore";
import rollerHero from "@/assets/roller-hero.jpg";

export const Route = createFileRoute("/the-roller")({
  head: () => ({
    meta: [
      { title: "The Roller — ORIGEN" },
      { name: "description", content: "Cold that sharpens. Jade facial roller for cold therapy, inflammation reduction and natural alertness." },
      { property: "og:title", content: "The Roller — ORIGEN" },
      { property: "og:description", content: "Cold that sharpens." },
    ],
  }),
  component: RollerPage,
});

function RollerPage() {
  const { t } = useLanguageStore();
  return (
    <ProductPage
      p={{
        step: "02",
        label: t.products.roller.label,
        name: t.products.roller.name,
        tagline: t.products.roller.tagline,
        intro: t.rollerPage.intro,
        benefits: t.rollerPage.benefits as { title: string; body: string }[],
        handle: "anti-ageing-treatment-for-face-and-neck-ecotools-jade-jade-set-2",
        heroImage: rollerHero as string,
      }}
    />
  );
}
